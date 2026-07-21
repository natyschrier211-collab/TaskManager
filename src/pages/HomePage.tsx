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
  useTheme,
  Fade,
  Divider,
  Tooltip
} from "@mui/material";

import WelcomePage from "../pages/WelcomePage";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";

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
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { users } = useUsers();
  const { user, userData } = useUser();

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
    raiseSnack: (color: "success" | "error" | "warning" | "info", message: string) => void;
  };

  const {
    tasks, isLoading, error, handleAddNewTask, handleEditTask,
    handleDeleteTask, handleGetTasks, toggleSavedTask, moveTaskToColumn,
  } = useTasks();

  const {
    boards, handleGetBoards, handleAddBoard, handleEditBoard, handleDeleteBoard,
  } = useBoards();

  const {
    columns, handleGetColumns, handleAddColumn, handleEditColumn, handleDeleteColumn,
  } = useColumns();

  const columnIds = useMemo(() => new Set(columns.map((column) => column.id)), [columns]);

  useEffect(() => {
    handleGetTasks();
    handleGetColumns();
    handleGetBoards();
  }, [handleGetTasks, handleGetColumns, handleGetBoards]);

  // קביעת לוח ברירת מחדל אם אין לוח נבחר ויש לוחות זמינים
  useEffect(() => {
    if (boards.length > 0 && !selectedBoardId) {
      setSelectedBoardId(boards[0].id);
    }
  }, [boards, selectedBoardId]);

  const handleOpenEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  const displayedColumns = columns.filter((column) => column.boardId === selectedBoardId);

  const displayedTasks = tasks.filter((task) => {
    const isInSelectedBoard = displayedColumns.some((column) => column.id === task.columnId);
    if (!isInSelectedBoard) return false;
    if (showOnlySaved) return task.savedBy.includes(user?.uid ?? "");
    if (showOnlyMine) return task.assignedUserId === user?.uid;
    return true;
  });

  const handleTaskFabClick = () => {
    if (displayedColumns.length === 0) {
      raiseSnack("warning", "יש ליצור לפחות עמודה אחת לפני הוספת משימה");
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

  const handleColumnSave = (data: Column | Pick<Column, "title">) => {
    if ("id" in data) {
      handleEditColumn(data);
      return;
    }
    if (!selectedBoardId) {
      raiseSnack("warning", "יש לבחור לוח לפני יצירת עמודה");
      return;
    }
    handleAddColumn({ ...data, boardId: selectedBoardId, userId: user?.uid ?? "" });
  };

  const handleBoardSave = (data: Board | Pick<Board, "title">) => {
    if ("id" in data) {
      handleEditBoard(data);
      return;
    }
    handleAddBoard({ ...data, userId: user?.uid ?? "" });
  };

  const handleDeleteBoardClick = (boardId: string) => {
    const hasColumnsInBoard = columns.some((column) => column.boardId === boardId);
    if (hasColumnsInBoard) {
      raiseSnack("warning", "לא ניתן למחוק לוח המכיל עמודות. יש למחוק תחילה את כל העמודות.");
      return;
    }
    handleDeleteBoard(boardId);
  };

  const hasColumns = columns.length > 0;
  const hasBoards = boards.length > 0;

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress size={60} thickness={4} sx={{ color: isDark ? "#A78BFA" : "#4F46E5" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 3, fontSize: "1.1rem" }}>{error}</Alert>
      </Box>
    );
  }

  if (!user) return <WelcomePage />;

  return (
    <Fade in={true} timeout={800}>
      <Box 
        sx={{ 
          minHeight: "100vh",
          background: isDark 
            ? "linear-gradient(135deg, #090E1A 0%, #111827 50%, #1E1B4B 100%)"
            : "#F3F6F9",
          p: { xs: 2, md: 4 }, 
          pb: 16 
        }}
      >
        {/* כותרת הדף */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
               fontWeight:800,
              background: isDark
                ? "linear-gradient(90deg, #60A5FA, #A78BFA)"
                : "linear-gradient(90deg, #2563EB, #6D28D9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1
            }}
          >
            מרחב העבודה שלי
          </Typography>
          <Typography variant="body1" sx={{ color: isDark ? "rgba(255,255,255,0.7)" : "text.secondary", fontWeight: 500, fontSize: "1.1rem" }}>
            נהל את הלוחות, העמודות והמשימות שלך במקום אחד, בקלות וביעילות.
          </Typography>
        </Box>

        {!hasBoards ? (
          /* מצב ריק - כשאין לוחות בכלל */
          <Paper
            elevation={0}
            sx={{
              textAlign: "center",
              py: 10,
              px: 3,
              borderRadius: 4,
              background: isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px dashed rgba(0, 0, 0, 0.2)",
              backdropFilter: isDark ? "blur(10px)" : "none",
            }}
          >
            <Typography variant="h5"  gutterBottom sx={{fontWeight:"bold", color: isDark ? "#fff" : "#111827" }}>
              נראה שאין לך עדיין לוחות עבודה 🚀
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              צור את הלוח הראשון שלך כדי להתחיל לארגן את הפרויקטים שלך.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => { setEditingBoard(undefined); setIsBoardDialogOpen(true); }}
              sx={{
                px: 5, py: 1.5, borderRadius: 3, fontWeight: "bold",
                background: "linear-gradient(90deg, #4F46E5, #7C3AED)",
                boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.39)",
              }}
            >
              יצירת לוח ראשון
            </Button>
          </Paper>
        ) : (
          /* סרגל כלים (לוחות ופילטרים) - עיצוב Glassmorphism */
          <>
            <Paper
              elevation={isDark ? 0 : 2}
              sx={{
                p: 2,
                mb: 4,
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", lg: "center" },
                gap: 3,
                borderRadius: 4,
                background: isDark ? "rgba(255, 255, 255, 0.04)" : "#ffffff",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                backdropFilter: isDark ? "blur(12px)" : "none",
              }}
            >
              {/* אזור בחירת לוחות */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", flex: 1 }}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary", mr: 1, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1 }}>
                  לוחות:
                </Typography>
                
                {boards.map((board) => (
                  <Chip
                    key={board.id}
                    label={board.title}
                    onClick={() => setSelectedBoardId(board.id)}
                    sx={{
                      px: 1,
                      py: 2.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      fontWeight: selectedBoardId === board.id ? "bold" : "normal",
                      background: selectedBoardId === board.id 
                        ? (isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(37, 99, 235, 0.1)")
                        : "transparent",
                      color: selectedBoardId === board.id 
                        ? (isDark ? "#60A5FA" : "#2563EB")
                        : (isDark ? "rgba(255,255,255,0.7)" : "text.secondary"),
                      border: selectedBoardId === board.id 
                        ? `1px solid ${isDark ? "#60A5FA" : "#2563EB"}`
                        : `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                      }
                    }}
                  />
                ))}

                <Tooltip title="הוסף לוח חדש">
                  <IconButton 
                    onClick={() => { setEditingBoard(undefined); setIsBoardDialogOpen(true); }}
                    sx={{ 
                      border: `1px dashed ${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"}`,
                      borderRadius: 2,
                      color: isDark ? "#A78BFA" : "#4F46E5"
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>

                {/* כפתורי עריכה/מחיקה ללוח הפעיל (מופיע רק אם המשתמש הוא הבעלים) */}
                {selectedBoardId && (boards.find(b => b.id === selectedBoardId)?.userId === user?.uid || userData?.role === "admin") && (
                  <Box sx={{ display: "flex", ml: 2, borderRight: 1, borderColor: 'divider', pr: 2 }}>
                    <Tooltip title="ערוך לוח">
                      <IconButton size="small" onClick={() => handleOpenEditBoard(boards.find(b => b.id === selectedBoardId)!)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="מחק לוח">
                      <IconButton size="small" color="error" onClick={() => {
                        if (window.confirm("האם אתה בטוח שברצונך למחוק את הלוח?")) {
                          handleDeleteBoardClick(selectedBoardId);
                        }
                      }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>

              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", lg: "block" } }} />

              {/* אזור פילטרים */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                 <Typography variant="subtitle2" sx={{ color: "text.secondary", mr: 1, fontWeight: "bold" }}>
                  סינון:
                </Typography>
                <Button
                  size="small"
                  startIcon={<FilterListIcon />}
                  variant={!showOnlyMine && !showOnlySaved ? "contained" : "text"}
                  onClick={() => { setShowOnlyMine(false); setShowOnlySaved(false); }}
                  sx={{ borderRadius: 3, color: !showOnlyMine && !showOnlySaved ? "#fff" : "inherit" }}
                >
                  הכל
                </Button>
                <Button
                  size="small"
                  startIcon={<StarIcon sx={{ color: showOnlySaved ? "#FCD34D" : "inherit" }} />}
                  variant={showOnlySaved ? "contained" : "text"}
                  onClick={() => { setShowOnlyMine(false); setShowOnlySaved(true); }}
                  sx={{ borderRadius: 3, color: showOnlySaved ? "#fff" : "inherit" }}
                >
                  שמורות
                </Button>
                <Button
                  size="small"
                  startIcon={<PersonIcon />}
                  variant={showOnlyMine ? "contained" : "text"}
                  onClick={() => { setShowOnlyMine(true); setShowOnlySaved(false); }}
                  sx={{ borderRadius: 3, color: showOnlyMine ? "#fff" : "inherit" }}
                >
                  שלי
                </Button>
              </Box>
            </Paper>

            {/* אזור הקנבן (Kanban Board) */}
            <Box sx={{ display: "flex", alignItems: "flex-start", overflowX: "auto", pb: 2 }}>
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
              
              {/* כפתור הוספת עמודה - יושב ישר בהמשך לעמודות */}
              <Paper
                elevation={0}
                onClick={handleOpenAddColumn}
                sx={{
                  minWidth: 280,
                  height: 60,
                  ml: 2, // מרווח מהעמודה האחרונה
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  borderRadius: 3,
                  background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                  border: `2px dashed ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                    borderColor: isDark ? "#A78BFA" : "#4F46E5",
                  }
                }}
              >
                <AddIcon sx={{ mr: 1, color: isDark ? "#A78BFA" : "#4F46E5" }} />
                <Typography sx={{ fontWeight: "bold", color: isDark ? "#A78BFA" : "#4F46E5" }}>
                  הוסף עמודה חדשה
                </Typography>
              </Paper>
            </Box>
          </>
        )}
{/* כפתורים צפים (FABs) */}
        <Box 
          sx={{ 
            position: "fixed", 
            bottom: { xs: 80, sm: 90 }, // הרמנו את הכפתורים אל מעל הפוטר
            right: { xs: 16, sm: 24 }, 
            display: "flex", 
            gap: 2,
            zIndex: 1100 // מוודא שהכפתורים ירחפו תמיד מעל הפוטר וכל אלמנט אחר
          }}
        >
          <Tooltip title="הוסף עמודה" placement="top">
            <Fab
              color="secondary"
              onClick={handleOpenAddColumn}
              sx={{ boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}
            >
              <ViewColumnIcon />
            </Fab>
          </Tooltip>

          {hasColumns && (
            <Tooltip title={isTaskDialogOpen ? "סגור" : "הוסף משימה חדשה"} placement="top">
              <Fab
                color={isTaskDialogOpen ? "default" : "primary"}
                onClick={handleTaskFabClick}
                sx={{ 
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  background: isTaskDialogOpen ? undefined : "linear-gradient(135deg, #4F46E5, #7C3AED)",
                }}
              >
                {isTaskDialogOpen ? <CloseIcon /> : <AddIcon />}
              </Fab>
            </Tooltip>
          )}
        </Box>

        {/* מודאלים (Dialogs) */}
        {isColumnDialogOpen && (
          <ColumnFormDialog open={isColumnDialogOpen} onClose={() => setIsColumnDialogOpen(false)} initialValues={editingColumn} handleSave={handleColumnSave} />
        )}
        {isTaskDialogOpen && hasColumns && (
          <TaskFormDialog
            open={isTaskDialogOpen}
            onClose={() => { setEditingTask(undefined); setIsTaskDialogOpen(false); }}
            initialValues={editingTask}
            columns={displayedColumns}
            users={users}
            handleSave={(task) => {
              if ("id" in task) handleEditTask(task);
              else handleAddNewTask(task);
              setEditingTask(undefined);
              setIsTaskDialogOpen(false);
            }}
          />
        )}
        {isBoardDialogOpen && (
          <BoardFormDialog open={isBoardDialogOpen} onClose={() => setIsBoardDialogOpen(false)} initialValues={editingBoard} handleSave={handleBoardSave} />
        )}
      </Box>
    </Fade>
  );
}

export default memo(HomePage);