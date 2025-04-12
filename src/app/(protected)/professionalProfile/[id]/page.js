"use client"

import { useEffect, useState } from "react"
import { Award, Calendar, Check, MapPin, Phone, Shield, Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProfessionalData } from "@/actions/fetchActions"

const reviews = []

const workHistory = [
  {
    id: 1,
    company: "ElectroCare Services",
    position: "Senior Electrician",
    duration: "2018 - Present",
    description: "Handling residential and commercial electrical installations and repairs.",
  },
  {
    id: 2,
    company: "PowerFix Solutions",
    position: "Electrician",
    duration: "2015 - 2018",
    description: "Specialized in troubleshooting and repairing electrical systems.",
  },
  {
    id: 3,
    company: "Bright Spark Electrical",
    position: "Junior Electrician",
    duration: "2012 - 2015",
    description: "Assisted senior electricians in installations and maintenance.",
  },
]

const certifications = [
  {
    id: 1,
    name: "Certified Electrical Technician",
    issuer: "National Skill Development Corporation",
    year: "2016",
    verified: true,
  },
  {
    id: 2,
    name: "Advanced Electrical Systems",
    issuer: "Industrial Training Institute, Pune",
    year: "2014",
    verified: true,
  },
  {
    id: 3,
    name: "Safety Standards & Protocols",
    issuer: "Electrical Safety Association",
    year: "2018",
    verified: true,
  },
]

export default function HelperProfile({ params }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [professional, setProfessional] = useState({})
  const {id} = params
    useEffect(() => {
      async function getData() {
        const professional = await getProfessionalData(id);
        setProfessional(professional)
        console.log(professional)
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
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Ramesh Kumar" />
                  <AvatarFallback className="text-3xl"></AvatarFallback>
                </Avatar>

                <div className="text-center">
                  <h1 className="text-2xl font-bold">{professional.firstname} {professional.lastname}</h1>
                  <p className="text-slate-500">{professional.profession}</p>

                  <div className="flex items-center justify-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 text-amber-500"
                          fill={star <= 4.6 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{professional.total_stars}</span>
                    <span className="text-slate-500 ml-1">(42)</span>
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

                <Button className="w-full mt-6">
                  <Phone className="h-4 w-4 mr-2" /> Contact
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

                {/* <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Electrical Wiring</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Circuit Installation</span>
                          <span>90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Lighting Systems</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Appliance Repair</span>
                          <span>80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Safety Inspection</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Fault Detection</span>
                          <span>90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card> */}

                {/* <Card>
                  <CardHeader>
                    <CardTitle>Service Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Pune City</Badge>
                      <Badge variant="secondary">Kothrud</Badge>
                      <Badge variant="secondary">Aundh</Badge>
                      <Badge variant="secondary">Baner</Badge>
                      <Badge variant="secondary">Shivaji Nagar</Badge>
                      <Badge variant="secondary">Hadapsar</Badge>
                      <Badge variant="secondary">Kharadi</Badge>
                    </div>
                  </CardContent>
                </Card> */}

                {/* <Card>
                  <CardHeader>
                    <CardTitle>Verification Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Identity Verified</div>
                          <div className="text-sm text-slate-500">Government ID verification completed</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Professional Certification</div>
                          <div className="text-sm text-slate-500">Electrical certification verified</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Background Check</div>
                          <div className="text-sm text-slate-500">Criminal background check passed</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
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
                          {/* <div className="w-full bg-slate-200 rounded-full h-2 mr-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                          </div> */}
                          {/* <div className="flex items-center min-w-[60px]">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span>5</span>
                            <span className="text-slate-500 ml-1">(32)</span>
                          </div>
                        </div>

                        <div className="flex items-center mb-1">
                          <div className="w-full bg-slate-200 rounded-full h-2 mr-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                          <div className="flex items-center min-w-[60px]">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span>4</span>
                            <span className="text-slate-500 ml-1">(8)</span>
                          </div>
                        </div>

                        <div className="flex items-center mb-1">
                          <div className="w-full bg-slate-200 rounded-full h-2 mr-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                          </div>
                          <div className="flex items-center min-w-[60px]">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span>3</span>
                            <span className="text-slate-500 ml-1">(2)</span>
                          </div>
                        </div>

                        <div className="flex items-center mb-1">
                          <div className="w-full bg-slate-200 rounded-full h-2 mr-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "0%" }}></div>
                          </div>
                          <div className="flex items-center min-w-[60px]">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span>2</span>
                            <span className="text-slate-500 ml-1">(0)</span>
                          </div>
                        </div> */}
                      </div>
                        {/* <div className="flex items-center">
                          <div className="w-full bg-slate-200 rounded-full h-2 mr-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "0%" }}></div>
                          </div>
                          <div className="flex items-center min-w-[60px]">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span>1</span>
                            <span className="text-slate-500 ml-1">(0)</span>
                          </div>
                        </div> */}
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">{review.customer}</div>
                            <div className="text-sm text-slate-500">{review.date}</div>
                          </div>

                          <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"}`}
                              />
                            ))}
                            <Badge variant="outline" className="ml-3 text-xs">
                              {review.service}
                            </Badge>
                          </div>

                          <p className="text-slate-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Reviews
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Work History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {workHistory.map((work, index) => (
                        <div key={work.id} className="relative pl-8 pb-6">
                          {index < workHistory.length - 1 && (
                            <div className="absolute top-0 left-3 h-full w-px bg-slate-200"></div>
                          )}
                          <div className="absolute top-0 left-0 h-6 w-6 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          </div>
                          <div className="font-medium text-lg">{work.position}</div>
                          <div className="text-slate-600">{work.company}</div>
                          <div className="text-sm text-slate-500">{work.duration}</div>
                          <p className="mt-2 text-slate-600">{work.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {certifications.map((cert) => (
                        <div key={cert.id} className="flex items-start border rounded-lg p-4">
                          <Award className="h-6 w-6 text-blue-500 mr-3 mt-1" />
                          <div className="flex-1">
                            <div className="font-medium">{cert.name}</div>
                            <div className="text-sm text-slate-600">{cert.issuer}</div>
                            <div className="text-sm text-slate-500">Issued: {cert.year}</div>
                          </div>
                          {cert.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              <Check className="h-3 w-3 mr-1" /> Verified
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

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
