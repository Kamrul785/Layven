import { Link } from "wouter";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-heading font-bold">LAYVEN</h3>
            <p className="text-secondary-foreground/70 leading-relaxed max-w-xs">
              Wear Your Strength. Premium streetwear inspired by the timeless discipline of the Samurai.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/shop" className="text-secondary-foreground/70 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <span className="text-secondary-foreground/30 cursor-not-allowed">Sweatshirts</span>
              </li>
              <li>
                <span className="text-secondary-foreground/30 cursor-not-allowed">Leather Jackets (Coming Soon)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-secondary-foreground/70 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-secondary-foreground/70 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-secondary-foreground/70 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-6 uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 border border-secondary-foreground/20 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 border border-secondary-foreground/20 flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/40">
          <p>© 2024 Layven. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
