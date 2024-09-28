"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

const AddTaskForm = ({ lead, addTask }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
    <Dialog>
      <div className="flex justify-end">
        <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-7 gap-1 text-sm mb-4">
          <Plus />
          Add New Task
        </DialogTrigger>
      </div>
      <DialogContent className="bg-[#161618] text-white border-0    ">
        <DialogHeader>
          <DialogTitle className="mb-3">Add new task</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                const formData = new FormData(e.target); // Get form data
                formData.set("lead_id", lead.id);
                formData.set("organization_id", lead.organization_id);
                formData.set("owner", lead.owner);

                try {
                  const data = await addTask(formData); // Call the server action
                  if (data.status == "success") {
                    toast({
                      title: "Task added successfully",
                    });
                  } else {
                    toast({
                      title: "Failed to add task",
                      description: data.message,
                      variant: "destructive",
                    });
                  }
                } catch (error) {
                  console.log("Error updating lead:", error);
                  toast({
                    title: "Something went wrong",
                    variant: "destructive",
                  });
                } finally {
                  setLoading(false);
                }
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Task</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="fresh">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresh">Fresh</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select name="priority" defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_date">Due Date</Label>
                <Input id="due_date" name="due_date" type="datetime-local" />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Task"}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskForm;
