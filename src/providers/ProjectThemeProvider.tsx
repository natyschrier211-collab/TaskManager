import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface ThemeContextType {
  isDark: boolean;
  toggleMode: () => void;
}

const ProjectThemeContext = createContext<ThemeContextType | null>(null);

function ProjectThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleMode = useCallback(() => {
    setIsDark((previousMode) => !previousMode);
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        direction: "rtl",

        palette: {
          mode: isDark ? "dark" : "light",

          primary: {
            main: "#7C3AED",
            light: "#A78BFA",
            dark: "#5B21B6",
            contrastText: "#FFFFFF",
          },

          secondary: {
            main: "#F4C430",
            light: "#FDE68A",
            dark: "#D97706",
            contrastText: "#171717",
          },

          success: {
            main: "#10B981",
          },

          warning: {
            main: "#F59E0B",
          },

          error: {
            main: "#EF4444",
          },

          info: {
            main: "#3B82F6",
          },

          background: {
            default: isDark ? "#090E1A" : "#F5F7FB",
            paper: isDark ? "#111827" : "#FFFFFF",
          },

          text: {
            primary: isDark ? "#F8FAFC" : "#172033",
            secondary: isDark ? "#94A3B8" : "#64748B",
          },

          divider: isDark
            ? "rgba(148, 163, 184, 0.16)"
            : "rgba(15, 23, 42, 0.10)",
        },

        shape: {
          borderRadius: 16,
        },

        typography: {
          fontFamily: '"Rubik", "Arial", "Helvetica", sans-serif',

          h1: {
            fontWeight: 800,
            letterSpacing: "-0.04em",
          },

          h2: {
            fontWeight: 800,
            letterSpacing: "-0.035em",
          },

          h3: {
            fontWeight: 750,
            letterSpacing: "-0.025em",
          },

          h4: {
            fontWeight: 750,
          },

          h5: {
            fontWeight: 700,
          },

          h6: {
            fontWeight: 700,
          },

          button: {
            fontWeight: 700,
            textTransform: "none",
          },
        },

        components: {
          MuiCssBaseline: {
            styleOverrides: {
              "*": {
                boxSizing: "border-box",
              },

              html: {
                scrollBehavior: "smooth",
              },

              body: {
                margin: 0,
                minWidth: 320,
                minHeight: "100vh",
                direction: "rtl",
                transition: "background-color 250ms ease, color 250ms ease",
              },

              "#root": {
                minHeight: "100vh",
              },

              "::selection": {
                backgroundColor: "rgba(124, 58, 237, 0.28)",
              },

              // ==========================================
              // עיצוב פס הגלילה (Scrollbar)
              // ==========================================
              "::-webkit-scrollbar": {
                width: "8px",
                height: "8px",
              },
              "::-webkit-scrollbar-track": {
                background: isDark ? "#090E1A" : "#F5F7FB",
              },
              "::-webkit-scrollbar-thumb": {
                background: isDark 
                  ? "rgba(255, 255, 255, 0.15)" 
                  : "rgba(15, 23, 42, 0.15)",
                borderRadius: "10px",
                // יוצר אפקט של ריווח פנימי (Padding) בתוך הפס
                border: `2px solid ${isDark ? "#090E1A" : "#F5F7FB"}`,
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: isDark 
                  ? "rgba(255, 255, 255, 0.3)" 
                  : "rgba(15, 23, 42, 0.3)",
              },
              // פיירפוקס תומך בדרך שונה
              "": {
                scrollbarWidth: "thin",
                scrollbarColor: isDark 
                  ? "rgba(255, 255, 255, 0.15) #090E1A" 
                  : "rgba(15, 23, 42, 0.15) #F5F7FB",
              },
            },
          },

          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },

          MuiToolbar: {
            styleOverrides: {
              root: {
                transition: "all 250ms ease",
              },
            },
          },

          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },

            styleOverrides: {
              root: {
                minHeight: 44,
                borderRadius: 14,
                paddingInline: 20,
                transition:
                  "transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease",

                boxShadow: "0 10px 28px rgba(124, 58, 237, 0.18)",

                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 14px 34px rgba(124, 58, 237, 0.28)",
                },

                "&:active": {
                  transform: "translateY(0)",
                },
              },
            },
          },

          MuiIconButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                transition: "transform 180ms ease, background-color 180ms ease",

                "&:hover": {
                  transform: "translateY(-1px)",
                },
              },
            },
          },

          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                border: isDark
                  ? "1px solid rgba(148, 163, 184, 0.14)"
                  : "1px solid rgba(15, 23, 42, 0.08)",
                boxShadow: isDark
                  ? "0 18px 50px rgba(0, 0, 0, 0.24)"
                  : "0 18px 50px rgba(15, 23, 42, 0.08)",
                transition:
                  "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
              },
            },
          },

          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 18,
                backgroundImage: "none",
                transition: "transform 200ms ease, box-shadow 200ms ease",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: isDark
                    ? "0 22px 56px rgba(0, 0, 0, 0.34)"
                    : "0 22px 56px rgba(15, 23, 42, 0.13)",
                },
              },
            },
          },

          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                fontWeight: 600,
                transition: "transform 180ms ease, background-color 180ms ease",

                "&:hover": {
                  transform: "translateY(-1px)",
                },
              },
            },
          },

          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: 24,
                backgroundImage: "none",
              },
            },
          },

          MuiTextField: {
            defaultProps: {
              variant: "outlined",
            },
          },

          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 14,
                transition: "box-shadow 180ms ease, border-color 180ms ease",

                "&.Mui-focused": {
                  boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.12)",
                },
              },
            },
          },

          MuiFab: {
            styleOverrides: {
              root: {
                boxShadow: "0 14px 34px rgba(124, 58, 237, 0.30)",
                transition: "transform 180ms ease, box-shadow 180ms ease",

                "&:hover": {
                  transform: "translateY(-3px) scale(1.03)",
                  boxShadow: "0 18px 42px rgba(124, 58, 237, 0.40)",
                },
              },
            },
          },

          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                borderRadius: 10,
                fontSize: "0.78rem",
                padding: "8px 12px",
              },
            },
          },
        },
      }),
    [isDark],
  );

  return (
    <ProjectThemeContext.Provider value={{ isDark, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ProjectThemeContext.Provider>
  );
}

export {
  ProjectThemeProvider,
  ProjectThemeContext,
  type ThemeContextType,
};