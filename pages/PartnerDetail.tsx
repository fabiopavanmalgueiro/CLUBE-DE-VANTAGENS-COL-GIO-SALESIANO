
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Star, Send, AlertCircle, Sparkles, MapPin, ExternalLink, Heart, Home } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { partners, DEFAULT_PARTNER_IMAGE, toggleFavorite } from '../services/data';
import { generateAiTip } from '../services/geminiService';

const PartnerDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const partner = partners.find(p => p.id === id);
  
  // State for Timer and Codes
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [qrValue, setQrValue] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [aiTip, setAiTip] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);

  // State for Reviews
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([
      {id: 'r1', user: 'Maria S.', stars: 5, text: 'Adorei o desconto!'},
      {id: 'r2', user: 'João P.', stars: 4, text: 'Muito bom, atendimento rápido.'}
  ]);

  const regenerateCodes = useCallback(() => {
    if (!partner) return;
    
    const timestamp = Date.now();
    // Update QR Code Value
    setQrValue(`SALESIANO-${partner.id}-${timestamp}`);
    
    // Generate Unique Promocode: PREFIX + Random Suffix
    const prefix = partner.discountCodePrefix || 'CLUBE';
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const minuteIdentifier = new Date().getMinutes().toString().slice(-1); // Last digit of minute for visual variation
    
    setAccessCode(`${prefix}-${minuteIdentifier}${randomSuffix}`);
  }, [partner]);

  useEffect(() => {
    if (partner) {
        // Generate initial AI tip
        generateAiTip(partner.name, partner.category).then(setAiTip);
        regenerateCodes();
        setIsFavorite(partner.isFavorite || false);
    }
  }, [partner, regenerateCodes]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          regenerateCodes();
          return 300; // Reset to 5 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [regenerateCodes]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmitReview = () => {
      if(userRating === 0) return;
      setReviews(prev => [{
          id: `new-${Date.now()}`,
          user: 'Você',
          stars: userRating,
          text: reviewText
      }, ...prev]);
      setReviewText('');
      setUserRating(0);
      alert('Avaliação enviada com sucesso!');
  };

  const handleToggleFavorite = () => {
      if (partner) {
          const newState = toggleFavorite(partner.id);
          setIsFavorite(newState);
      }
  };

  if (!partner) return <div className="p-10 text-center text-white">Parceiro não encontrado</div>;

  // Construct Map URL (Embed)
  const mapQuery = partner.coordinates 
    ? `${partner.coordinates.lat},${partner.coordinates.lng}`
    : encodeURIComponent(partner.address);
    
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  
  // External Link for GPS
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="pb-24 bg-slate-950 min-h-screen">
      {/* Banner */}
      <div className="relative h-64 bg-slate-800">
        <img 
            src={partner.imageUrl || DEFAULT_PARTNER_IMAGE} 
            alt={partner.name} 
            onError={(e) => { e.currentTarget.src = DEFAULT_PARTNER_IMAGE; }}
            className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
        
        {/* Header Controls */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20">
            <button 
                onClick={() => navigate(-1)} 
                className="bg-black/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/50 transition shadow-sm border border-white/10"
            >
                <ArrowLeft size={24} />
            </button>

            <div className="flex items-center gap-3">
                <button 
                    onClick={handleToggleFavorite}
                    className="bg-black/30 backdrop-blur-md p-2 rounded-full hover:bg-black/50 transition shadow-sm active:scale-95 border border-white/10"
                >
                    <Heart 
                        size={24} 
                        className={isFavorite ? "fill-red-500 text-red-500" : "text-white"} 
                    />
                </button>
                
                <Link 
                    to="/"
                    className="bg-black/30 backdrop-blur-md p-2 rounded-full text-white hover:bg-black/50 transition shadow-sm border border-white/10"
                >
                    <Home size={24} />
                </Link>
            </div>
        </div>
        
        <div className="absolute bottom-0 left-0 p-6 text-white w-full z-10">
            <h1 className="text-3xl font-bold mb-1 drop-shadow-md">{partner.name}</h1>
            <div className="flex items-center gap-2 text-sm opacity-90">
                <span className="bg-salesiano-red px-2 py-0.5 rounded text-xs font-bold border border-red-400/20">{partner.category}</span>
                <span className="drop-shadow-sm">• {partner.address.split(',')[0]}</span>
            </div>
        </div>
      </div>

      <div className="px-6 py-6 -mt-6 bg-slate-950 rounded-t-[2rem] relative z-10 border-t border-slate-800">
        
        {/* AI Tip */}
        {aiTip && (
            <div className="mb-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 p-4 rounded-xl border border-indigo-500/30 flex gap-3 items-start animate-fadeIn">
                <Sparkles className="text-indigo-400 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-indigo-200 text-sm font-medium italic">"{aiTip}"</p>
            </div>
        )}

        {/* Offer Section */}
        <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Vantagem Exclusiva</h2>
            <div className="bg-red-900/10 border-l-4 border-salesiano-red p-4 rounded-r-xl">
                <p className="text-2xl font-bold text-salesiano-light">{partner.offer}</p>
                <p className="text-gray-300 mt-1">{partner.offerDetails}</p>
            </div>
            <p className="text-gray-400 mt-4 leading-relaxed text-sm">{partner.fullDescription}</p>
        </div>

        {/* Redemption Section */}
        <div className="bg-slate-900 rounded-2xl p-6 shadow-inner mb-8 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">Como Utilizar</h3>
                <div className="flex items-center gap-1 text-orange-400 bg-orange-900/20 px-2 py-1 rounded-lg text-sm font-mono border border-orange-900/30">
                    <Clock size={14} />
                    <span>{formatTime(timeLeft)}</span>
                </div>
            </div>
            
            <ol className="list-decimal list-inside text-sm text-gray-400 mb-6 space-y-2">
                <li>Vá até o estabelecimento.</li>
                <li>Apresente o QR Code ou o Código.</li>
                <li>Receba seu desconto na hora!</li>
            </ol>

            <div className="flex flex-col items-center gap-6">
                <div className="bg-white p-3 rounded-xl shadow-md">
                    <QRCodeSVG value={qrValue} size={180} level="H" includeMargin={true} />
                </div>
                
                <div className="w-full text-center">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Código Promocional</p>
                    <div className="bg-slate-800 border-2 border-dashed border-slate-600 rounded-xl p-3 font-mono text-2xl font-bold text-gray-200 tracking-widest select-all">
                        {accessCode}
                    </div>
                    <p className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
                        <AlertCircle size={12} /> Expira em 5 minutos
                    </p>
                </div>
            </div>
        </div>

        {/* Location Map Section */}
        <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden mb-8">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                 <h3 className="font-bold text-white">Localização</h3>
                 <a 
                    href={externalMapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-blue-300 bg-blue-900/30 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-blue-900/50 transition border border-blue-800"
                 >
                    <ExternalLink size={12} />
                    Abrir no GPS
                 </a>
            </div>
            <div className="h-48 w-full bg-slate-800 relative">
                 <iframe
                    title="Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={embedUrl}
                    className="filter grayscale-[20%] opacity-80 hover:opacity-100 transition-all duration-500"
                 ></iframe>
            </div>
            <div className="p-4 bg-slate-800">
                 <div className="flex items-start gap-3">
                    <div className="bg-salesiano-red/10 p-2 rounded-full text-salesiano-light shrink-0">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-200 font-medium leading-tight">{partner.address}</p>
                        <p className="text-xs text-gray-500 mt-1">Aberto hoje até as 18:00 (Simulado)</p>
                    </div>
                 </div>
            </div>
        </div>

        {/* Reviews Section */}
        <div>
            <h3 className="text-lg font-bold text-white mb-4">Avaliações</h3>
            
            {/* Input Review */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6 shadow-sm">
                <p className="text-sm font-medium text-gray-300 mb-2">Avalie sua experiência:</p>
                <div className="flex gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setUserRating(star)}>
                            <Star 
                                size={24} 
                                className={`${star <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'} transition-colors`} 
                            />
                        </button>
                    ))}
                </div>
                <textarea 
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Conte como foi (opcional)..."
                    className="w-full bg-slate-800 rounded-lg p-3 text-sm mb-3 focus:outline-none focus:ring-1 focus:ring-salesiano-red text-white placeholder-gray-500"
                    rows={2}
                />
                <button 
                    onClick={handleSubmitReview}
                    disabled={userRating === 0}
                    className="w-full bg-salesiano-red text-white py-2 rounded-lg font-medium text-sm hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    <Send size={16} /> Enviar Avaliação
                </button>
            </div>

            {/* List Reviews */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b border-slate-800 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-sm text-gray-200">{review.user}</span>
                            <div className="flex text-yellow-400">
                                {[...Array(review.stars)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">{review.text}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetail;