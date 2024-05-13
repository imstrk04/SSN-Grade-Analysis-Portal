import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const invoic = [
    {
        subjectCode: "SC001",
        subjectName: "Data and Communication Networks",
        O: 10,
        "AA": 20,
        "A": 30,
        "BB": 0,
        "B": 10,
        "C": 10
    },
    {
        subjectCode: "SC002",
        subjectName: "Automata Theory and Compiler Design",
        "O": 10,
        "AA": 20,
        "A": 30,
        "BB": 0,
        "B": 10,
        "C": 10
    },
    {
        subjectCode: "SC003",
        subjectName: "Advanced Data Structures and Algorithm Analysis",
        "O": 10,
        "AA": 20,
        "A": 30,
        "BB": 0,
        "B": 10,
        "C": 10
    },
    {
        subjectCode: "SC004",
        subjectName: "Microprocessor and Microcontroller",
        "O": 10,
        "AA": 20,
        "A": 30,
        "BB": 0,
        "B": 10,
        "C": 10
    },
];

export default function Table3() {
    return (
        <Table className="text-sm border-collapse border border-gray-200 w-full">
            <TableHeader>
                <TableRow className="bg-gray-100">
                    <TableHead className="w-24 py-3 px-4">Subject Code</TableHead>
                    <TableHead className="py-3 px-4">Subject Name</TableHead>
                    <TableHead className="py-3 px-4">O</TableHead>
                    <TableHead className="py-3 px-4">A+</TableHead>
                    <TableHead className="py-3 px-4">A</TableHead>
                    <TableHead className="py-3 px-4">B+</TableHead>
                    <TableHead className="py-3 px-4">B</TableHead>
                    <TableHead className="py-3 px-4">C</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoic.map((invoice, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <TableCell className="font-medium py-3 px-4">{invoice.subjectCode}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.subjectName}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.O}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.AA}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.A}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.BB}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.B}</TableCell>
                        <TableCell className="py-3 px-4">{invoice.C}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}