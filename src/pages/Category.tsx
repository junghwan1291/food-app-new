import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FOOD_DETAILS, DEFAULT_FOOD_DETAIL } from '../data/foodDetailsData';

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
               className="w-full mb-10 bg-[#111827] text-white py-6 rounded-[1.5rem] sm:rounded-[2rem] font-['Black_Han_Sans'] text-2xl sm:text-4xl shadow-[6px_6px_0px_#E23B2A] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
               네이버 지도로 주변 식당 찾기
            </button>

            <div className="flex items-center gap-3 mb-6">
               <h2 className="text-2xl sm:text-4xl font-['Black_Han_Sans'] text-[#111827]">🍽️ 요즘 핫한 식당</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {detail.restaurants.map((res, idx) => (
                  <a 
                    key={idx}
                    href={`https://map.naver.com/v5/search/${encodeURIComponent(res.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-[4px] border-[#111827] p-5 sm:p-6 rounded-[2rem] shadow-[6px_6px_0px_#111827] hover:scale-[1.02] transition-transform flex flex-col items-start"
                  >
                     <span className="text-[#E23B2A] font-bold text-lg sm:text-xl mb-1">{res.rating}</span>
                     <h3 className="text-xl sm:text-2xl font-['Black_Han_Sans'] text-[#111827] mb-2">{res.name}</h3>
                     <p className="text-gray-500 font-semibold flex items-center gap-1 text-sm sm:text-base">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zm1.42 1.42a5 5 0 107.07 7.07L10 15.07l-3.54-3.54a5 5 0 000-7.07zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                        {res.location}
                     </p>
                  </a>
               ))}
            </div>

         </section>

         {/* 섹션 2: 🛒 밀키트 주문 */}
         <section className="bg-[#ccfff5] border-[4px] border-[#111827] rounded-[2.5rem] p-6 sm:p-10 shadow-[8px_8px_0px_#111827]">
            <h2 className="text-2xl sm:text-4xl font-['Black_Han_Sans'] text-[#111827] mb-8 text-center">🛒 집에서 즐기는 밀키트</h2>
            <div className="flex flex-col items-center gap-6">
               {detail.mealKits.length > 0 && (
                  <div className="bg-white border-[3px] border-[#111827] rounded-2xl px-1 w-full max-w-[170px] flex items-center justify-center shadow-[4px_4px_0px_#111827] overflow-hidden h-[285px] sm:h-[295px]">
                     <div className="w-full h-[260px] flex items-center justify-center overflow-hidden rounded-xl" dangerouslySetInnerHTML={{ __html: detail.mealKits[0].html }} />
                  </div>
               )}
               <button 
                  onClick={() => navigate('/market')}
                  className="w-full max-w-xs bg-[#E23B2A] text-white border-[3px] border-[#111827] py-4 rounded-xl font-['Black_Han_Sans'] text-xl shadow-[4px_4px_0px_#111827] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
               >
                  🛒 쿠팡에서 주문하기
               </button>
            </div>
         </section>

         {/* 섹션 3: 🍳 재료 구매 */}
         <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* 재료 리스트 */}
            <div className="bg-[#FFF9C4] border-[4px] border-[#111827] p-8 rounded-[2rem] shadow-[8px_8px_0px_#111827] -rotate-1">
               <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans'] text-[#111827] mb-6">🍳 레시피 재료 리스트</h2>
               <ul className="space-y-3">
                  {detail.ingredients.map((ing, idx) => (
                     <li key={idx} className="flex items-center gap-3 font-bold text-[#111827]">
                        <div className="w-5 h-5 border-2 border-[#111827] rounded bg-white flex items-center justify-center shrink-0">
                           <div className="w-3 h-3 bg-[#E23B2A] rounded-sm shadow-inner" />
                        </div>
                        {ing}
                     </li>
                  ))}
               </ul>
            </div>

            {/* 핵심 재료 쿠팡 링크 */}
            <div className="bg-[#FF9800] border-[4px] border-[#111827] p-8 rounded-[2rem] shadow-[8px_8px_0px_#111827] rotate-1 flex flex-col h-full">
               <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans'] text-white mb-6 drop-shadow-[2px_2px_0px_#111827]">🥕 핵심 재료 바로구매</h2>
               <p className="text-white font-bold mb-8 leading-relaxed">
                  {detail.id}의 깊은 맛은 재료에서 결정됩니다! <br/>
                  최고 퀄리티의 주재료를 엄선했습니다.
               </p>
               <a 
                  href={detail.mainIngredientLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full bg-white text-[#111827] border-[4px] border-[#111827] py-5 rounded-2xl font-['Black_Han_Sans'] text-2xl text-center shadow-[4px_4px_0px_#111827] hover:scale-[1.05] transition-transform active:scale-95"
               >
                  재료 사러가기 ➔
               </a>
            </div>
         </section>

      </main>
    </div>
  );
}
