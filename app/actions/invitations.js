import { getUserOrgIdAndRole } from "./auth";
import { turso } from "./database";

export const getInvitations = async () => {
  const invitations = await turso.execute("SELECT * FROM Invitations");
  return invitations;
};

export const getInvitationsByOrgId = async (org_id) => {
  if (!org_id) {
    throw new Error("Missing required fields");
  }
  const invitations = await turso.execute("SELECT * FROM Invitations WHERE organization_id = ?", [org_id]);
  return invitations;
};

export const createInvitation = async (email, org_id, invited_by) => {
  const current_user = getUserOrgIdAndRole();
  if (current_user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  if (!email || !org_id || !invited_by) {
    throw new Error("Missing required fields");
  }

  try {
    const invitation = await turso.execute("INSERT INTO Invitations (email, organization_id, status, invited_by) VALUES (?, ?, ?, ?)", [email, org_id, "pending", invited_by]);
    return invitation;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating invitation");
  }
};

export const updateInvitation = async (id, status) => {
  if (!id || !status) {
    throw new Error("Missing required fields");
  }
  try {
    const invitation = await turso.execute("UPDATE Invitations SET status = ? WHERE id = ?", [status, id]);
    return invitation;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating invitation");
  }
};

export const getInvitationByEmail = async (email) => {
  if (!email) {
    throw new Error("Missing required fields");
  }
  try {
    const invitation = await turso.execute("SELECT * FROM Invitations WHERE email = ?", [email]);
    return invitation;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting invitation");
  }
};
