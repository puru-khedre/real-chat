import LoginForm from "@/app/(auth)/components/LoginForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageNavigator from "@/app/(auth)/components/PageNavigator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "RealChat | Login",
};

export default function Login() {
  return (
    <>
      <PageNavigator />
      <div className="flex items-center justify-center h-screen">
        <Card className="sm:w-3/5 max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login into your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
