import { configureStore, combineReducers } from "@reduxjs/toolkit";
import conceptReducer from "./conceptSlice";

// Combine all the slices together
const rootReducer = combineReducers({
  concept: conceptReducer,
});

// Create the store
const store = configureStore({
  reducer: rootReducer, // Directly pass the rootReducer here
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
