import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  return (
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
  );
};

export default Table3;
