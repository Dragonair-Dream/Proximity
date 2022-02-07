import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import userProfileReducer from "./userProfileReducer";
import chatsReducer from "./chatsReducer";
import getSingleUserDoc from "./getSingleUserDoc";
import messagesReducer from "./messagesReducer";
import userPostReducer from "./userPostReducer";
<<<<<<< HEAD
import userFriendReducer from "./userFriendReducer"
//import reducers from store here
=======
>>>>>>> 11aeedd535feff4f278c8a96bf3aad805a22391f

const reducer = combineReducers({
  //Enter reducers from store here
  usersFriends: userFriendReducer,
  usersPosts: userPostReducer,
  userProfile: userProfileReducer,
  chats: chatsReducer,
  user: getSingleUserDoc,
  messages: messagesReducer,

});
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
const store = createStore(reducer, middleware);

export default store;
