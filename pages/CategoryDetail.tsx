
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Frown, Home } from 'lucide-react';
import { partners, categories } from '../services/data';
import PartnerCard from '../components/PartnerCard';

const CategoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const category = categories.find(c => c.id === id);
  
  // Logic to handle "Near me" - shows all partners as a simulation
  const filteredPartners = id === 'perto-de-mim' 
      ? partners 
      : partners.filter(p => p.category === id);

  if (!category) return <div className="p-10 text-center text-white">Categoria não encontrada</div>;

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header */}
      <div className={`px-6 pt-6 pb-10 rounded-b-[2rem] shadow-lg relative overflow-hidden ${category.color.split(' ')[0]}`}>
         <div className="relative z-10 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition border border-white/10">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-white drop-shadow-md">{category.name}</h1>
             </div>
             
             <Link to="/" className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition border border-white/10">
                <Home size={20} />
             </Link>
         </div>
         {/* Abstract Shape Background */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      </div>

      <div className="px-6 -mt-4 relative z-20">
        <div className="space-y-6">
          {filteredPartners.length > 0 ? (
            filteredPartners.map(partner => (
              <PartnerCard key={partner.id} partner={partner} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <Frown size={48} className="mb-4 text-gray-600" />
                <p className="text-center">Nenhum parceiro encontrado<br/>nesta categoria ainda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;