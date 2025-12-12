import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { Link } from "wouter";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Shop() {
  const { products } = useStore();

  return (
    <Layout>
      <div className="pt-12 pb-24 container mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-4">The Collection</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-sm">Fall / Winter 2025</p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-24"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item} className="group cursor-pointer">
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[3/4] bg-secondary/5 mb-6 overflow-hidden">
                  <img 
                    src={product.image || "https://placehold.co/600x800/png?text=No+Image"} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button className="w-full bg-black text-white hover:bg-primary hover:text-black rounded-none uppercase font-bold tracking-wider">
                      View Details
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-heading font-bold uppercase mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">{product.color}</p>
                  </div>
                  <p className="text-lg font-bold">${product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon Sections */}
        <div className="space-y-24 border-t border-border pt-24">
          <div className="text-center opacity-50">
            <h2 className="text-4xl font-heading font-bold uppercase mb-4">Leather Jackets</h2>
            <span className="inline-block border border-black/20 px-4 py-2 text-sm uppercase tracking-widest">Coming Soon</span>
          </div>
          
          <div className="text-center opacity-50">
            <h2 className="text-4xl font-heading font-bold uppercase mb-4">Knitwear & Sweaters</h2>
            <span className="inline-block border border-black/20 px-4 py-2 text-sm uppercase tracking-widest">Coming Soon</span>
          </div>

          <div className="text-center opacity-50">
            <h2 className="text-4xl font-heading font-bold uppercase mb-4">Essential Tees</h2>
            <span className="inline-block border border-black/20 px-4 py-2 text-sm uppercase tracking-widest">Coming Soon</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
