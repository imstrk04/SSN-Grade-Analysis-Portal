import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Table1 = ({ data }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data && data.length > 0) {
            setLoading(false);
        } else {
            console.error("Invalid data structure received in Table1:", data);
        }
    }, [data]);
    const calculateStatistics = () => {
        const statistics = {};
    
        // Calculate statistics based on the data
        data.forEach(item => {
            // Assuming each item has CourseCode, CourseTitle, and Grade properties
            if (!statistics[item.CourseCode]) {
                statistics[item.CourseCode] = {
                    CourseCode: item.CourseCode,
                    CourseTitle: item.CourseTitle,
                    Appeared: 0,
                    Passed: 0,
                    Failed: 0,
                    TotalGPA: 0
                };
            }
    
            statistics[item.CourseCode].Appeared++;
            if (item.Grade !== 'U' && item.Grade !== 'R' && item.Grade !== 'RA' ) {
                statistics[item.CourseCode].Passed++;
            } else {
                statistics[item.CourseCode].Failed++;
            }
    
            // Calculate total GPA for each course (if needed)
            let gradeMultiplier = 0;
            switch (item.Grade) {
                case 'O':
                    gradeMultiplier = 10;
                    break;
                case 'A+':
                    gradeMultiplier = 9;
                    break;
                case 'A':
                    gradeMultiplier = 8;
                    break;
                case 'B+':
                    gradeMultiplier = 7;
                    break;
                case 'B':
                    gradeMultiplier = 6;
                    break;
                case 'C':
                    gradeMultiplier = 5;
                    break;
                default:
                    gradeMultiplier = 0;
                    break;
            }
            statistics[item.CourseCode].TotalGPA += gradeMultiplier;
        });
    
        // Calculate pass percentage and average GPA for each course
        Object.values(statistics).forEach(course => {
            const totalStudents = course.Appeared;
            const passedStudents = course.Passed;
            const failedStudents = course.Failed;
            
            course.PassPercentage = totalStudents !== 0 ? ((passedStudents / totalStudents) * 100).toFixed(2) + '%' : 'N/A';
            course.AvgGPA = totalStudents !== 0 ? (course.TotalGPA / totalStudents).toFixed(2) : 'N/A';
        });
    
        return Object.values(statistics);
    };
    
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table className="text-sm border-collapse border border-gray-200 w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="w-24 py-3 px-4">Subject Code</TableHead>
                            <TableHead className="py-3 px-4">Subject Name</TableHead>
                            <TableHead className="py-3 px-4">Appeared</TableHead>
                            <TableHead className="py-3 px-4">Passed</TableHead>
                            <TableHead className="py-3 px-4">Failed</TableHead>
                            <TableHead className="w-24 py-3 px-4">Pass %</TableHead>
                            <TableHead className="w-24 py-3 px-4">Avg GPA</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {calculateStatistics().map((statistic, index) => (
                            <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <TableCell className="font-medium py-3 px-4">{statistic.CourseCode}</TableCell>
                                <TableCell className="py-3 px-4">{statistic.CourseTitle}</TableCell>
                                <TableCell className="py-3 px-4">{statistic.Appeared}</TableCell>
                                <TableCell className="py-3 px-4">{statistic.Passed}</TableCell>
                                <TableCell className="py-3 px-4">{statistic.Failed}</TableCell>
                                <TableCell className="text-right py-3 px-4">{statistic.PassPercentage}</TableCell>
                                <TableCell className="text-right py-3 px-4">{statistic.AvgGPA}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default Table1;


// import React, { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { db } from '@/components/firebase/firebase'

// interface Course {
//     CourseCode: string;
//     CourseTitle: string;
//     Credit: number;
//     Semester: number;
// }

// interface StudentResult {
//     ClearedBy: number;
//     CourseCode: string;
//     Grade: string;
//     Name: string;
//     RegisterNo: number;
// }

// const Table1 = () => {
//     const [coursesMap, setCoursesMap] = useState<{ [key: string]: Course }>({});
//     const [resultDetails, setResultDetails] = useState<{ [key: string]: StudentResult }>({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const database = getDatabase();
//         const coursesRef = ref(database, 'courses');
//         const resultDetailsRef = ref(database, 'result details');

//         const fetchData = () => {
//             onValue(coursesRef, (snapshot) => {
//                 if (snapshot.exists()) {
//                     setCoursesMap(snapshot.val());
//                 } else {
//                     console.log("No data available for courses");
//                 }
//                 setLoading(false);
//             });

//             onValue(resultDetailsRef, (snapshot) => {
//                 if (snapshot.exists()) {
//                     setResultDetails(snapshot.val());
//                 } else {
//                     console.log("No data available for result details");
//                 }
//                 setLoading(false);
//             });
//         };

//         fetchData();
//     }, []);

//     const calculateStatistics = () => {
//         const statistics = [];

//         for (const courseId in coursesMap) {
//             if (Object.prototype.hasOwnProperty.call(coursesMap, courseId)) {
//                 const course = coursesMap[courseId];
//                 const students = Object.values(resultDetails).filter((student: StudentResult) => student.CourseCode === course.CourseCode);

//                 const appeared = students.length;
//                 const passed = students.filter((student: StudentResult) => student.Grade !== 'U' && student.Grade !== 'R').length;
//                 const failed = appeared - passed;
//                 const passPercentage = appeared !== 0 ? ((passed / appeared) * 100).toFixed(2) + '%' : 'N/A';

//                 let totalGPA = 0;
//                 students.forEach((student: StudentResult) => {
//                     let gradeMultiplier = 0;
//                     switch (student.Grade) {
//                         case 'O':
//                             gradeMultiplier = 10;
//                             break;
//                         case 'A':
//                             gradeMultiplier = 9;
//                             break;
//                         case 'B':
//                             gradeMultiplier = 8;
//                             break;
//                         case 'C':
//                             gradeMultiplier = 7;
//                             break;
//                         case 'D':
//                             gradeMultiplier = 6;
//                             break;
//                         case 'E':
//                             gradeMultiplier = 5;
//                             break;
//                         default:
//                             gradeMultiplier = 0;
//                             break;
//                     }
//                     totalGPA += gradeMultiplier * course.Credit;
//                 });

//                 const avgGPA = appeared !== 0 ? (totalGPA / (appeared * course.Credit)).toFixed(2) : 'N/A';

//                 statistics.push({
//                     CourseCode: course.CourseCode,
//                     CourseTitle: course.CourseTitle,
//                     Appeared: appeared,
//                     Passed: passed,
//                     Failed: failed,
//                     PassPercentage: passPercentage,
//                     AvgGPA: avgGPA
//                 });
//             }
//         }

//         return statistics;
//     };

//     return (
//         <div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <Table className="text-sm border-collapse border border-gray-200 w-full">
//                     <TableHeader>
//                         <TableRow className="bg-gray-100">
//                             <TableHead className="w-24 py-3 px-4">Subject Code</TableHead>
//                             <TableHead className="py-3 px-4">Subject Name</TableHead>
//                             <TableHead className="py-3 px-4">Appeared</TableHead>
//                             <TableHead className="py-3 px-4">Passed</TableHead>
//                             <TableHead className="py-3 px-4">Failed</TableHead>
//                             <TableHead className="w-24 py-3 px-4">Pass %</TableHead>
//                             <TableHead className="w-24 py-3 px-4">Avg GPA</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {calculateStatistics().map((statistic, index) => (
//                             <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                                 <TableCell className="font-medium py-3 px-4">{statistic.CourseCode}</TableCell>
//                                 <TableCell className="py-3 px-4">{statistic.CourseTitle}</TableCell>
//                                 <TableCell className="py-3 px-4">{statistic.Appeared}</TableCell>
//                                 <TableCell className="py-3 px-4">{statistic.Passed}</TableCell>
//                                 <TableCell className="py-3 px-4">{statistic.Failed}</TableCell>
//                                 <TableCell className="text-right py-3 px-4">{statistic.PassPercentage}</TableCell>
//                                 <TableCell className="text-right py-3 px-4">{statistic.AvgGPA}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             )}
//         </div>
//     );
// };

// export default Table1;


// import React from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

// const invoices = [
//     { subjectCode: "SC001", subjectName: "Data and Communication Networks", teacher: "Dr.G.Sornavalli", appeared: 50, passed: 40, failed: 10, passPercentage: "80%", avgGPA: 3.6 },
//     { subjectCode: "SC002", subjectName: "Automata Theory and Complier Design", teacher: "Dr.R.Swathika", appeared: 60, passed: 50, failed: 10, passPercentage: "83.33%", avgGPA: 3.8 },
//     { subjectCode: "SC003", subjectName: "Advanced Data Structures and Algorithm Analysis", teacher: "Dr.S.Mohanavalli", appeared: 55, passed: 45, failed: 10, passPercentage: "81.82%", avgGPA: 3.7 },
//     { subjectCode: "SC004", subjectName: "Microprocessor and Microcontroller", teacher: "Dr. S.UmaMaheswari", appeared: 45, passed: 35, failed: 10, passPercentage: "77.78%", avgGPA: 3.5 },
// ];

// export default function Table1() {
//     return (
//         <Table className="text-sm border-collapse border border-gray-200 w-full">
//             <TableHeader>
//                 <TableRow className="bg-gray-100">
//                     <TableHead className="w-24 py-3 px-4">Subject Code</TableHead>
//                     <TableHead className="py-3 px-4">Subject Name</TableHead>
//                     <TableHead className="py-3 px-4">Teacher Name</TableHead>
//                     <TableHead className="py-3 px-4">Appeared</TableHead>
//                     <TableHead className="py-3 px-4">Passed</TableHead>
//                     <TableHead className="py-3 px-4">Failed</TableHead>
//                     <TableHead className="w-24 py-3 px-4">Pass %</TableHead>
//                     <TableHead className="w-24 py-3 px-4">Avg GPA</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {invoices.map((invoice, index) => (
//                     <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                         <TableCell className="font-medium py-3 px-4">{invoice.subjectCode}</TableCell>
//                         <TableCell className="py-3 px-4">{invoice.subjectName}</TableCell>
//                         <TableCell className="py-3 px-4">{invoice.teacher}</TableCell>
//                         <TableCell className="py-3 px-4">{invoice.appeared}</TableCell>
//                         <TableCell className="py-3 px-4">{invoice.passed}</TableCell>
//                         <TableCell className="py-3 px-4">{invoice.failed}</TableCell>
//                         <TableCell className="text-right py-3 px-4">{invoice.passPercentage}</TableCell>
//                         <TableCell className="text-right py-3 px-4">{invoice.avgGPA}</TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     );
// }
