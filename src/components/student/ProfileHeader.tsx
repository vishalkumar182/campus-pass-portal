import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const ProfileHeader = ({ isEditing, onEdit, onCancel, onSave }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-primary">Student Profile</h2>
      {!isEditing ? (
        <Button onClick={onEdit}>Edit Profile</Button>
      ) : (
        <div className="space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;