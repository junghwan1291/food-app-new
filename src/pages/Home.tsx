import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MEAL_KITS, HOT_SPOTS, LANDING_MEAL_KITS } from '../data/partnersData';
import { FOOD_DETAILS, DEFAULT_FOOD_DETAIL } from '../data/foodDetailsData';
import DeliveryButtons from '../components/DeliveryButtons';
import CurationSection from '../components/CurationSection';
import KitchenItemsSection from '../components/KitchenItemsSection';

// --- 데이터베이스 ---

const rootCategories: string[] = ['한식', '중식', '일식', '양식', '오늘 뭐 먹지?', '분식/야식', '아시안/기타', '패스트푸드', '디저트'];

const subCategories: Record<string, string[]> = {
  '한식': ['찌개/전골', '국밥/탕', '구이/볶음', '찜/조림', '뒤로가기', '생선/해물', '비빔밥/죽', '국수/냉면', '기타/도시락'],
  '중식': ['짜장/짬뽕', '탕수육/튀김', '마라/볶음요리', '중식 식사', '뒤로가기', '만두/딤섬', '냉면/콩국수', '일품요리', '세트메뉴'],
  '일식': ['초밥', '돈까스', '라멘/소바', '돈부리', '뒤로가기', '우동·전골', '카레', '텐동', '회/해산물'],
  '양식': ['파스타', '스테이크', '리조또', '피자', '뒤로가기', '샐러드', '오므라이스', '수프/브런치', '사이드'],
  '분식/야식': ['떡볶이', '튀김/순대', '김밥', '라면/우동', '뒤로가기', '닭발/오돌뼈', '곱창/막창', '전/부침개', '아구·해물찜'],
  '패스트푸드': ['후라이드', '양념치킨', '구이치킨', '햄버거', '뒤로가기', '수제버거', '샌드위치', '핫도그', '타코'],
  '디저트': ['커피', '라떼·기타', '에이드/주스', '케이크', '뒤로가기', '베이커리', '와플', '빙수', '아이스크림'],
  '아시안/기타': ['쌀국수', '동남아식', '팟타이', '인도카레', '뒤로가기', '케밥', '도시락', '밀키트', '채식/비건'],
};

