"use server";
import { cookies } from "next/headers";
import { getUserOrgIdAndRole } from "./auth";
import { turso } from "./database";
import { verify } from "jsonwebtoken";
import { revalidatePath } from "next/cache";

export const addTask = async (taskData) => {
  const lead_id = taskData.get("lead_id");
  const organization_id = taskData.get("organization_id");
  const name = taskData.get("name");
  const status = taskData.get("status") || "fresh"; // default to 'fresh' if not provided
  const description = taskData.get("description");
  const priority = taskData.get("priority") || "medium"; // default to 'medium' if not provided
  const due_date = taskData.get("due_date");
  const owner = taskData.get("owner");

  // Get current user to ensure authorization
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const decodedToken = verify(token.value, process.env.JWT_SECRET);
  const userEmail = decodedToken.email;

  if (!userEmail) {
    return { status: "error", message: "Unauthorized" };
  }

  const current_user = await getUserOrgIdAndRole(userEmail);

  // Ensure that required fields are present
  if (!lead_id || !organization_id || !name || !owner) {
    return {
      status: "error",
      message: "Missing required fields: lead_id, organization_id, name, owner",
    };
  }

  // Start building the query dynamically
  let query =
    "INSERT INTO Tasks (lead_id, organization_id, name, status, owner";
  let values = [lead_id, organization_id, name, status, owner];
  let placeholders = "?, ?, ?, ?, ?";

  // Add optional fields only if they are provided
  if (description) {
    query += ", description";
    values.push(description);
    placeholders += ", ?";
  }
  if (priority) {
    query += ", priority";
    values.push(priority);
    placeholders += ", ?";
  }
  if (due_date) {
    query += ", due_date";
    values.push(due_date);
    placeholders += ", ?";
  }

  // Close the query
  query += `) VALUES (${placeholders})`;

  // Execute the query
  try {
    const task = await turso.execute(query, values);
    revalidatePath(`/leads/${lead_id}`);
    return { status: "success", data: task.rows };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error creating task" };
  }
};

export const editTask = async (id, lead_id, taskData) => {
  const name = taskData.get("name");
  const status = taskData.get("status");
  const description = taskData.get("description");
  const priority = taskData.get("priority");
  const due_date = taskData.get("due_date");
  const owner = taskData.get("owner");

  if (!id) {
    return { status: "error", message: "Missing task ID" };
  }

  // Dynamically build update query
  let query = "UPDATE Tasks SET";
  let values = [];
  let updates = [];

  if (name) {
    updates.push("name = ?");
    values.push(name);
  }
  if (status) {
    updates.push("status = ?");
    values.push(status);
  }
  if (description) {
    updates.push("description = ?");
    values.push(description);
  }
  if (priority) {
    updates.push("priority = ?");
    values.push(priority);
  }
  if (due_date) {
    updates.push("due_date = ?");
    values.push(due_date);
  }
  if (owner) {
    updates.push("owner = ?");
    values.push(owner);
  }

  if (updates.length === 0) {
    return { status: "error", message: "No fields to update" };
  }

  query += ` ${updates.join(", ")} WHERE id = ?`;
  values.push(id);

  // Execute the query
  try {
    const task = await turso.execute(query, values);
    revalidatePath(`/leads/${lead_id}`);
    revalidatePath(`/leads/${lead_id}/${id}`);
    return { status: "success", data: task.rows };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error updating task" };
  }
};

export const deleteTask = async (id, lead_id) => {
  if (!id) {
    return { status: "error", message: "Missing task ID" };
  }

  try {
    const task = await turso.execute("DELETE FROM Tasks WHERE id = ?", [id]);
    revalidatePath(`/leads/${lead_id}`);
    return { status: "success", data: task.rows };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error deleting task" };
  }
};

export const getTasksByLead = async (lead_id) => {
  if (!lead_id) {
    throw new Error("Missing required fields: lead_id");
  }

  try {
    const tasks = await turso.execute("SELECT * FROM Tasks WHERE lead_id = ?", [
      lead_id,
    ]);
    return { status: "success", data: tasks.rows };
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving tasks for lead");
  }
};

export const getTasksByOwner = async (owner_id) => {
  if (!owner_id) {
    throw new Error("Missing required fields: owner_id");
  }

  try {
    const tasks = await turso.execute("SELECT * FROM Tasks WHERE owner = ?", [
      owner_id,
    ]);
    return { status: "success", data: tasks.rows };
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving tasks for owner");
  }
};

export const getTasksByOrganization = async (organization_id) => {
  if (!organization_id) {
    throw new Error("Missing required fields: organization_id");
  }

  try {
    const tasks = await turso.execute(
      "SELECT * FROM Tasks WHERE organization_id = ?",
      [organization_id]
    );
    return { status: "success", data: tasks.rows };
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving tasks for organization");
  }
};

export const getTaskById = async (id) => {
  if (!id) {
    throw new Error("Missing required fields: id");
  }

  try {
    const task = await turso.execute("SELECT * FROM Tasks WHERE id = ?", [id]);
    if (task.rows.length === 0) {
      return { status: "error", message: "Task not found" };
    }
    return { status: "success", data: task.rows[0] };
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving task by ID");
  }
};

export const getTasks = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const decodedToken = verify(token.value, process.env.JWT_SECRET);
  const userEmail = decodedToken.email;

  if (!userEmail) {
    return { status: "error", message: "Unauthorized" };
  }

  const current_user = await getUserOrgIdAndRole(userEmail);

  if (
    !current_user ||
    !current_user.data ||
    !current_user.data[0] ||
    !current_user.data[0].role
  ) {
    return {
      status: "error",
      message: "Unauthorized",
    };
  }

  const userRole = current_user.data[0].role;
  const userId = current_user.data[0].id;
  const org_id = current_user.data[0].organization_id;
  try {
    let tasks;
    if (userRole === "admin") {
      tasks = await turso.execute(
        "SELECT * FROM Tasks WHERE organization_id = ?",
        [org_id]
      );
    } else {
      tasks = await turso.execute(
        "SELECT * FROM Tasks WHERE organization_id = ? AND owner = ?",
        [org_id, userId]
      );
    }
    return { status: "success", data: tasks.rows };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error getting tasks" };
  }
};
