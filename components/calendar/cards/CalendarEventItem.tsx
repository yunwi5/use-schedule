import React, { useState } from "react";
import { Event } from "../../../models/Event";
import { Status } from "../../../models/task-models/Status";
import CalendarItemCard from "./CalendarItemCard";

interface Props {
    event: Event;
    beginningPeriod: Date;
    onInvalidate(): void;
}

const CalendarEventItem: React.FC<Props> = (props) => {
    const { event, beginningPeriod, onInvalidate } = props;

    //TODO: need to be implemented.
    const [showDetail, setShowDetail] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    return (
        <>
            <CalendarItemCard
                bgClass={`bg-blue-100`}
                textClass={`text-blue-700`}
                hoverBgClass={`hover:bg-blue-500`}
                hoverTextClass={`hover:text-blue-50`}
                dateTime={event.dateTime}
                isCompleted={event.status === Status.COMPLETED}
                dueDate={event.dateTime}
                onClick={setShowDetail.bind(null, true)}
            >
                {event.name}
            </CalendarItemCard>
        </>
    );
};

export default CalendarEventItem;
