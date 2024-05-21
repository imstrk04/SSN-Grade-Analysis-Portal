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
  const [courseData, setCourseData] = useState({});

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
          const courses = {};
          // Loop through each student's data
          Object.values(fetchedData).forEach((student) => {
            // Increment grade counts for each course
            if (!courses[student.CourseCode]) {
              courses[student.CourseCode] = {
                O: 0,
                "A+": 0,
                A: 0,
                "B+": 0,
                B: 0,
                C: 0,
              };
            }
            courses[student.CourseCode][student.Grade]++;
          });
          setCourseData(courses);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Grade Counts by Course</h1>
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>O</th>
            <th>A+</th>
            <th>A</th>
            <th>B+</th>
            <th>B</th>
            <th>C</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(courseData).map(([courseCode, grades]) => (
            <tr key={courseCode}>
              <td>{courseCode}</td>
              <td>{grades.O}</td>
              <td>{grades["A+"]}</td>
              <td>{grades.A}</td>
              <td>{grades["B+"]}</td>
              <td>{grades.B}</td>
              <td>{grades.C}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirebaseDataPage;
