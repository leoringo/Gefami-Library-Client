export interface IGetHistoryLoanRequest {
  returnType: "returned" | "notReturned" | "all";
}

export interface IReturnBookRequest {
  email: string;
}
