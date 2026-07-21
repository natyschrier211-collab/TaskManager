import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";

import { memo } from "react";
import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import type { Column } from "../types/Column";
import type { Task } from "../types/Task";
import type { User } from "../types/User";

import ROUTES from "../router/routes";
import { useUser } from "../providers/UserProvider";

interface TaskProps {
  task: Task;
  columns: Column[];
  users: User[];
  onEditTask: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
  toggleSavedTask: (id: string) => void;
}

function TaskCard({
  task,
  users,
  onEditTask,
  handleDeleteTask,
  toggleSavedTask,
}: TaskProps) {
  // מושכים גם את userData כדי שנוכל לבדוק תפקיד (Role)
  const { user, userData } = useUser();
  const navigate = useNavigate();

  const isSaved = !!user && task.savedBy.includes(user.uid);

  const assignedUser = users.find((u) => u.id === task.assignedUserId);

  // בדיקת הרשאות: האם המשתמש הוא היוצר של המשימה או אדמין
  const canEditOrDelete = task.userId === user?.uid || userData?.role === "admin";

  return (
    <Card
      sx={{
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
      }}
      elevation={0}
    >
      <CardActionArea
        onClick={() => {
          navigate(ROUTES.TASK_PAGE + task.id);
        }}
      >
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {task.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {task.description}
            {assignedUser && (
              <Typography
                variant="caption"
                color="primary"
                sx={{ mt: 1, display: "block" }} // הוספנו display: block כדי שיירד שורה
              >
                👤 {assignedUser.firstName} {assignedUser.lastName}
              </Typography>
            )}
          </Typography>
        </CardContent>

        <Box sx={{ p: 2, pt: 0 }}>
          <Chip
            label={task.status}
            color={task.status === "completed" ? "success" : "warning"}
            variant="filled"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>
      </CardActionArea>

      {/* האזור התחתון של הכרטיסייה מוצג רק למשתמשים מחוברים */}
      {user && (
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box>
            {/* מציגים את הפח והעיפרון רק אם יש הרשאה */}
            {canEditOrDelete && (
              <>
                <IconButton
                  onClick={() => onEditTask(task)}
                  aria-label="Edit task"
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label="Delete task"
                >
                  <ClearIcon sx={{ color: "red" }} />
                </IconButton>
              </>
            )}
          </Box>

          <Box>
            {/* כפתור השמירה נשאר גלוי לכולם */}
            <IconButton onClick={() => toggleSavedTask(task.id)}>
              {isSaved ? (
                <BookmarkIcon color="primary" />
              ) : (
                <BookmarkBorderIcon />
              )}
            </IconButton>
          </Box>
        </CardActions>
      )}
    </Card>
  );
}

export default memo(TaskCard);