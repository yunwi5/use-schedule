import React from "react";
import { CalendarFilter, FilterStorage } from "./calendar-filter";
import ItemCreate from "./item-create/ItemCreate";

interface Props {
    onInvalidate: () => void;
    beginningPeriod: Date;
}

const CalendarControl: React.FC<Props> = (props) => {
    const { onInvalidate, beginningPeriod } = props;

    return (
        <>
            <section className="xl:min-w-[10rem] pr-3 -mt-[.3rem] flex flex-col gap-4">
                <ItemCreate onInvalidate={onInvalidate} beginningPeriod={beginningPeriod} />
                <CalendarFilter />
            </section>
            {/* Providing initial calendar filtering options that user has previously stored. */}
            <FilterStorage />
        </>
    );
};

export default CalendarControl;
