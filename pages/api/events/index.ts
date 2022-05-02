import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next/types";
import { getEvents, insertEvent } from "../../../db/event-util";
import { NoIdEvent, Event } from "../../../models/Event";
import { validateEvent } from "../../../schemas/validation";
import { convertToAppObjectList } from "../../../utilities/gen-utils/object-util";

type Data =
    | { message: string }
    | { message: string; insertedId: string }
    | { message: string; events: Event[] };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    if (!session || !userId) {
        return res.status(404).json({ message: "User not found" });
    }

    if (req.method === "POST") {
        const newEvent = req.body;

        const { isValid, message } = validateEvent(newEvent);
        console.log("newEvent:", newEvent);
        console.log(message);
        if (!isValid) {
            return res.status(400).json({ message });
        }

        let result;
        try {
            result = await insertEvent(newEvent);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Inserting event did not work.";
            return res.status(500).json({ message });
        }
        return res.status(201).json({
            message: "Inserting event successful",
            insertedId: result.insertedId.toString(),
        });
    } else if (req.method === "GET") {
        let events: Event[] = [];
        try {
            const result = await getEvents(userId);
            events = convertToAppObjectList(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Getting event did not work.";
            return res.status(500).json({ message });
        }
        return res.status(200).json({ message: "Getting events worked", events });
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}

export default handler;
