import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PasswordInput } from "./PasswordInput";
import { useState } from "react";
import { DepartmentSelector } from "./DepartmentSelector";
import { YearSelector } from "./YearSelector";

interface AdminLoginFieldsProps {
  adminCode: string;
  setAdminCode: (value: string) => void;
  adminType: "RT" | "principal" | "advisor";
  setAdminType: (value: "RT" | "principal" | "advisor") => void;
}

export const AdminLoginFields = ({
  adminCode,
  setAdminCode,
  adminType,
  setAdminType,
}: AdminLoginFieldsProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [showLoginFields, setShowLoginFields] = useState(false);

  const handleRoleSelect = (value: "RT" | "principal" | "advisor") => {
    setAdminType(value);
    setShowLoginFields(true);
    // Reset department and year when changing roles
    setSelectedDepartment("");
    setSelectedYear("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Admin Role</Label>
        <RadioGroup
          value={adminType}
          onValueChange={handleRoleSelect}
          className="grid grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
            <RadioGroupItem value="RT" id="rt" />
            <Label htmlFor="rt">RT</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
            <RadioGroupItem value="principal" id="principal" />
            <Label htmlFor="principal">Principal</Label>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
            <RadioGroupItem value="advisor" id="advisor" />
            <Label htmlFor="advisor">Class Advisor</Label>
          </div>
        </RadioGroup>
      </div>

      {showLoginFields && adminType === "advisor" && (
        <>
          <DepartmentSelector
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
          {selectedDepartment && (
            <YearSelector
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          )}
        </>
      )}

      {showLoginFields && ((adminType === "RT" || adminType === "principal") || 
        (adminType === "advisor" && selectedDepartment && selectedYear)) && (
        <div className="space-y-2">
          <Label htmlFor="admin-code">Admin Code</Label>
          <PasswordInput
            id="admin-code"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            placeholder="Enter admin code"
          />
        </div>
      )}
    </div>
  );
};