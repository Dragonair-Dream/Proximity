import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import userProfileReducer from "./userProfileReducer";
import relationsReducer from './relationsReducer'
import usersReducer from "./usersReducer";
import chatsReducer from "./chatsReducer";
import getSingleUserDoc from "./getSingleUserDoc";
import messagesReducer from "./messagesReducer";
import userPostReducer from "./userPostReducer";
import userFriendReducer from "./userFriendReducer"
import friendsPostsReducer from "./friendsPostsReducer";
import singleChatReducer from "./singleChatReducer";
//import reducers from store here

const reducer = combineReducers({
  //Enter reducers from store here
  usersFriends: userFriendReducer,
  usersPosts: userPostReducer,
  friendsPosts: friendsPostsReducer,
  userProfile: userProfileReducer,
  relations: relationsReducer,
  users: usersReducer,
  chats: chatsReducer,
  user: getSingleUserDoc,
  messages: messagesReducer,
  singleChat: singleChatReducer,


});
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
const store = createStore(reducer, middleware);

export default store;
