import React from "react";
import CalendarFilter from "./CalendarFilter";
import ItemCreate from "./ItemCreate";

interface Props {
    onInvalidate: () => void;
}

const CalendarControl: React.FC<Props> = (props) => {
    const { onInvalidate } = props;

    return (
        <section className="flex flex-col gap-3">
            CalendarControl
            <ItemCreate />
            <CalendarFilter />
        </section>
    );
};

export default CalendarControl;
