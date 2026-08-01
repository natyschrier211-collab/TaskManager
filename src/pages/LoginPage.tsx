import {
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { Link, Navigate } from "react-router-dom";

import { useUser } from "../providers/UserProvider";
import ROUTES from "../router/routes";

type LoginFormData = {
  email: string;
  password: string;
};

const loginSchema = Joi.object<LoginFormData>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "אימייל הוא שדה חובה",
      "string.email": "כתובת האימייל אינה תקינה",
      "any.required": "אימייל הוא שדה חובה",
    }),

  password: Joi.string().min(6).required().messages({
    "string.empty": "סיסמה היא שדה חובה",
    "string.min": "הסיסמה חייבת להכיל לפחות 6 תווים",
    "any.required": "סיסמה היא שדה חובה",
  }),
});

function LoginPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: joiResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      await login(data.email, data.password);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      minHeight: 56,
      borderRadius: 3,

      backgroundColor: isDark
        ? "rgba(255, 255, 255, 0.035)"
        : "rgba(248, 250, 252, 0.9)",

      transition:
        "background-color 180ms ease, box-shadow 180ms ease",

      "& fieldset": {
        borderColor: isDark
          ? "rgba(148, 163, 184, 0.22)"
          : "rgba(15, 23, 42, 0.12)",
      },

      "&:hover": {
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 0.055)"
          : "#FFFFFF",
      },

      "&:hover fieldset": {
        borderColor: "primary.light",
      },

      "&.Mui-focused": {
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 0.06)"
          : "#FFFFFF",

        boxShadow: "0 0 0 4px rgba(124, 58, 237, 0.12)",
      },

      "&.Mui-focused fieldset": {
        borderWidth: 1.5,
        borderColor: "primary.main",
      },
    },

    "& .MuiInputLabel-root": {
      color: "text.secondary",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "primary.main",
    },

    "& .MuiFormHelperText-root": {
      mx: 0.5,
      mt: 0.8,
    },
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "calc(100vh - 88px)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        py: { xs: 4, md: 7 },
        bgcolor: "background.default",

        backgroundImage: isDark
          ? `
            radial-gradient(
              circle at 12% 18%,
              rgba(124, 58, 237, 0.20),
              transparent 32%
            ),
            radial-gradient(
              circle at 90% 82%,
              rgba(99, 102, 241, 0.15),
              transparent 30%
            )
          `
          : `
            radial-gradient(
              circle at 12% 18%,
              rgba(124, 58, 237, 0.12),
              transparent 32%
            ),
            radial-gradient(
              circle at 90% 82%,
              rgba(99, 102, 241, 0.09),
              transparent 30%
            )
          `,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: { xs: 4, md: 6 },

            border: "1px solid",
            borderColor: isDark
              ? "rgba(148, 163, 184, 0.16)"
              : "rgba(15, 23, 42, 0.08)",

            backgroundColor: isDark
              ? "rgba(15, 23, 42, 0.84)"
              : "rgba(255, 255, 255, 0.94)",

            backdropFilter: "blur(18px)",

            boxShadow: isDark
              ? "0 32px 80px rgba(0, 0, 0, 0.38)"
              : "0 32px 80px rgba(15, 23, 42, 0.12)",
          }}
        >
          <Grid container>
            <Grid
              size={{ xs: 12, md: 5 }}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",

                p: {
                  xs: 4,
                  sm: 5,
                  md: 6,
                },

                minHeight: {
                  xs: 330,
                  md: 620,
                },

                color: "#FFFFFF",

                background:
                  "linear-gradient(145deg, #4F46E5 0%, #7C3AED 48%, #9333EA 100%)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: 260,
                  height: 260,
                  borderRadius: "50%",

                  backgroundColor:
                    "rgba(255, 255, 255, 0.12)",

                  filter: "blur(8px)",
                  top: -100,
                  left: -70,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  width: 220,
                  height: 220,
                  borderRadius: "50%",

                  border:
                    "1px solid rgba(255, 255, 255, 0.18)",

                  bottom: -90,
                  right: -70,
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    width: 58,
                    height: 58,
                    borderRadius: 3.5,

                    display: "grid",
                    placeItems: "center",

                    mb: 4,

                    backgroundColor:
                      "rgba(255, 255, 255, 0.15)",

                    border:
                      "1px solid rgba(255, 255, 255, 0.2)",

                    backdropFilter: "blur(10px)",
                  }}
                >
                  <LoginRoundedIcon sx={{ fontSize: 32 }} />
                </Box>

                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.15,
                    mb: 2,

                    fontSize: {
                      xs: "2.2rem",
                      md: "3rem",
                    },
                  }}
                >
                  ברוכים השבים
                  <br />
                  למרחב העבודה שלכם
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    maxWidth: 430,
                    lineHeight: 1.8,

                    color:
                      "rgba(255, 255, 255, 0.78)",

                    fontWeight: 400,
                  }}
                >
                  התחברו לחשבון והמשיכו לנהל את הלוחות,
                  המשימות והפרויקטים שלכם במקום אחד.
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,

                  display: {
                    xs: "none",
                    md: "flex",
                  },

                  flexDirection: "column",
                  gap: 2,
                  mt: 6,
                }}
              >
                {[
                  "התחברות מאובטחת באמצעות Firebase",
                  "סנכרון המידע בענן בזמן אמת",
                  "גישה למשימות מכל מכשיר",
                ].map((text) => (
                  <Box
                    key={text}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        fontSize: 22,

                        color:
                          "rgba(255, 255, 255, 0.9)",
                      }}
                    />

                    <Typography
                      variant="body1"
                      sx={{
                        color:
                          "rgba(255, 255, 255, 0.9)",

                        fontWeight: 500,
                      }}
                    >
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Typography
                variant="caption"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  mt: 5,

                  color:
                    "rgba(255, 255, 255, 0.65)",
                }}
              >
                Task Manager • Welcome back
              </Typography>
            </Grid>

                  <Grid
              size={{ xs: 12, md: 7 }}
              sx={{
                p: {
                  xs: 3,
                  sm: 5,
                  md: 6,
                },
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    color: "text.primary",
                    mb: 1,
                  }}
                >
                  התחברות
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  התחברו לחשבון שלכם והמשיכו בדיוק מהמקום שבו
                  הפסקתם.
                </Typography>
              </Box>

              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <TextField
                    {...register("email")}
                    label="כתובת אימייל"
                    type="email"
                    autoComplete="email"
                    fullWidth
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    sx={inputStyles}
                  />

                  <TextField
                    {...register("password")}
                    label="סיסמה"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    sx={inputStyles}
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      minHeight: 56,
                      mt: 1,
                      borderRadius: 3,
                      fontWeight: 800,
                      fontSize: "1rem",
                      background:
                        "linear-gradient(90deg,#4F46E5 0%,#7C3AED 100%)",
                      boxShadow:
                        "0 14px 30px rgba(124,58,237,.28)",

                      transition:
                        "transform .2s ease, box-shadow .2s ease",

                      "&:hover": {
                        transform: "translateY(-2px)",
                        background:
                          "linear-gradient(90deg,#4338CA 0%,#6D28D9 100%)",
                        boxShadow:
                          "0 18px 38px rgba(124,58,237,.36)",
                      },

                      "&.Mui-disabled": {
                        color: "rgba(255,255,255,.7)",
                        background:
                          "linear-gradient(90deg,#6366F1,#8B5CF6)",
                      },
                    }}
                  >
                    {isSubmitting
                      ? "מתחבר..."
                      : "התחברות"}
                  </Button>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  pt: 3,
                  textAlign: "center",
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  עדיין אין לכם חשבון?{" "}
                  <MuiLink
                    component={Link}
                    to={ROUTES.REGISTER}
                    underline="none"
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,

                      "&:hover": {
                        color: "primary.dark",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    צרו חשבון חדש
                  </MuiLink>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;