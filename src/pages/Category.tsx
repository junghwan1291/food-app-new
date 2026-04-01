import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FOOD_DETAILS, DEFAULT_FOOD_DETAIL } from '../data/foodDetailsData';
import DeliveryButtons from '../components/DeliveryButtons';
import CurationSection from '../components/CurationSection';
import ShinbakCookingSection from '../components/ShinbakCookingSection';

export default function Category() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  // 데이터 가져오기 (없으면 기본값 생성)
  const detail = FOOD_DETAILS[name || ''] || DEFAULT_FOOD_DETAIL(name || '음식');

  return (
    <div className="min-h-screen bg-[#F1E8D9] font-['Inter',_sans-serif] selection:bg-[#E23B2A] selection:text-white pb-20">
      
      {/* 1. 상단 비주얼 (Hero Section) - 음식 사진 + 이름 */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden border-b-[6px] border-[#111827]">
         <img 
            src={detail.imageUrl} 
            alt={detail.id} 
            className="w-full h-full object-cover saturate-[1.2] brightness-[0.9]"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/60 to-transparent" />
         
         {/* 음식 이름 박스 */}
         <motion.div 
            initial={{ y: 50, opacity: 0, rotate: -5 }}
            animate={{ y: 0, opacity: 1, rotate: -3 }}
            className="absolute bottom-8 left-4 right-4 sm:left-10 sm:right-auto z-10"
         >
            <div className="inline-block bg-white border-[4px] border-[#111827] px-6 sm:px-10 py-3 sm:py-5 shadow-[6px_6px_0px_#E23B2A] rounded-xl sm:rounded-2xl">
               <h1 className="text-3xl sm:text-5xl md:text-6xl font-['Black_Han_Sans'] text-[#111827] tracking-tight">
                  {detail.id}
               </h1>
            </div>
         </motion.div>

         {/* 뒤로가기 버튼 */}
         <button 
           onClick={() => navigate(-1)}
           className="absolute top-6 left-6 z-20 bg-white/90 border-[3px] border-[#111827] p-2 sm:p-3 rounded-full shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#111827] transition-all"
         >
           <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
         </button>
      </section>

      {/* 2. 상세 콘텐츠 영역 */}
      <main className="max-w-4xl mx-auto px-4 mt-12 space-y-12">
         
         {/* 섹션 1: 🍽️ 요즘 핫한 식당 */}
         <section className="animate-fade-in delay-100">
            <button 
               onClick={() => window.open(`https://map.naver.com/v5/search/${encodeURIComponent(detail.id)}`, '_blank')}
               className="w-full mb-2 bg-[#111827] text-white py-3 sm:py-4 rounded-[1.2rem] sm:rounded-[1.5rem] font-['Black_Han_Sans'] text-xl sm:text-2xl shadow-[4px_4px_0px_#E23B2A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
               네이버 지도로 주변 식당 찾기
            </button>

            <DeliveryButtons keyword={name || ''} />

            <div className="flex items-center gap-3 mb-4 mt-8">
               <h2 className="text-xl sm:text-3xl font-['Black_Han_Sans'] text-[#111827]">🍽️ 요즘 핫한 식당</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
               {detail.restaurants.map((res, idx) => (
                  <a 
                    key={idx}
                    href={`https://map.naver.com/v5/search/${encodeURIComponent(res.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-[3px] border-[#111827] p-3 sm:p-4 rounded-2xl shadow-[4px_4px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-between gap-3"
                  >
                     <div className="flex flex-col items-start min-w-0">
                        <h3 className="text-base sm:text-lg font-['Black_Han_Sans'] text-[#111827] truncate w-full">{res.name}</h3>
                        <p className="text-gray-500 font-medium flex items-center gap-1 text-[11px] sm:text-sm mt-0.5">
                           <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zm1.42 1.42a5 5 0 107.07 7.07L10 15.07l-3.54-3.54a5 5 0 000-7.07zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                           <span className="truncate">{res.location}</span>
                        </p>
                     </div>
                     <div className="flex shrink-0">
                        <span className="text-[#E23B2A] font-bold text-xs sm:text-sm bg-[#FFF9C4] px-2 py-1 rounded-lg border-2 border-[#111827] whitespace-nowrap">{res.rating}</span>
                     </div>
                  </a>
               ))}
            </div>

         </section>

         <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-4xl mx-auto items-stretch">
            {/* 왼쪽: 밀키트 */}
            <section className="bg-[#ccfff5] border-[3px] sm:border-[4px] border-[#111827] rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-8 shadow-[4px_4px_0px_#111827] sm:shadow-[6px_6px_0px_#111827] flex flex-col items-center">
               <h2 className="text-[13px] sm:text-3xl font-['Black_Han_Sans'] text-[#111827] mb-3 sm:mb-6 text-center break-keep leading-tight">
                  <span className="block sm:hidden">🛒 밀키트 추천</span>
                  <span className="hidden sm:inline">🛒 집에서 즐기는 밀키트</span>
               </h2>
               <div className="flex flex-col items-center w-full h-full justify-center">
                  {detail.mealKits.length > 0 && (
                     <div className="bg-white border-[2px] sm:border-[3px] border-[#111827] rounded-xl sm:rounded-2xl px-0.5 sm:px-1 w-full max-w-[130px] sm:max-w-[170px] flex items-center justify-center shadow-[2px_2px_0px_#111827] sm:shadow-[4px_4px_0px_#111827] overflow-hidden sm:h-[295px] aspect-[15/26] sm:aspect-auto">
                        <div className="w-full flex items-center justify-center rounded-xl scale-[0.65] sm:scale-100 origin-top mt-5 sm:mt-0" dangerouslySetInnerHTML={{ __html: detail.mealKits[0].html }} />
                     </div>
                  )}
               </div>
            </section>

            {/* 오른쪽: 재료 */}
            <section className="w-full h-full">
               <div className="bg-[#FFF9C4] border-[3px] sm:border-[4px] border-[#111827] p-3 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-[4px_4px_0px_#111827] sm:shadow-[6px_6px_0px_#111827] h-full flex flex-col justify-between">
                  <div>
                     <h2 className="text-[13px] sm:text-3xl font-['Black_Han_Sans'] text-[#111827] mb-3 sm:mb-5 leading-tight break-keep text-center">
                        <span className="block sm:hidden">🍳 재료 리스트</span>
                        <span className="hidden sm:inline">🍳 레시피 재료 리스트</span>
                     </h2>
                     <ul className="space-y-1.5 sm:space-y-3 mb-4 sm:mb-6">
                        {detail.ingredients.map((ing, idx) => (
                           <li key={idx} className="flex items-start sm:items-center gap-1.5 sm:gap-3 font-bold text-[#111827] text-[10px] sm:text-base leading-tight">
                              <div className="w-2.5 h-2.5 sm:w-5 sm:h-5 border-[1.5px] sm:border-2 border-[#111827] rounded-sm sm:rounded bg-white flex items-center justify-center shrink-0 mt-[2px] sm:mt-0">
                                 <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 bg-[#E23B2A] rounded-[1px] sm:rounded-sm shadow-inner" />
                              </div>
                              <span className="break-keep">{ing}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <a 
                     href={detail.mainIngredientLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full bg-[#FF9800] text-white border-[2px] sm:border-[3px] border-[#111827] py-2 sm:py-4 rounded-lg sm:rounded-xl font-['Black_Han_Sans'] text-[11px] sm:text-xl text-center shadow-[2px_2px_0px_#111827] sm:shadow-[4px_4px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-1 block break-keep"
                  >
                     <span className="block sm:hidden">🥕 핵심재료 ➔</span>
                     <span className="hidden sm:inline">🥕 핵심 재료 바로구매 ➔</span>
                  </a>
               </div>
            </section>
         </div>

         <ShinbakCookingSection foodName={detail.id} youtubeShortsId={detail.youtubeShortsId} />

         <CurationSection />

      </main>
    </div>
  );
}
