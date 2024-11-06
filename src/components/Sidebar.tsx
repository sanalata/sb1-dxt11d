import React from 'react';
import { 
  BookOpen, 
  BarChart3, 
  Calendar,
  CheckSquare,
  Clock,
  FileText,
  Settings,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems: MenuItem[] = [
    { 
      icon: BookOpen, 
      label: 'Derslerim',
      path: '/dersler',
      badge: 3 // Yeni ders sayısı
    },
    { 
      icon: CheckSquare, 
      label: 'Ödevlerim',
      path: '/odevler',
      badge: 2 // Bekleyen ödev sayısı
    },
    { 
      icon: Calendar, 
      label: 'Çalışma Programı',
      path: '/program'
    },
    { 
      icon: BarChart3, 
      label: 'Performansım',
      path: '/performans'
    },
    { 
      icon: Clock, 
      label: 'Çalışma Sürem',
      path: '/sure-takip'
    },
    { 
      icon: FileText, 
      label: 'Dokümanlarım',
      path: '/dokumanlar'
    },
    { 
      icon: Settings, 
      label: 'Ayarlar',
      path: '/ayarlar'
    }
  ];

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    // Mobil görünümde menüyü kapat
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay - Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold text-indigo-600">DigiKoç</h1>
              <p className="text-sm text-gray-500">Eğitim Asistanın</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Info - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-medium">AY</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Ahmet Yılmaz</p>
              <p className="text-xs text-gray-500">8. Sınıf Öğrencisi</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;