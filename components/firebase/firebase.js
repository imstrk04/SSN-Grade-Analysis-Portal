import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZR8kgx_rlkN3u4N_npnkQsAnaXp9_ytE",
  authDomain: "result-analysis-1c339.firebaseapp.com",
  databaseURL:
    "https://result-analysis-1c339-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "result-analysis-1c339",
  storageBucket: "result-analysis-1c339.appspot.com",
  messagingSenderId: "764609161175",
  appId: "1:764609161175:web:15d7434aa5cbf361180d92",
  measurementId: "G-F4LMBJERMF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
