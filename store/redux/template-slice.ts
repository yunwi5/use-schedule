import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Template } from "../../models/template-models/Template";

interface TemplateState {
	templates: Template[];
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
		setTemplates (state, action: PayloadAction<Template[]>) {
			state.templates = action.payload;
		},
		addTemplate (state, action: PayloadAction<Template>) {
			const newTemplate = action.payload;
			state.templates.push(newTemplate);
		}
	}
});

export const templateActions = templateSlice.actions;

export default templateSlice;
