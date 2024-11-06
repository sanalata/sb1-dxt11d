import React from 'react';
import { Assignment } from '../lib/mockData';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface AssignmentListProps {
  assignments: Assignment[];
}

const AssignmentList: React.FC<AssignmentListProps> = ({ assignments }) => {
  const sortedAssignments = [...assignments].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const getStatusIcon = (status: string, dueDate: string) => {
    const isOverdue = new Date(dueDate) < new Date() && status === 'pending';
    
    if (status === 'done') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (isOverdue) {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
    return <Clock className="h-5 w-5 text-yellow-500" />;
  };

  return (
    <div className="space-y-4">
      {sortedAssignments.map(assignment => (
        <div 
          key={assignment.id}
          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
        >
          {getStatusIcon(assignment.status, assignment.dueDate)}
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{assignment.title}</h3>
            <p className="text-sm text-gray-600">{assignment.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              Teslim Tarihi: {new Date(assignment.dueDate).toLocaleDateString('tr-TR')}
            </p>
          </div>
          {assignment.status === 'pending' && (
            <button 
              className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              onClick={() => console.log('Ödev tamamlandı olarak işaretlendi:', assignment.id)}
            >
              Tamamlandı
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;