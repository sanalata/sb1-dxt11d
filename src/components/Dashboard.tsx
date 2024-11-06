import React from 'react';
import { useStudentStore } from '../store/studentStore';
import StudentStats from './StudentStats';
import Chat from './Chat';
import { GraduationCap } from 'lucide-react';

interface DashboardProps {
  studentData: any;
}

const Dashboard: React.FC<DashboardProps> = ({ studentData }) => {
  const { student } = useStudentStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hoş Geldin, {student?.name || 'Öğrenci'}
          </h1>
          <p className="text-lg text-gray-600">
            DigiKoç - Kişisel Eğitim Asistanın
          </p>
        </div>

        {/* İstatistikler */}
        <div className="mb-12">
          <StudentStats student={student} />
        </div>

        {/* Ana İçerik - Chat ve Dosya Yükleme */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Chat studentContext={student} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;