import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    timeOut: "",
    timeIn: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting outpass request:", formData);
    toast({
      title: "Request Submitted",
      description: "Your outpass request has been sent for approval.",
    });
    setFormData({ timeOut: "", timeIn: "", reason: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-600">Student Dashboard</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">
            Request Outpass
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="timeOut">Time Out</Label>
                <Input
                  id="timeOut"
                  type="datetime-local"
                  value={formData.timeOut}
                  onChange={(e) =>
                    setFormData({ ...formData, timeOut: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="timeIn">Expected Time In</Label>
                <Input
                  id="timeIn"
                  type="datetime-local"
                  value={formData.timeIn}
                  onChange={(e) =>
                    setFormData({ ...formData, timeIn: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reason">Reason for Outpass</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                required
                className="min-h-[100px]"
                placeholder="Please provide a detailed reason for your outpass request"
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Submit Request
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;