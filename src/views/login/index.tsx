import type React from "react";

import LoginSection from "./__components/login";
import RegisterSection from "./__components/register";
import GlobalLoading from "../loading";
import GlobalError from "../globalError";

import { LoginContainer } from "./style/style";
import { useAppSelector } from "../../store/store";
import { selectLoginState } from "./loginSlice";

interface LoginInterface {}

const Login: React.FC<LoginInterface> = () => {
  const { page } = useAppSelector(selectLoginState);

  const renderPage = () => {
    switch (page) {
      case "login":
        return <LoginSection />;
      default:
        return <RegisterSection />;
    }
  };

  return (
    <LoginContainer>
      <GlobalError />
      <GlobalLoading />
      {renderPage()}
    </LoginContainer>
  );
};

export default Login;
