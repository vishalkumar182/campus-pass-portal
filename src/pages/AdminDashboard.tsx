import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Mock data for demonstration
const mockRequests = [
  {
    id: "1",
    studentName: "John Doe",
    department: "Computer Science",
    timeOut: "2024-02-20T10:00",
    timeIn: "2024-02-20T18:00",
    reason: "Doctor's appointment",
    status: "pending",
  },
  {
    id: "2",
    studentName: "Jane Smith",
    department: "Electronics",
    timeOut: "2024-02-21T09:00",
    timeIn: "2024-02-21T17:00",
    reason: "Family function",
    status: "pending",
  },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState(mockRequests);

  const handleApprove = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );
    toast({
      title: "Request Approved",
      description: "The outpass request has been approved.",
    });
  };

  const handleReject = (id: string) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
    toast({
      title: "Request Rejected",
      description: "The outpass request has been rejected.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-600">Admin Dashboard</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">
            Pending Requests
          </h2>
          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{request.studentName}</h3>
                    <p className="text-sm text-gray-600">
                      Department: {request.department}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      onClick={() => handleApprove(request.id)}
                      variant="outline"
                      className="bg-green-50 hover:bg-green-100 text-green-600"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(request.id)}
                      variant="outline"
                      className="bg-red-50 hover:bg-red-100 text-red-600"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Time Out:</p>
                    <p>{new Date(request.timeOut).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time In:</p>
                    <p>{new Date(request.timeIn).toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Reason:</p>
                  <p className="text-sm">{request.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;