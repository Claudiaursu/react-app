import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "./counter.slice";
import { ideasSlice } from "./ideas.service";

export const store = configureStore({
  reducer: { 
    counterReducer, 
    [ideasSlice.reducerPath]: ideasSlice.reducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ideasSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;