import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { selectIsLoading } from "./loadingSlice";

const GlobalLoading = () => {
  const { isLoading } = useAppSelector(selectIsLoading);

  return (
    <Backdrop
      open={isLoading}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalLoading;
