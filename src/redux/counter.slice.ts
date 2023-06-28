import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type CounterProps = {
  value: number;
  name: string;
};

const initialState: CounterProps = {
  value: 0,
  name: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    increseByAmount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { decrement, increment, increseByAmount } = counterSlice.actions;

export const selectCounterValue = (state: RootState) =>
  state.counterReducer.value;

export default counterSlice.reducer;