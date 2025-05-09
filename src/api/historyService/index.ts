import { http } from "../baseUrl";
import type { IGetHistoryLoanRequest, IReturnBookRequest } from "./requestModel";

export const axiosGetHistoryLoan = (payload: IGetHistoryLoanRequest) =>
  http.post("/loan/list", payload);

export const axiosReturnBook = (payload: IReturnBookRequest) => 
  http.post("/loan/return", payload)