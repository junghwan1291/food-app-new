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
    imageUrl: '/images/foods/pork_kimchi_jjigae.jpg',
    restaurants: [
      { name: '대독장 김치찌개전문점', rating: '⭐⭐⭐⭐⭐ 4.9', location: '서울 강남구 역삼동' },
      { name: '김치찌개 맛있는집', rating: '⭐⭐⭐⭐ 4.5', location: '서울 서초구 방배동' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['돼지 앞다리살 300g', '잘 익은 김치 1/4포기', '대파 1대', '청양고추 2개', '두부 반 모', '고춧가루 2큰술', '다진마늘 1큰술'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_pork'
  },
  '전주비빔밥': {
    id: '전주비빔밥',
    imageUrl: '/images/foods/jeonju_bibimbap.jpg',
    restaurants: [
      { name: '전주비빔밥 본점', rating: '⭐⭐⭐⭐⭐ 5.0', location: '전북 전주시 완산구' },
      { name: '비빔밥 정원', rating: '⭐⭐⭐⭐ 4.2', location: '서울 중구 을지로' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['불고기용 소고기 100g', '콩나물, 시금치, 고사리 각 50g', '달걀 1개', '고추장 소스', '참기름 1큰술'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_bibimbap'
  }
};

export const DEFAULT_FOOD_DETAIL = (name: string): FoodDetail => ({
  id: name,
  imageUrl: '/images/foods/pork_kimchi_jjigae.jpg', // 기본값으로 김치찌개 사진 활용
  restaurants: [
    { name: `근처 ${name} 맛집 1번`, rating: '⭐⭐⭐⭐ 4.5', location: '현재 위치 주변' },
    { name: `주변 ${name} 소문난곳`, rating: '⭐⭐⭐⭐⭐ 4.8', location: '현재 위치 주변' }
  ],
  mealKits: [
    { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
  ],
  ingredients: [`${name}용 주재료`, '양념장 및 기본 채소', '다진 마늘/파', '참기름/깨'],
  mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
});
