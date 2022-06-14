import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecurringItem, RecurringItemMode } from '../../models/recurring-models';
import { RecurringEvent } from '../../models/recurring-models/RecurringEvent';
import { EventSort, SortingDirection, TaskSort } from '../../models/sorting-models';

export interface RecurringState {
    recurringEvents: RecurringEvent[];
    mode: RecurringItemMode;
    searchWord: string;
    eventSortingStandard: EventSort | null;
    sortingDirection: SortingDirection | null;

    recurringTasks: RecurringItem[];
    taskSortingStandard: TaskSort | null;
    // not yet implemented
}

const initialState: RecurringState = {
    recurringEvents: [],
    mode: RecurringItemMode.EVENT,
    searchWord: '',
    eventSortingStandard: null,
    sortingDirection: null,

    recurringTasks: [],
    taskSortingStandard: null,
};

const recurringSlice = createSlice({
    name: 'recurring',
    initialState,
    reducers: {
        setRecurringEvents(state: RecurringState, action: PayloadAction<RecurringEvent[]>) {
            state.recurringEvents = action.payload;
        },
        setSearchWord(state: RecurringState, action: PayloadAction<string>) {
            state.searchWord = action.payload.trim();
        },
        setMode(state: RecurringState, action: PayloadAction<RecurringItemMode>) {
            state.mode = action.payload;
        },
        setSortingStandard(state: RecurringState, action: PayloadAction<string>) {
            if (state.mode === RecurringItemMode.EVENT) {
                state.eventSortingStandard = action.payload as EventSort;
            } else {
                state.taskSortingStandard = action.payload as TaskSort;
            }
        },
        setSortingDirection(state: RecurringState, action: PayloadAction<SortingDirection>) {
            state.sortingDirection = action.payload;
        },
    },
});

export const recurringActions = recurringSlice.actions;

export default recurringSlice;
