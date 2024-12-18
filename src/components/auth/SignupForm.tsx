import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { PasswordInput } from "./PasswordInput";
import { StudentSignupFields } from "./StudentSignupFields";

export const SignupForm = () => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" as const,
    registrationNumber: "",
    department: "",
    year: "",
    roomNumber: "",
    phoneNumber: "",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Password and confirmation password do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      // After successful signup, switch to login tab
      const loginTab = document.querySelector('[data-tab="login"]') as HTMLElement;
      if (loginTab) {
        loginTab.click();
      }
      toast({
        title: "Account created successfully",
        description: "Please login with your credentials.",
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: "Unable to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Full Name</Label>
        <Input
          id="signup-name"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          required
          placeholder="Enter your full name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <PasswordInput
          id="signup-password"
          value={formData.password}
          onChange={(e) => updateFormData("password", e.target.value)}
          placeholder="Create a password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <PasswordInput
          id="confirm-password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData("confirmPassword", e.target.value)}
          placeholder="Confirm your password"
        />
      </div>

      <StudentSignupFields formData={formData} updateFormData={updateFormData} />

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
};