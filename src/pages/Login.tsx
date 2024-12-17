import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginRole, setLoginRole] = useState<"student" | "admin">("student");

  // Signup state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as "student" | "admin",
    registrationNumber: "",
    department: "",
    year: "",
    roomNumber: "",
    phoneNumber: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPassword, loginRole);
      navigate(loginRole === "student" ? "/student-dashboard" : "/admin-dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(signupData);
      navigate(
        signupData.role === "student" ? "/student-dashboard" : "/admin-dashboard"
      );
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const updateSignupData = (field: string, value: string) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Outpass Management System
          </CardTitle>
          <CardDescription>
            Login or create an account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={loginRole === "student" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setLoginRole("student")}
                  >
                    Student
                  </Button>
                  <Button
                    type="button"
                    variant={loginRole === "admin" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setLoginRole("admin")}
                  >
                    Admin
                  </Button>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    value={signupData.name}
                    onChange={(e) => updateSignupData("name", e.target.value)}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => updateSignupData("email", e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => updateSignupData("password", e.target.value)}
                    required
                    placeholder="Create a password"
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={signupData.role === "student" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => updateSignupData("role", "student")}
                  >
                    Student
                  </Button>
                  <Button
                    type="button"
                    variant={signupData.role === "admin" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => updateSignupData("role", "admin")}
                  >
                    Admin
                  </Button>
                </div>

                {signupData.role === "student" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="registration-number">
                        Registration Number
                      </Label>
                      <Input
                        id="registration-number"
                        value={signupData.registrationNumber}
                        onChange={(e) =>
                          updateSignupData("registrationNumber", e.target.value)
                        }
                        required
                        placeholder="Enter registration number"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={signupData.department}
                          onChange={(e) =>
                            updateSignupData("department", e.target.value)
                          }
                          required
                          placeholder="Enter department"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          value={signupData.year}
                          onChange={(e) => updateSignupData("year", e.target.value)}
                          required
                          placeholder="Enter year"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="room-number">Room Number (Optional)</Label>
                        <Input
                          id="room-number"
                          value={signupData.roomNumber}
                          onChange={(e) =>
                            updateSignupData("roomNumber", e.target.value)
                          }
                          placeholder="Enter room number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input
                          id="phone-number"
                          value={signupData.phoneNumber}
                          onChange={(e) =>
                            updateSignupData("phoneNumber", e.target.value)
                          }
                          required
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  </>
                )}

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;