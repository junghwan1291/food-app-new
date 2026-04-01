import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KITCHEN_ITEMS } from '../data/partnersData';

export default function KitchenItemList() {
  const navigate = useNavigate();

  // 카테고리별 분류
  const kitchenware = KITCHEN_ITEMS.filter(item => item.category === '주방용품');
  const food = KITCHEN_ITEMS.filter(item => item.category === '먹거리');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderItem = (item: any) => (
    <motion.div
      variants={itemVariants}
      key={item.id} 
      className="relative w-full flex flex-col bg-white border-[3px] sm:border-[4px] border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] overflow-hidden group"
    >
        {/* 헤더 부분 */}
        <div className="w-full bg-[#00A6E0] text-white border-b-[2px] sm:border-b-[3px] border-[#111827] text-center font-bold text-[13px] sm:text-[14px] py-1.5 sm:py-2 z-30 break-keep leading-tight px-1 h-[45px] sm:h-[65px] flex items-center justify-center shrink-0">
            <span className="line-clamp-2">{item.name}</span>
        </div>
        
        {/* 이미지/위젯 */}
        <div className="w-full aspect-square flex items-center justify-center relative overflow-hidden bg-white p-1 sm:p-2">
            {item.html ? (
               <div className="w-full h-full flex items-center justify-center [&>iframe]:w-full [&>iframe]:h-full scale-[0.6] sm:scale-[0.8] origin-center" dangerouslySetInnerHTML={{ __html: item.html }} />
            ) : (
               <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center cursor-pointer overflow-hidden p-0.5">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-md sm:rounded-lg border-[1.5px] sm:border-2 border-[#111827] group-hover:scale-110 transition-transform" />
               </a>
            )}
        </div>

        {/* 가격 */}
        {item.price && (
            <div className="w-full bg-[#FFF9C4] text-[#E23B2A] border-t-[2px] sm:border-t-[3px] border-[#111827] text-center font-bold font-['Black_Han_Sans'] text-[14px] sm:text-[15px] py-1 sm:py-2 z-30 shrink-0">
                {item.price}
            </div>
        )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#F1E8D9] font-['Inter',_sans-serif] pb-20 pt-8 sm:pt-12 px-2 sm:px-4 relative flex flex-col items-center">
      <div className="w-full max-w-6xl px-2">
        {/* Header */}
        <section className="relative flex items-center justify-center mb-10 w-full mt-4 sm:mt-8">
            <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1, rotate: -1 }}
               className="inline-block bg-[#00A6E0] border-[4px] border-[#111827] px-10 sm:px-14 py-4 sm:py-6 shadow-[6px_6px_0px_#111827] rounded-3xl z-10 mx-10"
            >
               <h1 className="text-3xl sm:text-5xl font-['Black_Han_Sans'] text-white drop-shadow-[2px_2px_0px_#111827] tracking-wider whitespace-nowrap">
                  가성비템 리스트
               </h1>
            </motion.div>

            <button 
              onClick={() => navigate('/')}
              className="absolute left-0 z-20 bg-white/90 border-[3px] border-[#111827] p-2 rounded-full shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
            </button>
        </section>

        {/* 2단 구성 (Side-by-Side) */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-14 mt-12 items-start">
          
          {/* 좌측: 주방용품 Section */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 px-1">
               <div className="bg-[#111827] text-[#CCFF00] py-2 sm:py-2.5 px-3.5 sm:px-6 rounded-xl sm:rounded-2xl font-['Black_Han_Sans'] text-[16px] sm:text-2xl shadow-[3px_3px_0px_#E23B2A] -rotate-1 w-fit whitespace-nowrap leading-none">
                  🍴 주방용품
               </div>
               <div className="h-[2px] sm:h-[3px] flex-1 bg-[#111827]"></div>
            </div>
            <motion.div 
              initial="hidden" animate="visible" variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 place-items-stretch"
            >
              {kitchenware.map(item => renderItem(item))}
            </motion.div>
          </div>

          {/* 우측: 먹거리 Section */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 px-1">
               <div className="bg-[#E23B2A] text-white py-2 sm:py-2.5 px-3.5 sm:px-6 rounded-xl sm:rounded-2xl font-['Black_Han_Sans'] text-[16px] sm:text-2xl shadow-[3px_3px_0px_#111827] rotate-1 w-fit whitespace-nowrap leading-none">
                  😋 먹거리
               </div>
               <div className="h-[2px] sm:h-[3px] flex-1 bg-[#111827]"></div>
            </div>
            <motion.div 
              initial="hidden" animate="visible" variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 place-items-stretch"
            >
              {food.map(item => renderItem(item))}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
