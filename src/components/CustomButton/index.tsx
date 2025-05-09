import React from "react";
import Button, { type ButtonProps } from "@mui/material/Button";

interface CustomButtonProps extends ButtonProps {}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "text",
  ...props
}) => {
  return <Button variant={variant} {...props} />;
};

export default CustomButton;
