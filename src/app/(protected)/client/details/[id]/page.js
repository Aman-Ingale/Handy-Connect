//Provider's details page
"use client"
import { use } from 'react';
import { useEffect, useState } from "react"
import { Award, Calendar, Check, MapPin, Phone, Shield, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThreeDot } from 'react-loading-indicators';
import { useRouter } from 'next/navigation';

export default function ClientDetail({ params }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [professional, setProfessional] = useState({})
  const router = useRouter();
    const [isLoading,setIsLoading] = useState(false)
  function handleRequest(){
    router.push(`/client/request/${id}`)
  }
  const {id} = use(params)
  //GET request for getting details of provider by passing id as params
  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const x = await fetch(`/api/details/${id}`,{
      method: 'GET',
    });
      const professional = await x.json();
      setProfessional(professional)
      console.log(professional)
      setIsLoading(false)
    }
    getData();
  }, [])
  const reviews = professional.ratings || [];
    if(isLoading){
      return (
        <div className="flex items-center justify-center w-screen h-screen">
          <ThreeDot variant="brick-stack" color="#000000" size="medium" text="" textColor="" />
        </div>
      )
    }
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/3">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Ramesh Kumar" />
                  <AvatarFallback className="text-3xl"></AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <h1 className="text-2xl font-bold">{professional.firstname} {professional.lastname}</h1>
                  <p className="text-slate-500">{professional.profession}</p>

                  <div className="flex items-center justify-center mt-2">
                    <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < professional.total_stars-1 ? "text-amber-500 fill-amber-500" : "text-slate-300"}`}
                              />
                            ))}
                    </div>
                    <span className="ml-2 font-medium">{professional.total_stars}</span>
                    <span className="text-slate-500 ml-1">({professional.total_ratings})</span>
                  </div>

                  <div className="flex justify-center gap-2 mt-4">
                    {/* <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Available</Badge> */}
                    <Badge variant="outline" className="border-blue-200 text-blue-800">
                      <Shield className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="w-full space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-slate-400 mr-3" />
                    <span>{professional.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-slate-400 mr-3" />
                    <span>{professional.phone_number}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-slate-400 mr-3" />
                    <span>Member since {new Date(professional.registration_on).getFullYear()}</span>
                  </div>
                </div>

                <Button className="w-full mt-6" onClick={handleRequest}>
                  <Phone className="h-4 w-4 mr-2" /> Send Request
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                {/* <TabsTrigger value="experience">Experience</TabsTrigger> */}
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {professional.description}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <CardDescription>Based on {professional.total_ratings} reviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-6">
                      <div className="text-5xl font-bold mr-6">{professional.total_stars}</div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                      </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-6">
                      {reviews.map((review,index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            
                          </div>

                          <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.stars ? "text-amber-500 fill-amber-500" : "text-slate-300"}`}
                              />
                            ))}
                            
                          </div>

                          <p className="text-slate-600">{review.review}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                  
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">

                <Card>
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Hindi</span>
                          <span>Native</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>English</span>
                          <span>Fluent</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Marathi</span>
                          <span>Conversational</span>
                        </div>
                        <Progress value={70} className="h-2" />
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