const menusBySubCategory: Record<string, string[]> = {
  // 한식
  '찌개/전골': ['돼지김치찌개', '된장찌개', '부대찌개', '순두부찌개', '청국장', '동태찌개', '소곱창전골', '만두전골'],
  '국밥/탕': ['순대국밥', '돼지국밥', '뼈해장국', '설렁탕', '나주곰탕', '꼬리곰탕', '왕갈비탕', '콩나물국밥', '황태해장국', '추어탕', '삼계탕', '육개장', '감자탕'],
  '구이/볶음': ['제육볶음', '닭갈비', '불고기', '낙지볶음', '쭈꾸미볶음', '삼겹살구이', '돼지양념갈비', '오리구이', '더덕구이'],
  '찜/조림': ['돼지갈비찜', '소갈비찜', '묵은지등갈비찜', '안동찜닭', '닭볶음탕', '갈치조림', '코다리조림', '간장게장', '두부조림'],
  '생선/해물': ['생선구이', '해물찜', '아구찜', '꽃게탕', '연포탕', '갈치조림', '코다리조림'],
  '비빔밥/죽': ['돌솥비빔밥', '육회비빔밥', '낙지비빔밥', '산채비빔밥', '전복죽', '소고기죽', '단호박죽', '팥죽'],
  '국수/냉면': ['물냉면', '비빔냉면', '평양냉면', '막국수', '잔치국수', '바지락칼국수', '닭칼국수', '수제비', '콩국수'],
  '기타/도시락': ['한정식', '쌈밥정식', '보리밥정식', '떡갈비정식', '도시락', '구절판', '신선로', '연잎밥'],

  // 중식
  '짜장/짬뽕': ['짜장면', '간짜장', '쟁반짜장', '짬뽕', '해물짬뽕', '차돌박이짬뽕', '백짬뽕', '볶음짬뽕', '짬짜면'],
  '탕수육/튀김': ['탕수육', '꿔바로우', '깐풍기', '유린기', '크림새우', '칠리새우', '멘보샤', '새우튀김'],
  '마라/볶음요리': ['마라탕', '마라샹궈', '훠궈', '고추잡채', '마파두부', '팔보채', '유산슬', '어향가지'],
  '중식 식사': ['계란볶음밥', '새우볶음밥', '게살볶음밥', '잡채밥', '고추잡채밥', '짜장밥', '짬뽕밥', '마파두부밥'],
  '만두/딤섬': ['군만두', '물만두', '찐만두', '왕만두', '샤오롱바오', '하가우', '쇼마이', '새우딤섬', '춘권'],
  '냉면/콩국수': ['중화냉면', '해물냉면', '물밀면', '비빔밀면', '냉짬뽕'],
  '일품요리': ['양장피', '전가복', '오향장육', '동파육', '난자완스', '베이징덕', '해파리냉채', '불도장'],
  '세트메뉴': ['짜장+짬뽕 세트', '짬뽕+탕수육 세트', '마라 코스', '볶음밥 세트', '가족 코스', '프리미엄 코스'],

  // 일식
  '초밥': ['모듬초밥', '연어초밥', '광어초밥', '새우초밥', '장어초밥', '참치초밥', '소고기초밥', '캘리포니아롤', '후토마끼', '유부초밥'],
  '돈까스': ['등심돈까스', '안심돈까스', '치즈돈까스', '경양식돈까스', '생선까스', '치킨카츠', '멘치카츠'],
  '라멘/소바': ['돈코츠라멘', '미소라멘', '쇼유라멘', '시오라멘', '탄탄멘', '아부라소바', '냉모밀', '냉우동'],
  '돈부리': ['가츠동', '에비동', '규동', '오야꼬동', '사케동', '우나기동', '호르몬동', '스테키동'],
  '우동·전골': ['가락우동', '새우튀김우동', '어묵우동', '카레우동', '밀푀유나베', '모츠나베', '스키야키', '샤브샤브'],
  '카레': ['비프카레', '포크카레', '치킨카레', '새우카레', '야채카레', '함박카레', '돈까스카레'],
  '텐동': ['새우텐동', '장어텐동', '야채텐동', '오징어텐동', '모듬텐동', '가라아게동'],
  '회/해산물': ['모듬사시미', '연어사시미', '광어사시미', '참치회', '방어회', '타코와사비', '단새우회', '성게알(우니)'],

  // 양식
  '파스타': ['까르보나라', '알리오올리오', '토마토파스타', '볼로네제', '로제파스타', '봉골레', '투움바파스타', '트러플크림파스타', '명란파스타', '바질페스토파스타'],
  '스테이크': ['안심스테이크', '등심스테이크', '채끝스테이크', '티본스테이크', '토마호크스테이크', '함박스테이크', '찹스테이크', '살치살스테이크'],
  '리조또': ['트러플리조또', '해산물리조또', '크림리조또', '오징어먹물리조또', '로제리조또', '새우필라프', '치킨필라프'],
  '피자': ['마르게리따', '고르곤졸라', '페퍼로니', '콤비네이션', '불고기피자', '하와이안', '고구마피자', '시카고피자'],
  '샐러드': ['리코타치즈샐러드', '연어샐러드', '닭가슴살샐러드', '카프레제', '시저샐러드', '연어포케', '참치포케', '비프포케'],
  '오므라이스': ['전통오므라이스', '데미글라스오므라이스', '토네이도오므라이스', '크림오므라이스', '김치오므라이스', '돈까스오므라이스'],
  '수프/브런치': ['양송이스프', '콘스프', '단호박스프', '클램차우더', '에그베네딕트', '팬케이크', '프렌치토스트', '아사이볼'],
  '사이드': ['프렌치프라이', '치즈스틱', '어니언링', '버팔로윙', '마늘빵', '나초', '치즈볼'],

  // 분식/야식
  '떡볶이': ['떡볶이', '국물떡볶이', '로제떡볶이', '짜장떡볶이', '마라떡볶이', '즉석떡볶이', '라볶이', '까르보나라떡볶이'],
  '튀김/순대': ['모듬튀김', '김말이', '오징어튀김', '새우튀김', '고구마튀김', '찰순대', '순대볶음'],
  '김밥': ['원조김밥', '참치김밥', '치즈김밥', '돈까스김밥', '새우튀김김밥', '충무김밥', '키토김밥'],
  '라면/우동': ['라면', '치즈라면', '해물라면', '떡라면', '가락우동', '쫄면', '어묵탕'],
  '닭발/오돌뼈': ['국물닭발', '무뼈닭발', '통뼈닭발', '직화닭발', '오돌뼈볶음', '치즈불닭'],
  '곱창/막창': ['야채곱창', '알곱창', '소곱창구이', '돼지막창구이', '대창구이', '특양구이', '곱창전골'],
  '전/부침개': ['해물파전', '김치전', '오징어부추전', '감자전', '녹두전', '소고기육전', '동태전', '호박전'],
  '아구·해물찜': ['아구찜', '해물찜', '꽃게찜', '아구탕', '해물탕'],

  // 패스트푸드
  '후라이드': ['후라이드치킨', '순살치킨', '옛날통닭', '닭강정', '파닭', '윙봉', '간장마늘치킨'],
  '양념치킨': ['양념치킨', '매운양념치킨', '간장치킨', '뿌링클치킨', '마늘간장치킨', '고추마요치킨'],
  '구이치킨': ['로스트치킨', '바베큐치킨', '숯불구이치킨', '소금구이치킨', '데리야끼치킨'],
  '햄버거': ['빅맥세트', '와퍼세트', '불고기버거세트', '싸이버거세트', '치즈버거세트', '새우버거세트', '치킨버거세트'],
  '수제버거': ['베이컨치즈버거', '트러플버거', '더블패티버거', '새우버거', '아보카도버거', '치즈폭포버거', '스파이시치킨버거'],
  '샌드위치': ['에그토스트', '햄치즈토스트', '클럽샌드위치', 'BLT샌드위치', '연어샌드위치', '에그마요샌드위치', '치킨샌드위치'],
  '핫도그': ['핫도그', '감자핫도그', '치즈핫도그', '소시지핫도그', '오징어먹물핫도그'],
  '타코': ['비프타코', '치킨타코', '치킨브리또', '비프브리또', '퀘사디아', '나초', '파히타'],

  // 디저트
  '커피': ['아메리카노', '에스프레소', '콜드브루', '디카페인', '드립커피', '아인슈페너'],
  '라떼·기타': ['카페라떼', '바닐라라떼', '카라멜마끼아또', '카페모카', '녹차라떼', '초코라떼', '흑당버블티'],
  '에이드/주스': ['자몽에이드', '레몬에이드', '청포도에이드', '딸기주스', '키위주스', '오렌지주스', '망고스무디', '블루베리스무디'],
  '케이크': ['치즈케이크', '초코케이크', '티라미수', '생크림케이크', '딸기케이크', '에그타르트', '호두타르트', '레드벨벳케이크'],
  '베이커리': ['소금빵', '크루아상', '베이글', '앙버터', '치즈스콘', '식빵', '마늘빵', '까눌레'],
  '와플': ['크로플', '리에주와플', '씬와플', '누텔라와플', '딸기잼와플', '생크림와플'],
  '빙수': ['인절미빙수', '팥빙수', '망고빙수', '딸기빙수', '녹차빙수', '메론빙수', '오레오빙수'],
  '아이스크림': ['그릭요거트', '요거트아이스크림', '바닐라아이스크림', '초코아이스크림', '젤라또', '소프트아이스크림'],

  // 기타
  '쌀국수': ['소고기쌀국수', '차돌박이쌀국수', '해물쌀국수', '분짜', '반미', '스프링롤', '월남쌈'],
  '동남아식': ['똠양꿍', '똠카가이', '솜땀', '뿌팟퐁커리', '얌운센', '모닝글로리볶음'],
  '팟타이': ['새우팟타이', '치킨팟타이', '팟씨유', '나시고랭', '미고랭'],
  '인도카레': ['버터치킨커리', '팔락파니르', '치킨티카마살라', '난', '탄두리치킨', '라씨', '사모사'],
  '케밥': ['치킨케밥', '양고기케밥', '믹스케밥', '케밥랩', '바클라바', '피데'],
  '도시락': ['제육도시락', '돈까스도시락', '치킨마요덮밥', '비빔밥도시락', '스팸마요도시락', '소불고기도시락'],
  '밀키트': ['감바스알아히요', '밀푀유나베', '우삼겹떡볶이', '스테이크밀키트', '부대찌개밀키트', '마라샹궈밀키트'],
  '채식/비건': ['비건버거', '사찰음식', '콩고기구이', '비건만두', '비건파스타', '두부스테이크', '단호박구이'],
};

