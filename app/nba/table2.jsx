'use client'

import React, { useState, useEffect } from 'react';
import { db } from '../../components/firebase/config';
import { collection, getDocs, query } from 'firebase/firestore';

const Table2 = () => {
    const [table2Data, setTable2Data] = useState({});

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const studentDetailsSnapshot = await getDocs(query(collection(db, 'student-details')));
                const resultDetailsSnapshot = await getDocs(query(collection(db, 'result-details')));

                const batches = Array.from(new Set(studentDetailsSnapshot.docs.map(doc => doc.data().Batch)));

                const dataByBatch = {};

                for (const batch of batches) {
                    const studentsInBatch = studentDetailsSnapshot.docs.filter(doc => doc.data().Batch === batch);
                    const totalStudents = studentsInBatch.length;

                    const studentsWithClearedBacklogs = studentsInBatch.filter(studentDoc => {
                        const studentRegisterNo = studentDoc.data().RegisterNo;
                        return resultDetailsSnapshot.docs.some(resultDoc => resultDoc.data().RegisterNo === studentRegisterNo && resultDoc.data().Grade !== "RA");
                    });

                    const studentsWithClearedBacklogsCount = studentsWithClearedBacklogs.length;

                    dataByBatch[batch] = { totalStudents, studentsWithClearedBacklogs: studentsWithClearedBacklogsCount };
                }

                setTable2Data(dataByBatch);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTableData();
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Batch</th>
                        <th className="border border-gray-400 px-4 py-2">Registered Students</th>
                        <th className="border border-gray-400 px-4 py-2" colSpan={5}>Students with Cleared Backlogs</th>
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
                    {Object.keys(table2Data).map(batch => {
                        return (
                            <tr key={batch} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{batch}</td>
                                <td className="border border-gray-400 px-4 py-2">{table2Data[batch].totalStudents}</td>
                                <td className="border border-gray-400 px-4 py-2">{table2Data[batch].studentsWithClearedBacklogs}</td>
                                <td className="border border-gray-400 px-4 py-2">{/* Year 1 count */}</td>
                                <td className="border border-gray-400 px-4 py-2">{/* Year 2 count */}</td>
                                <td className="border border-gray-400 px-4 py-2">{/* Year 3 count */}</td>
                                <td className="border border-gray-400 px-4 py-2">{/* Year 4 count */}</td>
                            </tr>
                        );
                    })}
                    {Object.keys(table2Data).length === 0 && (
                        <tr>
                            <td colSpan={7} className="border border-gray-400 px-4 py-2 text-center">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table2;
