import { http } from "../baseUrl";

import type { ILoginRequest, IRegisterRequest } from "./requestModel";

export const axiosLogin = (payload: ILoginRequest) =>
  http.post("/user/login", payload);

export const axiosRegister = (payload: IRegisterRequest) =>
  http.post("/user/register", payload);

