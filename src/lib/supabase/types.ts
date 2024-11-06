export interface Student {
  id: number;
  ad_soyad: string;
  kademe: number;
  created_at: string;
}

export interface Course {
  id: number;
  course_name: string;
  kademe: number;
}

export interface Unit {
  id: number;
  units_name: string;
  course_id: number;
}

export interface Topic {
  id: number;
  topic_name: string;
  unit_id: number;
}

export interface Achievement {
  id: number;
  achievement_name: string;
  topic_id: number;
  course_id: number;
  unit_id: number;
}

export interface MissingAchievement {
  id: number;
  student_id: number;
  achievement_id: number;
  deneme_id: number;
  created_at: string;
}

export interface Test {
  id: number;
  test_name: string;
  created_at: string;
}

export interface StudentTestResult {
  id: number;
  student_id: number;
  test_id: number;
  course_id: number;
  net: number;
  created_at: string;
}

export interface TargetSchool {
  id: number;
  student_id: number;
  school_name: string;
  target_score: number;
}

export interface StudentScore {
  id: number;
  student_id: number;
  test_id: number;
  score_type: string;
  score: number;
  created_at: string;
}

export interface DailyGoal {
  id: number;
  student_id: number;
  solved_questions: number;
  date: string;
  created_at: string;
}

export interface Assignment {
  id: number;
  title: string;
  description: string | null;
  due_date: string;
  created_at: string;
}

export interface StudentAssignment {
  id: number;
  student_id: number;
  assignment_id: number;
  status: 'pending' | 'done';
  submission_date: string | null;
  created_at: string;
}