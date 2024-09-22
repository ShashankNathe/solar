"use server";
import { verify } from "jsonwebtoken";
import { turso } from "./database";
import { cookies } from "next/headers";
import { getUserOrgIdAndRole } from "./auth";

export const getOrganizations = async () => {
  const organizations = await turso.execute("SELECT * FROM Organizations");
  return organizations;
};

export const createOrganization = async (name) => {
  if (!name) {
    throw new Error("Missing required fields");
  }

  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return { status: "error", message: "Unauthorized" };
  }

  const decodedToken = verify(token.value, process.env.JWT_SECRET);
  const userEmail = decodedToken.email;

  const userResult = await turso.execute(
    "SELECT id FROM Users WHERE email = ?",
    [userEmail]
  );

  if (!userResult.rows || userResult.rows.length === 0) {
    return { status: "error", message: "User not found" };
  }

  const user_id = userResult.rows[0].id;
  try {
    const organization = await turso.execute(
      "INSERT INTO Organizations (name, owner_id) VALUES (?, ?)",
      [name, user_id]
    );
    await turso.execute("UPDATE Users SET organization_id = ? WHERE id = ?", [
      Number(organization.lastInsertRowid),
      user_id,
    ]);
    return { status: "success", data: Number(organization.lastInsertRowid) };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error creating organization" };
  }
};

export const updateOrganization = async (id, name) => {
  if (!id || !name) {
    throw new Error("Missing required fields");
  }
  try {
    const organization = await turso.execute(
      "UPDATE Organizations SET name = ? WHERE id = ?",
      [name, id]
    );
    return organization;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating organization");
  }
};

export const getOrganizationById = async (id) => {
  if (!id) {
    throw new Error("Missing required fields");
  }
  try {
    const organization = await turso.execute(
      "SELECT * FROM Organizations WHERE id = ?",
      [id]
    );
    return organization;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting organization");
  }
};

export const getOrganizationUsers = async () => {
  try {
    // Retrieve and verify token
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return {
        status: "error",
        message: "Unauthorized, token not found",
      };
    }

    const decodedToken = verify(token.value, process.env.JWT_SECRET);
    const userEmail = decodedToken.email;

    if (!userEmail) {
      return {
        status: "error",
        message: "Unauthorized, invalid token",
      };
    }

    // Get organization ID based on user's email or role
    const currentUser = await getUserOrgIdAndRole(userEmail);

    if (
      !currentUser ||
      !currentUser.data ||
      !currentUser.data[0] ||
      !currentUser.data[0].organization_id
    ) {
      return {
        status: "error",
        message: "Unauthorized, organization not found",
      };
    }

    const organization_id = currentUser.data[0].organization_id;

    // Fetch users for the organization
    const users = await turso.execute(
      "SELECT id, name, email, role FROM Users WHERE organization_id = ?",
      [organization_id]
    );

    if (users.rows.length === 0) {
      return {
        status: "error",
        message: "No users found for the given organization",
      };
    }

    return {
      status: "success",
      data: users.rows,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Error getting organization users",
    };
  }
};

export const addUserToOrganization = async (user_id, org_id) => {
  if (!user_id || !org_id) {
    throw new Error("Missing required fields");
  }
  try {
    const user = await turso.execute(
      "UPDATE Users SET organization_id = ? WHERE id = ?",
      [org_id, user_id]
    );
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding user to organization");
  }
};
