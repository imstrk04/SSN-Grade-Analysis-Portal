'use client'
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
            acc[key] = acc[key] || { Name: curr.Name, RegisterNo: curr.RegisterNo, SEM1: [], SEM2: [], SEM3: [] };
            // Determine the majority clearing semester for each course code
            const semester = getMajorityClearingSemester(curr);
            acc[key][semester].push({ CourseCode: curr.CourseCode, Grade: curr.Grade });
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

  // Function to determine the majority clearing semester for a course code
  const getMajorityClearingSemester = (courseData) => {
    const clearedSemesters = {
      Nov2022: 0,
      May2023: 0,
      Nov2023: 0,
    };
    // Count the number of students who cleared the course in each semester
    Object.values(courseData).forEach((value) => {
      if (value === 'A' || value === 'A+') {
        if (courseData.ClearedBy === 'Nov 2022') {
          clearedSemesters.Nov2022++;
        } else if (courseData.ClearedBy === 'May 2023') {
          clearedSemesters.May2023++;
        } else if (courseData.ClearedBy === 'Nov 2023') {
          clearedSemesters.Nov2023++;
        }
      }
    });
    // Determine the majority clearing semester
    if (clearedSemesters.Nov2022 > clearedSemesters.May2023 && clearedSemesters.Nov2022 > clearedSemesters.Nov2023) {
      return 'SEM1';
    } else if (clearedSemesters.May2023 > clearedSemesters.Nov2022 && clearedSemesters.May2023 > clearedSemesters.Nov2023) {
      return 'SEM2';
    } else {
      return 'SEM3';
    }
  };

  return (
    <div>
      <h1>Fetched Data</h1>
      {studentData.map((student, index) => (
        <div key={index}>
          <h2>{student.Name}</h2>
          <p>Register No: {student.RegisterNo}</p>
          <h3>SEM1 Results:</h3>
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {student.SEM1.map((result, i) => (
                <tr key={`SEM1-${index}-${i}`}>
                  <td>{result.CourseCode}</td>
                  <td>{result.Grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>SEM2 Results:</h3>
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {student.SEM2.map((result, i) => (
                <tr key={`SEM2-${index}-${i}`}>
                  <td>{result.CourseCode}</td>
                  <td>{result.Grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>SEM3 Results:</h3>
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {student.SEM3.map((result, i) => (
                <tr key={`SEM3-${index}-${i}`}>
                  <td>{result.CourseCode}</td>
                  <td>{result.Grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {index < studentData.length - 1 && <hr style={{ margin: "20px 0" }} />}
        </div>
      ))}
    </div>
  );
};

export default FirebaseDataPage;
