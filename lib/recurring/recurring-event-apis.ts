import axios from 'axios';
import {
    NoIdRecurringEvent,
    RecurringEventProps,
} from '../../models/recurring-models/RecurringEvent';

const BASE_URL = '/api/recurring/events';

export async function postRecurringEvent(event: NoIdRecurringEvent) {
    let message = '';
    try {
        const {
            data: { message, insertedId },
        } = await axios.post<{ insertedId: string; message: string }>(BASE_URL, event);
        return {
            isSuccess: true,
            message,
            insertedId,
        };
    } catch (err) {
        message = err instanceof Error ? err.message : 'Posting event did not work.';
    }
    return { isSuccess: false, message };
}

export async function patchRecurringEvent(recurringId: string, eventProps: RecurringEventProps) {
    const {
        data: { message },
    } = await axios.patch<{ message: string }>(`${BASE_URL}/${recurringId}`, eventProps);
    return {
        isSuccess: true,
        message,
    };
}

export async function deleteRecurringEvent(eventId: string) {
    let message = '';
    try {
        const {
            data: { message },
        } = await axios.delete<{ message: string }>(`${BASE_URL}/${eventId}`);
        return {
            isSuccess: true,
            message,
        };
    } catch (err) {
        message = err instanceof Error ? err.message : 'Deleting recurring event did not work.';
    }
    return { isSuccess: false, message };
}
