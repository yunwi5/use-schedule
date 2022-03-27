import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Template } from '../../models/template-models/Template';

interface TemplateState {
	templates: Template[];
	updateCount: number;
	currentActiveTemplate: Template | null;
}

const initialState: TemplateState = {
	templates: [],
	updateCount: 0,
	currentActiveTemplate: null
};

const templateSlice = createSlice({
	name: 'template',
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
		},
		setActiveTemplate (state, action: PayloadAction<Template | null>) {
			const activeTemp = action.payload;
			state.currentActiveTemplate = activeTemp;
		}
	}
});

export const templateActions = templateSlice.actions;

export default templateSlice;
