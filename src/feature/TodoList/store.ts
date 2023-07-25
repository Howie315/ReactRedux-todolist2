import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// setting up the middleware with default settings for the development environment
export const store = configureStore({
	reducer: {
		todo: todoReducer,
	},
});

//the reducers are being imported from todoSlice.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export a hook that can be used with our new store
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
