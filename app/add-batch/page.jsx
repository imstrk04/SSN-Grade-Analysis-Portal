"use client"
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import { getDatabase, ref, push } from 'firebase/database';

const ExcelUploader = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUploadFileToDB = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });

          wb.SheetNames.forEach((sheetName) => {
            const data = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
            if (sheetName.toLowerCase() === 'students details') {
              populateStudents(data);
            } else if (sheetName.toLowerCase() === 'courses') {
              populateCourses(data);
            }
          });

          setIsSubmitted(true);
        };
        reader.readAsArrayBuffer(file);
      });
    } else {
      console.log("No files dropped");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleUploadFileToDB });

  const populateStudents = async (data) => {
    try {
      const database = getDatabase();
      const studentsRef = ref(database, 'students details');

      for (let i = 1; i < data.length; i++) {
        const [registerNo, name, batch, section] = data[i];
        const studentData = {
          "RegisterNo": registerNo,
          "Name": name,
          "Batch": batch,
          "Section": section
        };
        await push(studentsRef, studentData);
      }

      console.log("Students records added successfully to Realtime Database.");
    } catch (error) {
      console.error("Error adding students records to Realtime Database:", error);
    }
  };

  const populateCourses = async (data) => {
    try {
      const database = getDatabase();
      const coursesRef = ref(database, 'courses');

      for (let i = 1; i < data.length; i++) {
        const [courseCode, courseTitle, semester, credit] = data[i];
        const courseData = {
          "CourseCode": courseCode,
          "CourseTitle": courseTitle,
          "Semester": semester,
          "Credit": credit
        };
        await push(coursesRef, courseData);
      }

      console.log("Courses records added successfully to Realtime Database.");
    } catch (error) {
      console.error("Error adding courses records to Realtime Database:", error);
    }
  };

  return (
    <div>
      <h1 className='upload-text'><b>Upload Student and Course Details Here</b></h1>
      <div {...getRootProps()}>
        <Button className="upload-button" variant="contained" component="label">
          Upload File
          <input {...getInputProps()} style={{ display: 'none' }} />
        </Button>
      </div>
      {isSubmitted && <p className='file-submitted'>File submitted successfully!</p>}
    </div>
  );
};

export default ExcelUploader;
