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
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  return currentUser;
}

//STORAGE FUNCTIONS
//UPLOAD USER PROFILE PIC
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");
  // setLoading(true);
  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, {
    photoURL: photoURL,
  });
}

export async function postUpload(file, currentUser) {
  const fileRef = ref(storage, "posts/" + currentUser.uid + ".png");
  await uploadBytes(fileRef, file);
  await getDownloadURL(fileRef);
}

export default firebaseApp;
