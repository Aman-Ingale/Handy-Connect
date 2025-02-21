"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
  role: z.enum(["helper", "consumer"], { message: "Please select a role." }),
});

export default function AuthForm() {
  const [selectedRole, setSelectedRole] = useState("consumer");

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "consumer", // Default selected role set to consumer
    },
  });

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", values.role);

    // Handle login or signup logic here
    console.log("Form Submitted:", values);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login as Helper or Consumer</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Role Selection */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <div className="flex gap-2 items-center w-full">
                      {["helper", "consumer"].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role);
                            field.onChange(role);
                          }}
                          className={`px-4 py-2 border w-1/2 rounded-md transition-all ${selectedRole === role ? 'bg-black text-white' : 'bg-white text-black border-gray-300'}`}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email..." type="email" {...field} />
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
                      <Input placeholder="Enter password..." type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>

          {/* Link to Login */}
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
