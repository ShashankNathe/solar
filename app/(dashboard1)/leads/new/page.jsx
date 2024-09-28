import { createLead } from "@/app/actions/leads";
import { getOrganizationUsers } from "@/app/actions/organization";
import React from "react";
import NewLeadForm from "./NewLeadForm";

const Page = async () => {
  const userArr = await getOrganizationUsers();
  return (
    <div className="container mx-auto px-4">
      <NewLeadForm
        userArr={JSON.parse(JSON.stringify(userArr))}
        createLead={createLead}
      />
    </div>
  );
};

export default Page;
