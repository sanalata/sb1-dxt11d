import React from 'react';
import { DailyGoal } from '../lib/mockData';

interface GoalProgressProps {
  goals: DailyGoal[];
}

const GoalProgress: React.FC<GoalProgressProps> = ({ goals }) => {
  const currentWeek = new Date().getWeek();
  const currentMonth = new Date().getMonth() + 1;

  const weeklyQuestions = goals
    .filter(goal => new Date(goal.date).getWeek() === currentWeek)
    .reduce((sum, goal) => sum + goal.solvedQuestions, 0);

  const monthlyQuestions = goals
    .filter(goal => new Date(goal.date).getMonth() + 1 === currentMonth)
    .reduce((sum, goal) => sum + goal.solvedQuestions, 0);

  const totalQuestions = goals
    .reduce((sum, goal) => sum + goal.solvedQuestions, 0);

  // Hedefler (örnek değerler)
  const weeklyGoal = 300;
  const monthlyGoal = 1200;
  const totalGoal = 5000;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Haftalık Hedef</span>
          <span className="text-sm font-medium">{weeklyQuestions}/{weeklyGoal}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${Math.min((weeklyQuestions / weeklyGoal) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Aylık Hedef</span>
          <span className="text-sm font-medium">{monthlyQuestions}/{monthlyGoal}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full"
            style={{ width: `${Math.min((monthlyQuestions / monthlyGoal) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Genel Hedef</span>
          <span className="text-sm font-medium">{totalQuestions}/{totalGoal}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-purple-600 h-2.5 rounded-full"
            style={{ width: `${Math.min((totalQuestions / totalGoal) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Date prototype'a hafta numarası hesaplama metodu ekleme
declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function(): number {
  const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

export default GoalProgress;