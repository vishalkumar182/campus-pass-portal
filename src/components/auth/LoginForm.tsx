import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { PasswordInput } from "./PasswordInput";
import { AdminLoginFields } from "./AdminLoginFields";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

interface LoginFormProps {
  onLoginTypeChange: (isAdmin: boolean) => void;
}

export const LoginForm = ({ onLoginTypeChange }: LoginFormProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [showAdminFields, setShowAdminFields] = useState(false);
  const [adminType, setAdminType] = useState<"RT" | "principal" | "advisor">("RT");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setAdminCode("");
  }, [showAdminFields, adminType]);

  useEffect(() => {
    onLoginTypeChange(showAdminFields);
  }, [showAdminFields, onLoginTypeChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (showAdminFields) {
        // Simplified admin credentials for testing
        if (adminType === "advisor") {
          if (adminCode === "123") {
            await login(email, password, "advisor");
          } else {
            toast({
              title: "Invalid Advisor Code",
              description: "Use code: 123",
              variant: "destructive",
            });
            return;
          }
        } else if (
          email === "admin@test.com" &&
          password === "123456" &&
          adminCode === "123"
        ) {
          await login(email, password, "admin");
        } else {
          toast({
            title: "Invalid Admin Credentials",
            description: "Use: admin@test.com / 123456 / code: 123",
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
      {showAdminFields && (
        <AdminLoginFields
          adminCode={adminCode}
          setAdminCode={setAdminCode}
          adminType={adminType}
          setAdminType={setAdminType}
        />
      )}

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
        {!showAdminFields && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="px-0 font-normal text-sm text-primary hover:text-primary/90"
              >
                Forgot password?
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
              </DialogHeader>
              <ForgotPasswordForm />
            </DialogContent>
          </Dialog>
        )}
      </div>

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