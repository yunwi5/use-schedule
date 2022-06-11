import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';

import { NoIdEvent, IEvent, Participant } from '../../../../models/Event';
import { Importance, Status } from '../../../../models/task-models/Status';
import { getISOTimeFormat } from '../../../../utilities/date-utils/date-format';

import ExitIcon from '../../../ui/icons/ExitIcon';
import {
    EventButtons,
    EventParticipants,
    EventDurationInput,
    EventDescriptionInput,
    EventImportanceInput,
    EventLocationInput,
    EventMeetingLink,
    EventNameInput,
    EventTimeInput,
} from '../../../calendar/events/form/form-parts';
import { addYears } from '../../../../utilities/date-utils/date-control';
import DynamicDateInput from './form-parts/DynamicDateInput';
import IntervalInput from './form-parts/IntervalInput';
import classes from './RecurringEventForm.module.scss';
import { NoIdRecurringEvent } from '../../../../models/recurring-models/RecurringEvent';
import { isRecurringInterval, RecurringInterval } from '../../../../models/recurring-models';

export interface RecurringEventFormValues {
    name: string;
    date: string;
    durationHours: number;
    durationMinutes: number;

    importance: string;
    location: string;
    meetingLink: string;
    description: string;

    // Extension properties for recurring items
    startDate: string;
    endDate: string;
    time: string;
    interval: string;
}

interface Props {
    beginningPeriod: Date;
    onSubmit(event: NoIdEvent): void;
    onClose(): void;
    onDelete?: () => void;
    initialEvent?: IEvent;
    heading?: string;
}

const RecurringEventForm: React.FC<Props> = (props) => {
    const { onSubmit, initialEvent, beginningPeriod, heading, onClose, onDelete } = props;

    const userId = useUser().user?.sub;
    const [participants, setParticipants] = useState<Participant[]>(
        initialEvent?.participants ?? [],
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RecurringEventFormValues>();

    const submitHandler = (data: RecurringEventFormValues) => {
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
            time,
            startDate: startDateStr,
            endDate: endDateStr,
            interval,
        } = data;
        const duration = parseInt(durationHours + '') * 60 + parseInt(durationMinutes + '');

        const startDate = new Date(
            `${startDateStr || beginningPeriod.toDateString()} ${
                time || getISOTimeFormat(beginningPeriod)
            }`,
        );

        const endDate = new Date(
            `${endDateStr || addYears(beginningPeriod, 1).toDateString()} ${time || '23:59'}`,
        );

        const validInterval = isRecurringInterval(interval)
            ? (interval as RecurringInterval)
            : RecurringInterval.WEEK;

        const newEvent: NoIdRecurringEvent = {
            name,
            startDate,
            interval: validInterval,
            endDate,
            duration,
            importance: importance as Importance,
            location,
            meetingLink,
            description: description || '',
            participants,
            userId,
            status: Status.OPEN,
            dateTime: startDate,
        };
        onSubmit(newEvent);
    };

    const headingText = heading || (initialEvent ? 'Edit Recurring Event' : 'New Recurring Event');

    return (
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
            <h2 className={classes.heading}>{headingText}</h2>
            <ExitIcon onClose={onClose} />
            <div className={classes.content}>
                <EventNameInput register={register} initialEvent={initialEvent} errors={errors} />
                <div className={'flex gap-5 lg:gap-10 justify-between'}>
                    <DynamicDateInput
                        register={register}
                        label="Start Date"
                        name="startDate"
                        defaultDate={beginningPeriod}
                    />
                    <EventTimeInput
                        register={register}
                        initialEvent={initialEvent}
                        beginningPeriod={beginningPeriod}
                    />
                </div>
                <div className={'flex gap-5 lg:gap-10 justify-between'}>
                    <DynamicDateInput
                        register={register}
                        label="End Date"
                        name="endDate"
                        defaultDate={addYears(beginningPeriod, 1)}
                    />
                    <IntervalInput register={register} />
                </div>
                <div className={`flex gap-5 lg:gap-10 justify-between`}>
                    <EventDurationInput
                        register={register}
                        initialEvent={initialEvent}
                        errors={errors}
                    />
                    <EventImportanceInput register={register} initialEvent={initialEvent} />
                </div>
                <EventLocationInput register={register} initialEvent={initialEvent} />
                <EventMeetingLink register={register} initialEvent={initialEvent} />
                <EventParticipants initialEvent={initialEvent} onUpdate={setParticipants} />
                <EventDescriptionInput register={register} initialEvent={initialEvent} />
            </div>
            <EventButtons onDelete={onDelete} />
        </form>
    );
};

export default RecurringEventForm;
