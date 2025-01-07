import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { StudentSignupFields } from "./StudentSignupFields";
import { supabase } from "@/integrations/supabase/client";

export const SignupForm = () => {
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
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

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    return errors;
  };

  const validatePersonalInfo = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required personal information fields.",
        variant: "destructive",
      });
      return false;
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      toast({
        title: "Invalid Password",
        description: passwordErrors.join(", "),
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Password and confirmation password do not match.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const validateAcademicInfo = () => {
    if (!formData.registrationNumber || !formData.department || !formData.year || !formData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required academic information fields.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validatePersonalInfo()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNext();
      return;
    }

    if (!validateAcademicInfo()) {
      return;
    }

    try {
      console.log("Attempting to signup with data:", formData);
      
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            registrationNumber: formData.registrationNumber,
            department: formData.department,
            year: formData.year,
            roomNumber: formData.roomNumber,
            phoneNumber: formData.phoneNumber,
            role: formData.role,
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        throw error;
      }

      console.log("Signup successful:", data);
      
      toast({
        title: "Account created successfully",
        description: "Please check your email for verification and then login.",
      });
      
      const loginTab = document.querySelector('[data-tab="login"]') as HTMLElement;
      if (loginTab) {
        loginTab.click();
      }
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Unable to create account. Please try again.";
      
      if (error instanceof Error) {
        // Handle specific Supabase error messages
        if (error.message.includes("weak_password")) {
          errorMessage = "Password is too weak. Please use at least 6 characters.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 ? (
        <>
          <PersonalInfoFields formData={formData} updateFormData={updateFormData} />
          <Button type="submit" className="w-full">
            Next
          </Button>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Academic Information</h3>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="text-sm"
              >
                Back
              </Button>
            </div>
            <StudentSignupFields formData={formData} updateFormData={updateFormData} />
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </>
      )}
    </form>
  );
};