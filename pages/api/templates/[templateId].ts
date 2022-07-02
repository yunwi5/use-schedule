import { getSession } from '@auth0/nextjs-auth0';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { Template } from '../../../models/template-models/Template';
import { validateTemplateProps } from '../../../schemas/validation';
import { connectDatabase } from '../../../db/mongodb-config';
import {
    deleteTemplateById,
    getTemplateById,
    updateTemplateById,
} from '../../../db/template-util';
import { convertToTemplate } from '../../../utilities/template-utils/template-util';

type Data = { message: string } | { message: string; template: Template };

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = getSession(req, res);
    if (!session) {
        return res.status(401).json({ message: 'You are unauthorized for this action.' });
    }

    const user = session.user.sub;

    let client: MongoClient;
    try {
        client = await connectDatabase();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Connecting to database did not work.' });
    }

    const { templateId: initialId } = req.query;
    const templateId = Array.isArray(initialId) ? initialId.join('') : initialId;

    if (req.method === 'GET') {
        let result, template: Template;
        try {
            result = await getTemplateById(client, templateId);
            template = convertToTemplate(result);
        } catch (err) {
            console.error(err);
            client.close();
            return res
                .status(500)
                .json({ message: 'GET template from database did not work.' });
        }
        res.status(200).json({ message: 'GET template successful!', template });
    } else if (req.method === 'PATCH') {
        const newTemplateProps = req.body;
        delete newTemplateProps['id'];

        const { isValid, message } = validateTemplateProps(newTemplateProps);
        if (!isValid) {
            client.close();
            return res.status(415).json({ message });
        }

        let result;
        try {
            result = await updateTemplateById(client, templateId, newTemplateProps);
        } catch (err) {
            console.error(err);
            client.close();
            return res
                .status(500)
                .json({ message: 'PATCH template to database did not work.' });
        }

        res.status(200).json({ message: 'PATCH template successful!' });
    } else if (req.method === 'DELETE') {
        let result, message;
        try {
            result = await deleteTemplateById(client, templateId);
        } catch (err) {
            message = err instanceof Error ? err.message : 'DELETE template did not work.';
            console.log(message);
        }
        res.status(200).json({ message: 'Delete template successful!' });
    } else {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    client.close();
}

export default handler;
