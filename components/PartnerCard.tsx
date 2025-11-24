
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Utensils, GraduationCap, Car, ShoppingBag, Activity, Gamepad2, Briefcase, PawPrint, Baby, Share2, Heart, Ticket, Shirt, Dumbbell, Clapperboard, Timer } from 'lucide-react';
import { Partner } from '../types';
import { DEFAULT_PARTNER_IMAGE, categories, toggleFavorite } from '../services/data';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const [isFavorite, setIsFavorite] = useState(partner.isFavorite || false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName || c.id === categoryName);
    const iconName = category?.icon || 'Utensils';
    const props = { size: 12, className: "stroke-[3]" };

    switch (iconName) {
      case 'MapPin': return <MapPin {...props} />;
      case 'Utensils': return <Utensils {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Car': return <Car {...props} />;
      case 'ShoppingBag': return <ShoppingBag {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Gamepad2': return <Gamepad2 {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'PawPrint': return <PawPrint {...props} />;
      case 'Baby': return <Baby {...props} />;
      case 'Ticket': return <Ticket {...props} />;
      case 'Shirt': return <Shirt {...props} />;
      case 'Dumbbell': return <Dumbbell {...props} />;
      case 'Clapperboard': return <Clapperboard {...props} />;
      case 'Timer': return <Timer {...props} />;
      default: return <Utensils {...props} />;
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert('Compartilhar não implementado ainda.');
  };

  const handleFavorite = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const newState = toggleFavorite(partner.id);
      setIsFavorite(newState);
      
      // Trigger pop animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Link to={`/partner/${partner.id}`} className="block group">
      <div className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:ring-1 hover:ring-red-900 border border-slate-700">
        <div className="relative h-32 bg-slate-700 overflow-hidden">
          <img 
            src={partner.imageUrl || DEFAULT_PARTNER_IMAGE} 
            alt={partner.name}
            onError={(e) => { e.currentTarget.src = DEFAULT_PARTNER_IMAGE; }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90"
          />
          
          {/* Actions Top */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
              {/* Share Button */}
              <button 
                onClick={handleShare}
                className="bg-slate-800/90 backdrop-blur-sm p-1.5 rounded-full text-gray-400 hover:text-salesiano-light shadow-sm transition-colors hover:bg-slate-700"
                title="Compartilhar"
              >
                <Share2 size={16} />
              </button>

              <div className="flex flex-col gap-2 items-end">
                  {/* Rating */}
                  <div className="bg-slate-800/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-200">{partner.rating}</span>
                  </div>

                  {/* Favorite Button */}
                  <button 
                    onClick={handleFavorite}
                    className="bg-slate-800/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm transition-colors hover:bg-slate-700"
                    title="Favoritar"
                  >
                    <Heart 
                        size={16} 
                        className={`transition-all duration-300 ${isFavorite ? 'fill-salesiano-light text-salesiano-light' : 'text-gray-400'} ${isAnimating ? 'scale-150' : 'scale-100'}`} 
                    />
                  </button>
              </div>
          </div>

          <div className="absolute bottom-3 left-3 z-10">
             <div className="flex items-center gap-1.5 text-white text-[10px] font-bold bg-salesiano-red/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/10">
               {getCategoryIcon(partner.category)}
               <span className="uppercase tracking-wide">{partner.category}</span>
             </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>
        </div>
        
        <div className="p-4 relative bg-slate-800">
          <h3 className="font-bold text-gray-100 truncate text-lg transition-colors group-hover:text-salesiano-light">{partner.name}</h3>
          <div className="flex items-center text-gray-400 text-xs mt-1 mb-3">
            <MapPin size={12} className="mr-1 text-salesiano-light" />
            <span className="truncate">{partner.address}</span>
          </div>
          
          <div className="bg-red-900/20 border border-red-900/30 rounded-xl p-2 text-center transition-colors group-hover:bg-red-900/30">
            <p className="text-red-400 font-bold text-sm">{partner.offer}</p>
            <p className="text-gray-400 text-[10px] leading-tight mt-0.5 truncate">{partner.offerDetails}</p>
          </div>
          
          <div className="mt-3 flex items-center justify-start gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-700 rounded-lg">
                <img src={categories.find(c => c.name === partner.category || c.id === partner.category)?.icon === 'Utensils' ? "https://cdn-icons-png.flaticon.com/512/1046/1046857.png" : "https://cdn-icons-png.flaticon.com/512/3502/3502601.png"} className="w-4 h-4 opacity-70 filter invert" alt="" onError={(e) => e.currentTarget.style.display = 'none'} />
                <span className="text-[10px] text-gray-300 font-medium uppercase">{partner.category}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PartnerCard;