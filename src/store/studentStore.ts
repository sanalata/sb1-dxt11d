import { create } from 'zustand';
import { getStudentData } from '../lib/supabase';

interface StudentState {
  student: any | null;
  studentData: any | null;
  isLoading: boolean;
  error: string | null;
  fetchStudentData: (studentId: number) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set) => ({
  student: null,
  studentData: null,
  isLoading: false,
  error: null,
  fetchStudentData: async (studentId: number) => {
    set({ isLoading: true, error: null });
    try {
      const data = await getStudentData(studentId);
      set({ student: data.student, studentData: data, isLoading: false });
    } catch (error) {
      set({ error: 'Öğrenci verileri alınamadı', isLoading: false });
    }
  },
}));