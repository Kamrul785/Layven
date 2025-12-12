import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
    } catch (error) {
      // Error is handled in auth context
    } finally {
      setLoading(false);
    }
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
              <label className="text-xs font-bold uppercase tracking-wider">Username</label>
              <Input 
                type="text" 
                placeholder="username" 
                className="rounded-none h-12 bg-secondary/5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                className="rounded-none h-12 bg-secondary/5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-black text-white hover:bg-primary hover:text-black rounded-none uppercase font-bold tracking-widest"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
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
