
import React, { useState, useEffect } from 'react';
import { Search, Bell, Sparkles, Utensils, GraduationCap, Car, ShoppingBag, Activity, Gamepad2, Briefcase, MapPin, Menu, PawPrint, Navigation, Baby, Ticket, Shirt, Dumbbell, Clapperboard, Timer, Star } from 'lucide-react';
import { categories, partners, currentUser, SCHOOL_LOGO_URL } from '../services/data';
import PartnerCard from '../components/PartnerCard';
import { Link, useNavigate } from 'react-router-dom';
import { getAiRecommendation } from '../services/geminiService';

// Helper function extracted to module scope
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'MapPin': return <MapPin size={24} className="text-white" />;
    case 'Utensils': return <Utensils size={24} className="text-white" />;
    case 'GraduationCap': return <GraduationCap size={24} className="text-white" />;
    case 'Car': return <Car size={24} className="text-white" />;
    case 'ShoppingBag': return <ShoppingBag size={24} className="text-white" />;
    case 'Activity': return <Activity size={24} className="text-white" />;
    case 'Gamepad2': return <Gamepad2 size={24} className="text-white" />;
    case 'Briefcase': return <Briefcase size={24} className="text-white" />;
    case 'PawPrint': return <PawPrint size={24} className="text-white" />;
    case 'Baby': return <Baby size={24} className="text-white" />;
    case 'Ticket': return <Ticket size={24} className="text-white" />;
    case 'Shirt': return <Shirt size={24} className="text-white" />;
    case 'Dumbbell': return <Dumbbell size={24} className="text-white" />;
    case 'Clapperboard': return <Clapperboard size={24} className="text-white" />;
    case 'Timer': return <Timer size={24} className="text-white" />;
    default: return <Utensils size={24} className="text-white" />;
  }
};

// Reusable Category Item Component
interface CategoryItemProps {
  category: typeof categories[0];
  onClick?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onClick }) => (
  <Link 
    to={`/category/${category.id}`}
    onClick={onClick}
    className="flex flex-col items-center gap-2 min-w-[84px] group cursor-pointer"
  >
    <div className={`
        w-16 h-16 rounded-[1.2rem] bg-gradient-to-br ${category.color} 
        flex items-center justify-center shadow-lg 
        transform transition-all duration-300 
        group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-xl group-active:scale-95
    `}>
        {getIcon(category.icon)}
    </div>
    <span className="text-xs font-medium text-gray-400 group-hover:text-salesiano-light transition-colors text-center w-full truncate px-1">
        {category.name}
    </span>
  </Link>
);

