export interface UserInterface {
    id: number,
    name: string,
    email: string,
    role: string
}

export interface BookInterface {
    id: number,
    title: string,
    author: string,
    stock: number,
    totalStock: number
}

export interface IHistoryLoanResponse {
    id: number,
    userId: number,
    bookId: number,
    borrowedAt: Date,
    dueDate: Date,
    returnedAt: null,
    User: UserInterface
    Book: BookInterface
}