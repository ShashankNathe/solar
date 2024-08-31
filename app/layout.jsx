import { Inter } from "next/font/google";
import "./globals.css";
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
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Solar CRM",
  description: "Solar CRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
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
                  <Link href="/login">
                    <Button variant="ghost" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
