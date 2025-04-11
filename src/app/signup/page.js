"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpUser } from "@/actions/AuthAction";
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
  role: z.enum(["user", "professional"], { message: "Please select a role." }),
});

export default function SignUpForm() {
  const [selectedRole, setSelectedRole] = useState("professional");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "professional",
    },
  });

  async function onSubmit(values) {
    const pushUrl = "/signup/"+values.role
    router.push(pushUrl);
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
                      {["user", "professional"].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role);
                            field.onChange(role);
                          }}
                          className={`px-4 py-2 border w-1/2 rounded-md transition-all ${selectedRole === role ? "bg-black text-white" : "bg-white text-black border-gray-300"}`}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                      ))}
                    </div>
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
