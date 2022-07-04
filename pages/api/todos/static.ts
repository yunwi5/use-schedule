import { NextApiRequest, NextApiResponse } from 'next/types';
import { connectDatabase } from '../../../db/mongodb-config';
import { getAllTodoLists } from '../../../db/static-fetching';

type Data = { message: string } | string[];

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const client = await connectDatabase();

    if (req.method === 'GET') {
        try {
            const todoLists = await getAllTodoLists(client);
            const ids = todoLists.map((list) => list._id.toString());
            res.status(200).json(ids);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : 'Get all todo ids did not work.';
            client.close();
            res.status(200).json({ message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }

    client.close();
}

export default handler;
