import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  useTheme,
  Fade,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const AboutPage: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const features = [
    { title: "ניהול חכם", desc: "מעקב אחר משימות בצורה חכמה ויעילה." },
    { title: "סדרי עדיפויות", desc: "הגדרת לוחות זמנים וסדרי עדיפויות בקליק." },
    { title: "ממשק נקי", desc: "חוויית משתמש פשוטה, מודרנית ואינטואיטיבית." },
    { title: "פרודוקטיביות", desc: "סנכרון מלא שנועד להגביר את ההספק שלך." },
  ];

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
        <Container maxWidth="md" dir="rtl">
          <Paper
            elevation={isDark ? 0 : 4}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
              backdropFilter: isDark ? "blur(12px)" : "none",
              textAlign: "center",
            }}
          >
            {/* כותרת ואייקון עליון */}
            <Box sx={{ mb: 4 }}>
              <TaskAltIcon
                sx={{
                  fontSize: 56,
                  color: isDark ? "#A78BFA" : "#4F46E5",
                  mb: 2,
                }}
              />
              <Typography
                variant="h3"
                component="h1"
            
                sx={{
                   fontWeight: "800",
                  background: isDark
                    ? "linear-gradient(90deg, #60A5FA, #A78BFA)"
                    : "linear-gradient(90deg, #2563EB, #6D28D9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                אודות המערכת שלנו
              </Typography>
            </Box>

            {/* פסקאות תיאור */}
            <Box sx={{ maxWidth: 700, mx: "auto", mb: 6 }}>
              <Typography
                variant="body1"
                sx={{
                  color: isDark ? "rgba(255,255,255,0.8)" : "text.secondary",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  mb: 2,
                }}
              >
                ברוכים הבאים למערכת ניהול המשימות שלנו. המטרה המרכזית שעמדה לנגד
                עינינו בפיתוח המערכת היא להעניק לכם כלי פשוט ויעיל לעשות סדר
                בבלאגן, כדי שתוכלו להתמקד במה שבאמת חשוב.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: isDark ? "rgba(255,255,255,0.8)" : "text.secondary",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                }}
              >
                בין אם מדובר בפרויקטים אישיים, ניהול משימות שוטף או עבודה צוותית,
                המערכת שלנו תעזור לכם לוודא ששום משימה לא נופלת בין הכיסאות.
              </Typography>
            </Box>

            {/* רשימת יתרונות - בעיצוב גריד חדש */}
            <Box
              sx={{
                mt: 5,
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                background: isDark
                  ? "rgba(0, 0, 0, 0.2)"
                  : "rgba(79, 70, 229, 0.04)",
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"
                }`,
              }}
            >
              <Typography
                variant="h5"
                
                sx={{ color: isDark ? "#fff" : "#111827", mb: 4,fontWeight: "bold"}}
              >
                מה אנחנו מציעים?
              </Typography>
              
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        textAlign: "right",
                        gap: 2,
                        p: 2,
                        borderRadius: 3,
                        transition: "transform 0.2s ease, background 0.2s ease",
                        "&:hover": {
                          background: isDark
                            ? "rgba(255,255,255,0.05)"
                            : "#ffffff",
                          transform: "translateY(-3px)",
                          boxShadow: isDark
                            ? "none"
                            : "0 4px 12px rgba(0,0,0,0.05)",
                        },
                      }}
                    >
                 <CheckCircleOutlinedIcon
  sx={{ color: isDark ? "#60A5FA" : "#4F46E5", mt: 0.5 }}
/>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "1.05rem",
                            fontWeight: "bold",
                            color: isDark ? "#fff" : "#111827",
                            mb: 0.5,
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: isDark
                              ? "rgba(255,255,255,0.6)"
                              : "text.secondary",
                          }}
                        >
                          {feature.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Fade>
  );
};

export default AboutPage;