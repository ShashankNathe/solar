import { getLeadById } from "@/app/actions/leads";
import React from "react";

const page = async ({ params }) => {
  const lead = await getLeadById(params.id);
  console.log(lead);
  return <div>page</div>;
};

export default page;
