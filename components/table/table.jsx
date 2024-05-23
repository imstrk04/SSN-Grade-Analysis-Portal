'use client';
import React, { useEffect, useState } from "react";
import { fetchStudentData, fetchSubjects } from "./gradesUtils";
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "@/components/ui/table"; // Import Table components as needed

const TableDemo = ({ batch, semester, section }) => {
  const [userData, setUserData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [averageGPA, setAverageGPA] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const subjectsData = await fetchSubjects(batch, semester);
      setSubjects(subjectsData);

      const data = await fetchStudentData(batch, semester, section);
      if (data && data.length > 0) {
        const groupedData = data.map(student => {
          const studentData = {
            RegisterNo: student.RegisterNo,
            Name: student.Name,
          };
          student.Grades.forEach(grade => {
            studentData[grade.CourseCode] = grade.Grade;
          });

          let totalCredits = 0;
          let totalGradePoints = 0;

          subjectsData.forEach(subject => {
            const grade = studentData[subject];
            const credit = 1; // Update with actual credit logic if available

            if (grade) {
              switch (grade) {
                case "O":
                  totalGradePoints += 10 * credit;
                  break;
                case "A+":
                  totalGradePoints += 9 * credit;
                  break;
                case "A":
                  totalGradePoints += 8 * credit;
                  break;
                case "B+":
                  totalGradePoints += 7 * credit;
                  break;
                case "B":
                  totalGradePoints += 6 * credit;
                  break;
                case "C":
                  totalGradePoints += 5 * credit;
                  break;
                default:
                  break;
              }
              totalCredits += credit;
            }
          });

          const gpa = parseFloat((totalGradePoints / (totalCredits || 1)).toFixed(3));
          studentData.gpa = gpa;

          return studentData;
        });

        setUserData(groupedData);
        setAverageGPA(groupedData.reduce((acc, student) => acc + student.gpa, 0) / groupedData.length);
      }
    };

    if (batch && semester && section) {
      getData();
    }
  }, [batch, semester, section]);

  return (
    <div>
      <h1>Student Grades</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Register No</TableHeader>
            <TableHeader>Name</TableHeader>
            {subjects.map(subject => (
              <TableHeader key={subject}>{subject}</TableHeader>
            ))}
            <TableHeader>GPA</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map(student => (
            <TableRow key={student.RegisterNo}>
              <TableCell>{student.RegisterNo}</TableCell>
              <TableCell>{student.Name}</TableCell>
              {subjects.map(subject => (
                <TableCell key={subject}>{student[subject] || ''}</TableCell>
              ))}
              <TableCell>{student.gpa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2>Average GPA: {averageGPA.toFixed(3)}</h2>
    </div>
  );
};

export default TableDemo;
