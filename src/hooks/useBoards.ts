import { useCallback, useContext, useState } from "react";
import { SnackContext } from "../providers/SnackProvider";
import { useUser } from "../providers/UserProvider";
import type { Board } from "../types/Board";
import {
  addBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} from "../services/boardsDataServiceFireBase";

function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { raiseSnack } = useContext(SnackContext) as any;
  const { user } = useUser();

const handleGetBoards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedBoards = await getBoards();
      setBoards(fetchedBoards);
    } catch (err) {
console.error(err);
raiseSnack("error", "שגיאה בטעינת הלוחות");
setError("שגיאה בטעינת הלוחות");
    } finally {
      setIsLoading(false);
    }
  },[raiseSnack]);

const handleAddBoard = useCallback(
  async (board: Omit<Board, "id">) => {
    setIsLoading(true);
    setError(null);
    try {
      const newBoardData = {
        ...board,
        userId: user!.uid,
      };
      const newBoardId = await addBoard(newBoardData);
      const newBoard: Board = {
        ...newBoardData,
        id: newBoardId,
      };
      setBoards((prev) => [...prev, newBoard]);
      raiseSnack("success", "הלוח נוסף בהצלחה");
    } catch (err) {
      console.error(err);
      raiseSnack("error", "שגיאה בהוספת הלוח");
      setError("שגיאה בהוספת הלוח");
    } finally {
      setIsLoading(false);
    }
  },
  [raiseSnack, user],
);



const handleEditBoard = useCallback(
  async (board: Board) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateBoard(board.id, board);
      setBoards((prev) =>
        prev.map((b) =>
          b.id === board.id ? board : b
        )
      );
      raiseSnack("success", "הלוח עודכן בהצלחה");
    } catch (err) {
      console.error(err);
      raiseSnack("error", "שגיאה בעדכון הלוח");
      setError("שגיאה בעדכון הלוח");
    } finally {
      setIsLoading(false);
    }
  },
  [raiseSnack]
);

  const handleDeleteBoard = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteBoard(id);
      setBoards((prev) => prev.filter((board) => board.id !== id));
      raiseSnack("success", "הלוח נמחק בהצלחה");
    } catch (err) {
 console.error(err);
raiseSnack("error", "שגיאה במחיקת הלוח");
setError("שגיאה במחיקת הלוח");
    } finally {
      setIsLoading(false);
    }
  },[raiseSnack]);

  return {
    boards,
    isLoading,
    error,
    handleAddBoard,
    handleGetBoards,
    handleEditBoard,
    handleDeleteBoard,
  };
}

export default useBoards;