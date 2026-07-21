import { Box } from "@mui/material";
import type { ReactNode } from "react";

function Main({ children }: { children: ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "calc(100vh - 130px)", // חישוב חכם שמשאיר מקום להדר ולפוטר
        display: "flex",
        flexDirection: "column",
        // העפנו את ה-padding ואת ה-backgroundColor הקשיח!
      }}
    >
      {children}
    </Box>
  );
}

export default Main;