import { getDatabase, ref, get, child } from 'firebase/database';

const GRADE_WITH_NO_BACKLOGS = ['O', 'A+', 'A', 'B', 'B+', 'C'];

export const calculateNoBacklogs = async () => {
    const dbRef = ref(getDatabase());

    console.log('Fetching data from the database...');
    const coursesSnapshot = await get(child(dbRef, 'courses'));
    const studentDetailsSnapshot = await get(child(dbRef, 'student details'));
    const resultDetailsSnapshot = await get(child(dbRef, 'result details'));

    console.log('Data fetched from database');

    const courses = Object.values(coursesSnapshot.val());
    const studentDetails = Object.values(studentDetailsSnapshot.val());
    let resultDetails = Object.values(resultDetailsSnapshot.val());

    // Filter out results without alphabet grades
    resultDetails = resultDetails.filter(result => result.Grade !== 'None' && /[A-Za-z]/.test(result.Grade));

    console.log('Courses:', courses);
    console.log('Student Details:', studentDetails);
    console.log('Result Details:', resultDetails);

    const courseTitleMap = {};
    const courseCreditMap = {};
    courses.forEach(course => {
        courseTitleMap[course.CourseCode] = course.CourseTitle; 
        courseCreditMap[course.CourseCode] = course.Credit;
    });

    const batchData = {};

    studentDetails.forEach(student => {
        const studentResults = resultDetails.filter(result =>
            result.RegisterNo === student.RegisterNo
        );

        const yearResults = {
            "Year 1": [],
            "Year 2": [],
            "Year 3": [],
            "Year 4": []
        };

        studentResults.forEach(result => {
            const semesterNumber = getSemester(student.Batch, result.ClearedBy);
            if (semesterNumber <= 2) {
                yearResults["Year 1"].push(result);
            }
            if (semesterNumber <= 4) {
                yearResults["Year 2"].push(result);
            }
            if (semesterNumber <= 6) {
                yearResults["Year 3"].push(result);
            }
            if (semesterNumber <= 8) {
                yearResults["Year 4"].push(result);
            }
        });

        function findMaxSemester(yearResults) {
            const maxSemester = {};
            for (const year in yearResults) {
                let max = 0;
                for (const result of yearResults[year]) {
                    const semester = getSemester(student.Batch, result.ClearedBy);
                    if (semester > max) {
                        max = semester;
                    }
                }
                maxSemester[year] = max;
            }
            return maxSemester;
        }

        const maxSemester = findMaxSemester(yearResults);

        const yearNoBacklogs = {
            "Year 1": maxSemester["Year 1"] === 2 ? (yearResults["Year 1"].every(result => GRADE_WITH_NO_BACKLOGS.includes(result.Grade)) ? 1 : 0) : 0,
            "Year 2": maxSemester["Year 2"] === 4 ? (yearResults["Year 2"].every(result => GRADE_WITH_NO_BACKLOGS.includes(result.Grade)) ? 1 : 0) : 0,
            "Year 3": maxSemester["Year 3"] === 6 ? (yearResults["Year 3"].every(result => GRADE_WITH_NO_BACKLOGS.includes(result.Grade)) ? 1 : 0) : 0,
            "Year 4": maxSemester["Year 4"] === 8 ? (yearResults["Year 4"].every(result => GRADE_WITH_NO_BACKLOGS.includes(result.Grade)) ? 1 : 0) : 0
        };

        if (!batchData[student.Batch]) {
            batchData[student.Batch] = {
                totalStudents: 0,
                yearCounts: {
                    "Year 1": 0,
                    "Year 2": 0,
                    "Year 3": 0,
                    "Year 4": 0
                },
                students: {
                    "Year 1": {
                        withArrears: [],
                        withoutArrears: []
                    },
                    "Year 2": {
                        withArrears: [],
                        withoutArrears: []
                    },
                    "Year 3": {
                        withArrears: [],
                        withoutArrears: []
                    },
                    "Year 4": {
                        withArrears: [],
                        withoutArrears: []
                    }
                }
            };
        }

        batchData[student.Batch].totalStudents += 1;
        Object.keys(yearNoBacklogs).forEach(year => {
            batchData[student.Batch].yearCounts[year] += yearNoBacklogs[year];
            
            if (yearNoBacklogs[year] === 0) {
                const arrears = yearResults[year].filter(result => !GRADE_WITH_NO_BACKLOGS.includes(result.Grade));
                
                if (arrears.length > 0) {
                    batchData[student.Batch].students[year].withArrears.push({
                        name: student.Name,
                        registerNo: student.RegisterNo,
                        arrears: arrears
                    });
                }
            } else {
                batchData[student.Batch].students[year].withoutArrears.push({
                    name: student.Name,
                    registerNo: student.RegisterNo
                });
            }
        });
        
    });

    console.log('Final Batch Data:', batchData);
    return batchData;
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
