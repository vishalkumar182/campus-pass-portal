import { useAuth } from "@/contexts/AuthContext";

const StudentProfile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Student Profile</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-gray-900">{user?.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Registration Number</label>
            <p className="text-gray-900">{user?.registrationNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Department</label>
            <p className="text-gray-900">{user?.department}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Year</label>
            <p className="text-gray-900">{user?.year}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone Number</label>
            <p className="text-gray-900">{user?.phoneNumber}</p>
          </div>
          {user?.roomNumber && (
            <div>
              <label className="text-sm font-medium text-gray-500">Room Number</label>
              <p className="text-gray-900">{user?.roomNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;