import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { firebaseConfig } from "../secrets";
import firebaseApp from "../Services/firebase";
import userProfileReducer from "./userProfileReducer";
//import reducers from store here

const reducer = combineReducers({
  //Enter reducers from store here
  userProfile: userProfileReducer,

});
const middleware = applyMiddleware(thunkMiddleware.withExtraArgument(getFirebase))
const store = createStore(reducer,
  compose(
    middleware,
  )
);

export default store;
