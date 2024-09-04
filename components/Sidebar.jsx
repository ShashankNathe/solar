import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Building,
  Menu,
  LayoutDashboard,
  Users,
  CheckSquare,
  List,
  PlusCircle,
  Activity,
  CheckCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const NavItem = ({ href, children, icon: Icon }) => (
  <Link
    href={href}
    className="py-2 px-4 hover:bg-gray-200 rounded flex items-center"
  >
    {Icon && <Icon className="mr-2 h-4 w-4" />}
    {children}
  </Link>
);

const Sidebar = ({ user }) => (
  <Sheet>
    <aside className="w-64 h-screen hidden lg:flex flex-col">
      <header className="p-2 flex items-center justify-center">
        <Image
          src="/favicon.ico"
          width={25}
          height={25}
          alt="logo"
          priority={false}
        />
      </header>
      <div className="p-4 ps-2 flex items-center border-b">
        <Building className="mr-2" />
        <h1 className="text-xl font-bold">{user.orgName}</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 ps-2 pe-0 pt-1 ms-1 ">
        <ScrollArea className="rounded-md h-full">
          <Accordion
            type="multiple"
            defaultValue={["dashboard", "leads", "tasks"]}
            className="w-full pe-3"
          >
            <AccordionItem value="dashboard">
              <AccordionTrigger className="hover:no-underline text-left">
                <span className="flex items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <NavItem href="/dashboard" icon={List}>
                  Overview
                </NavItem>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="leads">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Leads
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <NavItem href="/leads" icon={List}>
                  All leads
                </NavItem>
                <NavItem href="/leads/new" icon={PlusCircle}>
                  Create new lead
                </NavItem>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="tasks">
              <AccordionTrigger className="hover:no-underline">
                <span className="flex items-center">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Tasks
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <NavItem href="/tasks" icon={List}>
                  All Tasks
                </NavItem>
                <NavItem href="/tasks?status=active" icon={Activity}>
                  Active Tasks
                </NavItem>
                <NavItem href="/tasks?status=completed" icon={CheckCircle}>
                  Completed tasks
                </NavItem>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
    <SheetContent side="left">
      <SheetHeader className="sr-only">
        <SheetTitle className="sr-only">Solar CRM</SheetTitle>
        <SheetDescription className="sr-only">Navigation</SheetDescription>
      </SheetHeader>
      <Accordion
        type="multiple"
        defaultValue={["dashboard", "leads", "tasks"]}
        className="w-full"
      >
        <AccordionItem value="dashboard">
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <NavItem href="/dashboard" icon={List}>
              Overview
            </NavItem>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="leads">
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Leads
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <NavItem href="/leads" icon={List}>
              All leads
            </NavItem>
            <NavItem href="/leads/new" icon={PlusCircle}>
              Create new lead
            </NavItem>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tasks">
          <AccordionTrigger className="hover:no-underline">
            <span className="flex items-center">
              <CheckSquare className="mr-2 h-4 w-4" />
              Tasks
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <NavItem href="/tasks" icon={List}>
              All Tasks
            </NavItem>
            <NavItem href="/tasks?status=active" icon={Activity}>
              Active Tasks
            </NavItem>
            <NavItem href="/tasks?status=completed" icon={CheckCircle}>
              Completed tasks
            </NavItem>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SheetContent>
  </Sheet>
);

export default Sidebar;
