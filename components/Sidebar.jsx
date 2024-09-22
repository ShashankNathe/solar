"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  List,
  PlusCircle,
  CheckCircle,
  Activity,
  LogOut,
  Settings,
  Menu,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";

export default function Sidebar({ user }) {
  const [workspaceOpen, setWorkspaceOpen] = useState(true);
  const [teamsOpen, setTeamsOpen] = useState(true);
  const workspaceRef = useRef(null);
  const teamsRef = useRef(null);

  useEffect(() => {
    if (workspaceRef.current) {
      workspaceRef.current.style.maxHeight = workspaceOpen
        ? `${workspaceRef.current.scrollHeight}px`
        : "0";
    }
  }, [workspaceOpen]);

  useEffect(() => {
    if (teamsRef.current) {
      teamsRef.current.style.maxHeight = teamsOpen
        ? `${teamsRef.current.scrollHeight}px`
        : "0";
    }
  }, [teamsOpen]);

  return (
    <Sheet>
      <div className="w-64 h-screen bg-[#161618] text-gray-300 hidden lg:flex flex-col">
        {/* Top Part */}
        <div className="p-4 flex-shrink-0 pb-0">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-teal-500 rounded-sm flex items-center justify-center text-white font-bold text-sm">
              {user.orgName.split("")[0].toUpperCase()}
            </div>
            <span className="text-sm font-medium">{user.orgName}</span>
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          </nav>
        </div>

        {/* Middle Part (Scrollable) */}
        <ScrollArea className="flex-grow ">
          <div className="overflow-y-auto p-4">
            <div className="mb-4">
              <button
                onClick={() => setWorkspaceOpen(!workspaceOpen)}
                className="flex items-center justify-between w-full text-xs text-gray-500 mb-2 hover:text-gray-300"
              >
                <span>Leads</span>
                {workspaceOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              <div
                ref={workspaceRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: workspaceOpen ? "1000px" : "0" }}
              >
                <nav className="space-y-1">
                  <Link
                    href="/leads"
                    className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
                  >
                    <List size={18} />
                    <span>All leads</span>
                  </Link>
                  <Link
                    href="/leads/new"
                    className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
                  >
                    <PlusCircle size={18} />
                    <span>Create new lead</span>
                  </Link>
                </nav>
              </div>
            </div>

            <div className="mb-4">
              <button
                onClick={() => setTeamsOpen(!teamsOpen)}
                className="flex items-center justify-between w-full text-xs text-gray-500 mb-2 hover:text-gray-300"
              >
                <span>Tasks</span>
                {teamsOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              <div
                ref={teamsRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: teamsOpen ? "1000px" : "0" }}
              >
                <nav className="space-y-1">
                  <Link
                    href="/tasks"
                    className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
                  >
                    <List size={18} />
                    <span>All Tasks</span>
                  </Link>
                  <Link
                    href="/tasks?status=active"
                    className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
                  >
                    <Activity size={18} />
                    <span>Active Tasks</span>
                  </Link>
                  <Link
                    href="/tasks?status=completed"
                    className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
                  >
                    <CheckCircle size={18} />
                    <span>Completed tasks</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Bottom Part */}
        <div className="p-4 flex-shrink-0">
          {/* <div className="text-xs text-gray-500 mb-2">TRY</div> */}
          <nav className="space-y-1">
            <Link
              href="/settings"
              className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
            <Link
              href="/logout"
              className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      </div>

      <SheetTrigger className="lg:hidden p-1 absolute top-0 right-0">
        <span
          variant="ghost"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#1e1e20] px-4 py-2  h-8"
        >
          <Menu />
        </span>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#161618] text-gray-300 border-0">
        <SheetHeader className="sr-only">
          <SheetTitle className="sr-only">Solar CRM</SheetTitle>
          <SheetDescription className="sr-only">Navigation</SheetDescription>
        </SheetHeader>
        <nav className="space-y-1 mt-10">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/leads"
            className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
          >
            <List size={18} />
            <span>All leads</span>
          </Link>
          <Link
            href="/leads/new"
            className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
          >
            <PlusCircle size={18} />
            <span>Create new lead</span>
          </Link>
          <Link
            href="/tasks"
            className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
          >
            <List size={18} />
            <span>All Tasks</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          <Link
            href="/logout"
            className="flex items-center space-x-2 py-1 px-2 rounded-md hover:bg-[#1e1e20]"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
