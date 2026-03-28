import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MEAL_KITS, HOT_SPOTS } from '../data/partnersData';

// --- 데이터베이스 ---

const rootCategories: string[] = ['한식', '중식', '일식', '양식', '배고픔', '분식', '야식', '디저트', '기타'];

const subCategories: Record<string, string[]> = {
  '한식': ['찌개/전골', '국밥/탕', '덮밥/비빔밥', '찜/볶음류', '뒤로가기', '생선/해물', '고기구이', '면류', '기타 한식'],
  '중식': ['면류(짜장/짬뽕)', '밥류/볶음밥', '튀김/육류', '만두/딤섬', '뒤로가기', '해물류', '마라/사천', '코스요리', '기타 중식'],
  '일식': ['초밥/롤', '라멘/소바', '돈카츠/튀김', '덮밥(돈부리)', '뒤로가기', '사시미', '우동', '철판/구이', '기타 일식'],
  '양식': ['파스타', '피자', '스테이크', '수제버거', '뒤로가기', '리조또/필라프', '샐러드/스프', '샌드위치', '기타 양식'],
  '분식': ['떡볶이', '순대/내장', '튀김류', '김밥/주먹밥', '뒤로가기', '오뎅/국물', '라면/우동', '돈까스', '기타 분식'],
  '야식': ['치킨', '족발/보쌈', '닭발/오돌뼈', '곱창/막창', '뒤로가기', '피자/버거', '매운탕', '건어물/건과', '기타 야식'],
  '디저트': ['케이크/타르트', '아이스크림', '마카롱/쿠키', '빙수류', '뒤로가기', '크로플/와플', '빵/베이커리', '건강/과일', '카페 음료'],
  '기타': ['인도 커리', '베트남 쌀국수', '멕시칸 타코', '태국 팟타이', '뒤로가기', '아시안 볶음', '마라샹궈', '샤브샤브', '월남쌈/기타'],
};

const listData: Record<string, string[]> = {
  '찌개/전골': ['돼지김치찌개', '차돌된장찌개', '해물순두부찌개', '스팸부대찌개', '동태찌개', '우삼겹 청국장', '돼지짜글이', '버섯 불고기 전골', '소곱창전골'],
  '국밥/탕': ['얼큰 순대국', '부산 돼지국밥', '뼈해장국', '설렁탕', '나주 곰탕', '특 갈비탕', '한방 삼계탕', '전통 육개장', '추어탕'],
  '덮밥/비빔밥': ['돌솥비빔밥', '전통 전주비빔밥', '육회비빔밥', '매콤 불오징어덮밥', '제육덮밥', '스팸 김치볶음밥', '새우 볶음밥'],
  '고기구이': ['벌집 통삼겹살', '소금구이 목살', '깍둑 항정살', '양념 돼지갈비', '소갈비구이', '한우 꽃등심', '차돌박이 구이', '모둠 특수부위'],
  '면류': ['살얼음 물냉면', '매콤달콤 비빔냉면', '바지락 칼국수', '뜨끈한 잔치국수', '새콤 비빔국수', '들깨 수제비', '춘천 막국수', '쫄면'],
};

const getListItems = (subCategory: string) => {
   if (listData[subCategory]) return listData[subCategory];
   return [`요리장 추천 ${subCategory}`, `매콤한 불향 ${subCategory}`, `치즈 듬뿍 ${subCategory}`, `가성비 갑 ${subCategory}`, `특제 소스 ${subCategory}`, `단짠단짠 ${subCategory}`, `곱빼기 ${subCategory}`];
};

const rootStyles: Record<string, { bg: string, textObj: string, textShadow: string, font: string, img: string }> = {
  '한식': { bg: 'bg-[#FF9800]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#D32F2F]', font: 'font-["Black_Han_Sans"]', img: '/images/korean_food.png' },
  '중식': { bg: 'bg-[#D32F2F]', textObj: 'text-[#FFEB3B]', textShadow: 'drop-shadow-[3px_3px_0px_#000]', font: 'font-["Black_Han_Sans"]', img: '/images/chinese_food.png' },
  '일식': { bg: 'bg-[#03A9F4]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#1A237E]', font: 'font-["Black_Han_Sans"]', img: '/images/japanese_food.png' },
  '양식': { bg: 'bg-[#4CAF50]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#1B5E20]', font: 'font-["Black_Han_Sans"]', img: '/images/western_food.png' },
  '분식': { bg: 'bg-[#F48FB1]', textObj: 'text-[#D32F2F]', textShadow: 'drop-shadow-[2px_2px_0px_#FFF]', font: 'font-["Black_Han_Sans"]', img: '/images/snack_food.png' },
  '야식': { bg: 'bg-[#9C27B0]', textObj: 'text-[#FFEB3B]', textShadow: 'drop-shadow-[3px_3px_0px_#000]', font: 'font-["Black_Han_Sans"]', img: '/images/midnight_snack.png' },
  '디저트': { bg: 'bg-[#00BCD4]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#E91E63]', font: 'font-["Black_Han_Sans"] tracking-widest', img: '/images/dessert_food.png' },
  '기타': { bg: 'bg-[#FFC107]', textObj: 'text-[#000]', textShadow: 'drop-shadow-[2px_2px_0px_#FFF]', font: 'font-["Black_Han_Sans"]', img: '/images/other_food.png' },
};

