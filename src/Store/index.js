import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import userProfileReducer from "./userProfileReducer";
import chatsReducer from "./chatsReducer";
import getSingleUserDoc from "./getSingleUserDoc";
import messagesReducer from "./messagesReducer";

const reducer = combineReducers({
  userProfile: userProfileReducer,
  chats: chatsReducer,
  user: getSingleUserDoc,
  messages: messagesReducer,

});
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
const store = createStore(reducer, middleware);

export default store;
