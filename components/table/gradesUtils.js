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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

export const fetchStudentData = async (batch, semester, section) => {
  const resultDetailsRef = database.ref("result details").orderByChild("Batch").equalTo(batch);
  const snapshot = await resultDetailsRef.once("value");
  const fetchedData = snapshot.val();
  if (!fetchedData) {
    return [];
  }

  const groupedData = Object.values(fetchedData).reduce((acc, curr) => {
    if (curr.Semester === semester && curr.Section === section) {
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
    }
    return acc;
  }, {});

  const studentArray = Object.values(groupedData);
  return studentArray;
};

export const fetchSubjects = async (batch, semester) => {
  const coursesRef = database.ref("courses").orderByChild("Batch").equalTo(batch);
  const snapshot = await coursesRef.once("value");
  const fetchedData = snapshot.val();
  if (!fetchedData) {
    return [];
  }

  return Object.values(fetchedData)
    .filter(course => course.Semester === semester)
    .map(course => course.CourseCode);
};
