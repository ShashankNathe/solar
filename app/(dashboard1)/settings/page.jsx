import { getOrganizationUsers } from "@/app/actions/organization";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import InvitationForm from "./InvitationForm";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { getUserOrgIdAndRole } from "@/app/actions/auth";
import {
  createInvitation,
  getInvitationsByOrgId,
} from "@/app/actions/invitations";

const page = async () => {
  const users = await getOrganizationUsers();
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const decodedToken = verify(token.value, process.env.JWT_SECRET);
  const userEmail = decodedToken.email;
  const current_user = await getUserOrgIdAndRole(userEmail);

  const userRole = current_user.data[0].role;
  const userId = current_user.data[0].id;
  const org_id = current_user.data[0].organization_id;
  const invitedData = await getInvitationsByOrgId(org_id);
  const invites = invitedData.data;
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
        <CardHeader>Invited members</CardHeader>
        <CardContent>
          <ul class="space-y-4">
            {invites &&
              invites.map((user) => {
                return (
                  <li class="flex items-center justify-between" key={user.id}>
                    <div class="flex items-center space-x-4 w-full">
                      <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <span class="flex h-full w-full items-center justify-center rounded-full bg-muted text-black">
                          {user.email[0]}
                        </span>
                      </span>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <p class="font-medium">{user.email}</p>
                          <p class="text-sm text-muted-foreground">
                            {user.created_at}
                          </p>
                        </div>
                        <span className="capitalize">{user.status}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </CardContent>
      </Card>
      {userRole == "admin" && (
        <InvitationForm
          createInvitation={createInvitation}
          invited_by={userId}
          org_id={org_id}
        />
      )}
    </div>
  );
};

export default page;
