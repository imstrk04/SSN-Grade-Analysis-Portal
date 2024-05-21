"use client";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

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

const FirebaseDataPage = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();

    const fetchData = async () => {
      const resultDetailsRef = database.ref("result details");
      resultDetailsRef.once("value", (snapshot) => {
        const fetchedData = snapshot.val();
        if (fetchedData) {
          // Convert fetched data to an array
          const studentArray = Object.values(fetchedData);

          // Update state with fetched data
          setStudentData(studentArray);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      {studentData.map((student, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h2>{student.Name}</h2>
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Register No</th>
                <th>Cleared By</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{student.CourseCode}</td>
                <td>{student.RegisterNo}</td>
                <td>{student.ClearedBy}</td>
                <td>{student.Grade}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default FirebaseDataPage;
