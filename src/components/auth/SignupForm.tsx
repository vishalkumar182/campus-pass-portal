import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { PersonalInfoFields } from "./PersonalInfoFields";
import { StudentSignupFields } from "./StudentSignupFields";

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

  const validatePersonalInfo = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required personal information fields.",
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
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      
      toast({
        title: "Account created successfully",
        description: "Please login with your credentials.",
      });
      
      const loginTab = document.querySelector('[data-tab="login"]') as HTMLElement;
      if (loginTab) {
        loginTab.click();
      }
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