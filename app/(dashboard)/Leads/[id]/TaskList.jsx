"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const TaskList = ({ tasks, deleteTask }) => {
  const { toast } = useToast();
  async function handleDelete(id, lead_id) {
    await deleteTask(id, lead_id);
    toast({
      title: "Task deleted successfully",
    });
  }
  const formatStatus = (status) => {
    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      fresh: "bg-blue-200",
      in_progress: "bg-teal-200",
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
    <Table className="text-center">
      <TableCaption>A list of your Tasks.</TableCaption>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead className="text-center">Task</TableHead>
          <TableHead className="text-center">Description</TableHead>
          <TableHead className="text-center">Priority</TableHead>
          <TableHead className="text-center">Due date</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks
          .sort((a, b) => new Date(a.due_date) - new Date(b.due_date)) // {{ edit_1 }}
          .map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Link href={`/leads/${task.lead_id}/${task.id}`}>
                  {task.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${task.lead_id}/${task.id}`}>
                  {task.description}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${task.lead_id}/${task.id}`}>
                  {task.priority}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${task.lead_id}/${task.id}`}>
                  {task.due_date
                    ? format(new Date(task.due_date), "PPP")
                    : format(new Date(), "PPP")}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${task.lead_id}/${task.id}`}>
                  {getStatusBadge(task.status)}
                </Link>
              </TableCell>
              <TableCell className="text-right flex items-end justify-end">
                <form
                  action={(e) => {
                    toast({
                      title: "Delete Task.",
                      description: "Are you sure you want to delete this task.",
                      action: (
                        <ToastAction
                          altText="Delete"
                          onClick={() => handleDelete(task.id, task.lead_id)}
                        >
                          Delete
                        </ToastAction>
                      ),
                    });
                  }}
                >
                  <Button type="submit">
                    <Trash
                      type="submit"
                      className="text-red-600 cursor-pointer"
                    />
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TaskList;
