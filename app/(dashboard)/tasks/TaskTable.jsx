"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import Link from "next/link";

const TaskTable = async ({ tasks, deleteTask }) => {
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

  const tasksInProgress = tasks.filter((task) => task.status === "in_progress");
  const tasksCompleted = tasks.filter((task) => task.status === "completed");
  const tasksFresh = tasks.filter((task) => task.status === "fresh");
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6">
        <Card className="border-0 bg-[#161618] text-white">
          <CardHeader>
            <CardTitle>Fresh Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{tasksFresh.length}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-[#161618] text-white">
          <CardHeader>
            <CardTitle>In Progress Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{tasksInProgress.length}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-[#161618] text-white">
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{tasksCompleted.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 col-span-4">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList className="bg-[#161618] gap-2">
                <TabsTrigger className="bg-[#1c1c1e]" value="all">
                  All
                </TabsTrigger>
                <TabsTrigger className="bg-[#1c1c1e]" value="progress">
                  In Progress
                </TabsTrigger>
                <TabsTrigger className="bg-[#1c1c1e]" value="complete">
                  Completed
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <Card
                x-chunk="dashboard-05-chunk-3"
                className="bg-[#161618] text-white border-0"
              >
                <CardHeader className="px-7">
                  <CardTitle>Tasks</CardTitle>
                  <CardDescription>Tasks Assigned to you</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Priority
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Due date
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks
                        .sort(
                          (a, b) => new Date(a.due_date) - new Date(b.due_date)
                        ) // {{ edit_1 }}
                        .map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <Link href={`/leads/${task.lead_id}/${task.id}`}>
                                {task.name}
                              </Link>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Link href={`/leads/${task.lead_id}/${task.id}`}>
                                {formatStatus(task.priority)}
                              </Link>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
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
                                    description:
                                      "Are you sure you want to delete this task.",
                                    action: (
                                      <ToastAction
                                        altText="Delete"
                                        onClick={() =>
                                          handleDelete(task.id, task.lead_id)
                                        }
                                      >
                                        Delete
                                      </ToastAction>
                                    ),
                                  });
                                }}
                              >
                                <Button
                                  type="submit"
                                  variant="outline"
                                  className="bg-transparent border-0"
                                >
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
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="progress">
              <Card
                x-chunk="dashboard-05-chunk-4"
                className="bg-[#161618] text-white border-0"
              >
                <CardHeader className="px-7">
                  <CardTitle>In Progress Tasks</CardTitle>
                  <CardDescription>Tasks currently in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Priority
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Due date
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasksInProgress
                        .sort(
                          (a, b) => new Date(a.due_date) - new Date(b.due_date)
                        )
                        .map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <Link href={`/leads/${task.lead_id}/${task.id}`}>
                                {task.name}
                              </Link>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Link href={`/leads/${task.lead_id}/${task.id}`}>
                                {formatStatus(task.priority)}
                              </Link>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
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
                                    description:
                                      "Are you sure you want to delete this task.",
                                    action: (
                                      <ToastAction
                                        altText="Delete"
                                        onClick={() =>
                                          handleDelete(task.id, task.lead_id)
                                        }
                                      >
                                        Delete
                                      </ToastAction>
                                    ),
                                  });
                                }}
                              >
                                <Button
                                  type="submit"
                                  variant="outline"
                                  className="bg-transparent border-0"
                                >
                                  <Trash className="text-red-600 cursor-pointer" />
                                </Button>
                              </form>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="complete">
              <Card
                x-chunk="dashboard-05-chunk-5"
                className="bg-[#161618] text-white border-0"
              >
                <CardHeader className="px-7">
                  <CardTitle>Completed Tasks</CardTitle>
                  <CardDescription>
                    Tasks that have been completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Priority
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Due date
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasksCompleted
                        .sort(
                          (a, b) => new Date(a.due_date) - new Date(b.due_date)
                        )
                        .map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <Link href={`/leads/${task.lead_id}/${task.id}`}>
                                {task.name}
                              </Link>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Link href={`/leads/${task.lead_id}/${task.id}`}>
                                {formatStatus(task.priority)}
                              </Link>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
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
                                    description:
                                      "Are you sure you want to delete this task.",
                                    action: (
                                      <ToastAction
                                        altText="Delete"
                                        onClick={() =>
                                          handleDelete(task.id, task.lead_id)
                                        }
                                      >
                                        Delete
                                      </ToastAction>
                                    ),
                                  });
                                }}
                              >
                                <Button
                                  type="submit"
                                  variant="outline"
                                  className="bg-transparent border-0"
                                >
                                  <Trash className="text-red-600 cursor-pointer" />
                                </Button>
                              </form>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default TaskTable;
