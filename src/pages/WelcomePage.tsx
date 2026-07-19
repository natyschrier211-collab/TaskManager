import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowBack,
  CloudDone,
  DashboardCustomize,
  Devices,
  Login,
  PersonAdd,
  TaskAlt,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import ROUTES from "../router/routes";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "calc(100vh - 88px)",
        display: "flex",
        alignItems: "center",
        py: { xs: 6, md: 10 },
        overflow: "hidden",
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.08,
          filter: "blur(70px)",
          top: -100,
          right: -100,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          bgcolor: "secondary.main",
          opacity: 0.07,
          filter: "blur(80px)",
          bottom: -120,
          left: -80,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: { xs: 4, md: 6 },
          px: { xs: 3, sm: 5, md: 7 },
py: { xs: 5, md: 6 },
maxWidth: 1050,
mx: "auto",
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <Stack
            spacing={3}
            sx={{
              maxWidth: 820,
              mx: "auto",
            }}
          >
            <Box
              sx={{
              width: 60,
height: 60,
                display: "grid",
                placeItems: "center",
                borderRadius: 4,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                boxShadow: "0 16px 36px rgba(124, 58, 237, 0.28)",
                animation: "welcomeFloat 3s ease-in-out infinite",
                "@keyframes welcomeFloat": {
                  "0%, 100%": {
                    transform: "translateY(0)",
                  },
                  "50%": {
                    transform: "translateY(-6px)",
                  },
                },
              }}
            >
              <TaskAlt sx={{ fontSize: 32 }} />
            </Box>

            <Box>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "2.2rem",
                    sm: "3rem",
                    md: "4rem",
                  },
                  lineHeight: 1.12,
                  mb: 2,
                }}
              >
                ברוכים הבאים ל־
                <Box
                  component="span"
                  sx={{
                    color: "primary.main",
                    display: "inline",
                  }}
                >
                  Task Manager
                </Box>
              </Typography>

              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: "1.05rem",
                    sm: "1.2rem",
                    md: "1.35rem",
                  },
                  lineHeight: 1.8,
                  maxWidth: 700,
                  mx: "auto",
                }}
              >
                נהלו לוחות, משימות ופרויקטים
במערכת אחת, מהירה, מאובטחת
ומותאמת לעבודה מכל מקום.
              </Typography>
            </Box>
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    flexWrap: "wrap",
    width: "100%",
    mt: 2,
    mb: 4,
      minWidth: 190,
  py: 1.6,
  transition: "all .25s",

  "&:hover": {
    transform: "translateY(-3px)",
  },
  }}
>
  <Button
    variant="contained"
    size="large"
    startIcon={<Login />}
    endIcon={<ArrowBack />}
    onClick={() => navigate(ROUTES.LOGIN)}
    sx={{
      minWidth: 180,
      py: 1.5,
    }}
  >
    התחברות
  </Button>

  <Button
    variant="outlined"
    size="large"
    startIcon={<PersonAdd />}
    onClick={() => navigate(ROUTES.REGISTER)}
    sx={{
      minWidth: 180,
      py: 1.5,
    }}
  >
    הרשמה
  </Button>
</Box>
          <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 1.5,
    flexWrap: "wrap",
    width: "100%",
    mt: 2,
  }}
>
  <Chip
    icon={<DashboardCustomize />}
    label="ניהול לוחות"
    variant="outlined"
  />

  <Chip
    icon={<CloudDone />}
    label="שמירה בענן"
    variant="outlined"
  />

  <Chip
    icon={<Devices />}
    label="מותאם לכל מכשיר"
    variant="outlined"
  />
</Box>
<Box
  sx={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    mt: 2,
  }}
>
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{
      maxWidth: 600,
      textAlign: "center",
    }}
  >
    הרשמה קצרה, התחברות מאובטחת וכל הכלים שאתם צריכים כדי
    לשמור על סדר ולעבוד בצורה יעילה יותר.
  </Typography>
</Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default WelcomePage; 