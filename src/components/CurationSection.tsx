import { useNavigate } from 'react-router-dom';
import { CURATIONS } from '../data/partnersData';

export default function CurationSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#E23B2A] border-[4px] border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827] mt-8 w-full max-w-[800px] mx-auto">
      <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans'] mb-6 text-white text-center">✨ 상황별 맞춤 큐레이션</h2>
      <div className="grid grid-cols-2 gap-4">
        {CURATIONS.map((cur) => (
          <button
            key={cur.id}
            onClick={() => navigate(cur.linkUrl)}
            className="group relative bg-[#F1E8D9] border-[3px] border-[#111827] rounded-xl overflow-hidden shadow-[4px_4px_0px_#111827] hover:-translate-y-1 transition-transform flex flex-col sm:flex-row items-center sm:items-stretch text-left"
          >
             <div className="w-full sm:w-1/2 h-24 sm:h-32 bg-white flex shrink-0 items-center justify-center border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-[#111827] relative overflow-hidden">
                <img src={cur.imageUrl} alt={cur.menu} className="w-[120%] h-[120%] object-cover group-hover:scale-110 transition-transform" />
             </div>
             <div className="p-3 w-full sm:w-1/2 flex flex-col justify-center">
                <span className="text-xs sm:text-sm text-[#E23B2A] font-bold mb-1">{cur.title}</span>
                <span className="text-base sm:text-lg font-['Black_Han_Sans'] text-[#111827] break-keep leading-tight">{cur.menu}</span>
             </div>
          </button>
        ))}
      </div>
    </section>
  );
}
