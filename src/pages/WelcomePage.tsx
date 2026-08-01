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

  return (
    <Box
      component="main"
      dir="rtl"
      sx={{
        minHeight: "calc(100vh - 72px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.default",
        py: {
          xs: 6,
          md: 9,
        },

        backgroundImage: isDark
          ? `
            radial-gradient(
              circle at 15% 20%,
              rgba(124, 58, 237, 0.20),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(147, 51, 234, 0.12),
              transparent 28%
            )
          `
          : `
            radial-gradient(
              circle at 15% 20%,
              rgba(124, 58, 237, 0.12),
              transparent 30%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(147, 51, 234, 0.08),
              transparent 28%
            )
          `,
      }}
    >
      {/* אור סגול עליון */}

      <Box
        sx={{
          position: "absolute",
          width: 430,
          height: 430,
          borderRadius: "50%",
          top: -250,
          right: -160,
          bgcolor: "primary.main",
          opacity: isDark ? 0.13 : 0.08,
          filter: "blur(75px)",
          pointerEvents: "none",
        }}
      />

      {/* אור סגול תחתון */}

      <Box
        sx={{
          position: "absolute",
          width: 390,
          height: 390,
          borderRadius: "50%",
          bottom: -240,
          left: -150,
          bgcolor: "secondary.main",
          opacity: isDark ? 0.11 : 0.07,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* קווי רקע עדינים */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: isDark ? 0.035 : 0.028,

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
            "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
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
            maxWidth: 980,
            mx: "auto",
          }}
        >
          {/* אייקון מותג */}

          <Box
            sx={{
              width: 72,
              height: 72,
              mb: 3,

              display: "grid",
              placeItems: "center",

              borderRadius: 4,

              color: "#FFFFFF",

              background:
                "linear-gradient(135deg, #4F46E5 0%, #7C3AED 55%, #9333EA 100%)",

              boxShadow:
                "0 20px 45px rgba(124, 58, 237, 0.32)",

              animation:
                "welcomeIconFloat 4s ease-in-out infinite",

              "@keyframes welcomeIconFloat": {
                "0%, 100%": {
                  transform: "translateY(0)",
                },

                "50%": {
                  transform: "translateY(-7px)",
                },
              },
            }}
          >
            <TaskAltRounded sx={{ fontSize: 38 }} />
          </Box>

          {/* תגית */}

          <Chip
            icon={<AutoAwesomeRounded />}
            label="מערכת חכמה לניהול משימות"
            sx={{
              mb: 3,
              minHeight: 38,
              px: 1,

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

          {/* כותרת */}

          <Typography
            component="h1"
            sx={{
              maxWidth: 960,

              fontWeight: 950,
              lineHeight: 1.03,
              letterSpacing: "-0.045em",

              color: "text.primary",

              fontSize: {
                xs: "2.7rem",
                sm: "4rem",
                md: "5.4rem",
              },
            }}
          >
            פחות עומס.
            <Box
              component="span"
              sx={{
                display: "block",
                mt: 0.5,

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
              maxWidth: 760,
              mt: 3,
              lineHeight: 1.9,
              fontWeight: 400,

              fontSize: {
                xs: "1rem",
                sm: "1.15rem",
                md: "1.3rem",
              },
            }}
          >
            Task Manager מרכזת את הלוחות, העמודות והמשימות
            שלכם במקום אחד — כדי שתוכלו לעבוד בצורה מסודרת,
            ברורה ויעילה יותר.
          </Typography>

          {/* כפתורים */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            sx={{
              mt: 5,
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
                  sm: 205,
                },

                minHeight: 56,
                px: 3.5,

                borderRadius: 3,
                fontSize: "1rem",
                fontWeight: 850,

                background:
                  "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)",

                boxShadow:
                  "0 16px 34px rgba(124, 58, 237, 0.30)",

                transition:
                  "transform 180ms ease, box-shadow 180ms ease",

                "&:hover": {
                  transform: "translateY(-3px)",

                  background:
                    "linear-gradient(90deg, #4338CA 0%, #6D28D9 100%)",

                  boxShadow:
                    "0 22px 44px rgba(124, 58, 237, 0.38)",
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
                  sm: 205,
                },

                minHeight: 56,
                px: 3.5,

                borderRadius: 3,
                fontSize: "1rem",
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
                sm: "repeat(3, minmax(0, 1fr))",
              },

              gap: 2,
              mt: 7,
            }}
          >
            {[
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
            ].map((feature) => (
              <Box
                key={feature.title}
                sx={{
                  p: 2.5,

                  display: "flex",
                  alignItems: "center",
                  gap: 1.7,

                  textAlign: "right",

                  borderRadius: 3,

                  bgcolor: isDark
                    ? "rgba(15, 23, 42, 0.42)"
                    : "rgba(255, 255, 255, 0.58)",

                  border: "1px solid",
                  borderColor: isDark
                    ? "rgba(148, 163, 184, 0.13)"
                    : "rgba(15, 23, 42, 0.07)",

                  backdropFilter: "blur(14px)",

                  transition:
                    "transform 180ms ease, border-color 180ms ease",

                  "&:hover": {
                    transform: "translateY(-3px)",

                    borderColor: isDark
                      ? "rgba(167, 139, 250, 0.30)"
                      : "rgba(124, 58, 237, 0.20)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,

                    display: "grid",
                    placeItems: "center",

                    borderRadius: 2.5,

                    color: "primary.main",

                    bgcolor: isDark
                      ? "rgba(124, 58, 237, 0.14)"
                      : "rgba(124, 58, 237, 0.09)",

                    "& svg": {
                      fontSize: 24,
                    },
                  }}
                >
                  {feature.icon}
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 850,
                      mb: 0.3,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                    }}
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
              mt: 6,
              pt: 4,

              width: "100%",
              maxWidth: 760,

              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mb: 2,

                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              נבנה באמצעות
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: {
                  xs: 2,
                  sm: 4,
                },
              }}
            >
              {[
                "React",
                "TypeScript",
                "Firebase",
                "Material UI",
              ].map((technology) => (
                <Typography
                  key={technology}
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 750,
                  }}
                >
                  {technology}
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