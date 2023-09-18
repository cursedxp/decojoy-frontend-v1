import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

const accessTokenHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await getSession(req, res);
    console.log("session", session);
    if (!session || !session.accessToken) {
      return res
        .status(401)
        .json({ message: "Access token missing in session" });
    }

    res.json({ accessToken: session.accessToken });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading images:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
};

export default withApiAuthRequired(accessTokenHandler);
