"use client"

import { useState } from "react"
import { CalendarIcon, Home, LineChartIcon, Menu, Star, User, Wallet } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const earningsData = [
  { name: "Jan", earnings: 4000 },
  { name: "Feb", earnings: 3000 },
  { name: "Mar", earnings: 5000 },
  { name: "Apr", earnings: 7000 },
  { name: "May", earnings: 6000 },
]

const recentJobs = [
  {
    id: 1,
    customer: "Priya Sharma",
    service: "Electrical Repair",
    date: "2023-04-10",
    amount: 1200,
    rating: 5,
  },
  {
    id: 2,
    customer: "Amit Patel",
    service: "Fan Installation",
    date: "2023-04-08",
    amount: 800,
    rating: 4,
  },
  {
    id: 3,
    customer: "Neha Gupta",
    service: "Switch Replacement",
    date: "2023-04-05",
    amount: 500,
    rating: 5,
  },
  {
    id: 4,
    customer: "Raj Malhotra",
    service: "Wiring Check",
    date: "2023-04-02",
    amount: 1500,
    rating: 4,
  },
]

export default function HelperDashboard() {
  const [date, setDate] = useState(new Date())

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-slate-800 text-white">
          <MobileSidebar />
        </SheetContent>
      </Sheet>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block bg-slate-800 text-white h-screen sticky top-0 w-64">
          <DesktopSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Helper Dashboard</h1>
                <p className="text-slate-500">Welcome back, Ramesh Kumar</p>
              </div>

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ramesh Kumar" />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-blue-500" />
                    Total Earnings
                  </CardTitle>
                  <CardDescription>This month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₹6,000</div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-green-500" />
                    Completed Jobs
                  </CardTitle>
                  <CardDescription>Total transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">18</div>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    Rating
                  </CardTitle>
                  <CardDescription>Customer Feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.6 ★</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6 mt-6">
                {/* Earnings Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                    <CardDescription>Monthly earnings trend</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={earningsData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="earnings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Recent Jobs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Jobs</CardTitle>
                    <CardDescription>Your latest completed services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Customer</th>
                            <th className="text-left py-3 px-4">Service</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Amount</th>
                            <th className="text-left py-3 px-4">Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentJobs.map((job) => (
                            <tr key={job.id} className="border-b hover:bg-slate-50">
                              <td className="py-3 px-4">{job.customer}</td>
                              <td className="py-3 px-4">{job.service}</td>
                              <td className="py-3 px-4">{new Date(job.date).toLocaleDateString()}</td>
                              <td className="py-3 px-4">₹{job.amount}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  {job.rating}
                                  <Star className="h-4 w-4 text-amber-500 ml-1" fill="currentColor" />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline">View All Jobs</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Work Schedule</CardTitle>
                    <CardDescription>Track your appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/2">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => date && setDate(date)}
                          className="rounded-md border"
                        />
                      </div>
                      <div className="md:w-1/2">
                        <h3 className="text-lg font-medium mb-4">Selected Date: {date.toLocaleDateString()}</h3>
                        <div className="text-center p-8 border rounded-lg bg-slate-50">
                          <p className="text-slate-500">No jobs scheduled for this date</p>
                          <Button className="mt-4">Add New Job</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Job History</CardTitle>
                    <CardDescription>Your completed services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentJobs.map((job) => (
                        <div
                          key={job.id}
                          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-slate-50"
                        >
                          <div className="space-y-1">
                            <div className="font-medium">{job.service}</div>
                            <div className="text-sm text-slate-500">Customer: {job.customer}</div>
                            <div className="text-sm text-slate-500">{new Date(job.date).toLocaleDateString()}</div>
                          </div>
                          <div className="flex flex-col items-end mt-2 sm:mt-0">
                            <div className="font-medium">₹{job.amount}</div>
                            <div className="flex items-center mt-1">
                              <span className="mr-1">Rating:</span>
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < job.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Helper Profile</CardTitle>
                    <CardDescription>Personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Ramesh Kumar" />
                        <AvatarFallback className="text-2xl">RK</AvatarFallback>
                      </Avatar>

                      <div className="space-y-2 text-center sm:text-left">
                        <div className="text-xl font-bold">Ramesh Kumar</div>
                        <div className="text-slate-500">Electrician</div>
                        <div className="flex items-center justify-center sm:justify-start">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="ml-1">4.6 (42 reviews)</span>
                        </div>
                        <Badge variant="outline" className="mt-1">
                          Verified Professional
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <div className="text-sm text-slate-500">Phone Number</div>
                        <div className="font-medium">+91 98765 43210</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm text-slate-500">Email</div>
                        <div className="font-medium">ramesh.kumar@example.com</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm text-slate-500">Location</div>
                        <div className="font-medium">Pune, Maharashtra</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm text-slate-500">Experience</div>
                        <div className="font-medium">8 years</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-slate-500 mb-2">Skills & Expertise</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Electrical Wiring</Badge>
                        <Badge variant="secondary">Circuit Installation</Badge>
                        <Badge variant="secondary">Lighting Systems</Badge>
                        <Badge variant="secondary">Appliance Repair</Badge>
                      </div>
                    </div>

                    <Button className="w-full sm:w-auto">Edit Profile</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

function DesktopSidebar() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center border-b border-slate-700">
        <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
          H
        </div>
        <span className="font-bold text-lg">HelperApp</span>
      </div>

      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          <NavItem icon={Home} label="Dashboard" active />
          <NavItem icon={LineChartIcon} label="Jobs" />
          <NavItem icon={User} label="Profile" />
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Ramesh Kumar" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm text-white">Ramesh Kumar</div>
            <div className="text-xs text-slate-400">Electrician</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileSidebar() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center border-b border-slate-700">
        <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center text-white font-bold mr-2">
          H
        </div>
        <span className="font-bold text-lg">HelperApp</span>
      </div>

      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          <NavItem icon={Home} label="Dashboard" active />
          <NavItem icon={LineChartIcon} label="Jobs" />
          <NavItem icon={User} label="Profile" />
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Ramesh Kumar" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm text-white">Ramesh Kumar</div>
            <div className="text-xs text-slate-400">Electrician</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({
  icon: Icon,
  label,
  active = false,
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white hover:bg-slate-700"}`}
    >
      <Icon className="h-5 w-5 mr-2" />
      <span>{label}</span>
    </Button>
  )
}
