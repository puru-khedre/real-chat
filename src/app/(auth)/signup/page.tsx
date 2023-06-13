import SignUpForm from "@/app/(auth)/components/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageNavigator from "../components/PageNavigator";

export const metadata = {
  title: "RealChat | Sign up",
};

export default function SignUp() {
  return (
    <>
      <PageNavigator />
      <div className="flex items-center justify-center h-screen">
        <Card className="sm:w-3/5 max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
