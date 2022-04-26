import axios from "axios";
import { EventProps, NoIdEvent } from "../../models/Event";

// axios.defaults.baseURL = "api/events";
const BASE_URL = "/api/events";

export async function postEvent(event: NoIdEvent) {
    let message = "";
    try {
        const {
            data: { message, insertedId },
            status,
        } = await axios.post<{ insertedId: string; message: string }>(BASE_URL, event);
        return {
            isSuccess: true,
            message,
            insertedId,
        };
    } catch (err) {
        message = err instanceof Error ? err.message : "Posting event did not work.";
    }
    return { isSuccess: false, message };
}

export async function apiRequestWrapper(func: Function) {
    let message = "";
    try {
        return await func();
    } catch (err) {
        message = err instanceof Error ? err.message : "Posting event did not work.";
    }
    return { isSuccess: false, message };
}

export async function patchEvent(eventId: string, eventProps: EventProps) {
    const {
        data: { message },
        status,
    } = await axios.patch<{ message: string }>(`${BASE_URL}/${eventId}`, eventProps);
    return {
        isSuccess: true,
        message,
    };
}

export async function patchEventWrapper(eventId: string, eventProps: EventProps) {
    return await apiRequestWrapper(() => patchEvent(eventId, eventProps));
}

// export async function patchEvent(eventProps: EventProps) {
//     let message = "";
//     try {
//         const {
//             data: { message },
//             status,
//         } = await axios.patch<{ message: string }>(BASE_URL, event);
//         return {
//             isSuccess: true,
//             message,
//         };
//     } catch (err) {
//         message = err instanceof Error ? err.message : "Posting event did not work.";
//     }
//     return { isSuccess: false, message };
// }

export async function deleteEvent(eventId: string) {
    let message = "";
    try {
        const {
            data: { message },
        } = await axios.delete<{ message: string }>(`${BASE_URL}/${eventId}`);
        return {
            isSuccess: true,
            message,
        };
    } catch (err) {
        message = err instanceof Error ? err.message : "Posting event did not work.";
    }
    return { isSuccess: false, message };
}
