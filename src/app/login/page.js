"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { signUpUser } from "@/actions/AuthAction";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { User, Wrench, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  role: z.enum(["user", "professional"], { message: "Please select a role." }),
});

export default function SignUpForm() {
  const [selectedRole, setSelectedRole] = useState("professional");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "professional",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const pushUrl = "/login/" + values.role;
    router.push(pushUrl);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Choose your role to continue to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            value: "user",
                            label: "User",
                            icon: User,
                            description: "Looking for services",
                          },
                          {
                            value: "professional",
                            label: "Professional",
                            icon: Wrench,
                            description: "Providing services",
                          },
                        ].map((role) => (
                          <motion.button
                            key={role.value}
                            type="button"
                            onClick={() => {
                              setSelectedRole(role.value);
                              field.onChange(role.value);
                            }}
                            className={cn(
                              "relative flex flex-col items-center justify-center rounded-lg border p-4 transition-all hover:border-primary",
                              selectedRole === role.value
                                ? "border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/20"
                                : "border-muted-foreground/25"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {selectedRole === role.value && (
                              <div className="absolute -right-2 -top-2 rounded-full bg-primary p-1">
                                <Check className="h-3 w-3 text-primary-foreground" />
                              </div>
                            )}
                            <role.icon
                              className={cn(
                                "mb-2 h-6 w-6",
                                selectedRole === role.value
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              )}
                            />
                            <span className="font-medium">{role.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {role.description}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}



         
