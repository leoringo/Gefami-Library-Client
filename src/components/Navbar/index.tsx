import React from "react";
import { NavLink } from "react-router-dom";
import { NavBarContainer } from "./style";

import CustomButton from "../CustomButton";
import { route } from "../../router";
import Colors from "../../constant/colors";

const Navbar: React.FC = () => {
  const routes = route[0].children;

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <NavBarContainer>
      {routes?.map((item) => (
        <NavLink
          key={item.path}
          to={item.path ?? "/"}
          style={{
            color: Colors.orange.default,
          }}
        >
          {({ isActive }) => (
            <CustomButton
              color={isActive ? "primary" : "inherit"}
              sx={
                isActive
                  ? { fontWeight: "bold", textDecoration: "underline" }
                  : undefined
              }
            >
              {item.handle.label}
            </CustomButton>
          )}
        </NavLink>
      ))}
      <NavLink onClick={handleLogout} to="/login">
        <CustomButton variant="text">Logout</CustomButton>
      </NavLink>
    </NavBarContainer>
  );
};

export default Navbar;
