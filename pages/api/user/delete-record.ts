import { NextApiRequest, NextApiResponse } from 'next/types';
import { deleteUserRecord } from '../../../db/delete_user_record';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    let { userId } = req.query;
    userId = Array.isArray(userId) ? userId.join('') : userId;

    if (!userId) {
        return res.status(404).json({ message: 'UserId to delete recored was not found' });
    }

    if (req.method === 'DELETE') {
        await deleteUserRecord(userId);

        res.status(200).json({ message: 'Deleting user record successful' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default handler;
