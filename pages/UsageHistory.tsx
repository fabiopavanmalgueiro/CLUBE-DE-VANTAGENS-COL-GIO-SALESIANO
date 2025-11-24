
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, Store, Home } from 'lucide-react';
import { currentUser } from '../services/data';

const UsageHistory: React.FC = () => {
  const navigate = useNavigate();

  // Mock History Data
  const history = [
    { id: 1, partner: 'Cantina da Nonna', date: '12/03/2024', amount: 15.50, offer: 'Combo Lanche' },
    { id: 2, partner: 'Livraria Leitura Viva', date: '05/03/2024', amount: 42.00, offer: 'Livros Didáticos' },
    { id: 3, partner: 'Cinema CineMark', date: '28/02/2024', amount: 18.00, offer: 'Meia Entrada + Pipoca' },
    { id: 4, partner: 'Burger King', date: '15/02/2024', amount: 12.90, offer: 'Batata Grátis' },
    { id: 5, partner: 'Papelaria Estudantil', date: '10/02/2024', amount: 8.50, offer: 'Material Escolar' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className="bg-slate-900 px-6 pt-6 pb-4 shadow-sm sticky top-0 z-10 flex justify-between items-center border-b border-slate-800">
         <div className="flex items-center gap-4">
             <button onClick={() => navigate(-1)} className="text-gray-400 hover:bg-slate-800 p-2 -ml-2 rounded-full transition"><ArrowLeft /></button>
             <h1 className="text-xl font-bold text-salesiano-light">Histórico de Uso</h1>
         </div>
         <Link to="/" className="text-gray-500 hover:text-salesiano-light p-2 rounded-full hover:bg-slate-800 transition">
            <Home size={24} />
         </Link>
      </div>

      {/* Summary Card */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-salesiano-red to-red-800 rounded-2xl p-6 text-white shadow-lg mb-6 border border-red-700/50">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-lg">
                    <TrendingUp size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium opacity-90">Economia Total Acumulada</span>
            </div>
            <h2 className="text-4xl font-bold">
                {currentUser.totalSavings.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h2>
            <p className="text-xs mt-2 opacity-75">Desde o início do ano letivo</p>
        </div>

        {/* Timeline */}
        <h3 className="font-bold text-gray-200 mb-4 px-1">Últimas Utilizações</h3>
        <div className="space-y-4">
            {history.map((item) => (
                <div key={item.id} className="bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-800 p-3 rounded-full text-gray-400 border border-slate-700">
                            <Store size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-200 text-sm">{item.partner}</h4>
                            <p className="text-xs text-gray-400">{item.offer}</p>
                            <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
                                <Calendar size={10} />
                                <span>{item.date}</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-green-500">
                            - {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase">Economizado</span>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 text-center">
            <button className="text-sm text-salesiano-light font-semibold hover:underline">
                Ver extrato completo
            </button>
        </div>
      </div>
    </div>
  );
};

export default UsageHistory;