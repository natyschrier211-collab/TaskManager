import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Fab,
  Fade,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AddTaskRoundedIcon from "@mui/icons-material/AddTaskRounded";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";

import {
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import WelcomePage from "../pages/WelcomePage";

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

  const [selectedBoardId, setSelectedBoardId] = useState<
    string | null
  >(null);

  const [isTaskDialogOpen, setIsTaskDialogOpen] =
    useState(false);

  const [isColumnDialogOpen, setIsColumnDialogOpen] =
    useState(false);

  const [isBoardDialogOpen, setIsBoardDialogOpen] =
    useState(false);

  const [editingBoard, setEditingBoard] = useState<
    Board | undefined
  >();

  const [editingColumn, setEditingColumn] = useState<
    Column | undefined
  >();

  const [editingTask, setEditingTask] = useState<
    Task | undefined
  >();

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
    if (!user) return;

    handleGetTasks();
    handleGetColumns();
    handleGetBoards();
  }, [
    user,
    handleGetTasks,
    handleGetColumns,
    handleGetBoards,
  ]);

  useEffect(() => {
    if (
      !selectedBoardId &&
      boards.length > 0
    ) {
      setSelectedBoardId(boards[0].id);
    }
  }, [boards, selectedBoardId]);

  const selectedBoard = useMemo(
    () =>
      boards.find(
        (board) => board.id === selectedBoardId,
      ),
    [boards, selectedBoardId],
  );

  const displayedColumns = useMemo(
    () =>
      columns.filter(
        (column) =>
          column.boardId === selectedBoardId,
      ),
    [columns, selectedBoardId],
  );

  const displayedTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const isInSelectedBoard =
          displayedColumns.some(
            (column) =>
              column.id === task.columnId,
          );

        if (!isInSelectedBoard) {
          return false;
        }

        if (showOnlySaved) {
          return task.savedBy.includes(
            user?.uid ?? "",
          );
        }

        if (showOnlyMine) {
          return (
            task.assignedUserId === user?.uid
          );
        }

        return true;
      }),
    [
      tasks,
      displayedColumns,
      showOnlySaved,
      showOnlyMine,
      user?.uid,
    ],
  );

  const totalSavedTasks = useMemo(
    () =>
      tasks.filter((task) =>
        task.savedBy.includes(user?.uid ?? ""),
      ).length,
    [tasks, user?.uid],
  );

  const totalMyTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.assignedUserId === user?.uid,
      ).length,
    [tasks, user?.uid],
  );

  const handleOpenEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleTaskFabClick = () => {
    if (displayedColumns.length === 0) {
      raiseSnack(
        "warning",
        "יש ליצור לפחות עמודה אחת לפני הוספת משימה."
      );

      return;
    }

    setEditingTask(undefined);
    setIsTaskDialogOpen(
      (previous) => !previous,
    );
  };

  const handleOpenAddColumn = () => {
    if (!selectedBoardId) {
      raiseSnack(
        "warning",
        "Select a board before creating a column.",
      );

      return;
    }

    setEditingColumn(undefined);
    setIsColumnDialogOpen(true);
  };

  const handleOpenEditBoard = (
    board: Board,
  ) => {
    setEditingBoard(board);
    setIsBoardDialogOpen(true);
  };

  const handleOpenEditColumn = (
    column: Column,
  ) => {
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
      raiseSnack(
        "warning",
        "יש לבחור לוח לפני יצירת עמודה.",
      );

      return;
    }

    handleAddColumn({
      ...data,
      boardId: selectedBoardId,
      userId: user?.uid ?? "",
    });
  };

