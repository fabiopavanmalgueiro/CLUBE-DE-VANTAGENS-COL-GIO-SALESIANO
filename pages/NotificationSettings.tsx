
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BellRing, Home } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const navigate = useNavigate();
  const [permissionGranted, setPermissionGranted] = useState(Notification.permission === 'granted');
  const [preferences, setPreferences] = useState([
      { id: 'offers', label: 'Novas Ofertas e Parceiros', desc: 'Receba avisos quando um novo parceiro entrar.', enabled: true },
      { id: 'expiring', label: 'Alertas de Vencimento', desc: 'Avisos sobre sua carteirinha ou cupons.', enabled: true },
      { id: 'news', label: 'Novidades do Salesiano', desc: 'Notícias gerais do colégio.', enabled: false },
  ]);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermissionGranted(permission === 'granted');
    if(permission === 'granted') alert('Notificações ativadas no dispositivo!');
  };

  const togglePref = (id: string) => {
    setPreferences(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 px-6 pt-6 pb-4 shadow-sm flex items-center justify-between sticky top-0 z-10 border-b border-slate-800">
         <div className="flex items-center gap-4">
             <button onClick={() => navigate(-1)} className="text-gray-400 hover:bg-slate-800 p-2 -ml-2 rounded-full"><ArrowLeft /></button>
             <h1 className="text-xl font-bold text-salesiano-light">Configurar Alertas</h1>
         </div>
         <Link to="/" className="text-gray-500 hover:text-salesiano-light transition p-2 rounded-full hover:bg-slate-800">
            <Home size={24} />
         </Link>
      </div>

      <div className="p-6">
        {!permissionGranted && (
            <div className="bg-orange-900/10 border border-orange-700/30 p-4 rounded-xl mb-8 flex flex-col items-center text-center">
                <BellRing className="text-orange-500 mb-2" size={32} />
                <h3 className="font-bold text-gray-200 mb-1">Ative as Notificações</h3>
                <p className="text-xs text-gray-400 mb-3">Para receber as melhores ofertas em tempo real, precisamos da sua permissão.</p>
                <button 
                    onClick={requestPermission}
                    className="bg-salesiano-red text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-red-700"
                >
                    Permitir Agora
                </button>
            </div>
        )}

        <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden border border-slate-800">
            {preferences.map((pref) => (
                <div key={pref.id} className="p-4 border-b border-slate-800 last:border-0 flex justify-between items-center">
                    <div className="pr-4">
                        <h4 className="font-bold text-gray-200 text-sm">{pref.label}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{pref.desc}</p>
                    </div>
                    <button 
                        onClick={() => togglePref(pref.id)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${pref.enabled ? 'bg-salesiano-red' : 'bg-slate-700'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${pref.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;