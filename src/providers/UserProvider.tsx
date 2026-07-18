import {
  createContext,
  useState,
  useContext,
  useCallback,
  type ReactNode,
  useEffect,
} from "react";
import app from "../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { addUser } from "../services/usersDataServiceFireBase";
import type { User as AppUser } from "../types/User";
import { SnackContext } from "./SnackProvider";




type RegisterUser = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  
};

const UserContext = createContext<{
  user: FirebaseUser | null;
  signup: (userData: RegisterUser) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthLoading: boolean;
} | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const auth = getAuth(app);
  
const snackContext = useContext(SnackContext) as {
  raiseSnack: (
    color: "success" | "error" | "warning" | "info",
    message: string,
  ) => void;
};

const { raiseSnack } = snackContext;

const signup = useCallback(
  async (userData: RegisterUser) => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password,
        );

      const newUser: AppUser = {
        id: userCredential.user.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        address: userData.address,
        email: userData.email,
        phone: userData.phone,
      };

      await addUser(newUser);
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          raiseSnack("error", "האימייל כבר קיים במערכת");
          break;

        case "auth/invalid-email":
          raiseSnack("error", "כתובת האימייל אינה תקינה");
          break;

        case "auth/weak-password":
          raiseSnack("error", "הסיסמה חלשה מדי");
          break;

        default:
          raiseSnack("error", "אירעה שגיאה בהרשמה");
      }

      throw error;
    }
  },
  [auth, raiseSnack],
);

const login = useCallback(
  async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-credential":
          raiseSnack("error", "אימייל או סיסמה שגויים");
          break;

        case "auth/user-disabled":
          raiseSnack("error", "המשתמש נחסם");
          break;

        default:
          raiseSnack("error", "אירעה שגיאה בהתחברות");
      }

      throw error;
    }
  },
  [auth, raiseSnack],
);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
      setUser(currentUser as any | null);
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  return (
    <UserContext.Provider
      value={{ user, signup, login, logout, isAuthLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export { UserProvider, useUser };