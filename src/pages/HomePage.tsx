import { useEffect, useState, memo, useContext, useMemo } from "react";
import {
  Box,
  Fab,
  Typography,
  Button,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import TaskFormDialog from "../components/TaskFormDialog";
import ColumnFormDialog from "../components/ColumnFormDialog";
import BoardFormDialog from "../components/BoardFormDialog";
import KanbanBoard from "../components/KanbanBoard";

import useTasks from "../hooks/useTasks";
import useColumns from "../hooks/useColumns";
import useBoards from "../hooks/useBoards";
import useUsers from "../hooks/useUsers";

import { SnackContext } from "../providers/SnackProvider";
import { useUser } from "../providers/UserProvider";

import type { Column } from "../types/Column";
import type { Board } from "../types/Board";
import type { Task } from "../types/Task";

function HomePage() {
  const { users } = useUsers();
  const { user } = useUser();

  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
  const [isBoardDialogOpen, setIsBoardDialogOpen] = useState(false);

  const [editingBoard, setEditingBoard] = useState<Board | undefined>();
  const [editingColumn, setEditingColumn] = useState<Column | undefined>();
const [editingTask, setEditingTask] = useState<Task | undefined>();

  const { raiseSnack } = useContext(SnackContext) as {
    raiseSnack: (
      color: "success" | "error" | "warning" | "info",
      message: string,
    ) => void;
  };

  const {
    tasks,
    isLoading,
    error,
    handleAddNewTask,
    handleEditTask,
    handleDeleteTask,
    handleGetTasks,
    toggleSavedTask,
    moveTaskToColumn,
  } = useTasks();

  const {
    boards,
    handleGetBoards,
    handleAddBoard,
    handleEditBoard,
    handleDeleteBoard,
  } = useBoards();

  const {
    columns,
    handleGetColumns,
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
  } = useColumns();

  const columnIds = useMemo(
    () => new Set(columns.map((column) => column.id)),
    [columns],
  );

  useEffect(() => {
    handleGetTasks();
    handleGetColumns();
    handleGetBoards();
  }, [handleGetTasks, handleGetColumns, handleGetBoards]);

const handleOpenEditTask = (task: Task) => {
  setEditingTask(task);
  setIsTaskDialogOpen(true);
};

  const displayedColumns = columns.filter(
    (column) => column.boardId === selectedBoardId,
  );

  const displayedTasks = tasks.filter((task) => {
    const isInSelectedBoard = displayedColumns.some(
      (column) => column.id === task.columnId,
    );

    if (!isInSelectedBoard) {
      return false;
    }
if (showOnlySaved) {
  return task.savedBy.includes(user?.uid ?? "");
}

   if (showOnlyMine) {
  return task.assignedUserId === user?.uid;
}

    return true;
  });

  const handleTaskFabClick = () => {
    if (displayedColumns.length === 0) {
      raiseSnack(
        "warning",
        "יש ליצור לפחות עמודה אחת לפני הוספת משימה",
      );
      return;
    }

    setIsTaskDialogOpen((previous) => !previous);
  };

  const handleOpenAddColumn = () => {
    setEditingColumn(undefined);
    setIsColumnDialogOpen(true);
  };

  const handleOpenEditBoard = (board: Board) => {
    setEditingBoard(board);
    setIsBoardDialogOpen(true);
  };

  const handleOpenEditColumn = (column: Column) => {
    setEditingColumn(column);
    setIsColumnDialogOpen(true);
  };

  const handleColumnSave = (
    data: Column | Pick<Column, "title">,
  ) => {
    if ("id" in data) {
      handleEditColumn(data);
      return;
    }

    if (!selectedBoardId) {
      raiseSnack("warning", "יש לבחור לוח לפני יצירת עמודה");
      return;
    }

    handleAddColumn({
      ...data,
      boardId: selectedBoardId,
      userId: user?.uid ?? "",
    });
  };

  const handleBoardSave = (
    data: Board | Pick<Board, "title">,
  ) => {
    if ("id" in data) {
      handleEditBoard(data);
      return;
    }

    handleAddBoard({
      ...data,
      userId: user?.uid ?? "",
    });
  };

  const hasColumns = columns.length > 0;
  const hasBoards = boards.length > 0;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          p: 2,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
const handleDeleteBoardClick = (boardId: string) => {
  const hasColumnsInBoard = columns.some(
    (column) => column.boardId === boardId
  );

  if (hasColumnsInBoard) {
    raiseSnack(
      "warning",
      "לא ניתן למחוק לוח המכיל עמודות. יש למחוק תחילה את כל העמודות."
    );
    return;
  }

  handleDeleteBoard(boardId);
};
  return (
    <Box sx={{ p: 3, pb: 10 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Home page
      </Typography>

      {!hasBoards ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" gutterBottom>
            אין לוחות — צור לוח ראשון כדי להתחיל
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingBoard(undefined);
              setIsBoardDialogOpen(true);
            }}
            sx={{ mt: 2 }}
          >
            צור לוח ראשון
          </Button>
        </Box>
      ) : (
        <>
        <Box
  sx={{
    display: "flex",
    gap: 2,
    mb: 3,
  }}
>
  <Button
    variant={!showOnlyMine && !showOnlySaved ? "contained" : "outlined"}
    onClick={() => {
      setShowOnlyMine(false);
      setShowOnlySaved(false);
    }}
    sx={{
      borderRadius: 3,
      px: 3,
    }}
  >
    כל המשימות
  </Button>

  <Button
    variant={showOnlySaved ? "contained" : "outlined"}
    onClick={() => {
      setShowOnlyMine(false);
      setShowOnlySaved(true);
    }}
    sx={{
      borderRadius: 3,
      px: 3,
    }}
  >
    ⭐ משימות שמורות
  </Button>

  <Button
    variant={showOnlyMine ? "contained" : "outlined"}
    onClick={() => {
      setShowOnlyMine(true);
      setShowOnlySaved(false);
    }}
    sx={{
      borderRadius: 3,
      px: 3,
    }}
  >
    המשימות שלי
  </Button>
</Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              mb: 3,
            }}
          >
            {boards.map((board) => (
              <Box
                key={board.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Chip
                  label={board.title}
                  color={
                    selectedBoardId === board.id
                      ? "primary"
                      : "default"
                  }
                  variant={
                    selectedBoardId === board.id
                      ? "filled"
                      : "outlined"
                  }
                  onClick={() => setSelectedBoardId(board.id)}
                  clickable
                />

                {board.userId === user?.uid && (
                  <>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEditBoard(board)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                  onClick={() => {
  if (window.confirm("האם אתה בטוח שברצונך למחוק את הלוח?")) {
    handleDeleteBoardClick(board.id);
  }
}}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Box>
            ))}
          </Box>

          <Chip
            label="+ לוח חדש"
            color="success"
            clickable
            onClick={() => {
              setEditingBoard(undefined);
              setIsBoardDialogOpen(true);
            }}
          />

          <KanbanBoard
            columns={displayedColumns}
            tasks={displayedTasks}
            columnIds={columnIds}
            users={users}
            onMoveTask={moveTaskToColumn}
            onEditColumn={handleOpenEditColumn}
            onDeleteColumn={handleDeleteColumn}
          onEditTask={handleOpenEditTask}
            handleDeleteTask={handleDeleteTask}
            toggleSavedTask={toggleSavedTask}
          />

          <Paper
            elevation={1}
            sx={{
              mt: 2,
              p: 2,
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",
              border: 1,
              borderStyle: "dashed",
              borderColor: "divider",
            }}
            onClick={handleOpenAddColumn}
          >
            <ViewColumnIcon sx={{ mr: 1 }} color="action" />

            <Typography color="text.secondary">
              + הוסף עמודה
            </Typography>
          </Paper>
        </>
      )}

      <Fab
        color="secondary"
        aria-label="add column"
        onClick={handleOpenAddColumn}
        sx={{
          position: "fixed",
          bottom: 16,
          right: hasColumns ? 88 : 16,
        }}
      >
        <ViewColumnIcon />
      </Fab>

      {hasColumns && user && (
        <Fab
          color={isTaskDialogOpen ? "secondary" : "primary"}
          aria-label="add task"
          onClick={handleTaskFabClick}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          {isTaskDialogOpen ? <CloseIcon /> : <AddIcon />}
        </Fab>
      )}

      {isColumnDialogOpen && (
        <ColumnFormDialog
          open={isColumnDialogOpen}
          onClose={() => setIsColumnDialogOpen(false)}
          initialValues={editingColumn}
          handleSave={handleColumnSave}
        />
      )}

{isTaskDialogOpen && hasColumns && (
<TaskFormDialog
  open={isTaskDialogOpen}
  onClose={() => {
    setEditingTask(undefined);
    setIsTaskDialogOpen(false);
  }}
  initialValues={editingTask}
  columns={displayedColumns}
  users={users}
  handleSave={(task) => {
    if ("id" in task) {
      handleEditTask(task);
    } else {
      handleAddNewTask(task);
    }

    setEditingTask(undefined);
    setIsTaskDialogOpen(false);
  }}
/>
)}
      {isBoardDialogOpen && (
        <BoardFormDialog
          open={isBoardDialogOpen}
          onClose={() => setIsBoardDialogOpen(false)}
          initialValues={editingBoard}
          handleSave={handleBoardSave}
        />
      )}
    </Box>
  );
}

export default memo(HomePage);