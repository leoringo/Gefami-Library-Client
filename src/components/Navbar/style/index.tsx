import { Box, styled } from "@mui/material";
import Colors from "../../../constant/colors";

export const NavBarContainer = styled(Box)({
  display: "flex",
  justifyContent: 'center',
  gap: "1rem",
  border: `1px solid ${Colors.orange.light}`,
  borderRadius: "20px",
  background: Colors.white
});
