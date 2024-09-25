import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { deleteLead, getLeads } from "@/app/actions/leads";
import LeadsTable from "./LeadsTable";

const LeadsPage = async () => {
  const leadsData = await getLeads();
  const leads = leadsData.data || [];
  const totalCount = leads.length;
  const last30DaysCount = leads.filter(
    (lead) => new Date() - new Date(lead.created_at) <= 30 * 24 * 60 * 60 * 1000
  ).length;
  const conversionRate =
    (leads.filter((lead) => lead.status !== "new" && lead.status !== "lost")
      .length /
      totalCount) *
    100;
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 bg-[#161618] text-white">
          <CardHeader>
            <CardTitle>Leads (Past 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{last30DaysCount}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-[#161618] text-white">
          <CardHeader>
            <CardTitle>Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalCount}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-[#161618] text-white">
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{conversionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Leads</h2>
      <LeadsTable
        leads={JSON.parse(JSON.stringify(leads))}
        deleteLead={deleteLead}
      />
    </div>
  );
};

export default LeadsPage;
