import { Box } from "@mui/material";
import { DragDropProvider } from "@dnd-kit/react";
import { memo } from "react";
import type { Column as ColumnType } from "../types/Column";
import type { Task } from "../types/Task";
import type { User } from "../types/User";
import Column from "./Column";

// 1. ייבוא ספק המשתמש לבדיקת הרשאות
import { useUser } from "../providers/UserProvider";

interface KanbanBoardProps {
  columns: ColumnType[];
  tasks: Task[];
  columnIds: Set<string>;
  onMoveTask: (taskId: string, columnId: string) => void;
  onEditColumn: (column: ColumnType) => void;
  onDeleteColumn: (id: string) => void;
  onEditTask: (data: Task) => void;
  handleDeleteTask: (id: string) => void;
  toggleSavedTask: (id: string) => void;
  users: User[];
}

function KanbanBoard({
  columns,
  tasks,
  users,
  columnIds,
  onMoveTask,
  onEditColumn,
  onDeleteColumn,
  onEditTask,
  handleDeleteTask,
  toggleSavedTask,
}: KanbanBoardProps) {
  
  // 2. שולפים את המשתמש הנוכחי ואת התפקיד שלו
  const { user, userData } = useUser();

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const taskId = event.operation.source?.id;
        const targetId = event.operation.target?.id;

        if (
          taskId == null ||
          targetId == null ||
          !columnIds.has(String(targetId))
        ) {
          return;
        }

        // ==========================================
        // 3. חסימת גרירה למי שאין לו הרשאה
        // ==========================================
        
        // מוצאים את המשימה שכרגע מנסים לגרור מתוך מערך המשימות שלנו
        const draggedTask = tasks.find((t) => t.id === String(taskId));
        
        if (draggedTask) {
          // בודקים אם המשתמש הוא היוצר של המשימה או מנהל מערכת
          const canMove = draggedTask.userId === user?.uid || userData?.role === "admin";
          
          if (!canMove) {
            // חותכים את הפונקציה ולא מפעילים את onMoveTask
            console.warn("אין לך הרשאה להעביר משימה זו");
            return;
          }
        }
        // ==========================================

        onMoveTask(String(taskId), String(targetId));
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 2,
          alignItems: "flex-start",
        }}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter((t) => t.columnId === column.id)}
            columns={columns}
            users={users}
            onEditColumn={onEditColumn}
            onDeleteColumn={onDeleteColumn}
            onEditTask={onEditTask}
            handleDeleteTask={handleDeleteTask}
            toggleSavedTask={toggleSavedTask}
          />
        ))}
      </Box>
    </DragDropProvider>
  );
}

export default memo(KanbanBoard);