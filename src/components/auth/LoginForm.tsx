import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [showAdminFields, setShowAdminFields] = useState(false);
  const [adminType, setAdminType] = useState<"RT" | "principal">("RT");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check for admin credentials
      if (showAdminFields) {
        if (
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
        <Input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
      </div>

      {showAdminFields && (
        <>
          <div className="space-y-2">
            <Label htmlFor="admin-code">Admin Code</Label>
            <Input
              id="admin-code"
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              required
              placeholder="Enter admin code"
            />
          </div>
          <div className="space-y-2">
            <Label>Admin Type</Label>
            <RadioGroup
              value={adminType}
              onValueChange={(value) => setAdminType(value as "RT" | "principal")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="RT" id="rt" />
                <Label htmlFor="rt">RT</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="principal" id="principal" />
                <Label htmlFor="principal">Principal</Label>
              </div>
            </RadioGroup>
          </div>
        </>
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