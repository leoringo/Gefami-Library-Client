export interface IGetAllBooksResponse {
  id: number;
  title: string;
  author: string;
  stock: number;
  totalStock: number;
}

export interface IBorrowBookResponse {
    message: string
}