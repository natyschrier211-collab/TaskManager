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
       <Container maxWidth="lg" dir="rtl">
  <Paper
    elevation={0}
    sx={{
      overflow: "hidden",
      borderRadius: 6,
      background: isDark
        ? "rgba(255,255,255,.04)"
        : "#ffffff",

      border: isDark
        ? "1px solid rgba(255,255,255,.08)"
        : "1px solid rgba(0,0,0,.05)",

      backdropFilter: "blur(18px)",
      p: {
        xs: 4,
        md: 6,
      },
    }}
  >
    <Box
      sx={{
        textAlign: "center",
        mb: 6,
      }}
    >
      <Box
        sx={{
          width: 90,
          height: 90,
          mx: "auto",
          mb: 3,

          borderRadius: 4,

          display: "grid",
          placeItems: "center",

          background:
            "linear-gradient(135deg,#4F46E5,#7C3AED)",

          color: "#fff",

          boxShadow:
            "0 18px 40px rgba(124,58,237,.35)",
        }}
      >
        <TaskAltIcon sx={{ fontSize: 48 }} />
      </Box>

      <Typography
        variant="overline"
        sx={{
          color: "primary.main",
          fontWeight: 800,
          letterSpacing: "3px",
        }}
      >
        TASK MANAGER
      </Typography>

      <Typography
        variant="h2"
        sx={{
          mt: 2,
          mb: 2,
          fontWeight: 900,

          fontSize: {
            xs: "2.3rem",
            md: "3.5rem",
          },
        }}
      >
        אודות המערכת
      </Typography>

      <Typography
        sx={{
          maxWidth: 720,
          mx: "auto",

          color: "text.secondary",

          lineHeight: 1.9,

          fontSize: {
            xs: "1rem",
            md: "1.15rem",
          },
        }}
      >
        Task Manager נבנתה כדי להפוך את ניהול
        המשימות, הלוחות והפרויקטים לפשוט,
        מהיר ונוח יותר.
      </Typography>
    </Box>
    <Grid container spacing={3}>
  {features.map((feature, index) => (
    <Grid
      key={index}
      size={{
        xs: 12,
        md: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,

          height: "100%",

          bgcolor: isDark
            ? "rgba(255,255,255,.03)"
            : "#fff",

          border: "1px solid",

          borderColor: "divider",

          transition: ".25s",

          "&:hover": {
            transform: "translateY(-5px)",

            boxShadow:
              "0 20px 40px rgba(124,58,237,.12)",
          },
        }}
      >
        <CheckCircleOutlinedIcon
          sx={{
            fontSize: 34,

            color: "primary.main",

            mb: 2,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,

            color: "text.primary",
          }}
    
         
        >
          {feature.title}
        </Typography>

        <Typography
          color="text.secondary"
         
        >
          {feature.desc}
        </Typography>
      </Paper>
    </Grid>
  ))}
</Grid>
{/* OUR VISION */}

<Box
  sx={{
    mt: 8,
    mb: 8,
    p: {
      xs: 4,
      md: 6,
    },

    borderRadius: 5,

    textAlign: "center",

    background: isDark
      ? "rgba(255,255,255,.03)"
      : "rgba(124,58,237,.04)",

    border: "1px solid",

    borderColor: "divider",
  }}
>
  <Typography
    variant="overline"
    sx={{
      color: "primary.main",
      letterSpacing: "3px",
      fontWeight: 800,
    }}
  >
    החזון שלנו
  </Typography>

  <Typography
    variant="h3"
    sx={{
      mt: 2,
      mb: 3,
      fontWeight: 900,

      fontSize: {
        xs: "2rem",
        md: "2.7rem",
      },
    }}
  >
    להפוך ניהול משימות
    <br />
    לפשוט יותר.
  </Typography>

  <Typography
    sx={{
      maxWidth: 760,
      mx: "auto",
      color: "text.secondary",
      lineHeight: 2,
      fontSize: {
        xs: "1rem",
        md: "1.12rem",
      },
    }}
  >
    אנחנו מאמינים שניהול נכון של משימות צריך להיות ברור,
    נעים ומהיר. לכן יצרנו מערכת שמרכזת את כל הלוחות,
    המשימות והפרויקטים במקום אחד, עם ממשק מודרני,
    נוח לשימוש ומותאם לעבודה יומיומית.
  </Typography>
</Box>

{/* WHY CHOOSE US */}

<Typography
  variant="h4"
  sx={{
    textAlign: "center",
    fontWeight: 900,
    mb: 5,
  }}
>
  למה לבחור בנו?
</Typography>

<Grid container spacing={3}>
  {[
    {
      number: "01",
      title: "מהירות",
      text: "יצירת לוחות ומשימות תוך שניות.",
    },
    {
      number: "02",
      title: "פשטות",
      text: "ממשק נקי שקל ללמוד ולעבוד איתו.",
    },
    {
      number: "03",
      title: "אבטחה",
      text: "הנתונים נשמרים בצורה מאובטחת בענן.",
    },
    {
      number: "04",
      title: "זמינות",
      text: "גישה למערכת מכל מקום ובכל זמן.",
    },
  ].map((item) => (
    <Grid
      key={item.number}
      size={{
        xs: 12,
        sm: 6,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,

          borderRadius: 4,

          height: "100%",

          border: "1px solid",

          borderColor: "divider",

          transition: ".25s",

          "&:hover": {
            transform: "translateY(-6px)",

            boxShadow:
              "0 20px 45px rgba(124,58,237,.14)",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "2.2rem",
            fontWeight: 900,
            color: "primary.main",
            mb: 1,
          }}
        >
          {item.number}
        </Typography>

        <Typography
          variant="h6"
        >
          {item.title}
        </Typography>

        <Typography color="text.secondary">
          {item.text}
        </Typography>
      </Paper>
    </Grid>
  ))}
</Grid>
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