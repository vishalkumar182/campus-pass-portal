import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/shared/DashboardHeader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OutpassRequestCard from "@/components/admin/OutpassRequestCard";

const PrincipalDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadRequests = () => {
      const storedRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
      const forwardedRequests = storedRequests.filter(
        (req) => req.status === "forwarded_to_principal"
      );
      setRequests(forwardedRequests);
      console.log("Loaded forwarded requests:", forwardedRequests);
    };

    loadRequests();
    window.addEventListener("storage", loadRequests);
    return () => window.removeEventListener("storage", loadRequests);
  }, []);

  const handleApprove = (requestId, signature) => {
    const allRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
    const updatedAllRequests = allRequests.map((req) =>
      req.id === requestId ? { 
        ...req, 
        status: "approved", 
        approvedBy: "principal",
        principalSignature: signature 
      } : req
    );
    
    localStorage.setItem("outpassRequests", JSON.stringify(updatedAllRequests));
    setRequests(requests.filter((req) => req.id !== requestId));
    
    toast({
      title: "Outpass Approved",
      description: "The outpass has been approved successfully.",
    });
  };

  const handleReject = (requestId) => {
    const allRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
    const updatedAllRequests = allRequests.map((req) =>
      req.id === requestId ? { ...req, status: "rejected", rejectedBy: "principal" } : req
    );
    
    localStorage.setItem("outpassRequests", JSON.stringify(updatedAllRequests));
    setRequests(requests.filter((req) => req.id !== requestId));
    
    toast({
      title: "Outpass Rejected",
      description: "The outpass has been rejected.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Principal Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Forwarded Outpass Requests</h2>
          
          {requests.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No forwarded requests</p>
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
                  <OutpassRequestCard
                    key={request.id}
                    request={request}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    role="principal"
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
};

export default PrincipalDashboard;