import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "user@layven.com", 'user');
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-24 flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-black uppercase mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to manage your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider">Email</label>
              <Input 
                type="email" 
                placeholder="name@example.com" 
                className="rounded-none h-12 bg-secondary/5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider">Password</label>
              <Input type="password" placeholder="••••••••" className="rounded-none h-12 bg-secondary/5" />
            </div>

            <Button type="submit" className="w-full h-12 bg-black text-white hover:bg-primary hover:text-black rounded-none uppercase font-bold tracking-widest">
              Sign In
            </Button>
          </form>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register">
                <a className="text-black font-bold hover:underline">Join the Tribe</a>
              </Link>
            </p>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/login">
                <a className="hover:text-black transition-colors">Admin Access</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
