import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarItemType } from "../../models/calendar-models/CalendarItemType";
import { CalendarMode } from "../../models/calendar-models/CalendarMode";
import {
    CalendarFilter,
    ImportanceFilter,
    ItemTypeFilter,
    StatusFilter,
} from "../../models/filter-models";
import { Importance, ImportanceList, Status, StatusList } from "../../models/task-models/Status";

const defaultStatusFilter: any = {};
StatusList.forEach((st) => {
    defaultStatusFilter[st] = true;
});

const defaultItemTypeFilter: ItemTypeFilter = {
    [CalendarItemType.Event]: true,
    [CalendarItemType.TASK]: true,
    [CalendarItemType.TODO]: true,
};

const defaultImportanceFilter: any = {};
ImportanceList.forEach((im) => {
    defaultImportanceFilter[im] = true;
});

export const defaultCalendarFilter: CalendarFilter = {
    statusFilter: defaultStatusFilter,
    importanceFilter: defaultImportanceFilter,
    itemTypeFilter: defaultItemTypeFilter,
};

interface CalendarState {
    calendarMode: CalendarMode;
    showSidebar: boolean; // right sidebar for creating item and filtering
    statusFilter: StatusFilter;
    importanceFilter: ImportanceFilter;
    itemTypeFilter: ItemTypeFilter;
}

const initialState: CalendarState = {
    calendarMode: CalendarMode.TABLE,
    showSidebar: true,
    statusFilter: defaultStatusFilter,
    importanceFilter: defaultImportanceFilter,
    itemTypeFilter: defaultItemTypeFilter,
};

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setCalendarMode(state, action: PayloadAction<CalendarMode>) {
            state.calendarMode = action.payload;
        },
        toggleSidebar(state) {
            state.showSidebar = !state.showSidebar;
        },
        toggleStatus(state, action: PayloadAction<Status>) {
            const targetStatus = action.payload;
            state.statusFilter[targetStatus] = !state.statusFilter[targetStatus];
        },
        toggleImportance(state, action: PayloadAction<Importance>) {
            const targetImportance = action.payload;
            state.importanceFilter[targetImportance] = !state.importanceFilter[targetImportance];
        },
        toggleItemType(state, action: PayloadAction<CalendarItemType>) {
            const targetItemType = action.payload;
            state.itemTypeFilter[targetItemType] = !state.itemTypeFilter[targetItemType];
        },
        setCalendarFilter(state, action: PayloadAction<CalendarFilter>) {
            const { statusFilter, importanceFilter, itemTypeFilter } = action.payload;
            state.statusFilter = statusFilter;
            state.importanceFilter = importanceFilter;
            state.itemTypeFilter = itemTypeFilter;
        },
        resetFilters(state) {
            state.statusFilter = defaultStatusFilter;
            state.importanceFilter = defaultImportanceFilter;
            state.itemTypeFilter = defaultItemTypeFilter;
        },
    },
});

export const calendarActions = calendarSlice.actions;

export default calendarSlice;
