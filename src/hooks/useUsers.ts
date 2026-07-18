import { useEffect, useState, useCallback, useContext } from "react";
import { SnackContext } from "../providers/SnackProvider";
import { getUsers } from "../services/usersDataServiceFireBase";
import type { User } from "../types/User";

 
 function useUsers (){
 const [users, setUsers] = useState<User[]>([]);
 const { raiseSnack } = useContext(SnackContext) as {
  raiseSnack: (
    color: "success" | "error" | "warning" | "info",
    message: string,
  ) => void;
};

//מביא את כל המשתמשים
  const handleGetUsers = useCallback(async () => {
  try {
    const savedUsers = await getUsers();
    setUsers(savedUsers);
  } catch {
    raiseSnack("error", "התרחשה שגיאה בייבוא המשתמשים");
  }
}, [raiseSnack]);

useEffect(() => {
  handleGetUsers();
}, [handleGetUsers]);

return {
  users,
};
}
export default useUsers;