import { getUserOrgIdAndRole } from "./auth";
import { turso } from "./database";

export const getLeads = async (org_id) => {
  if (!org_id) {
    throw new Error("Missing required fields");
  }
  try {
    const leads = await turso.execute("SELECT * FROM Leads WHERE organization_id = ?", [org_id]);
    return leads;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting leads");
  }
};

export const createLead = async (name, email, phone, org_id) => {
  if (!name || !email || !phone || !org_id) {
    throw new Error("Missing required fields");
  }
  try {
    const lead = await turso.execute("INSERT INTO Leads (name, email, phone, organization_id) VALUES (?, ?, ?, ?)", [name, email, phone, org_id]);
    return lead;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating lead");
  }
};

export const updateLead = async (id, name, email, phone) => {
  if (!id || !name || !email || !phone) {
    throw new Error("Missing required fields");
  }
  try {
    const lead = await turso.execute("UPDATE Leads SET name = ?, email = ?, phone = ? WHERE id = ?", [name, email, phone, id]);
    return lead;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating lead");
  }
};

export const getLeadById = async (id) => {
  if (!id) {
    throw new Error("Missing required fields");
  }
  try {
    const lead = await turso.execute("SELECT * FROM Leads WHERE id = ?", [id]);
    return lead;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting lead");
  }
};

export const deleteLead = async (id) => {
  const current_user = getUserOrgIdAndRole();
  if (current_user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  if (!id) {
    throw new Error("Missing required fields");
  }
  try {
    const lead = await turso.execute("DELETE FROM Leads WHERE id = ?", [id]);
    return lead;
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
    const leads = await turso.execute("SELECT * FROM Leads WHERE organization_id = ? AND owner_id = ?", [current_user.organization_id, current_user.id]);
    return leads;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting leads");
  }
};
