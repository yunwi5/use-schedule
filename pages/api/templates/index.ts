import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { MongoClient, ObjectId } from 'mongodb';

import { connectDatabase } from '../../../db/mongodb-config';
import { getAllTemplates, insertTemplate } from '../../../db/template-util';
import { Template } from '../../../models/template-models/Template';
import { convertToTemplateArray } from '../../../utilities/template-utils/template-util';
import { validateTemplate } from '../../../schemas/validation';

type Data = {
    message: string;
    insertedId?: ObjectId;
    templates?: Template[];
};
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);
    if (!session) {
        return res.status(401).json({ message: 'User needs to login first to proceed.' });
    }
    const userId = session.user.sub;

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Connect to database did not work.' });
    }

    if (req.method === 'GET') {
        // Get all templates of the user.
        let result: any[],
            templates: Template[] = [],
            message: string;
        try {
            result = await getAllTemplates(client, userId);
            templates = convertToTemplateArray(result);
        } catch (err) {
            message =
                err instanceof Error ? err.message : 'GET all templates of user did not work.';
            client.close();
            return res.status(500).json({ message });
        }

        res.status(200).json({ message: 'GET all templates successful!', templates });
    } else if (req.method === 'POST') {
        const template = req.body;
        template.userId = userId;

        const { isValid, message } = validateTemplate(template);
        if (!isValid) {
            client.close();
            return res.status(415).json({ message });
        }

        let result;
        try {
            result = await insertTemplate(client, template);
        } catch (err) {
            console.error(err);
            client.close();
            return res.status(500).json({ message: 'inserting new template did not work.' });
        }
        res.status(201).json({
            message: 'Inserting new template successful!',
            insertedId: result.insertedId,
        });
    } else {
        return res.status(405).json({ message: 'Method is not allowed.' });
    }

    client.close();
}

export default handler;
