import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CURATIONS } from '../data/partnersData';
import { subCategories, menusBySubCategory, rootStyles } from '../data/categoryData';
import CurationDrawer from '../components/CurationDrawer';

export default function CurationList() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCuration, setSelectedCuration] = useState<typeof CURATIONS[0] | null>(null);

  const getCategoryIconForCuration = (subMenus: string[]) => {
    const categoriesAtSubMenus = subMenus.map(menu => {
      for (const [rootCat, subCats] of Object.entries(subCategories)) {
        for (const subCat of subCats) {
          if (menusBySubCategory[subCat]?.includes(menu)) {
            return rootCat;
          }
        }
      }
      return null;
    }).filter(Boolean) as string[];

    const uniqueCats = Array.from(new Set(categoriesAtSubMenus));
    if (uniqueCats.length === 0) return '/images/placeholder.png';
    const randomCat = uniqueCats[Math.floor(Math.random() * uniqueCats.length)];
    return rootStyles[randomCat]?.img || '/images/placeholder.png';
  };

  const handleCurationClick = (cur: typeof CURATIONS[0]) => {
    setSelectedCuration(cur);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F1E8D9] font-['Inter',_sans-serif] pb-20 pt-8 sm:pt-12 px-4 relative flex flex-col items-center">
      <div className="w-full max-w-2xl px-2">
        {/* Header */}
        <section className="relative flex items-center justify-center mb-10 w-full mt-4 sm:mt-8">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1, rotate: 2 }}
               className="inline-block bg-[#E23B2A] border-[4px] border-[#111827] px-8 sm:px-12 py-4 sm:py-6 shadow-[6px_6px_0px_#111827] rounded-2xl z-10 mx-10"
            >
               <h1 className="text-3xl sm:text-5xl font-['Black_Han_Sans'] text-white drop-shadow-[2px_2px_0px_#111827] tracking-wider whitespace-nowrap">
                  추천 큐레이션 모음
               </h1>
            </motion.div>

            {/* 뒤로가기 버튼 */}
            <button 
              onClick={() => navigate('/')}
              className="absolute left-0 z-20 bg-white/90 border-[3px] border-[#111827] p-2 sm:p-3 rounded-full shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#111827] transition-all"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
            </button>
        </section>

        {/* Curation List */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="flex flex-col gap-5 sm:gap-6 mt-12"
        >
          {CURATIONS.map((cur: any) => (
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              key={cur.id}
              onClick={() => handleCurationClick(cur)}
              className="group relative bg-[#F1E8D9] border-[4px] border-[#111827] rounded-[2rem] overflow-hidden shadow-[6px_6px_0px_#111827] hover:scale-[1.02] active:translate-y-[2px] transition-all flex flex-row items-stretch text-left w-full max-w-none"
            >
               <div className="w-1/3 sm:w-[160px] bg-white flex shrink-0 items-center justify-center border-r-[4px] border-[#111827] relative overflow-hidden min-h-[120px] sm:min-h-[140px]">
                  <img src={cur.imageUrl} alt={cur.menu} className="w-[120%] h-[120%] object-cover group-hover:scale-110 transition-transform" />
               </div>
               <div className="p-5 sm:p-6 w-2/3 sm:w-auto flex flex-col justify-center flex-1 bg-white">
                  <span className="text-sm sm:text-base text-[#111827] bg-[#CCFF00] border-2 border-[#111827] font-bold px-3 py-1 rounded-full w-fit mb-3 sm:mb-4 shadow-[2px_2px_0px_#E23B2A] whitespace-nowrap">{cur.title}</span>
                  <div className="flex items-center justify-between gap-4">
                     <span className="text-xl sm:text-2xl font-bold text-[#E23B2A] tracking-tight leading-tight flex-1">{cur.menu}</span>
                     <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform border-[3px] border-[#111827] shadow-[2px_2px_0px_#E23B2A]">➔</div>
                  </div>
               </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <CurationDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedCuration?.menu || ''}
        subMenus={selectedCuration?.subMenus || []}
        icon={selectedCuration ? getCategoryIconForCuration(selectedCuration.subMenus) : undefined}
      />
    </div>
  );
}
