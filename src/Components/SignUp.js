import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContexts";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    signup(emailRef.current.value, passwordRef.current.value);
  }

  return (
    <div>
      <div>
        <h2>SignUp</h2>
        <form>
          <label>Email: </label>
          <input type="email" ref={emailRef}></input>
          <br />
          <label>Password: </label>
          <input type="password" ref={passwordRef}></input>
          <br />
          <label>Password Confirmation: </label>
          <input type="password" ref={passwordConfirmRef}></input>
          <br />
          <button>Sign Up</button>
        </form>
      </div>
      <div>Already have an account? Log In</div>
    </div>
  );
}