const CheckerOverlay = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" 
       style={{ backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`, backgroundPosition: `0 0, 15px 15px`, backgroundSize: `30px 30px` }} />
);

const variants = {
  enter: (direction: number) => ({ scale: direction > 0 ? 0.4 : 1.8, opacity: 0, filter: 'blur(10px)' }),
  center: { zIndex: 1, scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: (direction: number) => ({ zIndex: 0, scale: direction < 0 ? 0.4 : 1.8, opacity: 0, filter: 'blur(10px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } })
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

  const currentGridIndex = layer === 'root' ? rootCategories : subCategories[layer];

  const handleRandomPick = () => {
     let flatLists: string[] = [];
     if (layer === 'root') flatLists = Object.values(listData).flat();
     else {
        const currentSubCats = subCategories[layer] || [];
        flatLists = currentSubCats.filter(sub => sub !== '뒤로가기').flatMap(sub => getListItems(sub));
     }
     if (flatLists.length > 0) {
        const randomItem = flatLists[Math.floor(Math.random() * flatLists.length)];
        navigate(`/category/${randomItem}`);
     }
  };

  if (subLayer) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-[#F1E8D9] font-['Inter',_sans-serif] pb-20 pt-10 px-4 relative">
        <div className="w-full max-w-xl animate-fade-in flex flex-col h-full">
            <h1 className="text-4xl sm:text-5xl font-['Black_Han_Sans'] text-[#E23B2A] mb-8 drop-shadow-[2px_2px_0px_#111827] text-center -rotate-2 uppercase">{subLayer} 리스트!</h1>
            <button onClick={() => { setDirection(-1); setSubLayer(null); }} className="w-full bg-[#111827] border-4 border-[#111827] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-['Black_Han_Sans'] text-xl hover:translate-x-[2px] hover:translate-y-[2px] mb-4">카테고리 다시 고르기</button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
               <button onClick={() => window.open(`https://map.naver.com/v5/search/${encodeURIComponent(subLayer)}`, '_blank')} className="bg-[#ccfff5] border-[3px] border-[#111827] rounded-xl py-3 font-['Black_Han_Sans'] text-lg text-[#111827] shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px]">🍽️ 유명 식당</button>
               <button onClick={() => navigate('/market')} className="bg-[#FFF9C4] border-[3px] border-[#111827] rounded-xl py-3 font-['Black_Han_Sans'] text-lg text-[#E23B2A] shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px]">🛒 밀키트 주문</button>
               <button onClick={() => alert('레시피 연동 준비 중!')} className="bg-[#FF0080] border-[3px] border-[#111827] rounded-xl py-3 font-['Black_Han_Sans'] text-lg text-white shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px]">🍳 레시피 이동</button>
            </div>
            <div className="flex flex-col gap-4">
              {getListItems(subLayer).map((item, idx) => (
                <button key={idx} onClick={() => navigate(`/category/${item}`)} className="group w-full bg-white border-4 border-[#111827] shadow-[4px_4px_0px_#111827] py-4 px-6 rounded-2xl flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px]">
                    <span className="font-['Black_Han_Sans'] text-[#111827] text-lg sm:text-3xl">{item}</span>
                    <div className="w-8 h-8 rounded-full bg-[#E23B2A] border-2 border-[#111827] text-white flex items-center justify-center font-bold font-sans flex-shrink-0">➔</div>
                </button>
              ))}
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
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-4 w-full px-2 max-w-[650px] mx-auto">
                <button onClick={handleRandomPick} className="flex-1 w-full py-4 bg-[#CCFF00] border-4 border-[#111827] rounded-[1.5rem] shadow-[4px_4px_0px_#111827] text-[#111827] font-['Black_Han_Sans'] text-xl hover:translate-x-[2px] hover:translate-y-[2px] -rotate-[2deg]">🎲 {layer === 'root' ? '아무거나' : `${layer} 다 좋아요`}</button>
                <button onClick={() => navigate('/market')} className="flex-1 w-full py-4 bg-[#FF0080] border-4 border-[#111827] rounded-[1.5rem] shadow-[4px_4px_0px_#111827] text-white font-['Black_Han_Sans'] text-xl hover:translate-x-[2px] hover:translate-y-[2px] rotate-[1deg]">🛒 로켓 장 보기</button>
            </div>
        </div>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={layer} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-6 w-full max-w-[650px] aspect-square relative z-10">
            {currentGridIndex.map((itemName, index) => {
              const isCenter = index === 4;
              const isRoot = layer === 'root';
              const s = rootStyles[itemName];
              let containerClass = "bg-white border-[3px] sm:border-4 border-[#111827] shadow-[4px_4px_0px_#111827] hover:translate-x-[2px] hover:translate-y-[2px] overflow-hidden relative transition-all";
              let textWrapper = "absolute bottom-1 sm:bottom-3 w-full text-center z-20 px-1";
              let typography = "text-xs sm:text-2xl font-['Black_Han_Sans'] text-[#111827] bg-white px-1 sm:px-3 py-1 border-2 sm:border-4 border-[#111827] shadow-[2px_2px_0px_#E23B2A] -rotate-3 transform inline-block";

              if (isRoot && !isCenter && s) {
                  containerClass = `${s.bg} border-[3px] sm:border-4 border-[#111827] shadow-[5px_5px_0px_#111827] hover:translate-x-[2px] hover:translate-y-[2px] overflow-hidden relative`;
                  textWrapper = "absolute top-1 sm:top-3 w-full text-center z-20 px-1";
                  typography = `text-[13px] sm:text-2xl ${s.font} text-[#111827] px-1 sm:px-3 py-1 bg-white border-2 sm:border-4 border-[#111827] shadow-[2px_2px_0px_#E23B2A] -rotate-3 transform inline-block`;
              } else if (isCenter) {
                  containerClass = isRoot ? "bg-[#E23B2A] border-[4px] border-[#111827] shadow-[5px_5px_0px_#111827]" : "bg-white border-[4px] border-[#111827] shadow-[5px_5px_0px_#111827]";
                  typography = isRoot ? "text-xl sm:text-5xl font-['Black_Han_Sans'] text-white drop-shadow-[2px_2px_0px_#111827]" : "text-base sm:text-3xl font-['Black_Han_Sans'] text-[#E23B2A] drop-shadow-[2px_2px_0px_#111827]";
                  textWrapper = "flex items-center justify-center w-full h-full";
              }

              let displayLabel = itemName;
              if (!isRoot && isCenter) displayLabel = '← 뒤로';

              return (
                <motion.button key={itemName + index} onClick={() => {
                  if (isRoot) { if (isCenter) return; changeLayer(itemName, 1); }
                  else { if (isCenter) changeLayer('root', -1); else { setDirection(1); setSubLayer(itemName); } }
                }} className={`group rounded-xl sm:rounded-[2rem] focus:outline-none ${containerClass}`}>
                  {isRoot && !isCenter && <CheckerOverlay />}
                  {isRoot && !isCenter && s && (
                     <div className="absolute inset-0 flex items-center justify-center z-10 transition-transform group-hover:scale-105 pointer-events-none mt-2 sm:mt-6">
                        <div className="w-[85%] h-[85%] bg-white rounded-full border-[3px] border-[#111827] shadow-[4px_4px_0px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
                           <img src={s.img} alt={itemName} className="object-cover w-[110%] h-[110%] block" />
                        </div>
                     </div>
                  )}
                  <div className={textWrapper}><span className={typography}>{displayLabel}</span></div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {!subLayer && (
            <div className="w-full max-w-[800px] mx-auto mt-12 mb-8 flex flex-col gap-10 relative z-10 px-2 sm:px-0">
                <section className="bg-[#ccfff5] border-[4px] border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827]">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans']">🛒 잘 나가는 밀키트</h2>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium pb-1 leading-tight">이 포스팅은 쿠팡 파트너스 활동의 일환으로 수수료를 제공받습니다.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 pb-2 place-items-center">
                    {(() => {
                        const currentData = MEAL_KITS[layer] || MEAL_KITS['root'] || [];
                        const displayItems = currentData.slice(0, 4);
                        return displayItems.map((item, idx) => (
                         <div key={item.id} className="relative w-full max-w-[190px] flex flex-col items-center justify-center bg-white border-[3px] border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] px-1 h-[285px] sm:h-[295px]">
                              {layer === 'root' && idx === 0 && <div className="absolute -top-4 -left-2 z-30 bg-[#E23B2A] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-[8deg] whitespace-nowrap animate-pulse">🔥 HOT 한식</div>}
                              {layer === 'root' && idx === 1 && <div className="absolute -top-4 -left-2 z-30 bg-[#00E5FF] text-[#111827] font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-3 whitespace-nowrap">🍜 아시안</div>}
                              {layer === 'root' && idx === 2 && <div className="absolute -top-4 -left-2 z-30 bg-[#FF9800] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-[5deg] whitespace-nowrap">🍝 양식</div>}
                              {item.html && <div className="w-full h-[260px] flex items-center justify-center overflow-hidden rounded-xl bg-white" dangerouslySetInnerHTML={{ __html: item.html }} />}
                         </div>
                        ));
                    })()}
                  </div>
                </section>

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
