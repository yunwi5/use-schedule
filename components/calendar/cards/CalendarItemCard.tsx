import React from "react";
import { isOverdue } from "../../../utilities/date-utils/date-check";
import { getISOTimeFormat } from "../../../utilities/date-utils/date-format";

interface Props {
    bgClass: string;
    textClass: string;
    hoverBgClass: string;
    hoverTextClass: string;
    dateTime: Date | null;
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
        dateTime,
        dueDate,
        onClick,
    } = props;

    const overdue = !isCompleted && isOverdue(dueDate);

    if (!dateTime) {
        return <span />;
    }

    const timeFormat = getISOTimeFormat(dateTime);

    const clickHandler = (e: React.MouseEvent | React.TouchEvent) => {
        // e.stopPropagation();
        onClick();
    };

    return (
        <div
            onClick={clickHandler}
            className={`flex gap-1 max-w-[20rem] h-[33px] px-2 py-1 rounded-md cursor-pointer ${
                borderClass || ""
            } ${isCompleted ? "line-through opacity-80" : ""} ${
                overdue
                    ? "border-2 border-rose-300 bg-white opacity-80 hover:opacity-100 hover:bg-rose-50 text-rose-500"
                    : `${bgClass} ${textClass} ${hoverBgClass} ${hoverTextClass}`
            } text-md`}
        >
            <time className="inline-block font-semibold">{timeFormat}</time>
            <span className="inline-block whitespace-nowrap max-w-[90%] overflow-hidden">
                {props.children}
            </span>
        </div>
    );
};

export default CalendarItemCard;
