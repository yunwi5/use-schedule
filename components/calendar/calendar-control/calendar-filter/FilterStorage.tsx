import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/redux";
import { calendarActions, defaultCalendarFilter } from "../../../../store/redux/calendar-slice";

const FilterStorage: React.FC = () => {
    const dispatch = useAppDispatch();

    const { statusFilter, importanceFilter, itemTypeFilter } = useAppSelector(
        (state) => state.calendar,
    );

    useEffect(() => {
        const storedCalendarFilter = JSON.parse(
            localStorage.getItem("calendar-filter") || JSON.stringify(defaultCalendarFilter),
        );
        dispatch(calendarActions.setCalendarFilter(storedCalendarFilter));
    }, [dispatch]);

    useEffect(() => {
        const updatedCalendarFilter = { statusFilter, importanceFilter, itemTypeFilter };
        localStorage.setItem("calendar-filter", JSON.stringify(updatedCalendarFilter));
    }, [statusFilter, importanceFilter, itemTypeFilter]);

    return <span />;
};

export default FilterStorage;
