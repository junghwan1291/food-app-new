/**
 * 🍱 [음식 상세 정보 데이터베이스]
 */

export interface FoodDetail {
  id: string; // 음식 이름 (예: "돼지김치찌개")
  imageUrl: string; 
  restaurants: {
    name: string;
    rating: string;
    location: string;
  }[];
  mealKits: {
    id: number;
    html: string;
  }[];
  ingredients: string[];
  mainIngredientLink: string; // 핵심 재료 쿠팡 링크
}

export const FOOD_DETAILS: Record<string, FoodDetail> = {
  '돼지김치찌개': {
    id: '돼지김치찌개',
    imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '김진목삼 2호점', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 서촌' },
      { name: '부산댁 광안점', rating: '⭐⭐⭐⭐ 4.0', location: '부산 광안리' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['돼지고기', '신김치', '두부', '대파', '양파', '고춧가루', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_pork'
  },
  '전주비빔밥': {
    id: '전주비빔밥',
    imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '전주비빔밥 본점', rating: '⭐⭐⭐⭐⭐ 5.0', location: '전북 전주시 완산구' },
      { name: '비빔밥 정원', rating: '⭐⭐⭐⭐ 4.2', location: '서울 중구 을지로' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['밥', '소고기', '콩나물', '애호박', '당근', '고사리', '달걀', '고추장', '참기름'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_bibimbap'
  }
};

export const DEFAULT_FOOD_DETAIL = (name: string): FoodDetail => ({
  id: name,
  imageUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80', // 기본값으로 고퀄리티 한식 상차림 사진 활용
  restaurants: [
    { name: `근처 ${name} 맛집 1번`, rating: '⭐⭐⭐⭐ 4.5', location: '현재 위치 주변' },
    { name: `주변 ${name} 소문난곳`, rating: '⭐⭐⭐⭐⭐ 4.8', location: '현재 위치 주변' }
  ],
  mealKits: [
    { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
  ],
  ingredients: [`${name} 주재료`, '각종 채소', '양념장', '다진 마늘', '대파'],
  mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
});
