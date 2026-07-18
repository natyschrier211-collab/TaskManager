
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import app from "../config/firebase";
import type { User } from "../types/User";
import { getDocs } from "firebase/firestore";


const db = getFirestore(app);
const usersCollection = collection(db, "users");

export const addUser = async (user: User) => {
  const userDocRef = doc(usersCollection, user.id);
  await setDoc(userDocRef, user);
};

export const getUsers = async () => {
  const snapshot = await getDocs(usersCollection);

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  })) as User[];
};