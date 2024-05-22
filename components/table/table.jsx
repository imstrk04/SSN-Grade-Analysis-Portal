"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableDemo = ({ data }) => {
  const [userData, setUserData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [averageGPA, setAverageGPA] = useState(0);

  useEffect(() => {
    console.log("Data received:", data);
    console.log("userData:", userData);
    console.log("subjects:", subjects);
    if (data && data.length > 0) {
      const subjectsList = [...new Set(data.map(item => item.CourseCode))];
      setSubjects(subjectsList);
      
      const groupedData = data.reduce((acc, curr) => {
        const studentIndex = acc.findIndex(item => item.RegisterNo === curr.RegisterNo);
        if (studentIndex === -1) {
          acc.push({
            RegisterNo: curr.RegisterNo,
            Name: curr.Name,
            [curr.CourseCode]: curr.Grade,
          });
        } else {
          acc[studentIndex][curr.CourseCode] = curr.Grade;
        }
        return acc;
      }, []);
  
      groupedData.forEach(student => {
        let totalCredits = 0;
        let totalGradePoints = 0;
  
        subjectsList.forEach((subject) => {
          const grade = student[subject];
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
  
        const gpa = totalGradePoints / totalCredits;
        student["GPA"] = gpa.toFixed(2);
        student["GradePoints"] = totalGradePoints;
      });
  
      // Calculate average GPA
      const totalGPA = groupedData.reduce((sum, student) => sum + parseFloat(student.GPA), 0);
      setAverageGPA((totalGPA / groupedData.length).toFixed(2));
  
      // Calculate ranks
      groupedData.sort((a, b) => b.GPA - a.GPA);
      groupedData.forEach((student, index) => {
        student.Rank = index + 1;
      });
  
      // Calculate deviation
      groupedData.forEach((student) => {
        student.Deviation = (student.GPA - averageGPA).toFixed(2);
      });
  
      // Sort by RegisterNo for display
      groupedData.sort((a, b) => (a.RegisterNo || 0) - (b.RegisterNo || 0));
      setUserData(groupedData);
    }
  }, [data]);
  

  return (
    <Table className="overflow-x-auto">
      <TableHeader className="sticky top-0 bg-white z-10">
        <TableRow>
          <TableHead>Reg No.</TableHead>
          <TableHead>Name</TableHead>
          {subjects.map((subject, index) => (
            <TableHead key={index}>{subject}</TableHead>
          ))}
          <TableHead>Grade Points</TableHead>
          <TableHead>GPA</TableHead>
          <TableHead>Rank</TableHead>
          <TableHead>Deviation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.map((student) => (
          <TableRow key={student.RegisterNo}>
            <TableCell>{student.RegisterNo}</TableCell>
            <TableCell>{student.Name}</TableCell>
            {subjects.map((subject, index) => (
              <TableCell key={index}>{student[subject]}</TableCell>
            ))}
            <TableCell>{student.GradePoints}</TableCell>
            <TableCell>{student.GPA}</TableCell>
            <TableCell>{student.Rank}</TableCell>
            <TableCell>{student.Deviation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableDemo;
