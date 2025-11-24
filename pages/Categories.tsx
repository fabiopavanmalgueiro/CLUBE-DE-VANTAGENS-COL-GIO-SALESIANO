
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Utensils, GraduationCap, Car, ShoppingBag, Activity, Gamepad2, Briefcase, MapPin, PawPrint, Baby, Ticket, Shirt, Dumbbell, Clapperboard, Timer, Home } from 'lucide-react';
import { categories } from '../services/data';

const Categories: React.FC = () => {
  const navigate = useNavigate();

  // Icon Mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return <MapPin size={32} className="text-white" />;
      case 'Utensils': return <Utensils size={32} className="text-white" />;
      case 'GraduationCap': return <GraduationCap size={32} className="text-white" />;
      case 'Car': return <Car size={32} className="text-white" />;
      case 'ShoppingBag': return <ShoppingBag size={32} className="text-white" />;
      case 'Activity': return <Activity size={32} className="text-white" />;
      case 'Gamepad2': return <Gamepad2 size={32} className="text-white" />;
      case 'Briefcase': return <Briefcase size={32} className="text-white" />;
      case 'PawPrint': return <PawPrint size={32} className="text-white" />;
      case 'Baby': return <Baby size={32} className="text-white" />;
      case 'Ticket': return <Ticket size={32} className="text-white" />;
      case 'Shirt': return <Shirt size={32} className="text-white" />;
      case 'Dumbbell': return <Dumbbell size={32} className="text-white" />;
      case 'Clapperboard': return <Clapperboard size={32} className="text-white" />;
      case 'Timer': return <Timer size={32} className="text-white" />;
      default: return <Utensils size={32} className="text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="bg-slate-900 shadow-sm px-6 pt-6 pb-4 sticky top-0 z-10 flex justify-between items-center border-b border-slate-800">
         <div className="flex items-center gap-4">
             <button 
                onClick={() => navigate(-1)} 
                className="p-2 -ml-2 rounded-full hover:bg-slate-800 transition text-gray-400"
             >
                <ArrowLeft size={24} />
             </button>
             <h1 className="text-xl font-bold text-salesiano-light">Categorias</h1>
         </div>
         <Link to="/" className="p-2 rounded-full hover:bg-slate-800 text-gray-500 hover:text-salesiano-light transition">
            <Home size={24} />
         </Link>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => navigate(`/category/${cat.id}`)}
            className="group bg-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-4 aspect-square cursor-pointer transform hover:-translate-y-1 active:scale-95 active:shadow-sm border border-slate-700"
          >
            <div className={`
                w-20 h-20 rounded-full bg-gradient-to-br ${cat.color} 
                flex items-center justify-center 
                shadow-lg group-hover:shadow-2xl
                transform transition-all duration-500 ease-out 
                group-hover:scale-110 group-hover:-rotate-6 group-hover:brightness-110
            `}>
                {getIcon(cat.icon)}
            </div>
            <div className="text-center">
                <h3 className="font-bold text-gray-200 text-lg group-hover:text-salesiano-light transition-colors">{cat.name}</h3>
                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-400 transition-colors">Explorar</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;