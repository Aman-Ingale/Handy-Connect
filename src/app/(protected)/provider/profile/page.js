//Provider's Profile page
"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, User, Edit2, Save } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { ThreeDot } from "react-loading-indicators"
export default function ProviderProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [isPageLoading,setIsPageLoading] = useState(false)
  const id = { id: localStorage.getItem("id") };
  const router = useRouter();
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "male",
    phone_number: "",
    location: "",
    address: "",
    profession: "carpenter",
    experience: 0,
    description: "",
  })
//GET request for logging out the provider
  const handleLogout = async () =>{
    setIsPageLoading(true)
    const res = await fetch('/api/logout', {
      method: "GET"
    });
    const result = await res.json();
    if(result.success){
      localStorage.removeItem("id")
      router.push("/")
    }
    else{
      console.log(result.message)
    }
  }
  //PUT request for updating details
  const handleSave = async () => {
    setIsLoading(true)
    const res = await fetch(`/api/profile/provider/${id.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const result = await res.json();
    if (result.success) {
      toast.success('Profile Updated', {
              description: "",
            })    
    }
    
      setIsLoading(false)
    setIsEditing(false)
  }
  //Get request to get data of provider
  useEffect(() => {
    async function getData() {
      setIsPageLoading(true)
      const x = await fetch(`/api/profile/provider/${id.id}`, {
        method: 'GET',
      });
      const result = await x.json();
      console.log(result)
      setProfile(result)
      setIsPageLoading(false)
    }
    getData();
  }, [])
    if(isPageLoading){
      return (
        <div className="flex items-center justify-center w-screen h-screen">
          <ThreeDot variant="brick-stack" color="#000000" size="medium" text="" textColor="" />
        </div>
      )
    }
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
                      setProfile((prev) => ({ ...(prev || {}), firstname: e.target.value }))
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
                      setProfile((prev) => ({ ...(prev || {}), lastname: e.target.value }))
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
                      setProfile((prev) => ({ ...(prev || {}), email: e.target.value }))
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
                      setProfile((prev) => ({ ...(prev || {}), phone_number: e.target.value }))
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
                      setProfile((prev) => ({ ...(prev || {}), gender: e.target.value }))
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
                      setProfile((prev) => ({ ...(prev || {}), address: e.target.value }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid gap-2 w-20">
                  <Label htmlFor="profession">Profession</Label>
                  <select
                    id="profession"
                    value={profile.profession || ""}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...(prev || {}), profession: e.target.value }))
                    }
                    disabled={!isEditing}
                  >
                    <option value="carpenter">Carpenter</option>
                    <option value="plumber">Plumber</option>
                    <option value="electrician">Electrician</option>
                    <option value="housemaid">Housemaid</option>
                    <option value="babysitter">Babysitter</option>
                    <option value="watchman">Watchman</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="experience">Experience (in years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={profile.experience || ""}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...(prev || {}), experience: Number(e.target.value) }))
                    }
                    disabled={!isEditing}
                    min="0"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="Description">Description</Label>
                  <Textarea
                    id="Description"
                    value={profile.description || ""}
                    onChange={(e) =>
    setProfile((prev) => ({ ...(prev || {}), description: e.target.value }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                  <div className="w-20"> 
                    <Button
                    onClick={handleLogout}

                    disabled={isEditing}
                  >
                    Log Out
                  </Button>
                  </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                                        variant="outline"

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