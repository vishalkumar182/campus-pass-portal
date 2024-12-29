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
    return (
      <div ref={ref} className="p-8 bg-white">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Grace College of Engineering</h1>
          <h2 className="text-xl font-semibold">Student Outpass</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Student Name:</p>
              <p>{outpassData.studentName}</p>
            </div>
            <div>
              <p className="font-semibold">Registration Number:</p>
              <p>{outpassData.registrationNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Department:</p>
              <p>{outpassData.department}</p>
            </div>
            <div>
              <p className="font-semibold">Year:</p>
              <p>{outpassData.year}</p>
            </div>
            {outpassData.roomNumber && (
              <div>
                <p className="font-semibold">Room Number:</p>
                <p>{outpassData.roomNumber}</p>
              </div>
            )}
            <div>
              <p className="font-semibold">Phone Number:</p>
              <p>{outpassData.phoneNumber}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <p className="font-semibold">Time Out:</p>
              <p>{new Date(outpassData.timeOut).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Expected Time In:</p>
              <p>{new Date(outpassData.timeIn).toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold">Reason:</p>
              <p>{outpassData.reason}</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <div className="grid grid-cols-2 gap-4">
              {outpassData.rtSignature && (
                <div className="text-center">
                  <div className="border-b-2 border-black pb-2 mb-2">
                    {outpassData.rtSignature}
                  </div>
                  <p className="text-sm font-semibold">RT Signature</p>
                </div>
              )}
              {outpassData.principalSignature && (
                <div className="text-center">
                  <div className="border-b-2 border-black pb-2 mb-2">
                    {outpassData.principalSignature}
                  </div>
                  <p className="text-sm font-semibold">Principal Signature</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="font-semibold">Status:</p>
              <p className="text-green-600">
                {outpassData.status.toUpperCase()}
              </p>
              {outpassData.approvedBy && (
                <p className="text-sm mt-1">
                  Approved by: {outpassData.approvedBy}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

OutpassPDF.displayName = "OutpassPDF";

export default OutpassPDF;