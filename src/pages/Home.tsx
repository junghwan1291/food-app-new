import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MEAL_KITS, HOT_SPOTS } from '../data/partnersData';
import { FOOD_DETAILS, DEFAULT_FOOD_DETAIL } from '../data/foodDetailsData';
import { 
  rootCategories, 
  subCategories, 
  menusBySubCategory, 
  rootStyles, 
  getFranchiseBrands 
} from '../data/categoryData';
import DeliveryButtons from '../components/DeliveryButtons';
import CurationSection from '../components/CurationSection';
import KitchenItemsSection from '../components/KitchenItemsSection';

// --- 데이터베이스 ---

const CheckerOverlay = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" 
       style={{ backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`, backgroundPosition: `0 0, 15px 15px`, backgroundSize: `30px 30px` }} />
);

const variants = {
  enter: (direction: number) => ({ scale: direction > 0 ? 0.4 : 1.8, opacity: 0, filter: 'blur(10px)' }),
  center: { zIndex: 1, scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: (direction: number) => ({ zIndex: 0, scale: direction < 0 ? 0.4 : 1.8, opacity: 0, filter: 'blur(10px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } })
};

const getShuffledMealKitsFromItems = (items: string[], limit: number) => {
  let allKits: any[] = [];
  items.forEach(item => {
    const detail = FOOD_DETAILS[item] || DEFAULT_FOOD_DETAIL(item);
    if (detail && detail.mealKits && detail.mealKits.length > 0) {
      allKits = [...allKits, ...detail.mealKits];
    }
  });

  if (allKits.length === 0) return MEAL_KITS['root'].slice(0, limit);
  
  return [...allKits].sort(() => 0.5 - Math.random()).slice(0, limit);
};

const getMealKitsByCategoryGroup = (rootCats: string[], limit: number) => {
  let allItems: string[] = [];
  rootCats.forEach(rc => {
    const subs = subCategories[rc] || [];
    subs.filter(s => s !== '뒤로가기').forEach(s => {
      if (menusBySubCategory[s]) {
        allItems = [...allItems, ...menusBySubCategory[s]];
      }
    });
  });
  return getShuffledMealKitsFromItems(allItems, limit);
};

const getListItems = (subLayer: string) => {
  return menusBySubCategory[subLayer] || [];
};

export default function Home() {
  const [layer, setLayer] = useState('root');
  const [subLayer, setSubLayer] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();

  const changeLayer = (newLayer: string, dir: number) => {
    setDirection(dir);
    setLayer(newLayer);
  };

  const randomizedMealKits = useMemo(() => {
    if (layer === 'root') {
      const hotKorean = getMealKitsByCategoryGroup(['한식'], 1);
      const asian = getMealKitsByCategoryGroup(['중식', '일식', '분식/야식', '아시안/기타'], 1);
      const western = getMealKitsByCategoryGroup(['양식'], 1);
      const general = getMealKitsByCategoryGroup(rootCategories, 1);
      
      return [
        hotKorean[0] || MEAL_KITS['root'][0],
        asian[0] || MEAL_KITS['root'][1],
        western[0] || MEAL_KITS['root'][2],
        general[0] || MEAL_KITS['root'][3]
      ];
    }
    
    // 카테고리 레이어일 때 (한식, 중식 등)
    return getMealKitsByCategoryGroup([layer], 4);
  }, [layer]);

  const subLayerMealKits = useMemo(() => {
    if (!subLayer) return [];
    return getShuffledMealKitsFromItems(menusBySubCategory[subLayer] || [], 4);
  }, [subLayer]);

  const currentGridIndex = layer === 'root' ? rootCategories : subCategories[layer];

  const handleRandomPick = () => {
     let flatLists: string[] = [];
     if (layer === 'root') {
        flatLists = Object.values(menusBySubCategory).flat();
     } else {
        const currentSubCats = subCategories[layer] || [];
        flatLists = currentSubCats.filter(sub => sub !== '뒤로가기').flatMap(sub => menusBySubCategory[sub] || []);
     }
     if (flatLists.length > 0) {
        const randomItem = flatLists[Math.floor(Math.random() * flatLists.length)];
        navigate(`/category/${randomItem}`);
     }
  };

  if (subLayer) {
    const isSpecialCategory = layer === '패스트푸드' || layer === '디저트';

    return (
      <div className="min-h-screen flex flex-col items-center bg-[#F1E8D9] font-['Inter',_sans-serif] pb-20 pt-10 px-4 relative">
        <div className="w-full max-w-xl animate-fade-in flex flex-col h-full">
            <h1 className="text-4xl sm:text-5xl font-['Black_Han_Sans'] text-[#E23B2A] mb-8 drop-shadow-[2px_2px_0px_#111827] text-center -rotate-2 uppercase">{subLayer} 리스트!</h1>
            <button onClick={() => { setDirection(-1); setSubLayer(null); }} className="w-full bg-[#111827] border-4 border-[#111827] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-['Black_Han_Sans'] text-xl hover:translate-x-[2px] hover:translate-y-[2px] mb-4">카테고리 다시 고르기</button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
               <button onClick={() => window.open(`https://map.naver.com/v5/search/${encodeURIComponent(subLayer)}`, '_blank')} className="bg-[#ccfff5] border-[3px] border-[#111827] rounded-xl py-3 font-['Black_Han_Sans'] text-lg text-[#111827] shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px]">🍽️ 근처 식당 찾기</button>
               <button onClick={() => navigate('/market')} className="bg-[#FFF9C4] border-[3px] border-[#111827] rounded-xl py-3 font-['Black_Han_Sans'] text-lg text-[#E23B2A] shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px]">🛒 밀키트 주문</button>
            </div>
            <div className="flex flex-col gap-4">
              {getListItems(subLayer).map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => !isSpecialCategory && navigate(`/category/${item}`)} 
                  className={`group w-full bg-white border-4 border-[#111827] shadow-[4px_4px_0px_#111827] py-4 px-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 ${!isSpecialCategory ? 'hover:translate-x-[2px] hover:translate-y-[2px]' : 'cursor-default'}`}
                >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                       <span className="font-['Black_Han_Sans'] text-[#111827] text-xl sm:text-3xl break-keep text-left">{item}</span>
                    </div>
                    {isSpecialCategory ? (
                       <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-end">
                          {getFranchiseBrands(item).map((brand, bIdx) => (
                             <span key={bIdx} className="bg-[#FFF9C4] border-2 border-[#111827] rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-sm font-bold text-[#111827] shadow-[2px_2px_0px_#111827]">
                                {brand}
                             </span>
                          ))}
                       </div>
                    ) : (
                       <div className="w-8 h-8 rounded-full bg-[#E23B2A] border-2 border-[#111827] text-white flex items-center justify-center font-bold font-sans flex-shrink-0 animate-pulse">➔</div>
                    )}
                </button>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-6">
               {/* 🛒 추천 밀키트 섹션 신설 */}
               <section className="bg-[#ccfff5] border-[4px] border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827] w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans']">🛒 추천 밀키트</h2>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium pb-1 leading-tight sm:ml-auto w-full sm:w-auto text-left sm:text-right">이 포스팅은 쿠팡 파트너스 활동의 일환으로 수수료를 제공받습니다.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 pb-2 place-items-center">
                    {subLayerMealKits.map((item, idx) => (
                         <div key={`${item.id}-${idx}`} className="relative w-full max-w-[190px] flex flex-col items-center justify-center bg-white border-[3px] border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] px-1 h-[210px] sm:h-[295px]">
                              {item.html && <div className="w-full flex items-center justify-center rounded-xl bg-white scale-75 sm:scale-100 origin-top mt-4 sm:mt-0" dangerouslySetInnerHTML={{ __html: item.html }} />}
                         </div>
                    ))}
                  </div>
               </section>

               {isSpecialCategory ? (
                  <section className="bg-white border-4 border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827] w-full">
                     <div className="flex flex-col items-center text-center">
                        <div className="bg-[#ccfff5] border-[3px] border-[#111827] px-4 py-2 rounded-xl mb-4 -rotate-2">
                           <h3 className="font-['Black_Han_Sans'] text-xl sm:text-2xl text-[#111827]">🛒 이 메뉴, 밀키트로 더 싸게!</h3>
                        </div>
                        <p className="text-sm sm:text-lg font-bold text-gray-700 mb-6 leading-relaxed">
                           {subLayer} 메뉴를 집에서도 즐길 수 있는<br/>
                           가성비 최고의 밀키트 리스트를 확인해보세요!
                        </p>
                        <button 
                           onClick={() => navigate('/market')}
                           className="w-full bg-[#E23B2A] text-white border-4 border-[#111827] py-4 rounded-2xl font-['Black_Han_Sans'] text-xl sm:text-2xl shadow-[4px_4px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                        >
                           🎁 밀키트 보러가기 ➔
                        </button>
                     </div>
                  </section>
               ) : (
                  <KitchenItemsSection />
               )}
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F1E8D9] text-[#111827] font-['Inter',_sans-serif] pb-8">
      <main className="flex-grow flex flex-col items-center justify-start px-2 pt-8 w-full relative">
        <div className="text-center mb-6 relative z-10 w-full mt-4 sm:mt-10">
            <h1 className="text-[2.5rem] sm:text-6xl font-['Black_Han_Sans'] text-[#E23B2A] mb-4 drop-shadow-[2px_2px_0px_#111827] rotate-[-2deg] uppercase">{layer === 'root' ? '오늘 뭐 먹지?' : layer}</h1>
            <div className="flex flex-row gap-2 sm:gap-3 items-center justify-center mt-4 w-full px-2 max-w-[650px] mx-auto">
                <button onClick={handleRandomPick} className="flex-1 w-full py-3 sm:py-4 bg-[#CCFF00] border-4 border-[#111827] rounded-[1.25rem] sm:rounded-[1.5rem] shadow-[3px_3px_0px_#111827] sm:shadow-[4px_4px_0px_#111827] text-[#111827] font-['Black_Han_Sans'] text-base sm:text-xl hover:translate-x-[2px] hover:translate-y-[2px] -rotate-[2deg] break-keep leading-tight">🎲 {layer === 'root' ? '진짜 아무거나' : `${layer} 아무거나`}</button>
                <div className="relative flex-1 w-full">
                  <button onClick={() => document.getElementById('curation-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="w-full py-3 sm:py-4 bg-[#00E5FF] border-4 border-[#111827] rounded-[1.25rem] sm:rounded-[1.5rem] shadow-[4px_4px_0px_#E23B2A] sm:shadow-[6px_6px_0px_#E23B2A] text-[#111827] font-['Black_Han_Sans'] text-lg sm:text-2xl hover:translate-x-[2px] hover:translate-y-[2px] rotate-[1deg] break-keep leading-tight transition-all">✨ 상황별 추천</button>
                  <div className="absolute -top-3 -right-2 bg-[#E23B2A] text-white text-[10px] sm:text-xs font-['Black_Han_Sans'] px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] z-30 animate-bounce">HOT!</div>
                </div>
            </div>
        </div>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={layer} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-6 w-full max-w-[650px] aspect-square relative z-10">
            {currentGridIndex.map((itemName, index) => {
              const isCenter = index === 4;
              const isRoot = layer === 'root';
              const s = rootStyles[itemName] || rootStyles[layer] || { bg: 'bg-[#FFF]', font: 'font-["Black_Han_Sans"] text-sm sm:text-lg', img: '' };
              const category2ImgIndex = index > 4 ? index : index + 1; // 1~8 스킵 처리
              const imgToUse = isRoot ? s.img : `/images/category2/${layer}_${category2ImgIndex}.png`;

              const isLongWord = itemName.length > 4;
              let containerClass = `${s.bg} border-[3px] sm:border-4 border-[#111827] shadow-[4px_4px_0px_#111827] hover:translate-x-[2px] hover:translate-y-[2px] overflow-hidden relative transition-all`;
              let textWrapper = "absolute top-1 sm:top-2 w-full text-center z-20 px-1";
              let typography = `${isLongWord ? 'text-[0.95rem]' : 'text-xl'} sm:text-2xl ${isRoot ? s.font : 'font-["Black_Han_Sans"]'} text-[#111827] bg-white px-2 sm:px-3 py-1 border-2 sm:border-4 border-[#111827] shadow-[2px_2px_0px_#E23B2A] -rotate-3 inline-block leading-tight break-keep whitespace-nowrap`;

              if (isCenter) {
                  containerClass = isRoot ? "bg-[#E23B2A] border-[4px] border-[#111827] shadow-[5px_5px_0px_#111827]" : "bg-white border-[4px] border-[#111827] shadow-[5px_5px_0px_#111827]";
                  typography = isRoot ? "text-[1.75rem] sm:text-5xl font-['Black_Han_Sans'] text-white drop-shadow-[2px_2px_0px_#111827] whitespace-nowrap" : "text-2xl sm:text-3xl font-['Black_Han_Sans'] text-[#E23B2A] drop-shadow-[2px_2px_0px_#111827] whitespace-nowrap";
                  textWrapper = "flex items-center justify-center w-full h-full";
              }

              let displayLabel = itemName;
              if (!isRoot && isCenter) displayLabel = '← 뒤로';
              if (displayLabel === '오늘 뭐 먹지?') displayLabel = '아무거나';

              return (
                <motion.button key={itemName + index} onClick={() => {
                  if (isRoot) { if (isCenter) { handleRandomPick(); return; } changeLayer(itemName, 1); }
                  else { if (isCenter) changeLayer('root', -1); else { setDirection(1); setSubLayer(itemName); } }
                }} className={`group rounded-xl sm:rounded-[2rem] focus:outline-none ${containerClass}`}>
                  {!isCenter && <CheckerOverlay />}
                  {!isCenter && (
                     <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform group-hover:scale-105 pointer-events-none mt-4 sm:mt-6">
                        <div className="w-[85%] h-[85%] bg-white rounded-full border-[3px] border-[#111827] shadow-[4px_4px_0px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
                           <img src={imgToUse} alt={itemName} onError={(e) => { e.currentTarget.src = '/images/placeholder.png' }} className="object-cover w-[110%] h-[110%] block" />
                        </div>
                     </div>
                  )}
                  <div className={textWrapper}><span className={typography}>{displayLabel}</span></div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <DeliveryButtons keyword={layer === 'root' ? undefined : layer} />

        {!subLayer && (
            <div className="w-full max-w-[800px] mx-auto mt-8 sm:mt-10 mb-12 flex flex-col gap-6 sm:gap-8 relative z-10 px-2 sm:px-0">
                <section className="bg-[#ccfff5] border-[4px] border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827]">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans']">🛒 잘 나가는 밀키트</h2>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium pb-1 leading-tight sm:ml-auto w-full sm:w-auto text-left sm:text-right">이 포스팅은 쿠팡 파트너스 활동의 일환으로 수수료를 제공받습니다.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 pb-2 place-items-center">
                    {randomizedMealKits.map((item, idx) => (
                         <div key={`${item.id}-${idx}`} className="relative w-full max-w-[190px] flex flex-col items-center justify-center bg-white border-[3px] border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] px-1 h-[210px] sm:h-[295px]">
                              {layer === 'root' && idx === 0 && <div className="absolute -top-3 -left-2 z-50 bg-[#E23B2A] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-[8deg] whitespace-nowrap animate-pulse">🔥 HOT 한식</div>}
                              {layer === 'root' && idx === 1 && <div className="absolute -top-3 -left-2 z-50 bg-[#00E5FF] text-[#111827] font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-3 whitespace-nowrap">🍜 아시안</div>}
                              {layer === 'root' && idx === 2 && <div className="absolute -top-3 -left-2 z-50 bg-[#FF9800] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-[5deg] whitespace-nowrap">🍝 양식</div>}
                              {layer === 'root' && idx === 3 && <div className="absolute -top-3 -left-2 z-50 bg-[#4CAF50] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rotate-2 whitespace-nowrap">✨ 추천 품목</div>}
                              {item.html && <div className="w-full flex items-center justify-center rounded-xl bg-white scale-75 sm:scale-100 origin-top mt-4 sm:mt-0" dangerouslySetInnerHTML={{ __html: item.html }} />}
                         </div>
                    ))}
                  </div>
                </section>

                <CurationSection />
                <KitchenItemsSection />

                <section className="bg-[#FFF9C4] border-[4px] border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827]">
                  <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans'] mb-4 text-[#E23B2A]">🔥 요즘 핫한 가게</h2>
                  <div className="flex flex-col gap-3">
                      {HOT_SPOTS.slice(0, 3).map((item) => (
                           <a key={item.id} href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-white border-[3px] border-[#111827] rounded-xl shadow-[3px_3px_0px_#111827] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-[#111827]" />
                                <div className="flex flex-col text-left"><span className="font-bold text-sm sm:text-lg text-gray-800">{item.name}</span><span className="text-xs sm:text-sm text-gray-500">{item.chef}</span></div>
                           </a>
                      ))}
                  </div>
                </section>
            </div>
        )}
      </main>
    </div>
  );
}




