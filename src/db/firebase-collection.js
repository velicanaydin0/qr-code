import { collection } from "firebase/firestore";
import { db } from "./Firebase";

export const movieCollectionRef = (uid) => collection(db, `qrmenu-${uid}`);
