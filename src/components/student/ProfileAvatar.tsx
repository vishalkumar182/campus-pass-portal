import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface ProfileAvatarProps {
  photoUrl: string;
  name: string;
  isEditing: boolean;
  onPhotoChange: (url: string) => void;
}

const ProfileAvatar = ({ photoUrl, name, isEditing, onPhotoChange }: ProfileAvatarProps) => {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-6 flex justify-center">
      <div className="text-center">
        <Avatar className="w-32 h-32 mx-auto mb-4">
          <AvatarImage src={photoUrl || "/placeholder.svg"} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        {isEditing && (
          <div>
            <Label htmlFor="photo" className="cursor-pointer">
              <div className="text-sm text-blue-600 hover:text-blue-800">
                Change Photo
              </div>
            </Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAvatar;