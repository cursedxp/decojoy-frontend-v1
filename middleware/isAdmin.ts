import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "@auth0/nextjs-auth0";

async function isAdmin(
  req: IncomingMessage,
  res: ServerResponse
): Promise<boolean> {
  const session = await getSession(req, res);
  if (session && session.user) {
    const user = session.user;
    if (user[process.env.AUTH0_API_URL + "roles"]?.includes("ADMIN")) {
      return true;
    }
  }
  return false;
}

export default isAdmin;
