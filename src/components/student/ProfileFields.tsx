import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileFieldsProps {
  user: any;
  isEditing: boolean;
  formData: {
    name: string;
    phoneNumber: string;
    roomNumber: string;
  };
  onFormChange: (field: string, value: string) => void;
}

const ProfileFields = ({ user, isEditing, formData, onFormChange }: ProfileFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-500">Name</Label>
          {isEditing ? (
            <Input
              value={formData.name}
              onChange={(e) => onFormChange("name", e.target.value)}
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
              onChange={(e) => onFormChange("phoneNumber", e.target.value)}
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
              onChange={(e) => onFormChange("roomNumber", e.target.value)}
              className="mt-1"
            />
          ) : (
            <p className="text-gray-900">{user.roomNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileFields;