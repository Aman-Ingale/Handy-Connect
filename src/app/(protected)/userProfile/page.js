"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, User, Mail, Phone, MapPin, Edit2, Save } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const id = { id: localStorage.getItem("id") };
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    phone_number: "",
    location: "",
    address: "",
  })

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    const res = await fetch(`/api/profile/client/${id.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const result = res.json();
    if (result.success) {
      console.log("Update succefull")
      console.log(result.data)
    }
    else {
      console.log("Something went wrong")
    }
    setIsLoading(false)
    setIsEditing(false)
  }
  useEffect(() => {
    async function getData() {
      const x = await fetch(`/api/profile/client/${id.id}`, {
        method: 'GET',
      });
      const result = await x.json();
      console.log(result)
      setProfile(result)
    }
    getData();
  }, [])
  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">Profile</CardTitle>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              disabled={isLoading}
            >
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{profile.firstname || ""}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">First Name</Label>
                  <Input
                    id="name"
                    value={profile.firstname || ""}
                    onChange={(e) =>
                      setProfile({firstname: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input
                    id="lastname"
                    value={profile.lastname || ""}
                    onChange={(e) =>
                      setProfile({ lastname: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone_number || ""}
                    onChange={(e) =>
                      setProfile({ phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2 w-20">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={profile.gender || ""}
                    onChange={(e) =>
                      setProfile({  gender: e.target.value })
                    }
                    disabled={!isEditing}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address || ""}
                    onChange={(e) =>
                      setProfile({  address: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
    

                
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 