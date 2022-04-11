// Add all redux slices to index.ts!
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import foldSlice from './fold-slice';
import filterSlice from './filter-slice';
import plannerSlice from './planner-slice';
import templateSlice from './template-slice';

const store = configureStore({
	reducer: {
		fold: foldSlice.reducer,
		filter: filterSlice.reducer,
		planner: plannerSlice.reducer,
		template: templateSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

// TypeScript support for store type def
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed selector and dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
