import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getPendingInvitationByEmail } from "../actions/invitations";
import OnboardingForm from "@/components/OnboardingForm";
import { createOrganization } from "@/app/actions/organization";
import InvitationCard from "@/components/InvitationCard"; // New import

const Page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (token) {
    try {
      const decodedToken = jwt.verify(token.value, process.env.JWT_SECRET);
      const invitation = await getPendingInvitationByEmail(decodedToken.email);
      console.log(invitation);
      if (
        invitation &&
        invitation.status == "success" &&
        invitation.data &&
        invitation.data.length > 0
      ) {
        return (
          <InvitationCard
            invitation={JSON.parse(JSON.stringify(invitation.data[0]))}
          />
        );
      }
    } catch (error) {
      console.log("Error decoding token or fetching invitation:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome to Solar CRM
        </h2>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-yellow-700">
            <strong>Note:</strong> You don't have an invitation from any
            existing organization.
          </p>
        </div>
        <p className="mb-6 text-gray-600">
          Please set up a new organization by filling out the form below:
        </p>
        <OnboardingForm createOrganization={createOrganization} />
      </div>
    </div>
  );
};

export default Page;
