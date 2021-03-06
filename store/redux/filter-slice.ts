import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    searchWord: string;
    filterTarget: string | null;
    mainFilter: string | null;
    subFilter: string | null;
}

const initialState: FilterState = {
    searchWord: '',
    filterTarget: null,
    mainFilter: null,
    subFilter: null,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        updateSearchWord(state: any, action: PayloadAction<string>) {
            const newSearchWord: string = action.payload;
            state.searchWord = newSearchWord;
        },
        updateFilterTarget(state: any, action: PayloadAction<string | null>) {
            const newTarget = action.payload;
            state.filterTarget = newTarget;
        },
        updateMainFilter(state: any, action: PayloadAction<string | null>) {
            const newMainFilter = action.payload;
            state.mainFilter = newMainFilter;
        },
        updateSubFilter(state: any, action: PayloadAction<string | null>) {
            const newSubFilter = action.payload;
            state.subFilter = newSubFilter;
        },
        clearFilters(state: any) {
            state.filterTarget = null;
            state.mainFilter = null;
            state.subFilter = null;
        },
    },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
