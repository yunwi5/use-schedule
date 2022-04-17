import React from "react";
import { isOverdue } from "../../../utilities/time-utils/date-check";

interface Props {
    bgClass: string;
    textClass: string;
    hoverBgClass: string;
    hoverTextClass: string;
    dueDate: Date | null | undefined;
    borderClass?: string;
    isCompleted?: boolean;
    onClick: () => void;
}

const CalendarItemCard: React.FC<Props> = (props) => {
    const {
        bgClass,
        textClass,
        hoverBgClass,
        hoverTextClass,
        borderClass,
        isCompleted,
        dueDate,
        onClick,
    } = props;

    const overdue = !isCompleted && isOverdue(dueDate);

    return (
        <div
            onClick={onClick}
            className={`max-w-8 px-2 py-1 rounded-md cursor-pointer ${borderClass || ""} ${
                isCompleted ? "line-through opacity-80" : ""
            } ${
                overdue
                    ? "border-2 border-rose-300 bg-white opacity-80 hover:opacity-100 hover:bg-rose-50 text-rose-500"
                    : `${bgClass} ${textClass} ${hoverBgClass} ${hoverTextClass}`
            } text-md`}
        >
            {props.children}
        </div>
    );
};

export default CalendarItemCard;
