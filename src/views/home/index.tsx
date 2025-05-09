import React from "react";
import { useHomeHooks } from "./useAppHooks";
import TextStyle from "../../components/TextStyle";
import ReusableTable from "../../components/CustomTable";
import PopupDialog from "../../components/Popup";

const HomePage: React.FC = () => {
  const {
    page,
    books,
    getSlicedBooks,
    handlePageChange,
    rowsPerPage,
    column,
    isBorrowBook,
    executeDelete,
    cancelDelete,
    isDeletedSuccess,
    message,
    dispatchClosePopUp
  } = useHomeHooks();

  return (
    <>
      <TextStyle variant="h3">List of Books</TextStyle>
      <ReusableTable
        columns={column}
        data={getSlicedBooks()}
        total={books.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[10]}
      />
      <PopupDialog
        open={isBorrowBook.isOpen}
        title="Wait!"
        type="action"
        description="Are you sure want to delete data?"
        onClose={cancelDelete}
        onConfirm={executeDelete}
      />
      <PopupDialog
        open={isDeletedSuccess}
        title="Success!"
        description={message}
        type="success"
        onClose={dispatchClosePopUp}
      />
    </>
  );
};

export default HomePage;
