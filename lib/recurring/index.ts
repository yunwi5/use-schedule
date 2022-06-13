import axios from 'axios';

const BASE_URL = '/api/recurring';

export async function callRecurringItemUpdate() {
    // userId would be stored in the session on the backend
    // no need to attach userId here
    try {
        const { data, status } = await axios.get<{ message: string }>(`${BASE_URL}/update`);
        if (status >= 300) throw new Error(data.message);
    } catch (err) {
        const message =
            err instanceof Error ? err.message : 'Updating recurring items did not work.';
        return { isSuccess: false, message };
    }
    return { isSuccess: true, message: 'Updating recurring items successful' };
}
