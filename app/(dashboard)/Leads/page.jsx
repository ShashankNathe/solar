import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockLeadsData = {
  last30Days: 145,
  total: 1250,
  conversionRate: 12.5,
  recentLeads: [
    { id: 1, name: "John Doe", email: "john@example.com", date: "2023-04-15" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      date: "2023-04-14",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      date: "2023-04-13",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      date: "2023-04-12",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      date: "2023-04-11",
    },
  ],
};

const LeadsPage = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Leads (Past 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{mockLeadsData.last30Days}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{mockLeadsData.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {mockLeadsData.conversionRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Recent Leads</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLeadsData.recentLeads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadsPage;
