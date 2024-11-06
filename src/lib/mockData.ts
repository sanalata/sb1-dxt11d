export interface Achievement {
  id: number;
  name: string;
  completed: boolean;
  courseId: number;
}

export interface Course {
  id: number;
  name: string;
  achievements: Achievement[];
}

export interface TestResult {
  id: number;
  date: string;
  score: number;
  courseId: number;
}

export interface Student {
  id: number;
  name: string;
  grade: number;
  courses: Course[];
  testResults: TestResult[];
  targetSchool: {
    name: string;
    requiredScore: number;
  };
}

export const mockStudent: Student = {
  id: 1,
  name: "Ahmet Yılmaz",
  grade: 12,
  courses: [
    {
      id: 1,
      name: "Matematik",
      achievements: [
        { id: 1, name: "Türev", completed: true, courseId: 1 },
        { id: 2, name: "İntegral", completed: false, courseId: 1 },
        { id: 3, name: "Limit", completed: true, courseId: 1 }
      ]
    },
    {
      id: 2,
      name: "Fizik",
      achievements: [
        { id: 4, name: "Elektrik", completed: true, courseId: 2 },
        { id: 5, name: "Manyetizma", completed: false, courseId: 2 }
      ]
    }
  ],
  testResults: [
    { id: 1, date: "2024-02-01", score: 85, courseId: 1 },
    { id: 2, date: "2024-02-15", score: 90, courseId: 1 },
    { id: 3, date: "2024-02-01", score: 75, courseId: 2 },
    { id: 4, date: "2024-02-15", score: 82, courseId: 2 }
  ],
  targetSchool: {
    name: "İstanbul Teknik Üniversitesi",
    requiredScore: 95
  }
};