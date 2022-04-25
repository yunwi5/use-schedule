import React from "react";
import { NoIdEvent } from "../../../models/Event";
import Modal from "../../ui/modal/Modal";
import EventForm from "./form/EventForm";

import classes from "./EventModal.module.scss";

interface Props {
    onClose: () => void;
    onAddEvent: () => void;
    beginningPeriod: Date;
}

const EventAdd: React.FC<Props> = ({ onClose, onAddEvent, beginningPeriod }) => {
    const eventAddHandler = (newEvent: NoIdEvent) => {
        console.log("new event:", newEvent);
        postEvent(newEvent);
    };

    return (
        <Modal onClose={onClose} classes={`modal ${classes.modal}`}>
            <EventForm
                onSubmit={eventAddHandler}
                onClose={onClose}
                beginningPeriod={beginningPeriod}
            />
        </Modal>
    );
};

export default EventAdd;
