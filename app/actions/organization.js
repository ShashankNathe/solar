import { turso } from "./database";

export const getOrganizations = async () => {
  const organizations = await turso.execute("SELECT * FROM Organizations");
  return organizations;
};

export const createOrganization = async (name, user_id) => {
  if (!name || !user_id) {
    throw new Error("Missing required fields");
  }
  try {
    const organization = await turso.execute("INSERT INTO Organizations (name, owner_id) VALUES (?, ?)", [name, user_id]);
    return organization;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating organization");
  }
};

export const updateOrganization = async (id, name) => {
  if (!id || !name) {
    throw new Error("Missing required fields");
  }
  try {
    const organization = await turso.execute("UPDATE Organizations SET name = ? WHERE id = ?", [name, id]);
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
    const organization = await turso.execute("SELECT * FROM Organizations WHERE id = ?", [id]);
    return organization;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting organization");
  }
};

export const getOrganizationUsers = async (id) => {
  if (!id) {
    throw new Error("Missing required fields");
  }
  try {
    const users = await turso.execute("SELECT id, name, email, role FROM Users WHERE organization_id = ?", [id]);
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting organization users");
  }
};

export const addUserToOrganization = async (user_id, org_id) => {
  if (!user_id || !org_id) {
    throw new Error("Missing required fields");
  }
  try {
    const user = await turso.execute("UPDATE Users SET organization_id = ? WHERE id = ?", [org_id, user_id]);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding user to organization");
  }
};
