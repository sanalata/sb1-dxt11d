import React, { useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import Chat from './components/Chat';
import { useStudentStore } from './store/studentStore';

function App() {
  const { fetchStudentData, student, error, isLoading } = useStudentStore();

  useEffect(() => {
    // Örnek öğrenci ID'si - gerçek uygulamada oturum/giriş sisteminden alınacak
    fetchStudentData(1);
  }, [fetchStudentData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-indigo-600 animate-bounce mx-auto" />
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => fetchStudentData(1)}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">DigiKoç</h1>
          <p className="text-lg text-gray-600">
            {student ? `Hoş geldin, ${student.ad_soyad}!` : 'Kişisel Eğitim Asistanınız'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;