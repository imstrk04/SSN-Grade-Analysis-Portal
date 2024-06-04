"use client";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { getDatabase, ref, update, get, push } from "firebase/database";
import db from "@/components/firebase/firebase";
import Home from "../../components/navbar/page";
import Spinner3 from "../../components/ui/spin3";

const ExcelUploader = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const populateCourses = useCallback(async (data) => {
    try {
      const database = getDatabase();
      const coursesRef = ref(database, "courses");

      const snapshot = await get(coursesRef);
      const existingData = snapshot.val() || {};

      for (let i = 1; i < data.length; i++) {
        const [courseCode, courseTitle, semester, credit] = data[i];
        if (!courseCode) continue;

        const courseData = {
          CourseCode: courseCode,
          CourseTitle: courseTitle,
          Semester: semester,
          Credit: credit,
        };

        const existingRecordKey = Object.keys(existingData).find(
          (key) => existingData[key].CourseCode === courseCode
        );
        if (existingRecordKey) {
          const updateRef = ref(database, `courses/${existingRecordKey}`);
          await update(updateRef, courseData);
        } else {
          await push(coursesRef, courseData);
        }
      }

      console.log("Courses records added successfully to Realtime Database.");
    } catch (error) {
      console.error(
        "Error adding courses records to Realtime Database:",
        error
      );
    }
  },[]);

  const populateResults = useCallback(async (data) => {
    try {
      const database = getDatabase();
      const resultsRef = ref(database, "result details");

      const snapshot = await get(resultsRef);
      const existingData = snapshot.val() || {};

      const columnNames = data[0];

      const registerNoIndex = columnNames.indexOf("Register No.");
      const nameIndex = columnNames.indexOf("Name");
      const clearedByIndex = columnNames.indexOf("ClearedBy");

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const registerNo = row[registerNoIndex];
        const name = row[nameIndex];
        const clearedBySerial = row[clearedByIndex];

        if (!registerNo || !name) continue;

        let clearedBy = "None";
        if (!isNaN(clearedBySerial)) {
          const clearedByDate = excelDateToJSDate(clearedBySerial);
          clearedBy = formatDateToMonthYear(clearedByDate);
        }

        for (let j = 0; j < columnNames.length; j++) {
          if (
            j !== registerNoIndex &&
            j !== nameIndex &&
            j !== clearedByIndex
          ) {
            const courseCode = columnNames[j];
            const grade = row[j];

            if (!courseCode) continue;

            const normalizedGrade = grade || "-";

            const rowData = {
              RegisterNo: registerNo || "None",
              Name: name || "None",
              CourseCode: courseCode || "None",
              Grade: normalizedGrade,
              ClearedBy: clearedBy || "None",
            };

            const existingRecordKey = Object.keys(existingData).find(
              (key) =>
                existingData[key].RegisterNo === rowData.RegisterNo &&
                existingData[key].CourseCode === rowData.CourseCode
            );

            if (existingRecordKey) {
              const updateRef = ref(
                database,
                `result details/${existingRecordKey}`
              );
              await update(updateRef, rowData);
            } else {
              await push(resultsRef, rowData);
            }
          }
        }
      }

      console.log("Results records added successfully to Realtime Database.");
    } catch (error) {
      console.error(
        "Error adding results records to Realtime Database:",
        error
      );
    }
  },[]);;

  const handleUploadFileToDB = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setIsLoading(true); // Show spinner
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });

            wb.SheetNames.forEach((sheetName, index) => {
              const data = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
                header: 1,
              });
              if (index === 0) {
                populateResults(data);
              } else if (index === 1) {
                populateCourses(data);
              }
            });

            setIsSubmitted(true);
            setTimeout(() => {
              setIsLoading(false); // Hide spinner after 5 seconds
            }, 5000);
          };
          reader.readAsArrayBuffer(file);
        });
      } else {
        console.log("No files dropped");
      }
    },
    [populateResults, populateCourses]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUploadFileToDB,
  });

  const excelDateToJSDate = (serial) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const fractional_day = serial - Math.floor(serial) + 0.0000001;
    let total_seconds = Math.floor(86400 * fractional_day);

    const seconds = total_seconds % 60;
    total_seconds -= seconds;

    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(
      date_info.getFullYear(),
      date_info.getMonth(),
      date_info.getDate(),
      hours,
      minutes,
      seconds
    );
  };

  const formatDateToMonthYear = (date) => {
    const options = { year: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
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
