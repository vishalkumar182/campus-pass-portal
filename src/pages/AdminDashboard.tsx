import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Load outpass requests from localStorage
    const loadRequests = () => {
      const storedRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
      setRequests(storedRequests);
    };

    loadRequests();
    // Add event listener for storage changes
    window.addEventListener("storage", loadRequests);
    return () => window.removeEventListener("storage", loadRequests);
  }, []);

  const handleApprove = (id) => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: "approved" } : req
    );
    localStorage.setItem("outpassRequests", JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
    toast({
      title: "Request Approved",
      description: "The outpass request has been approved.",
    });
  };

  const handleReject = (id) => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: "rejected" } : req
    );
    localStorage.setItem("outpassRequests", JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
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
          <p className="text-gray-600">RT Admin Dashboard</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-primary mb-6">
            Pending Requests
          </h2>
          <div className="space-y-6">
            {requests.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No pending requests</p>
            ) : (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{request.studentDetails.name}</h3>
                      <p className="text-sm text-gray-600">
                        Registration: {request.studentDetails.registrationNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        Department: {request.studentDetails.department}
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
                  <div>
                    <p className="text-gray-600 text-sm">Status:</p>
                    <p className={`text-sm font-medium ${
                      request.status === 'approved' ? 'text-green-600' : 
                      request.status === 'rejected' ? 'text-red-600' : 
                      'text-yellow-600'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;