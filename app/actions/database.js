import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function getBlogs(limit) {
  try {
    const query = limit
      ? `SELECT id, title, description, status, slug, created_at, updated_at FROM blogs ORDER BY created_at DESC LIMIT ${Math.max(parseInt(limit, 10), 1)}`
      : `SELECT id, title, description, status, slug, created_at, updated_at FROM blogs ORDER BY created_at DESC`;

    const response = await turso.execute(query);

    if (response.error) {
      console.log("Error getting blogs:", response.error);
      return [];
    }

    if (response.rows && response.rows.length > 0) {
      return response.rows;
    }
    console.log("Error getting blogs: No rows returned");
    return [];
  } catch (error) {
    console.log("Error getting blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug) {
  try {
    const query = "SELECT * FROM blogs WHERE slug = ?";
    const response = await turso.execute(query, [slug]);

    if (response.error) {
      console.log("Error getting blog by slug:", response.error);
      return null;
    }

    if (response.rows && response.rows.length > 0) {
      return response.rows[0]; // Return the first matching blog
    }

    console.log("Error getting blog by slug: No rows returned");
    return null;
  } catch (error) {
    console.log("Error getting blog by slug:", error);
    return null;
  }
}
