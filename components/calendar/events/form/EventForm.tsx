import React from "react";
import { faCoffee, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NoIdEvent, Event } from "../../../../models/Event";
import { useForm } from "react-hook-form";
import { faCalendarWeek } from "@fortawesome/pro-duotone-svg-icons";
import { Importance, ImportanceList, Status } from "../../../../models/task-models/Status";
import Button from "../../../ui/Button";
import { Theme } from "../../../../models/design-models";
import { getISODateFormat, getISOTimeFormat } from "../../../../utilities/date-utils/date-format";
import { addDays } from "../../../../utilities/date-utils/date-control";
import { useUser } from "@auth0/nextjs-auth0";
import EventDurationInput from "./EventDurationInput";
import classes from "./EventForm.module.scss";

interface Props {
    initialEvent?: Event;
    beginningPeriod: Date;
    onSubmit(event: NoIdEvent): void;
    onClose(): void;
}

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

const EventForm: React.FC<Props> = ({ onSubmit, initialEvent, beginningPeriod, onClose }) => {
    const userId = useUser().user?.sub;

    const {
        watch,
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<EventFormValues>();

    const submitHandler = (data: EventFormValues) => {
        if (!userId) {
            alert("User is not found!");
            return;
        }
        console.log("event data:", data);

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
        const duration = parseInt(durationHours + "") * 60 + parseInt(durationMinutes + "");

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
            description,
            status: Status.OPEN,
            userId,
        };

        onSubmit(newEvent);
    };

    const initialDateInput = initialEvent
        ? getISODateFormat(addDays(initialEvent.dateTime, -1))
        : getISODateFormat(addDays(beginningPeriod, -1));
    const intiialTimeInput = initialEvent
        ? getISOTimeFormat(initialEvent.dateTime)
        : getISOTimeFormat(beginningPeriod);

    return (
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
            <h2 className={classes.heading}>New Event</h2>
            <FontAwesomeIcon
                icon={faXmark}
                onClick={onClose}
                className={
                    "max-w-[1.8rem] absolute top-1 right-1 transition-all hover:scale-110 text-3xl cursor-pointer ab"
                }
            />
            <div className={`${classes.section} ${errors.name ? classes["invalid-section"] : ""}`}>
                <label htmlFor="name">
                    <FontAwesomeIcon icon={faCalendarWeek} /> Title
                </label>
                <input
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "Title is required",
                        minLength: { value: 3, message: "Minimum 3 characters" },
                        maxLength: { value: 50, message: "Maximum 50 characters" },
                    })}
                />
                {errors.name && <p className={classes.error}>{errors.name.message}</p>}
            </div>
            <div className={`flex gap-10 items-center justify-between`}>
                <div className={`${classes.section} w-[45%]`}>
                    <label htmlFor="date">Date</label>
                    <input type="date" defaultValue={initialDateInput} {...register("date")} />
                </div>
                <div className={`${classes.section} w-[45%]`}>
                    <label htmlFor="time">Time </label>
                    <input
                        type="time"
                        defaultValue={intiialTimeInput}
                        {...register("time", { required: "Time is requied" })}
                    />
                </div>
            </div>
            <div className={`${classes.section}`}>
                <label htmlFor="location" defaultValue="">
                    Location
                </label>
                <input type="text" id="location" {...register("location")} />
            </div>
            <div className={`${classes.section}`}>
                <label htmlFor="meeting-link" defaultValue="">
                    Meeting Link
                </label>
                <input type="text" id="meeting-link" {...register("meetingLink")} />
            </div>
            <div className={`flex gap-10 justify-between`}>
                <div className={`${classes.section} w-[45%]`}>
                    <label htmlFor="duration">Duration</label>
                    {/* <input type="number" defaultValue={0} {...register("duration")} /> */}
                    <EventDurationInput register={register} errors={errors} />
                    {errors.durationHours && (
                        <p className={classes.error}>{errors.durationHours.message}</p>
                    )}
                    {errors.durationMinutes && (
                        <p className={`${classes.error} -mt-3`}>{errors.durationMinutes.message}</p>
                    )}
                </div>
                <div className={`${classes.section} w-[45%]`}>
                    <label htmlFor="importance">Importance</label>
                    <select
                        id="importance"
                        defaultValue={Importance.IMPORTANT}
                        {...register("importance")}
                    >
                        {ImportanceList.map((imp) => (
                            <option key={imp} value={imp}>
                                {imp}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={`${classes.section}`}>
                <label htmlFor="description">Description</label>
                <textarea id="description" cols={30} rows={3} {...register("description")} />
            </div>
            <div className={classes.action}>
                <Button type="submit" theme={Theme.TERTIARY} className={"!min-w-[8rem]"}>
                    Confirm
                </Button>
            </div>
        </form>
    );
};

export default EventForm;
