import React, { useReducer } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/pro-regular-svg-icons";
import {
    faAlarmClock,
    faCalendarDay,
    faCalendarWeek,
    faHourglass,
    faLocationDot,
    faMemoPad,
    faStarExclamation,
    faUsers,
    faVideo,
} from "@fortawesome/pro-duotone-svg-icons";

import { NoIdEvent, Event, Participant } from "../../../../models/Event";
import { Importance, ImportanceList, Status } from "../../../../models/task-models/Status";
import { Theme } from "../../../../models/design-models";
import { getISODateFormat, getISOTimeFormat } from "../../../../utilities/date-utils/date-format";
import { addDays } from "../../../../utilities/date-utils/date-control";
import Button from "../../../ui/buttons/Button";
import EventDurationInput from "./EventDurationInput";
import classes from "./EventForm.module.scss";
import ExitIcon from "../../../ui/icons/ExitIcon";

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

interface State {
    participants: Participant[];
}

enum ActionType {
    ADD = "add",
    DELETE = "delete",
    EDIT = "edit",
}

type Action =
    | {
          action: ActionType.ADD;
      }
    | { action: ActionType.EDIT; index: number; name?: string; email?: string }
    | { action: ActionType.DELETE; index: number };

function participantReducer(state: State, action: Action) {
    const newParts = [...state.participants];
    if (action.action === ActionType.ADD) {
        newParts.push({ name: "", email: "" });
    } else if (action.action === ActionType.EDIT) {
        const existingPart = state.participants[action.index];
        const partToEdit = { ...existingPart };
        partToEdit.name = action.name !== undefined ? action.name : existingPart.name;
        partToEdit.email = action.email !== undefined ? action.email : existingPart.email;
        newParts[action.index] = partToEdit;
    } else if (action.action === ActionType.DELETE) {
        newParts.splice(action.index, 1);
    }
    return { participants: newParts };
}

const initialState: State = {
    participants: [{ name: "", email: "" }],
};

interface Props {
    initialEvent?: Event;
    beginningPeriod: Date;
    onSubmit(event: NoIdEvent): void;
    onClose(): void;
    onDelete?: () => void;
}

function getInitialParticipantState(initialEvent?: Event): State {
    return initialEvent && initialEvent.participants
        ? { participants: initialEvent.participants }
        : initialState;
}

