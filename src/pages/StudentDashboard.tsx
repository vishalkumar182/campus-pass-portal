import { useAuth } from "@/contexts/AuthContext";
import StudentProfile from "@/components/student/StudentProfile";
import OutpassHistory from "@/components/student/OutpassHistory";
import DashboardHeader from "@/components/shared/DashboardHeader";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-primary mb-8">Student Dashboard</h1>
        
        <div className="space-y-8">
          <StudentProfile />
          <OutpassHistory />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;