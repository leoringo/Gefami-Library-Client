import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  IBorrowBookResponse,
  IGetAllBooksResponse,
} from "../../api/homeService/responseModel";
import { axiosBorrowBook, axiosGetAllBooks } from "../../api/homeService";
import { AxiosError } from "axios";
import type { GeneralResponseMessage } from "../../api/generalResponse";
import type { RootState } from "../../store/store";
import type { IBorrowBookRequest } from "../../api/homeService/requestModel";

interface LoginState {
  books: IGetAllBooksResponse[];
  message: string;
  isDeletedSuccess: boolean;
}

const initialState: LoginState = {
  books: [],
  message: "",
  isDeletedSuccess: false,
};

// Redux-thunk
export const getAllBooks = createAsyncThunk<IGetAllBooksResponse[], null>(
  "book/getBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosGetAllBooks();

      return response.data;
    } catch (err) {
      const error = err as AxiosError<GeneralResponseMessage>;
      return rejectWithValue({
        message: error.response?.data.message || "Unknown error",
        status: error.response?.status || 500,
      });
    }
  }
);

export const borrowBook = createAsyncThunk<
  IBorrowBookResponse,
  IBorrowBookRequest
>("book/borrow", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosBorrowBook(payload);

    dispatch(getAllBooks(null));
    return response.data;
  } catch (err) {
    const error = err as AxiosError<GeneralResponseMessage>;
    return rejectWithValue({
      message: error.response?.data?.message || "Unknown Error",
      status: error.response?.status || 500,
    });
  }
});

const homeSlicer = createSlice({
  name: "home",
  initialState,
  reducers: {
    closeSuccessDeletePopUp: (state) => {
      state.isDeletedSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.rejected, (state, action) => ({
        ...state,
        status: "failed",
        message: (action.payload as GeneralResponseMessage).message,
      }))
      .addCase(getAllBooks.pending, (state) => ({
        ...state,
        status: "idle",
      }))
      .addCase(getAllBooks.fulfilled, (state, action) => ({
        ...state,
        status: "success",
        books: action.payload,
      }));
    builder
      .addCase(borrowBook.rejected, (state, action) => {
        state.message = (action.payload as GeneralResponseMessage).message;
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.isDeletedSuccess = true;
        state.message = (action.payload as GeneralResponseMessage).message;
      });
  },
});

// -- Action
export const { closeSuccessDeletePopUp } = homeSlicer.actions;
export const selectHomeState = (state: RootState) => state.home;

export default homeSlicer.reducer;
