import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import db from '@/components/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const TableDemo = () => {
    const [userData, setUserData] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const querySnapshot = await getDocs(collection(db, "result-details"));
                const data = [];
        
                querySnapshot.forEach((doc) => {
                    const resultDetail = {
                        id: doc.id,
                        Name: doc.data().Name,
                        RegisterNo: doc.data().RegisterNo,
                    };
        
                    subjects.forEach((subject) => {
                        if (doc.data()[subject]) {
                            resultDetail[subject] = doc.data()[subject];
                        }
                    });

                    // Calculate Grade Points and GPA
                    let totalCredits = 0;
                    let totalGradePoints = 0;
                    subjects.forEach((subject) => {
                        const grade = resultDetail[subject];
                        const credit = resultDetail[`${subject}_credit`]; // Assuming credits are stored with a _credit suffix
                        totalCredits += credit;
                        switch (grade) {
                            case "O":
                                totalGradePoints += 10 * credit;
                                break;
                            case "A+":
                                totalGradePoints += 9 * credit;
                                break;
                            case "A":
                                totalGradePoints += 8 * credit;
                                break;
                            case "B+":
                                totalGradePoints += 7 * credit;
                                break;
                            case "C":
                                totalGradePoints += 6 * credit; // Changed from 7x to 6x as per your specification
                                break;
                            default:
                                // Do nothing for other grades
                                break;
                        }
                    });
                    const gpa = totalGradePoints / totalCredits;
                    resultDetail['GPA'] = gpa.toFixed(2);
                    resultDetail['GradePoints'] = totalGradePoints;
        
                    data.push(resultDetail);
                });
        
                data.sort((a, b) => (a.RegisterNo || 0) - (b.RegisterNo || 0));
                setUserData(data);
            } catch (error) {
                console.error("Error fetching data from Firestore:", error);
            }
        }

        async function fetchSubjects() {
            try {
                const querySnapshot = await getDocs(collection(db, "sem3"));
                const subjectsList = querySnapshot.docs.map(doc => doc.data()['coursecode']).filter(Boolean);
        
                subjectsList.sort((a, b) => {
                    const regex = /\d+/;
                    const aNumber = parseInt(a.match(regex)[0]);
                    const bNumber = parseInt(b.match(regex)[0]);
                    return aNumber - bNumber;
                });
        
                setSubjects(subjectsList);
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        }

        fetchData();
        fetchSubjects();
    }, [subjects]);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Reg No.</TableHead>
                    <TableHead>Name</TableHead>
                    {subjects.map((subject, index) => (
                        <TableHead key={index}>{subject}</TableHead>
                    ))}
                    <TableHead>Grade Points</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Deviation</TableHead>
                    <TableHead>Result Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userData.map((student, studentIndex) => (
                    <TableRow key={student.id}>
                        <TableCell>{student.RegisterNo}</TableCell>
                        <TableCell>{student.Name}</TableCell>
                        {subjects.map((subject, subjectIndex) => (
                            <TableCell key={subjectIndex}>
                                <span>{student[subject]}</span>
                            </TableCell>
                        ))}
                        <TableCell>{student.GradePoints}</TableCell>
                        <TableCell>{student.GPA}</TableCell>
                        <TableCell>Deviation</TableCell>
                        <TableCell>Result Status</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableDemo;
