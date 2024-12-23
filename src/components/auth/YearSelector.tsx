import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface YearSelectorProps {
  selectedYear: string;
  setSelectedYear: (value: string) => void;
}

export const YearSelector = ({
  selectedYear,
  setSelectedYear,
}: YearSelectorProps) => {
  const years = [
    { id: "1", name: "First Year" },
    { id: "2", name: "Second Year" },
    { id: "3", name: "Third Year" },
    { id: "4", name: "Fourth Year" },
  ];

  return (
    <div className="space-y-2">
      <Label>Select Year</Label>
      <RadioGroup
        value={selectedYear}
        onValueChange={setSelectedYear}
        className="grid grid-cols-2 gap-2"
      >
        {years.map((year) => (
          <div key={year.id} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
            <RadioGroupItem value={year.id} id={`year-${year.id}`} />
            <Label htmlFor={`year-${year.id}`} className="cursor-pointer">
              {year.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};