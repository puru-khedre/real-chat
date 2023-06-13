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
import { KeySquare, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserSquare } from "lucide-react";
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
  name: z.string().min(2).max(30),
});

const SignUpForm = () => {
  const { signup, status } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    signup(values.email, values.password, values.name);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>
                <UserSquare className="inline mr-2 h-4 v-4" /> Name
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input type="email" placeholder="Enter your email" {...field} />
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
            Sign Up
          </FormSubmitButton>
          <Button asChild variant="link" size="sm" className="opacity-70">
            <Link href="/login">Already have One</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
