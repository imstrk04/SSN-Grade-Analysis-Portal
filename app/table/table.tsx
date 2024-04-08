'use client'

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Student, generateStudents, subjects, calculateGradePoints, calculateGPA, calculateDeviation, gradePoints } from './gradesUtils';



const TableDemo: React.FC = () => {
    const [students, setStudents] = useState(generateStudents(10, subjects.length || 0));

    // Use an object to manage edit states of each row. Key: studentIndex, Value: boolean
    const [editStates, setEditStates] = useState<{ [key: number]: boolean }>({});

    const handleEditToggle = (studentIndex: number) => {
        // Toggle edit state for the specific row
        setEditStates(prev => ({ ...prev, [studentIndex]: !prev[studentIndex] }));
    };

    const handleGradeChange = (studentIndex: number | undefined, subject: string, newGrade: string) => {
        // Ensure studentIndex is defined as a number
        if (typeof studentIndex === 'number') {
            const updatedStudents = [...students];
            updatedStudents[studentIndex].grades[subject] = newGrade;
    
            // Recalculate GPA and Deviation
            const totalGradePoints = Object.values(updatedStudents[studentIndex].grades).reduce((acc, curr) => acc + calculateGradePoints(curr), 0);
            updatedStudents[studentIndex].gradePoints = totalGradePoints;
    
            const numSubjects = subjects.length || 0;
            updatedStudents[studentIndex].gpa = parseFloat(calculateGPA(totalGradePoints, numSubjects));
            updatedStudents[studentIndex].deviation = calculateDeviation(updatedStudents[studentIndex].gpa);
    
            setStudents(updatedStudents);
        }
    };
    


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent Grades</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Changes</TableHead>
                        <TableHead>Digital ID</TableHead>
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
                    {students.map((student, studentIndex) => (
                        <TableRow key={studentIndex}>
                            <TableCell>
                                <Button variant="ghost" onClick={() => handleEditToggle(studentIndex)}>
                                    {editStates[studentIndex] ? 'Save' : 'Edit'}
                                </Button>
                            </TableCell>
                            <TableCell>{student.digitalId}</TableCell>
                            <TableCell>{student.regNo}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            {subjects.map((subject, subjectIndex) => (
                                <TableCell key={subjectIndex}>
                                    {editStates[studentIndex] ? (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline">{student.grades[subject]}</Button>
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
                                        <span>{student.grades[subject]}</span>
                                    )}
                                </TableCell>
                            ))}

                            <TableCell>{student.gradePoints}</TableCell>
                            <TableCell>{student.gpa}</TableCell>
                            <TableCell>{student.deviation}</TableCell>
                            <TableCell>{student.resultStatus}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableDemo;
