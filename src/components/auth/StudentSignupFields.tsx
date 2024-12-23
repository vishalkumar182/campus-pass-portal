import { DepartmentSelector } from "./DepartmentSelector";
import { YearSelector } from "./YearSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="registration-number">Registration Number</Label>
        <Input
          id="registration-number"
          value={formData.registrationNumber}
          onChange={(e) => updateFormData("registrationNumber", e.target.value)}
          required
          placeholder="Enter your registration number"
        />
      </div>

      <DepartmentSelector
        selectedDepartment={formData.department}
        setSelectedDepartment={(value) => updateFormData("department", value)}
      />

      <YearSelector
        selectedYear={formData.year}
        setSelectedYear={(value) => updateFormData("year", value)}
      />

      <div className="space-y-2">
        <Label htmlFor="room-number">Room Number</Label>
        <Input
          id="room-number"
          value={formData.roomNumber}
          onChange={(e) => updateFormData("roomNumber", e.target.value)}
          required
          placeholder="Enter your room number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone-number">Phone Number</Label>
        <Input
          id="phone-number"
          value={formData.phoneNumber}
          onChange={(e) => updateFormData("phoneNumber", e.target.value)}
          required
          placeholder="Enter your phone number"
          type="tel"
        />
      </div>
    </div>
  );
};