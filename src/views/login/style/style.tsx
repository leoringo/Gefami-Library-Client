import Colors from "../../../constant/colors";
import { Box, Button, styled } from "@mui/material";

export const LoginContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: Colors.teal.light,
  height: "100vh",
  borderRadius: "30px",
});

export const FormContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-evenly",
  flexDirection: "column",
  alignItems: "center",
  width: "400px",
  height: "600px",
  background: Colors.white,
  borderRadius: "20px",
});

export const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center',
  background: Colors.orange.lightest,
  width: "100%",
  height: "100px",
  paddingBottom: '20px'
});

export const InputContainer = styled('form')({
  display: "flex",
  flexDirection: 'column',
  paddingTop: '20px',
  paddingBottom: '20px',
  gap: '20px',
  width: "30vh",
  height: "30vh",
});


export const StyledButton = styled(Button)({
  borderRadius: 40,
  minHeight: 48,
  textTransform: "none",
});