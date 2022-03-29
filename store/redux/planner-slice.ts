import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlannerMode } from '../../models/planner-models/PlannerMode';

interface PlannerState {
	plannerMode: PlannerMode | null;
	beginningPeriod: string | null;
}

const initialState: PlannerState = {
	plannerMode: null,
	beginningPeriod: null,
};

// This slice should control PlannerMode, beginningPeriod
// More states and reducers can be added.
const plannerSlice = createSlice({
	name: 'planner',
	initialState,
	reducers: {
		setPlannerMode (state, action: PayloadAction<PlannerMode>) {
			const newMode = action.payload;
			if (!newMode) throw new Error('New planner mode is null!');
			state.plannerMode = action.payload;
		},
		// It has bugs. Don't use it for now.
		setBeginningPeriod (state, action: PayloadAction<string | null>) {
			const newDate = action.payload;
			state.beginningPeriod = newDate;
		},
	},
});

export const plannerActions = plannerSlice.actions;

export default plannerSlice;
