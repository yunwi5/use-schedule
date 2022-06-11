import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';

import { NoIdEvent, IEvent, Participant } from '../../../../models/Event';
import { Importance, Status } from '../../../../models/task-models/Status';
import { getISODateFormat, getISOTimeFormat } from '../../../../utilities/date-utils/date-format';
import ExitIcon from '../../../ui/icons/ExitIcon';
import {
    EventButtons,
    EventParticipants,
    EventDurationInput,
    EventDateTimeInput,
    EventDescriptionInput,
    EventImportanceInput,
    EventLocationInput,
    EventMeetingLink,
    EventNameInput,
} from './form-parts';

import classes from './EventForm.module.scss';

export interface EventFormValues {
    name: string;
    date: string;
    time: string;
    durationHours: number;
    durationMinutes: number;

    importance: string;
    location: string;
    meetingLink: string;
    description: string;
}

interface Props {
    beginningPeriod: Date;
    onSubmit(event: NoIdEvent): void;
    onClose(): void;
    onDelete?: () => void;
    initialEvent?: IEvent;
    heading?: string;
}

const EventForm: React.FC<Props> = (props) => {
    const { onSubmit, initialEvent, beginningPeriod, heading, onClose, onDelete } = props;

    const userId = useUser().user?.sub;
    const [participants, setParticipants] = useState<Participant[]>(
        initialEvent?.participants ?? [],
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EventFormValues>();

    const submitHandler = (data: EventFormValues) => {
        if (!userId) {
            alert('User is not found!');
            return;
        }
        const {
            name,
            durationHours,
            durationMinutes,
            importance,
            location,
            meetingLink,
            description,
            date,
            time,
        } = data;
        const duration = parseInt(durationHours + '') * 60 + parseInt(durationMinutes + '');

        const dateTime = new Date(
            `${date || beginningPeriod.toDateString()} ${
                time || getISOTimeFormat(beginningPeriod)
            }`,
        );

        const newEvent: NoIdEvent = {
            name,
            duration,
            importance: importance as Importance,
            location,
            dateTime,
            meetingLink,
            description: description || '',
            participants,
            status: Status.OPEN,
            userId,
        };
        onSubmit(newEvent);
    };

    const headingText = heading || (initialEvent ? 'Edit Event' : 'New Event');

    return (
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
            <h2 className={classes.heading}>{headingText}</h2>
            <ExitIcon onClose={onClose} />
            <div className={classes.content}>
                <EventNameInput register={register} initialEvent={initialEvent} errors={errors} />
                <EventLocationInput register={register} initialEvent={initialEvent} />
                <EventMeetingLink register={register} initialEvent={initialEvent} />
                <EventParticipants initialEvent={initialEvent} onUpdate={setParticipants} />
                <EventDateTimeInput
                    register={register}
                    initialEvent={initialEvent}
                    beginningPeriod={beginningPeriod}
                />
                <div className={`flex gap-10 justify-between`}>
                    <EventDurationInput
                        register={register}
                        initialEvent={initialEvent}
                        errors={errors}
                    />
                    <EventImportanceInput register={register} initialEvent={initialEvent} />
                </div>
                <EventDescriptionInput register={register} initialEvent={initialEvent} />
            </div>
            <EventButtons onDelete={onDelete} />
        </form>
    );
};

export default EventForm;
