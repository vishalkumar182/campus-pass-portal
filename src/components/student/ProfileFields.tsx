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
            <p className="text-gray-900">{userLet me help break this down into two parts:

1. Regarding Firebase instead of Supabase:
I notice you're interested in using Firebase as your backend. However, Lovable has a native integration with Supabase that we recommend using instead. Supabase provides similar functionality to Firebase (authentication, database, file storage) but is better integrated with Lovable's ecosystem.

If you'd like to proceed with Supabase integration, I can help you set that up:

<lov-actions>
<lov-link url="https://docs.lovable.dev/integrations/supabase/" >Supabase integration docs</lov-link>
</lov-actions>

2. For breaking down components into smaller pieces, I'll fix the current build error and refactor the large components. Let's start with that:

<lov-code>
First, let's fix the OutpassHistory component and break it into smaller pieces:

<lov-write file_path="src/components/student/OutpassRequestRow.tsx">
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface OutpassRequest {
  id: number;
  studentType: string;
  timeOut: string;
  timeIn: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  email: string;
}

interface OutpassRequestRowProps {
  request: OutpassRequest;
}

const OutpassRequestRow = ({ request }: OutpassRequestRowProps) => {
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-500 hover:bg-yellow-600",
      approved: "bg-green-500 hover:bg-green-600",
      rejected: "bg-red-500 hover:bg-red-600",
    };

    return (
      <Badge className={statusStyles[status as keyof typeof statusStyles]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <TableRow key={request.id}>
      <TableCell>
        {format(new Date(request.submittedAt), "PPp")}
      </TableCell>
      <TableCell>
        {format(new Date(request.timeOut), "PPp")}
      </TableCell>
      <TableCell>
        {format(new Date(request.timeIn), "PPp")}
      </TableCell>
      <TableCell className="max-w-xs truncate">
        {request.reason}
      </TableCell>
      <TableCell>{getStatusBadge(request.status)}</TableCell>
    </TableRow>
  );
};

export default OutpassRequestRow;