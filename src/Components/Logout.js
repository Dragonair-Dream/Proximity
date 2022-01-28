import React from 'react';
import { auth } from '../Services/firebase';
import { signOut } from 'firebase/auth';

const Logout = () => {

  const logout = async () => {
    await signOut(auth);
    console.log('LOGGED OUT')
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
