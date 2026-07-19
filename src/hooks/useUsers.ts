import { useEffect, useState, useCallback, useContext } from "react";
import { SnackContext } from "../providers/SnackProvider";
import { getUsers } from "../services/usersDataServiceFireBase";
import type { User } from "../types/User";
import { useUser } from "../providers/UserProvider"; // 1. הוספנו את הייבוא של היוזר

function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const { raiseSnack } = useContext(SnackContext) as {
    raiseSnack: (
      color: "success" | "error" | "warning" | "info",
      message: string,
    ) => void;
  };

  // 2. שולפים את המשתמש הנוכחי
  const { user } = useUser(); 

  // מביא את כל המשתמשים
  const handleGetUsers = useCallback(async () => {
    try {
      const savedUsers = await getUsers();
      setUsers(savedUsers);
    } catch {
      raiseSnack("error", "התרחשה שגיאה בייבוא המשתמשים");
    }
  }, [raiseSnack]);

  useEffect(() => {
    // 3. התנאי שעוצר את השגיאה: יוצאים לשרת רק אם יש יוזר מחובר!
    if (user) {
      handleGetUsers();
    }
  }, [handleGetUsers, user]); // הוספנו את user למערך התלויות

  return {
    users,
  };
}

export default useUsers;