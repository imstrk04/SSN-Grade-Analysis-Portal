
import React, { useState, useEffect } from 'react';
import { db } from '../../components/firebase/config';
import { collection, getDocs, query } from 'firebase/firestore';

interface Table1Data {
    totalStudents: number;
    studentsWithoutBacklogs: number;
}

const Table1: React.FC = () => {
    const [table1Data, setTable1Data] = useState<{[batch: string]: Table1Data}>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const studentDetailsSnapshot = await getDocs(query(collection(db, 'student-details')));
                const resultDetailsSnapshot = await getDocs(query(collection(db, 'result-details')));

                const studentDetails = studentDetailsSnapshot.docs.map(doc => doc.data());
                const resultDetails = resultDetailsSnapshot.docs.map(doc => doc.data());

                const batches: string[] = [];
                studentDetails.forEach(data => {
                    const batch = data.Batch;
                    if (!batches.includes(batch)) {
                        batches.push(batch);
                    }
                });

                const dataByBatch: {[batch: string]: Table1Data} = {};

                for (const batch of batches) {
                    const studentsInBatch = studentDetails.filter(data => data.Batch === batch);
                    const totalStudents = studentsInBatch.length;

                    const studentsWithNoBacklogs = studentsInBatch.filter(student => {
                        const hasBacklogs = resultDetails.some(result => {
                            return result.RegisterNo === student.RegisterNo && result.Grade === "RA";
                        });
                        return !hasBacklogs;
                    });

                    const studentsWithoutBacklogs = studentsWithNoBacklogs.length;

                    dataByBatch[batch] = { totalStudents, studentsWithoutBacklogs };
                }

                setTable1Data(dataByBatch);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTableData();
    }, []);

    const calculateYearInBatch = (startYear: number, currentYear: number): number => {
        const yearsSinceStart = currentYear - startYear + 1;
        return Math.min(yearsSinceStart, 4); 
    };

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
                        <th className="border border-gray-400 px-4 py-2" colSpan={5}>Students with No Backlogs</th>
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
                    {Object.keys(table1Data).map(batch => {
                        const yearCounts: {[year: string]: number} = {
                            "Year 1": 0,
                            "Year 2": 0,
                            "Year 3": 0,
                            "Year 4": 0
                        };

                        const [startYear] = batch.split(" - ");
                        const startYearNum = parseInt(startYear);

                        const currentYear = new Date().getFullYear();
                        Object.values(table1Data[batch]).forEach(student => {
                            const yearInBatch = calculateYearInBatch(startYearNum, currentYear);
                            yearCounts[`Year ${yearInBatch}`]++;
                        });

                        return (
                            <tr key={batch} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{batch}</td>
                                <td className="border border-gray-400 px-4 py-2">{table1Data[batch].totalStudents}</td>
                                <td className="border border-gray-400 px-4 py-2">{yearCounts["Year 1"]}</td>
                                <td className="border border-gray-400 px-4 py-2">{yearCounts["Year 2"]}</td>
                                <td className="border border-gray-400 px-4 py-2">{yearCounts["Year 3"]}</td>
                                <td className="border border-gray-400 px-4 py-2">{yearCounts["Year 4"]}</td>
                            </tr>
                        );
                    })}
                    {Object.keys(table1Data).length === 0 && (
                        <tr>
                            <td colSpan={7} className="border border-gray-400 px-4 py-2 text-center">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table1;
