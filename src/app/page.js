"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Search, PenToolIcon as Tool } from "lucide-react";

export default function HomePage() {
  // Create section refs
  const aboutRef = useRef(null);
  const categoriesRef = useRef(null);
  const howItWorksRef = useRef(null);
  const getStartedRef = useRef(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass refs to Header */}
      <Header refs={{ aboutRef, categoriesRef, howItWorksRef, getStartedRef }} />

      <main className="flex-1">
        {/* About Section */}
        <section ref={aboutRef} className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">Find Local Professionals for Any Job</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Connect with skilled local freelancers for your home, office, or personal projects.
            </p>
            <form className="mt-6 flex space-x-2 max-w-sm mx-auto">
              <Input placeholder="What service do you need?" type="text" />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
        </section>

        {/* Popular Categories Section */}
        <section ref={categoriesRef} className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold sm:text-5xl">Popular Categories</h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl">
              Discover a wide range of services offered by local professionals.
            </p>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {["Carpentry", "Electrical", "Plumbing", "Painting", "Landscaping", "Cleaning"].map((category) => (
                <div key={category} className="flex items-center space-x-4 rounded-lg border p-4">
                  <Tool className="h-6 w-6" />
                  <div className="font-semibold">{category}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold sm:text-5xl">How It Works</h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl">
              Getting your project done is easy with LocalPro. Here's how:
            </p>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {["Post Your Project", "Compare Quotes", "Hire & Get It Done"].map((step, index) => (
                <div key={index} className="flex flex-col justify-center items-center space-y-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">{index + 1}</div>
                  <h3 className="text-xl font-bold">{step}</h3>
                  <p className="text-muted-foreground">
                    {index === 0 ? "Describe what you need done, and we'll match you with local pros." :
                      index === 1 ? "Review profiles, past work, and quotes from interested professionals." :
                        "Choose the best pro for your job and get your project completed."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section ref={getStartedRef} className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold sm:text-5xl">Ready to Get Started?</h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl">
              Join LocalPro today and connect with skilled professionals in your area.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg">Find a Professional</Button>
              <Button size="lg" variant="outline">Become a Pro</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
