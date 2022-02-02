import React from "react";
import { auth } from "../Services/firebase";
import { signOut } from "firebase/auth";

const LogoutButton = () => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
