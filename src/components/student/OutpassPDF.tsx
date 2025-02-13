import React from "react";

interface OutpassPDFProps {
  outpassData: {
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

const OutpassPDF = React.forwardRef<HTMLDivElement, OutpassPDFProps>(
  ({ outpassData }, ref) => {
    // Default signatures
    const defaultRTSignature = "RT Admin";
    const defaultPrincipalSignature = "Principal";

    return (
      <div ref={ref} className="p-8 bg-white">
        <div className="text-center mb-8 border-b pb-4">
          <img 
            src="/college-logo.png" 
            alt="College Logo" 
            className="mx-auto mb-4 h-20 w-auto"
          />
          <h1 className="text-3xl font-bold text-primary mb-2">
            Grace College of Engineering
          </h1>
          <h2 className="text-xl font-semibold text-gray-600">Student Outpass</h2>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <p className="font-semibold text-gray-600">Student Name</p>
            <p className="text-lg">{outpassData.studentName}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Registration Number</p>
            <p className="text-lg">{outpassData.registrationNumber}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Department</p>
            <p className="text-lg">{outpassData.department}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Year</p>
            <p className="text-lg">{outpassData.year}</p>
          </div>
          {outpassData.roomNumber && (
            <div>
              <p className="font-semibold text-gray-600">Room Number</p>
              <p className="text-lg">{outpassData.roomNumber}</p>
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-600">Phone Number</p>
            <p className="text-lg">{outpassData.phoneNumber}</p>
          </div>
        </div>

        <div className="space-y-4 border-t border-b py-4 mb-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-gray-600">Time Out</p>
              <p className="text-lg">{new Date(outpassData.timeOut).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Time In</p>
              <p className="text-lg">{new Date(outpassData.timeIn).toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Reason</p>
            <p className="text-lg">{outpassData.reason}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <div className="border-b-2 border-black pb-2 mb-2 font-serif text-lg">
              {outpassData.rtSignature || defaultRTSignature}
            </div>
            <p className="text-sm font-semibold text-gray-600">RT Signature</p>
          </div>
          {outpassData.status === "approved_by_principal" && (
            <div className="text-center">
              <div className="border-b-2 border-black pb-2 mb-2 font-serif text-lg">
                {outpassData.principalSignature || defaultPrincipalSignature}
              </div>
              <p className="text-sm font-semibold text-gray-600">Principal Signature</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is an electronically generated outpass.</p>
          <p>Valid only with authorized signatures.</p>
        </div>
      </div>
    );
  }
);

OutpassPDF.displayName = "OutpassPDF";

export default OutpassPDF;