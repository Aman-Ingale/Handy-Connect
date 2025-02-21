"use client"
import Link from "next/link";
import { PenToolIcon as Tool } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

function Header() {
    const router = useRouter();
    const handleClickLogin = () => {
        router.push("/login");
        // setTimeout(() => {
        // }, 500);
    }
    const handleClickSignup = () => {
        router.push("/signup");
        // setTimeout(() => {
        // }, 500);
    }
    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center w-full justify-between">
                <Link className="flex items-center justify-center" href="#">
                    <Tool className="h-6 w-6 mr-2" />
                    <span className="font-bold">LocalPro</span>
                </Link>

                <nav className="hidden md:flex gap-2 sm:gap-4 md:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">How It Works</Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">Categories</Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">For Professionals</Link>
                </nav>

                <div className="flex items-center gap-2 ">
                    <Button onClick={handleClickLogin} variant="outline" className="">Login</Button>
                    <Button onClick={handleClickSignup} className="">Signup</Button>

                </div>
            </header>


        </>
    );
}

export default Header;
