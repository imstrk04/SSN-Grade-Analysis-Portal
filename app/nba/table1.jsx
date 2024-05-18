'use client'

import React, { useState, useEffect } from 'react';
import db from '../../components/firebase/config';
import { ref, get, child, getDatabase } from 'firebase/database';

const parseExcelDate = (excelDate) => {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const millisecondsSinceEpoch = excelDate * 24 * 60 * 60 * 1000;
    const date = new Date(excelEpoch.getTime() + millisecondsSinceEpoch);
    return date;
};

const Table1 = () => {
    const [table1Data, setTable1Data] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const dbRef = ref(getDatabase());
                const studentDetailsSnapshot = await get(child(dbRef, 'students details'));
                const resultDetailsSnapshot = await get(child(dbRef, 'result details'));

                const studentDetails = Object.values(studentDetailsSnapshot.val());
                const resultDetails = Object.values(resultDetailsSnapshot.val());

                const batches = Array.from(new Set(studentDetails.map(data => data.Batch)));

                const dataByBatch = {};

                for (const batch of batches) {
                    const studentsInBatch = studentDetails.filter(data => data.Batch === batch);
                    const totalStudents = studentsInBatch.length;

                    const yearCounts = {
                        "Year 1": 0,
                        "Year 2": 0,
                        "Year 3": 0,
                        "Year 4": 0
                    };

                    for (const student of studentsInBatch) {
                        const studentResultDetails = resultDetails.filter(result => result.RegisterNo === student.RegisterNo);

                        // Find the maximum 'ClearedBy' date for the student
                        let maxClearedBy = 0;
                        for (const result of studentResultDetails) {
                            if (result.ClearedBy > maxClearedBy) {
                                maxClearedBy = result.ClearedBy;
                            }
                        }

                        // Convert 'ClearedBy' to human-readable year
                        const clearedByDate = parseExcelDate(maxClearedBy);
                        const clearedByYear = clearedByDate.getFullYear();

                        // Determine the academic year based on 'ClearedBy' date
                        const startYear = parseInt(batch.split(" - ")[0]);
                        const currentYearInBatch = clearedByYear - startYear + 1;

                        // Count the student if they have no backlogs for the current year and all previous years
                        if (!studentResultDetails.some(result => result.Grade === 'RA')) {
                            for (let i = 1; i <= currentYearInBatch; i++) {
                                yearCounts[`Year ${i}`]++;
                            }
                        }
                    }

                    dataByBatch[batch] = { totalStudents, yearCounts };
                }

                setTable1Data(dataByBatch);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTableData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Batch</th>
                        <th className="border border-gray-400 px-4 py-2">Registered Students</th>
                        <th className="border border-gray-400 px-4 py-2" colSpan={4}>Students with No Backlogs</th>
                    </tr>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2"></th>
                        <th className="border border-gray-400 px-4 py-2"></th>
                        <th className="border border-gray-400 px-4 py-2">Year 1</th>
                        <th className="border border-gray-400 px-4 py-2">Year 2</th>
                        <th className="border border-gray-400 px-4 py-2">Year 3</th>
                        <th className="border border-gray-400 px-4 py-2">Year 4</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(table1Data).map(batch => (
                        <tr key={batch} className="text-center">
                            <td className="border border-gray-400 px-4 py-2">{batch}</td>
                            <td className="border border-gray-400 px-4 py-2">{table1Data[batch].totalStudents}</td>
                            <td className="border border-gray-400 px-4 py-2">{table1Data[batch].yearCounts["Year 1"]}</td>
                            <td className="border border-gray-400 px-4 py-2">{table1Data[batch].yearCounts["Year 2"]}</td>
                            <td className="border border-gray-400 px-4 py-2">{table1Data[batch].yearCounts["Year 3"]}</td>
                            <td className="border border-gray-400 px-4 py-2">{table1Data[batch].yearCounts["Year 4"]}</td>
                        </tr>
                    ))}
                    {Object.keys(table1Data).length === 0 && (
                        <tr>
                            <td colSpan={6} className="border border-gray-400 px-4 py-2 text-center">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table1;
