"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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

import { useToast } from "@/hooks/use-toast";
const TaskEditForm = ({ task, editTask }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target); // Get form data

        try {
          const data = await editTask(task.id, task.lead_id, formData); // Call the server action
          if (data.status == "success") {
            toast({
              title: "Task updated successfully",
            });
          } else {
            toast({
              title: "Failed to update task",
              description: data.message,
              variant: "destructive",
            });
          }
        } catch (error) {
          console.log("Error updating task:", error);
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
        <Input id="name" name="name" defaultValue={task.name} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={task.description}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={task.status}>
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
        <Select name="priority" defaultValue={task.priority}>
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
        <Input
          id="due_date"
          name="due_date"
          type="datetime-local"
          defaultValue={task.due_date}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Task"}
      </Button>
    </form>
  );
};

export default TaskEditForm;
