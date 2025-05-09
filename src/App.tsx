import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import GlobalLoading from "./views/loading";
import { Box } from "@mui/material";
import Colors from "./constant/colors";
import GlobalError from "./views/globalError";

function App() {
  return (
    <>
      <GlobalLoading />
      <GlobalError />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: Colors.teal.lightest,
          borderRadius: "20px",
          height: "100vh",
        }}
      >
        <Navbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            marginTop: '50px',
            alignSelf: 'center',
            minWidth: '60vw',
            minHeight: '60vh',
            background: Colors.white,
            borderRadius: '20px'
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default App;
