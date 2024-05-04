"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import * as XLSX from "xlsx";
import { getDatabase, ref, push } from "firebase/database";
import { Button } from "@/components/ui/button";
import db from "@/components/firebase/firebase.js";
const ExcelUploader = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUploadFileToDB = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });

          // Process each sheet
          wb.SheetNames.forEach((sheetName) => {
            const data = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
              header: 1,
            });
            const tableName = sheetName.toLowerCase(); // Adjust this mapping as needed
            populateTable(data, tableName);
          });

          setIsSubmitted(true);
        };
        reader.readAsArrayBuffer(file); // Use readAsArrayBuffer instead of readAsBinaryString
      });
    } else {
      console.log("No files dropped");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUploadFileToDB,
  });

  const populateTable = async (data, tableName) => {
    try {
      // Get a reference to the Firebase Realtime Database
      const database = getDatabase();

      // Get a reference to the specific table (node) in the Realtime Database
      const tableRef = ref(database, tableName);

      // Iterate over each row (excluding the header row)
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const registerNo = row[0]; // Assuming Register No. is the first column
        const name = row[1]; // Assuming Name is the second column
        const clearedBy = row[row.length - 1]; // Assuming ClearedBy is the last column

        // Iterate over each grade entry starting from the third column
        for (let j = 2; j < row.length - 1; j += 2) {
          const courseCode = Object.keys(row[j])[0]; // Assuming course code is the key in the object
          const grade = row[j][courseCode];

          // Construct the object with the desired format
          const rowData = {
            RegisterNo: registerNo, // Changed key to adhere to Firebase key naming rules
            Name: name,
            CourseCode: courseCode,
            Grade: grade,
            ClearedBy: clearedBy, // Include ClearedBy in the data object
          };

          // Push the row data to the Realtime Database
          await push(tableRef, rowData);
        }
      }

      console.log(
        `${tableName} records added successfully to Realtime Database.`
      );
    } catch (error) {
      console.error(
        `Error adding ${tableName} records to Realtime Database:`,
        error
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div
      {...getRootProps()}
      className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-400"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Sem Grades Here
      </h1>
      <label htmlFor="file" className="block text-center cursor-pointer">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 640 512" className="w-12 h-12 text-gray-500">
            <path
              fill="currentColor"
              d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
            />
          </svg>
        </div>
        <p className="text-gray-600 text-lg mb-2">Drag and Drop your file here</p>
        <p className="text-gray-600 text-lg mb-2">or</p>
        <input {...getInputProps()} className="hidden" id="file" type="file" />
        <label
          htmlFor="file"
          className="inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
        >
          Browse file
        </label>
      </label>
      {isSubmitted && (
        <p className="text-green-600 mt-4 font-semibold text-center">
          File submitted successfully!
        </p>
      )}
    </div>
  </div>
  
  );
};

export default ExcelUploader;

