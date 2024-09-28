import { getLeadById, updateLead } from "@/app/actions/leads";
import React from "react";
// import { useState } from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  Mail,
  Phone,
  MapPin,
  User,
  ClipboardList,
  Calendar,
  LocateIcon,
  LocateOffIcon,
  Home,
} from "lucide-react";
import { format } from "date-fns";
import EditLeadForm from "./EditLeadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddTaskForm from "./AddTaskForm";
import { addTask, deleteTask, getTasksByLead } from "@/app/actions/tasks";
import TaskList from "./TaskList";

const page = async ({ params }) => {
  const formatStatus = (status) => {
    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      new: "bg-blue-200",
      contacted: "bg-yellow-200",
      qualified: "bg-green-200",
      proposal_sent: "bg-orange-200",
      won: "bg-teal-200",
      lost: "bg-red-200",
    };
    return (
      <span
        className={`badge ${statusStyles[status]} py-1 px-2 rounded-lg text-black`}
      >
        {formatStatus(status)}
      </span>
    );
  };
  const leadData = await getLeadById(params.id);
  const lead = leadData.data[0];
  const tasks = await getTasksByLead(params.id);

  // console.log(lead);
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card className="bg-[#161618] text-white border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 text-black">
              <AvatarFallback>{lead.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{lead.name}</CardTitle>
              <CardDescription>{lead.email}</CardDescription>
            </div>
          </div>
          {getStatusBadge(lead.status)}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Phone className="text-muted-foreground" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-muted-foreground" />
              <span>Created: {format(new Date(lead.created_at), "PPP")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Home className="text-muted-foreground" />
              <span>{lead.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details">
        <div className="flex items-center">
          <TabsList className="bg-[#161618] gap-2">
            <TabsTrigger className="bg-[#1c1c1e] " value="details">
              Details
            </TabsTrigger>
            <TabsTrigger className="bg-[#1c1c1e] " value="tasks">
              Tasks
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="bg-[#161618] rounded-lg" value="details">
          <EditLeadForm
            lead={JSON.parse(JSON.stringify(lead))}
            updateLead={updateLead}
          />
        </TabsContent>
        <TabsContent className="bg-[#161618] rounded-lg p-2 py-4" value="tasks">
          <AddTaskForm
            lead={JSON.parse(JSON.stringify(lead))}
            addTask={addTask}
          />
          <TaskList
            tasks={JSON.parse(JSON.stringify(tasks.data))}
            deleteTask={deleteTask}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
