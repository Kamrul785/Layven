import { Link, useLocation } from "wouter";
import { Menu, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold tracking-tighter hover:opacity-80 transition-opacity">
          LAYVEN
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
              location === link.href ? "text-primary" : "text-foreground"
            }`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-none border-border bg-background">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}>
                  <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:text-primary transition-colors">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:text-primary transition-colors">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-border bg-background p-0">
              <div className="flex flex-col h-full pt-16 px-8 gap-8">
                {links.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="text-2xl font-heading font-bold uppercase hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-border pt-8 mt-4">
                  {user ? (
                    <div className="space-y-4">
                      <Link 
                        href={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}
                        className="text-xl font-heading font-bold uppercase hover:text-primary transition-colors block" 
                        onClick={() => setIsOpen(false)}
                      >
                        My Dashboard
                      </Link>
                      <button 
                        onClick={() => { logout(); setIsOpen(false); }}
                        className="text-xl font-heading font-bold uppercase text-red-500 hover:text-red-600 transition-colors block"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link 
                      href="/login"
                      className="text-xl font-heading font-bold uppercase hover:text-primary transition-colors block" 
                      onClick={() => setIsOpen(false)}
                    >
                      Login / Register
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