const getShuffledMealKits = (category: string) => {
  const categorySubs = subCategories[category] || [];
  let allMenuNames: string[] = [];
  categorySubs.forEach(sub => {
    if (menusBySubCategory[sub]) {
      allMenuNames = [...allMenuNames, ...menusBySubCategory[sub]];
    }
  });

  if (allMenuNames.length === 0) return MEAL_KITS['root'].slice(0, 4);

  // 무작위로 섞고 상위 4개 선택
  const shuffled = [...allMenuNames].sort(() => 0.5 - Math.random());
  const selectedMenus = shuffled.slice(0, 4);

  return selectedMenus.map((menuName, idx) => {
    const detail = FOOD_DETAILS[menuName] || DEFAULT_FOOD_DETAIL(menuName);
    // 각 메뉴의 첫 번째 밀키트를 가져옴 (없으면 root의 기본값 활용)
    return detail.mealKits[0] || { ...MEAL_KITS['root'][0], id: 999 + idx };
  });
};

const rootStyles: Record<string, { bg: string, textObj: string, textShadow: string, font: string, img: string }> = {
  '한식': { bg: 'bg-[#FF9800]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#D32F2F]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/korean.png' },
  '중식': { bg: 'bg-[#D32F2F]', textObj: 'text-[#FFEB3B]', textShadow: 'drop-shadow-[3px_3px_0px_#000]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/chinese.png' },
  '일식': { bg: 'bg-[#03A9F4]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#1A237E]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/japanese.png' },
  '양식': { bg: 'bg-[#4CAF50]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#1B5E20]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/western.png' },
  '분식/야식': { bg: 'bg-[#F48FB1]', textObj: 'text-[#D32F2F]', textShadow: 'drop-shadow-[2px_2px_0px_#FFF]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/snack.png' },
  '패스트푸드': { bg: 'bg-[#9C27B0]', textObj: 'text-[#FFEB3B]', textShadow: 'drop-shadow-[3px_3px_0px_#000]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/fastfood.png' },
  '디저트': { bg: 'bg-[#00BCD4]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#E91E63]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/dessert.png' },
  '아시안/기타': { bg: 'bg-[#FFC107]', textObj: 'text-[#000]', textShadow: 'drop-shadow-[2px_2px_0px_#FFF]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/other.png' },
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
      return [
        LANDING_MEAL_KITS.hotKorean,
        LANDING_MEAL_KITS.asian,
        LANDING_MEAL_KITS.western,
        LANDING_MEAL_KITS.general
      ];
    }
    return getShuffledMealKits(layer);
  }, [layer]);

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
                <button key={idx} onClick={() => navigate(`/category/${item}`)} className="group w-full bg-white border-4 border-[#111827] shadow-[4px_4px_0px_#111827] py-4 px-6 rounded-2xl flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px]">
                    <span className="font-['Black_Han_Sans'] text-[#111827] text-xl sm:text-3xl">{item}</span>
                    <div className="w-8 h-8 rounded-full bg-[#E23B2A] border-2 border-[#111827] text-white flex items-center justify-center font-bold font-sans flex-shrink-0">➔</div>
                </button>
              ))}
            </div>
            <DeliveryButtons keyword={subLayer} />
            <div className="mt-8">
               <KitchenItemsSection />
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
                <button onClick={() => window.open('https://link.coupang.com/a/eflI8r', '_blank')} className="flex-1 w-full py-3 sm:py-4 bg-[#FF0080] border-4 border-[#111827] rounded-[1.25rem] sm:rounded-[1.5rem] shadow-[3px_3px_0px_#111827] sm:shadow-[4px_4px_0px_#111827] text-white font-['Black_Han_Sans'] text-base sm:text-xl hover:translate-x-[2px] hover:translate-y-[2px] rotate-[1deg] break-keep leading-tight">🚀 로켓 주문</button>
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

              let containerClass = `${s.bg} border-[3px] sm:border-4 border-[#111827] shadow-[4px_4px_0px_#111827] hover:translate-x-[2px] hover:translate-y-[2px] overflow-hidden relative transition-all`;
              let textWrapper = "absolute top-1 sm:top-2 w-full text-center z-20 px-1";
              let typography = `text-xl sm:text-2xl ${isRoot ? s.font : 'font-["Black_Han_Sans"]'} text-[#111827] bg-white px-2 sm:px-3 py-1 border-2 sm:border-4 border-[#111827] shadow-[2px_2px_0px_#E23B2A] -rotate-3 inline-block leading-tight break-keep`;

              if (isCenter) {
                  containerClass = isRoot ? "bg-[#E23B2A] border-[4px] border-[#111827] shadow-[5px_5px_0px_#111827]" : "bg-white border-[4px] border-[#111827] shadow-[5px_5px_0px_#111827]";
                  typography = isRoot ? "text-4xl sm:text-5xl font-['Black_Han_Sans'] text-white drop-shadow-[2px_2px_0px_#111827]" : "text-3xl sm:text-3xl font-['Black_Han_Sans'] text-[#E23B2A] drop-shadow-[2px_2px_0px_#111827]";
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
            <div className="w-full max-w-[800px] mx-auto mt-12 mb-8 flex flex-col gap-10 relative z-10 px-2 sm:px-0">
                <section className="bg-[#ccfff5] border-[4px] border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827]">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans']">🛒 잘 나가는 밀키트</h2>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium pb-1 leading-tight">이 포스팅은 쿠팡 파트너스 활동의 일환으로 수수료를 제공받습니다.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 pb-2 place-items-center">
                    {randomizedMealKits.map((item, idx) => (
                         <div key={`${item.id}-${idx}`} className="relative w-full max-w-[190px] flex flex-col items-center justify-center bg-white border-[3px] border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] px-1 h-[285px] sm:h-[295px]">
                              {layer === 'root' && idx === 0 && <div className="absolute -top-4 -left-2 z-30 bg-[#E23B2A] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-[8deg] whitespace-nowrap animate-pulse">🔥 HOT 한식</div>}
                              {layer === 'root' && idx === 1 && <div className="absolute -top-4 -left-2 z-30 bg-[#00E5FF] text-[#111827] font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-3 whitespace-nowrap">🍜 아시안</div>}
                              {layer === 'root' && idx === 2 && <div className="absolute -top-4 -left-2 z-30 bg-[#FF9800] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-[5deg] whitespace-nowrap">🍝 양식</div>}
                              {layer === 'root' && idx === 3 && <div className="absolute -top-4 -left-2 z-30 bg-[#4CAF50] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rotate-2 whitespace-nowrap">✨ 추천 품목</div>}
                              {item.html && <div className="w-full h-[260px] flex items-center justify-center overflow-hidden rounded-xl bg-white" dangerouslySetInnerHTML={{ __html: item.html }} />}
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




