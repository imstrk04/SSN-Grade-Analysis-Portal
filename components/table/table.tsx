'use client'
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { subjects, calculateGradePoints, calculateGPA, calculateDeviation } from './gradesUtils';

import { db } from '@/components/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

interface ResultDetail {
    id: string;
    Name?: string;
    RegisterNo?: number;
}

async function fetchDataFromFirestore(): Promise<ResultDetail[]> {
    const querySnapshot = await getDocs(collection(db, "result-details"));
    const data: ResultDetail[] = [];
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() as ResultDetail, id: doc.id });
    });
    return data;
}

const TableDemo: React.FC = () => {
    const [userData, setUserData] = useState<ResultDetail[]>([]);
    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            // Sort the data by Register No.
            data.sort((a, b) => (a.RegisterNo || 0) - (b.RegisterNo || 0));
            setUserData(data);
        }
        fetchData();
    }, []);

    const [editStates, setEditStates] = useState<{ [key: number]: boolean }>({});

    const handleEditToggle = (studentIndex: number) => {
        setEditStates(prev => ({ ...prev, [studentIndex]: !prev[studentIndex] }));
    };

    const handleGradeChange = (studentIndex: number | undefined, subject: string, newGrade: string) => {
        // Handle grade change logic
    };

    return (
        <Table>
            <TableCaption>A list of your recent Grades</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Changes</TableHead>
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
                        <TableCell>
                            <Button variant="ghost" onClick={() => handleEditToggle(studentIndex)}>
                                {editStates[studentIndex] ? 'Save' : 'Edit'}
                            </Button>
                        </TableCell>
                        <TableCell>{student.RegisterNo}</TableCell>
                        <TableCell>{student.Name}</TableCell>
                        {subjects.map((subject, subjectIndex) => (
                            <TableCell key={subjectIndex}>
                                {editStates[studentIndex] ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">Grade</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-28">
                                            <DropdownMenuItem onSelect={() => handleGradeChange(studentIndex, subject, 'O')}>O</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleGradeChange(studentIndex, subject, 'A+')}>A+</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleGradeChange(studentIndex, subject, 'A')}>A</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleGradeChange(studentIndex, subject, 'B+')}>B+</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleGradeChange(studentIndex, subject, 'B')}>B</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => handleGradeChange(studentIndex, subject, 'C')}>C</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <span>Grade</span>
                                )}
                            </TableCell>
                        ))}
                        <TableCell>Grade Points</TableCell>
                        <TableCell>GPA</TableCell>
                        <TableCell>Deviation</TableCell>
                        <TableCell>Result Status</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableDemo;
