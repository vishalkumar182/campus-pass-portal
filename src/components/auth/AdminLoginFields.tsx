import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PasswordInput } from "./PasswordInput";

interface AdminLoginFieldsProps {
  adminCode: string;
  setAdminCode: (value: string) => void;
  adminType: "RT" | "principal";
  setAdminType: (value: "RT" | "principal") => void;
}

export const AdminLoginFields = ({
  adminCode,
  setAdminCode,
  adminType,
  setAdminType,
}: AdminLoginFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="admin-code">Admin Code</Label>
        <PasswordInput
          id="admin-code"
          value={adminCode}
          onChange={(e) => setAdminCode(e.target.value)}
          placeholder="Enter admin code"
        />
      </div>
      <div className="space-y-2">
        <Label>Admin Type</Label>
        <RadioGroup
          value={adminType}
          onValueChange={(value) => setAdminType(value as "RT" | "principal")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="RT" id="rt" />
            <Label htmlFor="rt">RT</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="principal" id="principal" />
            <Label htmlFor="principal">Principal</Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
};