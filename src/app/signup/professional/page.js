"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpHelper, signUpUser } from "@/actions/AuthAction";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const formSchema = z.object({
  firstname: z.string().trim().min(2, { message: "First name must be at least 2 characters." }),
  lastname: z.string().trim().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(6, { message: "Password must be at least 6 characters long" }),
  location: z.string(),
  profession: z.enum(["carpenter", "plumber", "electrician"], { message: "Select at least one" }),
  pricing: z.string().optional(),
  pricingPer: z.enum(["/hr", "/day", "/month", "depends"], { message: "Select a valid pricing option" }),
});

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      location: "",
      profession: "carpenter",
      pricing: "",
      pricingPer: "/hr",
    },
  });

  async function onSubmit(values) {
    console.log("Submitting:", values);
    const result = await signUpHelper(values);
    if (result.success) {
      router.push("/login/professional");
    } else {
      console.error("Signup failed:", result.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* First Name */}
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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




              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Profession */}
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profession</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select profession" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="carpenter">Carpenter</SelectItem>
                        <SelectItem value="plumber">Plumber</SelectItem>
                        <SelectItem value="electrician">Electrician</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pricing */}
              <FormField
                control={form.control}
                name="pricing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pricing (e.g. 500)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pricing Per */}
              <FormField
                control={form.control}
                name="pricingPer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing Per</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="/hr">Per Hour</SelectItem>
                        <SelectItem value="/day">Per Day</SelectItem>
                        <SelectItem value="/month">Per Month</SelectItem>
                        <SelectItem value="depends">Depends</SelectItem>
                      </SelectContent>
                    </Select>
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
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </Form>
          <div className="flex justify-center mt-4">
            <span className="text-gray-500">Already have an account?&nbsp;</span>
            <Link href="/login" className="text-blue-500 ">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
