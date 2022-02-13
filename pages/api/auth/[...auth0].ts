import { handleAuth } from "@auth0/nextjs-auth0"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = handleAuth()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await handler(req, res)
};