import axios from 'axios';

const BASE_URL = '/api/events';

export function postEvent(event: NoIdEvent) {
    let message = '';
    try {
        const {data, status} = axios.post(BASE_URL, event);
        return {isSuccess: true, message: "Posting event successful!", insertedId: data.insertedId};
    } catch (err) {
        const message = err instanceof Error ? err.message : "Posting event did not work.";
    }
    return {isSuccess: false, message};
}