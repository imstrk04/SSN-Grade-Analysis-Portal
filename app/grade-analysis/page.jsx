'use client';

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
import Table1 from './Tables/table1';
import Table2 from './Tables/table2';
import Table3 from './Tables/table3';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/components/firebase/config';
import { useRouter } from 'next/navigation';
import { ref, get, child, getDatabase } from 'firebase/database';

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
                Grade: result.Grade
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
        sem =  (semYear - startYear) * 2 + 1;
    } else if (semMon === "May") {
        sem =  (semYear - startYear) * 2;
    }
    console.log(sem)
    return sem
};

const Grade = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const navigateTo = (page) => {
    router.push(`/grade-analysis/Tables/${page}`);
  };

  return (
    <div className="flex">
      <Home />
      <div class="flex justify-center items-center h-screen">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div class="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div class="p-6">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Tailwind card
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                felis ligula.
              </p>
            </div>
            <div class="p-6 pt-0">
              <button
                data-ripple-light="true"
                type="button"
                class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => navigateTo("table1")}
              >
                Table1
              </button>
            </div>
          </div>
          <div class="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div class="p-6">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Tailwind card
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                felis ligula.
              </p>
            </div>
            <div class="p-6 pt-0">
              <button
                data-ripple-light="true"
                type="button"
                class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => navigateTo("table2")}
              >
                table2
              </button>
            </div>
          </div>
          <div class="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div class="p-6">
              <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Tailwind card
              </h5>
              <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                felis ligula.
              </p>
            </div>
            <div class="p-6 pt-0">
              <button
                data-ripple-light="true"
                type="button"
                class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={() => navigateTo("table3")}
              >
                Table3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grade;