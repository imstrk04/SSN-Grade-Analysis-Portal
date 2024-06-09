'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ statistics }) => {
    const labels = statistics.map(stat => stat.CourseCode);
    const passPercentages = statistics.map(stat => parseFloat(stat.PassPercentage));
    const avgGPAs = statistics.map(stat => parseFloat(stat.AvgGPA));

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Pass Percentage',
                data: passPercentages,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                yAxisID: 'y',
            },
            {
                label: 'Average GPA',
                data: avgGPAs,
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                yAxisID: 'y1',
            },
        ],
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                ticks: {
                    beginAtZero: true,
                    callback: (value) => `${value}%`,
                },
                title: {
                    display: true,
                    text: 'Pass Percentage',
                },
            },
            y1: {
                type: 'linear',
                position: 'right',
                ticks: {
                    beginAtZero: true,
                    max: 10,
                },
                title: {
                    display: true,
                    text: 'Average GPA',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineGraph;
