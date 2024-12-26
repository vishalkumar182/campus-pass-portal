import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { DialogClose } from "@/components/ui/dialog";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Get stored users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email);

      if (user) {
        // In a real application, this would send an email with a reset link
        // For this demo, we'll just show the password
        toast({
          title: "Password Recovery",
          description: `Your password is: ${user.password}`,
        });
      } else {
        toast({
          title: "User Not Found",
          description: "No account found with this email address.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Password recovery error:", error);
      toast({
        title: "Recovery Failed",
        description: "An error occurred while recovering your password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email</Label>
        <Input
          id="reset-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email address"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Recovering..." : "Recover Password"}
        </Button>
      </div>
    </form>
  );
};