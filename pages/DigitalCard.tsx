
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, RotateCw, Download, Share2, ShieldCheck, Home } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { currentUser, SCHOOL_LOGO_URL } from '../services/data';

const DigitalCard: React.FC = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="min-h-screen bg-slate-950 pb-24 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 px-6 pt-6 pb-4 shadow-sm flex items-center justify-between sticky top-0 z-10 border-b border-slate-800">
         <div className="flex items-center gap-4">
             <button onClick={() => navigate(-1)} className="text-gray-400 hover:bg-slate-800 p-2 -ml-2 rounded-full transition"><ArrowLeft /></button>
             <h1 className="text-xl font-bold text-salesiano-light">Carteirinha Digital</h1>
         </div>
         <Link to="/" className="text-gray-500 hover:text-salesiano-light p-2 rounded-full hover:bg-slate-800 transition">
            <Home size={24} />
         </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 perspective-1000">
        
        {/* Card Container */}
        <div 
            className={`relative w-full max-w-sm aspect-[1.586/1] transition-transform duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={handleFlip}
        >
            {/* Front of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-salesiano-red to-red-900 text-white p-5 shadow-2xl relative overflow-hidden border border-white/10">
                    {/* Watermark / Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
                    
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <img 
                            src={SCHOOL_LOGO_URL} 
                            alt="Logo" 
                            className="h-10 object-contain brightness-0 invert" 
                            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/100x40?text=Salesiano"; }}
                        />
                        <div className="flex items-center gap-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 px-2 py-1 rounded text-[10px] font-bold text-green-300 animate-pulse">
                            <ShieldCheck size={12} />
                            <span>ATIVO</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 relative z-10 mt-2">
                        <div className="p-1 bg-white/20 rounded-full backdrop-blur-sm">
                             <img src={currentUser.avatarUrl} alt="User" className="w-16 h-16 rounded-full object-cover border-2 border-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg leading-tight mb-1">{currentUser.name}</h2>
                            <p className="text-xs text-red-100 opacity-90 font-medium">{currentUser.grade}</p>
                            <p className="text-xs text-red-200 mt-0.5">RA: {currentUser.studentId}</p>
                        </div>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end z-10">
                        <div>
                            <p className="text-[10px] text-red-300 uppercase tracking-wider mb-0.5">Validade</p>
                            <p className="font-mono text-sm font-semibold">12/2024</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-red-300 uppercase tracking-wider mb-0.5">Tipo</p>
                            <p className="font-bold text-sm">ESTUDANTE</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-slate-200 shadow-2xl overflow-hidden border border-gray-400">
                <div className="h-full flex flex-col relative">
                    <div className="h-12 bg-gray-800 w-full mt-6"></div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center p-4">
                        <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider font-bold">Token de Validação</p>
                        <div className="bg-white p-2 rounded-lg shadow-inner border border-gray-300">
                             <QRCodeSVG value={`ID:${currentUser.studentId}-VALID:2024`} size={120} />
                        </div>
                        <p className="mt-4 font-mono text-gray-800 tracking-widest text-sm font-bold">{currentUser.studentId}</p>
                    </div>

                    <div className="p-3 bg-gray-300 text-[10px] text-gray-600 text-center border-t border-gray-400">
                        Uso pessoal e intransferível. Apresente este documento para obter benefícios.
                    </div>
                </div>
            </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex gap-6">
            <button 
                onClick={handleFlip}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-salesiano-light transition"
            >
                <div className="p-4 bg-slate-900 rounded-full shadow-md border border-slate-800">
                    <RotateCw size={24} />
                </div>
                <span className="text-xs font-medium">Virar</span>
            </button>
            <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-salesiano-light transition">
                <div className="p-4 bg-slate-900 rounded-full shadow-md border border-slate-800">
                    <Share2 size={24} />
                </div>
                <span className="text-xs font-medium">Enviar</span>
            </button>
             <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-salesiano-light transition">
                <div className="p-4 bg-slate-900 rounded-full shadow-md border border-slate-800">
                    <Download size={24} />
                </div>
                <span className="text-xs font-medium">Salvar</span>
            </button>
        </div>

        <p className="mt-8 text-xs text-gray-500 text-center max-w-xs">
            Toque no cartão para virar. Esta carteirinha é válida em todo o território nacional para estabelecimentos parceiros.
        </p>
      </div>

      {/* CSS Utility for Flip - Injected here for simplicity in this file structure */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default DigitalCard;