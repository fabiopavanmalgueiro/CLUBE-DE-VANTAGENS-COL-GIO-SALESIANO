
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft, Search, Home } from 'lucide-react';
import { partners as partnersData, deletePartner, DEFAULT_PARTNER_IMAGE } from '../../services/data';
import { Partner } from '../../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Simulating fetching data
  useEffect(() => {
    setPartners([...partnersData]);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este parceiro?')) {
        deletePartner(id);
        setPartners(partnersData.filter(p => p.id !== id)); // Force re-render
    }
  };

  const filtered = partners.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
       <div className="bg-slate-900 text-white px-6 pt-12 pb-8 rounded-b-3xl border-b border-slate-800">
         <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white p-2 -ml-2 rounded-full transition"><ArrowLeft /></button>
                <h1 className="text-2xl font-bold">Admin</h1>
             </div>
             
             <Link to="/" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition text-white">
                <Home size={24} />
             </Link>
         </div>
         
         <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
                type="text" 
                placeholder="Buscar parceiro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full pl-10 p-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-salesiano-red"
            />
         </div>
       </div>

       <div className="px-6 -mt-4">
           <div className="space-y-4">
               {filtered.map(partner => (
                   <div key={partner.id} className="bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800 flex items-center justify-between">
                       <div className="flex items-center gap-4 overflow-hidden">
                           <img 
                                src={partner.imageUrl || DEFAULT_PARTNER_IMAGE} 
                                onError={(e) => { e.currentTarget.src = DEFAULT_PARTNER_IMAGE; }}
                                alt={partner.name} 
                                className="w-12 h-12 rounded-lg object-cover bg-slate-800" 
                           />
                           <div className="min-w-0">
                               <h3 className="font-bold text-gray-200 truncate">{partner.name}</h3>
                               <p className="text-xs text-gray-400 truncate">{partner.offer}</p>
                           </div>
                       </div>
                       <div className="flex items-center gap-2">
                           <button 
                                onClick={() => navigate(`/admin/edit-partner/${partner.id}`)}
                                className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg"
                           >
                               <Edit2 size={18} />
                           </button>
                           <button 
                                onClick={() => handleDelete(partner.id)}
                                className="p-2 text-red-500 hover:bg-red-900/30 rounded-lg"
                           >
                               <Trash2 size={18} />
                           </button>
                       </div>
                   </div>
               ))}
           </div>
       </div>

       <button 
        onClick={() => navigate('/admin/add-partner')}
        className="fixed bottom-6 right-6 bg-salesiano-red text-white p-4 rounded-full shadow-xl hover:bg-red-700 transition transform hover:scale-105"
       >
           <Plus size={24} />
       </button>
    </div>
  );
};

export default AdminDashboard;