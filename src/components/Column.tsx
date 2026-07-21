import { Box, IconButton, Paper, Typography } from "@mui/material";
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
       bgcolor: isDropTarget
  ? "rgba(124, 58, 237, 0.08)"
  : "background.paper",borderRadius: 4,
        transition: "all 0.25s ease",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        "&:hover": {
  transform: "translateY(-4px)",
},
      }}
    >
      
      <Box
        sx={{
          p: 1.5,
          borderBottom: 1,
          borderColor: "divider",
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
  
  <Typography variant="h6" noWrap>
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
      bgcolor: "rgba(124, 58, 237, 0.1)",
      color: "primary.main",
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
              sx={{ color: "error.main" }}
            />
          </IconButton>
        </Box>
      </Box>

      <Box
        ref={ref}
        sx={{
          p: 1.5,
          bgcolor: "grey.50",
          flex: 1,
          minHeight: 200,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
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
            color="text.secondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            אין משימות בעמודה
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default memo(Column);