import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useAuth } from "@/lib/auth";

export default function Register() {
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login("newuser@layven.com", 'user');
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-24 flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-black uppercase mb-2">Join the Tribe</h1>
            <p className="text-muted-foreground">Create an account to track orders and get early access.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider">First Name</label>
                <Input placeholder="John" className="rounded-none h-12 bg-secondary/5" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider">Last Name</label>
                <Input placeholder="Doe" className="rounded-none h-12 bg-secondary/5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider">Email</label>
              <Input type="email" placeholder="name@example.com" className="rounded-none h-12 bg-secondary/5" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider">Password</label>
              <Input type="password" placeholder="••••••••" className="rounded-none h-12 bg-secondary/5" />
            </div>

            <Button type="submit" className="w-full h-12 bg-black text-white hover:bg-primary hover:text-black rounded-none uppercase font-bold tracking-widest">
              Create Account
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login">
                <a className="text-black font-bold hover:underline">Sign In</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
