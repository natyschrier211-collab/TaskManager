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
import { useNavigate } from "react-router-dom";

import ROUTES from "../../router/routes";

import {
  ProjectThemeContext,
  type ThemeContextType,
} from "../../providers/ProjectThemeProvider";

import { useUser } from "../../providers/UserProvider";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  }

  if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  }

  if (hour >= 17 && hour < 21) {
    return "Good Evening";
  }

  return "Good Night";
}

function getFormattedDate() {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function Header() {
  const navigate = useNavigate();

  const { isDark, toggleMode } = useContext(
    ProjectThemeContext,
  ) as ThemeContextType;

  const { user,userData, logout } = useUser();

  const greeting = getGreeting();
  const formattedDate = getFormattedDate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 72, md: 88 },
          px: { xs: 2, md: 4 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr auto",
            md: "1fr 1fr 1fr",
          },
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          onClick={() => navigate(ROUTES.HOME)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            cursor: "pointer",
            justifySelf: "start",
          }}
        >
          <Avatar
            sx={{
              width: 42,
              height: 42,
              bgcolor: "primary.main",
            }}
          >
            <TaskAlt />
          </Avatar>

          <Box>
            <Typography
              variant="h6"
              sx={{ lineHeight: 1.1 }}
            >
              Task Manager
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              ניהול משימות חכם ופשוט
            </Typography>
          </Box>
        </Box>

        {user && (
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              textAlign: "center",
              justifySelf: "center",
            }}
          >
     <Typography variant="h6" sx={{ fontWeight: 550 }}>
  <Box component="span" sx={{ color: "primary.main" }}>
    {greeting}
  </Box>

  {userData && (
    <Box component="span" sx={{ color: "text.primary" }}>
      {`, ${userData.firstName} ${userData.lastName}`}
    </Box>
  )}
</Typography>

            <Typography variant="body2" color="text.secondary"   sx={{
    fontWeight: 550,
  }}>
              {formattedDate}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifySelf: "end",
            gap: 1,
          }}
        >
          {!user ? (
            <>
              <Button
                variant="text"
                startIcon={<Login />}
                onClick={() => navigate(ROUTES.LOGIN)}
                sx={{
                  display: { xs: "none", sm: "inline-flex" },
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
                }}
              >
                הרשמה
              </Button>
            </>
          ) : (
            <>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "secondary.main",
                  fontWeight: 700,
                }}
              >
                {user.email?.charAt(0).toUpperCase() ?? "U"}
              </Avatar>

              <Tooltip title="התנתקות">
                <IconButton
                  onClick={() => logout()}
                  color="inherit"
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
              color="inherit"
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