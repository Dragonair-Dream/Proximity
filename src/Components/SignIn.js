import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Services/firebase";
import Logout from './Logout';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginAccount = async () => {
    const loginEmail = email;
    const loginPassword = password;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    loginAccount();
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
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
          <button onClick={(e) => handleSubmit(e)}>Sign In</button>
        </form>
      </div>
      <div>Don't have an account? Sign Up!</div>
      <Logout />
    </div>
  );
}

export default SignIn;
