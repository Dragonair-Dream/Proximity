import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/firebase";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createAccount = async () => {
    const loginEmail = email;
    const loginPassword = password;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    createAccount();
  };

  return (
    <div>
      <div>
        <h2>SignUp</h2>
        <form>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"></input>
          <br />
          <label>Password: </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>
          <br />
          {/* <label>Password Confirmation: </label>
          <input type="password" ref={passwordConfirmRef}></input> */}
          <br />
          <button onClick={(e) => handleSubmit(e)}>Sign Up</button>
        </form>
      </div>
      <div>Already have an account? Log In</div>
    </div>
  );
}
