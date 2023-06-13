import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "RealChat | Sign up",
};

export default function SignUp() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="sm:w-3/5 max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl self-center">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
