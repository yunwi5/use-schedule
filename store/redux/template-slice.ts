import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TemplateState {
	templates: any[];
	updateCount: number;
}

const initialState: TemplateState = {
	templates: [],
	updateCount: 0
};

const templateSlice = createSlice({
	name: "template",
	initialState,
	reducers: {
		callUpdate (state) {
			state.updateCount++;
		},
		setTemplates (state, action: PayloadAction<any[]>) {
			state.templates = action.payload;
		},
		addTemplate (state, action: PayloadAction<any>) {
			const newTemplate = action.payload;
			state.templates.push(newTemplate);
		}
	}
});

export const templateActions = templateSlice.actions;

export default templateSlice;
