import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IHistoryLoanResponse } from "../../api/historyService/responseModel";
import type {
  IGetHistoryLoanRequest,
  IReturnBookRequest,
} from "../../api/historyService/requestModel";
import type { AxiosError } from "axios";
import type { GeneralResponseMessage } from "../../api/generalResponse";
import { axiosGetHistoryLoan, axiosReturnBook } from "../../api/historyService";
import type { RootState } from "../../store/store";

interface HistoryState {
  loanList: IHistoryLoanResponse[];
  isSuccessReturn: boolean;
  message: string;
}

const initialState: HistoryState = {
  loanList: [],
  isSuccessReturn: false,
  message: "",
};

// Redux-thunk
export const getLoanList = createAsyncThunk<
  IHistoryLoanResponse[],
  IGetHistoryLoanRequest
>("book/getBooks", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosGetHistoryLoan(payload);

    return response.data;
  } catch (err) {
    const error = err as AxiosError<GeneralResponseMessage>;
    return rejectWithValue({
      message: error.response?.data.message || "Unknown error",
      status: error.response?.status || 500,
    });
  }
});

export const returnBook = createAsyncThunk<
  GeneralResponseMessage,
  IReturnBookRequest
>("book/returnBook", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosReturnBook(payload);
    dispatch(getLoanList({ returnType: "all" }));

    return response.data;
  } catch (err) {
    const error = err as AxiosError<GeneralResponseMessage>;
    return rejectWithValue({
      message: error.response?.data.message || "Unknown error",
      status: error.response?.status || 500,
    });
  }
});

const loanSlicer = createSlice({
  name: "loan",
  initialState,
  reducers: {
    closeSuccessReturnPopUp: (state) => {
      state.isSuccessReturn = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoanList.rejected, (state, action) => {
        state.message = (action.payload as GeneralResponseMessage).message;
      })
      .addCase(getLoanList.fulfilled, (state, action) => {
        state.loanList = action.payload;
      });
    builder.addCase(returnBook.fulfilled, (state, action) => {
      state.isSuccessReturn = true;
      state.message = action.payload.message;
    });
  },
});

// -- Action
export const { closeSuccessReturnPopUp } = loanSlicer.actions;
export const selectLoanListState = (state: RootState) => state.loan;

export default loanSlicer.reducer;
