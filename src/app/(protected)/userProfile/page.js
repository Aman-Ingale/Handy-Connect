"use client"

import { useEffect, useState } from "react"
import {
  Bell,
  Calendar,
  CreditCard,
  Edit,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShoppingBag,
  Star,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { getUserData } from "@/actions/fetchActions"
import { useRouter } from "next/navigation"

export default function CustomerProfile() {
  const [User, setUser] = useState({
    firstname: "", 
    lastname: "",
    email: "",
    phone_number: "",
    gender: "",
    registration_on: "",
  })  // Initialize with default values
  const router = useRouter();

  function handleLogOut() {
    localStorage.removeItem("id")
    router.push("/")
  }

  useEffect(() => {
    async function getData() {
      const x = await getUserData(localStorage.getItem("id"));
      setUser(x)
      console.log(x)
    }
    getData();
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/3">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Ananya Desai" />
                  <AvatarFallback className="text-3xl"></AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <h1 className="text-2xl font-bold">{User.firstname || "N/A"} {User.lastname || "N/A"}</h1>
                  <p className="text-slate-500">Customer</p>

                  <div className="flex justify-center gap-2 mt-4 mb-4">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Premium Member</Badge>
                  </div>
                </div>
                <Button onClick={handleLogOut}>Log Out</Button>

                <Separator className="my-6" />
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details</CardDescription>
                </div>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <div className="text-sm text-slate-500">Full Name</div>
                    <div className="font-medium">{User.firstname || "N/A"} {User.lastname || "N/A"}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-slate-500">Email</div>
                    <div className="font-medium">{User.email || "N/A"}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-slate-500">Phone Number</div>
                    <div className="font-medium">{User.phone_number || "N/A"}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-slate-500">Date of Birth</div>
                    <div className="font-medium">15 June 1990</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-slate-500">Gender</div>
                    <div className="font-medium">{User.gender || "N/A"}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-slate-500">Member Since</div>
                    <div className="font-medium">
                      {User.registration_on ? new Date(User.registration_on).getFullYear() : "N/A"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
