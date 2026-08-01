import { Box, IconButton, Paper, Typography, useTheme } from "@mui/material"; // ייבאנו את useTheme
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useDroppable } from "@dnd-kit/react";
import { memo } from "react";
import type { Column as ColumnType } from "../types/Column";
import type { Task } from "../types/Task";
import DraggableTaskCard from "./DraggableTaskCard";
import type { User } from "../types/User";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  columns: ColumnType[];
  users: User[];
  onEditColumn: (column: ColumnType) => void;
  onDeleteColumn: (id: string) => void;
  onEditTask: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
  toggleSavedTask: (id: string) => void;
}

function Column({
  column,
  tasks,
  columns,
  users,
  onEditColumn,
  onDeleteColumn,
  onEditTask,
  handleDeleteTask,
  toggleSavedTask,
}: ColumnProps) {
  // שולפים את מצב הלילה מהעיצוב
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { ref, isDropTarget } = useDroppable({
    id: column.id,
  });

  return (
    <Paper
      elevation={0}
      sx={{
        minWidth: 330,
        maxWidth: 320,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        // התאמת הרקע של העמודה למצב לילה
        bgcolor: isDropTarget
          ? (isDark ? "rgba(124, 58, 237, 0.15)" : "rgba(124, 58, 237, 0.08)")
          : (isDark ? "rgba(255, 255, 255, 0.03)" : "background.paper"),
        borderRadius: 4,
        border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
        transition: "all 0.25s ease",
        boxShadow: isDark ? "none" : "0 8px 24px rgba(0,0,0,0.08)",
        backdropFilter: isDark ? "blur(10px)" : "none",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderBottom: 1,
          borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "divider", // קו מותאם למצב לילה
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: 0,
          }}
        >
          <Typography variant="h6" noWrap sx={{ color: isDark ? "#ffffff" : "text.primary" }}>
            {column.title}
          </Typography>

          <Box
            component="span"
            sx={{
              minWidth: 26,
              height: 26,
              px: 0.8,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: isDark ? "rgba(167, 139, 250, 0.15)" : "rgba(124, 58, 237, 0.1)", // התאמת צבע הרקע של מונה המשימות
              color: isDark ? "#A78BFA" : "primary.main", // התאמת צבע המספר עצמו
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            {tasks.length}
          </Box>
        </Box>

        <Box>
          <IconButton
            size="small"
            onClick={() => onEditColumn(column)}
            sx={{ color: isDark ? "rgba(255,255,255,0.7)" : "inherit" }} // התאמת צבע העיפרון
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => {
              if (window.confirm("האם אתה בטוח שברצונך למחוק את העמודה?")) {
                onDeleteColumn(column.id);
              }
            }}
          >
            <ClearIcon
              fontSize="small"
              sx={{ color: isDark ? "#EF4444" : "error.main" }} // צבע אדום ברור יותר בלילה
            />
          </IconButton>
        </Box>
      </Box>

      {/* אזור המשימות - התיקון המרכזי כאן! */}
      <Box
        ref={ref}
        sx={{
          p: 1.5,
          // מחליפים את grey.50 ברקע כהה במצב לילה
          bgcolor: isDark ? "rgba(0, 0, 0, 0.2)" : "grey.50",
          flex: 1,
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          borderRadius: "0 0 16px 16px", // כדי שהפינות התחתונות יהיו עגולות ויפות
        }}
      >
        {tasks.length ? (
          tasks.map((task) => (
            <DraggableTaskCard
              key={task.id}
              task={task}
              columns={columns}
              users={users}
              onEditTask={onEditTask}
              handleDeleteTask={handleDeleteTask}
              toggleSavedTask={toggleSavedTask}
            />
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{ 
              textAlign: "center", 
              py: 4,
              color: isDark ? "rgba(255, 255, 255, 0.5)" : "text.secondary" // מוודאים שהטקסט בולט מספיק
            }}
          >
            אין משימות בעמודה
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default memo(Column);