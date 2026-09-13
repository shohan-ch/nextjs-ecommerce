import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  count: number;
};

const initialState: TInitialState = {
  count: 0,
};

const countSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.count = state.count + 1;
    },

    decrement(state) {
      state.count = state.count - 1;
      // initialState.count = initialState.count - 1;
    },
  },
  selectors: {
    selectCount: (state) => state.count,
  },
});

export const { increment, decrement } = countSlice.actions;

export const { selectCount } = countSlice.selectors;

export default countSlice.reducer;
