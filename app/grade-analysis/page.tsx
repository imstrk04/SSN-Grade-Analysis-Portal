import React from 'react';
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
import Home from '../navbar/page';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Grade: React.FC = () => {
    const invoices = [
        { subjectCode: "SC001", subjectName: "Data and Communication Networks", teacher: "Dr.G.Sornavalli", appeared: 50, passed: 40, failed: 10, passPercentage: "80%", avgGPA: 3.6 },
        { subjectCode: "SC002", subjectName: "Automata Theory and Complier Design", teacher: "Dr.R.Swathika", appeared: 60, passed: 50, failed: 10, passPercentage: "83.33%", avgGPA: 3.8 },
        { subjectCode: "SC003", subjectName: "Advanced Data Structures and Algorithm Analysis", teacher: "Dr.S.Mohanavalli", appeared: 55, passed: 45, failed: 10, passPercentage: "81.82%", avgGPA: 3.7 },
        { subjectCode: "SC004", subjectName: "Microprocessor and Microcontroller", teacher: "Dr. S.UmaMaheswari", appeared: 45, passed: 35, failed: 10, passPercentage: "77.78%", avgGPA: 3.5 },

    ];
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
            subjectCode: "SC002", subjectName: "Automata Theory and Complier Design",
            "O": 10,
            "AA": 20,
            "A": 30,
            "BB": 0,
            "B": 10,
            "C": 10
        },
        {
            subjectCode: "SC003", subjectName: "Advanced Data Structures and Algorithm Analysis", "O": 10,
            "AA": 20,
            "A": 30,
            "BB": 0,
            "B": 10,
            "C": 10
        },
        {
            subjectCode: "SC004", subjectName: "Microprocessor and Microcontroller", teacher: "Dr. S.UmaMaheswari", "O": 10,
            "AA": 20,
            "A": 30,
            "BB": 0,
            "B": 10,
            "C": 10
        },

    ];

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
                        <Select>
                            <SelectTrigger className="w-full md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select academic year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="2022-2023">2022-2026</SelectItem>
                                    <SelectItem value="2023-2024">2023-2027</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
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
                        <Select>
                            <SelectTrigger className="w-40 md:w-[200px] bg-white text-gray-800 rounded-md cursor-pointer">
                                <SelectValue placeholder="Select Section" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="A">Section A</SelectItem>
                                    <SelectItem value="B">Section B</SelectItem>
                                    <SelectItem value="C">Section C</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button style={{ backgroundColor: '#1800f0', borderColor: '#1800f0' }} className="text-white hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-150 ease-in-out">
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
                    </div>
                    <div>
                        <h1>Table 2</h1>

                        <div className="flex justify-start " style={{ marginLeft: '40px' }}>
                            <div className="overflow-x-auto max-w-full">
                                <table className="w-full text-sm border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-2">Metrics</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="font-bold py-2 px-2">Number Of Students Appeared</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="font-bold py-2 px-2">Number Of Students Passed</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-2">Students with CGPA &gt;= 9</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="py-2 px-2">Students with CGPA &gt;= 8.5</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-2">Students with CGPA &gt;= 8</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="py-2 px-2">Students with CGPA &gt;= 7.5</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-2">Students with CGPA &gt;= 7.0</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="py-2 px-2">Students with CGPA &gt;= 6.5</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="overflow-x-auto max-w-full">
                                <table className="w-full text-sm border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-2 px-2">Students</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="py-2 px-2">100</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="py-2 px-2">80</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-2">20</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="py-2 px-2">30</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-2">40</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="py-2 px-2">50</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="py-2 px-2">60</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <td className="py-2 px-2">70</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="overflow-x-auto max-w-full ml-auto">
                                <Table className="border-collapse border border-gray-300">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border border-gray-300 p-3">No. Of Arrears</TableHead>
                                            <TableHead className="border border-gray-300 p-3">Count</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {/* Data for 1 to 6 arrears */}
                                        {[...Array(6)].map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium border border-gray-300 p-3">{index + 1}</TableCell>
                                                <TableCell className="border border-gray-300 p-3">{Math.floor(Math.random() * 100)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        <div className="mb-4 mt-8">
                            <h1>Table 4</h1>
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

                        </div>


                    </div>
                </div>
            </div>




        </>
    );
};

export default Grade;
