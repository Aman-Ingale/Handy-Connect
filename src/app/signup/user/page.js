"use client";
import { useRouter } from "next/navigation";
import { signUpConsumer } from "@/actions/AuthAction";
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

const formSchema = z.object({
  firstname: z.string().trim().min(2, { message: "First name must be at least 2 characters." }),
  lastname: z.string().trim().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(6, { message: "Password must be at least 6 characters long" }),
  gender: z.enum(["male", "female"], { required_error: "Please select gender" }),
  address: z.string().trim().min(10, { message: "Address must be at least 10 characters." }),
  location: z.string().trim().min(2, { message: "Location is required" }),
  phone: z.string().regex(/^[0-9]{10}$/, { message: "Invalid phone number" }),
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
      gender: undefined,
      address: "",
      location: "",
      phone: "",
    },
  });

  async function onSubmit(values) {
    console.log("Submitting:", values);
        const r = await fetch("/api/signup/client",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const result = await r.json();
    if (result.success) {
      router.push("/login/user");
    } else {
      console.error("Signup failed:", result.message);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-2xl p-8 shadow-xl rounded-xl bg-white text-black">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900">Sign Up</CardTitle>
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
                    <FormLabel className="text-gray-800">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" className="bg-gray-50 border border-gray-300" {...field} />
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
                    <FormLabel className="text-gray-800">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" className="bg-gray-50 border border-gray-300" {...field} />
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
                    <FormLabel className="text-gray-800">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="johndoe@example.com" className="bg-gray-50 border border-gray-300" {...field} />
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
                    <FormLabel className="text-gray-800">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-6"
                      >
                        <FormItem className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="r1" />
                          <FormLabel htmlFor="r1" className="text-gray-700">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="r2" />
                          <FormLabel htmlFor="r2" className="text-gray-700">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="1234567890" maxLength={10} className="bg-gray-50 border border-gray-300" {...field} />
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
                    <FormLabel className="text-gray-800">Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City or Area" className="bg-gray-50 border border-gray-300" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter full address" rows={3} className="bg-gray-50 border border-gray-300" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white text-lg transition-colors">
                Sign Up
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
                            <span className="text-sm text-muted-foreground">Already have an account?</span>
                            <Link href="/login" className="ml-1 text-sm text-blue-500 hover:underline">Login</Link>
                          </div>
        </CardContent>
      </Card>
    </div>
  );
}
