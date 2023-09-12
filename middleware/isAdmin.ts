import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "@auth0/nextjs-auth0";

async function isAdmin(
  req: IncomingMessage,
  res: ServerResponse
): Promise<boolean> {
  // Attempt to retrieve the user's session information using the getSession function.
  const session = await getSession(req, res);

  // Check if a session exists and if it contains user information.
  if (session && session.user) {
    // Extract the user object from the session.
    const user = session.user;

    // Check if the user has an "ADMIN" role in their roles array.
    if (user[process.env.AUTH0_API_URL + "roles"]?.includes("ADMIN")) {
      // If the user has an "ADMIN" role, return true, indicating they are an admin.
      return true;
    }
  }

  // If no valid session or "ADMIN" role is found, return false, indicating the user is not an admin.
  return false;
}

// Export the isAdmin function for use in other parts of the application.
export default isAdmin;
