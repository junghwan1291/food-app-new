import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KITCHEN_ITEMS } from '../data/partnersData';

export default function KitchenItemsSection() {
  const navigate = useNavigate();
  const [randomItems, setRandomItems] = useState<typeof KITCHEN_ITEMS>([]);

  useEffect(() => {
    const shuffled = [...KITCHEN_ITEMS].sort(() => 0.5 - Math.random());
    setRandomItems(shuffled.slice(0, 4));
  }, []);

  return (
    <section className="bg-[#FFF9C4] border-[4px] border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827] w-full max-w-[800px] mx-auto overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-6">
        <h2 className="text-xl sm:text-3xl font-['Black_Han_Sans'] text-[#00A6E0]">🛒 이런 가성비 넘치는 제품 어때요?</h2>
        <div className="flex items-center gap-3 self-end sm:self-auto">
           <p className="text-[9px] sm:text-xs text-gray-500 font-medium leading-tight">수수료를 제공받을 수 있음</p>
           <button 
             onClick={() => navigate('/kitchen-items')}
             className="text-[#111827] font-bold text-sm sm:text-base border-b-2 border-[#111827] hover:text-[#00A6E0] hover:border-[#00A6E0] transition-colors pb-0.5 shrink-0"
           >
             더 보기 ➔
           </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 place-items-stretch">
        {randomItems.map((item) => (
          <div key={item.id} className="relative w-full flex flex-col bg-[#F1E8D9] border-[3px] sm:border-[4px] border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] overflow-hidden group">
              <div className="w-full bg-[#00A6E0] text-white border-b-[3px] border-[#111827] text-center font-bold sm:font-extrabold text-[13px] sm:text-[17px] py-2 sm:py-3 z-30 break-keep leading-snug px-2 h-[56px] sm:h-[76px] flex items-center justify-center shrink-0">
                  <span className="line-clamp-2 tracking-wide sm:tracking-wider">{item.name}</span>
              </div>
              
              {/* 이미지/위젯 부분 (정확히 1:1 비율) */}
              <div className="w-full aspect-square flex items-center justify-center relative overflow-hidden bg-white p-2">
                  {item.html ? (
                     <div className="w-full h-full flex items-center justify-center [&>iframe]:w-full [&>iframe]:h-full scale-[0.6] sm:scale-75 origin-center" dangerouslySetInnerHTML={{ __html: item.html }} />
                  ) : (
                     <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center cursor-pointer overflow-hidden p-1">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-xl border-2 border-[#111827] group-hover:scale-110 transition-transform" />
                     </a>
                  )}
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* 가격 부분 */}
              {item.price && (
                  <div className="w-full bg-[#FFF9C4] text-[#E23B2A] border-t-[3px] sm:border-t-[4px] border-[#111827] text-center font-bold font-['Black_Han_Sans'] text-[13px] sm:text-base py-1 sm:py-1.5 z-30 shrink-0">
                      {item.price}
                  </div>
              )}
          </div>
        ))}
      </div>
    </section>
  );
}
