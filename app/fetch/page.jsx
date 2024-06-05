"use client";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [semesters, setSemesters] = useState({});
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();

    const fetchData = async () => {
      const resultDetailsRef = database.ref("result details");
      const coursesRef = database.ref("courses");

      const [resultSnapshot, coursesSnapshot] = await Promise.all([
        resultDetailsRef.once("value"),
        coursesRef.once("value"),
      ]);

      const fetchedData = resultSnapshot.val();
      const fetchedCourses = coursesSnapshot.val();

      if (fetchedData && fetchedCourses) {
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

        // Extract subjects by semester
        const semesterData = {};
        Object.values(fetchedCourses).forEach((course) => {
          const semester = course.Semester;
          if (!semesterData[semester]) {
            semesterData[semester] = [];
          }
          semesterData[semester].push(course.CourseCode);
        });

        setSemesters(semesterData);
        setStudentData(studentArray);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      <nav className="bg-blue-500 p-6 shadow-md w-full flex justify-between items-center">
        <div style={{ marginTop: "5px" }}>
          <Link href="/">
            <Image src="/assets/logo2.svg" alt="Logo" width={100} height={100} />
          </Link>
        </div>
        <div className="max-w-7xl mx-auto flex items-center w-full px-2 lg:px-8">
          <h1 className="flex-shrink-0 mr-auto"></h1>
          <div className="flex items-center space-x-4">
            <Select onValueChange={(value) => setSelectedAcademicYear(value)}>
              <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Academic Year</SelectLabel>
                  <SelectItem value="2022-2026">2022-2026</SelectItem>
                  <SelectItem value="2023-2027">2023-2027</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setSelectedSemester(value)}>
              <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Semester</SelectLabel>
                  <SelectItem value="1">Semester 1</SelectItem>
                  <SelectItem value="2">Semester 2</SelectItem>
                  <SelectItem value="3">Semester 3</SelectItem>
                  <SelectItem value="4">Semester 4</SelectItem>
                  <SelectItem value="5">Semester 5</SelectItem>
                  <SelectItem value="6">Semester 6</SelectItem>
                  <SelectItem value="7">Semester 7</SelectItem>
                  <SelectItem value="8">Semester 8</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              onClick={handleSubmit}
              style={{ backgroundColor: "#1800f0", borderColor: "#1800f0" }}
              className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out"
            >
              Submit
            </Button>
          </div>
        </div>
      </nav>
      <div className="overflow-x-auto">
        {isSubmitted && selectedSemester && selectedAcademicYear && (
          <div>
            <h2>
              Semester {selectedSemester} Results for Academic Year{" "}
              {selectedAcademicYear}
            </h2>
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  <TableHead>Reg No.</TableHead>
                  <TableHead>Name</TableHead>
                  {semesters[selectedSemester] &&
                    semesters[selectedSemester].map((subject, index) => (
                      <TableHead key={index}>{subject}</TableHead>
                    ))}
                  <TableHead>Grade Points</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Deviation</TableHead>
                  <TableHead>Result Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.map((student, index) => {
                  const grades = student.Grades.reduce((acc, grade) => {
                    acc[grade.CourseCode] = grade.Grade;
                    return acc;
                  }, {});
                  const subjects = semesters[selectedSemester] || [];
                  const gradePoints = calculateGradePoints(grades, subjects);
                  const GPA = calculateGPA(gradePoints, subjects.length);
                  const deviation = calculateDeviation(GPA);
                  const resultStatus = determineResultStatus(GPA);

                  return (
                    <TableRow key={index}>
                      <TableCell>{student.RegisterNo}</TableCell>
                      <TableCell>{student.Name}</TableCell>
                      {subjects.map((subject, subIndex) => (
                        <TableCell key={subIndex}>
                          <span>{grades[subject] || "N/A"}</span>
                        </TableCell>
                      ))}
                      <TableCell>{gradePoints}</TableCell>
                      <TableCell>{GPA}</TableCell>
                      <TableCell>{deviation}</TableCell>
                      <TableCell>{resultStatus}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

// Dummy calculation functions
const calculateGradePoints = (grades, subjects) => {
  // Implement grade point calculation logic
  return subjects.reduce((acc, subject) => acc + getGradePoint(grades[subject]), 0);
};

const getGradePoint = (grade) => {
  // Convert grade to grade points
  switch (grade) {
    case 'A+': return 10;
    case 'A': return 9;
    case 'B+': return 8;
    case 'B': return 7;
    case 'C+': return 6;
    case 'C': return 5;
    case 'D+': return 4;
    case 'D': return 3;
    case 'E': return 2;
    case 'F': return 0;
    default: return 0;
  }
};

const calculateGPA = (gradePoints, totalSubjects) => {
  return (gradePoints / totalSubjects).toFixed(2);
};

const calculateDeviation = (GPA) => {
  // Implement deviation calculation logic
  return (GPA - 5).toFixed(2); // Example calculation
};

const determineResultStatus = (GPA) => {
  // Implement result status logic
  return GPA >= 5 ? "Pass" : "Fail"; // Example condition
};

export default FirebaseDataPage;
