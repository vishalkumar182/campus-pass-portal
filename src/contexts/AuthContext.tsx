import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

type UserRole = "student" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registrationNumber?: string;
  department?: string;
  year?: string;
  roomNumber?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  registrationNumber?: string;
  department?: string;
  year?: string;
  roomNumber?: string;
  phoneNumber?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      console.log("Logging in with:", { email, password, role });
      
      // For admin login, use fixed name
      if (role === "admin") {
        const mockUser = {
          id: "1",
          name: "Admin User",
          email,
          role,
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast({
          title: "Login successful",
          description: `Welcome back, ${mockUser.name}!`,
        });
      } else {
        // For student login, get the stored user data from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = storedUsers.find((u: SignupData) => u.email === email);
        
        if (foundUser) {
          const mockUser = {
            id: "1",
            name: foundUser.name,
            email,
            role,
            registrationNumber: foundUser.registrationNumber,
            department: foundUser.department,
            year: foundUser.year,
            roomNumber: foundUser.roomNumber,
            phoneNumber: foundUser.phoneNumber,
          };
          setUser(mockUser);
          localStorage.setItem("user", JSON.stringify(mockUser));
          toast({
            title: "Login successful",
            description: `Welcome back, ${mockUser.name}!`,
          });
        } else {
          throw new Error("User not found");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      console.log("Signing up with:", userData);
      
      // Store the user data in localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      storedUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      
      toast({
        title: "Signup successful",
        description: `Welcome, ${userData.name}!`,
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "Unable to create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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