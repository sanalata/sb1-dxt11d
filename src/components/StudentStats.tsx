import React from 'react';
import { Brain, Target, Book } from 'lucide-react';

interface StudentStatsProps {
  student: any;
}

const StudentStats: React.FC<StudentStatsProps> = ({ student }) => {
  const calculateStats = () => {
    if (!student) return { completedLessons: 0, targetProgress: 0, achievements: 0 };

    return {
      completedLessons: student.completedLessons?.length || 0,
      targetProgress: student.targetProgress || 0,
      achievements: student.achievements?.length || 0
    };
  };

  const stats = calculateStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <Book className="h-8 w-8 text-indigo-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Tamamlanan Dersler</h3>
            <p className="text-2xl font-bold text-indigo-600">{stats.completedLessons}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <Target className="h-8 w-8 text-indigo-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Hedef İlerleme</h3>
            <p className="text-2xl font-bold text-indigo-600">%{stats.targetProgress}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <Brain className="h-8 w-8 text-indigo-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Kazanımlar</h3>
            <p className="text-2xl font-bold text-indigo-600">{stats.achievements}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStats;