import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface OutpassRequestCardProps {
  request: {
    id: string;
    studentName: string;
    roomNumber: string;
    timeOut: string;
    timeIn: string;
    reason: string;
  };
  onApprove: (id: string, signature: string) => void;
  onReject: (id: string) => void;
  onForward?: (id: string, signature: string) => void;
  role: "rt" | "principal";
}

const OutpassRequestCard = ({
  request,
  onApprove,
  onReject,
  onForward,
  role,
}: OutpassRequestCardProps) => {
  const [signature, setSignature] = useState("");
  const [showSignature, setShowSignature] = useState(false);

  const handleApprove = () => {
    if (!signature) {
      alert("Please provide your digital signature");
      return;
    }
    onApprove(request.id, signature);
    setSignature("");
    setShowSignature(false);
  };

  const handleForward = () => {
    if (!signature) {
      alert("Please provide your digital signature");
      return;
    }
    onForward?.(request.id, signature);
    setSignature("");
    setShowSignature(false);
  };

  return (
    <TableRow>
      <TableCell>{request.studentName}</TableCell>
      <TableCell>{request.roomNumber}</TableCell>
      <TableCell>{new Date(request.timeOut).toLocaleString()}</TableCell>
      <TableCell>{new Date(request.timeIn).toLocaleString()}</TableCell>
      <TableCell>{request.reason}</TableCell>
      <TableCell>
        <div className="space-y-2">
          {showSignature ? (
            <div className="space-y-2">
              <Input
                placeholder="Enter your digital signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="w-full"
              />
              <div className="space-x-2">
                <Button
                  onClick={handleApprove}
                  variant="outline"
                  className="bg-green-50 hover:bg-green-100 text-green-600"
                >
                  Confirm Approval
                </Button>
                {role === "rt" && onForward && (
                  <Button
                    onClick={handleForward}
                    variant="outline"
                    className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                  >
                    Forward to Principal
                  </Button>
                )}
                <Button
                  onClick={() => setShowSignature(false)}
                  variant="outline"
                  className="bg-gray-50 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-x-2">
              <Button
                onClick={() => setShowSignature(true)}
                variant="outline"
                className="bg-green-50 hover:bg-green-100 text-green-600"
              >
                Approve
              </Button>
              {role === "rt" && onForward && (
                <Button
                  onClick={() => setShowSignature(true)}
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
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OutpassRequestCard;