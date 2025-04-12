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
// const serviceHistory = []

// const upcomingServices = []

// const savedAddresses = []

// const paymentMethods = []
// const favoriteHelpers = []

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState("profile")
  const [User, setUser] = useState({})
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
                  <h1 className="text-2xl font-bold">{User.firstname} {User.lastname}</h1>
                  <p className="text-slate-500">Customer</p>

                  <div className="flex justify-center gap-2 mt-4 mb-4">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Premium Member</Badge>
                  </div>
                </div>
                <Button onClick={handleLogOut}>Log Out</Button>

                <Separator className="my-6" />

                <div className="w-full">
                  <nav className="space-y-1">
                    {/* <NavItem
                      icon={User}
                      label="Profile"
                      active={activeTab === "profile"}
                      onClick={() => setActiveTab("profile")}
                    /> */}
                    {/* <NavItem
                      icon={ShoppingBag}
                      label="Service History"
                      active={activeTab === "services"}
                      onClick={() => setActiveTab("services")}
                    />
                    <NavItem
                      icon={MapPin}
                      label="Addresses"
                      active={activeTab === "addresses"}
                      onClick={() => setActiveTab("addresses")}
                    />
                    <NavItem
                      icon={CreditCard}
                      label="Payment Methods"
                      active={activeTab === "payments"}
                      onClick={() => setActiveTab("payments")}
                    />
                    <NavItem
                      icon={Heart}
                      label="Favorite Helpers"
                      active={activeTab === "favorites"}
                      onClick={() => setActiveTab("favorites")}
                    />
                    <NavItem
                      icon={Calendar}
                      label="Appointments"
                      active={activeTab === "appointments"}
                      onClick={() => setActiveTab("appointments")}
                    />
                    <NavItem
                      icon={Settings}
                      label="Settings"
                      active={activeTab === "settings"}
                      onClick={() => setActiveTab("settings")}
                    />
                    <NavItem icon={LogOut} label="Logout" /> */}
                  </nav>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs defaultValue={activeTab}>
              <TabsContent value="profile" className="mt-0" hidden={activeTab !== "profile"}>
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
                        <div className="font-medium">{User.firstname} {User.lastname}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm text-slate-500">Email</div>
                        <div className="font-medium">{User.email}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm text-slate-500">Phone Number</div>
                        <div className="font-medium">{User.phone_number}</div>
                      </div>

                      {/* <div className="space-y-1">
                        <div className="text-sm text-slate-500">Date of Birth</div>
                        <div className="font-medium">15 June 1990</div>
                      </div> */}

                      <div className="space-y-1">
                        <div className="text-sm text-slate-500">Gender</div>
                        <div className="font-medium">{User.gender}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm text-slate-500">Member Since </div>
                        <div className="font-medium">{new Date(User.registration_on).getFullYear()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Account Statistics</CardTitle>
                      <CardDescription>Your activity on the platform</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-600">{JSON.stringify(User.service_booked)}</div>
                        <div className="text-sm text-slate-600 mt-1">Services Booked</div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-green-600">{JSON.stringify(User.service_completed)}</div>
                        <div className="text-sm text-slate-600 mt-1">Completed</div>
                      </div>

                      {/* <div className="bg-amber-50 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-amber-600">4.7</div>
                        <div className="text-sm text-slate-600 mt-1">Avg. Rating Given</div>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                {/* <Card className="mt-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </div>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-slate-400 mr-3" />
                          <div>
                            <div className="font-medium">Service Reminders</div>
                            <div className="text-sm text-slate-500">Get notified about upcoming services</div>
                          </div>
                        </div>
                        <Badge>Enabled</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-slate-400 mr-3" />
                          <div>
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-slate-500">Receive service updates via email</div>
                          </div>
                        </div>
                        <Badge>Enabled</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-slate-400 mr-3" />
                          <div>
                            <div className="font-medium">SMS Notifications</div>
                            <div className="text-sm text-slate-500">Receive service updates via SMS</div>
                          </div>
                        </div>
                        <Badge variant="outline">Disabled</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
              </TabsContent>

              <TabsContent value="services" className="mt-0" hidden={activeTab !== "services"}>
                <Card>
                  <CardHeader>
                    <CardTitle>Service History</CardTitle>
                    <CardDescription>Your past service bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="space-y-6">
                      {serviceHistory.map((service) => (
                        <div key={service.id} className="border rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row justify-between mb-2">
                            <div>
                              <div className="font-medium text-lg">{service.service}</div>
                              <div className="text-sm text-slate-500">Helper: {service.helper}</div>
                            </div>
                            <div className="mt-2 sm:mt-0 text-right">
                              <Badge className="bg-green-100 text-green-800">{service.status}</Badge>
                              <div className="text-sm text-slate-500 mt-1">{service.date}</div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                            <div className="flex items-center">
                              <div className="font-medium mr-3">₹{service.amount}</div>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < service.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div> */}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Services
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="mt-0" hidden={activeTab !== "addresses"}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Saved Addresses</CardTitle>
                      <CardDescription>Manage your service locations</CardDescription>
                    </div>
                    <Button>Add New Address</Button>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="space-y-4">
                      {savedAddresses.map((address) => (
                        <div key={address.id} className="border rounded-lg p-4 relative">
                          <div className="flex justify-between mb-1">
                            <div className="font-medium">{address.name}</div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-slate-600">{address.address}</div>
                          {address.default && (
                            <Badge className="absolute top-4 right-4 bg-blue-100 text-blue-800">Default</Badge>
                          )}
                        </div>
                      ))}
                    </div> */}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="mt-0" hidden={activeTab !== "payments"}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment options</CardDescription>
                    </div>
                    <Button>Add Payment Method</Button>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="space-y-4">
                      {paymentMethods.map((payment) => (
                        <div key={payment.id} className="border rounded-lg p-4 relative">
                          <div className="flex justify-between mb-1">
                            <div className="font-medium">{payment.type}</div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-slate-600">{payment.name}</div>
                          <div className="text-slate-500">{payment.number}</div>
                          {payment.expiry && <div className="text-sm text-slate-500">Expires: {payment.expiry}</div>}
                          {payment.default && (
                            <Badge className="absolute top-4 right-4 bg-blue-100 text-blue-800">Default</Badge>
                          )}
                        </div>
                      ))}
                    </div> */}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites" className="mt-0" hidden={activeTab !== "favorites"}>
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Helpers</CardTitle>
                    <CardDescription>Service providers you've saved</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {favoriteHelpers.map((helper) => (
                        <div key={helper.id} className="border rounded-lg p-4 flex items-center">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={helper.image} alt={helper.name} />
                            <AvatarFallback>{helper.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{helper.name}</div>
                            <div className="text-sm text-slate-500">{helper.profession}</div>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                              <span className="text-sm">{helper.rating}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Book
                          </Button>
                        </div>
                      ))}
                    </div> */}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="mt-0" hidden={activeTab !== "appointments"}>
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled services</CardDescription>
                  </CardHeader>
                  {/* <CardContent>
                    {upcomingServices.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingServices.map((service) => (
                          <div key={service.id} className="border rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row justify-between mb-2">
                              <div>
                                <div className="font-medium text-lg">{service.service}</div>
                                <div className="text-sm text-slate-500">Helper: {service.helper}</div>
                              </div>
                              <div className="mt-2 sm:mt-0 text-right">
                                <Badge className="bg-blue-100 text-blue-800">{service.status}</Badge>
                              </div>
                            </div>

                            <div className="flex items-center mt-2">
                              <Calendar className="h-4 w-4 text-slate-400 mr-2" />
                              <span className="text-sm text-slate-600">{service.date}</span>
                              <span className="mx-2 text-slate-400">•</span>
                              <span className="text-sm text-slate-600">{service.time}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                              <div className="font-medium">₹{service.amount}</div>
                              <div className="flex gap-2 mt-2 sm:mt-0">
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                                <Button variant="destructive" size="sm">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No Upcoming Appointments</h3>
                        <p className="text-slate-500 mt-1">You don't have any scheduled services</p>
                        <Button className="mt-4">Book a Service</Button>
                      </div>
                    )}
                  </CardContent> */}
                </Card>

                {/* <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Past Appointments</CardTitle>
                    <CardDescription>Your service history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {serviceHistory.slice(0, 2).map((service) => (
                        <div key={service.id} className="border rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row justify-between mb-2">
                            <div>
                              <div className="font-medium">{service.service}</div>
                              <div className="text-sm text-slate-500">Helper: {service.helper}</div>
                            </div>
                            <div className="mt-2 sm:mt-0 text-right">
                              <div className="text-sm text-slate-500">{service.date}</div>
                            </div>
                          </div>

                          <Button variant="link" className="p-0 h-auto text-blue-600">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("services")}>
                      View All Past Appointments
                    </Button>
                  </CardFooter>
                </Card> */}
              </TabsContent>

              <TabsContent value="settings" className="mt-0" hidden={activeTab !== "settings"}>
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Change Password</h3>
                        <Button variant="outline">Update Password</Button>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Language Preference</h3>
                        <div className="flex items-center">
                          <div className="font-medium">English</div>
                          <Button variant="link" className="ml-auto">
                            Change
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Delete Account</h3>
                        <p className="text-slate-500 mb-2">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
  onClick,
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}
      onClick={onClick}
    >
      {/* <Icon className="h-5 w-5 mr-2" />
      <span>abc</span> */}
    </Button>
  )
}
