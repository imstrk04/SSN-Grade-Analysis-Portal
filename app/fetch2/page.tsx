
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore'; // Ensure this import is correct
import { db } from '@/components/firebase/config';


type Firestore = firebase.firestore.Firestore;

const retrieveSubjects = async () => {
  try {
    const firestore = db as Firestore; // Cast db to Firestore type
    const snapshot = await firestore.collection('sem3').get();
    const subjects: any[] = [];

    snapshot.forEach((doc: any) => {
      const courseCode = doc.data().coursecode;
      subjects.push(courseCode);
    });

    console.log('Subjects:', subjects);
    return subjects;
  } catch (error) {
    console.error('Error retrieving subjects:', error);
    throw error;
  }
};

// Call the function to retrieve subjects
retrieveSubjects();
