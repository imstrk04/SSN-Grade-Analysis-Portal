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
  
          // Process each sheet
          wb.SheetNames.forEach((sheetName) => {
            const data = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
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
  

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleUploadFileToDB });

  const populateTable = async (data, tableName) => {
    try {
        // Get a reference to the Firebase Realtime Database
        const database = getDatabase();
    
        // Get a reference to the specific table (node) in the Realtime Database
        const tableRef = ref(database, tableName);
    
        // Extract column names from the header row
        const columnNames = data[0];
    
        // Iterate over each row (excluding the header row)
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            const registerNo = row[columnNames.indexOf("Register No.")]; // Adjust column name as needed
            const name = row[columnNames.indexOf("Name")]; // Adjust column name as needed
            const clearedBy = row[columnNames.indexOf("ClearedBy")]; // Adjust column name as needed
    
            // Find the index of the course code column dynamically
            const courseCodeIndex = row.findIndex((cell, index) => index >= 2 && index % 2 === 0);
            const courseCode = columnNames[courseCodeIndex]; // Extract course code from column names
    
            // Iterate over each grade entry
            for (let j = 2; j < row.length - 1; j += 2) {
                const grade = row[j + 1]; // Fetch grade from the subsequent column
    
                // Construct the object with the desired format
                const rowData = {
                    "RegisterNo": registerNo,
                    "Name": name,
                    "CourseCode": courseCode,
                    "Grade": grade,
                    "ClearedBy": clearedBy
                };
    
                // Push the row data to the Realtime Database
                await push(tableRef, rowData);
            }
        }
    
        console.log(`${tableName} records added successfully to Realtime Database.`);
    } catch (error) {
        console.error(`Error adding ${tableName} records to Realtime Database:`, error);
    }
};


  
  return (
    <div>
      <h1 className='upload-text'><b>Upload Your Grades Here</b></h1>
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



// import React, { useEffect, useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { Button } from '@mui/material';
// import * as XLSX from 'xlsx';
// import { getFirestore, collection, getDocs, addDoc, addDocs} from 'firebase/firestore';
// import { getDatabase, ref, push } from 'firebase/database';
// import db from '../config/firebase.js'; // Importing Firebase configuration

// const ExcelUploader = () => {
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleUploadFileToDB = useCallback((acceptedFiles) => {
//     if (acceptedFiles && acceptedFiles.length > 0) {
//       acceptedFiles.forEach((file) => {
//         const reader = new FileReader();
//         reader.onload = (evt) => {
//           const bstr = evt.target.result;
//           const wb = XLSX.read(bstr, { type: 'binary' });

//           // Process each sheet
//           const sheets = wb.SheetNames.map(name => ({ name, data: XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 }) }));

//           for (const { name, data } of sheets) {
//             const tableName = name.toLowerCase(); // Adjust this mapping as needed
//             populateTable(data, tableName);
//           }

//           setIsSubmitted(true);
//         };
//         reader.readAsArrayBuffer(file); // Use readAsArrayBuffer instead of readAsBinaryString
//       });
//     } else {
//       console.log("No files dropped");
//     }
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({ onDrop: handleUploadFileToDB });

//   const populateTable = async (data, tableName) => {
//     let targetTableName = tableName; // Declare targetTableName here
  
//     try {
//       console.log(`Adding data to collection: ${tableName}`);
//       console.log("Data received:", data); // Log the data to check its structure
//       // Check if the tableName matches the expected sheet names, if not, assign the appropriate table name
//       if (tableName !== "Student" && tableName !== "ResultData" && tableName !== "CourseInfo") {
//         switch (tableName.toLowerCase()) {
//           case "students details":
//             targetTableName = "Student";
//             break;
//           case "result details":
//             targetTableName = "ResultData";
//             break;
//           case "semester 3 courses":
//             targetTableName = "CourseInfo";
//             break;
//           default:
//             console.warn(`Unknown table name: ${tableName}. Using provided tableName.`);
//         }
//       }
//       const tableRef = collection(db, targetTableName);
//       // Assuming the first row contains the column headers
//       const headers = data[0];
//       // Iterate over each row (excluding the header row)
//       for (let i = 1; i < data.length; i++) {
//         const row = data[i];
//         // Create an object where keys are column headers and values are row values
//         const rowData = {};
//         for (let j = 0; j < headers.length; j++) {
//           rowData[headers[j]] = row[j];
//         }
//         // Add the row data to Firestore
//         await addDoc(tableRef, rowData);
//       }
//       console.log(`${targetTableName} records added successfully.`);
//     } catch (error) {
//       console.error(`Error adding ${targetTableName} records:`, error);
//     }
//   };
  

//   return (
//     <div>
//       <h1 className='upload-text'><b>Upload Your Grades Here</b></h1>
//       <div {...getRootProps()}>
//         <Button className = "upload-button" variant="contained" component="label">
//           Upload File
//           <input {...getInputProps()} style={{ display: 'none' }} />
//         </Button>
//       </div>
//       <div>
//         {/* <Button variant="contained" onClick={handleViewTables}>
//           View Tables
//         </Button> */}
//       </div>
//       {isSubmitted && <p className='file-submitted'>File submitted successfully!</p>}
//     </div>
//   );
// };

// export default ExcelUploader;