interface HomeProps {
  onOpenMenu: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenMenu }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isSearchingAi, setIsSearchingAi] = useState(false);
  
  // Location State
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Calculate distance (Haversine Formula) - Returns distance in KM
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const handleSortByLocation = () => {
    if (sortByDistance) {
      setSortByDistance(false); // Toggle off
      return;
    }

    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setSortByDistance(true);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Não foi possível obter sua localização. Verifique se o GPS está ativado.");
          setIsLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
      setIsLoadingLocation(false);
    }
  };

  // Filter and Sort Partners
  const filteredPartners = partners
    .filter(p => 
      !p.isFeatured && ( // Exclude featured partners from main list to avoid duplication
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.offer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortByDistance && userLocation) {
        const distA = a.coordinates ? calculateDistance(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng) : 9999;
        const distB = b.coordinates ? calculateDistance(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng) : 9999;
        return distA - distB;
      }
      return 0; // Default order
    });

  const featuredPartners = partners.filter(p => p.isFeatured);

  const handleAiSearch = async () => {
      if (!searchTerm) return;
      setIsSearchingAi(true);
      const response = await getAiRecommendation(searchTerm);
      setAiResponse(response);
      setIsSearchingAi(false);
  };

  return (
    <div className="pb-24 bg-slate-950 min-h-screen">
      
      {/* Top Header */}
      <div className="bg-gradient-to-b from-salesiano-red to-red-900 px-6 pt-2 pb-16 rounded-b-[2.5rem] shadow-xl relative overflow-hidden h-80 z-20 border-b border-red-900/50">
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black opacity-20 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none"></div>

        {/* Navigation Bar */}
        <div className="relative z-20 flex justify-between items-center h-28">
            <button 
                onClick={onOpenMenu}
                className="p-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all active:scale-95 border border-white/10"
            >
                <Menu size={24} />
            </button>
            
            {/* Logo Centered */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-64 max-w-[70%] flex justify-center">
                 <img 
                    src={SCHOOL_LOGO_URL} 
                    alt="Salesiano Santa Terezinha" 
                    className="h-16 md:h-20 w-auto object-contain brightness-0 invert drop-shadow-md" 
                />
            </div>

            <Link 
                to="/notifications"
                className="p-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all active:scale-95 border border-white/10 relative group"
            >
                <Bell size={24} className="group-hover:animate-swing" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-yellow-400 border-2 border-red-600 rounded-full"></span>
            </Link>
        </div>
        
        {/* Welcome Section */}
        <div className="relative z-10 mt-2 text-center">
            <p className="text-red-200 text-sm font-medium mb-1 animate-fadeIn">Bem-vindo(a) aluno,</p>
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md animate-slideUp">{currentUser.name.split(' ')[0]}</h1>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative z-20 transform translate-y-4">
            <div className="bg-slate-800 rounded-2xl shadow-lg p-2 flex items-center gap-2 border border-slate-700">
                <div className="flex-1 flex items-center gap-3 pl-3">
                    <Search className="text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="O que você procura hoje?" 
                        className="w-full bg-transparent outline-none text-white placeholder-gray-500 text-sm py-2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                    />
                </div>
                <button 
                    onClick={handleAiSearch}
                    className="bg-salesiano-red text-white p-3 rounded-xl shadow-md hover:bg-red-700 transition active:scale-95 flex items-center gap-2"
                >
                   {isSearchingAi ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Sparkles size={20} />}
                </button>
            </div>
            {aiResponse && (
                <div className="bg-slate-800 mt-3 p-4 rounded-xl shadow-lg border border-purple-900/50 animate-fadeIn">
                    <div className="flex items-start gap-3">
                        <div className="bg-purple-900/30 p-2 rounded-full">
                            <Sparkles className="text-purple-400" size={16} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-300 italic leading-relaxed">"{aiResponse}"</p>
                            <button onClick={() => setAiResponse(null)} className="text-xs text-gray-500 mt-2 hover:text-gray-300">Fechar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Featured Section (Dark Theme) */}
      {featuredPartners.length > 0 && (
          <div className="py-8 bg-black/40 -mt-8 relative z-30 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.4)] border-t border-white/5 backdrop-blur-sm">
            <div className="px-6 mb-5 flex items-center gap-2">
                <div className="bg-yellow-400/20 p-2 rounded-full backdrop-blur-sm">
                  <Sparkles className="text-yellow-400" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Parceiros em Destaque</h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar snap-x">
                {featuredPartners.map(partner => (
                    <Link to={`/partner/${partner.id}`} key={partner.id} className="min-w-[280px] snap-center group relative">
                        <div className="h-44 rounded-2xl overflow-hidden shadow-2xl relative bg-slate-800 border border-white/10">
                            <img 
                                src={partner.imageUrl} 
                                alt={partner.name}
                                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80"; }}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                            
                            {/* Logo Wrapper */}
                            <div className="absolute top-0 right-0 p-3">
                                <div className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md p-1.5 border border-white/10 shadow-lg flex items-center justify-center">
                                     <img src={categories.find(c => c.name === partner.category || c.id === partner.category)?.icon === 'Utensils' ? "https://cdn-icons-png.flaticon.com/512/1046/1046857.png" : "https://cdn-icons-png.flaticon.com/512/3502/3502601.png"} className="w-full h-full object-contain filter invert" alt="" onError={(e) => e.currentTarget.style.display = 'none'} />
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider mb-1 block">{partner.category}</span>
                                <h3 className="text-white font-bold text-lg leading-tight truncate drop-shadow-sm">{partner.name}</h3>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="bg-salesiano-red text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm border border-red-400/20">{partner.offer}</span>
                                    <div className="flex items-center gap-1 text-white/90 text-xs font-medium">
                                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                        <span>{partner.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
          </div>
      )}

      {/* Categories */}
      <div className={`px-6 ${featuredPartners.length > 0 ? 'mt-6' : 'mt-16'}`}>
        <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-white">Categorias</h2>
            <Link to="/categories" className="text-sm font-semibold text-salesiano-light bg-red-900/20 px-3 py-1 rounded-full hover:bg-red-900/40 transition border border-red-900/30">
                Ver todas
            </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar -mx-6 px-6">
            {categories.map((cat) => (
                <CategoryItem key={cat.id} category={cat} />
            ))}
        </div>
      </div>

      {/* Partners List */}
      <div className="px-6 mt-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Todos os Parceiros</h2>
            
            <button 
                onClick={handleSortByLocation}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    sortByDistance 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                }`}
            >
                {isLoadingLocation ? (
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    <Navigation size={12} className={sortByDistance ? "fill-current" : ""} />
                )}
                {sortByDistance ? 'Próximos a mim' : 'Ordenar por distância'}
            </button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
            {filteredPartners.length > 0 ? (
                filteredPartners.map(partner => (
                    <PartnerCard key={partner.id} partner={partner} />
                ))
            ) : (
                <div className="text-center py-10 text-gray-500 bg-slate-800 rounded-2xl border border-dashed border-slate-700">
                    <Search size={48} className="mx-auto mb-2 opacity-20" />
                    <p>Nenhum parceiro encontrado.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;