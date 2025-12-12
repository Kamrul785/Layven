import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Package, User, LogOut, Settings } from "lucide-react";

export default function UserDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <div className="p-6 bg-secondary/5 mb-6 border border-border">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {user.name.charAt(0)}
              </div>
              <h2 className="font-bold text-lg">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <Button variant="ghost" className="w-full justify-start rounded-none uppercase tracking-wider font-bold bg-secondary/5">
              <Package className="w-4 h-4 mr-3" /> My Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start rounded-none uppercase tracking-wider font-bold hover:bg-secondary/5">
              <User className="w-4 h-4 mr-3" /> Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start rounded-none uppercase tracking-wider font-bold hover:bg-secondary/5">
              <Settings className="w-4 h-4 mr-3" /> Settings
            </Button>
            <Button variant="ghost" onClick={logout} className="w-full justify-start rounded-none uppercase tracking-wider font-bold text-red-500 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-3" /> Logout
            </Button>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-heading font-black uppercase mb-8">Order History</h1>

            <div className="space-y-6">
              {[
                { id: "ORD-2024-001", date: "Oct 12, 2024", status: "Delivered", total: "$160.00", items: ["Samurai Hoodie", "Ronin Sweatshirt"] },
                { id: "ORD-2024-002", date: "Nov 05, 2024", status: "In Transit", total: "$75.00", items: ["Dojo Crewneck"] },
              ].map((order) => (
                <div key={order.id} className="border border-border p-6 hover:border-black transition-colors">
                  <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order ID</p>
                      <p className="font-bold">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date</p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider rounded-full">
                        {order.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                      <p className="font-bold">{order.total}</p>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-medium mb-2">Items:</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {order.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button variant="outline" className="rounded-none uppercase text-xs font-bold tracking-wider">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
