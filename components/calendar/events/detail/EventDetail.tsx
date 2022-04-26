import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek } from "@fortawesome/pro-duotone-svg-icons";

import { Event } from "../../../../models/Event";
import { Theme } from "../../../../models/design-models";
import {
    getDurationFormat,
    getEventDateTimeFormat,
} from "../../../../utilities/date-utils/date-format";
import Modal from "../../../ui/modal/Modal";
import ExitIcon from "../../../ui/icons/ExitIcon";
import Button from "../../../ui/Button";
import EventEdit from "../EventEdit";
import modalClasses from "../EventModal.module.scss";
import EmailLink from "../../../ui/EmailLink";

interface Props {
    onClose(): void;
    onInvalidate(): void;
    event: Event;
}

const googleMapBaseURL = "http://maps.google.com/maps?q=";

const EventDetail: React.FC<Props> = (props) => {
    const { onClose, onInvalidate, event } = props;
    const [showEditModal, setShowEditModal] = useState(false);

    const {
        name,
        description,
        dateTime,
        status,
        importance,
        duration,
        location,
        meetingLink,
        participants,
    } = event;

    const labelClass = "text-sky-600/75 font-semibold";
    const linkHoverClass = "hover:underline-offset-2 hover:underline";

    const numParticipants = participants ? participants.length : 0;

    const editEventHandler = () => {
        setShowEditModal(false);
        onInvalidate();
    };

    return (
        <>
            <Modal onClose={onClose} classes={`modal ${modalClasses.modal} !px-2`}>
                <article className="min-h-[27rem] relative flex flex-col gap-3 justify-between text-slate-600">
                    <h2
                        className={`text-3xl pb-2 border-b-2 border-sky-400/50 whitespace-nowrap overflow-hidden`}
                    >
                        <FontAwesomeIcon
                            icon={faCalendarWeek}
                            className="max-w-[1.8rem] max-h-[1.8rem] mr-1"
                        />{" "}
                        {name}
                    </h2>
                    <ExitIcon onClose={onClose} className={"!-translate-y-[2px]"} />
                    <div className="overflow-y-scroll overflow-x-hidden flex-1 flex flex-col gap-3 lg:px-3 text-lg">
                        <div className="flex flex-col">
                            <span className={`${labelClass}`}>Meeting Link</span>
                            <p>
                                <a
                                    href={meetingLink}
                                    className={`text-blue-500 ${linkHoverClass} whitespace-pre-line`}
                                >
                                    {meetingLink || "-"}
                                </a>
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <span className={`${labelClass}`}>Location</span>
                            <p>
                                <a
                                    className={`text-blue-500  ${linkHoverClass}`}
                                    href={`${googleMapBaseURL}${location}`}
                                >
                                    {location || "-"}
                                </a>
                            </p>
                        </div>

                        {participants && (
                            <div className="flex flex-col">
                                <span className={`${labelClass}`}>Participants</span>
                                <div className="flex flex-wrap gap-3">
                                    {participants.map((p, idx) => (
                                        <EmailLink
                                            key={idx}
                                            userName={p.name}
                                            email={p.email}
                                            subject={name}
                                            body={description}
                                            putComma={idx < numParticipants - 1}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className={`${labelClass}`}>Date Time</span>
                                <p>{getEventDateTimeFormat(dateTime)}</p>
                            </div>
                            <div className="flex flex-col w-[6.25rem] mr-[5.5rem]">
                                <span className={`${labelClass}`}>Duration</span>
                                <time>{getDurationFormat(duration)}</time>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span className={`${labelClass}`}>Status</span>
                                <p>{status}</p>
                            </div>
                            <div className="flex flex-col w-[6.25rem] mr-[5.5rem]">
                                <span className={`${labelClass}`}>Importance</span>
                                <time>{importance}</time>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className={`${labelClass}`}>Description</span>
                            <p>{description || "-"}</p>
                        </div>
                    </div>
                    <div className="mt-3 lg:px-3">
                        <Button onClick={() => setShowEditModal(true)} theme={Theme.SECONDARY}>
                            Edit
                        </Button>
                    </div>
                </article>
            </Modal>
            {showEditModal && (
                <EventEdit
                    onClose={() => setShowEditModal(false)}
                    onEditEvent={editEventHandler}
                    event={event}
                />
            )}
        </>
    );
};

export default EventDetail;
