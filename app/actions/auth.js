"use server";
import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { turso } from "./database";

export const register = async (name, email, password) => {
  const userResult = await turso.execute(
    "SELECT * FROM Users WHERE email = ?",
    [email]
  );
  if (userResult.rows.length > 0) {
    return { status: "error", message: "User already exists" };
  }
  try {
    const password_hash = await hash(password, 10);

    const newUserResult = await turso.execute(
      "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password_hash, "admin"]
    );
    const token = sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return { status: "success", data: newUserResult.rows };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error registering user" };
  }
};

export const login = async (email, password) => {
  const userResult = await turso.execute(
    "SELECT * FROM Users WHERE email = ?",
    [email]
  );
  if (userResult.rows.length === 0) {
    return { status: "error", message: "Invalid email or password" };
  }
  const user = userResult.rows[0];
  const valid = await compare(password, user.password);

  if (!valid) {
    return { status: "error", message: "Invalid email or password" };
  }
  try {
    const token = sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const cookieStore = cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    return { status: "success", data: { email: user.email, role: user.role } };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Error logging in" };
  }
};

export const logout = async () => {
  const cookieStore = cookies();
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    sameSite: "strict",
  });
};

export const updateUser = async (id, name, role) => {
  if (!id || !name) {
    throw new Error("Missing required fields");
  }

  const current_user = getUserOrgIdAndRole();
  const isCurrentUser = id === current_user.id;

  if (current_user.role === "admin") {
    try {
      const user = await turso.execute(
        "UPDATE Users SET name = ?, role = ? WHERE id = ?",
        [name, role, id]
      );
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating user");
    }
  }

  if (isCurrentUser && !role) {
    try {
      const user = await turso.execute(
        "UPDATE Users SET name = ? WHERE id = ?",
        [name, id]
      );
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error updating user");
    }
  }

  throw new Error("Unauthorized");
};

export const getUserById = async (id) => {
  if (!id) {
    throw new Error("Missing required fields");
  }
  try {
    const user = await turso.execute("SELECT * FROM Users WHERE id = ?", [id]);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user");
  }
};

export const getUserOrgIdAndRole = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    throw new Error("Missing required fields");
  }

  const { email } = verify(token, process.env.JWT_SECRET);
  if (!email) {
    throw new Error("Invalid token");
  }
  const user = await turso.execute(
    "SELECT organization_id, role FROM Users WHERE email = ?",
    [email]
  );
  return user;
};
