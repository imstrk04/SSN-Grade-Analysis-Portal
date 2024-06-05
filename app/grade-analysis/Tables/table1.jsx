'use client'
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
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            console.log("Data received for Table1:", data);
            const stats = calculateStatistics(data);
            setStatistics(stats);
            setLoading(false);
        } else {
            console.error("Invalid data structure received in Table1:", data);
        }
    }, [data]);

    const calculateStatistics = (data) => {
        const courseStats = {};

        const gradePoints = {
            'O': 10,
            'A+': 9,
            'A': 8,
            'B+': 7,
            'B': 6,
            'C': 5,
            'U': 0,
            'R': 0,
            'RA': 0
        };

        data.forEach(item => {
            const { CourseCode, CourseTitle, Grade, GradeCredit } = item;
            const GRADES = ['O', 'A+', 'A', 'B', 'B+', 'C', 'RA', 'U', 'AB'];

            if (GRADES.includes(Grade)) {
                if (!courseStats[CourseCode]) {
                    courseStats[CourseCode] = {
                        CourseTitle,
                        appeared: 0,
                        passed: 0,
                        failed: 0,
                        totalGradePoints: 0,
                        totalCredits: 0,
                    };
                }
                
                courseStats[CourseCode].appeared++;
                courseStats[CourseCode].totalCredits += GradeCredit || 0;
                courseStats[CourseCode].totalGradePoints += (Grade in gradePoints ? gradePoints[Grade] : 0) * (GradeCredit || 0);

                if (Grade !== 'RA' && Grade !== 'U' && Grade !== 'AB') {
                    courseStats[CourseCode].passed++;
                } else {
                    courseStats[CourseCode].failed++;
                }
            }
        });

        Object.keys(courseStats).forEach(courseCode => {
            const stats = courseStats[courseCode];
            stats.passPercentage = ((stats.passed / stats.appeared) * 100).toFixed(2);
            stats.avgGPA = (stats.totalGradePoints / stats.totalCredits).toFixed(2);
        });

        return Object.keys(courseStats).map(courseCode => ({
            CourseCode: courseCode,
            CourseTitle: courseStats[courseCode].CourseTitle,
            Appeared: courseStats[courseCode].appeared,
            Passed: courseStats[courseCode].passed,
            Failed: courseStats[courseCode].failed,
            PassPercentage: courseStats[courseCode].passPercentage,
            AvgGPA: courseStats[courseCode].avgGPA
        }));
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table className="text-sm border-collapse border border-gray-200 w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="py-3 px-4">Subject Code</TableHead>
                            <TableHead className="py-3 px-4">Subject Name</TableHead>
                            <TableHead className="py-3 px-4">Appeared</TableHead>
                            <TableHead className="py-3 px-4">Passed</TableHead>
                            <TableHead className="py-3 px-4">Failed</TableHead>
                            <TableHead className="py-3 px-4">Pass %</TableHead>
                            <TableHead className="py-3 px-4">Avg GPA</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {statistics.map(stat => (
                            <TableRow key={stat.CourseCode} className="bg-white">
                                <TableCell className="py-3 px-4">{stat.CourseCode}</TableCell>
                                <TableCell className="py-3 px-4">{stat.CourseTitle}</TableCell>
                                <TableCell className="py-3 px-4">{stat.Appeared}</TableCell>
                                <TableCell className="py-3 px-4">{stat.Passed}</TableCell>
                                <TableCell className="py-3 px-4">{stat.Failed}</TableCell>
                                <TableCell className="py-3 px-4">{stat.PassPercentage}</TableCell>
                                <TableCell className="py-3 px-4">{stat.AvgGPA}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default Table1;
