import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemsView } from '../../models/ui-models';

const foldSlice = createSlice({
    name: 'fold',
    initialState: {
        isFolded: false,
        itemsView: ItemsView.LIST,
    },
    reducers: {
        toggleFold(state: any) {
            state.isFolded = !state.isFolded;
        },
        setView(state: any, action: PayloadAction<string>) {
            state.itemsView = action.payload;
        },
        toggleView(state: any) {
            state.itemsView = state.itemsView === ItemsView.LIST ? ItemsView.TABLE : ItemsView.LIST;
        },
    },
});

export const foldActions = foldSlice.actions;

export default foldSlice;
