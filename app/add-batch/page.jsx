"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { getDatabase, ref, update, get, push } from "firebase/database";
import db from "@/components/firebase/firebase";
import Home from "../../components/navbar/page";
import Spinner3 from "../../components/ui/spin3";
const ExcelUploader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleFileSubmit = () => {
    setIsSubmitted(true);
    setIsLoading(true);
  };

  const handleUploadFileToDB = useCallback((acceptedFiles) => {
    console.log("Files accepted for upload:", acceptedFiles);
    if (acceptedFiles && acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          console.log("Workbook read successfully:", wb);

          wb.SheetNames.forEach((sheetName) => {
            const data = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
              header: 1,
            });
            populateStudents(data);
          });

          setIsSubmitted(true);
        };
        reader.readAsArrayBuffer(file);
      });
    } else {
      console.log("No files dropped");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUploadFileToDB,
  });

  const populateStudents = async (data) => {
    console.log("Starting to populate students:", data);
    try {
      const database = getDatabase();
      const studentsRef = ref(database, "student details");

      const snapshot = await get(studentsRef);
      const existingData = snapshot.val() || {};
      console.log("Existing data from database:", existingData);

      for (let i = 1; i < data.length; i++) {
        const [registerNo, name, batch] = data[i];
        if (!registerNo) continue;

        const studentData = {
          RegisterNo: registerNo,
          Name: name,
          Batch: batch,
        };

        console.log("Student data to be added/updated:", studentData);

        const existingRecordKey = Object.keys(existingData).find(
          (key) => existingData[key].RegisterNo === registerNo
        );
        if (existingRecordKey) {
          const updateRef = ref(
            database,
            `student details/${existingRecordKey}`
          );
          await update(updateRef, studentData);
        } else {
          console.log(`Adding new record for register number ${registerNo}`);
          await push(studentsRef, studentData);
        }
      }

      console.log("Students records added successfully to Realtime Database.");
    } catch (error) {
      console.error(
        "Error adding students records to Realtime Database:",
        error
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div>
            <Spinner3 />
            <p className="text-gray-600 text-lg mt-4">
              Uploading. Please wait...
            </p>
          </div>
        </>
      ) : (
        <div className="flex h-screen bg-gray-100">
          {/* Left side - Home */}
          <div>
            <Home />
          </div>

          {/* Right side - Upload */}
          <div className="flex flex-grow items-center justify-center">
            <div
              {...getRootProps()}
              className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border-2 border-dashed border-gray-400"
            >
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Upload Your Courses and Results Here
              </h1>
              <label
                htmlFor="file"
                className="block text-center cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                    className="animate-ping"
                  >
                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-2">
                  Drag and Drop your file here
                </p>
                <p className="text-gray-600 text-lg mb-2">or</p>
                <input
                  {...getInputProps()}
                  className="hidden"
                  id="file"
                  type="file"
                />
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
        </div>
      )}
    </>
  );
};

export default ExcelUploader;