const EventForm: React.FC<Props> = (props) => {
    const { onSubmit, initialEvent, beginningPeriod, onClose, onDelete } = props;

    const userId = useUser().user?.sub;
    const [participantState, dispatchParticipant] = useReducer(
        participantReducer,
        getInitialParticipantState(initialEvent),
    );

    console.log(participantState);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EventFormValues>();

    const submitHandler = (data: EventFormValues) => {
        if (!userId) {
            alert("User is not found!");
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
        const duration = parseInt(durationHours + "") * 60 + parseInt(durationMinutes + "");

        const dateTime = new Date(
            `${date || beginningPeriod.toDateString()} ${
                time || getISOTimeFormat(beginningPeriod)
            }`,
        );

        const participants = participantState.participants.filter((p) => p.name && p.email);
        const newEvent: NoIdEvent = {
            name,
            duration,
            importance: importance as Importance,
            location,
            dateTime,
            meetingLink,
            description: description || "",
            participants,
            status: Status.OPEN,
            userId,
        };
        onSubmit(newEvent);
    };

    const addParticipantHandler = () => {
        dispatchParticipant({ action: ActionType.ADD });
    };
    const deleteParticipantHandler = (index: number) => {
        dispatchParticipant({ action: ActionType.DELETE, index });
    };
    const editParticipantHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        dispatchParticipant({ action: ActionType.EDIT, index, [e.target.name]: e.target.value });
    };

    const initialDateInput = initialEvent
        ? getISODateFormat(addDays(initialEvent.dateTime, -1))
        : getISODateFormat(addDays(beginningPeriod, -1));
    const intiialTimeInput = initialEvent
        ? getISOTimeFormat(initialEvent.dateTime)
        : getISOTimeFormat(beginningPeriod);

    const labelIconClass = `inline-block max-w-[1.3rem] max-h-[1.3rem] mr-2`;

    return (
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
            <h2 className={classes.heading}>{initialEvent ? "Edit Event" : "New Event"}</h2>
            <ExitIcon onClose={onClose} />
            <div className={classes.content}>
                <div
                    className={`${classes.section} ${
                        errors.name ? classes["invalid-section"] : ""
                    }`}
                >
                    <label htmlFor="name">
                        <FontAwesomeIcon icon={faCalendarWeek} className={labelIconClass} /> Title
                    </label>
                    <input
                        type="text"
                        id="name"
                        defaultValue={initialEvent?.name || ""}
                        {...register("name", {
                            required: "Title is required",
                            minLength: { value: 3, message: "Minimum 3 characters" },
                            maxLength: { value: 50, message: "Maximum 50 characters" },
                        })}
                    />
                    {errors.name && <p className={classes.error}>{errors.name.message}</p>}
                </div>
                <div className={`${classes.section}`}>
                    <label htmlFor="location">
                        <FontAwesomeIcon icon={faLocationDot} className={labelIconClass} />
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        defaultValue={initialEvent?.location}
                        {...register("location")}
                    />
                </div>
                <div className={`${classes.section}`}>
                    <label htmlFor="meeting-link" defaultValue="">
                        <FontAwesomeIcon icon={faVideo} className={labelIconClass} />
                        Meeting Link
                    </label>
                    <input
                        type="text"
                        id="meeting-link"
                        defaultValue={initialEvent?.meetingLink}
                        {...register("meetingLink")}
                    />
                </div>
                <div className={`${classes.section}`}>
                    <label className="flex">
                        <span className="mr-auto">
                            <FontAwesomeIcon icon={faUsers} className={labelIconClass} />
                            Participants
                        </span>
                        <button className="" type="button" onClick={addParticipantHandler}>
                            <FontAwesomeIcon icon={faPlus} className={`${labelIconClass} !mr-0`} />{" "}
                            New
                        </button>
                    </label>
                    {participantState.participants.map((p, idx) => (
                        <div key={idx} className={`flex justify-between items-center`}>
                            <input
                                type="text"
                                value={p.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    editParticipantHandler(e, idx)
                                }
                                name="name"
                                placeholder="Name"
                                className="w-[32%]"
                            />
                            <input
                                type="email"
                                value={p.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    editParticipantHandler(e, idx)
                                }
                                name="email"
                                placeholder="Email"
                                className="w-[62%]"
                            />
                            <FontAwesomeIcon
                                icon={faXmark}
                                onClick={deleteParticipantHandler.bind(null, idx)}
                                className={`text-pink-500 text-xl ${classes.icon}`}
                            />
                        </div>
                    ))}
                </div>
                <div className={`flex gap-10 items-center justify-between`}>
                    <div className={`${classes.section} w-[45%]`}>
                        <label htmlFor="date">
                            <FontAwesomeIcon icon={faCalendarDay} className={labelIconClass} />
                            Date
                        </label>
                        <input type="date" defaultValue={initialDateInput} {...register("date")} />
                    </div>
                    <div className={`${classes.section} w-[45%]`}>
                        <label htmlFor="time">
                            <FontAwesomeIcon icon={faAlarmClock} className={labelIconClass} />
                            Time
                        </label>
                        <input
                            type="time"
                            defaultValue={intiialTimeInput}
                            {...register("time", { required: "Time is requied" })}
                        />
                    </div>
                </div>
                <div className={`flex gap-10 justify-between`}>
                    <div className={`${classes.section} w-[45%]`}>
                        <label htmlFor="duration">
                            <FontAwesomeIcon icon={faHourglass} className={labelIconClass} />
                            Duration
                        </label>
                        {/* <input type="number" defaultValue={0} {...register("duration")} /> */}
                        <EventDurationInput
                            register={register}
                            errors={errors}
                            defaultDuration={initialEvent?.duration || 0}
                        />
                        {errors.durationHours && (
                            <p className={classes.error}>{errors.durationHours.message}</p>
                        )}
                        {errors.durationMinutes && (
                            <p className={`${classes.error} -mt-3`}>
                                {errors.durationMinutes.message}
                            </p>
                        )}
                    </div>
                    <div className={`${classes.section} w-[45%]`}>
                        <label htmlFor="importance">
                            <FontAwesomeIcon icon={faStarExclamation} className={labelIconClass} />
                            Importance
                        </label>
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
                    <label htmlFor="description">
                        <FontAwesomeIcon icon={faMemoPad} className={labelIconClass} />
                        Description
                    </label>
                    <textarea
                        id="description"
                        cols={30}
                        rows={3}
                        defaultValue={initialEvent?.description || ""}
                        {...register("description")}
                    />
                </div>
            </div>
            <div className={classes.action}>
                <Button type="submit" theme={Theme.TERTIARY} className={"!min-w-[8rem]"}>
                    Confirm
                </Button>
                {onDelete && (
                    <Button
                        type="button"
                        onClick={onDelete}
                        theme={Theme.DANGER}
                        className={"!min-w-[8rem]"}
                    >
                        Delete
                    </Button>
                )}
            </div>
        </form>
    );
};

export default EventForm;
