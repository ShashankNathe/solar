import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardChart from "@/components/DashboardChart";

const mockCardData = [
  { title: "Leads last 30 days", value: "1,234" },
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
    <div className="p-3 md:p-6 space-y-6 text-white">
      <div className="grid grid-cols-4 gap-3">
        <div className=" bg-[#161618] p-4 rounded-lg shadow col-span-4 md:col-span-3">
          <DashboardChart className="h-40" />
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
