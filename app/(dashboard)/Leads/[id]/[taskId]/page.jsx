import { editTask, getTaskById } from "@/app/actions/tasks";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
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
  Flag,
} from "lucide-react";
import TaskEditForm from "./TaskEditForm";
const page = async ({ params }) => {
  const task = await getTaskById(params.taskId);
  if (task && task.status == "error") {
    return <p className="text-center">{task.message}</p>;
  }

  const formatStatus = (status) => {
    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const getStatusBadge = (status) => {
    const statusStyles = {
      fresh: "bg-blue-200",
      in_progress: "bg-yellow-200",
      completed: "bg-green-200",
    };
    return (
      <span
        className={`badge ${statusStyles[status]} py-1 px-2 rounded-lg text-black`}
      >
        {formatStatus(status)}
      </span>
    );
  };
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card className="bg-[#161618] text-white border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                {task.data.name}
              </CardTitle>
              <CardDescription>{task.data.description}</CardDescription>
            </div>
          </div>
          {getStatusBadge(task.data.status)}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Flag className="text-muted-foreground" />
              <span>{formatStatus(task.data.priority)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-muted-foreground" />
              <span>
                Due Date:
                {task.data.due_date
                  ? format(new Date(task.data.due_date), "PPP")
                  : format(new Date(), "PPP")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-[#161618] text-white border-0">
        <CardHeader>
          <h3>Edit task details</h3>
        </CardHeader>
        <CardContent>
          <TaskEditForm
            task={JSON.parse(JSON.stringify(task.data))}
            editTask={editTask}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
