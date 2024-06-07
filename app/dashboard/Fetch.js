import { getDatabase, ref, get, child } from "firebase/database";

export const fetchRollNumbers = async (year) => {
  const db = ref(getDatabase());
  const rollNumbersSnap = await get(child(db, 'student details'));
  const rolls = Object.values(rollNumbersSnap.val());
  
  const rollNumbers = rolls
    .filter(student => student.Batch === year)
    .map(student => student.RegisterNo);

    return rollNumbers;
};

export const fetchData = async (year, semester, rollNumberStart, rollNumberEnd) => {
    const dbRef = ref(getDatabase());

    console.log('Fetching data from the database...');
    const coursesSnapshot = await get(child(dbRef, 'courses'));
    const studentDetailsSnapshot = await get(child(dbRef, 'student details'));
    const resultDetailsSnapshot = await get(child(dbRef, 'result details'));

    console.log('Data fetched from database');

    const courses = Object.values(coursesSnapshot.val());
    const studentDetails = Object.values(studentDetailsSnapshot.val());
    const resultDetails = Object.values(resultDetailsSnapshot.val());

    console.log('Courses:', courses);
    console.log('Student Details:', studentDetails);
    console.log('Result Details:', resultDetails);

    const filteredStudents = studentDetails.filter(student =>
        student.Batch === year && 
        student.RegisterNo >= rollNumberStart && 
        student.RegisterNo <= rollNumberEnd
    );

    if (filteredStudents.length === 0) {
        console.error('No students found for the specified batch year and roll number range');
        return {};
    }

    const semesterNumber = parseInt(semester.substring(semester.length - 1));

    const courseTitleMap = {};
    courses.forEach(course => {
        courseTitleMap[course.CourseCode] = course.Credit; 
    });

    const studentData = {};

    filteredStudents.forEach(student => {
        const studentResults = resultDetails.filter(result =>
            result.RegisterNo === student.RegisterNo &&
            courses.some(course =>
                course.CourseCode === result.CourseCode &&
                getSemester(year, result.ClearedBy) === semesterNumber
            )
        );

        const studentCourses = {};

        studentResults.forEach(result => {
            studentCourses[result.CourseCode] = [result.Grade, courseTitleMap[result.CourseCode]];
        });

        studentData[student.RegisterNo] = [student.Name, studentCourses];
    });

    console.log('Student Data:', studentData);
    return studentData;
};

export const getSemester = (year, semester) => {
    const startYear = parseInt(year.split("-")[0].trim(), 10);
    const semYear = parseInt(semester.split(" ")[1], 10);
    const semMon = semester.split(" ")[0];

    let sem = 0;

    if (semMon === "Nov") {
        sem =  (semYear - startYear) * 2 + 1;
    } else if (semMon === "May") {
        sem =  (semYear - startYear) * 2;
    }
    return sem;
};
