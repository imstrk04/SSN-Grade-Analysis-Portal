const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
import * as XLSX from 'xlsx';
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { saveAs } from 'file-saver';

ChartJS.register(ArcElement, Tooltip, Legend);

const Table3 = ({ data }) => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (data) {
      const processCourseData = () => {
        const combinedData = {};

        data.forEach((item) => {
          const { CourseCode, CourseTitle, Grade } = item;

          if (!combinedData[CourseCode]) {
            combinedData[CourseCode] = {
              CourseTitle,
              Grades: { O: 0, "A+": 0, A: 0, "B+": 0, B: 0, C: 0 },
            };
          }

          const grades = combinedData[CourseCode].Grades;
          grades[Grade]++;
        });

        setCourseData(combinedData);
      };

      processCourseData();
    }
  }, [data]);

  const getPieChartData = (grades) => {
    return {
      labels: ['O', 'A+', 'A', 'B+', 'B', 'C'],
      datasets: [
        {
          data: [grades['O'], grades['A+'], grades['A'], grades['B+'], grades['B'], grades['C']],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const downloadExcel = () => {
    if (!courseData) return;
  
    // Convert courseData object to an array of objects
    const dataArr = Object.keys(courseData).map((courseCode) => ({
      CourseCode: courseCode,
      CourseTitle: courseData[courseCode].CourseTitle,
      O: courseData[courseCode].Grades["O"],
      "A+": courseData[courseCode].Grades["A+"],
      A: courseData[courseCode].Grades["A"],
      "B+": courseData[courseCode].Grades["B+"],
      B: courseData[courseCode].Grades["B"],
      C: courseData[courseCode].Grades["C"],
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataArr);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Courses");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    // Save the excelBuffer as an Excel file
    const blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    saveAs(blob, "courses.xlsx");
  };
  

  return (
    <div>
      <Table className="text-sm border-collapse border border-gray-200 w-full">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-24 py-3 px-4">Course Code</TableHead>
            <TableHead className="py-3 px-4">Course Title</TableHead>
            <TableHead className="py-3 px-4">O</TableHead>
            <TableHead className="py-3 px-4">A+</TableHead>
            <TableHead className="py-3 px-4">A</TableHead>
            <TableHead className="py-3 px-4">B+</TableHead>
            <TableHead className="py-3 px-4">B</TableHead>
            <TableHead className="py-3 px-4">C</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseData &&
            Object.entries(courseData).map(([courseCode, course], index) => (
              <TableRow
                key={courseCode}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="font-medium py-3 px-4">
                  {courseCode}
                </TableCell>
                <TableCell className="py-3 px-4">{course.CourseTitle}</TableCell>
                <TableCell className="py-3 px-4">{course.Grades["O"]}</TableCell>
                <TableCell className="py-3 px-4">{course.Grades["A+"]}</TableCell>
                <TableCell className="py-3 px-4">{course.Grades["A"]}</TableCell>
                <TableCell className="py-3 px-4">{course.Grades["B+"]}</TableCell>
                <TableCell className="py-3 px-4">{course.Grades["B"]}</TableCell>
                <TableCell className="py-3 px-4">{course.Grades["C"]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <div className="my-8 flex flex-wrap">
        {courseData &&
          Object.entries(courseData).map(([courseCode, course], index) => (
            <div key={courseCode} className="w-1/4 p-2">
              <h2 className="text-sm font-bold mb-2 text-center">{course.CourseTitle}</h2>
              <div className="w-full h-64">
                <Pie data={getPieChartData(course.Grades)} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-center">
        <button onClick={downloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download as Excel
        </button>
      </div>
    </div>
  );
};

export default Table3;
