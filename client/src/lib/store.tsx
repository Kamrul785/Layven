import React, { createContext, useContext, useState, ReactNode } from 'react';
import { products as initialProducts, Product } from './products';
import { format } from 'date-fns';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  selectedSize: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
  total: number;
  items: OrderItem[];
  customerEmail: string;
  customerName: string;
}

interface StoreContextType {
  products: Product[];
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Mock Initial Orders
const initialOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "Oct 12, 2024",
    status: "Delivered",
    total: 160,
    items: [
      { id: 1, name: "Samurai Hoodie", price: 85, quantity: 1, selectedSize: "L", image: "" },
      { id: 2, name: "Ronin Sweatshirt", price: 75, quantity: 1, selectedSize: "M", image: "" }
    ],
    customerEmail: "user@layven.com",
    customerName: "John Doe"
  },
  {
    id: "ORD-2024-002",
    date: "Nov 05, 2024",
    status: "Pending",
    total: 75,
    items: [
      { id: 3, name: "Dojo Crewneck", price: 75, quantity: 1, selectedSize: "L", image: "" }
    ],
    customerEmail: "user@layven.com",
    customerName: "John Doe"
  },
  {
    id: "ORD-2024-003",
    date: "Dec 10, 2024",
    status: "Paid",
    total: 250,
    items: [
      { id: 1, name: "Samurai Hoodie", price: 85, quantity: 2, selectedSize: "XL", image: "" }
    ],
    customerEmail: "liam@example.com",
    customerName: "Liam Johnson"
  }
];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const placeOrder = (newOrderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...newOrderData,
      id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      date: format(new Date(), 'MMM dd, yyyy'),
      status: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: products.length + 1
    };
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <StoreContext.Provider value={{ products, orders, placeOrder, updateOrderStatus, addProduct }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
