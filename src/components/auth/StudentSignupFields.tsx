import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface StudentSignupFieldsProps {
  formData: {
    registrationNumber: string;
    department: string;
    year: string;
    roomNumber: string;
    phoneNumber: string;
  };
  updateFormData: (field: string, value: string) => void;
}

export const StudentSignupFields = ({
  formData,
  updateFormData,
}: StudentSignupFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="registration-number">Registration Number</Label>
        <Input
          id="registration-number"
          value={formData.registrationNumber}
          onChange={(e) => updateFormData("registrationNumber", e.target.value)}
          required
          placeholder="Enter registration number"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => updateFormData("department", e.target.value)}
            required
            placeholder="Enter department"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            value={formData.year}
            onChange={(e) => updateFormData("year", e.target.value)}
            required
            placeholder="Enter year"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="room-number">Room Number (Optional)</Label>
          <Input
            id="room-number"
            value={formData.roomNumber}
            onChange={(e) => updateFormData("roomNumber", e.target.value)}
            placeholder="Enter room number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input
            id="phone-number"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData("phoneNumber", e.target.value)}
            required
            placeholder="Enter phone number"
          />
        </div>
      </div>
    </>
  );
};