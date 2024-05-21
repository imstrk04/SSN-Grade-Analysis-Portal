"use client";

import React, { useEffect, useState } from "react";
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
          // Group data by student
          const groupedData = Object.values(fetchedData).reduce((acc, curr) => {
            const key = `${curr.Name}-${curr.RegisterNo}`;
            acc[key] = acc[key] || {
              Name: curr.Name,
              RegisterNo: curr.RegisterNo,
              Grades: [],
            };
            acc[key].Grades.push({
              CourseCode: curr.CourseCode,
              Grade: curr.Grade,
            });
            return acc;
          }, {});

          // Convert grouped data to array
          const studentArray = Object.values(groupedData);

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
        <div key={index}>
          <h2>{student.Name}</h2>
          <p>Register No: {student.RegisterNo}</p>
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {student.Grades.map((grade, i) => (
                <tr key={`${index}-${i}`}>
                  <td>{grade.CourseCode}</td>
                  <td>{grade.Grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {index < studentData.length - 1 && (
            <hr style={{ margin: "20px 0" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FirebaseDataPage;
