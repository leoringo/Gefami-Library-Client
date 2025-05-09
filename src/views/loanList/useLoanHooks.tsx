import { useEffect, useState } from "react";
import type { IGetHistoryLoanRequest } from "../../api/historyService/requestModel";
import type { Column } from "../../components/CustomTable";
import type { IHistoryLoanResponse } from "../../api/historyService/responseModel";

import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  closeSuccessReturnPopUp,
  getLoanList,
  returnBook,
  selectLoanListState,
} from "./loanListSlice";
import TextStyle from "../../components/TextStyle";
import { dateFormatter } from "../../utils/helpers";
import CustomButton from "../../components/CustomButton";

export const useLoanHooks = () => {
  const dispatch = useAppDispatch();
  const { loanList, message, isSuccessReturn } =
    useAppSelector(selectLoanListState);
  const rowsPerPage = 10;

  // !! -- useStates --
  const [page, setPage] = useState<number>(0);
  const [openPopUpVerification, setOpenPopUpVerification] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [payload, setPayload] = useState<IGetHistoryLoanRequest>({
    returnType: "all",
  });

  // !! -- functions --
  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getSlicedLoanList = () => {
    return loanList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const openVerificationReturnedPopUp = (data: IHistoryLoanResponse) => {
    setEmail(data.User.email);
    setOpenPopUpVerification(true);
  };

  const cancelActionReturn = () => {
    setOpenPopUpVerification(false);
    setEmail("");
  };

  const executeReturnBook = () => {
    setOpenPopUpVerification(false);
    dispatch(returnBook({ email }));
  };

  const dispatchCloseSuccessReturnPopUp = () => {
    dispatch(closeSuccessReturnPopUp());
  };

  const onChangeDropDown = (value: string | number) => {
    setPayload({ returnType: value as "returned" | "notReturned" | "all" });
  };

  // !! -- useEffects --
  useEffect(() => {
    setPage(0);
    dispatch(getLoanList(payload));
  }, [payload]);

  // !! -- constant --
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
      render: (_: IHistoryLoanResponse, index: number) => (
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
      key: "id",
      label: "Book",
      render: (row: IHistoryLoanResponse) => (
        <TextStyle variant="body1">
          {row.Book.author} - {row.Book.title}
        </TextStyle>
      ),
    },
    {
      key: "id",
      label: "Borrower",
      render: (row: IHistoryLoanResponse) => (
        <TextStyle variant="body1">
          {row.User.email} - {row.User.name}
        </TextStyle>
      ),
    },
    {
      key: "id",
      label: "Borrowed At",
      render: (row: IHistoryLoanResponse) => (
        <TextStyle variant="body1">{dateFormatter(row.borrowedAt)}</TextStyle>
      ),
    },
    {
      key: "id",
      label: "Due Date",
      render: (row: IHistoryLoanResponse) => (
        <TextStyle variant="body1">{dateFormatter(row.dueDate)}</TextStyle>
      ),
    },
    {
      key: "id",
      label: "Due Date",
      render: (row: IHistoryLoanResponse) => (
        <TextStyle variant="body1">{dateFormatter(row.dueDate)}</TextStyle>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: IHistoryLoanResponse) => {
        const now = new Date();
        const dueDate = new Date(row.dueDate);
        const returnedAt = row.returnedAt ? new Date(row.returnedAt) : null;

        let status = "";
        let color = "";

        if (returnedAt) {
          status = "Returned";
          color = "green";
        } else if (dueDate < now) {
          status = "Overdue";
          color = "red";
        } else {
          status = "Not Returned";
          color = "orange";
        }

        return (
          <TextStyle variant="body1" sx={{ color, fontWeight: "bold" }}>
            {status}
          </TextStyle>
        );
      },
    },
    {
      key: "action",
      label: "Action",
      render: (row: IHistoryLoanResponse) => {
        const returnedAt = row.returnedAt ? new Date(row.returnedAt) : null;

        const isReturnable = !returnedAt;

        if (!isReturnable) return null;

        return (
          <CustomButton
            color="primary"
            variant="contained"
            size="small"
            onClick={() => {
              openVerificationReturnedPopUp(row);
            }}
          >
            Return
          </CustomButton>
        );
      },
    },
  ];

  const dropdownOptions: {
    label: string;
    value: "returned" | "notReturned" | "all";
  }[] = [
    { label: "All", value: "all" },
    { label: "Returned", value: "returned" },
    { label: "Not Returned", value: "notReturned" },
  ];

  return {
    loanList,
    getSlicedLoanList,
    handlePageChange,
    page,
    rowsPerPage,
    column,
    message,
    onChangeDropDown,
    dropdownOptions,
    dispatchCloseSuccessReturnPopUp,
    executeReturnBook,
    openVerificationReturnedPopUp,
    payload,
    openPopUpVerification,
    cancelActionReturn,
    isSuccessReturn,
  };
};
