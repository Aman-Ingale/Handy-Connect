//Home page
"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Search, Wrench, Sparkles, Shield, Star, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
//static categories for ui
const categories = [
  { name: "Plumbing", icon: Wrench, color: "bg-blue-500" },
  { name: "Electrical", icon: Sparkles, color: "bg-yellow-500" },
  { name: "Carpentry", icon: Wrench, color: "bg-amber-500" },
  { name: "Painting", icon: Wrench, color: "bg-purple-500" },
  { name: "Cleaning", icon: Wrench, color: "bg-green-500" },
  { name: "Security", icon: Shield, color: "bg-red-500" },
];

const steps = [
  {
    title: "Get Registered",
    description: "Signup on HandyConnect or login if already have an account.",
    icon: Star,
  },
  {
    title: "Search",
    description: "Search your job related queries in the providers section",
    icon: Clock,
  },
  {
    title: "Connect",
    description: "Choose a desired service provider and connect with them and get the job done!",
    icon: CheckCircle2,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const aboutRef = useRef(null);
  const categoriesRef = useRef(null);
  const howItWorksRef = useRef(null);
  const getStartedRef = useRef(null);
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <Header refs={{ aboutRef, categoriesRef, howItWorksRef, getStartedRef }} />
      <main className="flex-1">
        {/* Hero Section */}
        <section ref={aboutRef} className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="container relative px-4 md:px-6 text-center mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Find Trusted Local Freelancers

              </h1>
              <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Connect with skilled local freelancers for your home, office, or personal jobs.
              </p>
              <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}

                  />
                </div>
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Search
                  </Button>
                </Link>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Popular Categories Section */}
        <section ref={categoriesRef} className="w-full py-20 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Categories</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Popular Services
              </h2>
              <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground">
                Discover a wide range of services offered by service providers.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center gap-2">
                      <div className={`${category.color} p-3 rounded-full`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="w-full py-20 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Process</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground">
                Getting your job done is easy with HandyConnect. Here's how:
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section ref={getStartedRef} className="w-full py-20 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">Get Started</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground">
                Join HandyConnect today and connect with skilled handyman in your area.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup/client" >
                  <Button size="lg" className="w-full sm:w-auto">
                    Find a provider
                  </Button>
                </Link>
                <Link href="/signup/provider" >
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Become a Provider
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
