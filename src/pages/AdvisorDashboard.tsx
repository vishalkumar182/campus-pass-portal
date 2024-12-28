import DashboardHeader from "@/components/shared/DashboardHeader";

const AdvisorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Class Advisor Dashboard</h1>
        {/* Add Advisor specific features here */}
      </main>
    </div>
  );
};

export default AdvisorDashboard;