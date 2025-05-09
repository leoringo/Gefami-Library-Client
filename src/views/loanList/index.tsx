import ReusableTable from "../../components/CustomTable";
import ReusableDropdown from "../../components/Dropdown";
import PopupDialog from "../../components/Popup";
import TextStyle from "../../components/TextStyle";
import { useLoanHooks } from "./useLoanHooks";

const LoanList = () => {
  const {
    getSlicedLoanList,
    handlePageChange,
    loanList,
    rowsPerPage,
    page,
    column,
    dispatchCloseSuccessReturnPopUp,
    dropdownOptions,
    message,
    onChangeDropDown,
    openPopUpVerification,
    payload,
    executeReturnBook,
    cancelActionReturn,
    isSuccessReturn,
  } = useLoanHooks();

  return (
    <>
      <TextStyle variant="h3">List of Loans!</TextStyle>
      <ReusableDropdown
        label="Filter"
        onChange={onChangeDropDown}
        options={dropdownOptions}
        value={payload.returnType}
      />
      <ReusableTable
        columns={column}
        data={getSlicedLoanList()}
        total={loanList.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[10]}
      />
      <PopupDialog
        type="action"
        title="Wait!"
        description="Are you sure book is returned?"
        onClose={cancelActionReturn}
        onConfirm={executeReturnBook}
        open={openPopUpVerification}
      />
      <PopupDialog
        type="success"
        title="Success!"
        description={message}
        onClose={dispatchCloseSuccessReturnPopUp}
        open={isSuccessReturn}
      />
    </>
  );
};

export default LoanList;
