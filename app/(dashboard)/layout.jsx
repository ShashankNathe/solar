import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DynamicBreadCrumbs from "@/components/DynamicBreadcrumbs";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen text-sm relative">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="p-2 flex items-center justify-center">
          <DynamicBreadCrumbs />
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 rounded border m-1 ps-4 py-2 pe-0">
          <ScrollArea className="h-full">{children}</ScrollArea>
        </main>
      </div>
    </div>
  );
}
