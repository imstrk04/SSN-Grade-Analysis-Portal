import React, { useState, useEffect } from 'react';
import db from "@/components/firebase/firebase.js";
import { ref, get, getDatabase } from 'firebase/database'; 

interface Table1Data {
    totalStudents: number;
    studentsWithoutBacklogs: number[];
}

const Table1: React.FC = () => {
    const [table1Data, setTable1Data] = useState<{ [batch: string]: Table1Data }>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const database = getDatabase();
                const studentDetailsRef = ref(database, 'students details');
                const resultDetailsRef = ref(database, 'sheet1');

                const [studentDetailsSnapshot, resultDetailsSnapshot] = await Promise.all([
                    get(studentDetailsRef),
                    get(resultDetailsRef)
                ]);

                const studentDetails = studentDetailsSnapshot.val(); // Convert the snapshot to data
                const resultDetails = resultDetailsSnapshot.val(); // Convert the snapshot to data

                console.log(studentDetails)

                const batches: string[] = Object.keys(studentDetails || {}); // Extract batch keys

                const dataByBatch: { [batch: string]: Table1Data } = {};

                for (const batch of batches) {
                    const studentsInBatch = studentDetails[batch] || {}; // Get students for the batch
                    const totalStudents = Object.keys(studentsInBatch).length; // Count students

                    const studentsWithoutBacklogs: number[] = [0, 0, 0, 0]; // Initialize array for each year

                    Object.values(studentsInBatch).forEach(student => {
                        const registerNo = student.RegisterNo;
                        const hasBacklogs = Object.values(resultDetails).some((result: any) => {
                            return result.RegisterNo === registerNo && result.Grade === "RA";
                        });
                        
                        if (!hasBacklogs) {
                            const semester = calculateSemester(resultDetails[registerNo].ClearedBy);
                            const yearInBatch = calculateYearInBatch(batch, semester);
                            studentsWithoutBacklogs[yearInBatch - 1]++;
                        }
                    });

                    dataByBatch[batch] = { totalStudents, studentsWithoutBacklogs };
                }
                console.log('Data fetched successfully:', dataByBatch);

                setTable1Data(dataByBatch);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchTableData();
    }, []);

    const calculateYearInBatch = (batch: string, semester: string): number => {
        const [startYear] = batch.split(" - ");
        const currentYear = new Date().getFullYear();
        const yearsSinceStart = currentYear - parseInt(startYear) + 1;
        let yearInBatch = Math.ceil(yearsSinceStart / 2); // Divide by 2 semesters per year
        if (semester === "sem 1") {
            yearInBatch--;
        }
        return Math.min(yearInBatch, 4);
    };

    const calculateSemester = (clearedBy: string): string => {
        const clearedDate = new Date(clearedBy);
        const month = clearedDate.getMonth();
        return month >= 4 && month <= 10 ? "sem 1" : "sem 2"; // May to November (sem 2), December to April (sem 1)
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
                            {table1Data[batch].studentsWithoutBacklogs.map((count, index) => (
                                <td key={index} className="border border-gray-400 px-4 py-2">{count}</td>
                            ))}
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
