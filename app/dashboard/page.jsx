"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/dashboard/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/components/firebase/firebase.js";
import { useRouter } from "next/navigation";
import { fetchData, fetchRollNumbers } from "@/app/dashboard/Fetch";
import Spinner2 from "@/components/ui/spin2";

const GradebookPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [rollNumberStart, setRollNumberStart] = useState("");
  const [rollNumberEnd, setRollNumberEnd] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  const handleSubmit = async () => {
    setLoading(true);
    const fetchedData = await fetchData(
      year,
      semester,
      rollNumberStart,
      rollNumberEnd
    );
    setData(fetchedData);
    setLoading(false);
  };

  useEffect(() => {
    const fetchDefaultRollNumbers = async () => {
      const rollNumbers = await fetchRollNumbers(year);
      if (rollNumbers.length > 0) {
        setRollNumberStart(Math.min(...rollNumbers).toString());
        setRollNumberEnd(Math.max(...rollNumbers).toString());
      }
    };

    if (year) {
      fetchDefaultRollNumbers();
    }
  }, [year]);

  if (!user) {
    return null;
  }

  const calculateGPA = (grades) => {
    if (!grades || Object.keys(grades).length === 0)
      return { gpa: 0, gradePoints: 0 };

    const gradePoints = {
      O: 10,
      "A+": 9,
      A: 8,
      "B+": 7,
      B: 6,
      C: 5,
      U: 0,
      R: 0,
      RA: 0,
    };

    let totalGradePoints = 0;
    let totalCredits = 0;

    for (const course in grades) {
      const grade = grades[course][0];
      const credit = grades[course][1] || 0;
      if (grade !== "-") {
        totalGradePoints += gradePoints[grade] * credit;
        totalCredits += credit;
      }
    }

    const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    return {
      gradePoints: totalGradePoints,
      gpa: gpa.toFixed(2),
    };
  };

  const calculateDeviation = (gpa, averageGPA) => {
    return (gpa - averageGPA).toFixed(2);
  };

  const calculateRanking = (gpa, allGPAs) => {
    const sortedGPAs = allGPAs.sort((a, b) => b - a);
    const index = sortedGPAs.indexOf(gpa);
    return index + 1;
  };

  const getAverageGPA = () => {
    const validGPAs = Object.values(data)
      .map(([_, grades]) => parseFloat(calculateGPA(grades).gpa))
      .filter((gpa) => !isNaN(gpa) && gpa > 0);

    const totalGPA = validGPAs.reduce((acc, gpa) => acc + gpa, 0);

    return validGPAs.length > 0 ? totalGPA / validGPAs.length : 0;
  };

  const averageGPA = getAverageGPA();

  return (
    <>
      <style jsx>{`
        .table-container {
          position: relative;
          max-height: 600px; /* Set the maximum height of the container */
          overflow-y: auto; /* Enable vertical scrolling */
        }

        .table-header {
          position: sticky;
          top: 0;
          background-color: white; /* Background color of the header */
          z-index: 1;
        }

        .fixed-header {
          position: sticky;
          top: 0;
          background-color: white; /* Background color of the header */
          z-index: 2;
        }

        .fixed-cell {
          position: sticky;
          right: 0;
          background-color: white; /* Background color of the cell */
          z-index: 1;
        }

        .no-data {
          text-align: center;
        }

        .text-right {
          text-align: right;
        }
      `}</style>
      <Navbar
        setYear={setYear}
        setSemester={setSemester}
        setRollNumberStart={setRollNumberStart}
        setRollNumberEnd={setRollNumberEnd}
        handleSubmit={handleSubmit}
        rollNumberStart={rollNumberStart}
        rollNumberEnd={rollNumberEnd}
      />

      {loading ? (
        <div className="loading">
          <Spinner2 />
        </div>
      ) : (
        <div className="table-container">
          <Table>
            <TableCaption>
              A list of student grades and performance metrics.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">S.No</TableHead>
                <TableHead>Register Number</TableHead>
                <TableHead>Name</TableHead>
                {Object.keys(data).length > 0 &&
                data[Object.keys(data)[0]][1] ? (
                  Object.keys(data[Object.keys(data)[0]][1]).map(
                    (courseCode, index) => (
                      <TableHead key={index}>{courseCode}</TableHead>
                    )
                  )
                ) : (
                  <TableHead>No grades available</TableHead>
                )}
                <TableHead className="fixed-header">GPA</TableHead>
                <TableHead className="fixed-header">Grade Points</TableHead>
                <TableHead className="fixed-header">Deviation</TableHead>
                <TableHead className="fixed-header">Ranking</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(data).length === 0 ? (
                <TableRow>
                  <TableCell colSpan="8" className="no-data">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                Object.entries(data)
                  .filter(([_, [__, grades]]) => Object.keys(grades).length > 0)
                  .map(([registerNo, [name, grades]], index) => {
                    const { gpa, gradePoints } = calculateGPA(grades);
                    const validGPAs = Object.values(data)
                      .map(([_, grades]) =>
                        parseFloat(calculateGPA(grades).gpa)
                      )
                      .filter((gpa) => !isNaN(gpa) && gpa > 0);
                    const deviation = calculateDeviation(
                      parseFloat(gpa),
                      averageGPA
                    );
                    const ranking = calculateRanking(
                      parseFloat(gpa),
                      validGPAs
                    );
                    return (
                      <TableRow key={registerNo}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{registerNo}</TableCell>
                        <TableCell>{name}</TableCell>
                        {grades ? (
                          Object.entries(grades).map(
                            ([courseCode, grade], i) => (
                              <TableCell key={i}>{grade[0]}</TableCell>
                            )
                          )
                        ) : (
                          <TableCell>No grades available</TableCell>
                        )}
                        <TableCell className="fixed-cell">{gpa}</TableCell>
                        <TableCell className="fixed-cell">
                          {gradePoints}
                        </TableCell>
                        <TableCell className="fixed-cell">
                          {deviation}
                        </TableCell>
                        <TableCell className="fixed-cell">{ranking}</TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>Total Students</TableCell>
                <TableCell className="text-right">
                  {Object.keys(data).length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </>
  );
};

export default GradebookPage;
