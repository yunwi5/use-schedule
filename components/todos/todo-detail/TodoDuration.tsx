import React, { useEffect, useState } from "react";
import { getDurationFormat } from "../../../utilities/time-utils/date-format";
import classes from "./TodoDetail.module.scss";

interface Props {
    duration: number;
    onChange: (newDuration: number) => void;
    isEditing: boolean;
}

const TodoDuration: React.FC<Props> = ({ duration, isEditing, onChange }) => {
    const [durationState, setDurationState] = useState({
        hour: Math.floor(duration / 60),
        minute: duration % 60,
    });

    const defaultValue = "";

    const durationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = +e.target.value;
        if (newValue < 0) return;
        setDurationState({ ...durationState, [e.target.name]: newValue });
    };

    useEffect(() => {
        const { hour, minute } = durationState;
        const newDuration = hour * 60 + minute;
        onChange(newDuration);
    }, [durationState, onChange]);

    return (
        <div className={`${classes.section} ${classes.duration}`}>
            <span>Duration</span>
            {!isEditing && (
                <p className={classes.value}>
                    {duration ? getDurationFormat(duration) : defaultValue}
                </p>
            )}
            {isEditing && (
                <div className={classes.numbers}>
                    <div className={classes.number}>
                        <input
                            name='hour'
                            type='number'
                            id='durationHours'
                            value={durationState.hour}
                            onChange={durationHandler}
                        />
                        <label htmlFor='durationHours'>h</label>
                    </div>
                    <div className={classes.number}>
                        <input
                            name='minute'
                            type='number'
                            id='durationMinutes'
                            value={durationState.minute}
                            onChange={durationHandler}
                        />
                        <label htmlFor='durationMinutes'>m</label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoDuration;
