'use client'
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const UploadXLSX: React.FC = () => {
    const [uploadedData, setUploadedData] = useState<any[]>([]);
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const data = new Uint8Array(event.target.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0]; // assuming we're using the first sheet
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    setUploadedData(jsonData);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const data = new Uint8Array(event.target.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0]; // assuming we're using the first sheet
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    setUploadedData(jsonData);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
            />
            <div
                style={{ border: '2px dashed black', padding: '20px', marginTop: '20px' }}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <p>Drag and drop XLSX file here</p>
            </div>
            {uploadedData.length > 0 && (
                <div>
                    <h2>Uploaded Data:</h2>
                    <pre>{JSON.stringify(uploadedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default UploadXLSX;
