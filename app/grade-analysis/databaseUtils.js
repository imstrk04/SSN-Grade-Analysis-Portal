import { getDatabase, ref, get, child } from 'firebase/database';
export const fetchData = async (year, semester, section) => {
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

    console.log(`Filtering students for batch year: ${year} and section: ${section}`);
    const filteredStudents = studentDetails.filter(student =>
        student.Batch === year && (section === 'ALL' || student.Section === section)
    );
    console.log('Filtered Students:', filteredStudents);

    if (filteredStudents.length === 0) {
        console.error('No students found for the specified batch year and section');
        return [];
    }

    const semesterNumber = parseInt(semester.substring(semester.length - 1));
    console.log(`Semester number extracted: ${semesterNumber}`);

    const courseTitleMap = {};
    courses.forEach(course => {
        courseTitleMap[course.CourseCode] = course.CourseTitle;
    });

    console.log('Course Title Map:', courseTitleMap);

    const filteredData = [];

    filteredStudents.forEach(student => {
        console.log(`Processing results for student: ${student.Name}`);
        const studentResults = resultDetails.filter(result =>
            result.RegisterNo === student.RegisterNo &&
            courses.some(course =>
                course.CourseCode === result.CourseCode &&
                getSemester(year, result.ClearedBy) === semesterNumber
            )
        );

        console.log('Filtered Results for Student:', studentResults);

        studentResults.forEach(result => {
            filteredData.push({
                CourseCode: result.CourseCode,
                CourseTitle: courseTitleMap[result.CourseCode] || "Unknown Course",
                Grade: result.Grade
            });
        });
    });

    console.log('Filtered Data:', filteredData);
    return filteredData;
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
    console.log(sem)
    return sem
};
