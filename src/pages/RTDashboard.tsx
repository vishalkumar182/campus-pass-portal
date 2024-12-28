import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/shared/DashboardHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RTDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Load outpass requests from localStorage
    const loadRequests = () => {
      const storedRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
      // Filter requests that haven't been processed yet
      const pendingRequests = storedRequests.filter(
        (req) => req.status === "pending"
      );
      setRequests(pendingRequests);
      console.log("Loaded pending requests:", pendingRequests);
    };

    loadRequests();
    // Add event listener for storage changes
    window.addEventListener("storage", loadRequests);
    return () => window.removeEventListener("storage", loadRequests);
  }, []);

  const handleApprove = (requestId) => {
    const updatedRequests = requests.map((req) =>
      req.id === requestId ? { ...req, status: "approved", approvedBy: "RT" } : req
    );
    
    // Update localStorage with all requests
    const allRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
    const updatedAllRequests = allRequests.map((req) =>
      req.id === requestId ? { ...req, status: "approved", approvedBy: "RT" } : req
    );
    localStorage.setItem("outpassRequests", JSON.stringify(updatedAllRequests));
    
    // Update local state
    setRequests(updatedRequests);
    
    toast({
      title: "Outpass Approved",
      description: "The outpass has been approved successfully.",
    });
  };

  const handleForwardToPrincipal = (requestId) => {
    const updatedRequests = requests.map((req) =>
      req.id === requestId ? { ...req, status: "forwarded_to_principal" } : req
    );
    
    // Update localStorage
    const allRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
    const updatedAllRequests = allRequests.map((req) =>
      req.id === requestId ? { ...req, status: "forwarded_to_principal" } : req
    );
    localStorage.setItem("outpassRequests", JSON.stringify(updatedAllRequests));
    
    // Update local state
    setRequests(updatedRequests);
    
    toast({
      title: "Outpass Forwarded",
      description: "The outpass has been forwarded to the Principal for review.",
    });
  };

  const handleReject = (requestId) => {
    const updatedRequests = requests.map((req) =>
      req.id === requestId ? { ...req, status: "rejected", rejectedBy: "RT" } : req
    );
    
    // Update localStorage
    const allRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
    const updatedAllRequests = allRequests.map((req) =>
      req.id === requestId ? { ...req, status: "rejected", rejectedBy: "RT" } : req
    );
    localStorage.setItem("outpassRequests", JSON.stringify(updatedAllRequests));
    
    // Update local state
    setRequests(updatedRequests);
    
    toast({
      title: "Outpass Rejected",
      description: "The outpass has been rejected.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">RT Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Pending Outpass Requests</h2>
          
          {requests.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No pending requests</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Room Number</TableHead>
                  <TableHead>Time Out</TableHead>
                  <TableHead>Time In</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.studentName}</TableCell>
                    <TableCell>{request.roomNumber}</TableCell>
                    <TableCell>{new Date(request.timeOut).toLocaleString()}</TableCell>
                    <TableCell>{new Date(request.timeIn).toLocaleString()}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        onClick={() => handleApprove(request.id)}
                        variant="outline"
                        className="bg-green-50 hover:bg-green-100 text-green-600"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleForwardToPrincipal(request.id)}
                        variant="outline"
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                      >
                        Forward to Principal
                      </Button>
                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="outline"
                        className="bg-red-50 hover:bg-red-100 text-red-600"
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
};

export default RTDashboard;