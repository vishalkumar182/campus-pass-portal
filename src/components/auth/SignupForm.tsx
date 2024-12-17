import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

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
        <Input
          id="signup-password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData("password", e.target.value)}
          required
          placeholder="Create a password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData("confirmPassword", e.target.value)}
          required
          placeholder="Confirm your password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="registration-number">Registration Number</Label>
        <Input
          id="registration-number"
          value={formData.registrationNumber}
          onChange={(e) => updateFormData("registrationNumber", e.target.value)}
          required
          placeholder="Enter registration number"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => updateFormData("department", e.target.value)}
            required
            placeholder="Enter department"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            value={formData.year}
            onChange={(e) => updateFormData("year", e.target.value)}
            required
            placeholder="Enter year"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="room-number">Room Number (Optional)</Label>
          <Input
            id="room-number"
            value={formData.roomNumber}
            onChange={(e) => updateFormData("roomNumber", e.target.value)}
            placeholder="Enter room number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input
            id="phone-number"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData("phoneNumber", e.target.value)}
            required
            placeholder="Enter phone number"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
};