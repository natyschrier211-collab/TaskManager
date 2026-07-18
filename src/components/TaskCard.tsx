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
  const { user } = useUser();
  console.log("users", users);
  const navigate = useNavigate();

  const isSaved =
  !!user && task.savedBy.includes(user.uid);

  const assignedUser = users.find(
  (u) => u.id === task.assignedUserId
);
 
  return (
    <Card
      sx={{
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "background.paper",
      }}
      elevation={3}
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

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {task.description}
            {assignedUser && (
  <Typography
    variant="caption"
    color="primary"
    sx={{ mt: 1 }}
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
          </Box>

        <Box>
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