"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/Form";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { KeySquare, Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUser } from "@/contexts/UserContext";
import FormSubmitButton from "./FormSubmitButton";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(30)
    .regex(/[a-zA-Z]/)
    .regex(/[0-9]/),
});

const LoginForm = () => {
  const { user, status, login } = useUser();

  console.log(user, status);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    login(values.email, values.password);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>
                <Mail className="inline mr-2 h-4 v-4" />
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>
                <KeySquare className="inline mr-2 h-4 v-4" /> Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-row justify-between">
          <FormSubmitButton isLoading={status.isLoading}>
            Login
          </FormSubmitButton>
          <Button asChild variant="link" size="sm" className="opacity-70">
            <Link href="/signup">Create account</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
