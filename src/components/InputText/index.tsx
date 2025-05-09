import React, { type ReactNode } from "react";
import {
  TextField,
  type TextFieldProps,
  InputAdornment,
  IconButton,
  styled,
} from "@mui/material";
import Colors from "../../constant/colors";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& fieldset": {
      borderColor: Colors.teal.default,
    },
    "&:hover fieldset": {
      borderColor: Colors.teal.default,
    },
    "&.Mui-focused fieldset": {
      borderColor: Colors.teal.default,
    },
  },
  "& .MuiFormHelperText-root": {
    color: "red",
  },
  "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: "#c4c4c4",
  },
  "& .Mui-disabled:hover fieldset": {
    borderColor: "#c4c4c4",
  },

  "& .Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "",
  },
  "& .Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "",
  },
}));

type InputTextProps = TextFieldProps & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isStartIconDisabled?: boolean;
  isEndIconDisabled?: boolean;
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
};

const InputText: React.FC<InputTextProps> = ({
  startIcon,
  endIcon,
  isEndIconDisabled = false,
  isStartIconDisabled = false,
  onStartIconClick,
  onEndIconClick,
  ...rest
}) => {
  return (
    <StyledTextField
      {...rest}
      variant="outlined"
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">
            <IconButton
              onClick={onStartIconClick}
              edge="start"
              disabled={isStartIconDisabled}
            >
              {startIcon}
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">
            <IconButton
              onClick={onEndIconClick}
              edge="end"
              disabled={isEndIconDisabled}
            >
              {endIcon}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputText;
