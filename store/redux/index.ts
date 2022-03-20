// Add all redux slices to index.ts!
import { configureStore } from "@reduxjs/toolkit";
import foldSlice from "./fold-slice";
import filterSlice from "./filter-slice";
import plannerSlice from "./planner-slice";
import templateSlice from "./template-slice";

const store = configureStore({
	reducer: {
		fold: foldSlice.reducer,
		filter: filterSlice.reducer,
		planner: plannerSlice.reducer,
		template: templateSlice.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