const handleBoardSave = async (
  data: Board | Pick<Board, "title">,
) => {
  if ("id" in data) {
    handleEditBoard(data);
    return;
  }

  const newBoard = await handleAddBoard({
    ...data,
    userId: user?.uid ?? "",
  });

  if (newBoard) {
    setSelectedBoardId(newBoard.id);
  }
};
  const handleDeleteBoardClick = (
    boardId: string,
  ) => {
    const hasColumnsInBoard = columns.some(
      (column) =>
        column.boardId === boardId,
    );

    if (hasColumnsInBoard) {
      raiseSnack(
        "warning",
        "יש למחוק את כל העמודות לפני מחיקת הלוח.",
      );

      return;
    }

    handleDeleteBoard(boardId);

    if (selectedBoardId === boardId) {
      setSelectedBoardId(null);
    }
  };

  const hasColumns = displayedColumns.length > 0;
  const hasBoards = boards.length > 0;

  if (!user) {
    return <WelcomePage />;
  }

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
          <CircularProgress
            size={56}
            thickness={4}
          />

          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
          >
           טוען את סביבת העבודה...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 88px)",
          display: "grid",
          placeItems: "center",
          p: 3,
          bgcolor: "background.default",
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{
            maxWidth: 600,
            width: "100%",
            borderRadius: 3,
          }}
        >
          {error}
        </Alert>
      </Box>
    );
  }

  const statCards = [
  {
    label: "לוחות",
    value: boards.length,
    icon: <DashboardRoundedIcon />,
    color: "#7C3AED",
    background: "rgba(124, 58, 237, 0.12)",
  },
  {
    label: "משימות",
    value: tasks.length,
    icon: <AssignmentRoundedIcon />,
    color: "#2563EB",
    background: "rgba(37, 99, 235, 0.12)",
  },
  {
    label: "שמורות",
    value: totalSavedTasks,
    icon: <BookmarkRoundedIcon />,
    color: "#D97706",
    background: "rgba(217, 119, 6, 0.12)",
  },
  {
    label: "המשימות שלי",
    value: totalMyTasks,
    icon: <AccountCircleRoundedIcon />,
    color: "#059669",
    background: "rgba(5, 150, 105, 0.12)",
  },
];
  return (
    <Fade in timeout={650}>
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 88px)",
          position: "relative",
          overflow: "hidden",
          px: { xs: 2, sm: 3, lg: 4 },
          py: { xs: 3, md: 4 },
          pb: 14,

          bgcolor: "background.default",

          backgroundImage: isDark
            ? `
              radial-gradient(
                circle at 10% 0%,
                rgba(124, 58, 237, 0.17),
                transparent 28%
              ),
              radial-gradient(
                circle at 95% 25%,
                rgba(37, 99, 235, 0.10),
                transparent 25%
              )
            `
            : `
              radial-gradient(
                circle at 10% 0%,
                rgba(124, 58, 237, 0.10),
                transparent 28%
              ),
              radial-gradient(
                circle at 95% 25%,
                rgba(37, 99, 235, 0.07),
                transparent 25%
              )
            `,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1700,
            mx: "auto",
          }}
        >
          {/* PAGE HEADER */}

          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
              gap: 3,
              mb: 4,
            }}
          >
            <Box>
            <Typography
  variant="body2"
  sx={{
    mb: 1,
    color: "primary.main",
    fontWeight: 800,
    letterSpacing: "0.08em",
  }}
>
  טוב לראות אותך, {userData?.firstName ?? "משתמש"} 👋
</Typography>

<Typography
  variant="h3"
  component="h1"
  sx={{
    fontWeight: 850,
    lineHeight: 1.12,
    mb: 1,
    color: "text.primary",
    fontSize: {
      xs: "2.2rem",
      md: "3rem",
    },
  }}
>
  לוח ניהול המשימות
</Typography>

<Typography
  color="text.secondary"
  sx={{
    maxWidth: 700,
    fontSize: {
      xs: "0.95rem",
      md: "1.05rem",
    },
    lineHeight: 1.7,
  }}
>
  נהל את הלוחות, העמודות והמשימות שלך בצורה פשוטה,
  מהירה ומסודרת – הכול במקום אחד.
