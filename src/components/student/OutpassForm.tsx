import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface OutpassFormProps {
  studentType: "hosteler" | "dayscholar";
  onSubmitSuccess: () => void;
}

const OutpassForm = ({ studentType, onSubmitSuccess }: OutpassFormProps) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    timeOut: "",
    timeIn: "",
    reason: "",
  });

  // Load draft if exists
  useEffect(() => {
    const savedDraft = localStorage.getItem(`outpassDraft_${user?.email}`);
    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }
  }, [user?.email]);

  // Save draft when form data changes
  useEffect(() => {
    if (formData.timeOut || formData.timeIn || formData.reason) {
      localStorage.setItem(
        `outpassDraft_${user?.email}`,
        JSON.stringify(formData)
      );
    }
  }, [formData, user?.email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save the outpass request to localStorage
    const outpassRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
    const newRequest = {
      id: Date.now(),
      studentType,
      studentDetails: {
        name: user?.name,
        email: user?.email,
        registrationNumber: user?.registrationNumber,
        department: user?.department,
        year: user?.year,
        phoneNumber: user?.phoneNumber,
        roomNumber: studentType === "hosteler" ? user?.roomNumber : null,
      },
      ...formData,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    
    outpassRequests.push(newRequest);
    localStorage.setItem("outpassRequests", JSON.stringify(outpassRequests));
    
    // Clear the draft after successful submission
    localStorage.removeItem(`outpassDraft_${user?.email}`);
    
    console.log("Submitting outpass request:", newRequest);
    toast({
      title: "Outpass Request Submitted",
      description: "Your request has been sent for approval.",
    });
    setFormData({ timeOut: "", timeIn: "", reason: "" });
    
    // Call the success callback
    onSubmitSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Auto-filled fields */}
        <div>
          <Label>Name</Label>
          <Input value={user?.name} disabled />
        </div>
        <div>
          <Label>Registration Number</Label>
          <Input value={user?.registrationNumber} disabled />
        </div>
        <div>
          <Label>Department</Label>
          <Input value={user?.department} disabled />
        </div>
        <div>
          <Label>Year</Label>
          <Input value={user?.year} disabled />
        </div>
        {studentType === "hosteler" && (
          <div>
            <Label>Room Number</Label>
            <Input value={user?.roomNumber} disabled />
          </div>
        )}
        <div>
          <Label>Phone Number</Label>
          <Input value={user?.phoneNumber} disabled />
        </div>
      </div>

      {/* User input fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="timeOut">Time Out</Label>
          <Input
            id="timeOut"
            type="datetime-local"
            value={formData.timeOut}
            onChange={(e) => setFormData({ ...formData, timeOut: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="timeIn">Expected Time In</Label>
          <Input
            id="timeIn"
            type="datetime-local"
            value={formData.timeIn}
            onChange={(e) => setFormData({ ...formData, timeIn: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="reason">Reason for Outpass</Label>
        <Textarea
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
          placeholder="Please provide a detailed reason for your outpass request"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
          Submit Request
        </Button>
        <Button 
          type="button" 
          variant="outline"
          onClick={onSubmitSuccess}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default OutpassForm;