'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({ statistics }) => {
    const data = {
        labels: [
            '9.0 GPA and above',
            '8.5-8.9 GPA',
            '8.0-8.4 GPA',
            '7.5-7.9 GPA',
            '7.0-7.4 GPA',
            '6.5-6.9 GPA',
            '6.0-6.4 GPA',
            '5.5-5.9 GPA',
            '5.0-5.4 GPA',
        ],
        datasets: [
            {
                label: 'Number of Candidates',
                data: [
                    statistics.gpaAbove9,
                    statistics.gpaAbove85,
                    statistics.gpaAbove8,
                    statistics.gpaAbove75,
                    statistics.gpaAbove7,
                    statistics.gpaAbove65,
                    statistics.gpaAbove6,
                    statistics.gpaAbove55,
                    statistics.gpaAbove5,
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Candidates',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'GPA Range',
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarGraph;
