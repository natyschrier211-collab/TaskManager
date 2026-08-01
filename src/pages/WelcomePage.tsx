import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import {
  ArrowBackRounded,
  AutoAwesomeRounded,
  CloudDoneRounded,
  DashboardCustomizeRounded,
  DevicesRounded,
  LoginRounded,
  PersonAddRounded,
  SecurityRounded,

} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import ROUTES from "../router/routes";

function WelcomePage() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const features = [
    {
      title: "ניהול חכם",
      description: "לוחות, עמודות ומשימות במקום אחד.",
      icon: <DashboardCustomizeRounded />,
      color: "#7C3AED",
      background: "rgba(124, 58, 237, 0.12)",
    },
    {
      title: "שמירה בענן",
      description: "כל הנתונים נשמרים ומסתנכרנים בצורה מאובטחת.",
      icon: <CloudDoneRounded />,
      color: "#2563EB",
      background: "rgba(37, 99, 235, 0.12)",
    },
    {
      title: "גישה מכל מכשיר",
      description: "עבודה נוחה מהמחשב, הטאבלט או הטלפון.",
      icon: <DevicesRounded />,
      color: "#059669",
      background: "rgba(5, 150, 105, 0.12)",
    },
  ];

  return (
    <Box
      component="main"
      sx={{
        minHeight: "calc(100vh - 88px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        py: {
          xs: 5,
          md: 8,
        },
        bgcolor: "background.default",

        backgroundImage: isDark
          ? `
            radial-gradient(
              circle at 10% 15%,
              rgba(124, 58, 237, 0.22),
              transparent 32%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(37, 99, 235, 0.14),
              transparent 30%
            )
          `
          : `
            radial-gradient(
              circle at 10% 15%,
              rgba(124, 58, 237, 0.13),
              transparent 32%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(37, 99, 235, 0.09),
              transparent 30%
            )
          `,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          top: -170,
          right: -130,
          bgcolor: "primary.main",
          opacity: isDark ? 0.12 : 0.08,
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          bottom: -170,
          left: -110,
          bgcolor: "secondary.main",
          opacity: isDark ? 0.1 : 0.07,
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: {
              xs: 4,
              md: 6,
            },

            border: "1px solid",
            borderColor: isDark
              ? "rgba(148, 163, 184, 0.16)"
              : "rgba(15, 23, 42, 0.08)",

            bgcolor: isDark
              ? "rgba(15, 23, 42, 0.78)"
              : "rgba(255, 255, 255, 0.92)",

            backdropFilter: "blur(18px)",

            boxShadow: isDark
              ? "0 32px 90px rgba(0, 0, 0, 0.38)"
              : "0 32px 90px rgba(15, 23, 42, 0.12)",

            animation: "welcomeEnter 700ms ease both",

            "@keyframes welcomeEnter": {
              from: {
                opacity: 0,
                transform: "translateY(24px)",
              },

              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <Grid container>
            <Grid
              size={{
                xs: 12,
                lg: 7,
              }}
              sx={{
                p: {
                  xs: 3,
                  sm: 5,
                  md: 7,
                },

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Chip
                icon={<AutoAwesomeRounded />}
                label="מערכת חכמה לניהול משימות"
                sx={{
                  alignSelf: "flex-start",
                  mb: 3,
                  px: 1,
                  py: 2.3,
                  borderRadius: 3,
                  fontWeight: 800,
                  color: "primary.main",
                  bgcolor: "rgba(124, 58, 237, 0.10)",
                  border: "1px solid rgba(124, 58, 237, 0.16)",
                }}
              />

              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                  color: "text.primary",
                  mb: 3,

                  fontSize: {
                    xs: "2.45rem",
                    sm: "3.4rem",
                    md: "4.5rem",
                  },
                }}
              >
                ניהול המשימות שלך
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    background:
                      "linear-gradient(90deg, #4F46E5 0%, #7C3AED 55%, #9333EA 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  מתחיל כאן
                </Box>
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: 720,
                  lineHeight: 1.9,
                  mb: 4,
                  fontWeight: 400,

                  fontSize: {
                    xs: "1rem",
                    sm: "1.15rem",
                    md: "1.3rem",
                  },
                }}
              >
                נהלו לוחות, עמודות, משימות ופרויקטים במערכת אחת
                מהירה, מודרנית ומאובטחת — מכל מקום ובכל מכשיר.
              </Typography>

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
                sx={{
                  mb: 4,
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
                      sm: 190,
                    },

                    minHeight: 54,
                    borderRadius: 3,
                    fontWeight: 850,
                    fontSize: "1rem",

                    background:
                      "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)",

                    boxShadow:
                      "0 14px 32px rgba(124, 58, 237, 0.30)",

                    "&:hover": {
                      transform: "translateY(-3px)",

                      background:
                        "linear-gradient(90deg, #4338CA 0%, #6D28D9 100%)",

                      boxShadow:
                        "0 20px 40px rgba(124, 58, 237, 0.38)",
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
                      sm: 190,
                    },

                    minHeight: 54,
                    borderRadius: 3,
                    fontWeight: 850,
                    fontSize: "1rem",
                    borderWidth: 1.5,

                    "&:hover": {
                      borderWidth: 1.5,
                      transform: "translateY(-3px)",
                      bgcolor: "rgba(124, 58, 237, 0.06)",
                    },
                  }}
                >
                  הרשמה
                </Button>
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.2,
                }}
              >
                <Chip
                  icon={<SecurityRounded />}
                  label="התחברות מאובטחת"
                  variant="outlined"
                />

                <Chip
                  icon={<CloudDoneRounded />}
                  label="שמירה בענן"
                  variant="outlined"
                />

                <Chip
                  icon={<DevicesRounded />}
                  label="מותאם לכל מכשיר"
                  variant="outlined"
                />
              </Box>
            </Grid>

                    <Grid
              size={{
                xs: 12,
                lg: 5,
              }}
              sx={{
                p: {
                  xs: 3,
                  md: 5,
                },

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 430,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",

                    bgcolor: isDark
                      ? "rgba(2,6,23,.55)"
                      : "#fff",

                    backdropFilter: "blur(16px)",

                    boxShadow: isDark
                      ? "0 24px 55px rgba(0,0,0,.35)"
                      : "0 24px 55px rgba(15,23,42,.08)",
                  }}
                >
                  {/* Header */}

                  <Box
                    sx={{
                      px: 3,
                      py: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      
                    >
                      סביבת העבודה
                    </Typography>

                    <Chip
                      label="LIVE"
                      color="success"
                      size="small"
                    />
                  </Box>

                  {/* Stats */}

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(2,1fr)",
                      gap: 2,
                      p: 3,
                    }}
                  >
                    {[
                      {
                        value: "12",
                        label: "משימות",
                      },
                      {
                        value: "4",
                        label: "לוחות",
                      },
                      {
                        value: "28",
                        label: "הושלמו",
                      },
                      {
                        value: "99%",
                        label: "זמינות",
                      },
                    ].map((item) => (
                      <Paper
                        key={item.label}
                        elevation={0}
                        sx={{
                          p: 2,
                          textAlign: "center",
                          borderRadius: 3,
                          bgcolor:
                            "action.hover",
                        }}
                      >
                        <Typography
                          variant="h4"
                          color="primary.main"
                        >
                          {item.value}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {item.label}
                        </Typography>
                      </Paper>
                    ))}
                  </Box>

                  {/* Features */}

                  <Box
                    sx={{
                      px: 3,
                      pb: 3,
                    }}
                  >
                    <Stack spacing={2}>
                      {features.map(
                        (feature) => (
                          <Paper
                            key={feature.title}
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: 3,

                              display: "flex",
                              gap: 2,

                              alignItems:
                                "center",

                              transition:
                                ".25s",

                              "&:hover": {
                                transform:
                                  "translateY(-2px)",

                                bgcolor:
                                  "action.hover",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                width: 52,
                                height: 52,

                                borderRadius: 3,

                                bgcolor:
                                  feature.background,

                                color:
                                  feature.color,

                                display: "grid",
                                placeItems:
                                  "center",

                                "& svg": {
                                  fontSize: 28,
                                },
                              }}
                            >
                              {feature.icon}
                            </Box>

                            <Box>
                              <Typography
                        
                              >
                                {feature.title}
                              </Typography>

                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {
                                  feature.description
                                }
                              </Typography>
                            </Box>
                          </Paper>
                        ),
                      )}
                    </Stack>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default WelcomePage;