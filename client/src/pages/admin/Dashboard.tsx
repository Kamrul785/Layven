import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { useLocation } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, DollarSign, TrendingUp, LogOut, Plus, Star, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const chartData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

interface Product {
  id: string;
  name: string;
  price: string;
  description?: string;
  image?: string;
  category?: string;
  stock: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminDashboard() {
  const { user, logout, isAdmin, loading: authLoading } = useAuth();
  const { orders, updateOrderStatus } = useStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New Product State
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductStock, setNewProductStock] = useState("0");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      setLocation('/admin/login');
    }
  }, [isAdmin, setLocation, authLoading]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products', {
          credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast({ 
          title: "Error", 
          description: "Failed to fetch products",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin, toast]);

  if (authLoading || !isAdmin) return null;

  // Calculate real stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  // Mock active users for now
  const activeUsers = 124;

  const handleAddProduct = async () => {
    if (!newProductName || !newProductPrice) {
      toast({ 
        title: "Error", 
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const payload = {
        name: newProductName,
        price: newProductPrice, // Send as string
        category: newProductCategory || undefined,
        stock: newProductStock || "0",
        description: newProductDescription || undefined,
        image: undefined
      };

      console.log("Sending payload:", payload);

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create product');
      }

      setProducts([...products, data.product]);
      toast({ 
        title: "Success", 
        description: `${newProductName} added to catalog.` 
      });
      
      setNewProductName("");
      setNewProductPrice("");
      setNewProductCategory("");
      setNewProductStock("0");
      setNewProductDescription("");
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Error:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to add product",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-secondary/5 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white fixed h-full hidden md:block z-20">
        <div className="p-8">
          <h1 className="text-2xl font-heading font-bold uppercase tracking-tighter text-white">Layven<span className="text-primary">.Admin</span></h1>
        </div>
        <nav className="px-4 space-y-2">
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full justify-start rounded-none uppercase tracking-wider text-xs font-bold ${activeTab === 'dashboard' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
          >
            <TrendingUp className="w-4 h-4 mr-3" /> Dashboard
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setActiveTab('products')}
            className={`w-full justify-start rounded-none uppercase tracking-wider text-xs font-bold ${activeTab === 'products' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
          >
            <Package className="w-4 h-4 mr-3" /> Products
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 rounded-none uppercase tracking-wider text-xs font-bold">
            <Users className="w-4 h-4 mr-3" /> Customers
          </Button>
        </nav>
        <div className="absolute bottom-8 left-0 w-full px-4">
           <Button variant="destructive" onClick={logout} className="w-full rounded-none uppercase tracking-widest text-xs font-bold">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-heading font-bold uppercase">
            {activeTab === 'dashboard' ? 'Overview' : 'Product Management'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold">{user?.username || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-black">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 border border-border shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Total Revenue</p>
                    <h3 className="text-3xl font-bold mt-1">${totalRevenue.toLocaleString()}</h3>
                  </div>
                  <div className="p-2 bg-green-100 text-green-600 rounded">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 border border-border shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Total Orders</p>
                    <h3 className="text-3xl font-bold mt-1">{totalOrders}</h3>
                  </div>
                  <div className="p-2 bg-blue-100 text-blue-600 rounded">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
              </div>

               <div className="bg-white p-6 border border-border shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Active Users</p>
                    <h3 className="text-3xl font-bold mt-1">{activeUsers}</h3>
                  </div>
                  <div className="p-2 bg-purple-100 text-purple-600 rounded">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-8 border border-border shadow-sm mb-12">
              <h3 className="text-lg font-bold uppercase tracking-wider mb-8">Revenue Overview</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip />
                    <Bar dataKey="sales" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders - DYNAMIC */}
            <div className="bg-white border border-border shadow-sm">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-bold uppercase tracking-wider">Recent Orders</h3>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider">
                      <th className="pb-4">Order ID</th>
                      <th className="pb-4">Customer</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Amount</th>
                      <th className="pb-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/5 transition-colors">
                        <td className="py-4 font-medium">{order.id}</td>
                        <td className="py-4">{order.customerName}</td>
                        <td className="py-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${
                            order.status === 'Paid' || order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">${order.total}</td>
                        <td className="py-4 text-right">
                          <Select 
                            defaultValue={order.status} 
                            onValueChange={(val: any) => updateOrderStatus(order.id, val)}
                          >
                            <SelectTrigger className="w-[130px] h-8 ml-auto">
                              <SelectValue placeholder="Update" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Paid">Paid</SelectItem>
                              <SelectItem value="Shipped">Shipped</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div className="bg-white border border-border shadow-sm">
            <div className="p-8 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-bold uppercase">Product Catalog</h3>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-black text-white hover:bg-primary hover:text-black rounded-none uppercase font-bold tracking-wider">
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Product Name *</label>
                      <Input 
                        value={newProductName} 
                        onChange={e => setNewProductName(e.target.value)} 
                        placeholder="e.g. Stealth Bomber Jacket" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Price *</label>
                      <Input 
                        type="number" 
                        step="0.01"
                        value={newProductPrice} 
                        onChange={e => setNewProductPrice(e.target.value)} 
                        placeholder="95.00" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Category</label>
                      <Input 
                        value={newProductCategory} 
                        onChange={e => setNewProductCategory(e.target.value)} 
                        placeholder="e.g. Jackets" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Stock</label>
                      <Input 
                        type="number" 
                        value={newProductStock} 
                        onChange={e => setNewProductStock(e.target.value)} 
                        placeholder="0" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold">Description</label>
                      <Input 
                        value={newProductDescription} 
                        onChange={e => setNewProductDescription(e.target.value)} 
                        placeholder="Product description" 
                      />
                    </div>
                    <Button 
                      onClick={handleAddProduct} 
                      className="w-full bg-black text-white hover:bg-primary hover:text-black rounded-none uppercase font-bold"
                    >
                      Save Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="p-8">
              {loading ? (
                <div className="text-center text-muted-foreground">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="text-center text-muted-foreground">No products yet. Click "Add Product" to get started!</div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider">
                      <th className="pb-4">Product</th>
                      <th className="pb-4">Category</th>
                      <th className="pb-4 text-right">Price</th>
                      <th className="pb-4 text-right">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border last:border-0 hover:bg-secondary/5 transition-colors">
                        <td className="py-4 font-bold">{product.name}</td>
                        <td className="py-4 text-muted-foreground">{product.category || '-'}</td>
                        <td className="py-4 text-right font-medium">${parseFloat(product.price).toFixed(2)}</td>
                        <td className="py-4 text-right">{product.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
