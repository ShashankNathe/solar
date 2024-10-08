import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
const Navbar = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  let isLoggedIn = false;

  if (token && token.value) {
    try {
      await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      isLoggedIn = true;
    } catch (error) {
      console.log("Token verification failed:", error);
    }
  }
  return (
    <nav className="m-3 w-11/12 max-w-7xl mx-auto rounded-full fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-70 backdrop-blur-md shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <Image src={"/favicon.ico"} width={20} height={20} alt="logo" />
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/features">
            <Button variant="ghost">Features</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button className="rounded-full">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  Home
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="ghost" className="w-full">
                  Features
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" className="w-full">
                  Pricing
                </Button>
              </Link>
              {isLoggedIn ? (
                <Link href="/dashboard">
                  <Button className="w-full">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
