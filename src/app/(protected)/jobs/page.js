"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, MapPin, Star, DollarSign, Filter, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getHelpers } from "@/actions/fetchActions";
import Link from "next/link";


const categories = ["carpenter", "electrician", "plumber","babysitter","watchman","housemaid"];
const locations = ["Pune", "Mumbai", "Ahmedabad","Delhi","Hyderabad","Nagpur"];

export default function JobsPage() {
  function handleConnect(id){
    router.push(`/professionalProfile?id=${id}`);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [professionals, setProfessionals] = useState([])

  useEffect(()=>{
    async function getAllProfessinals() {
    const x = await fetch("/api/providers",{
      method: 'GET',
    });      
    const result = await x.json();
      setProfessionals(result);
    }
    getAllProfessinals()
  },[])
  const toggleprofession = (profession) => {
    setSelectedCategories((prev) =>
      prev.includes(profession)
        ? prev.filter((c) => c !== profession)
        : [...prev, profession]
    );
  };

  const filteredProfessionals = professionals.filter(
    (pro) =>
      (selectedCategories.length === 0 || selectedCategories.includes(pro.profession)) &&
      (selectedLocation === "" || pro.location === selectedLocation) &&
      pro.total_stars >= minRating &&
      pro.experience >= minExperience &&
      (pro.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pro.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pro.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/userProfile" >
      <span className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
        <User className="w-5 h-5 text-gray-500" />
      </span>
      </Link>
      <h1 className="text-4xl font-bold text-center mb-5">Jobs</h1>
      <h2 className="text-3xl font-semibold text-center mb-10">Find Local Professionals</h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 bg-muted/20 p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Filters</h2>
          </div>
          <Separator className="mb-4" />
          <ScrollArea className="h-96 pr-2 space-y-6">
            {/* profession */}
            <div>
              <h3 className="font-medium text-lg mb-2">profession</h3>
              {categories.map((profession) => (
                <div key={profession} className="flex items-center space-x-2 mb-1">
                  <Checkbox
                    id={profession}
                    checked={selectedCategories.includes(profession)}
                    onCheckedChange={() => toggleprofession(profession)}
                  />
                  <Label htmlFor={profession} className="text-sm cursor-pointer">
                    {profession}
                  </Label>
                </div>
              ))}
            </div>

            {/* Location */}
            <div>
              <h3 className="font-medium text-lg mb-2">Location</h3>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Minimum Rating */}
            <div>
              <h3 className="font-medium text-lg mb-2">Minimum Rating</h3>
              <Slider min={0} max={5} step={0.1} value={[minRating]} onValueChange={(v) => setMinRating(v[0])} />
              <div className="text-sm mt-1">{minRating.toFixed(1)}+</div>
            </div>

            {/* Minimum Experience */}
            <div>
              <h3 className="font-medium text-lg mb-2">Minimum Experience (yrs)</h3>
              <Slider min={0} max={20} step={1} value={[minExperience]} onValueChange={(v) => setMinExperience(v[0])} />
              <div className="text-sm mt-1">{minExperience}+</div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-center mb-8 gap-3">
            <Input
              type="text"
              placeholder="Search by name, profession, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((pro) => (
              <Card key={pro._id} className="flex flex-col items-center p-4 transition hover:shadow-lg hover:scale-[1.01]">
                <CardHeader className="w-full flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-500" />
                  </div>
                  <CardTitle className="text-xl font-semibold mt-2">{pro.firstname}</CardTitle>
                  <p className="font-bold text-primary text-center">{pro.profession}</p>
                </CardHeader>
                <CardContent className="w-full text-center space-y-2">
                  <p className="text-sm text-muted-foreground">{pro.address}</p>
                  <div className="flex items-center justify-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{pro.location}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span className="text-sm">{pro.total_stars}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Experience: {pro.experience} yrs</div>
                  {/* <span className="text-lg font-bold text-green-600 flex items-center justify-center">
                    <DollarSign className="inline-block h-5 w-5 mr-1" />
                    {pro.pricing}/hr
                  </span> */}
                  <Link key={pro._id} href={`/professionalProfile/${pro._id}`} >
                  <Button  className="w-full mt-2">View Details</Button>
                  </Link>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
