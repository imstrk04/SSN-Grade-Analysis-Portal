import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDZR8kgx_rlkN3u4N_npnkQsAnaXp9_ytE",
  authDomain: "result-analysis-1c339.firebaseapp.com",
  databaseURL: "https://result-analysis-1c339-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "result-analysis-1c339",
  storageBucket: "result-analysis-1c339.appspot.com",
  messagingSenderId: "764609161175",
  appId: "1:764609161175:web:15d7434aa5cbf361180d92",
  measurementId: "G-F4LMBJERMF"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app,auth}
export { db }; // Export the db instance
export default firebase;