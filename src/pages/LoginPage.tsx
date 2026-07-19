import { 
  Box, Button, TextField, Typography, Container, Paper, useTheme, Link as MuiLink
} from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../router/routes";
import { Navigate, Link } from "react-router-dom";

// 1. הגדרת סכימת הולידציה
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "אימייל הוא שדה חובה",
      "string.email": "כתובת האימייל אינה תקינה",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "סיסמה היא שדה חובה",
      "string.min": "הסיסמה חייבת להכיל לפחות 6 תווים",
    }),
});

function LoginPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // 2. חיבור ה-Resolver ל-useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });
  
  const { login, user } = useUser();
  
  const onSubmit = async (data: any) => {
    await login(data.email, data.password);
    console.log("Form Data:", data);
  };

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // סטייל מותאם לשדות קלט לפי ערכת הנושא (זהה לעמוד ההרשמה)
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: isDark ? "#fff" : "inherit",
      "& fieldset": {
        borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
      },
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "rgba(255, 255, 255, 0.7)" : "inherit",
    },
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "calc(100vh - 90px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark
          ? "linear-gradient(135deg, #090E1A 0%, #111827 50%, #1E1B4B 100%)"
          : "linear-gradient(135deg, #F3F6F9 0%, #FFFFFF 50%, #E7EBF0 100%)",
        py: 4,
        px: 2,
      }}
    >
      <Paper
        elevation={isDark ? 0 : 4}
        sx={{
          p: { xs: 4, md: 5 },
          width: "100%",
          maxWidth: 450, // צר יותר מעמוד ההרשמה למראה ממוקד
          background: isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
          borderRadius: 4,
          backdropFilter: isDark ? "blur(10px)" : "none",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
           
            sx={{
              color: isDark ? "#fff" : "#111827",
              mb: 1,
            }}
          >
            ברוך שובך
          </Typography>
          <Typography variant="body1" sx={{ color: isDark ? "rgba(255,255,255,0.6)" : "text.secondary" }}>
            התחבר לחשבון שלך כדי לנהל את המשימות
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            
            {/* שדה אימייל */}
            <TextField
              {...register("email")}
              label="אימייל"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message as string}
              sx={textFieldStyles}
            />

            {/* שדה סיסמה */}
            <TextField
              {...register("password")}
              label="סיסמה"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message as string}
              sx={textFieldStyles}
            />

            {/* כפתור התחברות */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              sx={{
                mt: 1,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                borderRadius: 3,
                background: "linear-gradient(90deg, #4F46E5, #7C3AED)",
                boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.39)",
                "&:hover": {
                  background: "linear-gradient(90deg, #4338CA, #6D28D9)",
                  boxShadow: "0 6px 20px rgba(79, 70, 229, 0.23)",
                },
              }}
            >
              התחברות
            </Button>
          </Box>
        </form>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" sx={{ color: isDark ? "rgba(255,255,255,0.7)" : "text.secondary" }}>
            עדיין אין לך חשבון?{" "}
            <MuiLink
              component={Link}
              to={ROUTES.REGISTER}
              sx={{
                color: isDark ? "#A78BFA" : "#4F46E5",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              הירשם עכשיו
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;