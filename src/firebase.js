import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBzejvAurNRqg1RMXFYmAHq3GBjl8c6wUg",
  authDomain: "proximity-3c563.firebaseapp.com",
  projectId: "proximity-3c563",
  storageBucket: "proximity-3c563.appspot.com",
  messagingSenderId: "752995737957",
  appId: "1:752995737957:web:f37ae84626dbb44ee4c18c",
  measurementId: "G-RPCL9C7TQT",
};

//initialize firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
