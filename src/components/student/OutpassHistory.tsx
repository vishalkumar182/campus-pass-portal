import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OutpassRequestRow from "./OutpassRequestRow";

interface OutpassRequest {
  id: number;
  studentType: string;
  timeOut: string;
  timeIn: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  email: string;
}

const OutpassHistory = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<OutpassRequest[]>([]);

  useEffect(() => {
    const outpassRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
    const userRequests = outpassRequests.filter(
      (request: OutpassRequest) => request.email === user?.email
    );
    setRequests(userRequests);
  }, [user?.email]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Outpass History</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No outpass requests found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Submitted On</TableHead>
              <TableHead>Time Out</TableHead>
              <TableHead>Time In</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <OutpassRequestRow key={request.id} request={request} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OutpassHistory;