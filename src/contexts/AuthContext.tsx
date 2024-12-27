import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

type UserRole = "student" | "admin" | "RT" | "principal" | "advisor" | null;

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
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (userData: User) => void;
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
  photoUrl?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      console.log("Logging in with:", { email, password, role });
      
      if (!validateEmail(email)) {
        throw new Error("Invalid email format");
      }

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
        navigate("/admin-dashboard");
      } else {
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = storedUsers.find((u: SignupData) => u.email === email);
        
        if (foundUser) {
          const mockUser = {
            id: "1",
            ...foundUser,
            role,
          };
          setUser(mockUser);
          localStorage.setItem("user", JSON.stringify(mockUser));
          toast({
            title: "Login successful",
            description: `Welcome back, ${mockUser.name}!`,
          });
          navigate("/student-dashboard");
        } else {
          throw new Error("User not found");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      console.log("Signing up with:", userData);
      
      if (!validateEmail(userData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Check if email already exists
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (storedUsers.some((u: SignupData) => u.email === userData.email)) {
        throw new Error("Email already registered");
      }
      
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
        description: error instanceof Error ? error.message : "Unable to create account. Please try again.",
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
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, updateUser }}>
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
