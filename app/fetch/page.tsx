'use client'
// Import necessary modules and hooks from React and Firebase
import React, { useEffect, useState } from 'react';

import { db } from '@/components/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

// Define TypeScript type for the data structure you expect to receive
interface ResultDetail {
    id: string;
    Name?: string; // Using optional properties assuming data might not have these fields
    RegisterNo?: number; // Correct the property name to be camelCase
}

// Async function to fetch data from Firestore using the correct collection name
async function fetchDataFromFirestore(): Promise<ResultDetail[]> {
    const querySnapshot = await getDocs(collection(db, "result-details"));
    const data: ResultDetail[] = [];
    querySnapshot.forEach((doc) => {
        // Correctly spread doc.data() and then ensure the doc.id is the one used
        data.push({ ...doc.data() as ResultDetail, id: doc.id });
    });
    return data;
}

// Define the component
const ResultsPage = () => {
    const [userData, setUserData] = useState<ResultDetail[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchDataFromFirestore();
            setUserData(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1 className='text-5xl font-bold'>
                Fetch Data From Firestore DB
            </h1>
            <div>
                {userData.map((resultDetail) => (
                    <div key={resultDetail.id} className='mb-4'>
                        {/* Ensure properties are correctly referenced */}
                        <p className='text-xl font-bold'>{resultDetail.Name}</p>
                        <p className='text-xl font-bold'>{resultDetail.RegisterNo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResultsPage; // Make sure to export your React component
