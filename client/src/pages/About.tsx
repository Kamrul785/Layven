import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import aboutImage from "@assets/generated_images/abstract_samurai_aesthetic_for_about_page.png";

export default function About() {
  return (
    <Layout>
      {/* Hero Banner */}
      <div className="h-[60vh] w-full relative overflow-hidden bg-secondary">
        <img 
          src={aboutImage} 
          alt="Abstract Samurai Art" 
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-heading font-black uppercase text-foreground"
          >
            The Way of<br />Layven
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Main Story */}
          <div className="md:col-span-7 space-y-8">
            <h2 className="text-3xl font-heading font-bold uppercase">The Story</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Layven was born from a desire to merge the ancient discipline of the Samurai with modern streetwear aesthetics. We believe that clothing is not just what you wear, but a reflection of your inner state.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The Samurai lived by a code—Bushido. It emphasized honor, courage, and mastery over oneself. In a chaotic modern world, these values are more relevant than ever. Layven is for those who walk their own path, who face challenges with quiet strength.
            </p>
            
            <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-border bg-secondary/5">
                <h3 className="font-heading font-bold text-xl mb-2 uppercase">Power</h3>
                <p className="text-sm text-muted-foreground">Inner strength that speaks without shouting.</p>
              </div>
              <div className="p-6 border border-border bg-secondary/5">
                <h3 className="font-heading font-bold text-xl mb-2 uppercase">Courage</h3>
                <p className="text-sm text-muted-foreground">The will to act when others hesitate.</p>
              </div>
              <div className="p-6 border border-border bg-secondary/5">
                <h3 className="font-heading font-bold text-xl mb-2 uppercase">Discipline</h3>
                <p className="text-sm text-muted-foreground">Consistency in pursuit of excellence.</p>
              </div>
            </div>
          </div>

          {/* Vision Side */}
          <div className="md:col-span-5 md:pl-12 border-l border-border">
            <h2 className="text-3xl font-heading font-bold uppercase mb-6">Our Vision</h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-8">
              To become the leading premium streetwear brand in Bangladesh, setting a new standard for quality and design that resonates globally.
            </p>
            <div className="bg-primary/20 p-8">
              <p className="font-heading font-bold text-2xl uppercase leading-tight italic">
                "We don't just make clothes. We craft armor for the modern warrior."
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
