import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import passport from "passport";
import { insertUserSchema, insertProductSchema, insertCartItemSchema, insertOrderSchema } from "@shared/schema";
import type { Request, Response, NextFunction } from "express";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      password: string;
      isAdmin: boolean;
    }
  }
}

// Middleware to check if user is authenticated
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// Middleware to check if user is admin
function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user?.isAdmin) {
    return next();
  }
  res.status(403).json({ message: "Forbidden: Admin access required" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Authentication Routes

  // Register new user
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: result.error.issues 
        });
      }

      const existingUser = await storage.getUserByUsername(result.data.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser(result.data);
      
      // Auto-login after registration
      req.login(user, (err) => {
        if (err) return next(err);
        
        const { password, ...userWithoutPassword } = user;
        res.status(201).json({ 
          message: "User created successfully",
          user: userWithoutPassword 
        });
      });
    } catch (error: any) {
      next(error);
    }
  });

  // Login
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: Express.User, info: any) => {
      if (err) return next(err);
      
      if (!user) {
        return res.status(401).json({ 
          message: info?.message || "Invalid credentials" 
        });
      }

      req.login(user, (err) => {
        if (err) return next(err);
        
        const { password, ...userWithoutPassword } = user;
        res.json({ 
          message: "Login successful",
          user: userWithoutPassword 
        });
      });
    })(req, res, next);
  });

  // Logout
  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // Get current user
  app.get("/api/auth/me", isAuthenticated, (req, res) => {
    const { password, ...userWithoutPassword } = req.user!;
    res.json({ user: userWithoutPassword });
  });

  // Protected admin route example
  app.get("/api/admin/stats", isAdmin, (req, res) => {
    res.json({ 
      message: "Admin stats",
      stats: {
        totalUsers: 0,
        totalOrders: 0,
        revenue: 0
      }
    });
  });

  // ============ PRODUCT ROUTES ============

  // Get all products
  app.get("/api/products", async (req, res, next) => {
    try {
      const products = await storage.getAllProducts();
      res.json({ products });
    } catch (error) {
      next(error);
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res, next) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ product });
    } catch (error) {
      next(error);
    }
  });

  // Create product (admin only)
  app.post("/api/products", isAdmin, async (req, res, next) => {
    try {
      const result = insertProductSchema.safeParse(req.body);
      
      if (!result.success) {
        console.error("Product validation error:", result.error.issues);
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: result.error.issues 
        });
      }

      const product = await storage.createProduct(result.data);
      res.status(201).json({ 
        message: "Product created successfully",
        product 
      });
    } catch (error) {
      next(error);
    }
  });

  // Update product (admin only)
  app.put("/api/products/:id", isAdmin, async (req, res, next) => {
    try {
      const result = insertProductSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: result.error.issues 
        });
      }

      const product = await storage.updateProduct(req.params.id, result.data);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ 
        message: "Product updated successfully",
        product 
      });
    } catch (error) {
      next(error);
    }
  });

  // Delete product (admin only)
  app.delete("/api/products/:id", isAdmin, async (req, res, next) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

  // ============ CART ROUTES ============

  // Get user's cart
  app.get("/api/cart", isAuthenticated, async (req, res, next) => {
    try {
      const cartItems = await storage.getCartItems(req.user!.id);
      
      // Enrich with product details
      const enrichedItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product
          };
        })
      );

      res.json({ cartItems: enrichedItems });
    } catch (error) {
      next(error);
    }
  });

  // Add to cart
  app.post("/api/cart", isAuthenticated, async (req, res, next) => {
    try {
      const result = insertCartItemSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: result.error.issues 
        });
      }

      // Check if product exists
      const product = await storage.getProduct(result.data.productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const cartItem = await storage.addToCart(req.user!.id, result.data);
      res.status(201).json({ 
        message: "Item added to cart",
        cartItem 
      });
    } catch (error) {
      next(error);
    }
  });

  // Update cart item quantity
  app.put("/api/cart/:id", isAuthenticated, async (req, res, next) => {
    try {
      const { quantity } = req.body;
      
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const cartItem = await storage.updateCartItem(req.params.id, quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json({ 
        message: "Cart updated",
        cartItem 
      });
    } catch (error) {
      next(error);
    }
  });

  // Remove from cart
  app.delete("/api/cart/:id", isAuthenticated, async (req, res, next) => {
    try {
      const deleted = await storage.removeFromCart(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json({ message: "Item removed from cart" });
    } catch (error) {
      next(error);
    }
  });

  // Clear cart
  app.delete("/api/cart", isAuthenticated, async (req, res, next) => {
    try {
      await storage.clearCart(req.user!.id);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      next(error);
    }
  });

  // ============ ORDER ROUTES ============

  // Create order (checkout)
  app.post("/api/orders", isAuthenticated, async (req, res, next) => {
    try {
      const { customerName, customerEmail, shippingAddress, items } = req.body;

      if (!customerName || !customerEmail || !shippingAddress || !items || !Array.isArray(items)) {
        return res.status(400).json({ message: "Invalid order data" });
      }

      // Calculate total
      let total = 0;
      for (const item of items) {
        const product = await storage.getProduct(item.productId);
        if (!product) {
          return res.status(404).json({ message: `Product ${item.productId} not found` });
        }
        total += parseFloat(product.price) * item.quantity;
      }

      const order = await storage.createOrder(req.user!.id, {
        customerName,
        customerEmail,
        shippingAddress,
        total: String(total)
      }, items);

      // Clear cart after order
      await storage.clearCart(req.user!.id);

      res.status(201).json({ 
        message: "Order placed successfully",
        order 
      });
    } catch (error) {
      next(error);
    }
  });

  // Get user's orders
  app.get("/api/orders", isAuthenticated, async (req, res, next) => {
    try {
      const orders = await storage.getUserOrders(req.user!.id);
      res.json({ orders });
    } catch (error) {
      next(error);
    }
  });

  // Get single order with items
  app.get("/api/orders/:id", isAuthenticated, async (req, res, next) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if user owns this order or is admin
      if (order.userId !== req.user!.id && !req.user!.isAdmin) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const items = await storage.getOrderItems(order.id);
      res.json({ order, items });
    } catch (error) {
      next(error);
    }
  });

  // Get all orders (admin only)
  app.get("/api/admin/orders", isAdmin, async (req, res, next) => {
    try {
      const orders = await storage.getAllOrders();
      res.json({ orders });
    } catch (error) {
      next(error);
    }
  });

  // Update order status (admin only)
  app.put("/api/admin/orders/:id", isAdmin, async (req, res, next) => {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json({ 
        message: "Order status updated",
        order 
      });
    } catch (error) {
      next(error);
    }
  });

  return httpServer;
}
