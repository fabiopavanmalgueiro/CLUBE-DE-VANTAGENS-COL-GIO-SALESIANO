
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, User, Share2, LayoutGrid, LogOut, Bell, ShieldCheck, Handshake } from 'lucide-react';
import { SCHOOL_LOGO_URL } from '../services/data';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/profile', label: 'Meu Perfil', icon: User },
    { path: '/categories', label: 'Categorias', icon: LayoutGrid },
    { path: '/notifications', label: 'Notificações', icon: Bell },
    { path: '/refer', label: 'Indique um Parceiro', icon: Share2 },
    { path: '/become-partner', label: 'Quero ser um Parceiro', icon: Handshake },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-slate-900 z-50 shadow-2xl border-r border-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
             <img 
                  src={SCHOOL_LOGO_URL} 
                  alt="Salesiano" 
                  className="h-10 object-contain brightness-0 invert" 
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150x50?text=Salesiano"; }}
            />
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-gray-400">
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive(item.path) 
                    ? 'bg-salesiano-red text-white shadow-md font-semibold' 
                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Admin Link Separator */}
            <div className="my-4 border-t border-slate-800"></div>
            
            <Link
                to="/admin"
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:bg-slate-800 hover:text-white transition-all duration-200"
            >
                <ShieldCheck size={20} />
                <span>Admin</span>
            </Link>

          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <button className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-900/10 w-full rounded-xl transition-colors">
              <LogOut size={20} />
              <span>Sair</span>
            </button>
            <div className="mt-4 text-xs text-center text-gray-600">
              Clube Salesiano v1.1.0
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;