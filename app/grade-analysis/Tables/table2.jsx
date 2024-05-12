import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Table2() {
    return (
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
                            <td className="py-2 px-2">Students with CGPA &gt; 8.5</td>
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
    );
}
