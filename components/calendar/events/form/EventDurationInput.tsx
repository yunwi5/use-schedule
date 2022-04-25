import React from "react";
import { UseFormRegister } from "react-hook-form";
import { EventFormValues } from "./EventForm";

import classes from "./EventForm.module.scss";

interface Props {
    register: UseFormRegister<EventFormValues>;
    errors: any;
}

const EventDurationInput: React.FC<Props> = ({ register, errors }) => {
    return (
        <div className="flex items-center">
            <input
                type="number"
                id="duration-hours"
                className={`max-w-[42%] ${errors.durationHours ? classes["invalid-input"] : ""}`}
                defaultValue={0}
                {...register("durationHours", {
                    min: { value: 0, message: "Hours cannot be negative" },
                })}
            />
            <label className="ml-1 mr-[1rem]" htmlFor="duration-hours">
                h
            </label>
            <input
                type="number"
                id="duration-minutes"
                className={`max-w-[42%] ${errors.durationMinutes ? classes["invalid-input"] : ""}`}
                defaultValue={0}
                {...register("durationMinutes", {
                    min: { value: 0, message: "Minutes cannot be negative" },
                })}
            />
            <label className="ml-1" htmlFor="duration-minutes">
                m
            </label>
        </div>
    );
};

export default EventDurationInput;
