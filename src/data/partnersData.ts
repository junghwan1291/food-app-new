/**
 * 🛠️ [관리자 전용 데이터베이스 파일 - 카테고리 맞춤형 버전]
 * 
 * 이제 각 카테고리(한식, 중식, 일식 등)에 맞춰 밀키트를 다르게 설정할 수 있습니다!
 */

export interface MealKit {
  id: number;
  html: string; // <iframe ...> 태그 통째로 입력
}

// 카테고리별 밀키트 매핑 데이터
export const MEAL_KITS: Record<string, MealKit[]> = {
  // 🏠 [랜딩페이지 전용]
  root: [
    { id: 1, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 2, html: `<iframe src="https://coupa.ng/cl7s3a" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 3, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 4, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 5, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 6, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
  ],

  '한식': [
    { id: 101, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 102, html: `<iframe src="https://coupa.ng/cl7tbS" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 103, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
  ],

  '중식': [
    { id: 201, html: `<iframe src="https://coupa.ng/cl7s3a" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 202, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 203, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
  ],

  '양식': [
    { id: 301, html: `<iframe src="https://coupa.ng/cl7s3M" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 302, html: `<iframe src="https://coupa.ng/cl7syd" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
    { id: 303, html: `<iframe src="https://coupa.ng/cl7sZM" width="150" height="260" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics></iframe>` },
  ]
};

export const HOT_SPOTS = [
  { id: 1, name: "유비빔의 비빔소리", chef: "비빔대왕 유비빔", imageUrl: "https://images.unsplash.com/photo-1544158913-911181f08bd4?q=80&w=200&auto=format&fit=crop", linkUrl: "https://naver.com" },
  { id: 2, name: "쵸이닷 (Choi.)", chef: "최현석 셰프", imageUrl: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=200&auto=format&fit=crop", linkUrl: "https://map.naver.com" },
  { id: 3, name: "티엔미미", chef: "정지선 셰프", imageUrl: "https://images.unsplash.com/photo-1563514986835-fb5591901c0c?q=80&w=200&auto=format&fit=crop", linkUrl: "https://map.naver.com" }
];
