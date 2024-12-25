import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { useState } from "react";

const Login = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Handler for when admin/student login is switched
  const handleLoginTypeChange = (isAdmin: boolean) => {
    setShowAdminLogin(isAdmin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Outpass Management System
          </CardTitle>
          <CardDescription>
            {showAdminLogin ? "Admin login" : "Login or create an account to continue"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full" style={{ gridTemplateColumns: showAdminLogin ? '1fr' : '1fr 1fr' }}>
              <TabsTrigger value="login" data-tab="login">Login</TabsTrigger>
              {!showAdminLogin && (
                <TabsTrigger value="signup" data-tab="signup">Sign Up</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="login">
              <LoginForm onLoginTypeChange={handleLoginTypeChange} />
            </TabsContent>
            {!showAdminLogin && (
              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;