import LoginForm from "@/components/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "RealChat | Login",
};

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="sm:w-3/5 max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl self-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
