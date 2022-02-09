import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db} from '../Services/firebase'
import { onSnapshot, doc } from "firebase/firestore";
import { readAll } from '../Store/notificationsReducer'

const Notifications = () => {
  const notificationsArr = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readAll())
  }, [])

  return (
    <div>
      {notificationsArr.map((notif) => (  
          <h1>{notif.text}</h1>
      ))}
    </div>
  )
  
}

export default Notifications