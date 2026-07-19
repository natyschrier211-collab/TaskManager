
import { 
  Box, Button, TextField, Typography, Container, Paper, Grid, useTheme, Link as MuiLink
} from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useUser } from "../providers/UserProvider";
import { Navigate, Link } from "react-router-dom";
import ROUTES from "../router/routes";

const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "שם פרטי הוא שדה חובה",
    "string.min": "שם פרטי חייב להכיל לפחות 2 תווים",
    "any.required": "שם פרטי הוא שדה חובה",
  }),

  lastName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "שם משפחה הוא שדה חובה",
    "string.min": "שם משפחה חייב להכיל לפחות 2 תווים",
    "any.required": "שם משפחה הוא שדה חובה",
  }),

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

  phone: Joi.string()
    .pattern(/^[0-9\-\+]{9,15}$/)
    .required()
    .messages({
      "string.empty": "מספר טלפון הוא שדה חובה",
      "string.pattern.base": "מספר הטלפון אינו תקין",
      "any.required": "מספר טלפון הוא שדה חובה",
    }),

  address: Joi.string().min(5).required().messages({
    "string.empty": "כתובת מגורים היא שדה חובה",
    "string.min": "הכתובת חייבת להיות מפורטת יותר",
    "any.required": "כתובת מגורים היא שדה חובה",
  }),
});

function RegisterPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(userSchema),
  });

  const { signup, user } = useUser();

  const onSubmit = (data: any) => {
    signup(data);
    console.log("Form Data:", data);
  };

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // סטייל מותאם לשדות קלט לפי ערכת הנושא
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
          maxWidth: 600, // קצת יותר רחב כדי לאפשר שדות זה לצד זה
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
            יצירת משתמש חדש
          </Typography>
          <Typography variant="body1" sx={{ color: isDark ? "rgba(255,255,255,0.6)" : "text.secondary" }}>
            הצטרפו אלינו והתחילו לנהל את המשימות שלכם
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* שורה ראשונה: שם פרטי ושם משפחה */}
            <Grid >
              <TextField
                {...register("firstName")}
                label="שם פרטי"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message as string}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid >
              <TextField
                {...register("lastName")}
                label="שם משפחה"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message as string}
                sx={textFieldStyles}
              />
            </Grid>

            {/* שורה שנייה: אימייל וסיסמה */}
            <Grid >
              <TextField
                {...register("email")}
                label="אימייל"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message as string}
                sx={textFieldStyles}
              />
            </Grid>
            <Grid >
              <TextField
                {...register("password")}
                label="סיסמה"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message as string}
                sx={textFieldStyles}
              />
            </Grid>

            {/* שורה שלישית: טלפון */}
            <Grid >
              <TextField
                {...register("phone")}
                label="מספר טלפון"
                type="tel"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message as string}
                sx={textFieldStyles}
              />
            </Grid>

            {/* שורה רביעית: כתובת */}
            <Grid >
              <TextField
                {...register("address")}
                label="כתובת מגורים"
                multiline
                rows={2}
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message as string}
                sx={textFieldStyles}
              />
            </Grid>

            {/* כפתור שליחה */}
            <Grid  sx={{ mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                size="large"
                sx={{
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
                הרשמה
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" sx={{ color: isDark ? "rgba(255,255,255,0.7)" : "text.secondary" }}>
            כבר יש לך חשבון?{" "}
            <MuiLink
              component={Link}
              to={ROUTES.LOGIN}
              sx={{
                color: isDark ? "#A78BFA" : "#4F46E5",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              התחבר כאן
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterPage;