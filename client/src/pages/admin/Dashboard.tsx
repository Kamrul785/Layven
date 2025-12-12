import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, DollarSign, TrendingUp, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export default function AdminDashboard() {
  const { user, logout, isAdmin } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAdmin) {
      setLocation('/admin/login');
    }
  }, [isAdmin, setLocation]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-secondary/5 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white fixed h-full hidden md:block">
        <div className="p-8">
          <h1 className="text-2xl font-heading font-bold uppercase tracking-tighter text-white">Layven<span className="text-primary">.Admin</span></h1>
        </div>
        <nav className="px-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 rounded-none uppercase tracking-wider text-xs font-bold">
            <TrendingUp className="w-4 h-4 mr-3" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 rounded-none uppercase tracking-wider text-xs font-bold">
            <Package className="w-4 h-4 mr-3" /> Products
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 rounded-none uppercase tracking-wider text-xs font-bold">
            <Users className="w-4 h-4 mr-3" /> Customers
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 rounded-none uppercase tracking-wider text-xs font-bold">
            <DollarSign className="w-4 h-4 mr-3" /> Sales
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
          <h2 className="text-3xl font-heading font-bold uppercase">Overview</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold">{user?.name}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 border border-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Total Revenue</p>
                <h3 className="text-3xl font-bold mt-1">$45,231.89</h3>
              </div>
              <div className="p-2 bg-green-100 text-green-600 rounded">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-green-600 font-medium">+20.1% from last month</p>
          </div>

          <div className="bg-white p-6 border border-border shadow-sm">
             <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Orders</p>
                <h3 className="text-3xl font-bold mt-1">+2350</h3>
              </div>
              <div className="p-2 bg-blue-100 text-blue-600 rounded">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-blue-600 font-medium">+180.1% from last month</p>
          </div>

           <div className="bg-white p-6 border border-border shadow-sm">
             <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Active Now</p>
                <h3 className="text-3xl font-bold mt-1">+573</h3>
              </div>
              <div className="p-2 bg-purple-100 text-purple-600 rounded">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-purple-600 font-medium">+201 since last hour</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-8 border border-border shadow-sm mb-12">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-8">Revenue Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip />
                <Bar dataKey="sales" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
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
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { id: "ORD001", user: "Liam Johnson", status: "Paid", amount: "$250.00" },
                  { id: "ORD002", user: "Olivia Smith", status: "Pending", amount: "$150.00" },
                  { id: "ORD003", user: "Noah Williams", status: "Paid", amount: "$350.00" },
                  { id: "ORD004", user: "Emma Brown", status: "Shipped", amount: "$450.00" },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-4 font-medium">{order.id}</td>
                    <td className="py-4">{order.user}</td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${
                        order.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
