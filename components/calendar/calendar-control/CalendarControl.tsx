import React from "react";
import CalendarFilter from "./CalendarFilter";
import ItemCreate from "./ItemCreate";

interface Props {
    onInvalidate: () => void;
    beginningPeriod: Date;
}

const CalendarControl: React.FC<Props> = (props) => {
    const { onInvalidate, beginningPeriod } = props;

    return (
        <section className="xl:min-w-[10rem] pl-4 pr-3 -mt-[.3rem] flex flex-col gap-4">
            <ItemCreate onInvalidate={onInvalidate} beginningPeriod={beginningPeriod} />
            <CalendarFilter />
        </section>
    );
};

export default CalendarControl;
