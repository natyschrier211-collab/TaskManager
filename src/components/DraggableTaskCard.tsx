import { Box, IconButton } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useDraggable } from "@dnd-kit/react";
import { memo } from "react";
import type { Column } from "../types/Column";
import type { Task } from "../types/Task";
import TaskCard from "./TaskCard";
import type { User } from "../types/User";

interface DraggableTaskCardProps {
  task: Task;
  columns: Column[];
    users: User[];
  onEditTask: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
 toggleSavedTask: (id: string) => void;

}

function DraggableTaskCard({
  task,
  columns,
  users,
  onEditTask,
  handleDeleteTask,
  toggleSavedTask,
}: DraggableTaskCardProps) {
  const { ref, handleRef, isDragging } = useDraggable({
    id: task.id,
    data: { columnId: task.columnId },
  });

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        gap: 0.5,
        alignItems: "flex-start",
      }}
    >
      <IconButton
        ref={handleRef}
        size="small"
        sx={{
          mt: 1,
          cursor: "grab",
        }}
      >
        <DragIndicatorIcon />
      </IconButton>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <TaskCard
          task={task}
          columns={columns}
          users={users}
          onEditTask={onEditTask}
          handleDeleteTask={handleDeleteTask}
          toggleSavedTask={toggleSavedTask}
        />
      </Box>
    </Box>
  );
}

export default memo(DraggableTaskCard);