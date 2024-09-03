import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NavItem = ({ href, children }) => (
  <li>
    <Link href={href} className="block py-2 px-4 hover:bg-gray-200 rounded">
      {children}
    </Link>
  </li>
);

const Sidebar = () => (
  <Sheet>
    <aside className="w-64 h-screen hidden lg:flex flex-col">
      <div className="p-2 ">
        <h1 className="text-xl font-bold">App Name</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 pe-0 pt-1 ms-1 ">
        <ScrollArea className=" rounded-md  h-full">
          <ul className="space-y-2">
            <NavItem href="/dashboard">Dashboard</NavItem>
            <NavItem href="/leads">Leads</NavItem>
            <NavItem href="/leads/new">Create new lead</NavItem>
            <NavItem href="/tasks">Tasks</NavItem>
            <NavItem href="/tasks?status=active">Active Tasks</NavItem>
            <NavItem href="/tasks?status=completed">Completed tasks</NavItem>
          </ul>
        </ScrollArea>
      </nav>
    </aside>
    <SheetTrigger className="lg:hidden p-1 absolute top-0 right-0">
      <span
        variant="ghost"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2 border h-8"
      >
        <Menu />
      </span>
    </SheetTrigger>
    <SheetContent side="left">test</SheetContent>
  </Sheet>
);

export default Sidebar;
