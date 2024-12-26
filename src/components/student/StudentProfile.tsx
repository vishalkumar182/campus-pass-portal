import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    roomNumber: user?.roomNumber || "",
    photoUrl: user?.photoUrl || "",
  });

  if (!user) {
    return <div>Loading profile...</div>;
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    try {
      // Update user data in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) => 
        u.email === user.email ? { ...u, ...formData } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      
      // Update current user
      updateUser({ ...user, ...formData });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Student Profile</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>

      <div className="mb-6 flex justify-center">
        <div className="text-center">
          <Avatar className="w-32 h-32 mx-auto mb-4">
            <AvatarImage src={formData.photoUrl || "/placeholder.svg"} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <div>
              <Label htmlFor="photo" className="cursor-pointer">
                <div className="text-sm text-blue-600 hover:text-blue-800">
                  Change Photo
                </div>
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-500">Name</Label>
            {isEditing ? (
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mt-1"
              />
            ) : (
              <p className="text-gray-900">{user.name}</p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Email</Label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">
              Registration Number
            </Label>
            <p className="text-gray-900">{user.registrationNumber}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Department</Label>
            <p className="text-gray-900">{user.department}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Year</Label>
            <p className="text-gray-900">{user.year}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">
              Phone Number
            </Label>
            {isEditing ? (
              <Input
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                className="mt-1"
              />
            ) : (
              <p className="text-gray-900">{user.phoneNumber}</p>
            )}
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">
              Room Number
            </Label>
            {isEditing ? (
              <Input
                value={formData.roomNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    roomNumber: e.target.value,
                  }))
                }
                className="mt-1"
              />
            ) : (
              <p className="text-gray-900">{user.roomNumber}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;