"use server";
import { revalidatePath } from "next/cache";
import { getUserOrgIdAndRole } from "./auth";
import { turso } from "./database";

export const getInvitations = async () => {
  const invitations = await turso.execute("SELECT * FROM Invitations");
  return invitations;
};

export const getInvitationsByOrgId = async (org_id) => {
  if (!org_id) {
    return { status: "error", message: "Missing required fields" }; // Updated error handling
  }
  try {
    const invitations = await turso.execute(
      "SELECT * FROM Invitations WHERE organization_id = ?",
      [org_id]
    );
    return { status: "success", data: invitations.rows }; // Updated response format
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error retrieving invitations" }; // Added error handling
  }
};

export const createInvitation = async (email, org_id, invited_by) => {
  if (!email || !org_id || !invited_by) {
    // throw new Error("Missing required fields");
    return { status: "error", message: "Missing required fields" };
  }

  try {
    const invitation = await turso.execute(
      "INSERT INTO Invitations (email, organization_id, status, invited_by) VALUES (?, ?, ?, ?)",
      [email, org_id, "pending", invited_by]
    );
    revalidatePath("/settings");
    return { status: "success", data: [] };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error creating invitation" };
  }
};

export const updateInvitation = async (id, status) => {
  if (!id || !status) {
    throw new Error("Missing required fields");
  }
  try {
    const invitation = await turso.execute(
      "UPDATE Invitations SET status = ? WHERE id = ?",
      [status, id]
    );
    return invitation;
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error updating invitation" };
  }
};

export const getPendingInvitationByEmail = async (email) => {
  if (!email) {
    throw new Error("Missing required fields");
  }
  try {
    const query = `
      SELECT 
        Invitations.*, 
        Organizations.name AS organization_name 
      FROM 
        Invitations 
      LEFT JOIN 
        Organizations 
      ON 
        Invitations.organization_id = Organizations.id 
      WHERE 
        Invitations.email = ? 
        AND Invitations.status = 'pending'
    `;

    const invitation = await turso.execute(query, [email]);

    if (invitation && invitation.rows && invitation.rows.length > 0) {
      return { status: "success", data: invitation.rows };
    } else {
      return { status: "error", message: "Pending invitation not found" };
    }
  } catch (error) {
    return { status: "error", message: "Internal server error" };
  }
};

export const updateInvitationStatusById = async (id, status, email, org_id) => {
  if (!id || !status) {
    throw new Error("Missing required fields");
  }
  if (!["declined", "accepted"].includes(status)) {
    return {
      status: "error",
      message: "Invalid status value. Must be 'declined' or 'accepted'.",
    };
  }

  try {
    const query = `
      UPDATE Invitations
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? 
    `;

    const result = await turso.execute(query, [status, id]);

    if (result && result.rowsAffected > 0) {
      if (status == "accepted") {
        try {
          const userResult = await turso.execute(
            "SELECT id FROM Users WHERE email = ?",
            [email]
          );
          const user_id = userResult.rows[0].id;
          await turso.execute(
            "UPDATE Users SET organization_id = ? WHERE id = ?",
            [org_id, user_id]
          );
        } catch {
          return {
            status: "error",
            message: "Something went wrong",
          };
        }
      }
      return {
        status: "success",
        message: "Invitation status updated successfully",
      };
    } else {
      return {
        status: "error",
        message: "No pending invitation found to update with the given id",
      };
    }
  } catch (error) {
    return { status: "error", message: "Internal server error" };
  }
};
