import { createClient } from '@supabase/supabase-js';
import type { Student, Course, Achievement, TestResult, TargetSchool } from './supabase/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getStudentData = async (studentId: number) => {
  try {
    // Öğrenci bilgilerini getir
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();

    if (studentError) throw studentError;

    // Öğrencinin kademesine göre dersleri getir
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .eq('kademe', student.kademe);

    if (coursesError) throw coursesError;

    // Eksik kazanımları getir
    const { data: missingAchievements, error: achievementsError } = await supabase
      .from('missing_achievements')
      .select(`
        *,
        achievements (
          achievement_name,
          topics (
            topic_name,
            units (
              units_name,
              courses (
                course_name
              )
            )
          )
        )
      `)
      .eq('student_id', studentId);

    if (achievementsError) throw achievementsError;

    // Hedef okul bilgilerini getir
    const { data: targetSchool, error: targetSchoolError } = await supabase
      .from('target_schools')
      .select('*')
      .eq('student_id', studentId)
      .single();

    if (targetSchoolError && targetSchoolError.code !== 'PGRST116') throw targetSchoolError;

    // Test sonuçlarını getir
    const { data: testResults, error: testResultsError } = await supabase
      .from('student_test_results')
      .select(`
        *,
        tests (
          test_name
        ),
        courses (
          course_name
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (testResultsError) throw testResultsError;

    return {
      student,
      courses,
      missingAchievements,
      targetSchool,
      testResults
    };
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    throw error;
  }
};