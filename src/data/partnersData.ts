/**
 * 🛠️ [관리자 전용 데이터베이스 파일 - 카테고리 맞춤형 버전]
 */

export interface MealKit {
  id: number;
  html: string; // <iframe ...> 태그 통째로 입력
}

// 🏠 [랜딩페이지 전용] - 각 위치에 맞는 밀키트 링크를 아래 필드에 붙여넣으세요.
export const LANDING_MEAL_KITS = {
  hotKorean: { id: 1, html: `<iframe src="https://coupa.ng/cl9OxR" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` }, // 🔥 HOT 한식
  asian: { id: 2, html: `<iframe src="https://coupa.ng/cl9OwR" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },      // 🍜 아시안
  western: { id: 3, html: `<iframe src="https://coupa.ng/cl9Ovy" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },    // 🍝 양식
  general: { id: 4, html: `<iframe src="https://coupa.ng/cl9Osw" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },    // ✨ 추천
};

// 카테고리별 밀키트 매핑 데이터
export const MEAL_KITS: Record<string, MealKit[]> = {
  '한식': [
    { id: 101, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 102, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 103, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
  ],

  '중식': [
    { id: 201, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 202, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 203, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
  ],

  '양식': [
    { id: 301, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 302, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 303, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
  ]
};

export const HOT_SPOTS = [
  { id: 1, name: "대물섬 종로점", chef: "대물 광어를 일식 22년 경력 셰프가 호텔 스시야 기법으로 숙성한 맛집", imageUrl: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20251121_279%2F1763691731189BcJv5_JPEG%2F%25C8%25B0%25B9%25D9%25C1%25F6%25B6%25F41.JPG", linkUrl: "https://naver.me/xS1RkjU1" },
  { id: 2, name: "오묘 서여의도점", chef: "신선한 제철 재료로 만드는 일식기반 다이닝", imageUrl: "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjAzMjBfMTkx%2FMDAxNzczOTk3NDgzMTk2.TlDKu0L_U7vN_US3D1cIvyST_CDy3tk_i6RbKrtWl0Ag.kKb_moURYKsOEbTmvoWBk7O49E32e5M7KqP3-fz3Oi4g.JPEG%2F29632A29-7B40-4089-9A6B-96486AFF7B20.jpeg%3Ftype%3Dw1500_60_sharpen", linkUrl: "https://naver.me/Gq84wScs" },
  { id: 3, name: "도순", chef: "맛있는 음식과 술이 있습니다.", imageUrl: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240423_170%2F1713853881227iU0ha_JPEG%2FKakaoTalk_20240423_152914688.jpg", linkUrl: "https://naver.me/FG7xjiqD" }
];

export const CURATIONS = [
  { id: 1, title: '비 오는 날 생각나는', menu: '전/부침개 & 면요리', subMenus: ['해물파전', '김치전', '짬뽕', '바지락칼국수'], imageUrl: '/images/category2/분식/야식_7.png' },
  { id: 2, title: '스트레스 팍! 풀 때', menu: '매운맛 끝판왕', subMenus: ['무뼈닭발', '마라탕', '떡볶이', '매운양념치킨'], imageUrl: '/images/category2/분식/야식_5.png' },
  { id: 3, title: '부담없는 가벼운 한끼', menu: '다이어트 & 건강식', subMenus: ['연어샐러드', '연어포케', '비건버거', '클럽샌드위치'], imageUrl: '/images/category2/아시안/기타_8.png' },
  { id: 4, title: '숙취 타파 해장 얼큰', menu: '속 풀리는 국물', subMenus: ['뼈해장국', '콩나물국밥', '소고기쌀국수', '짬뽕'], imageUrl: '/images/category2/한식_2.png' },
  { id: 5, title: '아이들이 환호하는', menu: '인기 만점 키즈 메뉴', subMenus: ['치즈돈까스', '불고기피자', '싸이버거세트', '짜장면'], imageUrl: '/images/category2/일식_2.png' },
  { id: 6, title: '나를 위한 혼술 안주', menu: '가정용 바(Bar) 오픈', subMenus: ['닭강정', '모듬초밥', '야채곱창', '감바스알아히요'], imageUrl: '/images/category2/패스트푸드_1.png' },
  { id: 7, title: '기력 회복 보양식', menu: '오늘 몸보신 어때요?', subMenus: ['삼계탕', '왕갈비탕', '추어탕', '장어초밥'], imageUrl: '/images/category2/한식_7.png' },
  { id: 8, title: '입맛 돋우는 밥도둑', menu: '공기밥 순삭 보증', subMenus: ['간장게장', '안동찜닭', '갈치조림', '제육볶음'], imageUrl: '/images/category2/한식_3.png' },
  { id: 9, title: '달콤한 디저트 타임', menu: '기분 좋아지는 단맛', subMenus: ['치즈케이크', '크로플', '망고빙수', '에그타르트'], imageUrl: '/images/category2/디저트_4.png' },
  { id: 10, title: '고기 없인 못 살아', menu: '단백질 듬뿍 메인', subMenus: ['삼겹살구이', '불고기', '안심스테이크', '양념치킨'], imageUrl: '/images/category2/한식_1.png' },
];

export const KITCHEN_ITEMS = [
  // 🍳 주방용품
  { id: 1, category: '주방용품', name: '오일 스프레이어 (직구)', price: '5,900원', html: '', imageUrl: 'https://ae-pic-a1.aliexpress-media.com/kf/S4c4cf3670c1f4dc68d48c2003ec2a26cP/3700x3700.png', linkUrl: 'https://s.click.aliexpress.com/e/_c3FgFqGl' },
  { id: 2, category: '주방용품', name: '계량스푼 일체형 양념통', price: '8,500원', html: `<iframe src="https://coupa.ng/cl9OwR" width="150" height="260" frameborder="0" scrolling="no"></iframe>` },
  { id: 3, category: '주방용품', name: '접이식 실리콘 찜기', price: '15,000원', html: `<iframe src="https://coupa.ng/cl9Ovy" width="150" height="260" frameborder="0" scrolling="no"></iframe>` },
  
  // 😋 먹거리
  { id: 4, category: '먹거리', name: '라이크밀 단백질 프로틴 450g', price: '10,159원', html: '', imageUrl: 'https://ae-pic-a1.aliexpress-media.com/kf/S978e0a49f301405bb9b10a8279459086q.jpg', linkUrl: 'https://s.click.aliexpress.com/e/_c4BISYb7' },
  { id: 5, category: '먹거리', name: '건강 착즙 ABC주스 1L', price: '12,900원', html: `<iframe src="https://coupa.ng/cl9Osw" width="150" height="260" frameborder="0" scrolling="no"></iframe>` }
];
