import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { useStore } from "@/lib/store";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  zip: z.string().min(3),
  paymentMethod: z.enum(["card", "cod"]),
});

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const { placeOrder } = useStore();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      firstName: user?.name.split(" ")[0] || "",
      lastName: user?.name.split(" ")[1] || "",
      paymentMethod: "card",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    placeOrder({
      total: cartTotal,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        image: item.image
      })),
      customerEmail: values.email,
      customerName: `${values.firstName} ${values.lastName}`
    });

    toast({
      title: "Order Placed Successfully!",
      description: `Thank you ${values.firstName}. Your order has been confirmed.`,
    });
    
    clearCart();
    setIsProcessing(false);
    
    // Redirect to dashboard if logged in, otherwise home
    if (user) {
      setLocation("/dashboard");
    } else {
      setLocation("/");
    }
  };

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-heading font-black uppercase mb-8">Checkout</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                
                {/* Contact Info */}
                <section>
                  <h2 className="text-lg font-bold uppercase tracking-wider mb-6 pb-2 border-b border-border">Contact Information</h2>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold tracking-wider">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} className="rounded-none h-12 bg-secondary/5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                {/* Shipping Address */}
                <section className="space-y-6">
                  <h2 className="text-lg font-bold uppercase tracking-wider mb-6 pb-2 border-b border-border">Shipping Address</h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold tracking-wider">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} className="rounded-none h-12 bg-secondary/5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold tracking-wider">Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} className="rounded-none h-12 bg-secondary/5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold tracking-wider">Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Street Name" {...field} className="rounded-none h-12 bg-secondary/5" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold tracking-wider">City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} className="rounded-none h-12 bg-secondary/5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase text-xs font-bold tracking-wider">Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} className="rounded-none h-12 bg-secondary/5" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                {/* Payment Method */}
                <section>
                  <h2 className="text-lg font-bold uppercase tracking-wider mb-6 pb-2 border-b border-border">Payment</h2>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 border border-border p-4 cursor-pointer hover:border-black transition-colors">
                              <FormControl>
                                <RadioGroupItem value="card" />
                              </FormControl>
                              <FormLabel className="flex-1 flex items-center justify-between font-normal cursor-pointer">
                                <span>Credit Card</span>
                                <CreditCard className="w-5 h-5 text-muted-foreground" />
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 border border-border p-4 cursor-pointer hover:border-black transition-colors">
                              <FormControl>
                                <RadioGroupItem value="cod" />
                              </FormControl>
                              <FormLabel className="flex-1 flex items-center justify-between font-normal cursor-pointer">
                                <span>Cash on Delivery</span>
                                <Truck className="w-5 h-5 text-muted-foreground" />
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("paymentMethod") === "card" && (
                    <div className="mt-6 p-6 bg-secondary/5 border border-border space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider">Card Number</label>
                        <Input placeholder="0000 0000 0000 0000" className="bg-white rounded-none border-border" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider">Expiry</label>
                          <Input placeholder="MM/YY" className="bg-white rounded-none border-border" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider">CVC</label>
                          <Input placeholder="123" className="bg-white rounded-none border-border" />
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isProcessing}
                  className="w-full h-14 bg-black text-white hover:bg-primary hover:text-black rounded-none uppercase font-bold tracking-widest text-lg"
                >
                  {isProcessing ? "Processing..." : `Pay $${cartTotal}.00`}
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-secondary/5 p-8 sticky top-24">
              <h3 className="text-xl font-heading font-bold uppercase mb-6">Your Order</h3>
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-white shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold uppercase text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.color} / {item.selectedSize}</p>
                    </div>
                    <div className="font-bold text-sm">${item.price * item.quantity}.00</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartTotal}.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-border mt-4">
                  <span>Total</span>
                  <span>${cartTotal}.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
