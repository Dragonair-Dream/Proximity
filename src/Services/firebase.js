import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, uploadBytes, ref } from "@firebase/storage";
import { useEffect, useState } from "react";
import { getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../secrets";

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore();
export const storage = getStorage(firebaseApp);

//custom Hook
//GET CURRENT USER
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  // console.log("current user", currentUser);
  return currentUser;
}

//STORAGE FUNCTIONS
//UPLOAD USER PROFILE PIC
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {
    photoURL: photoURL,
  });

  setLoading(false);
  alert("Uploaded File!");
}

//GET CURRENT USER DATA
// const colRef = collection(db, "users");
// const q = query(colRef, where("email", "==", auth.currentUser.email));
// let users = [];
// const querySnapshot = getDocs(q).then((snapshot) => {
//   snapshot.docs.forEach((doc) => {
//     users.push({ ...doc.data() });
//   });
// });
// console.log(users);

// const colRef = collection(db, "users");
// const q = query(colRef, where("email", "==", auth.currentUser.email));
// export const querySnapshot = getDocs(q).then((snapshot) => {
//   let users = [];
//   snapshot.docs.forEach((doc) => {
//     users.push({ ...doc.data() });
//   });
// });

export default firebaseApp;
