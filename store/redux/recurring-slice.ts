import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecurringItemMode } from '../../models/recurring-models';
import { RecurringEvent } from '../../models/recurring-models/RecurringEvent';
import { EventSort, SortingDirection, TaskSort } from '../../models/sorting-models';

export interface RecurringState {
    recurringEvents: RecurringEvent[];
    mode: RecurringItemMode;
    searchWord: string;
    eventSortingStandard: EventSort | null;
    sortingDirection: SortingDirection | null;

    // not yet implemented
    // recurringTasks: any[];
    // taskSortingStandard: TaskSort | null;
}

const initialState: RecurringState = {
    recurringEvents: [],
    mode: RecurringItemMode.EVENT,
    searchWord: '',
    eventSortingStandard: null,
    sortingDirection: null,
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
        setEventSortingStandard(state: RecurringState, action: PayloadAction<EventSort>) {
            state.eventSortingStandard = action.payload;
        },
        setSortingDirection(state: RecurringState, action: PayloadAction<SortingDirection>) {
            state.sortingDirection = action.payload;
        },
    },
});

export const recurringActions = recurringSlice.actions;

export default recurringSlice;
