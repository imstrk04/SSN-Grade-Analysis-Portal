'use client';

import React, { useState, useEffect } from 'react';
import { calculateNoBacklogs } from './getData.js';

const Table1 = () => {
    const [table1Data, setTable1Data] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await calculateNoBacklogs();
            setTable1Data(data);
            setLoading(false);
        };

        fetchData();
    }, []);

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
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="border border-gray-400 px-4 py-2 text-center">Loading...</td>
                        </tr>
                    ) : (
                        Object.keys(table1Data).map(batch => (
                            <tr key={batch} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{batch}</td>
                                <td className="border border-gray-400 px-4 py-2">{table1Data[batch].totalStudents}</td>
                                <td className="border border-gray-400 px-4 py-2">{table1Data[batch].yearCounts["Year 1"]}</td>
                                <td className="border border-gray-400 px-4 py-2">{table1Data[batch].yearCounts["Year 2"]}</td>
                                <td className="border border-gray-400 px-4 py-2">{table1Data[batch].yearCounts["Year 3"]}</td>
                                <td className="border border-gray-400 px-4 py-2">{table1Data[batch].yearCounts["Year 4"]}</td>
                            </tr>
                        ))
                    )}
                    {Object.keys(table1Data).length === 0 && !loading && (
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
