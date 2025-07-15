"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { undefined, z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { use } from "react";
function page({ params }) {
  const { id } = use(params);
  const clientId = localStorage.getItem("id");
  const formSchema = z.object({
    jobtitle: z.string().trim().min(2, { message: "Job title must be at least 2 characters." }),
    location: z.string(),
    address: z.string(),
    description: z.string().max(500).optional(),
    date : z.date(),
    clientId : z.string().optional(),
    providerId : z.string().optional(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobtitle: "",
      location: "",
      address: "",
      description: "",
      date:"",
      providerId:id,
      clientId : clientId,
    },
  });
  async function onSubmit(values) {
    console.log(values)
      const r = await fetch(`/api/request/${id}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const result = await r.json();
    if (result.success) {
      console.log(result.message)
    } else {
      console.log(result.message)
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <Card className="w-full max-w-4xl p-6 shadow-lg bg-white space-y-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Job Request</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

              {/* Personal Details Section */}
              <div className="space-y-6 border-b pb-6">

                {/* Job title */}
                <FormField
                  control={form.control}
                  name="jobtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your work experience..." rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Details Section */}
              <div className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city or town" {...field} />
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
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Full address" rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col gap-3 items-start">

                          <FormLabel>Date of Work</FormLabel>
                          <FormControl>
                            <DatePicker
                              selected={field.value}
                              onChange={field.onChange}
                              placeholderText="Select a date"
                              className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm"
                              dateFormat="dd MMM yyyy"
                              minDate={new Date()}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>


                {/* Submit */}
                <Button type="submit" className="w-full mt-6">Sent Request</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default page