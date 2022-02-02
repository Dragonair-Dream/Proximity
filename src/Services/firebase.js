import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBzejvAurNRqg1RMXFYmAHq3GBjl8c6wUg",
  authDomain: "proximity-3c563.firebaseapp.com",
  projectId: "proximity-3c563",
  storageBucket: "proximity-3c563.appspot.com",
  messagingSenderId: "752995737957",
  appId: "1:752995737957:web:f37ae84626dbb44ee4c18c",
  measurementId: "G-RPCL9C7TQT",
});

export const auth = getAuth(firebaseApp);
export const db = getFirestore();
export const storage = getStorage(firebaseApp);

// const colRef = collection(db, "users");
// const q = query(colRef, where("email", "==", auth.currentUser.email));
// export const querySnapshot = getDocs(q).then((snapshot) => {
//   let users = [];
//   snapshot.docs.forEach((doc) => {
//     users.push({ ...doc.data() });
//   });
// });
