"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

const formSchema = z.object({
  firstname: z.string().trim().min(2, { message: "first must be at least 2 characters." }),
  lastname: z.string().trim().min(2, { message: "last must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["helper", "consumer"], { message: "Please select a role." }),
  location: z.string(),
  profession: z.enum(["carpenter", "plumber", "electrician"], { message: "select at least one" }),
  pricing: z.string({ message: "enter pricing" }).optional(),
  pricingPer: z.enum(["/hr", "/day", "/month", "depends"], { message: "select at least one" }),
});

export default function SignUpForm() {
  const [selectedRole, setSelectedRole] = useState("consumer");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      location: "",
      profession: "",
      pricing: 0,
      pricingPer: "",
      email: "",
      password: "",
      role: "consumer",
    },
  });

  async function onSubmit(values) {
    console.log("Form Submitted:", values);
    setTimeout(() => {
      router.push("/login");
    }, 500);
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
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center w-full">
                      {['helper', 'consumer'].map((role) => (
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
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="rahul" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="patil" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              {selectedRole === "helper" && (
                <>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your location..." type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem >
                        <FormLabel>Profession</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""} >
                          <SelectTrigger>
                            <SelectValue placeholder="Select profession" />
                          </SelectTrigger>
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
                  <div className="flex flex-row "> 
                    <FormField
                      control={form.control}
                      name="pricing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pricing</FormLabel>
                          <FormControl>
                            <Input placeholder="0" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pricingPer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pricing Per</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing method" />
                            </SelectTrigger>
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
                  </div>
                </>
              )}

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
              <Button type="submit" className="w-full">Submit</Button>
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
