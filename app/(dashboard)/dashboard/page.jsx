import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardChart from "@/components/DashboardChart";
import { deleteLead, getLeads } from "@/app/actions/leads";
import LeadsTable from "../leads/LeadsTable";

const page = async () => {
  const leadsData = await getLeads();
  const leads = leadsData.data;
  const today = new Date();
  const thirtyDaysAgo = new Date(today.setMonth(today.getMonth() - 1));
  const leadsInLast30Days = leads.filter(
    (lead) => new Date(lead.created_at) >= thirtyDaysAgo
  );
  const convertedLeads = leadsInLast30Days.filter(
    (lead) => lead.status !== "new" && lead.status !== "lost"
  );
  const conversionRate =
    (convertedLeads.length / leadsInLast30Days.length) * 100;
  const completedLeads = convertedLeads.filter((lead) => lead.status === "won");
  const totalRevenue = completedLeads.reduce(
    (acc, lead) => acc + lead.price,
    0
  );
  const mockCardData = [
    { title: "Leads last 30 days", value: leadsInLast30Days.length },
    { title: "Conversion Rate", value: conversionRate },
    { title: "Revenue", value: totalRevenue },
  ];

  const sixMonthsAgo = new Date(today); // Make a copy of the 'today' object
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6); // Get six months ago

  // Filter leads created in the last 6 months
  const leadsInLast6Months = leads.filter(
    (lead) => new Date(lead.created_at) >= sixMonthsAgo
  );

  const months = [];
  // Get last 6 months' names
  for (let i = 0; i < 6; i++) {
    const monthDate = new Date(); // Create a new date instance for each iteration
    monthDate.setMonth(today.getMonth() - (i - 1)); // Subtract 'i' months from today
    months.unshift(monthDate.toLocaleString("default", { month: "long" })); // Add to the start of the array
  }

  const chartData = months.map((month, index) => {
    const monthLeads = leadsInLast6Months.filter((lead) => {
      const leadDate = new Date(lead.created_at);
      return leadDate.toLocaleString("default", { month: "long" }) === month;
    });

    return { month, leads: monthLeads.length };
  });
  const latestLeads = leadsInLast6Months
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <div className="p-3 md:p-6 space-y-6 text-white">
      <div className="grid grid-cols-4 gap-3">
        <div className=" bg-[#161618] p-4 rounded-lg shadow col-span-4 md:col-span-3">
          <DashboardChart
            chartData={JSON.parse(JSON.stringify(chartData))}
            className="h-40"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 col-span-4 md:col-span-1">
          {mockCardData.map((card, index) => (
            <Card key={index} className="bg-[#161618] border-0">
              <CardHeader>
                <CardTitle className="text-white">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-[#161618] p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Latest Leads</h2>
        <LeadsTable
          leads={JSON.parse(JSON.stringify({ data: latestLeads }))}
          deleteLead={deleteLead}
        />
      </div>
    </div>
  );
};

export default page;
