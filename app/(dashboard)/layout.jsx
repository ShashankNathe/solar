import React from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const NavItem = ({ href, children }) => (
  <li>
    <Link href={href} className="block py-2 px-4 hover:bg-gray-200 rounded">
      {children}
    </Link>
  </li>
);

const Sidebar = () => (
  <aside className="w-64 h-screen flex flex-col">
    <div className="p-2 ">
      <h1 className="text-xl font-bold">App Name</h1>
    </div>
    <nav className="flex-1 overflow-y-auto p-4 pe-0 pt-1">
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
);

export default function Layout({ children }) {
  return (
    <div className="flex h-screen text-sm">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="p-2">
          <div className="text-lg">Breadcrumbs go here</div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 rounded border m-1 ps-4 py-2 pe-0">
          <ScrollArea className="h-full">{children}</ScrollArea>
        </main>
      </div>
    </div>
  );
}
