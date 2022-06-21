import React, { useRef, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useForm } from 'react-hook-form';

import { IEvent, NoIdEvent, Participant } from '../../../../models/Event';
import { Importance, Status } from '../../../../models/task-models/Status';
import { getISOTimeFormat } from '../../../../utilities/date-utils/date-format';

import ExitIcon from '../../../ui/icons/ExitIcon';
import {
    EventParticipants,
    EventMeetingLink,
    EventLocationInput,
} from '../../../calendar/events/form/form-parts';
import { addYears } from '../../../../utilities/date-utils/date-control';
import IntervalInput from './form-parts/IntervalInput';
import {
    NoIdRecurringEvent,
    RecurringEvent,
} from '../../../../models/recurring-models/RecurringEvent';
import { isRecurringInterval, RecurringInterval } from '../../../../models/recurring-models';
import classes from './RecurringForm.module.scss';
import DynamicDateInput from '../../../ui/input/form-inputs/DynamicDateInput';
import TimeInput from '../../../ui/input/form-inputs/TimeInput';
import DurationInput from '../../../ui/input/form-inputs/DurationInput';
import ImportanceInput from '../../../ui/input/form-inputs/ImportanceInput';
import DescriptionInput from '../../../ui/input/form-inputs/DescriptionInput';
import ActionButtons from '../../../ui/input/form-inputs/ActionButtons';
import NameInput from '../../../ui/input/form-inputs/NameInput';
import IntervalPreDisplay from './form-parts/IntervalPreDisplay';
import { ParticipantsRef } from '../../../calendar/events/form/form-parts/EventParticipants';
import { adjustParticipantsInput } from '../../../../utilities/event-utils/event-util';

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
    initialEvent?: IEvent | RecurringEvent;
    heading?: string;
    isEdit?: boolean;
}

const RecurringEventForm: React.FC<Props> = (props) => {
    const { onSubmit, initialEvent, beginningPeriod, heading, onClose, onDelete, isEdit } = props;

    const userId = useUser().user?.sub;

    const participantsRef = useRef<ParticipantsRef>(null);

    const {
        register,
        handleSubmit,
        watch,
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

        const participants = adjustParticipantsInput(participantsRef.current?.getParticipants());

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

    watch().startDate;
    watch().interval;

    const headingText = heading || (isEdit ? 'Edit Recurring Event' : 'New Recurring Event');

    return (
        <form
            className={`${classes.form} ${classes['event-form']}`}
            onSubmit={handleSubmit(submitHandler)}
        >
            <h2 className={classes.heading}>{headingText}</h2>
            <ExitIcon onClose={onClose} />
            <div className={classes.content}>
                <NameInput register={register} initialItem={initialEvent} errors={errors} />
                <div className={'flex flex-wrap gap-5 lg:gap-10 justify-between'}>
                    <DynamicDateInput
                        register={register}
                        label="Start Date"
                        name="startDate"
                        disabled={!!isEdit}
                        defaultDate={beginningPeriod}
                    />
                    <TimeInput
                        register={register}
                        initialItem={initialEvent}
                        beginningPeriod={beginningPeriod}
                        className="event"
                    />
                </div>
                <div className={'flex gap-5 lg:gap-10 justify-between'}>
                    <IntervalInput
                        register={register}
                        disabled={!!isEdit}
                        initialItem={initialEvent}
                    />
                    <DynamicDateInput
                        register={register}
                        label="End Date"
                        name="endDate"
                        defaultDate={addYears(beginningPeriod, 1)}
                    />
                </div>

                <div className={`flex gap-5 lg:gap-10 justify-between`}>
                    <DurationInput
                        register={register}
                        initialItem={initialEvent}
                        errors={errors}
                        className="event"
                    />
                    <ImportanceInput
                        register={register}
                        initialItem={initialEvent}
                        className="event"
                    />
                </div>
                <EventLocationInput register={register} initialEvent={initialEvent} />
                <EventMeetingLink register={register} initialEvent={initialEvent} />
                <EventParticipants initialEvent={initialEvent} ref={participantsRef} />
                <DescriptionInput
                    register={register}
                    initialItem={initialEvent}
                    className="event"
                />
            </div>
            <div className={'flex -mt-[0.7rem]'}>
                <IntervalPreDisplay watch={watch} itemName="event" />
            </div>
            <ActionButtons onDelete={onDelete} />
        </form>
    );
};

export default RecurringEventForm;
