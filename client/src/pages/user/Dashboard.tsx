import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, User, LogOut, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function UserDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const { orders } = useStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('orders');

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState("123 Street, Dhaka, Bangladesh");

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!user) return null;

  // Filter orders for this user
  const myOrders = orders.filter(order => order.customerName === user.username);

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({ title: "Profile Updated", description: "Your shipping details have been saved." });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <div className="p-6 bg-secondary/5 mb-6 border border-border">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {user.username.charAt(0)}
              </div>
              <h2 className="font-bold text-lg">{user.username}</h2>
              <p className="text-sm text-muted-foreground">Member</p>
            </div>

            <Button 
              variant="ghost" 
              onClick={() => setActiveTab('orders')}
              className={`w-full justify-start rounded-none uppercase tracking-wider font-bold ${activeTab === 'orders' ? 'bg-secondary/5' : 'hover:bg-secondary/5'}`}
            >
              <Package className="w-4 h-4 mr-3" /> My Orders
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab('profile')}
              className={`w-full justify-start rounded-none uppercase tracking-wider font-bold ${activeTab === 'profile' ? 'bg-secondary/5' : 'hover:bg-secondary/5'}`}
            >
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
            {activeTab === 'orders' && (
              <>
                <h1 className="text-3xl font-heading font-black uppercase mb-8">Order History</h1>

                {myOrders.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-border">
                    <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                    <Button variant="outline" onClick={() => setLocation('/shop')}>Start Shopping</Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {myOrders.map((order) => (
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
                            <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                              order.status === 'Paid' || order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                            <p className="font-bold">${order.total}</p>
                          </div>
                        </div>

                        <div className="border-t border-border pt-4">
                          <p className="text-sm font-medium mb-2">Items:</p>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {order.items.map((item, i) => (
                              <li key={i}>{item.name} (x{item.quantity}) - Size {item.selectedSize}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'profile' && (
              <>
                <h1 className="text-3xl font-heading font-black uppercase mb-8">My Profile</h1>
                <div className="bg-white border border-border p-8 max-w-xl">
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider block mb-2">Full Name</label>
                      <Input value={user.username} disabled className="bg-secondary/5" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider block mb-2">Email</label>
                      <Input value={user.username + "@example.com"} disabled className="bg-secondary/5" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider block mb-2">Shipping Address</label>
                      <Input 
                        value={address} 
                        disabled={!isEditing} 
                        onChange={(e) => setAddress(e.target.value)} 
                        className={isEditing ? "bg-white border-black" : "bg-secondary/5"}
                      />
                    </div>
                    
                    {isEditing ? (
                      <div className="flex gap-4">
                         <Button onClick={handleSaveProfile} className="bg-black text-white hover:bg-primary hover:text-black">Save Changes</Button>
                         <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                      </div>
                    ) : (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Details</Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
