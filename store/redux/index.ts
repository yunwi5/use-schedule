// Add all redux slices to index.ts!
import { configureStore } from "@reduxjs/toolkit";
import foldSlice from "./fold-slice";
import filterSlice from "./filter-slice";

const store = configureStore({
	reducer: { fold: foldSlice.reducer, filter: filterSlice.reducer }
});

export default store;
