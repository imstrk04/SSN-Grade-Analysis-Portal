'use client'

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { collection, addDoc, Firestore } from 'firebase/firestore';
import { db } from "@/components/firebase/config"
interface DataRow {
  [key: string]: any;
}

const ExcelUploader: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleUploadFileToDB = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (evt: ProgressEvent<FileReader>) => {
          const bstr = evt.target?.result;
          if (typeof bstr === "string") {
            const wb = XLSX.read(bstr, { type: 'binary' });

            // Process each sheet
            const sheets = wb.SheetNames.map(name => ({ name, data: XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1 }) }));

            for (const { name, data } of sheets) {
              const tableName = name.toLowerCase();
              populateTable(data, tableName);
            }

            setIsSubmitted(true);
          }
        };
        reader.readAsBinaryString(file);
      });
    } else {
      console.log("No files dropped");
    }
  }, []);

  const populateTable = async (data: any[], tableName: string) => {
    let targetTableName: string = tableName; // Declare targetTableName here

    try {
      console.log(`Adding data to collection: ${tableName}`);
      console.log("Data received:", data); // Log the data to check its structure

      const tableRef = collection(db as Firestore, targetTableName);
      const headers = data[0] as string[];

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const rowData: DataRow = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        await addDoc(tableRef, rowData);
      }
      console.log(`${targetTableName} records added successfully.`);
    } catch (error) {
      console.error(`Error adding ${targetTableName} records:`, error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleUploadFileToDB });

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-xl font-bold text-gray-800 mb-6">Upload Your Grades Here</h1>
    <div {...getRootProps({ className: "dropzone" })}>
        <button className="relative bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-xl">
            Upload File
            <input {...getInputProps()} className="hidden" />
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-300 rounded-lg opacity-50 hover:opacity-75 transition duration-300 ease-in-out"></div>
        </button>
    </div>
    {isSubmitted && <p className="text-green-600 mt-4 font-semibold">File submitted successfully!</p>}
</div>




  );
};

export default ExcelUploader;
