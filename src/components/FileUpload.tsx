import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { analyzeFile } from '../lib/gemini';

interface FileUploadProps {
  onAnalysis: (analysis: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onAnalysis }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const analysis = await analyzeFile(file);
      onAnalysis(analysis);
    } catch (err) {
      setError('Dosya analiz edilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Dosya analiz hatası:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [onAnalysis]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md', '.pdf'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 1,
    disabled: isAnalyzing,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-600'}
          ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {isAnalyzing ? (
          <>
            <Loader2 className="mx-auto h-12 w-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-lg font-medium text-gray-900">Dosyanız analiz ediliyor...</p>
          </>
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900">
              {isDragActive ? 'Dosyayı buraya bırakın' : 'Çalışma materyalinizi yükleyin'}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Dosyayı sürükleyip bırakın veya seçmek için tıklayın
            </p>
            <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center">
                <FileText className="h-4 w-4 mr-1" /> Belgeler
              </span>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;