import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

interface OutpassRequestCardProps {
  request: {
    id: string;
    studentName: string;
    roomNumber: string;
    timeOut: string;
    timeIn: string;
    reason: string;
  };
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onForward?: (id: string) => void;
}

const OutpassRequestCard = ({
  request,
  onApprove,
  onReject,
  onForward,
}: OutpassRequestCardProps) => {
  return (
    <TableRow>
      <TableCell>{request.studentName}</TableCell>
      <TableCell>{request.roomNumber}</TableCell>
      <TableCell>{new Date(request.timeOut).toLocaleString()}</TableCell>
      <TableCell>{new Date(request.timeIn).toLocaleString()}</TableCell>
      <TableCell>{request.reason}</TableCell>
      <TableCell className="space-x-2">
        <Button
          onClick={() => onApprove(request.id)}
          variant="outline"
          className="bg-green-50 hover:bg-green-100 text-green-600"
        >
          Approve
        </Button>
        {onForward && (
          <Button
            onClick={() => onForward(request.id)}
            variant="outline"
            className="bg-blue-50 hover:bg-blue-100 text-blue-600"
          >
            Forward to Principal
          </Button>
        )}
        <Button
          onClick={() => onReject(request.id)}
          variant="outline"
          className="bg-red-50 hover:bg-red-100 text-red-600"
        >
          Reject
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OutpassRequestCard;