import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/pro-solid-svg-icons";
import { faStar as faStarLight } from "@fortawesome/pro-light-svg-icons";

import { Todo, TodoProps } from "../../../models/todo-models/Todo";
import CheckToggler from "../../ui/icons/CheckToggler";
import TodoDuration from "./TodoDuration";
import TodoDateTime from "./TodoDateTime";
import classes from "./TodoDetail.module.scss";

interface Props {
    onMutateTodo: (id: string, todoProps: TodoProps) => void;
    todo: Todo;
    isEditing: boolean;
}

const iconClass = "max-w-[2rem] text-xl";

const TodoDetailInfo: React.FC<Props> = ({ todo, onMutateTodo, isEditing }) => {
    const [isImportant, setIsImportant] = useState<boolean>(todo.isImportant);
    const [isCompleted, setIsCompleted] = useState<boolean>(todo.isCompleted);
    const [dateTime, setDateTime] = useState<Date | null>(todo.dateTime || null);
    const [duration, setDuration] = useState<number>(todo.duration || 0);
    const [note, setNote] = useState<string>(todo.note || "");

    const defaultValue = ""; // displayed if the piece of information is null.

    const durationHandler = useCallback((newDur: number) => {
        if (newDur >= 0) setDuration(newDur);
    }, []);

    const dateTimeHandler = useCallback((newDateStr: string) => {
        if (!newDateStr) return;
        const newDate = new Date(`${newDateStr} 23:59:59`);
        setDateTime(newDate);
    }, []);

    const noteHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    }, []);

    const toggleImportance = () => {
        setIsImportant((prevState) => {
            const newState = !prevState;
            onMutateTodo(todo.id, { isImportant: newState });
            return newState;
        });
    };

    const toggleCompleted = () => {
        setIsCompleted((prevState) => {
            const newState = !prevState;
            onMutateTodo(todo.id, { isCompleted: newState });
            return newState;
        });
    };

    // Exception
    useEffect(() => {
        if (isEditing) return;
        // When the edit mode is turned off, send the request to update todo
        onMutateTodo(todo.id, {
            isImportant,
            isCompleted,
            dateTime: dateTime || undefined,
            duration,
            note,
        });
    }, [isEditing]);

    return (
        <div className={classes.grid}>
            <div className={`${classes.section} ${classes.importance}`}>
                <span>Importance</span>
                <FontAwesomeIcon
                    onClick={toggleImportance}
                    icon={isImportant ? faStarSolid : faStarLight}
                    className={`${iconClass} text-yellow-400 ${classes.icon}`}
                />
            </div>
            <div className={`${classes.section} ${classes.completion}`}>
                <span>Completed</span>
                <CheckToggler
                    onToggle={toggleCompleted}
                    isCompleted={isCompleted}
                    className={classes.check}
                />
            </div>
            <TodoDateTime onChange={dateTimeHandler} dateTime={dateTime} isEditing={isEditing} />
            <TodoDuration duration={duration} onChange={durationHandler} isEditing={isEditing} />

            <div className={`${classes.section} ${classes.note}`}>
                <label htmlFor="todo-note">Note</label>
                {!isEditing && <p className={classes.value}>{note ? note : defaultValue}</p>}
                {isEditing && (
                    <textarea id="todo-note" value={note} onChange={noteHandler} rows={3} />
                )}
            </div>
        </div>
    );
};

export default TodoDetailInfo;
