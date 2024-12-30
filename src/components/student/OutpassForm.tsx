import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const OutpassForm = () => {
  const { user } = useAuth();
  const [timeOut, setTimeOut] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!timeOut || !timeIn || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const outpassRequest = {
      id: Date.now(),
      email: user?.email,
      studentName: user?.name,
      registrationNumber: user?.registrationNumber,
      department: user?.department,
      year: user?.year,
      roomNumber: user?.roomNumber,
      phoneNumber: user?.phoneNumber,
      timeOut,
      timeIn,
      reason,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    const existingRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
    localStorage.setItem(
      "outpassRequests",
      JSON.stringify([...existingRequests, outpassRequest])
    );

    toast({
      title: "Success",
      description: "Outpass request submitted successfully",
    });

    setTimeOut("");
    setTimeIn("");
    setReason("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <Input value={user?.name || ""} disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration Number
          </label>
          <Input value={user?.registrationNumber || ""} disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <Input value={user?.department || ""} disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <Input value={user?.year || ""} disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room Number
          </label>
          <Input value={user?.roomNumber || ""} disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <Input value={user?.phoneNumber || ""} disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Out
          </label>
          <Input
            type="datetime-local"
            value={timeOut}
            onChange={(e) => setTimeOut(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time In
          </label>
          <Input
            type="datetime-local"
            value={timeIn}
            onChange={(e) => setTimeIn(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason
        </label>
        <Textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="Enter your reason for requesting outpass..."
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Request
      </Button>
    </form>
  );
};

export default OutpassForm;