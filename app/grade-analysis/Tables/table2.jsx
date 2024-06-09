'use client';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BarGraph from './BarGraph';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Table2 = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        if (data && data.length > 0) {
            console.log("Data received for Table2:", data);
            const stats = calculateStatistics(data);
            setStatistics(stats);
            setLoading(false);
        } else {
            console.error("Invalid data structure received in Table2:", data);
        }
    }, [data]);

    const calculateStatistics = (data) => {
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

        const studentGPAs = {};
        const passedStudents = {};

        data.forEach(item => {
            if (!studentGPAs[item.RegisterNo]) {
                studentGPAs[item.RegisterNo] = {
                    totalGradePoints: 0,
                    totalCredits: 0
                };
            }
            if (!passedStudents[item.RegisterNo]) {
                passedStudents[item.RegisterNo] = "Passed";
            }

            if (item.Grade != '-') {
                const grade = gradePoints[item.Grade];
                const credit = item.GradeCredit || 0;

                studentGPAs[item.RegisterNo].totalGradePoints += grade * credit;
                studentGPAs[item.RegisterNo].totalCredits += credit;

                if (item.Grade === "RA") {
                    passedStudents[item.RegisterNo] = "Failed";
                }
            }
        });

        const gpas = Object.values(studentGPAs).map(student => {
            return student.totalCredits > 0 ? (student.totalGradePoints / student.totalCredits) : 0;
        });

        console.log(gpas.sort((a, b) => b - a));

        const stats = {
            appeared: gpas.length,
            passed: Object.values(passedStudents).filter(status => status === "Passed").length,
            gpaAbove9: gpas.filter(gpa => gpa >= 9).length,
            gpaAbove85: gpas.filter(gpa => gpa >= 8.5 && gpa < 9).length,
            gpaAbove8: gpas.filter(gpa => gpa >= 8 && gpa < 8.5).length,
            gpaAbove75: gpas.filter(gpa => gpa >= 7.5 && gpa < 8).length,
            gpaAbove7: gpas.filter(gpa => gpa >= 7 && gpa < 7.5).length,
            gpaAbove65: gpas.filter(gpa => gpa >= 6.5 && gpa < 7).length,
            gpaAbove6: gpas.filter(gpa => gpa >= 6 && gpa < 6.5).length,
            gpaAbove55: gpas.filter(gpa => gpa >= 5.5 && gpa < 6).length,
            gpaAbove5: gpas.filter(gpa => gpa >= 5 && gpa < 5.5).length
        };

        console.log("Calculated statistics:", stats);
        return stats;
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet([statistics]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Statistics");
        XLSX.writeFile(workbook, "statistics.xlsx");
    };

    return (
        <div className="flex flex-wrap justify-start">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="w-full">
                        <Table className="text-sm border-collapse border border-gray-200 w-full">
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead className="w-100 py-3 px-4">Metric</TableHead>
                                    <TableHead className="py-3 px-4">Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="bg-white">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates Appeared</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.appeared}</TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates Passed</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.passed}</TableCell>
                                </TableRow>
                                <TableRow className="bg-white">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates scored more than 9.0 GPA</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.gpaAbove9}</TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates scored more than 8.5 GPA</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.gpaAbove85}</TableCell>
                                </TableRow>
                                <TableRow className="bg-white">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates scored more than 8.0 GPA</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.gpaAbove8}</TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates scored more than 7.5 GPA</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.gpaAbove75}</TableCell>
                                </TableRow>
                                <TableRow className="bg-white">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates scored more than 7.0 GPA</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.gpaAbove7}</TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates scored more than 6.5 GPA</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.gpaAbove65}</TableCell>
                                </TableRow>
                                <TableRow className="bg-white">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates scored more than 6.0 GPA</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.gpaAbove6}</TableCell>
                                </TableRow>
                                <TableRow className="bg-gray-50">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates scored more than 5.5 GPA</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.gpaAbove55}</TableCell>
                                </TableRow>
                                <TableRow className="bg-white">
                                    <TableCell className="font-medium py-3 px-4 break-all">No. of Candidates scored more than 5.0 GPA</TableCell>
                                    <TableCell className="py-3 px-4">{statistics.gpaAbove5}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="w-full mt-8">
                        <BarGraph statistics={statistics} />
                    </div>
                    <div className="w-full mt-8">
                        <button onClick={downloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Download as Excel
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Table2;

