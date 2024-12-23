import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { PasswordInput } from "./PasswordInput";
import { AdminLoginFields } from "./AdminLoginFields";

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [showAdminFields, setShowAdminFields] = useState(false);
  const [adminType, setAdminType] = useState<"RT" | "principal" | "advisor">("RT");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (showAdminFields) {
        if (adminType === "advisor") {
          // For advisor login, we'll use a different validation logic
          if (adminCode === "advisor123") { // This is just an example code
            await login(email, password, "advisor");
          } else {
            toast({
              title: "Invalid Advisor Code",
              description: "Please check your advisor credentials and try again.",
              variant: "destructive",
            });
            return;
          }
        } else if (
          email === "vishal8049kumar@gmail.com" &&
          password === "1234567890" &&
          adminCode === "grace"
        ) {
          await login(email, password, "admin");
        } else {
          toast({
            title: "Invalid Admin Credentials",
            description: "Please check your admin credentials and try again.",
            variant: "destructive",
          });
          return;
        }
      } else {
        await login(email, password, "student");
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
        <PasswordInput
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {showAdminFields && (
        <AdminLoginFields
          adminCode={adminCode}
          setAdminCode={setAdminCode}
          adminType={adminType}
          setAdminType={setAdminType}
        />
      )}

      <div className="space-y-4">
        <Button type="submit" className="w-full">
          {showAdminFields ? "Admin Login" : "Student Login"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setShowAdminFields(!showAdminFields)}
        >
          {showAdminFields ? "Switch to Student Login" : "Admin Login"}
        </Button>
      </div>
    </form>
  );
};