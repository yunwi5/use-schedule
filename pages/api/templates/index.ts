import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { MongoClient, ObjectId } from "mongodb";

import { connectDatabase } from "../../../utilities/mongodb-util/mongodb-util";
import { insertTemplate } from "../../../utilities/mongodb-util/template-util";

type Data =
	| {
			message: string;
		}
	| {
			message: string;
			insertedId: ObjectId;
		};

async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
	const session = getSession(req, res);
	if (!session) {
		return res.status(401).json({ message: "User needs to login first to proceed." });
	}
	const userId = session.user.sub;

	let client: MongoClient;
	try {
		client = await connectDatabase();
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Connect to database did not work." });
	}

	if (req.method === "GET") {
		// Get all templates of the user.
	} else if (req.method === "POST") {
		const template = req.body;
		template.userId = userId;
		let result;
		try {
			result = await insertTemplate(client, template);
		} catch (err) {
			console.error(err);
			client.close();
			return res.status(500).json({ message: "inserting new template did not work." });
		}
		res
			.status(201)
			.json({ message: "Inserting new template successful!", insertedId: result.insertedId });
	} else {
		return res.status(405).json({ message: "Method is not allowed." });
	}

	client.close();
}

export default handler;
