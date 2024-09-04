import React from "react";
import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardChart from "@/components/DashboardChart";

const mockCardData = [
  { title: "Total Leads", value: "1,234" },
  { title: "Conversion Rate", value: "12.3%" },
  { title: "Revenue", value: "$45,678" },
];

const mockLeads = [
  { id: 1, name: "John Doe", email: "john@example.com", date: "2023-06-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", date: "2023-06-02" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", date: "2023-06-03" },
];

const page = async () => {
  return (
    <div className="p-6 space-y-6">
      {/* Chart */}
      <div className="h-96 bg-white p-4 rounded-lg shadow">
        <DashboardChart />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockCardData.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Latest Leads */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Latest Leads</h2>
        <ul className="divide-y divide-gray-200">
          {mockLeads.map((lead) => (
            <li key={lead.id} className="py-4">
              <p className="font-medium">{lead.name}</p>
              <p className="text-sm text-gray-500">{lead.email}</p>
              <p className="text-sm text-gray-500">{lead.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
