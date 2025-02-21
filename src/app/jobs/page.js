"use client"
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Star, DollarSign } from "lucide-react";

const professionals = [
  {
    id: 1,
    name: "John Doe",
    category: "Carpenter",
    address: "123 Main St, Anytown, USA",
    pricing: 100,
    reviews: 4.5,
    location: "Anytown",
  },
  {
    id: 2,
    name: "Jane Smith",
    category: "Electrician",
    address: "456 Elm St, Somewhere, USA",
    pricing: 85,
    reviews: 4.8,
    location: "Somewhere",
  },
  {
    id: 3,
    name: "Bob Johnson",
    category: "Plumber",
    address: "789 Oak St, Nowhere, USA",
    pricing: 95,
    reviews: 4.2,
    location: "Nowhere",
  },
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfessionals = professionals.filter(
    (pro) =>
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Find Local Professionals</h1>

      <div className="flex flex-col sm:flex-row items-center mb-8 gap-2">
        <Input
          type="text"
          placeholder="Search by name, category, or location"
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
          <Card key={pro.id} className="flex flex-col items-center p-4">
            <CardHeader className="w-full flex flex-col items-center">
              <Image src="/placeholder.svg" alt={pro.name} width={80} height={80} className="rounded-full" />
              <CardTitle className="text-xl font-semibold mt-2">{pro.name}</CardTitle>
              <p className="font-bold text-primary text-center">{pro.category}</p>
            </CardHeader>
            <CardContent className="w-full text-center space-y-2">
              <p className="text-sm text-muted-foreground">{pro.address}</p>
              <div className="flex items-center justify-center">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{pro.location}</span>
              </div>
              <div className="flex items-center justify-center">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                <span className="text-sm">{pro.reviews.toFixed(1)}</span>
              </div>
              <span className="text-lg font-bold text-green-600 flex items-center justify-center">
                <DollarSign className="inline-block h-5 w-5 mr-1" />
                {pro.pricing}/hr
              </span>
              <Button className="w-full">Connect</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}