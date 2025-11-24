
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, AlertCircle, Home } from 'lucide-react';
import { addPartner, updatePartner, getPartnerById, categories, DEFAULT_PARTNER_IMAGE } from '../../services/data';
import { Partner } from '../../types';

const AdminPartnerForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const initialForm: Partner = {
      id: '',
      name: '',
      category: categories[0].id,
      description: '',
      fullDescription: '',
      offer: '',
      offerDetails: '',
      imageUrl: '',
      rating: 5,
      reviewCount: 0,
      address: '',
      discountCodePrefix: ''
  };

  const [formData, setFormData] = useState<Partner>(initialForm);

  useEffect(() => {
    if (isEditing && id) {
        const existing = getPartnerById(id);
        if (existing) setFormData(existing);
    }
  }, [id, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isEditing && id) {
          updatePartner(id, formData);
          alert('Parceiro atualizado com sucesso!');
      } else {
          const newId = Date.now().toString();
          addPartner({ ...formData, id: newId });
          alert('Parceiro adicionado com sucesso!');
      }
      navigate('/admin');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-10">
      <div className="bg-slate-900 px-6 pt-12 pb-4 shadow-sm border-b border-slate-800 sticky top-0 z-10">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="text-gray-400 hover:bg-slate-800 p-2 -ml-2 rounded-full"><ArrowLeft /></button>
                <h1 className="text-xl font-bold text-gray-200">{isEditing ? 'Editar Parceiro' : 'Novo Parceiro'}</h1>
            </div>
            <Link to="/" className="text-gray-500 hover:text-salesiano-light p-2 rounded-full hover:bg-slate-800 transition">
                <Home size={24} />
            </Link>
         </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        
        {/* Basic Info */}
        <div className="bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800">
            <h3 className="font-bold text-gray-200 mb-4 border-b border-slate-800 pb-2">Informações Básicas</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome do Parceiro</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 focus:border-salesiano-red outline-none text-white placeholder-gray-500" placeholder="Ex: Cantina X" />
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoria</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none text-white">
                        {categories.map(c => <option key={c.id} value={c.id} className="text-black">{c.name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">URL da Imagem (Banner)</label>
                    <div className="flex gap-2">
                        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none text-sm text-white placeholder-gray-500" placeholder="https://..." />
                        <button type="button" className="p-3 bg-slate-800 rounded-lg text-gray-400 border border-slate-700"><Upload size={20}/></button>
                    </div>
                    {formData.imageUrl && (
                        <img 
                            src={formData.imageUrl} 
                            onError={(e) => { e.currentTarget.src = DEFAULT_PARTNER_IMAGE; }}
                            alt="Preview" 
                            className="mt-2 h-32 w-full object-cover rounded-lg bg-slate-800" 
                        />
                    )}
                </div>
            </div>
        </div>

        {/* Offer Details */}
        <div className="bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800">
            <h3 className="font-bold text-gray-200 mb-4 border-b border-slate-800 pb-2">Oferta</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Chamada da Oferta (Curta)</label>
                    <input name="offer" value={formData.offer} onChange={handleChange} required className="w-full p-3 bg-red-900/20 text-salesiano-light font-bold rounded-lg border border-red-900/50 outline-none placeholder-red-400/50" placeholder="Ex: 15% OFF" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição Curta</label>
                    <input name="description" value={formData.description} onChange={handleChange} required className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none text-white placeholder-gray-500" placeholder="Ex: Lanches naturais..." />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Detalhes Completos da Oferta</label>
                    <textarea name="offerDetails" value={formData.offerDetails} onChange={handleChange} required rows={3} className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none text-white placeholder-gray-500" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição Completa da Empresa</label>
                    <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} required rows={3} className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none text-white placeholder-gray-500" />
                </div>
            </div>
        </div>

        {/* Contact */}
        <div className="bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-800">
            <h3 className="font-bold text-gray-200 mb-4 border-b border-slate-800 pb-2">Localização e Códigos</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Endereço</label>
                    <input name="address" value={formData.address} onChange={handleChange} required className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none text-white placeholder-gray-500" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Prefixo do Código Promocional</label>
                    <input name="discountCodePrefix" value={formData.discountCodePrefix} onChange={handleChange} required className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 outline-none uppercase font-mono text-white placeholder-gray-500" placeholder="Ex: LOJA" />
                </div>
            </div>
        </div>

        <button type="submit" className="w-full bg-salesiano-red text-white py-4 rounded-xl font-bold shadow-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
            <Save size={20} />
            {isEditing ? 'Salvar Alterações' : 'Criar Parceiro'}
        </button>
      </form>
    </div>
  );
};

export default AdminPartnerForm;