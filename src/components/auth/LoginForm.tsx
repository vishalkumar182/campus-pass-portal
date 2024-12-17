import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check for admin credentials
      if (role === "admin") {
        if (email === "vishal8049kumar@gmail.com" && password === "demo7017") {
          await login(email, password, role);
        } else {
          toast({
            title: "Invalid Admin Credentials",
            description: "Please check your admin credentials and try again.",
            variant: "destructive",
          });
          return;
        }
      } else {
        await login(email, password, role);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
      </div>
      <div className="flex gap-4">
        <Button
          type="button"
          variant={role === "student" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setRole("student")}
        >
          Student
        </Button>
        <Button
          type="button"
          variant={role === "admin" ? "default" : "outline"}
          className="flex-1"
          onClick={() => setRole("admin")}
        >
          Admin
        </Button>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};