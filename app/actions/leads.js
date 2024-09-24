"use server";
import { cookies } from "next/headers";
import { getUserOrgIdAndRole } from "./auth";
import { turso } from "./database";
import { verify } from "jsonwebtoken";
import { revalidatePath } from "next/cache";

export const getLeads = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const decodedToken = verify(token.value, process.env.JWT_SECRET);
  const userEmail = decodedToken.email;

  if (!userEmail) {
    return { status: "error", message: "Missing required fields" };
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
    let leads;
    if (userRole === "admin") {
      leads = await turso.execute(
        "SELECT * FROM Leads WHERE organization_id = ?",
        [org_id]
      );
    } else {
      leads = await turso.execute(
        "SELECT * FROM Leads WHERE organization_id = ? AND owner = ?",
        [org_id, userId]
      );
    }
    return { status: "success", data: leads.rows };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error getting leads" };
  }
};

export const createLead = async (leadData) => {
  const name = leadData.get("name");
  const status = leadData.get("status");
  const email = leadData.get("email");
  const phone = leadData.get("phone");
  const address = leadData.get("address");
  const description = leadData.get("description");
  const owner = leadData.get("owner"); // Now required
  const next_action = leadData.get("next_action");
  const next_action_scheduled_on = leadData.get("next_action_scheduled_on");
  const notes = leadData.get("notes");
  const site_address = leadData.get("site_address");
  const solution_type = leadData.get("solution_type");
  const date_of_installation = leadData.get("date_of_installation");
  const free_area_roof = leadData.get("free_area_roof");
  const free_area_ground = leadData.get("free_area_ground");
  const roof_type = leadData.get("roof_type");
  const roof_angle = leadData.get("roof_angle");
  const panel_capacity = leadData.get("panel_capacity");
  const panel_quantity = leadData.get("panel_quantity");
  const inverter_capacity = leadData.get("inverter_capacity");
  const inverter_quantity = leadData.get("inverter_quantity");
  const price = leadData.get("price");

  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const decodedToken = verify(token.value, process.env.JWT_SECRET);
  const userEmail = decodedToken.email;

  // Ensure the current user is authorized
  if (!userEmail) {
    return { status: "error", message: "Unauthorized" };
  }

  const current_user = await getUserOrgIdAndRole(userEmail);

  if (
    !current_user ||
    !current_user.data ||
    !current_user.data[0] ||
    !current_user.data[0].organization_id
  ) {
    return {
      status: "error",
      message: "Unauthorized",
    };
  }

  const organization_id = current_user.data[0].organization_id;

  // Required fields check
  if (!name || !status || !owner) {
    return {
      status: "error",
      message: "Missing required fields: name, status, or owner",
    };
  }

  // Start building the query dynamically
  let query = "INSERT INTO Leads (name, status, organization_id, owner";
  let values = [name, status, organization_id, owner];
  let placeholders = "?, ?, ?, ?";

  // Add optional fields only if they are provided
  if (email) {
    query += ", email";
    values.push(email);
    placeholders += ", ?";
  }
  if (phone) {
    query += ", phone";
    values.push(phone);
    placeholders += ", ?";
  }
  if (address) {
    query += ", address";
    values.push(address);
    placeholders += ", ?";
  }
  if (description) {
    query += ", description";
    values.push(description);
    placeholders += ", ?";
  }
  if (next_action) {
    query += ", next_action";
    values.push(next_action);
    placeholders += ", ?";
  }
  if (next_action_scheduled_on) {
    query += ", next_action_scheduled_on";
    values.push(next_action_scheduled_on);
    placeholders += ", ?";
  }
  if (notes) {
    query += ", notes";
    values.push(notes);
    placeholders += ", ?";
  }
  if (site_address) {
    query += ", site_address";
    values.push(site_address);
    placeholders += ", ?";
  }
  if (solution_type) {
    query += ", solution_type";
    values.push(solution_type);
    placeholders += ", ?";
  }
  if (date_of_installation) {
    query += ", date_of_installation";
    values.push(date_of_installation);
    placeholders += ", ?";
  }
  if (free_area_roof) {
    query += ", free_area_roof";
    values.push(free_area_roof);
    placeholders += ", ?";
  }
  if (free_area_ground) {
    query += ", free_area_ground";
    values.push(free_area_ground);
    placeholders += ", ?";
  }
  if (roof_type) {
    query += ", roof_type";
    values.push(roof_type);
    placeholders += ", ?";
  }
  if (roof_angle) {
    query += ", roof_angle";
    values.push(roof_angle);
    placeholders += ", ?";
  }
  if (panel_capacity) {
    query += ", panel_capacity";
    values.push(panel_capacity);
    placeholders += ", ?";
  }
  if (panel_quantity) {
    query += ", panel_quantity";
    values.push(panel_quantity);
    placeholders += ", ?";
  }
  if (inverter_capacity) {
    query += ", inverter_capacity";
    values.push(inverter_capacity);
    placeholders += ", ?";
  }
  if (inverter_quantity) {
    query += ", inverter_quantity";
    values.push(inverter_quantity);
    placeholders += ", ?";
  }
  if (price) {
    query += ", price";
    values.push(price);
    placeholders += ", ?";
  }

  // Close the query
  query += `) VALUES (${placeholders})`;

  // Execute the query
  try {
    const lead = await turso.execute(query, values);
    revalidatePath("/leads");
    return {
      status: "success",
      data: lead.rows,
      message: "Lead saved successfully.",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error creating lead" };
  }
};

export const updateLead = async (leadData) => {
  // console.log(leadData);
  const id = leadData.get("id");
  const name = leadData.get("name");
  const status = leadData.get("status");
  const email = leadData.get("email");
  const phone = leadData.get("phone");
  const address = leadData.get("address");
  const description = leadData.get("description");
  const next_action = leadData.get("next_action");
  const next_action_scheduled_on = leadData.get("next_action_scheduled_on");
  const notes = leadData.get("notes");
  const site_address = leadData.get("site_address");
  const solution_type = leadData.get("solution_type");
  const date_of_installation = leadData.get("date_of_installation");
  const free_area_roof = leadData.get("free_area_roof");
  const free_area_ground = leadData.get("free_area_ground");
  const roof_type = leadData.get("roof_type");
  const roof_angle = leadData.get("roof_angle");
  const panel_capacity = leadData.get("panel_capacity");
  const panel_quantity = leadData.get("panel_quantity");
  const inverter_capacity = leadData.get("inverter_capacity");
  const inverter_quantity = leadData.get("inverter_quantity");
  const price = leadData.get("price");

  // Required fields check
  if (!id || !name || !email || !phone) {
    return { status: "error", message: "Missing required fields" };
  }

  // Start building the query dynamically
  let query = "UPDATE Leads SET name = ?, email = ?, phone = ?";
  let values = [name, email, phone];

  // Add optional fields only if they are provided
  if (status) {
    query += ", status = ?";
    values.push(status);
  }
  if (address) {
    query += ", address = ?";
    values.push(address);
  }
  if (description) {
    query += ", description = ?";
    values.push(description);
  }
  if (next_action) {
    query += ", next_action = ?";
    values.push(next_action);
  }
  if (next_action_scheduled_on) {
    query += ", next_action_scheduled_on = ?";
    values.push(next_action_scheduled_on);
  }
  if (notes) {
    query += ", notes = ?";
    values.push(notes);
  }
  if (site_address) {
    query += ", site_address = ?";
    values.push(site_address);
  }
  if (solution_type) {
    query += ", solution_type = ?";
    values.push(solution_type);
  }
  if (date_of_installation) {
    query += ", date_of_installation = ?";
    values.push(date_of_installation);
  }
  if (free_area_roof) {
    query += ", free_area_roof = ?";
    values.push(free_area_roof);
  }
  if (free_area_ground) {
    query += ", free_area_ground = ?";
    values.push(free_area_ground);
  }
  if (roof_type) {
    query += ", roof_type = ?";
    values.push(roof_type);
  }
  if (roof_angle) {
    query += ", roof_angle = ?";
    values.push(roof_angle);
  }
  if (panel_capacity) {
    query += ", panel_capacity = ?";
    values.push(panel_capacity);
  }
  if (panel_quantity) {
    query += ", panel_quantity = ?";
    values.push(panel_quantity);
  }
  if (inverter_capacity) {
    query += ", inverter_capacity = ?";
    values.push(inverter_capacity);
  }
  if (inverter_quantity) {
    query += ", inverter_quantity = ?";
    values.push(inverter_quantity);
  }
  if (price) {
    query += ", price = ?";
    values.push(price);
  }

  query += " WHERE id = ?";
  values.push(id);

  try {
    const lead = await turso.execute(query, values);
    revalidatePath(`/leads/${id}`);
    revalidatePath("/leads");
    return { status: "success", data: [] };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error updating lead" };
  }
};

export const getLeadById = async (id) => {
  if (!id) {
    return { status: "error", message: "Missing required fields" };
  }
  try {
    const lead = await turso.execute("SELECT * FROM Leads WHERE id = ?", [id]);
    if (lead && lead.rows && lead.rows.length > 0) {
      return { status: "success", data: lead.rows };
    } else {
      return { status: "error", message: "Lead not found" };
    }
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error getting lead" };
  }
};

export const deleteLead = async (id) => {
  console.log(id);
  if (!id) {
    throw new Error("Missing required fields");
  }
  try {
    const lead = await turso.execute("DELETE FROM Leads WHERE id = ?", [id]);
    revalidatePath("/leads");
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting lead");
  }
};

export const getCurrentUserLeads = async () => {
  const current_user = getUserOrgIdAndRole();

  if (!current_user) {
    throw new Error("Unauthorized");
  }

  try {
    const leads = await turso.execute(
      "SELECT * FROM Leads WHERE organization_id = ? AND owner_id = ?",
      [current_user.organization_id, current_user.id]
    );
    return leads;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting leads");
  }
};

export const getLatestLeads = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const decodedToken = verify(token.value, process.env.JWT_SECRET);
  const userEmail = decodedToken.email;

  if (!userEmail) {
    return { status: "error", message: "Missing required fields" };
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
    let leads;
    if (userRole === "admin") {
      leads = await turso.execute(
        "SELECT * FROM Leads WHERE organization_id = ? ORDER BY created_at DESC LIMIT 5",
        [org_id]
      );
    } else {
      leads = await turso.execute(
        "SELECT * FROM Leads WHERE organization_id = ? AND owner = ? ORDER BY created_at DESC LIMIT 5",
        [org_id, userId]
      );
    }
    return { status: "success", data: leads.rows };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error getting leads" };
  }
};
