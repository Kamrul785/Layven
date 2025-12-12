import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items, removeFromCart, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-heading font-bold uppercase mb-6">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-10">Looks like you haven't found your strength yet.</p>
          <Link href="/shop">
            <Button size="lg" className="rounded-none uppercase font-bold tracking-widest px-10">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-heading font-black uppercase mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="border-t border-border">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-6 py-8 border-b border-border"
                  >
                    <div className="w-24 h-32 bg-secondary/5 shrink-0">
                      <img src={item.product?.image || "https://placehold.co/80x120/png"} alt={item.product?.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-heading font-bold uppercase">{item.product?.name}</h3>
                        </div>
                        <p className="text-lg font-bold">${item.product ? (parseFloat(item.product.price) * item.quantity).toFixed(2) : '0.00'}</p>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4">
                          {/* Quantity UI Mockup - simplified for prototype */}
                          <span className="text-sm font-medium">Qty: {item.quantity}</span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 uppercase font-bold tracking-wider"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-8">
              <Button variant="outline" onClick={clearCart} className="rounded-none uppercase text-xs tracking-widest">
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-secondary/5 p-8 sticky top-24">
              <h2 className="text-2xl font-heading font-bold uppercase mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${cartTotal}.00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at next step</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-4 border-t border-border">
                  <span>Total</span>
                  <span>${cartTotal}.00</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full h-14 bg-black text-white hover:bg-primary hover:text-black rounded-none uppercase font-bold tracking-widest flex items-center justify-between px-6 group">
                  <span>Checkout</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
