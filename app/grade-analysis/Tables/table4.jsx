import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Table4 = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [arrearsStats, setArrearsStats] = useState({});

    useEffect(() => {
        if (data && data.length > 0) {
            console.log("Data received for Table4:", data);
            const stats = calculateArrears(data);
            setArrearsStats(stats);
            setLoading(false);
        } else {
            console.error("Invalid data structure received in Table4:", data);
        }
    }, [data]);

    const calculateArrears = (data) => {
        const arrearsCount = {};

        data.forEach(item => {
            const registerNo = item.RegisterNo;
            const grade = item.Grade;

            if (!arrearsCount[registerNo]) {
                arrearsCount[registerNo] = 0;
            }

            if (grade === "RA") {
                arrearsCount[registerNo] += 1;
            }
        });

        const arrearsStats = {};

        Object.values(arrearsCount).forEach(count => {
            if (!arrearsStats[count]) {
                arrearsStats[count] = 0;
            }
            arrearsStats[count] += 1;
        });

        return arrearsStats;
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet([{ "No. of Arrears": "No. of Students", ...arrearsStats }]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Arrears Statistics");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, "arrears_statistics.xlsx");
    };

    const renderBarGraph = () => {
        const labels = Object.keys(arrearsStats);
        const values = Object.values(arrearsStats);

        const chartData = {
            labels,
            datasets: [
                {
                    label: 'Number of Students',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Number of Students by Arrears Count',
                },
            },
        };

        return (
            <div style={{ width: '100%', height: '400px' }}>
                <Bar data={chartData} options={options} />
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="w-full lg:w-2/3">
                        <Table className="text-sm border-collapse border border-gray-200 w-full">
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead className="w-24 py-3 px-4">No. of Arrears</TableHead>
                                    <TableHead className="py-3 px-4">No. of Students</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.keys(arrearsStats).map(key => (
                                    <TableRow className="bg-white" key={key}>
                                        <TableCell className="font-medium py-3 px-4">{key}</TableCell>
                                        <TableCell className="py-3 px-4">{arrearsStats[key]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="w-full lg:w-2/3 mt-8">
                        {renderBarGraph()}
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={downloadExcel}>
                        Download as Excel
                    </button>
                </>
            )}
        </div>
    );
};

export default Table4;
