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
    <div className="space-y-3">
      <Label className="font-medium">Select Year</Label>
      <RadioGroup
        value={selectedYear}
        onValueChange={setSelectedYear}
        className="grid grid-cols-2 gap-2"
      >
        {years.map((year) => (
          <div 
            key={year.id} 
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-primary/5 transition-colors border border-primary/10"
          >
            <RadioGroupItem value={year.id} id={`year-${year.id}`} />
            <Label htmlFor={`year-${year.id}`} className="cursor-pointer font-medium">
              {year.name}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};