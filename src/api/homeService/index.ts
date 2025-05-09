import { http } from "../baseUrl";
import type { IBorrowBookRequest } from "./requestModel";

export const axiosGetAllBooks = () => http.get("/book");

export const axiosBorrowBook = (payload: IBorrowBookRequest) =>
  http.post("/loan/borrow", payload);
