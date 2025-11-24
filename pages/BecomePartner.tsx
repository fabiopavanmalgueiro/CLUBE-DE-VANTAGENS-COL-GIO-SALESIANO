
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send, Store, User, Phone, Mail, FileText, Home, Briefcase } from 'lucide-react';
import { categories } from '../services/data';

const BecomePartner: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    category: '',
    phone: '',
    email: '',
    proposal: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    alert('Sua solicitação foi enviada com sucesso! Entraremos em contato em breve.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="bg-gradient-to-r from-gray-900 to-salesiano-red text-white px-6 pt-6 pb-16 rounded-b-[2rem] relative">
         <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white p-2 -ml-2 rounded-full hover:bg-white/10"><ArrowLeft size={24} /></button>
                <h1 className="text-xl font-bold">Quero ser um Parceiro</h1>
             </div>
             <Link to="/" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                <Home size={20} className="text-white" />
             </Link>
         </div>
         <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
           Junte-se ao Clube Salesiano e ofereça benefícios exclusivos para milhares de alunos e famílias.
         </p>
      </div>

      <div className="px-6 -mt-10">
        <div className="bg-slate-900 rounded-2xl shadow-xl p-6 border border-slate-800">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Company Info */}
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nome da Empresa</label>
                <div className="relative">
                    <Store className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required 
                      className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none transition text-white placeholder-gray-500" 
                      placeholder="Ex: Restaurante Sabor" 
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Ramo de Atividade</label>
                <div className="relative">
                    <Briefcase className="absolute left-3 top-3 text-gray-500" size={18} />
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required 
                      className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none appearance-none transition text-white"
                    >
                      <option value="" className="text-gray-500">Selecione uma categoria...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name} className="text-black">{cat.name}</option>
                      ))}
                      <option value="Outro" className="text-black">Outro</option>
                    </select>
                </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Responsável</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input 
                          type="text" 
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          required 
                          className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none transition text-white placeholder-gray-500" 
                          placeholder="Seu nome" 
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Telefone / WhatsApp</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required 
                          className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none transition text-white placeholder-gray-500" 
                          placeholder="(00) 00000-0000" 
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">E-mail Corporativo</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none transition text-white placeholder-gray-500" 
                      placeholder="contato@empresa.com" 
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Proposta de Parceria</label>
                <div className="relative">
                    <FileText className="absolute left-3 top-3 text-gray-500" size={18} />
                    <textarea 
                      name="proposal"
                      value={formData.proposal}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-slate-800 rounded-xl focus:ring-2 focus:ring-salesiano-red outline-none transition text-white placeholder-gray-500" 
                      rows={3} 
                      placeholder="Descreva brevemente que tipo de vantagem gostaria de oferecer aos alunos..." 
                    />
                </div>
            </div>

            <button type="submit" className="w-full bg-salesiano-red text-white py-4 rounded-xl font-bold shadow-lg hover:bg-red-700 transform active:scale-95 transition flex items-center justify-center gap-2">
                <Send size={20} />
                Enviar Solicitação
            </button>
          </form>
          
          <p className="text-center text-xs text-gray-500 mt-4 px-4">
            Ao enviar, você concorda que nossa equipe comercial entre em contato para formalizar a parceria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BecomePartner;