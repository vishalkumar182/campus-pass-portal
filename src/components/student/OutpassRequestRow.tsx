import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface OutpassRequest {
  id: number;
  studentType: string;
  timeOut: string;
  timeIn: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

interface OutpassRequestRowProps {
  request: OutpassRequest;
}

const OutpassRequestRow = ({ request }: OutpassRequestRowProps) => {
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
    <TableRow>
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
  );
};

export default OutpassRequestRow;