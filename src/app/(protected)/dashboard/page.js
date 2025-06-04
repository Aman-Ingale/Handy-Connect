"use client"

import { useEffect, useState } from "react"
import { CalendarIcon, Home, LineChartIcon, Menu, Star, User, Wallet, LogOut, Settings, Bell, Search } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { getProfessionalData } from "@/actions/fetchActions"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { format } from 'date-fns';

const earningsData = [
  { name: "Jan", earnings: 4000 },
  { name: "Feb", earnings: 3000 },
  { name: "Mar", earnings: 5000 },
  { name: "Apr", earnings: 7000 },
  { name: "May", earnings: 6000 },
]


export default function HelperDashboard() {
  const [professional, setProfessional] = useState({});
  const [professionalRating, setProfessionalRating] = useState(professional.total_ratings)
  const [nameInitial, setNameInitial] = useState("")
  const router = useRouter();
  const [date, setDate] = useState(new Date())
  const id = localStorage.getItem("id")
  function handleLogOut() {
    localStorage.removeItem("id")
    router.push("/")
  }

  useEffect(() => {
    async function getData() {
      try {
        const x = await fetch(`/api/details/${id}`, {
          method: 'GET',
        });
        console.log(x)

        const result = await x.json();
        setProfessional(result)
        console.log(result)
        setNameInitial(professional.firstname?.charAt(0) || "")
      } catch (error) {
        console.error(error)
      }
    }
    getData();
  }, [])
  const recentJobs = professional.jobs

  return (
    <div className="min-h-screen bg-background">

      <div className="flex">

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-center mb-5">Dashboard</h1>
            <div className="relative w-full max-w-md invisible">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search..."
              />
            </div>
            <div className="flex items-center gap-4">

              {/* <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button> */}
              <Button variant="ghost" size="icon">
                {/* <Settings className="h-5 w-5" /> */}
              </Button>
              <Link href="/editProfessional">
                <Avatar>
                  <AvatarImage src={professional.profile_picture} />
                  <AvatarFallback>{nameInitial}</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{professional.total_earnings || 0}</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{professional.completed_jobs || 0}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{professional.total_ratings || 0}</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your earnings for the past 5 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={earningsData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="earnings" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Jobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
                <CardDescription>Your most recent completed jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs?.map((job, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{job.customer_name}</p>
                        <p className="text-sm text-muted-foreground">{job.job_description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">₹{job.amount}</p>
                          {/* <p className="text-sm text-muted-foreground">{ format(new Date(job.date).getTime(), 'yyyy-MM-dd')}</p> */}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-sm">{job.job_ratings.stars}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}




