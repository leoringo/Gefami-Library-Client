import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  borrowBook,
  closeSuccessDeletePopUp,
  getAllBooks,
  selectHomeState,
} from "./homeSlice";
import { getRole } from "../../utils/helpers";
import type { Column } from "../../components/CustomTable";
import type { IGetAllBooksResponse } from "../../api/homeService/responseModel";
import TextStyle from "../../components/TextStyle";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import BookIcon from "@mui/icons-material/LibraryBooks";
import type { IBorrowBookRequest } from "../../api/homeService/requestModel";

export const useHomeHooks = () => {
  const dispatch = useAppDispatch();
  const { books, isDeletedSuccess, message } = useAppSelector(selectHomeState);
  const role = getRole();
  const rowsPerPage = 10;

  //!! -- useStates
  const [page, setPage] = useState<number>(0);
  const [isBorrowBook, setIsBorrowBook] = useState<{
    isOpen: boolean;
    payload: IBorrowBookRequest;
  }>({
    isOpen: false,
    payload: {
      bookId: null,
    },
  });

  // !! -- functions --

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getSlicedBooks = () => {
    return books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const openConfirmDeletePopUp = (row: IGetAllBooksResponse) => {
    setIsBorrowBook({
      isOpen: true,
      payload: { bookId: row.id },
    });
  };

  const cancelDelete = () => {
    setIsBorrowBook({
      isOpen: false,
      payload: { bookId: null },
    });
  };

  const executeDelete = () => {
    setIsBorrowBook({ isOpen: false, payload: { bookId: null } });
    const { payload } = isBorrowBook;

    dispatch(borrowBook(payload));
  };

  const dispatchClosePopUp = () => {
    dispatch(closeSuccessDeletePopUp());
  };

  // !! -- CONSTANT --
  const column: Column[] = [
    {
      key: "id",
      label: "No.",
      cellStyle: {
        width: 60,
        maxWidth: 60,
        minWidth: 60,
        textAlign: "center" as const,
      },
      render: (_: IGetAllBooksResponse, index: number) => (
        <TextStyle
          sx={{
            minWidth: "40px",
            maxWidth: "40px",
            textAlign: "center",
          }}
          variant="body1"
        >
          {page * rowsPerPage + index + 1}
        </TextStyle>
      ),
    },
    {
      key: "title",
      label: "Title",
      cellStyle: {
        maxWidth: 100,
      },
      render: (row: IGetAllBooksResponse) => (
        <TextStyle
          sx={{
            maxWidth: "100px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
          variant="body1"
        >
          {row.title}
        </TextStyle>
      ),
    },
    {
      key: "author",
      label: "Author",
      cellStyle: {
        maxWidth: 100,
      },
      render: (row: IGetAllBooksResponse) => (
        <TextStyle
          sx={{
            maxWidth: "100px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
          variant="body1"
        >
          {row.author}
        </TextStyle>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      cellStyle: {
        width: 60,
        maxWidth: 60,
        minWidth: 60,
        textAlign: "center" as const,
      },
      render: (row: IGetAllBooksResponse) => (
        <TextStyle
          sx={{
            maxWidth: "60px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
          variant="body1"
        >
          {row.stock}
        </TextStyle>
      ),
    },
  ];

  if (role === "user") {
    column.push({
      key: "borrow",
      label: "Borrow",
      cellStyle: {
        width: 80,
        maxWidth: 80,
        minWidth: 80,
        textAlign: "center" as const,
      },
      render: (row: IGetAllBooksResponse) => (
        <Tooltip title={row.stock > 0 ? "Borrow Book" : "Out of Stock"}>
          <span>
            <IconButton
              color="primary"
              disabled={row.stock <= 0}
              onClick={() => openConfirmDeletePopUp(row)}
            >
              <BookIcon />
            </IconButton>
          </span>
        </Tooltip>
      ),
    });
  }

  // !! -- useEffects --
  useEffect(() => {
    dispatch(getAllBooks(null));
  }, []);

  return {
    getSlicedBooks,
    handlePageChange,
    rowsPerPage,
    page,
    books,
    column,
    executeDelete,
    isBorrowBook,
    cancelDelete,
    isDeletedSuccess,
    message,
    dispatchClosePopUp,
  };
};
