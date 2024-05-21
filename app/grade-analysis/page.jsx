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

    console.log('Filtering students for batch year: ${year} and section: ${section}');
    const filteredStudents = studentDetails.filter(student =>
        student.Batch === year && (section === 'ALL' || student.Section === section)
    );
    console.log('Filtered Students:', filteredStudents);

    if (filteredStudents.length === 0) {
        console.error('No students found for the specified batch year and section');
        return [];
    }

    const semesterNumber = parseInt(semester.substring(semester.length - 1));
    console.log('Semester number extracted: ${semesterNumber}');

    const courseTitleMap = {};
    const courseCreditMap = {};
    courses.forEach(course => {
        courseTitleMap[course.CourseCode] = course.CourseTitle; 
        courseCreditMap[course.CourseCredit] = course.Credit;
    });

    console.log('Course Title Map:', courseTitleMap);

    const filteredData = [];

    filteredStudents.forEach(student => {
        console.log('Processing results for student: ${student.Name}');
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
                RegisterNo: student.RegisterNo, 
                CourseCode: result.CourseCode,
                CourseTitle: courseTitleMap[result.CourseCode]|| "Unknown Course",
                Grade: result.Grade,
                GradePoint: courseCreditMap[result.CourseCode]
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
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!user) {
            router.push('/sign-in');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    const handleSubmit = async () => {
        const fetchedData = await fetchData(year, semester, section);
        setData(fetchedData);
    };

    return (
        <>
            <nav className="bg-blue-500 p-6 shadow-md w-full flex justify-between items-center">
                <div style={{ marginTop: '5px' }}>
                    <Link href="/">
                        <Image src="/assets/logo2.svg" alt="Logo" width={100} height={100} />
                    </Link>
                </div>
                <div className="max-w-7xl mx-auto flex items-center w-full px-2 lg:px-8">
                    <h1 className="flex-shrink-0 mr-auto"></h1>
                    <div className="flex items-center space-x-4">
                        <Select onValueChange={setYear}>
                            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select academic year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="2022 - 2026">2022-2026</SelectItem>
                                    <SelectItem value="2023 - 2027">2023-2027</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSemester}>
                            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Semester 1">Semester 1</SelectItem>
                                    <SelectItem value="Semester 2">Semester 2</SelectItem>
                                    <SelectItem value="Semester 3">Semester 3</SelectItem>
                                    <SelectItem value="Semester 4">Semester 4</SelectItem>
                                    <SelectItem value="Semester 5">Semester 5</SelectItem>
                                    <SelectItem value="Semester 6">Semester 6</SelectItem>
                                    <SelectItem value="Semester 7">Semester 7</SelectItem>
                                    <SelectItem value="Semester 8">Semester 8</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSection}>
                            <SelectTrigger className="w-40 md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select Section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="A">Section A</SelectItem>
                                    <SelectItem value="B">Section B</SelectItem>
                                    <SelectItem value="C">Section C</SelectItem>
                                    <SelectItem value="ALL">Overall</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={handleSubmit}
                            style={{ backgroundColor: '#1800f0', borderColor: '#1800f0' }}
                            className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </nav>
            <div className='flex'>
                <Home />
                <div>
                    <div>
                        <h1>Table 1</h1>
                        <Table1 data={data} />
                    </div>
                    <div>
                        <h1>Table 2</h1>
                        <Table2 data={data} />
                        <div className="mb-4 mt-8">
                            <h1>Table 3</h1>
                            <Table3 data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Grade;