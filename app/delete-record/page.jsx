'use client'
import React, { useState } from "react";
import Navbar from "./Navbar.js";
import { ref, query, orderByChild, equalTo, remove, onValue } from "firebase/database";
import { database } from "./firebase.js";  // Make sure to import getDatabase from your firebase.js config 

const Page = () => {
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const handleDelete = () => {
    if (year && semester) {
      const database = database();
      const recordsRef = ref(database, "student details");
      const queryRef = query(recordsRef, orderByChild("ClearedBy"), equalTo(`${semester} ${year}`));
      
      onValue(queryRef, (snapshot) => {
        if (snapshot.exists()) {
          let recordsDeleted = 0;
          snapshot.forEach((childSnapshot) => {
            const record = childSnapshot.val();
            if (record.ClearedBy === `${semester} ${year}`) {
              remove(ref(database, `student details/${childSnapshot.key}`))
                .then(() => {
                  recordsDeleted += 1;
                  console.log(`Record with key ${childSnapshot.key} deleted`);
                })
                .catch((error) => {
                  console.error(`Error deleting record with key ${childSnapshot.key}:`, error);
                });
            }
          });
          if (recordsDeleted > 0) {
            alert(`Total records deleted for ${year} - ${semester}: ${recordsDeleted}`);
          } else {
            alert(`No records found for ${year} - ${semester} to delete`);
          }
        } else {
          alert(`No records found for Batch: ${year}`);
        }
      }, (error) => {
        console.error('Error fetching records:', error);
        alert('Error fetching records, please try again.');
      });
    } else {
      alert("Please select both academic year and semester.");
    }
  };
  
  return (
    <div>
      <Navbar
        setYear={setYear}
        setSemester={setSemester}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Page;