</Typography>
</Box>

            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
        {boards.length > 0 && (
  <Button
    variant="outlined"
    startIcon={<ViewColumnIcon />}
    onClick={handleOpenAddColumn}
    sx={{
      minHeight: 46,
      px: 2.5,
      borderRadius: 3,
    }}
  >
    הוסף עמודה
  </Button>
)}

              <Button
                variant="contained"
                startIcon={<AddTaskRoundedIcon />}
                onClick={() => {
                  setEditingBoard(undefined);
                  setIsBoardDialogOpen(true);
                }}
                sx={{
                  minHeight: 40,
                  px: 1.5,
                  borderRadius: 3,
                "& .MuiButton-startIcon": {
  marginInlineEnd: 0.5,
},
                  background:
                    "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)",

                  boxShadow:
                    "0 12px 28px rgba(124, 58, 237, 0.25)",

                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #4338CA 0%, #6D28D9 100%)",

                    boxShadow:
                      "0 16px 34px rgba(124, 58, 237, 0.34)",
                  },
                }}
              >
                 צור לוח 
              </Button>
            </Box>
          </Box>

          {/* STATISTICS */}

          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                md: "repeat(4, minmax(0, 1fr))",
              },

              gap: { xs: 1.5, md: 2 },
              mb: 4,
            }}
          >
            {statCards.map((stat) => (
              <Paper
                key={stat.label}
                elevation={0}
                sx={{
                  p: { xs: 2, md: 2.5 },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 4,

                  backgroundColor: isDark
                    ? "rgba(15, 23, 42, 0.72)"
                    : "rgba(255, 255, 255, 0.88)",

                  backdropFilter: "blur(14px)",

                  border: "1px solid",
                  borderColor: "divider",

                  boxShadow: isDark
                    ? "0 16px 40px rgba(0, 0, 0, 0.20)"
                    : "0 16px 40px rgba(15, 23, 42, 0.06)",

                  transition:
                    "transform 180ms ease, box-shadow 180ms ease",

                  "&:hover": {
                    transform: "translateY(-3px)",

                    boxShadow: isDark
                      ? "0 20px 46px rgba(0, 0, 0, 0.28)"
                      : "0 20px 46px rgba(15, 23, 42, 0.10)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 3,

                    color: stat.color,
                    bgcolor: stat.background,

                    "& svg": {
                      fontSize: 26,
                    },
                  }}
                >
                  {stat.icon}
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 850,
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.4 }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {!hasBoards ? (
            /* EMPTY STATE */

            <Paper
              elevation={0}
              sx={{
                minHeight: 430,
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                p: 4,
                borderRadius: 5,

                bgcolor: isDark
                  ? "rgba(15, 23, 42, 0.72)"
                  : "rgba(255, 255, 255, 0.92)",

                border: "1px dashed",
                borderColor: isDark
                  ? "rgba(167, 139, 250, 0.35)"
                  : "rgba(124, 58, 237, 0.25)",

                backdropFilter: "blur(16px)",
              }}
            >
              <Box sx={{ maxWidth: 520 }}>
                <Box
                  sx={{
                    width: 76,
                    height: 76,
                    mx: "auto",
                    mb: 3,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 4,

                    bgcolor:
                      "rgba(124, 58, 237, 0.12)",

                    color: "primary.main",
                  }}
                >
                  <SpaceDashboardRoundedIcon
                    sx={{ fontSize: 40 }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 850,
                    mb: 1.5,
                  }}
                >
                  צור את הלוח הראשון שלך
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mb: 4,
                    lineHeight: 1.8,
                  }}
                >
                צור לוח ראשון כדי להתחיל לנהל את
המשימות, העמודות והפרויקטים שלך
במקום אחד בצורה מסודרת.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setEditingBoard(undefined);
                    setIsBoardDialogOpen(true);
                  }}
                  sx={{
                    px: 4,
                    minHeight: 52,
                    borderRadius: 3,

                    background:
                      "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)",
                  }}
                >
                 צור לוח
                </Button>
              </Box>
            </Paper>
          ) : (
            <>
              {/* WORKSPACE TOOLBAR */}

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 2.5 },
                  mb: 3,
                  borderRadius: 4,

                  backgroundColor: isDark
                    ? "rgba(15, 23, 42, 0.72)"
                    : "rgba(255, 255, 255, 0.92)",

                  backdropFilter: "blur(16px)",

                  border: "1px solid",
                  borderColor: "divider",

                  boxShadow: isDark
                    ? "0 18px 44px rgba(0, 0, 0, 0.20)"
                    : "0 18px 44px rgba(15, 23, 42, 0.06)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    flexDirection: {
                      xs: "column",
                      xl: "row",
                    },

                    alignItems: {
                      xs: "stretch",
                      xl: "center",
                    },

                    justifyContent:
                      "space-between",

                    gap: 3,
                  }}
                >
                  {/* BOARDS */}

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mb: 1.5,
                        fontWeight: 850,
                        color: "text.secondary",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      הלוחות שלי
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {boards.map((board) => {
                        const isSelected =
                          selectedBoardId ===
                          board.id;

                        return (
                          <Chip
                            key={board.id}
                            label={board.title}
                            clickable
                            onClick={() =>
                              setSelectedBoardId(
                                board.id,
                              )
                            }
                            sx={{
                              minHeight: 38,
                              px: 0.6,
                              borderRadius: 2.5,
                              fontWeight: isSelected
                                ? 800
                                : 600,

                              color: isSelected
                                ? "#FFFFFF"
                                : "text.secondary",

                              bgcolor: isSelected
                                ? "primary.main"
                                : "transparent",

                              border: "1px solid",
                              borderColor: isSelected
                                ? "primary.main"
                                : "divider",

                              "&:hover": {
                                bgcolor: isSelected
                                  ? "primary.dark"
                                  : "action.hover",
                              },
                            }}
                          />
                        );
                      })}

                      <Tooltip title="צור לוח חדש">
                        <IconButton
                          onClick={() => {
                            setEditingBoard(
                              undefined,
                            );

                            setIsBoardDialogOpen(
                              true,
                            );
                          }}
                          sx={{
                            width: 38,
                            height: 38,
                            border: "1px dashed",
                            borderColor:
                              "primary.main",
                            color: "primary.main",
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>

                      {selectedBoardId &&
                        (selectedBoard?.userId ===
                          user.uid ||
                          userData?.role ===
                            "admin") && (
                          <>
                            <Divider
                              orientation="vertical"
                              flexItem
                              sx={{
                                mx: 0.5,
                                display: {
                                  xs: "none",
                                  sm: "block",
                                },
                              }}
                            />

                            <Tooltip title="ערוך לוח">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  if (
                                    selectedBoard
                                  ) {
                                    handleOpenEditBoard(
                                      selectedBoard,
                                    );
                                  }
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="מחק לוח">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => {
                                  if (
                                    !selectedBoardId
                                  ) {
                                    return;
                                  }

                                  const confirmed =
                                    window.confirm(
                                      "האם אתה בטוח שברצונך למחוק את הלוח?",
                                    );

                                  if (confirmed) {
                                    handleDeleteBoardClick(
                                      selectedBoardId,
                                    );
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                    </Box>
                  </Box>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      display: {
                        xs: "none",
                        xl: "block",
                      },
                    }}
                  />

                  {/* FILTERS */}

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mb: 1.5,
                        fontWeight: 850,
                        color: "text.secondary",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                     סינון משימות
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        size="small"
                        startIcon={
                          <FilterListIcon />
                        }
                        variant={
                          !showOnlyMine &&
                          !showOnlySaved
                            ? "contained"
                            : "text"
                        }
                        onClick={() => {
                          setShowOnlyMine(false);
                          setShowOnlySaved(false);
                        }}
                        sx={{
                          minHeight: 38,
                          borderRadius: 2.5,
                        }}
                      >
                       כל המשימות
                      </Button>

                      <Button
                        size="small"
                        startIcon={<StarIcon />}
                        variant={
                          showOnlySaved
                            ? "contained"
                            : "text"
                        }
                        onClick={() => {
                          setShowOnlyMine(false);
                          setShowOnlySaved(true);
                        }}
                        sx={{
                          minHeight: 38,
                          borderRadius: 2.5,
                        }}
                      >
                        שמורות
                      </Button>

                      <Button
                        size="small"
                        startIcon={<PersonIcon />}
                        variant={
                          showOnlyMine
                            ? "contained"
                            : "text"
                        }
                        onClick={() => {
                          setShowOnlyMine(true);
                          setShowOnlySaved(false);
                        }}
                        sx={{
                          minHeight: 38,
                          borderRadius: 2.5,
                        }}
                      >
                      הוקצו אליי
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* SELECTED BOARD HEADER */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  justifyContent: "space-between",
                  alignItems: {
                    xs: "flex-start",
                    sm: "center",
                  },
                  gap: 2,
                  mb: 2.5,
                  px: 0.5,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 850,
                    }}
                  >
                 {selectedBoard?.title ?? "בחר לוח"}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
          {displayedColumns.length} עמודות · {displayedTasks.length} משימות
                  </Typography>
                </Box>

              </Box>

              {/* KANBAN AREA */}

              <Paper
                elevation={0}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  p: { xs: 1.5, md: 2.5 },
                  borderRadius: 5,

                  minHeight: 430,

                  bgcolor: isDark
                    ? "rgba(2, 6, 23, 0.32)"
                    : "rgba(226, 232, 240, 0.48)",

                  border: "1px solid",
                  borderColor: "divider",

                  backdropFilter: "blur(10px)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    overflowX: "auto",
                    pb: 2,

                    "&::-webkit-scrollbar": {
                      height: 8,
                    },

                    "&::-webkit-scrollbar-track": {
                      bgcolor: "transparent",
                    },

                    "&::-webkit-scrollbar-thumb": {
                      bgcolor: isDark
                        ? "rgba(148, 163, 184, 0.25)"
                        : "rgba(15, 23, 42, 0.16)",

                      borderRadius: 999,
                    },
                  }}
                >
                  <KanbanBoard
                    columns={displayedColumns}
                    tasks={displayedTasks}
                    columnIds={columnIds}
                    users={users}
                    onMoveTask={moveTaskToColumn}
                    onEditColumn={
                      handleOpenEditColumn
                    }
                    onDeleteColumn={
                      handleDeleteColumn
                    }
                    onEditTask={
                      handleOpenEditTask
                    }
                    handleDeleteTask={
                      handleDeleteTask
                    }
                    toggleSavedTask={
                      toggleSavedTask
                    }
                  />

                  <Paper
                    elevation={0}
                    onClick={handleOpenAddColumn}
                    sx={{
                      minWidth: 230,
                      minHeight: 74,
                      mt: 0.5,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,

                      cursor: "pointer",
                      borderRadius: 3,

                      bgcolor: isDark
                        ? "rgba(255, 255, 255, 0.025)"
                        : "rgba(255, 255, 255, 0.55)",

                      border: "1px dashed",
                      borderColor: isDark
                        ? "rgba(167, 139, 250, 0.34)"
                        : "rgba(124, 58, 237, 0.28)",

                      color: "primary.main",

                      transition:
                        "transform 180ms ease, background-color 180ms ease, border-color 180ms ease",

                      "&:hover": {
                        transform:
                          "translateY(-2px)",

                        bgcolor: isDark
                          ? "rgba(124, 58, 237, 0.10)"
                          : "rgba(124, 58, 237, 0.07)",

                        borderColor:
                          "primary.main",
                      },
                    }}
                  >
                    <AddIcon />

                    <Typography
                      sx={{ fontWeight: 800 }}
                    >
                      הוסף עמודה חדשה
                    </Typography>
                  </Paper>
                </Box>
              </Paper>
            </>
          )}
        </Box>

        {/* FLOATING ACTIONS */}

        {hasBoards && (
          <Box
            sx={{
              position: "fixed",
              right: { xs: 16, sm: 24 },
              bottom: { xs: 78, sm: 88 },
              display: "flex",
              gap: 1.5,
              zIndex: 1100,
            }}
          >
            <Tooltip
              title="הוסף עמודה"
              placement="top"
            >
              <Fab
                size="medium"
                color="secondary"
                onClick={handleOpenAddColumn}
                disabled={!selectedBoardId}
              >
                <ViewColumnIcon />
              </Fab>
            </Tooltip>

            {hasColumns && (
              <Tooltip
                title={
                  isTaskDialogOpen
                    ? "סגור"
                    : "הוסף משימה"
                }
                placement="top"
              >
                <Fab
                  color={
                    isTaskDialogOpen
                      ? "default"
                      : "primary"
                  }
                  onClick={handleTaskFabClick}
                  sx={{
                    background:
                      isTaskDialogOpen
                        ? undefined
                        : "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
                  }}
                >
                  {isTaskDialogOpen ? (
                    <CloseIcon />
                  ) : (
                    <AddIcon />
                  )}
                </Fab>
              </Tooltip>
            )}
          </Box>
        )}

        {/* DIALOGS */}

        {isColumnDialogOpen && (
          <ColumnFormDialog
            open={isColumnDialogOpen}
            onClose={() => {
              setEditingColumn(undefined);
              setIsColumnDialogOpen(false);
            }}
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
            onClose={() => {
              setEditingBoard(undefined);
              setIsBoardDialogOpen(false);
            }}
            initialValues={editingBoard}
            handleSave={handleBoardSave}
          />
        )}
      </Box>
    </Fade>
  );
}

export default memo(HomePage);