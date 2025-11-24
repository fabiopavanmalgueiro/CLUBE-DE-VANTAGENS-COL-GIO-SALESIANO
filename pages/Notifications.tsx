
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Bell, Settings, Megaphone, Info, Home } from 'lucide-react';
import { notifications as initialData } from '../services/data';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialData);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'offer': return <Megaphone size={20} className="text-purple-400" />;
      case 'alert': return <Bell size={20} className="text-salesiano-light" />;
      default: return <Info size={20} className="text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="bg-slate-900 px-6 pt-6 pb-4 shadow-sm sticky top-0 z-10 flex justify-between items-center border-b border-slate-800">
         <div className="flex items-center gap-4">
             <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800 text-gray-400">
                <ArrowLeft size={24} />
             </button>
             <h1 className="text-xl font-bold text-salesiano-light">Notificações</h1>
         </div>
         <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-500 hover:text-salesiano-light transition p-1">
                <Home size={20} />
            </Link>
            <button onClick={() => navigate('/notifications/settings')} className="text-gray-500 hover:text-gray-300 p-1">
                <Settings size={20} />
            </button>
         </div>
      </div>

      <div className="px-6 py-4">
        <div className="flex justify-end mb-4">
            <button onClick={markAllRead} className="text-xs font-semibold text-salesiano-light hover:underline">
                Marcar todas como lidas
            </button>
        </div>

        <div className="space-y-3">
            {notifications.map(notification => (
                <div 
                    key={notification.id} 
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${notification.read ? 'bg-slate-900 border-slate-800' : 'bg-red-900/10 border-red-900/30 shadow-sm'}`}
                >
                    {!notification.read && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-salesiano-red rounded-full animate-pulse"></div>
                    )}
                    <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full flex-shrink-0 ${notification.read ? 'bg-slate-800' : 'bg-slate-800 shadow-sm'}`}>
                            {getIcon(notification.type)}
                        </div>
                        <div>
                            <h4 className={`font-bold text-sm mb-1 ${notification.read ? 'text-gray-300' : 'text-white'}`}>{notification.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed mb-2">{notification.message}</p>
                            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{notification.date}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;