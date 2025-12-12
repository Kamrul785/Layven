import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "admin@layven.com", 'admin');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <ShieldAlert className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-heading font-bold uppercase text-white mb-2">Admin Portal</h1>
          <p className="text-white/50 text-sm">Restricted Access Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/70">Admin Email</label>
            <Input 
              type="email" 
              placeholder="admin@layven.com" 
              className="rounded-none h-12 bg-black/50 border-white/10 text-white focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/70">Password</label>
            <Input type="password" placeholder="••••••••" className="rounded-none h-12 bg-black/50 border-white/10 text-white focus:border-primary" />
          </div>

          <Button type="submit" className="w-full h-12 bg-primary text-black hover:bg-white rounded-none uppercase font-bold tracking-widest">
            Authenticate
          </Button>
        </form>
      </div>
    </div>
  );
}
