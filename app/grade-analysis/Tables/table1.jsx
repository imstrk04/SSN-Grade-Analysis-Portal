import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Bar, Line, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const Table1 = ({ data }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data && data.length > 0) {
            setLoading(false);
        } else {
            console.error("Invalid data structure received in Table1:", data);
        }
    }, [data]);

    const calculateStatistics = () => {
        const statistics = {};
        const counters = {}; // Counter variable for each subject
        const studentsAppearedDict = {}; // Dictionary for students appeared per subject
        
        // Initialize counters and studentsAppearedDict
        data.forEach(item => {
            if (!counters[item.CourseCode]) {
                counters[item.CourseCode] = 0;
            }
            if (!studentsAppearedDict[item.CourseCode]) {
                studentsAppearedDict[item.CourseCode] = 0;
            }
        });
    
        // Calculate statistics based on the data
        data.forEach(item => {
            if (!statistics[item.CourseCode]) {
                statistics[item.CourseCode] = {
                    CourseCode: item.CourseCode,
                    CourseTitle: item.CourseTitle,
                    Appeared: 0,
                    Passed: 0,
                    Failed: 0,
                    TotalGPA: 0,
                };
            }
            if (item.Grade !== '-')
                {
                    statistics[item.CourseCode].Appeared++;
                    studentsAppearedDict[item.CourseCode]++; // Update the appeared count in the dictionary        
                }
            
            if (item.Grade !== 'U' && item.Grade !== 'R' && item.Grade !== 'RA' && item.Grade != '-' && item.Grade !== 'None') {
                statistics[item.CourseCode].Passed++;
                counters[item.CourseCode]++; // Increase counter if the student has appeared
            } else {
                statistics[item.CourseCode].Failed++;
            }
        
            if (item.Grade !== '-') { // Check if the student actually took the course
                let gradeMultiplier = 0;
                switch (item.Grade) {
                    case 'O':
                        gradeMultiplier = 10;
                        break;
                    case 'A+':
                        gradeMultiplier = 9;
                        break;
                    case 'A':
                        gradeMultiplier = 8;
                        break;
                    case 'B+':
                        gradeMultiplier = 7;
                        break;
                    case 'B':
                        gradeMultiplier = 6;
                        break;
                    case 'C':
                        gradeMultiplier = 5;
                        break;
                    default:
                        gradeMultiplier = 0;
                        break;
                }
                statistics[item.CourseCode].TotalGPA += gradeMultiplier;
            }
        });
        
        // Calculate Pass Percentage and Average GPA for each subject
        Object.values(statistics).forEach(course => {
            const totalStudents = course.Appeared;
            const passedStudents = course.Passed;
    
            const counter = counters[course.CourseCode] || 1; // Use counter or default to 1
            course.PassPercentage = totalStudents !== 0 ? ((passedStudents / totalStudents) * 100).toFixed(2) + '%' : 'N/A';
            course.AvgGPA = counter !== 0 ? (course.TotalGPA / counter).toFixed(2) : 'N/A'; // Divide by counter
        });
    
        // Print the dictionary of students appeared per subject
        console.log('appeareddict',studentsAppearedDict);
    
        return Object.values(statistics);
    };
    

    
    const statistics = calculateStatistics();

    // Prepare data for the charts
    const subjectCodes = statistics.map(stat => stat.CourseCode);
    const appearedData = statistics.map(stat => stat.Appeared);
    const passedData = statistics.map(stat => stat.Passed);
    const failedData = statistics.map(stat => stat.Failed);
    const passPercentageData = statistics.map(stat => parseFloat(stat.PassPercentage));
    const avgGPAData = statistics.map(stat => parseFloat(stat.AvgGPA));

    const barData = {
        labels: subjectCodes,
        datasets: [
            {
                label: 'Appeared',
                data: appearedData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Passed',
                data: passedData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Failed',
                data: failedData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const lineData = {
        labels: subjectCodes,
        datasets: [
            {
                label: 'Pass Percentage',
                data: passPercentageData,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                yAxisID: 'y',
            },
            {
                label: 'Avg GPA',
                data: avgGPAData,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                yAxisID: 'y1',
            },
        ],
    };

    const scatterData = {
        datasets: [
            {
                label: 'Pass Percentage vs Avg GPA',
                data: statistics.map(stat => ({
                    x: parseFloat(stat.PassPercentage),
                    y: parseFloat(stat.AvgGPA),
                })),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const lineOptions = {
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                title: { display: true, text: 'Pass Percentage' },
            },
            y1: {
                type: 'linear',
                position: 'right',
                title: { display: true, text: 'Avg GPA' },
                grid: { drawOnChartArea: false },
            },
        },
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Table className="text-sm border-collapse border border-gray-200 w-full">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="w-24 py-3 px-4">Subject Code</TableHead>
                                <TableHead className="py-3 px-4">Subject Name</TableHead>
                                <TableHead className="py-3 px-4">Appeared</TableHead>
                                <TableHead className="py-3 px-4">Passed</TableHead>
                                <TableHead className="py-3 px-4">Failed</TableHead>
                                <TableHead className="w-24 py-3 px-4">Pass %</TableHead>
                                <TableHead className="w-24 py-3 px-4">Avg GPA</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {statistics.map((statistic, index) => (
                                <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <TableCell className="font-medium py-3 px-4">{statistic.CourseCode}</TableCell>
                                    <TableCell className="py-3 px-4">{statistic.CourseTitle}</TableCell>
                                    <TableCell className="py-3 px-4">{statistic.Appeared}</TableCell>
                                    <TableCell className="py-3 px-4">{statistic.Passed}</TableCell>
                                    <TableCell className="py-3 px-4">{statistic.Failed}</TableCell>
                                    <TableCell className="text-right py-3 px-4">{statistic.PassPercentage}</TableCell>
                                    <TableCell className="text-right py-3 px-4">{statistic.AvgGPA}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="my-8">
                        <h2 className="text-lg font-bold mb-4">Bar Chart</h2>
                        <Bar data={barData} />
                    </div>

                    <div className="my-8">
                        <h2 className="text-lg font-bold mb-4">Line Chart</h2>
                        <Line data={lineData} options={lineOptions} />
                    </div>

                    <div className="my-8">
                        <h2 className="text-lg font-bold mb-4">Scatter Plot</h2>
                        <Scatter data={scatterData} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Table1;
