import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

type UserRole = 'user' | 'admin' | null;

interface User {
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'user' | 'admin') => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const login = (email: string, role: 'user' | 'admin') => {
    // Mock login logic
    const newUser = {
      email,
      name: role === 'admin' ? 'Admin User' : 'John Doe',
      role
    };
    setUser(newUser);
    
    toast({
      title: `Welcome back, ${newUser.name}`,
      description: "You have successfully logged in.",
    });

    if (role === 'admin') {
      setLocation('/admin/dashboard');
    } else {
      setLocation('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    setLocation('/login');
    toast({
      title: "Logged out",
      description: "See you next time.",
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}
