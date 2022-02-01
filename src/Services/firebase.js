import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from "../secrets";

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
