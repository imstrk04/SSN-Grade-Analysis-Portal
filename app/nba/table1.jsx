"use client"

import React, { useState, useEffect } from 'react';
import { calculateNoBacklogs } from './getData.js';

const Table1 = () => {
    const [table1Data, setTable1Data] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedCell, setSelectedCell] = useState(null);
    const [studentDetailsWithArrears, setStudentDetailsWithArrears] = useState(null);
    const [studentDetailsWithoutArrears, setStudentDetailsWithoutArrears] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await calculateNoBacklogs();
            setTable1Data(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleCellClick = (batch, year) => {
        setSelectedCell({ batch, year });
        setStudentDetailsWithArrears(table1Data[batch].students[year].withArrears);
        setStudentDetailsWithoutArrears(table1Data[batch].students[year].withoutArrears);
    };

    return (
        <div className="overflow-x-auto">
            <style>
                {`
                .modal {
                    display: block;
                    position: fixed;
                    z-index: 1;
                    padding-top: 60px;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    background-color: rgb(0,0,0);
                    background-color: rgba(0,0,0,0.4);
                }
                .modal-content {
                    background-color: #fefefe;
                    margin: 5% auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                }
                .close {
                    color: #aaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                }
                .close:hover,
                .close:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                }
                `}
            </style>
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
                                <td className="border border-gray-400 px-4 py-2 cursor-pointer" onClick={() => handleCellClick(batch, "Year 1")}>{table1Data[batch].yearCounts["Year 1"]}</td>
                                <td className="border border-gray-400 px-4 py-2 cursor-pointer" onClick={() => handleCellClick(batch, "Year 2")}>{table1Data[batch].yearCounts["Year 2"]}</td>
                                <td className="border border-gray-400 px-4 py-2 cursor-pointer" onClick={() => handleCellClick(batch, "Year 3")}>{table1Data[batch].yearCounts["Year 3"]}</td>
                                <td className="border border-gray-400 px-4 py-2 cursor-pointer" onClick={() => handleCellClick(batch, "Year 4")}>{table1Data[batch].yearCounts["Year 4"]}</td>
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
            {selectedCell && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedCell(null)}>&times;</span>
                        <h2>{selectedCell.batch} - {selectedCell.year}</h2>
                        <div className="flex">
                            <div className="w-1/2 p-4">
                                <h3>Students with Arrears</h3>
                                <ul>
                                    {studentDetailsWithArrears.length > 0 ? (
                                        studentDetailsWithArrears.map(student => (
                                            <li key={student.registerNo}>
                                                <strong>{student.name} ({student.registerNo}):</strong>
                                                <ul>
                                                    {student.arrears.map((arrear, index) => (
                                                        <li key={index}>
                                                            {arrear.CourseCode}: {arrear.Grade} in {arrear.ClearedBy}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No students with arrears</p>
                                    )}
                                </ul>
                            </div>
                            <div className="w-1/2 p-4">
                                <h3>Students without Arrears</h3>
                                <ul>
                                    {studentDetailsWithoutArrears.length > 0 ? (
                                        studentDetailsWithoutArrears.map(student => (
                                            <li key={student.registerNo}>
                                                <strong>{student.name} ({student.registerNo})</strong>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No students without arrears</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table1;
