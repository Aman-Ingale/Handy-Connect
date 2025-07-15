//login form for provider
"use client";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ThreeDot } from "react-loading-indicators";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(6, { message: "Password must be at least 6 characters long" }),
});

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
//POST request for verifying provider
  async function onSubmit(values) {
    setIsLoading(true)
    console.log("Submitting:", values);
    const r = await fetch("/api/login/provider", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const result = await r.json();
    //after verification provider is redirected to it's dashboard
    if (result.success) {
      // toast.success('Login Succesfull', {
      //   description: result.message,
      // })
      localStorage.setItem("id", result.data.toString());
      router.push("/provider/dashboard");

    } else {
      toast.error('Invalid Credential', {
        description: result.message,
      })
      console.log("Signup failed:", result.message);
    }
  }
  if(isLoading){
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <ThreeDot variant="brick-stack" color="#000000" size="medium" text="" textColor="" />
      </div>
    )
  }
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>
          <div className="flex justify-center mt-4">
            <span className="text-gray-500">Don't have an account?&nbsp;</span>
            <Link href="/signup" className="text-blue-500 ">
              SignUp
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
