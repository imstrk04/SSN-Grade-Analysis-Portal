"use client";

import React, { useState, useEffect } from "react";
import { db } from "../../components/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Table2 = () => {
  const [table2Data, setTable2Data] = useState({});

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const studentDetailsSnapshot = await getDocs(
          query(collection(db, "student-details"))
        );
        const resultDetailsSnapshot = await getDocs(
          query(collection(db, "result-details"))
        );

        const batches = Array.from(
          new Set(studentDetailsSnapshot.docs.map((doc) => doc.data().Batch))
        );

        const dataByBatch = {};

        for (const batch of batches) {
          const studentsInBatch = studentDetailsSnapshot.docs.filter(
            (doc) => doc.data().Batch === batch
          );
          const totalStudents = studentsInBatch.length;

          const studentsWithClearedBacklogs = studentsInBatch.filter(
            (studentDoc) => {
              const studentRegisterNo = studentDoc.data().RegisterNo;
              return resultDetailsSnapshot.docs.some(
                (resultDoc) =>
                  resultDoc.data().RegisterNo === studentRegisterNo &&
                  resultDoc.data().Grade !== "RA"
              );
            }
          );

          const studentsWithClearedBacklogsCount =
            studentsWithClearedBacklogs.length;

          dataByBatch[batch] = {
            totalStudents,
            studentsWithClearedBacklogs: studentsWithClearedBacklogsCount,
          };
        }

        setTable2Data(dataByBatch);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTableData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table className="text-sm border-collapse border border-gray-200 w-full">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-24 py-3 px-4">Batch</TableHead>
            <TableHead className="py-3 px-4">Registered Students</TableHead>
            <TableHead className="py-3 px-4" colSpan={5}>
              Students with Cleared Backlogs
            </TableHead>
          </TableRow>
          <TableRow className="bg-gray-100">
            <TableHead className="border border-gray-400 px-4 py-2"></TableHead>
            <TableHead className="border border-gray-400 px-4 py-2"></TableHead>
            <TableHead className="border border-gray-400 px-4 py-2">
              Year 1
            </TableHead>
            <TableHead className="border border-gray-400 px-4 py-2">
              Year 2
            </TableHead>
            <TableHead className="border border-gray-400 px-4 py-2">
              Year 3
            </TableHead>
            <TableHead className="border border-gray-400 px-4 py-2">
              Year 4
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(table2Data).map((batch) => (
            <TableRow key={batch} className="text-center">
              <TableCell className="border border-gray-400 px-4 py-2">
                {batch}
              </TableCell>
              <TableCell className="border border-gray-400 px-4 py-2">
                {table2Data[batch].totalStudents}
              </TableCell>
              <TableCell className="border border-gray-400 px-4 py-2">
                {table2Data[batch].studentsWithClearedBacklogs}
              </TableCell>
              <TableCell className="border border-gray-400 px-4 py-2">
                {/* Year 1 count */}
              </TableCell>
              <TableCell className="border border-gray-400 px-4 py-2">
                {/* Year 2 count */}
              </TableCell>
              <TableCell className="border border-gray-400 px-4 py-2">
                {/* Year 3 count */}
              </TableCell>
              <TableCell className="border border-gray-400 px-4 py-2">
                {/* Year 4 count */}
              </TableCell>
            </TableRow>
          ))}
          {Object.keys(table2Data).length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="border border-gray-400 px-4 py-2 text-center"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Table2;
