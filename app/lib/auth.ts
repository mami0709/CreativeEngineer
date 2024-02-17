import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { nextAuthOptions } from "../lib/next-auth/options";

export const getUserSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  return session?.user ?? null;
};
