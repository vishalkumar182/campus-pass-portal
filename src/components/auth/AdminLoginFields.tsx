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

  return (
    <>
      <div className="space-y-2">
        <Label>Admin Type</Label>
        <RadioGroup
          value={adminType}
          onValueChange={(value) => setAdminType(value as "RT" | "principal" | "advisor")}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="RT" id="rt" />
            <Label htmlFor="rt">RT</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="principal" id="principal" />
            <Label htmlFor="principal">Principal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="advisor" id="advisor" />
            <Label htmlFor="advisor">Class Advisor</Label>
          </div>
        </RadioGroup>
      </div>

      {adminType === "advisor" && (
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

      {((adminType === "RT" || adminType === "principal") || 
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
    </>
  );
};