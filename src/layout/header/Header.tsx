import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Brightness4,
  Brightness7,
  Login,
  Logout,
  PersonAdd,
  TaskAlt,
} from "@mui/icons-material";

import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // הוספנו את useLocation כדי לזהות באיזה עמוד אנחנו

import ROUTES from "../../router/routes";

import {
  ProjectThemeContext,
  type ThemeContextType,
} from "../../providers/ProjectThemeProvider";

import { useUser } from "../../providers/UserProvider";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "בוקר טוב";
  if (hour >= 12 && hour < 17) return "צהריים טובים";
  if (hour >= 17 && hour < 21) return "ערב טוב";
  return "לילה טוב";
}

function getFormattedDate() {
  return new Intl.DateTimeFormat("heb", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // מאפשר לנו לדעת מה ה-URL הנוכחי

  const { isDark, toggleMode } = useContext(
    ProjectThemeContext
  ) as ThemeContextType;

  const { user, userData, logout } = useUser();

  const greeting = getGreeting();
  const formattedDate = getFormattedDate();

  // פונקציית עזר לעיצוב כפתורי הניווט
  const navButtonStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      fontSize: "1rem",
      fontWeight: isActive ? 700 : 500,
      color: isActive 
        ? (isDark ? "#A78BFA" : "#4F46E5") 
        : (isDark ? "rgba(255,255,255,0.7)" : "text.secondary"),
      position: "relative",
      px: 2,
      "&:hover": {
        color: isDark ? "#fff" : "text.primary",
        background: "transparent",
      },
      // קו תחתון קטן שמופיע כשהעמוד פעיל
      "&::after": isActive ? {
        content: '""',
        position: "absolute",
        bottom: 4,
        left: "15%",
        width: "70%",
        height: "3px",
        borderRadius: "2px",
        background: isDark ? "#A78BFA" : "#4F46E5",
      } : {},
    };
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        background: isDark
          ? "rgba(17, 24, 39, 0.75)"
          : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: 1,
        borderColor: isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.05)",
        boxShadow: isDark
          ? "0 4px 30px rgba(0, 0, 0, 0.3)"
          : "0 4px 30px rgba(0, 0, 0, 0.03)",
        color: isDark ? "#fff" : "text.primary",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 72, md: 88 },
          px: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "space-between", 
          alignItems: "center",
        }}
      >
        {/* === צד ימין: לוגו + תפריט ניווט === */}
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, lg: 5 } }}>
          
          {/* לוגו */}
          <Box
            onClick={() => navigate(ROUTES.HOME)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <Avatar
              sx={{
                width: 46,
                height: 46,
                background: isDark
                  ? "linear-gradient(135deg, #60A5FA, #A78BFA)"
                  : "linear-gradient(135deg, #4F46E5, #7C3AED)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              <TaskAlt sx={{ color: "#fff" }} />
            </Avatar>

            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "800",
                  lineHeight: 1.1,
                  background: isDark
                    ? "linear-gradient(90deg, #60A5FA, #A78BFA)"
                    : "linear-gradient(90deg, #2563EB, #6D28D9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Task Manager
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: isDark ? "rgba(255,255,255,0.6)" : "text.secondary",
                  fontWeight: 500,
                  letterSpacing: 0.5,
                }}
              >
                ניהול משימות חכם ופשוט
              </Typography>
            </Box>
          </Box>

          {/* תפריט ניווט (מוסתר במובייל) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
            <Button disableRipple onClick={() => navigate(ROUTES.HOME)} sx={navButtonStyle(ROUTES.HOME)}>
              בית
            </Button>
            <Button disableRipple onClick={() => navigate(ROUTES.ABOUT || "/about")} sx={navButtonStyle(ROUTES.ABOUT || "/about")}>
              אודות
            </Button>
            <Button disableRipple onClick={() => navigate(ROUTES.CONTACT || "/contact")} sx={navButtonStyle(ROUTES.CONTACT || "/contact")}>
              צור קשר
            </Button>
          </Box>
        </Box>

        {/* === צד שמאל: משתמש, פעולות ומצב לילה === */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          
          {/* ברכה ותאריך (מופיע רק למשתמשים מחוברים במסכים גדולים) */}
          {user && (
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                textAlign: "left",
                mr: 2,
                pr: 2,
                borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "1.15rem" }}>
                <Box component="span" sx={{ color: isDark ? "#A78BFA" : "#4F46E5" }}>
                  {greeting}
                </Box>
                {userData && (
                  <Box component="span" sx={{ color: isDark ? "#fff" : "text.primary" }}>
                    {`, ${userData.firstName || user.email?.split("@")[0] || "משתמש"} ${userData.lastName}!`}
                  </Box>
                )}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: isDark ? "rgba(255,255,255,0.5)" : "text.secondary", fontWeight: 500 }}
              >
                {formattedDate}
              </Typography>
            </Box>
          )}

          {!user ? (
            <>
              {/* אייקונים למובייל לאורחים */}
              <Tooltip title="התחברות">
                <IconButton
                  onClick={() => navigate(ROUTES.LOGIN)}
                  sx={{ display: { xs: "inline-flex", sm: "none" }, color: isDark ? "#fff" : "#4F46E5" }}
                >
                  <Login />
                </IconButton>
              </Tooltip>
              <Tooltip title="הרשמה">
                <IconButton
                  onClick={() => navigate(ROUTES.REGISTER)}
                  sx={{ display: { xs: "inline-flex", sm: "none" }, color: isDark ? "#A78BFA" : "#7C3AED" }}
                >
                  <PersonAdd />
                </IconButton>
              </Tooltip>

              {/* כפתורים למחשב לאורחים */}
              <Button
                variant="outlined"
                startIcon={<Login />}
                onClick={() => navigate(ROUTES.LOGIN)}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  borderRadius: 3,
                  fontWeight: "bold",
                  color: isDark ? "#fff" : "#4F46E5",
                  borderColor: isDark ? "rgba(255,255,255,0.3)" : "#4F46E5",
                  "&:hover": {
                    borderColor: isDark ? "#fff" : "#4338CA",
                    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(79, 70, 229, 0.04)",
                  },
                }}
              >
                התחברות
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={() => navigate(ROUTES.REGISTER)}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
                  borderRadius: 3,
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #4F46E5, #7C3AED)",
                  boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.39)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #4338CA, #6D28D9)",
                    boxShadow: "0 6px 20px rgba(79, 70, 229, 0.23)",
                  },
                }}
              >
                הרשמה
              </Button>
            </>
          ) : (
            <>
              {/* תצוגה למשתמש מחובר */}
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: isDark ? "rgba(255,255,255,0.1)" : "rgba(79, 70, 229, 0.1)",
                  color: isDark ? "#A78BFA" : "#4F46E5",
                  fontWeight: 800,
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "rgba(79, 70, 229, 0.2)"}`,
                }}
              >
                {userData?.firstName?.charAt(0).toUpperCase() || 
                 user.email?.charAt(0).toUpperCase() || 
                 "U"}
              </Avatar>

              <Tooltip title="התנתקות">
                <IconButton
                  onClick={() => logout()}
                  sx={{
                    color: isDark ? "rgba(255,255,255,0.7)" : "text.secondary",
                    "&:hover": { color: "#ef4444", background: "rgba(239, 68, 68, 0.1)" },
                  }}
                  aria-label="logout"
                >
                  <Logout />
                </IconButton>
              </Tooltip>
            </>
          )}

          <Tooltip title={isDark ? "מצב בהיר" : "מצב כהה"}>
            <IconButton
              onClick={toggleMode}
              sx={{
                color: isDark ? "#FCD34D" : "#4F46E5",
                background: isDark ? "rgba(252, 211, 77, 0.1)" : "rgba(79, 70, 229, 0.1)",
                "&:hover": { background: isDark ? "rgba(252, 211, 77, 0.2)" : "rgba(79, 70, 229, 0.2)" },
              }}
              aria-label="toggle theme"
            >
              {isDark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;