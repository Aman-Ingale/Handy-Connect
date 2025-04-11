"use client"
import Link from "next/link";
import { PenToolIcon as Tool } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Header({ refs }) {
    const router = useRouter();
    const [loadingLogin,setLoadingLogin] = useState(false)
    const [loadingSignup,setLoadingSignup] = useState(false)
    const handleClickLogin = () => {
        setLoadingLogin(true)
        setTimeout(() => {
            router.push("/login");
        }, 300);
    }
    const handleClickSignup = () => {
        setLoadingSignup(true)
        setTimeout(() => {
            router.push("/signup");
        }, 300);
    }
    const scrollToSection = (sectionRef, event) => {
        event.preventDefault(); // Prevents the default anchor behavior
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center w-full justify-between">
                <Link className="flex items-center justify-center" href="#">
                    <Tool className="h-6 w-6 mr-2" />
                    <span className="font-bold">LocalPro</span>
                </Link>

                <nav className="hidden md:flex gap-2 sm:gap-4 md:gap-6">
                    <Link onClick={(e) => scrollToSection(refs.howItWorksRef, e)} className="text-sm font-medium hover:underline underline-offset-4" href="#">How It Works</Link>
                    <Link onClick={(e) => scrollToSection(refs.categoriesRef, e)} className="text-sm font-medium hover:underline underline-offset-4" href="#">Categories</Link>
                    <Link onClick={(e) => scrollToSection(refs.getStartedRef, e)} className="text-sm font-medium hover:underline underline-offset-4" href="#">For Professionals</Link>
                </nav>

                <div className="flex items-center gap-2 ">
                    <Button loading={loadingLogin} onClick={handleClickLogin} variant="outline" className="">Login</Button>
                    <Button loading={loadingSignup} onClick={handleClickSignup} className="">Signup</Button>

                </div>
            </header>


        </>
    );
}

export default Header;
