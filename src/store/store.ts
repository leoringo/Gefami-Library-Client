import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import globalLoadingReducer from "../views/loading/loadingSlice";
import globalError from "../views/globalError/globalErrorSlice";
import loginReducer from "../views/login/loginSlice";
import homeReducer from "../views/home/homeSlice";

const reducer = {
  login: loginReducer,
  globalLoading: globalLoadingReducer,
  globalError: globalError,
  home: homeReducer,
};

export const store = configureStore({
  reducer,
});

// For TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
