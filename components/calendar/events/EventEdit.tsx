import React, { useState } from "react";
import useNotification from "../../../hooks/useNotification";
import Modal from "../../ui/modal/Modal";
import { Event, NoIdEvent } from "../../../models/Event";
import classes from "./EventModal.module.scss";
import EventForm from "./form/EventForm";
import { deleteEvent, patchEvent } from "../../../lib/events/event-apis";
import { NotifStatus } from "../../ui/Notification";
import DeleteModal from "../../ui/modal/modal-variation/DeleteModal";

interface Props {
    onClose: () => void;
    onEditEvent: () => void;
    event: Event;
}

const EventEdit: React.FC<Props> = ({ onClose, onEditEvent, event }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { setNotification } = useNotification();

    const eventEditHandler = async (editedEvent: NoIdEvent) => {
        // Send HTTP PATCH request with given event id
        setNotification(NotifStatus.PENDING, "Updating event...");
        const { isSuccess, message } = await patchEvent(event.id, editedEvent);
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, message);
            onClose();
            onEditEvent();
        } else {
            setNotification(NotifStatus.ERROR, message);
        }
    };

    const eventDeleteHandler = async () => {
        // send HTTP DELETE request
        const { isSuccess, message } = await deleteEvent(event.id);
        setNotification(NotifStatus.PENDING, "Deleting Event...");
        if (isSuccess) {
            setNotification(NotifStatus.SUCCESS, message);
            onClose();
            onEditEvent(); // query invalidation
        } else {
            setNotification(NotifStatus.ERROR, message);
        }

        isSuccess
            ? setNotification(NotifStatus.SUCCESS, message)
            : setNotification(NotifStatus.ERROR, message);
    };

    return (
        <>
            <Modal onClose={onClose} classes={`modal ${classes.modal}`}>
                <EventForm
                    onSubmit={eventEditHandler}
                    onClose={onClose}
                    beginningPeriod={event.dateTime}
                    initialEvent={event}
                    onDelete={() => setShowDeleteModal(true)}
                />
            </Modal>
            {showDeleteModal && (
                <DeleteModal
                    targetName={event.name}
                    onAction={eventDeleteHandler}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </>
    );
};

export default EventEdit;
