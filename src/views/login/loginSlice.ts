import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { RootState } from "../../store/store";
import type { AxiosError } from "axios";
import type {
  ILoginResponse,
  IRegisterResponse,
} from "../../api/loginService/responseModel";
import type {
  ILoginRequest,
  IRegisterRequest,
} from "../../api/loginService/requestModel";
import type { GeneralResponseMessage } from "../../api/generalResponse";

import { axiosLogin, axiosRegister } from "../../api/loginService";

interface LoginState {
  page: "login" | "register";
  status: "failed" | "idle" | "success";
  message: string;
}

const initialState: LoginState = {
  page: "login",
  status: "idle",
  message: "",
};

// Redux-thunk
export const executeLogin = createAsyncThunk<ILoginResponse, ILoginRequest>(
  "login/executeLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosLogin(payload);
      // console.log(response, `<< response`);

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

export const executeRegister = createAsyncThunk<
  IRegisterResponse,
  IRegisterRequest
>("login/executeRegister", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosRegister(payload);

    return response.data;
  } catch (err) {
    const error = err as AxiosError<GeneralResponseMessage>;
    return rejectWithValue({
      message: error.response?.data.message || "Unknown error",
      status: error.response?.status || 500,
    });
  }
});

const LoginSlicer = createSlice({
  name: "login",
  initialState,
  reducers: {
    switchPage: (state, action: PayloadAction<"login" | "register">) => {
      state.page = action.payload;
      state.status = "idle";
      state.message = "";
    },
    closePopUpError: (state) => {
      state.status = "idle";
      state.message = "";
    },
    closeSuccessRegister: (state) => {
      state.status = "idle";
      state.message = "";
      state.page = "login";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeLogin.rejected, (state, action) => ({
        ...state,
        status: "failed",
        message: (action.payload as GeneralResponseMessage).message,
      }))
      .addCase(executeLogin.pending, (state) => ({
        ...state,
        status: "idle",
      }))
      .addCase(executeLogin.fulfilled, (state) => ({
        ...state,
        status: "success",
      }));
    builder
      .addCase(executeRegister.rejected, (state, action) => ({
        ...state,
        status: "failed",
        message: (action.payload as GeneralResponseMessage).message,
      }))
      .addCase(executeRegister.pending, (state) => ({
        ...state,
        status: "idle",
      }))
      .addCase(executeRegister.fulfilled, (state) => ({
        ...state,
        status: "success",
      }));
  },
});

// -- Action
export const { switchPage, closePopUpError, closeSuccessRegister } =
  LoginSlicer.actions;
export const selectLoginState = (state: RootState) => state.login;

export default LoginSlicer.reducer;
