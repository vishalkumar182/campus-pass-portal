import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DepartmentSelectorProps {
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
}

export const DepartmentSelector = ({
  selectedDepartment,
  setSelectedDepartment,
}: DepartmentSelectorProps) => {
  const departments = [
    { id: "cse", name: "Computer Science and Engineering" },
    { id: "aids", name: "Artificial Intelligence and Data Science" },
    { id: "mech", name: "Mechanical Engineering" },
    { id: "eee", name: "Electrical and Electronics Engineering" },
    { id: "ece", name: "Electronics and Communication Engineering" },
  ];

  return (
    <div className="space-y-3">
      <Label className="font-medium">Select Department</Label>
      <RadioGroup
        value={selectedDepartment}
        onValueChange={setSelectedDepartment}
        className="grid grid-cols-1 gap-2"
      >
        {departments.map((dept) => (
          <div 
            key={dept.id} 
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/5 transition-colors border border-primary/10"
          >
            <RadioGroupItem value={dept.id} id={dept.id} />
            <Label htmlFor={dept.id} className="flex-grow cursor-pointer font-medium">
              {dept.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};