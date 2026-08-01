import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowForwardRounded,
  CalendarTodayRounded,
  DescriptionRounded,
  FlagRounded,
  TaskAltRounded,
} from "@mui/icons-material";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Task } from "../types/Task";

import {
  getPriorityColor,
  getStatusColor,
} from "../utils/tasksHelpers";

import { getTaskById } from "../services/tasksDataServiceFireBase";

function TaskPage() {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleGetTask = useCallback(async () => {
    if (!id) {
      setError("מזהה המשימה אינו תקין.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const savedTask = await getTaskById(id);

      if (!savedTask) {
        setError("המשימה המבוקשת לא נמצאה.");
        return;
      }

      const rawDueDate = savedTask.dueDate as unknown as {
        seconds?: number;
        toDate?: () => Date;
      };

      let convertedDueDate: Date;

      if (rawDueDate instanceof Date) {
        convertedDueDate = rawDueDate;
      } else if (typeof rawDueDate?.toDate === "function") {
        convertedDueDate = rawDueDate.toDate();
      } else if (typeof rawDueDate?.seconds === "number") {
        convertedDueDate = new Date(rawDueDate.seconds * 1000);
      } else {
        convertedDueDate = new Date(savedTask.dueDate as unknown as string);
      }

      setTask({
        ...savedTask,
        dueDate: convertedDueDate,
      });
    } catch (caughtError) {
      console.error(caughtError);
      setError("אירעה שגיאה בטעינת פרטי המשימה.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleGetTask();
  }, [handleGetTask]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 88px)",
          display: "grid",
          placeItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={48} />

          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            טוען את פרטי המשימה...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !task) {
    return (
      <Box
        dir="rtl"
        sx={{
          minHeight: "calc(100vh - 88px)",
          display: "grid",
          placeItems: "center",
          bgcolor: "background.default",
          p: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 520,
          }}
        >
          <Alert
            severity="error"
            sx={{
              mb: 2,
              borderRadius: 3,
            }}
          >
            {error || "המשימה לא נמצאה."}
          </Alert>

          <Button
            variant="outlined"
            startIcon={<ArrowForwardRounded />}
            onClick={() => navigate(-1)}
          >
            חזרה ללוח
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="main"
      dir="rtl"
      sx={{
        minHeight: "calc(100vh - 88px)",
        py: { xs: 3, md: 5 },
        px: 2,

        bgcolor: "background.default",

        backgroundImage: (theme) =>
          theme.palette.mode === "dark"
            ? `
              radial-gradient(
                circle at 15% 10%,
                rgba(124, 58, 237, 0.18),
                transparent 30%
              ),
              radial-gradient(
                circle at 90% 85%,
                rgba(37, 99, 235, 0.10),
                transparent 28%
              )
            `
            : `
              radial-gradient(
                circle at 15% 10%,
                rgba(124, 58, 237, 0.10),
                transparent 30%
              ),
              radial-gradient(
                circle at 90% 85%,
                rgba(37, 99, 235, 0.07),
                transparent 28%
              )
            `,
      }}
    >
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowForwardRounded />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 2.5,
            borderRadius: 2.5,
          }}
        >
          חזרה ללוח
        </Button>

        <Paper
          elevation={0}
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: 4,

            border: "1px solid",
            borderColor: "divider",

            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(15, 23, 42, 0.78)"
                : "rgba(255, 255, 255, 0.94)",

            backdropFilter: "blur(16px)",

            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 24px 60px rgba(0, 0, 0, 0.32)"
                : "0 24px 60px rgba(15, 23, 42, 0.10)",
          }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 3.5 },
              color: "#FFFFFF",

              background:
                "linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #9333EA 100%)",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                letterSpacing: "0.18em",
                opacity: 0.85,
              }}
            >
              פרטי המשימה
            </Typography>

            <Typography
              component="h1"
              sx={{
                mt: 0.8,
                fontWeight: 900,
                lineHeight: 1.2,

                fontSize: {
                  xs: "1.8rem",
                  md: "2.25rem",
                },
              }}
            >
              {task.title}
            </Typography>

            <Box
              sx={{
                mt: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Chip
                icon={<TaskAltRounded />}
                label={task.status}
                color={getStatusColor(task.status)}
                size="small"
                sx={{
                  fontWeight: 800,
                }}
              />

              <Chip
                icon={<FlagRounded />}
                label={task.priority}
                color={getPriorityColor(task.priority)}
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: 800,
                  color: "#FFFFFF",
                  borderColor: "rgba(255, 255, 255, 0.55)",

                  "& .MuiChip-icon": {
                    color: "#FFFFFF",
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 2.5, md: 3.5 },
            }}
          >
            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 850,
                  }}
                >
                  <DescriptionRounded color="primary" />
                  תיאור המשימה
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    minHeight: 100,
                    borderRadius: 3,

                    bgcolor: "action.hover",

                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.9,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {task.description || "לא נוסף תיאור למשימה."}
                  </Typography>
                </Paper>
              </Box>

              <Divider />

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1.5,
                    fontWeight: 850,
                  }}
                >
                  מידע נוסף
                </Typography>

                <Box
                  sx={{
                    display: "grid",

                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, minmax(0, 1fr))",
                    },

                    gap: 1.5,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mb: 1,
                        fontWeight: 700,
                      }}
                    >
                      סטטוס
                    </Typography>

                    <Chip
                      icon={<TaskAltRounded />}
                      label={task.status}
                      color={getStatusColor(task.status)}
                      size="small"
                    />
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mb: 1,
                        fontWeight: 700,
                      }}
                    >
                      עדיפות
                    </Typography>

                    <Chip
                      icon={<FlagRounded />}
                      label={task.priority}
                      color={getPriorityColor(task.priority)}
                      size="small"
                      variant="outlined"
                    />
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,

                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,

                      border: "1px solid",
                      borderColor: "divider",

                      gridColumn: {
                        xs: "span 1",
                        sm: "span 2",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 2.5,

                        color: "primary.main",
                        bgcolor: "rgba(124, 58, 237, 0.11)",
                      }}
                    >
                      <CalendarTodayRounded />
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: "block",
                          mb: 0.3,
                          fontWeight: 700,
                        }}
                      >
                        תאריך יעד
                      </Typography>

                      <Typography sx={{ fontWeight: 800 }}>
                        {task.dueDate.toLocaleDateString("he-IL")}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>

              <Box
                sx={{
                  pt: 2.5,
                  borderTop: "1px solid",
                  borderColor: "divider",

                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",

                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },

                  gap: 1,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  מזהה משימה: {task.id}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Task Manager • 2026
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default TaskPage;