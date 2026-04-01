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
  youtubeShortsId?: string;
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
  '된장찌개': {
    id: '된장찌개',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '민스키친 연희점', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 연희' },
      { name: '고원집', rating: '⭐⭐⭐⭐⭐ 4.7', location: '충북 청주' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['우렁이/차돌박이', '된장', '애호박', '무', '두부', '청양고추', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },

  '순두부찌개': {
    id: '순두부찌개',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '더기와 합정점', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 합정' },
      { name: '콩두주백 양재직영점', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 양재' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['순두부', '바지락', '달걀', '고추기름', '양파', '대파', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '청국장': {
    id: '청국장',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '막썰어 왕 소금구이 수영본점', rating: '⭐⭐⭐⭐⭐ 4.9', location: '부산 수영' },
      { name: '청돈옥', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 홍대' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['국산콩 청국장', '돼지목살', '신김치', '두부', '애호박', '청양고추', '대파'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '동태찌개': {
    id: '동태찌개',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '태백식당 선정릉본점', rating: '⭐⭐⭐⭐⭐ 5.0', location: '서울 선정릉' },
      { name: '생선나라', rating: '⭐⭐⭐⭐⭐ 4.7', location: '경기 김포' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['동태', '무', '고춧가루', '대파', '미나리', '다진마늘', '쑥갓'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '소곱창전골': {
    id: '소곱창전골',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '기호', rating: '⭐⭐⭐⭐⭐ 4.9', location: '서울 연남' },
      { name: '우리 청담점', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 청담' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['소곱창', '대창', '버섯', '배추', '대파', '고추장양념', '들깨가루'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '불고기': {
    id: '불고기',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '소울한우 마포도화 본점', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 마포' },
      { name: '참이맛 감자탕 강남점', rating: '⭐⭐⭐⭐⭐ 4.8', location: '서울 강남' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['소고기', '표고버섯', '양파', '간장양념', '당면', '배추'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },

  '생선구이': {
    id: '생선구이',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '어물전 청담', rating: '⭐⭐⭐⭐⭐ 4.8', location: '서울 청담' },
      { name: '도토리 브라더스', rating: '⭐⭐⭐⭐ 4.5', location: '서울 종로' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['고등어/삼치/임연수', '천일염', '레몬', '와사비간장', '무갈음'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '만두전골': {
    id: '만두전골',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '우슴 강남논현 본점', rating: '⭐⭐⭐⭐ 4.5', location: '서울 논현' },
      { name: '해정집 합정점', rating: '⭐⭐⭐⭐⭐ 4.8', location: '서울 합정' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['수제만두', '버섯', '배추', '청경채', '고기육수', '다진마늘', '칼국수사리'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '순대국밥': {
    id: '순대국밥',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '역말리 순대국밥', rating: '⭐⭐⭐⭐⭐ 4.9', location: '서울 은평' },
      { name: '가마솥순대국밥 학동역점', rating: '⭐⭐⭐⭐ 4.2', location: '서울 논현' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['순대', '돼지고기 머릿고기', '사골육수', '부추', '들깨가루', '새우젓', '다진양념'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },

  '돼지국밥': {
    id: '돼지국밥',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '안목 서면점', rating: '⭐⭐⭐⭐⭐ 4.6', location: '부산 서면' },
      { name: '안목 본점', rating: '⭐⭐⭐⭐⭐ 4.5', location: '부산 광안리' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['돼지 수육', '돼지 사골육수', '부추', '대파', '새우젓', '다대기(양념장)', '소금'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '뼈해장국': {
    id: '뼈해장국',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '해정집 합정점', rating: '⭐⭐⭐⭐⭐ 4.8', location: '서울 합정' },
      { name: '오준이네감자탕 신용산점', rating: '⭐⭐⭐⭐ 4.2', location: '서울 신용산' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['돼지 등뼈', '우거지', '된장', '들깨가루', '대파', '고춧가루', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },


  '설렁탕': {
    id: '설렁탕',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '면서울', rating: '⭐⭐⭐⭐⭐ 4.5', location: '서울 압구정' },
      { name: '서교난면방', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 합정' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['소고기 양지', '사골육수', '소면', '대파', '소금', '후추', '깍두기'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '나주곰탕': {
    id: '나주곰탕',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '무안회관 청담점', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 청담' },
      { name: '나주곰탕하얀집', rating: '⭐⭐⭐⭐ 4.2', location: '전남 나주' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['소고기 양지', '사태', '사골육수', '무', '대파', '계란지단', '후추'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '꼬리곰탕': {
    id: '꼬리곰탕',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '롯데호텔부산 무궁화', rating: '⭐⭐⭐⭐⭐ 4.5', location: '부산 서면' },
      { name: '우시마츠', rating: '⭐⭐⭐⭐⭐ 5.0', location: '서울 흑석' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['소꼬리', '사골육수', '무', '대파', '통마늘', '생강', '후추'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '왕갈비탕': {
    id: '왕갈비탕',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '송추가마골 인의반 상암점', rating: '⭐⭐⭐⭐ 4.3', location: '서울 상암' },
      { name: '열기', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 성수' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['소갈비', '사골육수', '무', '대파', '당면', '통마늘', '소금'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '콩나물국밥': {
    id: '콩나물국밥',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '나마리 전포', rating: '⭐⭐⭐⭐⭐ 5.0', location: '부산 서면' },
      { name: '창평국밥', rating: '⭐⭐⭐⭐ 4.4', location: '전남 담양' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['콩나물', '밥', '새우젓', '달걀', '대파', '청양고추', '참기름'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '황태해장국': {
    id: '황태해장국',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '손에손잡고 영등포점', rating: '⭐⭐⭐⭐ 4.0', location: '서울 영등포' },
      { name: '수달바 광안', rating: '⭐⭐⭐⭐⭐ 4.7', location: '부산 광안리' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['황태포', '무', '달걀', '두부', '대파', '다진마늘', '참기름'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '추어탕': {
    id: '추어탕',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '산골추어탕', rating: '⭐⭐⭐⭐⭐ 4.5', location: '경기 화성' },
      { name: '모담다이닝 어반 여의도점', rating: '⭐⭐⭐⭐ 4.4', location: '서울 여의도' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['미꾸라지', '된장', '들깨가루', '우거지', '고춧가루', '대파', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '삼계탕': {
    id: '삼계탕',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '진전복삼계탕 강남구청점', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 강남구청' },
      { name: '명월황금누룽지백숙', rating: '⭐⭐⭐⭐⭐ 4.9', location: '서울 은평' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['닭 한 마리', '인삼', '찹쌀', '황기', '대추', '마늘', '생강'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '육개장': {
    id: '육개장',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '더기와 합정점', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 합정' },
      { name: '뭉티크 홍대본점', rating: '⭐⭐⭐⭐⭐ 4.5', location: '서울 서교' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['소고기 사태', '고사리', '토란대', '숙주', '대파', '고춧가루', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '감자탕': {
    id: '감자탕',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '해정집 합정점', rating: '⭐⭐⭐⭐⭐ 4.8', location: '서울 합정' },
      { name: '참이맛 감자탕 강남점', rating: '⭐⭐⭐⭐⭐ 4.8', location: '서울 강남' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['돼지 등뼈', '감자', '우거지', '들깨가루', '고추기름', '청양고추', '대파'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '제육볶음': {
    id: '제육볶음',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '미담 맛을담다', rating: '⭐⭐⭐⭐⭐ 5.0', location: '서울 신림' },
      { name: '꽃밥에 피다', rating: '⭐⭐⭐⭐ 4.4', location: '서울 인사동' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['돼지 앞다리살', '고추장', '고춧가루', '양파', '대파', '참기름', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '닭갈비': {
    id: '닭갈비',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '바이춘천 송리단길점', rating: '⭐⭐⭐⭐⭐ 4.9', location: '서울 송리단길' },
      { name: '양계옥', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 양재' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['닭다리살', '고추장양념', '고구마', '양배추', '떡', '대파', '참기름'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '오징어볶음': {
    id: '오징어볶음',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '직화장인 용산점', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 용산' },
      { name: '깊픈', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 광화문' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['오징어', '고추장', '양파', '대파', '당근', '참기름', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '낙지볶음': {
    id: '낙지볶음',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '무교동유정낙지 본점', rating: '⭐⭐⭐⭐ 4.1', location: '서울 광화문' },
      { name: '지강한식당 압구정본점', rating: '⭐⭐⭐⭐ 4.3', location: '서울 압구정' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['낙지', '고추장', '양파', '대파', '참기름', '청양고추', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '쭈꾸미볶음': {
    id: '쭈꾸미볶음',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '다슬음', rating: '⭐⭐⭐⭐⭐ 4.8', location: '서울 강남' },
      { name: '아따(ADDA) 한식주점 압구정점', rating: '⭐⭐⭐⭐⭐ 4.8', location: '서울 압구정' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['쭈꾸미', '고추장', '양파', '대파', '당면', '참기름', '청양고추'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },

  '삼겹살구이': {
    id: '삼겹살구이',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '욜다', rating: '⭐⭐⭐⭐⭐ 4.8', location: '제주 제주시' },
      { name: '화우가', rating: '⭐⭐⭐⭐ 4.4', location: '서울 금천' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['삼겹살', '쌈채소', '쌈장', '마늘', '파절임', '된장찌개', '공기밥'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '돼지양념갈비': {
    id: '돼지양념갈비',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '서울꽃삼 발산본점', rating: '⭐⭐⭐⭐⭐ 4.9', location: '서울 발산' },
      { name: '봉산정육 홍대본점', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 홍대' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['돼지갈비', '사과배즙 양념', '간장', '마늘', '생강', '참기름', '깨소금'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '더덕구이': {
    id: '더덕구이',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '오붓금복당', rating: '⭐⭐⭐⭐⭐ 4.5', location: '서울 청담' },
      { name: '광안리 태산장어', rating: '⭐⭐⭐⭐⭐ 4.9', location: '부산 광안리' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['더덕', '고추장양념', '참기름', '깨소금', '들기름', '간장', '설탕'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },

  '오리구이': {
    id: '오리구이',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '장수가든', rating: '⭐⭐⭐⭐⭐ 4.8', location: '인천' },
      { name: '천하장사 남양주본점', rating: '⭐⭐⭐⭐⭐ 4.7', location: '경기 남양주' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['오리고기', '곁들임 채소', '들깨가루', '부추', '마늘', '쌈장'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '돼지갈비찜': {
    id: '돼지갈비찜',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '저수지', rating: '⭐⭐⭐⭐ 4.2', location: '부산 전포' },
      { name: '대림창고 다이닝 & 바', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 성수' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['돼지 갈비', '감자', '당근', '양파', '간장소스', '생강', '마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '소갈비찜': {
    id: '소갈비찜',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '압구정 작정', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 압구정' },
      { name: '계향각', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 혜화' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['소 갈비', '밤', '대추', '당근', '표고버섯', '간장양념', '후추'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },

  '묵은지등갈비찜': {
    id: '묵은지등갈비찜',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '다반 성수', rating: '⭐⭐⭐⭐ 4.4', location: '서울 서울숲' },
      { name: '다반 안국', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 광화문' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['돼지 등갈비', '묵은지', '감자', '대파', '청양고추', '고추장', '마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '안동찜닭': {
    id: '안동찜닭',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '봉추찜닭 여의도파이낸스타워점', rating: '⭐⭐⭐⭐ 4.1', location: '서울 여의도' },
      { name: '진여사댁', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 양재' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['닭고기', '당면', '감자', '당근', '간장양념', '마늘', '청양고추'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '닭볶음탕': {
    id: '닭볶음탕',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '잠실닭두마리집(잠닭)', rating: '⭐⭐⭐⭐⭐ 5.0', location: '서울 서래마을' },
      { name: '이름없는 달밤', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 마곡' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['닭고기', '감자', '당근', '양파', '고추장양념', '청양고추', '대파'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '갈치조림': {
    id: '갈치조림',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '대포항횟집', rating: '⭐⭐⭐⭐⭐ 4.8', location: '제주 서귀포' },
      { name: '고원집', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 세종로' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['갈치', '무', '감자', '고춧가루', '간장양념', '대파', '청양고추'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '코다리조림': {
    id: '코다리조림',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '코다리명家', rating: '⭐⭐⭐⭐ 4.3', location: '경기 안양' },
      { name: '늘보리', rating: '⭐⭐⭐⭐⭐ 4.5', location: '서울 관악' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['코다리', '무', '가래떡', '고추장양념', '다진마늘', '생강', '물엿'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '간장게장': {
    id: '간장게장',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '진미식당', rating: '⭐⭐⭐⭐⭐ 4.9', location: '서울 마포' },
      { name: '화해당', rating: '⭐⭐⭐⭐⭐ 4.7', location: '서울 여의도' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['꽃게', '한약재 간장', '생강', '마늘', '고추', '양파', '레몬'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '두부조림': {
    id: '두부조림',
    imageUrl: 'https://images.unsplash.com/photo-1547928576-a4a33237bec3?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '풀향기', rating: '⭐⭐⭐⭐ 4.2', location: '서울 남산' },
      { name: '동촌', rating: '⭐⭐⭐⭐⭐ 4.6', location: '서울 성동' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['두부', '간장양념', '고춧가루', '대파', '양파', '들기름', '다진마늘'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
  },
  '부대찌개': {
    id: '부대찌개',
    imageUrl: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80',
    restaurants: [
      { name: '이나경송탄부대찌개', rating: '⭐⭐⭐⭐ 4.3', location: '경기 수원' },
      { name: '돈오리', rating: '⭐⭐⭐⭐ 4.3', location: '서울 용산' }
    ],
    mealKits: [
      { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 2, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
      { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }
    ],
    ingredients: ['햄', '소시지', '김치', '라면사리', '치즈', '고춧가루', '대파'],
    mainIngredientLink: 'https://link.coupang.com/a/sample_generic'
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
  mainIngredientLink: 'https://link.coupang.com/a/sample_generic',
  youtubeShortsId: '0z_2J8SStpM'
});
