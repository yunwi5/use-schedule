import { createSlice } from "@reduxjs/toolkit";

const foldSlice = createSlice({
	name: "fold",
	initialState: {
		isFolded: false
	},
	reducers: {
		toggle (state) {
			state.isFolded = !state.isFolded;
		}
	}
});

export const foldActions = foldSlice.actions;

export default foldSlice;
