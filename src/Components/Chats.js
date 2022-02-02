import React, {useEffect, useCallback} from 'react';
import { auth, db } from '../Services/firebase';
import { collection, query, where, getDoc, doc } from 'firebase/firestore';


// import {}

const Chats = () => {
  console.log(auth.currentUser)

  const Retreive = useCallback(async () => {
    const docRef = doc(db, 'chats', 'yFCfYlthtsJ1xGRwwCfr');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('DOC', docSnap.data());
    } else {
      console('something went wrong');
    }

  }, []);


  useEffect(() => {
    Retreive();
  }, [Retreive]);

  return <div></div>;
};

export default Chats;
