import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Facebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import heroImage from "@assets/generated_images/hero_banner_for_layven_streetwear_brand.png";
import blueSweatshirt from "@assets/generated_images/powder_blue_sweatshirt_product_shot.png";
import charcoalSweatshirt from "@assets/generated_images/charcoal_sweatshirt_product_shot.png";
import beigeSweatshirt from "@assets/generated_images/beige_sweatshirt_product_shot.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Layven Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
        </div>
        
        <div className="container relative z-10 px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter mb-6 uppercase">
              Wear Your<br />Strength
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide mb-10 text-white/90 max-w-xl mx-auto">
              Premium streetwear forged in discipline.
            </p>
            <Button asChild size="lg" className="bg-white text-black hover:bg-primary hover:text-black border-none text-lg px-10 py-8 rounded-none uppercase font-bold tracking-widest transition-all duration-300">
              <Link href="/shop">
                Shop Now
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight">Featured Drop</h2>
            <Link href="/shop">
              <a className="hidden md:flex items-center gap-2 text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { img: blueSweatshirt, name: "Samurai Hoodie", color: "Powder Blue" },
              { img: charcoalSweatshirt, name: "Ronin Sweatshirt", color: "Charcoal" },
              { img: beigeSweatshirt, name: "Dojo Crewneck", color: "Beige" }
            ].map((product, idx) => (
              <motion.div key={idx} variants={fadeIn} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary/5 mb-6">
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button className="w-full bg-white text-black hover:bg-primary border-none rounded-none uppercase font-bold tracking-wider">
                      View Details
                    </Button>
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold uppercase mb-1">{product.name}</h3>
                <p className="text-muted-foreground">{product.color}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/shop">
              <Button variant="outline" className="w-full rounded-none uppercase tracking-widest py-6">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Preview */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 uppercase leading-tight">
              Power. Courage. <br/><span className="text-secondary-foreground/50">Discipline.</span>
            </h2>
            <p className="text-lg md:text-xl text-secondary-foreground/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              Layven is more than clothing. It represents the modern samurai spirit—moving through the noise with purpose and strength. 
            </p>
            <Link href="/about">
              <Button variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-white hover:text-black rounded-none uppercase px-8 py-6 tracking-widest text-sm">
                Explore Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold uppercase mb-4">Join the Tribe</h2>
              <p className="text-muted-foreground mb-8">Sign up for early access to drops and exclusive content.</p>
              <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
                <Input 
                  placeholder="Enter your email" 
                  className="rounded-none border-r-0 h-12 bg-transparent border-black focus-visible:ring-0 focus-visible:border-primary" 
                />
                <Button type="submit" className="rounded-none h-12 px-8 uppercase font-bold tracking-wider bg-black text-white hover:bg-primary hover:text-black">
                  Join
                </Button>
              </form>
            </div>
            <div className="flex justify-center md:justify-end gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary transition-colors duration-300">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">Instagram</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-primary transition-colors duration-300">
                  <Facebook className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider">Facebook</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
