import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next/types";
import { deleteEvent, updateEvent } from "../../../db/event-util";
import { EventProps } from "../../../models/Event";
import { validateEventProps } from "../../../schemas/validation";

type Data = { message: string };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);
    const userId = session?.user.sub;
    if (!session || !userId) {
        return res.status(404).json({ message: "User not found" });
    }

    const { eventId: initialId } = req.query;
    const eventId = Array.isArray(initialId) ? initialId.join("") : initialId;

    if (req.method === "PATCH") {
        const eventProps: EventProps = req.body;

        const { isValid, message } = validateEventProps(eventProps);
        if (!isValid) {
            return res.status(400).json({ message });
        }

        let result;
        try {
            result = await updateEvent(eventId, eventProps);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Updating event did not work.";
            return res.status(500).json({ message });
        }
        return res.status(200).json({ message: "Updating event successful" });
    } else if (req.method === "DELETE") {
        let result;
        try {
            result = await deleteEvent(eventId);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Deleting event did not work.";
            return res.status(500).json({ message });
        }
        return res.status(200).json({ message: "Deleting event successful" });
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}

export default handler;
