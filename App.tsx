
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Home as HomeIcon, LayoutGrid, Bell, User } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import PartnerDetail from './pages/PartnerDetail';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import ReferPartner from './pages/ReferPartner';
import BecomePartner from './pages/BecomePartner';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import NotificationSettings from './pages/NotificationSettings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPartnerForm from './pages/admin/AdminPartnerForm';
import DigitalCard from './pages/DigitalCard';
import UsageHistory from './pages/UsageHistory';

const BottomNavigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Início' },
    { path: '/categories', icon: LayoutGrid, label: 'Categorias' },
    { path: '/notifications', icon: Bell, label: 'Alertas' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  // Hide bottom nav on admin pages or detail pages if desired, but keeping it everywhere for now
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-50 pb-safe">
      <div className="flex justify-around items-center p-2 max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              isActive(item.path) 
                ? 'text-salesiano-light -translate-y-1' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className={`p-1.5 rounded-full transition-all ${isActive(item.path) ? 'bg-white/10' : ''}`}>
               <item.icon size={24} className={isActive(item.path) ? 'fill-current' : ''} />
            </div>
            <span className={`text-[10px] font-medium mt-0.5 ${isActive(item.path) ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-gray-100 selection:bg-red-900 selection:text-white">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="max-w-md mx-auto bg-slate-950 min-h-screen shadow-2xl relative overflow-hidden border-x border-slate-800">
          <Routes>
            <Route path="/" element={<Home onOpenMenu={() => setIsSidebarOpen(true)} />} />
            <Route path="/partner/:id" element={<PartnerDetail />} />
            
            {/* Categories */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<CategoryDetail />} />
            
            {/* Notifications */}
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/notifications/settings" element={<NotificationSettings />} />
            
            {/* User */}
            <Route path="/refer" element={<ReferPartner />} />
            <Route path="/become-partner" element={<BecomePartner />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/digital-card" element={<DigitalCard />} />
            <Route path="/usage-history" element={<UsageHistory />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-partner" element={<AdminPartnerForm />} />
            <Route path="/admin/edit-partner/:id" element={<AdminPartnerForm />} />
          </Routes>
          
          <ChatBot />
          <BottomNavigation />
        </main>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;