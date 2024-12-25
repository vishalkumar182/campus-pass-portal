import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StudentProfile from "@/components/student/StudentProfile";
import OutpassForm from "@/components/student/OutpassForm";
import OutpassHistory from "@/components/student/OutpassHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/shared/DashboardHeader";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [studentType, setStudentType] = useState<"hosteler" | "dayscholar" | null>(null);
  const [showOutpassForm, setShowOutpassForm] = useState(false);

  const handleStudentTypeSelect = (value: "hosteler" | "dayscholar") => {
    setStudentType(value);
    setShowOutpassForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary">Student Dashboard</h2>
          </div>

          <Tabs defaultValue="history" className="space-y-6">
            <TabsList>
              <TabsTrigger value="history">Outpass History</TabsTrigger>
              <TabsTrigger value="request">Request Outpass</TabsTrigger>
              <TabsTrigger value="profile">My Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <OutpassHistory />
            </TabsContent>

            <TabsContent value="request" className="space-y-6">
              {!showOutpassForm ? (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Select Student Type</h2>
                  <RadioGroup
                    onValueChange={(value: "hosteler" | "dayscholar") =>
                      handleStudentTypeSelect(value)
                    }
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hosteler" id="hosteler" />
                      <Label htmlFor="hosteler">Hosteler</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dayscholar" id="dayscholar" />
                      <Label htmlFor="dayscholar">Day Scholar</Label>
                    </div>
                  </RadioGroup>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Outpass Request Form</h2>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowOutpassForm(false);
                        setStudentType(null);
                      }}
                    >
                      Change Student Type
                    </Button>
                  </div>
                  {studentType && (
                    <OutpassForm 
                      studentType={studentType} 
                      onSubmitSuccess={() => {
                        setShowOutpassForm(false);
                        setStudentType(null);
                      }} 
                    />
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile">
              <StudentProfile />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;