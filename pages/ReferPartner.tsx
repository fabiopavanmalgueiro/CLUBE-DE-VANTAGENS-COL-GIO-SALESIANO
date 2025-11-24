
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send, MapPin, Store, Phone, Mail, Home } from 'lucide-react';

const ReferPartner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="bg-salesiano-red text-white px-6 pt-6 pb-16 rounded-b-[2rem] relative">
         <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white p-2 -ml-2 rounded-full hover:bg-white/10"><ArrowLeft size={24} /></button>
                <h1 className="text-xl font-bold">Indique um Parceiro</h1>
             </div>
             <Link to="/" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                <Home size={20} className="text-white" />
             </Link>
         </div>
         <p className="text-red-100 text-sm leading-relaxed">Conhece uma loja legal que deveria estar no Clube Salesiano? Indique para nós e ajude a comunidade!</p>
      </div>

      <div className="px-6 -mt-10">
        <div className="bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-800">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Indicação enviada! Obrigado.'); navigate('/'); }}>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nome do Estabelecimento</label>
                <div className="relative">
                    <Store className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input type="text" required className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none text-white placeholder-gray-500" placeholder="Ex: Papelaria Silva" />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Endereço / Local</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input type="text" required className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none text-white placeholder-gray-500" placeholder="Ex: Rua Voluntários, 100" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Telefone <span className="text-gray-500 font-normal lowercase">(opcional)</span></label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input type="tel" className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none text-white placeholder-gray-500" placeholder="Ex: (11) 99999-9999" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">E-mail <span className="text-gray-500 font-normal lowercase">(opcional)</span></label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input type="email" className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none text-white placeholder-gray-500" placeholder="Ex: contato@loja.com" />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Por que indicar?</label>
                <textarea className="w-full p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none text-white placeholder-gray-500" rows={3} placeholder="Ex: Tem ótimos lanches e aceita VR..." />
            </div>

            <button type="submit" className="w-full bg-salesiano-red text-white py-4 rounded-xl font-bold shadow-lg hover:bg-red-700 transform active:scale-95 transition flex items-center justify-center gap-2">
                <Send size={20} />
                Enviar Indicação
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReferPartner;