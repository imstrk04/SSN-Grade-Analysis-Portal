'use client'
import React, { useState } from 'react';
import TableDemo from '../table/table';
import { ModeToggle } from '../../components/ui/modetoggle';
export default function Navbar() {
    const [batch, setBatch] = useState('');
    const [semester, setSemester] = useState('');

    const handleBatchChange = (event) => {
        setBatch(event.target.value);
    };

    const handleSemesterChange = (event) => {
        setSemester(event.target.value);
    };

    const handleSubmit = () => {
        // Handle submission logic here
        console.log('Batch:', batch);
        console.log('Semester:', semester);
    };

    return (
        <><nav className="flex justify-center bg-blue-500 p-6">
            <div className="flex items-center text-white">
                <div className="mr-6">
                    <label className="block text-white">Select Batch</label>
                    <select
                        className={`form-select mt-1 block w-40 rounded-md ${batch ? 'text-black' : 'text-gray-500'}`}
                        value={batch}
                        onChange={handleBatchChange}
                    >
                        <option value="">Select Batch</option>
                        <option value="2022-26">2022-26 Batch</option>
                    </select>
                </div>
                <div className="mr-6">
                    <label className="block text-white">Select Semester</label>
                    <select
                        className={`form-select mt-1 block w-40 rounded-md ${semester ? 'text-black' : 'text-gray-500'}`}
                        value={semester}
                        onChange={handleSemesterChange}
                    >
                        <option value="">Select Semester</option>
                        <option value="Semester 1">Semester 1</option>
                        <option value="Semester 2">Semester 2</option>
                        {/* Add more semesters as needed */}
                    </select>
                </div>
                <button
                    className="bg-white hover:bg-gray-100 text-blue-500 font-semibold py-2 px-4 border border-blue-500 rounded shadow"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </nav>
            <TableDemo />
        </>
    );
}
