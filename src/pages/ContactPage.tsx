import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
  Fade,
  Container,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ContactPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [status, setStatus] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.");
  };

  // סגנון מותאם לשדות הקלט לפי ערכת הנושא (כמו בעמוד ההרשמה)
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
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          minHeight: "calc(100vh - 90px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isDark
            ? "linear-gradient(135deg, #090E1A 0%, #111827 50%, #1E1B4B 100%)"
            : "linear-gradient(135deg, #F3F6F9 0%, #FFFFFF 50%, #E7EBF0 100%)",
          py: 6,
          px: 2,
        }}
      >
        <Container maxWidth="sm" dir="rtl">
          <Paper
            elevation={isDark ? 0 : 4}
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 4,
              background: isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
              backdropFilter: isDark ? "blur(12px)" : "none",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h3"
                component="h1"
               
                sx={{
                   fontWeight:"800",
                  background: isDark
                    ? "linear-gradient(90deg, #60A5FA, #A78BFA)"
                    : "linear-gradient(90deg, #2563EB, #6D28D9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                צרו קשר
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: isDark ? "rgba(255,255,255,0.7)" : "text.secondary" }}
              >
                יש לכם שאלה? צריכים עזרה עם המערכת? אנחנו כאן בשבילכם.
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="שם מלא"
                    variant="outlined"
                    required
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="אימייל"
                    type="email"
                    variant="outlined"
                    required
                    sx={textFieldStyles}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="הודעה"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                    sx={textFieldStyles}
                  />
                </Grid>

                {status && (
                  <Grid size={12}>
                    <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
                      {status}
                    </Alert>
                  </Grid>
                )}

                <Grid size={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    endIcon={<SendIcon sx={{ transform: "rotate(180deg)", ml: 1 }} />}
                    sx={{
                      py: 1.5,
                      mt: 1,
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
                    שליחת הודעה
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </Fade>
  );
};

export default ContactPage;