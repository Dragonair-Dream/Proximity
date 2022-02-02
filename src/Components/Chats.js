import React, {useEffect} from 'react';
import { auth, db } from '../Services/firebase';
import { collection, query, where, getDoc } from 'firebase/firestore';


// import {}

const Chats = () => {
  console.log(auth.currentUser)

  useEffect(() => {
    const
  }, []);

  return <div></div>;
};

export default Chats;

