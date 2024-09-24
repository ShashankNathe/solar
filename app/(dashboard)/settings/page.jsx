import { getOrganizationUsers } from "@/app/actions/organization";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const page = async () => {
  const users = await getOrganizationUsers();
  return (
    <div className="p-6">
      <Card className="bg-[#161618] border-0 text-white">
        <CardHeader>Team members</CardHeader>
        <CardContent>
          <ul class="space-y-4">
            {users &&
              users.data &&
              users.data.map((user) => {
                return (
                  <li class="flex items-center justify-between" key={user.id}>
                    <div class="flex items-center space-x-4 w-full">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted text-black">
                          {user.name[0]}
                        </span>
                      </span>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <p class="font-medium">{user.name}</p>
                          <p class="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
