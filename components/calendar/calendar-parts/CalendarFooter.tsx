import { faQuoteLeft } from "@fortawesome/pro-duotone-svg-icons";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CalendarFooter: React.FC = () => {
    const colorIndicator = "ml-1 w-[9px] h-[9px] -translate-y-[2px]";

    return (
        <div className="mt-4">
            <div className="flex gap-2">
                <FontAwesomeIcon icon={faQuoteLeft} className="icon mt-1" />
                <p className="">
                    Calendar item colors are based on item type. Event item is colored with{" "}
                    <FontAwesomeIcon icon={faCircle} className={`${colorIndicator} text-sky-500`} />{" "}
                    sky blue, task item is colored with{" "}
                    <FontAwesomeIcon
                        icon={faCircle}
                        className={`${colorIndicator} text-blue-500`}
                    />{" "}
                    blue, and custom todo item is colored with{" "}
                    <FontAwesomeIcon
                        icon={faCircle}
                        className={`${colorIndicator} text-indigo-500`}
                    />{" "}
                    indigo by default.
                </p>
            </div>
            <div className="flex gap-2 mt-2">
                <FontAwesomeIcon icon={faQuoteLeft} className="icon mt-1" />
                <p>
                    Overdue items are colored with{" "}
                    <FontAwesomeIcon
                        icon={faCircle}
                        className={`${colorIndicator} text-rose-500`}
                    />{" "}
                    rose (red) regardless of the item type. You need to mark it as completed in
                    order to remove it.
                </p>
            </div>
        </div>
    );
};

export default CalendarFooter;
