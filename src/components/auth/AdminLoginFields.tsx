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

  const handleRoleSelect = (value: "RT" | "principal" | "advisor") => {
    setAdminType(value);
    setSelectedDepartment("");
    setSelectedYear("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-primary">Select Admin Role</Label>
        <RadioGroup
          value={adminType}
          onValueChange={handleRoleSelect}
          className="grid grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/5 transition-colors border border-primary/10">
            <RadioGroupItem value="RT" id="rt" />
            <Label htmlFor="rt" className="cursor-pointer font-medium">RT</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/5 transition-colors border border-primary/10">
            <RadioGroupItem value="principal" id="principal" />
            <Label htmlFor="principal" className="cursor-pointer font-medium">Principal</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/5 transition-colors border border-primary/10">
            <RadioGroupItem value="advisor" id="advisor" />
            <Label htmlFor="advisor" className="cursor-pointer font-medium">Class Advisor</Label>
          </div>
        </RadioGroup>
      </div>

      {adminType === "advisor" && (
        <div className="space-y-4">
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
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="admin-code" className="font-medium">Admin Code</Label>
        <PasswordInput
          id="admin-code"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          placeholder="Enter admin code"
        />
      </div>
    </div>
  );
};