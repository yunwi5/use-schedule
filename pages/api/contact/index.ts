import { NextApiRequest, NextApiResponse } from "next";
import { insertUserContact } from "../../../db/user-contact";

type Data = { message: string };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        const contactObj = req.body;
        try {
            // const { insertedId } = await insertUserContact(contactObj);
            await insertUserContact(contactObj);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Submitting user contact did not work.";
            return res.status(500).json({ message });
        }
        res.status(201).json({ message: "Submitting user contact successful" });
    } else {
        res.status(405).json({ message: "Invalid request method" });
    }
}
export default handler;
