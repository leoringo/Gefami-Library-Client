import React, { useState } from "react";
import {
  FormContainer,
  HeaderContainer,
  InputContainer,
  StyledButton,
} from "../style/style";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  closeSuccessRegister,
  executeRegister,
  selectLoginState,
  switchPage,
} from "../loginSlice";

import TextStyle from "../../../components/TextStyle";
import InputText from "../../../components/InputText";
import PopupDialog from "../../../components/Popup";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BadgeIcon from "@mui/icons-material/Badge";

import Colors from "../../../constant/colors";
import type { IRegisterRequest } from "../../../api/loginService/requestModel";

interface RegisterSectionProps {}

const RegisterSection: React.FC<RegisterSectionProps> = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectLoginState);
  const initialPayloadConstant: IRegisterRequest = {
    name: "",
    password: "",
    email: "",
  };

  const [payload, setPayload] = useState<IRegisterRequest>(
    initialPayloadConstant
  );
  const [errors, setErrors] = useState<IRegisterRequest>(
    initialPayloadConstant
  );
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onClickSwitchPage = () => {
    dispatch(switchPage("login"));
    setPayload(initialPayloadConstant);
    setErrors(initialPayloadConstant);
    setShowPassword(false);
  };

  const validate = () => {
    const newErrors: IRegisterRequest = initialPayloadConstant;
    const { email, password, name } = payload;

    if (!name) {
      newErrors.name = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (!email) {
      newErrors.email = "Address is required";
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(executeRegister(payload));
    }
  };

  return (
    <FormContainer>
      <HeaderContainer>
        <TextStyle variant="custom" customSize={"60px"} marginTop={2}>
          Hello new user!
        </TextStyle>
      </HeaderContainer>
      <InputContainer onSubmit={handleSubmit}>
        {/* -- Name -- */}
        <InputText
          label="Name"
          id="outlined-multiline-static"
          value={payload.name}
          onChange={(e) =>
            setPayload((prevValue) => ({
              ...prevValue,
              name: e.target.value,
            }))
          }
          endIcon={<BadgeIcon />}
          error={Boolean(errors.name)}
          helperText={errors.name}
          isEndIconDisabled
        />

        {/* -- Email -- */}
        <InputText
          label="Email"
          id="outlined-multiline-static"
          value={payload.email}
          onChange={(e) =>
            setPayload((prevValue) => ({
              ...prevValue,
              email: e.target.value,
            }))
          }
          endIcon={<AlternateEmailIcon />}
          error={Boolean(errors.email)}
          helperText={errors.email}
          isEndIconDisabled
        />

        {/* -- Password -- */}
        <InputText
          label="Password"
          id="outlined-password-input"
          type={showPassword ? "text" : "password"}
          value={payload.password}
          onChange={(e) =>
            setPayload((prevValue) => ({
              ...prevValue,
              password: e.target.value,
            }))
          }
          endIcon={showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          onEndIconClick={togglePasswordVisibility}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        <StyledButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            background: Colors.teal.default,
          }}
        >
          Login
        </StyledButton>
        <TextStyle variant="h6" align="center">
          Already have an account?{" "}
          <span
            style={{
              color: "#1976d2",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onClickSwitchPage}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#1565c0")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#1976d2")
            }
          >
            Click Here
          </span>
        </TextStyle>
      </InputContainer>

      <PopupDialog
        open={status === "success"}
        type="success"
        title="Hooray!"
        description="Successfully Registered!"
        onClose={() => dispatch(closeSuccessRegister())}
      />
    </FormContainer>
  );
};

export default RegisterSection;
