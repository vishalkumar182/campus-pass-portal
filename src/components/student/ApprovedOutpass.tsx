import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { usePDF } from "react-to-pdf";
import OutpassPDF from "./OutpassPDF";

interface ApprovedOutpassProps {
  outpass: {
    id: string;
    studentName: string;
    registrationNumber: string;
    department: string;
    year: string;
    roomNumber?: string;
    phoneNumber: string;
    timeOut: string;
    timeIn: string;
    reason: string;
    status: string;
    approvedBy?: string;
    rtSignature?: string;
    principalSignature?: string;
  };
}

const ApprovedOutpass = ({ outpass }: ApprovedOutpassProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const { toPDF, targetRef } = usePDF({
    filename: `outpass_${outpass.id}.pdf`,
  });

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await toPDF();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setIsGenerating(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div ref={targetRef}>
        <OutpassPDF ref={pdfRef} outpassData={outpass} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-semibold">Time Out:</p>
          <p>{new Date(outpass.timeOut).toLocaleString()}</p>
        </div>
        <div>
          <p className="font-semibold">Time In:</p>
          <p>{new Date(outpass.timeIn).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="font-semibold">Reason:</p>
        <p>{outpass.reason}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">Status:</p>
          <p className="text-green-600">{outpass.status.toUpperCase()}</p>
          {outpass.approvedBy && (
            <p className="text-sm text-gray-600">
              Approved by: {outpass.approvedBy}
            </p>
          )}
        </div>
        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          className="bg-primary hover:bg-primary/90"
        >
          {isGenerating ? "Generating PDF..." : "Download Outpass"}
        </Button>
      </div>
    </div>
  );
};

export default ApprovedOutpass;