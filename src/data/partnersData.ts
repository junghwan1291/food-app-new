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
