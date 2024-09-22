"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DynamicBreadCrumbs = () => {
  const path = usePathname();
  const pathNames = path.split("/").filter((name) => name);
  if (pathNames.includes("post")) {
    pathNames.pop();
  }
  return (
    <Breadcrumb className="flex sm:flex text-white">
      <BreadcrumbList>
        {pathNames.map((name, index) => {
          const isUUID =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
              name
            );
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index < pathNames.length - 1 ? (
                  <BreadcrumbLink asChild className="text-white">
                    <Link href={`/${name}`} className="text-white">
                      {isUUID
                        ? "Details"
                        : name.charAt(0).toUpperCase() + name.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-white">
                    {isUUID
                      ? "Details"
                      : name.charAt(0).toUpperCase() + name.slice(1)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < pathNames.length - 1 && (
                <BreadcrumbSeparator key={index + 1}></BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadCrumbs;
