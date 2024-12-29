import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentProfile from "@/components/student/StudentProfile";
import OutpassHistory from "@/components/student/OutpassHistory";
import OutpassForm from "@/components/student/OutpassForm";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import ApprovedOutpass from "@/components/student/ApprovedOutpass";
import { useState } from "react";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [showOutpassPDF, setShowOutpassPDF] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  const latestApprovedOutpass = {
    id: "latest",
    studentName: user.name,
    registrationNumber: user.registrationNumber,
    department: user.department,
    year: user.year,
    roomNumber: user.roomNumber,
    phoneNumber: user.phoneNumber,
    timeOut: new Date().toISOString(),
    timeIn: new Date().toISOString(),
    reason: "Latest approved outpass",
    status: "approved",
    approvedBy: "RT Admin",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-500 hover:text-gray-700">
              Back to Home
            </a>
            <h1 className="text-xl font-semibold text-primary">
              Grace College of Engineering
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <Button variant="outline" onClick={() => {}}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Student Dashboard</h2>

        <Tabs defaultValue="outpass-history" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="outpass-history">Outpass History</TabsTrigger>
            <TabsTrigger value="request-outpass">Request Outpass</TabsTrigger>
            <TabsTrigger value="my-profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="outpass-history" className="space-y-4">
            <OutpassHistory />
          </TabsContent>

          <TabsContent value="request-outpass">
            <OutpassForm />
          </TabsContent>

          <TabsContent value="my-profile" className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <StudentProfile />
              </div>
              <Button
                onClick={() => setShowOutpassPDF(true)}
                className="flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                Download Latest Outpass
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {showOutpassPDF && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowOutpassPDF(false)}
                >
                  Close
                </Button>
              </div>
              <ApprovedOutpass outpass={latestApprovedOutpass} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;