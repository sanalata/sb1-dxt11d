import React from 'react';
import { Menu, GraduationCap } from 'lucide-react';

interface MobileNavProps {
  onMenuClick: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onMenuClick }) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-10 flex items-center px-4">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 rounded-lg"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>
      <div className="ml-4 flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-indigo-600" />
        <h1 className="text-xl font-bold text-indigo-600">DigiKoç</h1>
      </div>
    </header>
  );
};

export default MobileNav;