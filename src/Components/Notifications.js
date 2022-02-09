import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, db} from '../Services/firebase'
import { onSnapshot, doc } from "firebase/firestore";

const Notifications = (props) => {
  console.log('THIS IS PROPS: ', props)

  useEffect(() => {
    console.log('NOTIFICATIONS USE EFFECT RAN')
   
  })

  return (
    <div>
      Hello from Notifications
    </div>
  )
}

export default Notifications