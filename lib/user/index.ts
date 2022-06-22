import axios from 'axios';

const BASE_URL = '/api/user';

export async function deleteUserRecords(userId: string) {
    try {
        const { data } = await axios.delete<{ message: string }>(
            `${BASE_URL}/delete-record?userId=${userId}`,
        );
        return { isSuccess: true, message: data.message };
    } catch (err) {
        const message =
            err instanceof Error ? err.message : 'Deleting user record did not work.';
        return { isSuccess: false, message };
    }
}
