import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useRoute, Link } from "wouter";
import { products } from "@/lib/products";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Truck, ShieldCheck } from "lucide-react";

export default function ProductDetails() {
  const [match, params] = useRoute("/product/:id");
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>("");

  if (!match || !params) return null;

  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(String(product.id));
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <Link href="/shop">
          <a className="inline-flex items-center text-muted-foreground hover:text-black mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </a>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary/5 relative aspect-3/4 overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{product.color}</p>
            <p className="text-2xl font-bold mb-8">${product.price}.00</p>

            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wider mb-4">Description</p>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold uppercase tracking-wider">Select Size</span>
                <span className="text-xs text-muted-foreground underline cursor-pointer">Size Guide</span>
              </div>
              <div className="flex gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center border transition-all duration-200 ${
                      selectedSize === size 
                        ? "border-black bg-black text-white" 
                        : "border-border hover:border-black/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              size="lg" 
              onClick={handleAddToCart}
              className="w-full h-14 text-lg bg-primary text-black hover:bg-black hover:text-white rounded-none uppercase font-bold tracking-widest mb-8"
            >
              Add to Cart
            </Button>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5" />
                <span>Free Shipping over $150</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
