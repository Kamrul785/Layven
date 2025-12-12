import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-24">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-4">Get in Touch</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Have questions about your order or want to collaborate? Reach out to the tribe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">First Name</label>
                  <Input className="bg-secondary/5 border-transparent focus:border-black rounded-none h-12" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider">Last Name</label>
                  <Input className="bg-secondary/5 border-transparent focus:border-black rounded-none h-12" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Email</label>
                <Input className="bg-secondary/5 border-transparent focus:border-black rounded-none h-12" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider">Message</label>
                <Textarea className="bg-secondary/5 border-transparent focus:border-black rounded-none min-h-[200px]" placeholder="How can we help?" />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto bg-black text-white hover:bg-primary hover:text-black rounded-none uppercase font-bold tracking-widest h-14 px-10">
                Send Message
              </Button>
            </form>
          </div>

          {/* Info Side */}
          <div className="space-y-12 md:pt-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl uppercase mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-1">support@layven.com</p>
                <p className="text-muted-foreground">partnerships@layven.com</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl uppercase mb-2">HQ</h3>
                <p className="text-muted-foreground">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="pt-12 border-t border-border">
              <h3 className="font-heading font-bold text-xl uppercase mb-6">Socials</h3>
              <div className="flex gap-4">
                <Button variant="outline" className="w-full rounded-none border-black/10 hover:bg-black hover:text-white uppercase tracking-widest">
                  Instagram
                </Button>
                <Button variant="outline" className="w-full rounded-none border-black/10 hover:bg-black hover:text-white uppercase tracking-widest">
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
