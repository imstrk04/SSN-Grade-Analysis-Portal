// "use client" pragma to mark this file as a client-side component
"use client";

import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Home from '../../components/navbar/page';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/firebase/firebase';
import { useRouter } from 'next/navigation';
import { ref, get, child, getDatabase } from 'firebase/database';
import TableDemo from '../../components/table/table';  // Ensure this path is correct

const fetchData = async (year, semester, section) => {
  const dbRef = ref(getDatabase());

  console.log('Fetching data from the database...');
  const coursesSnapshot = await get(child(dbRef, 'courses'));
  const studentDetailsSnapshot = await get(child(dbRef, 'student details'));
  const resultDetailsSnapshot = await get(child(dbRef, 'result details'));

  console.log('Data fetched from database');

  const courses = Object.values(coursesSnapshot.val());
  const studentDetails = Object.values(studentDetailsSnapshot.val());
  const resultDetails = Object.values(resultDetailsSnapshot.val());

  console.log('Courses:', courses);
  console.log('Student Details:', studentDetails);
  console.log('Result Details:', resultDetails);

  console.log(`Filtering students for batch year: ${year} and section: ${section}`);
  const filteredStudents = studentDetails.filter(student =>
    student.Batch === year && (section === 'ALL' || student.Section === section)
  );
  console.log('Filtered Students:', filteredStudents);

  if (filteredStudents.length === 0) {
    console.error('No students found for the specified batch year and section');
    return [];
  }

  const semesterNumber = parseInt(semester.substring(semester.length - 1));
  console.log(`Semester number extracted: ${semesterNumber}`);

  const courseTitleMap = {};
  courses.forEach(course => {
    courseTitleMap[course.CourseCode] = course.CourseTitle;
  });

  console.log('Course Title Map:', courseTitleMap);

  const filteredData = [];

  filteredStudents.forEach(student => {
    console.log(`Processing results for student: ${student.Name}`);
    const studentResults = resultDetails.filter(result =>
      result.RegisterNo === student.RegisterNo &&
      courses.some(course =>
        course.CourseCode === result.CourseCode &&
        getSemester(year, result.ClearedBy) === semesterNumber
      )
    );

    console.log('Filtered Results for Student:', studentResults);

    studentResults.forEach(result => {
      filteredData.push({
        CourseCode: result.CourseCode,
        CourseTitle: courseTitleMap[result.CourseCode] || "Unknown Course",
        Grade: result.Grade,
        RegisterNo: student.RegisterNo,
        Name: student.Name
      });
    });
  });

  console.log('Filtered Data:', filteredData);
  return filteredData;
};

const getSemester = (year, semester) => {
  const startYear = parseInt(year.split("-")[0].trim(), 10);
  const semYear = parseInt(semester.split(" ")[1], 10);
  const semMon = semester.split(" ")[0];

  let sem = 0;

  if (semMon === "Nov") {
    sem = (semYear - startYear) * 2 + 1;
  } else if (semMon === "May") {
    sem = (semYear - startYear) * 2;
  }
  console.log(sem)
  return sem
};

const Grade = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  // Handler function to fetch data
  const handleFetchData = async () => {
    console.log('Fetching data...');
    if (year && semester && section) {
      console.log('Fetching data for:', year, semester, section);
      const data = await fetchData(year, semester, section);
      console.log('Fetched data:', data);
      setTableData(data); // Assign fetched data to state
    }
  };

  // Render null if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="flex">
      <Home />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="mb-4">
          <Select onValueChange={(value) => setYear(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2021-2022">2021-2022</SelectItem>
                <SelectItem value="2020-2021">2020-2021</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSemester(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Semester 1">Semester 1</SelectItem>
                <SelectItem value="Semester 2">Semester 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSection(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="ALL">ALL</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleFetchData}>Fetch Data</Button>
        <TableDemo data={tableData} />
      </div>
    </div>
  );
};

export default Grade;
