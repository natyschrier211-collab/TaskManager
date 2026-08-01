import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import {
  ArrowBackRounded,
  AutoAwesomeRounded,
  CloudDoneRounded,
  DevicesRounded,
  LoginRounded,
  PersonAddRounded,
  SecurityRounded,
  TaskAltRounded,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import ROUTES from "../router/routes";

function WelcomePage() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const features = [
    {
      icon: <SecurityRounded />,
      title: "מאובטח",
      description: "התחברות ושמירת מידע באמצעות Firebase.",
    },
    {
      icon: <CloudDoneRounded />,
      title: "מסונכרן",
      description: "המידע נשמר בענן ונגיש מכל מקום.",
    },
    {
      icon: <DevicesRounded />,
      title: "מותאם לכל מסך",
      description: "חוויית שימוש נוחה במחשב ובטלפון.",
    },
  ];

  return (
    <Box
      component="main"
      dir="rtl"
      sx={{
        minHeight: "calc(100vh - 72px)",
        position: "relative",
        overflow: "hidden",

        display: "flex",
        alignItems: "flex-start",

        bgcolor: "background.default",

        pt: {
          xs: 4,
          sm: 5,
          md: 5.5,
        },

        pb: {
          xs: 7,
          md: 8,
        },

        backgroundImage: isDark
          ? `
            radial-gradient(
              circle at 15% 15%,
              rgba(124, 58, 237, 0.18),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(147, 51, 234, 0.10),
              transparent 25%
            )
          `
          : `
            radial-gradient(
              circle at 15% 15%,
              rgba(124, 58, 237, 0.11),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(147, 51, 234, 0.07),
              transparent 25%
            )
          `,
      }}
    >
      {/* תאורת רקע עליונה */}

      <Box
        sx={{
          position: "absolute",
          width: 380,
          height: 380,
          top: -230,
          right: -140,

          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: isDark ? 0.12 : 0.07,
          filter: "blur(75px)",

          pointerEvents: "none",
        }}
      />

      {/* תאורת רקע תחתונה */}

      <Box
        sx={{
          position: "absolute",
          width: 340,
          height: 340,
          bottom: -230,
          left: -130,

          borderRadius: "50%",
          bgcolor: "secondary.main",
          opacity: isDark ? 0.1 : 0.06,
          filter: "blur(80px)",

          pointerEvents: "none",
        }}
      />

      {/* רשת עדינה ברקע */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,

          opacity: isDark ? 0.025 : 0.018,

          backgroundImage: `
            linear-gradient(
              rgba(124, 58, 237, 0.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(124, 58, 237, 0.8) 1px,
              transparent 1px
            )
          `,

          backgroundSize: "64px 64px",

          maskImage:
            "linear-gradient(to bottom, transparent, black 18%, black 78%, transparent)",

          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            textAlign: "center",
            maxWidth: 960,
            mx: "auto",
          }}
        >
          {/* אייקון המותג */}

          <Box
            sx={{
              width: 54,
              height: 54,
              mb: 2,

              display: "grid",
              placeItems: "center",

              borderRadius: 3,

              color: "#FFFFFF",

              background:
                "linear-gradient(135deg, #4F46E5 0%, #7C3AED 55%, #9333EA 100%)",

              boxShadow:
                "0 14px 32px rgba(124, 58, 237, 0.28)",

              animation:
                "welcomeIconFloat 4s ease-in-out infinite",

              "@keyframes welcomeIconFloat": {
                "0%, 100%": {
                  transform: "translateY(0)",
                },

                "50%": {
                  transform: "translateY(-5px)",
                },
              },
            }}
          >
            <TaskAltRounded sx={{ fontSize: 30 }} />
          </Box>

          {/* תגית */}

          <Chip
            icon={<AutoAwesomeRounded />}
            label="מערכת חכמה לניהול משימות"
            sx={{
              mb: 2.5,
              minHeight: 36,
              px: 0.8,

              borderRadius: 999,

              color: "primary.main",
              fontWeight: 800,

              bgcolor: isDark
                ? "rgba(124, 58, 237, 0.13)"
                : "rgba(124, 58, 237, 0.08)",

              border: "1px solid",

              borderColor: isDark
                ? "rgba(167, 139, 250, 0.22)"
                : "rgba(124, 58, 237, 0.16)",

              backdropFilter: "blur(12px)",

              "& .MuiChip-icon": {
                color: "primary.main",
              },
            }}
          />

          {/* כותרת ראשית */}

          <Typography
            component="h1"
            sx={{
              maxWidth: 960,

              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",

              color: "text.primary",

              fontSize: {
                xs: "2.15rem",
                sm: "3rem",
                md: "3.85rem",
              },
            }}
          >
            פחות עומס.{" "}
            <Box
              component="span"
              sx={{
                display: "inline",

                background:
                  "linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              יותר שליטה.
            </Box>
          </Typography>

          {/* תיאור */}

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: 720,
              mt: 2.25,

              lineHeight: 1.75,
              fontWeight: 400,

              fontSize: {
                xs: "0.95rem",
                sm: "1.08rem",
                md: "1.18rem",
              },
            }}
          >
            Task Manager מרכזת את הלוחות, העמודות והמשימות שלכם
            במקום אחד, כדי שתוכלו לעבוד בצורה מסודרת, ברורה
            ויעילה יותר.
          </Typography>

          {/* כפתורי פעולה */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1.5}
            sx={{
              mt: 3.5,

              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<LoginRounded />}
              endIcon={<ArrowBackRounded />}
              onClick={() => navigate(ROUTES.LOGIN)}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 195,
                },

                minHeight: 52,
                px: 3,

                borderRadius: 3,
                fontSize: "0.98rem",
                fontWeight: 850,

                background:
                  "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)",

                boxShadow:
                  "0 14px 30px rgba(124, 58, 237, 0.28)",

                transition:
                  "transform 180ms ease, box-shadow 180ms ease",

                "&:hover": {
                  transform: "translateY(-3px)",

                  background:
                    "linear-gradient(90deg, #4338CA 0%, #6D28D9 100%)",

                  boxShadow:
                    "0 18px 38px rgba(124, 58, 237, 0.36)",
                },
              }}
            >
              התחברות
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<PersonAddRounded />}
              onClick={() => navigate(ROUTES.REGISTER)}
              sx={{
                minWidth: {
                  xs: "100%",
                  sm: 195,
                },

                minHeight: 52,
                px: 3,

                borderRadius: 3,
                fontSize: "0.98rem",
                fontWeight: 850,
                borderWidth: 1.5,

                color: "text.primary",

                bgcolor: isDark
                  ? "rgba(255, 255, 255, 0.025)"
                  : "rgba(255, 255, 255, 0.65)",

                backdropFilter: "blur(12px)",

                transition:
                  "transform 180ms ease, background-color 180ms ease",

                "&:hover": {
                  borderWidth: 1.5,
                  transform: "translateY(-3px)",

                  bgcolor: isDark
                    ? "rgba(124, 58, 237, 0.10)"
                    : "rgba(124, 58, 237, 0.06)",
                },
              }}
            >
              יצירת חשבון
            </Button>
          </Stack>

          {/* יתרונות */}

          <Box
            sx={{
              width: "100%",
              maxWidth: 900,

              display: "grid",

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3,1fr)",
              },

              gap: 2,
              mt: 4,
            }}
          >
            {features.map((feature) => (
              <Box
                key={feature.title}
                sx={{
                  p: 2,

                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,

                  borderRadius: 3,

                  bgcolor: isDark
                    ? "rgba(255,255,255,.03)"
                    : "rgba(255,255,255,.72)",

                  border: "1px solid",

                  borderColor: isDark
                    ? "rgba(255,255,255,.08)"
                    : "rgba(0,0,0,.06)",

                  transition: ".2s",

                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,

                    display: "grid",
                    placeItems: "center",

                    borderRadius: 2,

                    bgcolor: isDark
                      ? "rgba(124,58,237,.12)"
                      : "rgba(124,58,237,.08)",

                    color: "primary.main",
                  }}
                >
                  {feature.icon}
                </Box>

                <Box sx={{textAlign: "right"}}>
                  <Typography
                  sx={{
                     fontWeight:800,
                    mb: 0.4,
                  }} 
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* טכנולוגיות */}

          <Box
            sx={{
              mt: 2,
              pt: 2,

              width: "100%",
              maxWidth: 650,

              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "block",

                mb: 1.5,

                color: "text.secondary",

                letterSpacing: ".15em",

                fontWeight: 800,
              }}
            >
              BUILT WITH
            </Typography>
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
  }}
>
  {["React", "TypeScript", "Firebase", "Material UI"].map((item) => (
    <Typography
      key={item}
      variant="body2"
      sx={{
        fontWeight: 700,
        color: "text.secondary",
      }}
    >
      {item}
    </Typography>
  ))}
</Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default WelcomePage;