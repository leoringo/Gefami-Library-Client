import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface LoadingInterface {
  isLoading: boolean;
}

const initialState: LoadingInterface = {
  isLoading: false,
};

const globalLoading = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = globalLoading.actions;
export const selectIsLoading = (state: RootState) => state.globalLoading;
export default globalLoading.reducer;
