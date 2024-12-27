import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { AdminLoginFields } from "./AdminLoginFields";
import { StudentLoginFields } from "./StudentLoginFields";
import { PasswordInput } from "./PasswordInput";

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
        // Using same credentials for all admin roles
        const validCredentials = 
          email === "admin@test.com" &&
          password === "123456" &&
          adminCode === "123";

        if (!validCredentials) {
          toast({
            title: "Invalid Admin Credentials",
            description: `Use: admin@test.com / 123456 / code: 123`,
            variant: "destructive",
          });
          return;
        }

        switch (adminType) {
          case "RT":
            await login(email, password, "RT");
            break;
          case "principal":
            await login(email, password, "principal");
            break;
          case "advisor":
            await login(email, password, "advisor");
            break;
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
      {showAdminFields ? (
        <AdminLoginFields
          adminCode={adminCode}
          setAdminCode={setAdminCode}
          adminType={adminType}
          setAdminType={setAdminType}
        />
      ) : (
        <StudentLoginFields
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      )}

      {showAdminFields && (
        <div className="space-y-4">
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
        </div>
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