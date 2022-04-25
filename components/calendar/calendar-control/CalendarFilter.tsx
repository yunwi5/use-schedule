import React from "react";
import {
    CalendarItemType,
    CalendarItemTypeList,
    isCalendarItemType,
} from "../../../models/calendar-models/CalendarItemType";
import {
    Importance,
    ImportanceList,
    isImportance,
    isStatus,
    Status,
    StatusList,
} from "../../../models/task-models/Status";
import { useAppDispatch, useAppSelector } from "../../../store/redux";
import { calendarActions } from "../../../store/redux/calendar-slice";
import FilterSection from "./FilterSection";

const CalendarFilter: React.FC = () => {
    const { statusFilter, importanceFilter, itemTypeFilter } = useAppSelector(
        (state) => state.calendar,
    );

    const dispatch = useAppDispatch();

    const toggleStatusHandler = (status: string) => {
        if (isStatus(status)) dispatch(calendarActions.toggleStatus(status as Status));
    };

    const toggleImportanceHandler = (imp: string) => {
        if (isImportance(imp)) dispatch(calendarActions.toggleImportance(imp as Importance));
    };

    const toggleItemTypeHandler = (itemType: string) => {
        if (isCalendarItemType(itemType))
            dispatch(calendarActions.toggleItemType(itemType as CalendarItemType));
    };

    // console.log("StausFilter:", statusFilter);

    return (
        <div className="p-2 xl:px-5 flex flex-col gap-4 border-t-2 border-slate-300">
            {/* Status Filter Section */}
            <FilterSection
                filterName={"Status"}
                filterList={StatusList}
                onToggleItem={toggleStatusHandler}
                onCheck={(status: string) =>
                    isStatus(status) ? statusFilter[status as Status] : false
                }
            />
            <FilterSection
                filterName={"Importance"}
                filterList={ImportanceList}
                onToggleItem={toggleImportanceHandler}
                onCheck={(imp: string) =>
                    isImportance(imp) ? importanceFilter[imp as Importance] : false
                }
            />
            <FilterSection
                filterName={"Categories"}
                filterList={CalendarItemTypeList}
                onToggleItem={toggleItemTypeHandler}
                onCheck={(type: string) =>
                    isCalendarItemType(type) ? itemTypeFilter[type as CalendarItemType] : false
                }
            />
        </div>
    );
};

export default CalendarFilter;
