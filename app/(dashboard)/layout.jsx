import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DynamicBreadCrumbs from "@/components/DynamicBreadcrumbs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getUserOrgIdAndRole } from "@/app/actions/auth";
import Sidebar from "@/components/Sidebar";

export default async function Layout({ children }) {
  const getUser = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return null;
    }

    try {
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
      const { email } = decoded;

      const { status, data } = await getUserOrgIdAndRole(email);

      if (status === "success" && data.length > 0) {
        return {
          email,
          organizationId: data[0].organization_id,
          role: data[0].role,
          orgName: data[0].organization_name,
          userName: data[0].name,
        };
      }

      return null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const user = await getUser();
  return (
    <div className="flex h-screen text-sm relative bg-[#161618] text-white">
      {/* <Sidebar user={user} /> */}
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col">
        <header className="p-2 flex items-center justify-center">
          <DynamicBreadCrumbs />
        </header>

        <main className="flex-1 overflow-y-auto bg-[#1c1c1e] rounded m-1 py-2 pe-0 ">
          <ScrollArea className="h-full">{children}</ScrollArea>
        </main>
      </div>
    </div>
  );
}
