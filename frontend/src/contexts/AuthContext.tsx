import React, { createContext, useContext, useState } from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "admin@hospital.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
  },
  {
    id: "2",
    email: "doctor@hospital.com",
    password: "doctor123",
    role: "doctor",
    name: "Dr. John Smith",
  },
  {
    id: "3",
    email: "nurse@hospital.com",
    password: "nurse123",
    role: "nurse",
    name: "Sarah Johnson",
  },
  {
    id: "4",
    email: "receptionist@hospital.com",
    password: "reception123",
    role: "receptionist",
    name: "Emily Davis",
  },
  {
    id: "5",
    email: "p",
    password: "p",
    role: "admin",
    name: "Admin User",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const demoUser = DEMO_USERS.find(
        (u) => u.email === email && u.password === password
      );
      if (!demoUser) {
        throw new Error("Invalid credentials");
      }
      const { password: _, ...userWithoutPassword } = demoUser;
      setUser(userWithoutPassword);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
