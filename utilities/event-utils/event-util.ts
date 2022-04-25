import { Event } from "../../models/Event";

export function convertToEvent(data: any): Event {
    const eventId = data._id;
    delete data["_id"];
    const event: Event = { ...data, id: eventId };
    return event;
}

export function convertToEvents(dataArr: any[]) {
    return dataArr.map((data) => convertToEvent(data));
}
