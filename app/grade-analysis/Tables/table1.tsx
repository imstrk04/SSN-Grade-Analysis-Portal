import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const invoices = [
    { subjectCode: "SC001", subjectName: "Data and Communication Networks", teacher: "Dr.G.Sornavalli", appeared: 50, passed: 40, failed: 10, passPercentage: "80%", avgGPA: 3.6 },
    { subjectCode: "SC002", subjectName: "Automata Theory and Complier Design", teacher: "Dr.R.Swathika", appeared: 60, passed: 50, failed: 10, passPercentage: "83.33%", avgGPA: 3.8 },
    { subjectCode: "SC003", subjectName: "Advanced Data Structures and Algorithm Analysis", teacher: "Dr.S.Mohanavalli", appeared: 55, passed: 45, failed: 10, passPercentage: "81.82%", avgGPA: 3.7 },
    { subjectCode: "SC004", subjectName: "Microprocessor and Microcontroller", teacher: "Dr. S.UmaMaheswari", appeared: 45, passed: 35, failed: 10, passPercentage: "77.78%", avgGPA: 3.5 },
];

export default function Table1() {
    return (
        <Table className="text-sm border-collapse border border-gray-200 w-full">
            <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead className="w-24 py-3 px-4">Subject Code</TableHead>
                    <TableHead className="py-3 px-4">Subject Name</TableHead>
                    <TableHead className="py-3 px-4">Teacher Name</TableHead>
                    <TableHead className="py-3 px-4">Appeared</TableHead>
                    <TableHead className="py-3 px-4">Passed</TableHead>
                    <TableHead className="py-3 px-4">Failed</TableHead>
                    <TableHead className="w-24 py-3 px-4">Pass %</TableHead>
                    <TableHead className="w-24 py-3 px-4">Avg GPA</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <TableCell className="font-medium py-3 px-4">{invoice.subjectCode}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.subjectName}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.teacher}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.appeared}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.passed}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.failed}</TableCell>
                        <TableCell className="text-right py-3 px-4">{invoice.passPercentage}</TableCell>
                        <TableCell className="text-right py-3 px-4">{invoice.avgGPA}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
