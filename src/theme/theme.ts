import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563eb",
    },

    secondary: {
      main: "#0f172a",
    },

    background: {
      default: "#eef4ff",
      paper: "#ffffff",
    },

    success: {
      main: "#22c55e",
    },

    error: {
      main: "#ef4444",
    },

    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
  },

  shape: {
    borderRadius: 18,
  },

  typography: {
    fontFamily: `"Inter","Segoe UI",sans-serif`,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "10px 22px",
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "0 8px 20px rgba(37,99,235,.20)",

          transition: ".25s",

          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 12px 28px rgba(37,99,235,.35)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0 10px 30px rgba(15,23,42,.08)",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export default theme;