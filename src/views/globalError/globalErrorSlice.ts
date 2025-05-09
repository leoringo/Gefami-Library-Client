import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GlobalErrorState {
  open: boolean;
  message: string;
}

const initialState: GlobalErrorState = {
  open: false,
  message: "",
};

const globalErrorSlice = createSlice({
  name: "globalError",
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.message = action.payload;
    },
    closeError: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showError, closeError } = globalErrorSlice.actions;
export default globalErrorSlice.reducer;
