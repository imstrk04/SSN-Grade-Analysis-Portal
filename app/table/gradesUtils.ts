
export interface Student {
    digitalId: string;
    regNo: string;
    name: string;
    grades: { [key: string]: string };
    gradePoints?: number;
    gpa?: number;
    deviation?: number;
    resultStatus?: string;
}

export const subjects = [
    'UEE2276', 'UEN2241', 'UGA2176', 'UGE2297', 'UHS2241',
    'UHS2242', 'UHS2243', 'UIT2201', 'UIT2211', 'UMA2276', 'UPH2251'
];

export const gradePoints = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C': 5,
    'RA': 0,
    'AB': 0,
    'WH': 0
};

export const calculateGradePoints = (grade: string) => {
    return gradePoints[grade as keyof typeof gradePoints] || 0;
};

export const calculateGPA = (totalGradePoints: number, subjectsLength: number) => {
    return (totalGradePoints / (subjectsLength || 1)).toFixed(3);
};

export const calculateDeviation = (gpa: number) => {
    return parseFloat((gpa - 6).toFixed(3));
};

export const getRandomGrade = () => {
    const grades = ['A', 'O', 'A+', 'B', 'B+'];
    return grades[Math.floor(Math.random() * grades.length)];
};

export const generateGrades = () => {
    const grades: { [key: string]: string } = {};
    const electiveSubjects = ['UHS2241', 'UHS2242', 'UHS2243'];
    const chosenElective = electiveSubjects[Math.floor(Math.random() * electiveSubjects.length)];

    subjects.forEach(subject => {
        if (electiveSubjects.includes(subject)) {
            grades[subject] = subject === chosenElective ? getRandomGrade() : 'NA';
        } else {
            grades[subject] = getRandomGrade();
        }
    });

    return grades;
};


export const generateStudents = (count: number, subjectsLength: number): Student[] => {
    const students: Student[] = [];
    for (let i = 0; i < count; i++) {
        const student: Student = {
            digitalId: `00${i + 1}`,
            regNo: `REG00${i + 10000000}`,
            name: `Student ${i + 1}`,
            grades: generateGrades()
        };
        let totalGradePoints = 0;
        for (const subject in student.grades) {
            totalGradePoints += calculateGradePoints(student.grades[subject]);
        }
        const gpa = calculateGPA(totalGradePoints, subjectsLength);
        const deviation = calculateDeviation(parseFloat(gpa));

        student.gradePoints = totalGradePoints;
        student.gpa = parseFloat(gpa);
        student.deviation = deviation;
        student.resultStatus = totalGradePoints >= 60 ? "PASS" : "FAIL";

        students.push(student);
    }
    return students;
};
