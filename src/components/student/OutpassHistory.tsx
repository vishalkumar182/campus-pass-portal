import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface OutpassRequest {
  id: number;
  studentType: string;
  timeOut: string;
  timeIn: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

const OutpassHistory = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<OutpassRequest[]>([]);

  useEffect(() => {
    const outpassRequests = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
    const userRequests = outpassRequests.filter(
      (request: OutpassRequest) => request.studentDetails?.email === user?.email
    );
    setRequests(userRequests);
  }, [user?.email]);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-500 hover:bg-yellow-600",
      approved: "bg-green-500 hover:bg-green-600",
      rejected: "bg-red-500 hover:bg-red-600",
    };

    return (
      <Badge className={statusStyles[status as keyof typeof statusStyles]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

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
              <TableRow key={request.id}>
                <TableCell>
                  {format(new Date(request.submittedAt), "PPp")}
                </TableCell>
                <TableCell>
                  {format(new Date(request.timeOut), "PPp")}
                </TableCell>
                <TableCell>
                  {format(new Date(request.timeIn), "PPp")}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {request.reason}
                </TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OutpassHistory;