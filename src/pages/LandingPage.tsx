import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Grace College of Engineering
          </h1>
          <p className="text-xl text-gray-600">
            Mullakadu, Thoothukudi, Tamil Nadu
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">
              Campus Outpass Management System
            </h2>
            <p className="text-gray-600 mb-8">
              Welcome to our digital outpass management portal. This system streamlines the process of requesting and managing campus exit permissions for both students and administrators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-primary/90"
              >
                Login to Portal
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">For Students</h3>
              <p className="text-gray-600">Easy outpass requests, real-time status tracking, and digital approvals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">For Administrators</h3>
              <p className="text-gray-600">Efficient request management, detailed student records, and quick approval process.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Digital First</h3>
              <p className="text-gray-600">Paperless process, instant notifications, and secure data management.</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 pb-8">
          <p className="text-gray-600">© 2024 Grace College of Engineering. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;