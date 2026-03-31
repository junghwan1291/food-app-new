import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MEAL_KITS, HOT_SPOTS, LANDING_MEAL_KITS } from '../data/partnersData';
import { FOOD_DETAILS, DEFAULT_FOOD_DETAIL } from '../data/foodDetailsData';

// --- 데이터베이스 ---

const rootCategories: string[] = ['한식', '중식', '일식', '양식', '오늘 뭐 먹지?', '분식/야식', '패스트푸드', '디저트', '기타'];

const subCategories: Record<string, string[]> = {
  '한식': ['찌개/전골', '국밥/탕', '구이/볶음', '찜/조림', '뒤로가기', '생선/해물', '비빔밥/죽', '국수/냉면', '기타 한식/도시락'],
  '중식': ['짜장/짬뽕', '탕수육/튀김', '마라/볶음요리', '밥류(볶음밥 등)', '뒤로가기', '만두/딤섬', '냉면/콩국수', '일품요리(양장피 등)', '세트메뉴'],
  '일식': ['초밥(스시)', '돈까스', '라멘/소바', '덮밥(돈부리)', '뒤로가기', '우동/나베', '카레', '텐동(튀김덮밥)', '회/해산물'],
  '양식': ['파스타', '스테이크', '리조또/필라프', '피자', '뒤로가기', '샐러드/포케', '오므라이스', '수프/브런치', '사이드(감자튀김 등)'],
  '분식/야식': ['떡볶이', '튀김/순대', '김밥', '라면/우동', '뒤로가기', '닭발/오돌뼈', '곱창/막창', '전/부침개', '아구찜/해물찜'],
  '패스트푸드': ['치킨(후라이드)', '치킨(양념)', '치킨(구이)', '햄버거 세트', '뒤로가기', '수제버거', '샌드위치/토스트', '핫도그', '타코/브리또'],
  '디저트': ['커피', '논커피/라떼', '에이드/주스', '케이크/타르트', '뒤로가기', '베이커리/빵', '와플/크로플', '빙수', '요거트/아이스크림'],
  '기타': ['쌀국수(베트남)', '똠양꿍(태국)', '팟타이', '카레(인도)', '뒤로가기', '케밥', '도시락(편의점형)', '밀키트 세트', '채식/비건']
};

const menusBySubCategory: Record<string, string[]> = {
  // 한식
  '찌개/전골': ['돼지김치찌개', '차돌된장찌개', '우렁된장찌개', '부대찌개', '순두부찌개', '청국장', '동태찌개', '소곱창전골', '버섯불고기전골', '만두전골'],
  '국밥/탕': ['순대국밥', '수육국밥', '돼지국밥', '뼈해장국', '양평해장국', '선지해장국', '설렁탕', '나주곰탕', '꼬리곰탕', '왕갈비탕', '콩나물국밥', '황태해장국', '추어탕', '삼계탕', '육개장', '감자탕'],
  '구이/볶음': ['제육볶음', '닭갈비', '오징어볶음', '낙지볶음', '쭈꾸미볶음', '뚝배기불고기', '돼지양념갈비', '삼겹살구이', '차돌박이구이', '더덕구이', '황태구이', '오리주물럭'],
  '찜/조림': ['돼지갈비찜', '소갈비찜', '매운소갈비찜', '묵은지등갈비찜', '안동찜닭', '닭볶음탕'],
  '생선/해물': ['고등어구이', '가자미구이', '삼치구이', '조기구이', '매콤해물찜', '아구찜', '알찜', '대구뽈찜', '꽃게탕', '연포탕', '오징어숙회', '왕새우소금구이', '해물파전', '꼬막무침', '고등어무조림', '갈치조림', '코다리조림'],
  '비빔밥/죽': ['전주비빔밥', '돌솥비빔밥', '육회비빔밥', '꼬막비빔밥', '낙지비빔밥', '산채비빔밥', '참치마요비빔밥', '전복죽', '야채죽', '소고기버섯죽', '단호박죽', '동지팥죽', '낙지김치죽', '흑임자죽'],
  '국수/냉면': ['살얼음물냉면', '매콤비빔냉면', '코다리회냉면', '평양냉면', '뜨끈한 잔치국수', '새콤비빔국수', '바지락칼국수', '얼큰칼국수', '닭칼국수', '들깨수제비', '춘천막국수', '고기국수', '여름콩국수', '열무국수'],
  '기타 한식/도시락': ['한정식 코스', '11찬 정식', '떡갈비정식', '보리밥정식', '쌈밥정식', '우렁쌈밥', '수제 편의점도시락', '제육도시락', '돈까스도시락', '충무김밥', '연잎밥', '구절판', '신선로'],

  // 중식
  '짜장/짬뽕': ['옛날짜장면', '간짜장', '해물쟁반짜장', '유니짜장', '사천짜장', '고추짜장', '얼큰짬뽕', '삼선해물짬뽕', '차돌박이짬뽕', '백짬뽕', '굴짬뽕', '볶음짬뽕', '짬짜면'],
  '탕수육/튀김': ['전통탕수육', '찹쌀탕수육(꿔바로우)', '사천탕수육', '소고기탕수육', '깐풍기', '유린기', '크림새우', '칠리새우', '깐풍새우', '멘보샤', '가지튀김', '새우튀김'],
  '마라/볶음요리': ['마라탕', '마라샹궈', '마라훠궈', '고추잡채', '마파두부', '팔보채', '유산슬', '어향가지', '토마토계란볶음', '경장육사', '라조기', '라조육'],
  '밥류(볶음밥 등)': ['고슬고슬 계란볶음밥', '새우볶음밥', '게살볶음밥', '잡채밥', '마파두부밥', '중화비빔밥', '유산슬밥', '고추잡채밥', '짜장밥', '짬뽕밥', '오므라이스(중식)'],
  '만두/딤섬': ['바삭 군만두', '촉촉 물만두', '수제 찐만두', '왕만두', '샤오롱바오(소룡포)', '하가우', '쇼마이', '새우딤섬', '부추만두', '꽃빵과 연유', '춘권'],
  '냉면/콩국수': ['중국식 냉면', '해물냉면', '고소한 콩국수', '비빔냉면', '물밀면', '비빔밀면', '중화냉짬뽕'],
  '일품요리(양장피 등)': ['톡쏘는 양장피', '전가복', '오향장육', '동파육', '난자완스', '해삼탕', '불도장', '베이징덕(북경오리)', '해파리냉채'],
  '세트메뉴': ['짜장+짬뽕+탕수육', '깐풍기+짜장2', '마라탕+꿔바로우', '볶음밥+미니탕수육', '1인 탕짜면', '1인 탕볶밥', '가족코스 요리 A', '프리미엄 코스 B'],

  // 일식
  '초밥(스시)': ['스페셜 모듬초밥', '생연어초밥', '대광어초밥', '간장새우초밥', '민물장어초밥', '계란초밥', '참다랑어(참치)초밥', '소고기타다끼초밥', '캘리포니아롤', '대왕 후토마끼', '유부초밥'],
  '돈까스': ['두툼 등심돈까스(로스)', '부드러운 안심돈까스(히레)', '치즈폭포 돈까스', '고구마치즈돈까스', '추억의 경양식돈까스', '생선까스', '치킨카츠', '멘치카츠', '매운돈까스', '돈까스나베'],
  '라멘/소바': ['진한 돈코츠라멘', '구수한 미소라멘', '깔끔한 쇼유라멘', '시오라멘', '매콤 탄탄멘', '마제소바', '아부라소바', '시원한 냉모밀(소바)', '판모밀', '냉우동'],
  '덮밥(돈부리)': ['촉촉한 가츠동(돈까스)', '에비동(새우튀김)', '규동(소고기)', '오야꼬동(닭고기)', '사케동(생연어)', '텐동(모듬튀김)', '우나기동(민물장어)', '호르몬동(대창)', '스테키동'],
  '우동/나베': ['뜨끈한 가락우동', '새우튀김우동', '사누키 어묵우동', '김치우동', '카레우동', '밀푀유나베', '모츠나베(대창전골)', '창코나베', '관동식 스키야키', '샤브샤브'],
  '카레': ['일본식 비프카레', '포크카레', '치킨카레', '새우튀김카레', '수제돈까스 카레', '반반카레', '고로케카레', '야채카레', '함박스테이크 카레'],
  '텐동(튀김덮밥)': ['바삭 에비텐동(새우)', '아나고텐동(장어)', '야채텐동', '스페셜텐동', '이카텐동(오징어)', '모듬 덴푸라', '가라아게동'],
  '회/해산물': ['고급 모듬사시미', '생연어사시미', '광어사시미', '혼마구로 참치회', '방어회', '타코와사비', '메로구이', '시샤모구이', '연어머리구이', '단새우회', '성게알(우니)'],

  // 양식
  '파스타': ['정통 까르보나라', '알리오올리오', '해산물 토마토파스타', '볼로네제 파스타', '꾸덕 로제파스타', '봉골레파스타', '매콤 투움바파스타', '트러플 크림파스타', '명란오일파스타', '바질페스토 파스타', '라자냐', '빠네크림파스타'],
  '스테이크': ['부드러운 안심스테이크', '육즙가득 등심스테이크', '채끝살스테이크', '가성비 부채살스테이크', '티본스테이크', '토마호크스테이크', '수제 함박스테이크', '찹스테이크', '포크스트립 플래터', '살치살스테이크'],
  '리조또/필라프': ['트러플 머쉬룸크림리조또', '해산물 토마토리조또', '베이컨 크림리조또', '오징어먹물리조또', '로제리조또', '통새우필라프', '목살필라프', '김치베이컨필라프', '치킨가라아게 필라프'],
  '피자': ['마르게리따 피자', '꿀찍는 고르곤졸라', '짭짤한 페퍼로니피자', '콤비네이션 피자', '리얼 불고기피자', '베이컨포테이토 듬뿍피자', '하와이안 피자', '치즈 듬뿍 시카고피자', '고구마무스 피자', '마스카포네 치즈피자'],
  '샐러드/포케': ['리코타치즈 샐러드', '생연어 샐러드', '수비드 닭가슴살 샐러드', '카프레제 샐러드', '치킨시저 샐러드', '단호박 샐러드', '생연어 포케', '참치 포케', '그릴드비프 포케', '쉬림프 샐러드'],
  '오므라이스': ['추억의 전통오므라이스', '진한 데미글라스오므라이스', '회오리 토네이도오므라이스', '부드러운 크림소스오므라이스', '매콤 김치오므라이스', '돈까스 오므라이스', '소시지 오므라이스'],
  '수프/브런치': ['진한 양송이스프', '달콤 콘스프', '단호박스프', '조개 클램차우더', '브런치 에그베네딕트', '메이플 팬케이크', '폭신 프렌치토스트', '잉글리시 블랙퍼스트', '아사이볼', '크로크무슈'],
  '사이드(감자튀김 등)': ['바삭 프렌치프라이', '케이준 웨지감자', '모짜렐라 치즈스틱', '어니언링', '매콤 버팔로윙', '마늘빵(갈릭바게트)', '상큼 콘샐러드', '해쉬브라운', '나초치즈', '치즈볼'],

  // 분식/야식
  '떡볶이': ['매콤달콤 배달떡볶이', '꾸덕 국물떡볶이', '인기폭발 로제떡볶이', '짜장떡볶이', '얼얼한 마라떡볶이', '치즈폭탄 떡볶이', '쫀득 가래떡떡볶이', '사리듬뿍 즉석떡볶이', '라볶이', '까르보나라 떡볶이', '옛날 학교앞 떡볶이'],
  '튀김/순대': ['바삭바삭 모듬튀김', '당면가득 김말이', '대왕 오징어튀김', '왕새우튀김', '달콤 고구마튀김', '야끼만두', '쫄깃 찰순대', '내장포함 옛날순대', '매콤달콤 순대볶음', '백순대볶음'],
  '김밥': ['꽉찬 원조김밥', '마요듬뿍 참치김밥', '모짜렐라 치즈김밥', '바삭 돈까스김밥', '통새우튀김김밥', '매콤 멸치추땡김밥', '다이어트 계란지단김밥(키토)', '통영 충무김밥', '묵은지참치김밥', '꼬마김밥'],
  '라면/우동': ['계란탁 신라면', '고소한 치즈라면', '물만두라면', '해물 듬뿍라면', '쫄깃 떡라면', '김천st 가락우동', '매콤새콤 쫄면', '비빔만두', '잔치국수', '어묵탕'],
  '닭발/오돌뼈': ['매운 국물닭발', '숯불 무뼈닭발', '콜라겐 통뼈닭발', '숯불 직화닭발', '오독오독 오돌뼈볶음', '김가루 주먹밥', '포슬포슬 계란찜', '치즈불닭'],
  '곱창/막창': ['당면가득 야채곱창', '마늘듬뿍 알곱창', '찰순대 곱창볶음', '지글지글 소곱창구이', '고소한 돼지막창구이', '매운 불막창', '대창구이', '특양구이', '곱창전골', '염통구이'],
  '전/부침개': ['바삭 해물파전', '매콤 김치전', '오징어 부추전', '쫀득 바삭 감자전', '두툼 녹두전', '명절 모듬전', '고소한 소고기육전', '동태전', '깻잎전', '호박전'],
  '아구찜/해물찜': ['매콤 콩나물아구찜', '푸짐 해물찜', '고소한 알찜', '대구뽈찜', '꽃게찜', '아구탕', '해물탕', '낙지볶음', '동태탕'],

  // 패스트푸드
  '치킨(후라이드)': ['바삭 황금올리브 치킨', '크리스피 치킨', '추억의 옛날통닭', '순살 후라이드', '달콤 바삭 닭강정', '알싸한 파닭', '윙봉 콤보', '핫후라이드', '간장마늘 치킨'],
  '치킨(양념)': ['전통 양념치킨', '눈물찔끔 매운양념치킨', '단짠 간장치킨', '알싸 마늘간장치킨', '단짠 마법뿌링클 치킨', '부드러운 슈프림양념치킨', '고추마요 치킨', '치즈볼 추가'],
  '치킨(구이)': ['오븐구이 로스트치킨', '매콤 바베큐치킨', '숯불양념구이', '담백한 소금구이', '갈릭 로스트치킨', '순살 바베큐', '데리야끼 오븐구이'],
  '햄버거 세트': ['클래식 빅맥 세트', '직화 불맛 와퍼 세트', '달콤 불고기버거 세트', '가성비 싸이버거 세트', '치즈버거 세트', '탱글 새우버거 세트', '푸짐 타워버거 세트', '치킨버거 세트', '모짜렐라인더버거 세트'],
  '수제버거': ['베이컨치즈 버거', '트러플 머쉬룸 버거', '육즙왕 더블패티 버거', '새우통살 버거', '아보카도 버거', '바삭 해쉬브라운 버거', '치즈폭포 수제버거', '스파이시 치킨버거'],
  '샌드위치/토스트': ['달콤 에그토스트', '버터구이 햄치즈토스트', '추억의 길거리토스트', '든든한 클럽샌드위치', '베이컨 BLT샌드위치', '훈제 연어샌드위치', '부드러운 에그마요샌드위치', '치킨텐더 샌드위치', '카야토스트'],
  '핫도그': ['바삭 명랑핫도그', '도깨비 방망이 감자핫도그', '쭉~늘어나는 모짜렐라치즈핫도그', '오징어먹물핫도그', '육즙팡팡 소시지핫도그', '체다치즈 핫도그', '라면스낵 핫도그'],
  '타코/브리또': ['정통 비프타코', '스파이시 포크타코', '치킨 브리또', '비프 브리또', '치즈듬뿍 퀘사디아', '과카몰리와 나초', '또띠아 파히타 플래터', '엔칠라다', '부리또볼'],

  // 디저트
  '커피': ['깔끔한 아메리카노', '달콤 헤이즐넛 아메리카노', '부드러운 콜드브루', '밤에도 디카페인 아메리카노', '진한 에스프레소', '드립 커피', '아인슈페너'],
  '논커피/라떼': ['고소한 카페라떼', '달콤 바닐라라떼', '카라멜 마끼아또', '달콤쌉쌀 카페모카', '제주 녹차라떼', '리얼 초코라떼', '로열 밀크티', '자색 고구마라떼', '흑당 버블티', '말차라떼'],
  '에이드/주스': ['상큼 자몽에이드', '청량 레몬에이드', '달콤 청포도에이드', '생과일 딸기바나나주스', '새콤 키위주스', '건강 토마토주스', '100% 착즙 오렌지주스', '시원한 자두스무디', '망고스무디', '블루베리스무디'],
  '케이크/타르트': ['진한 뉴욕 치즈케이크', '꾸덕 초코케이크', '살살녹는 티라미수', '과일 듬뿍 생크림케이크', '상큼 딸기케이크', '겉바속촉 에그타르트', '고소한 호두타르트', '상큼 과일타르트', '레드벨벳 케이크', '당근 케이크'],
  '베이커리/빵': ['버터동굴 소금빵', '결이살아있는 크루아상', '플레인 베이글', '달콤고소 앙버터', '치즈 스콘', '우유 식빵', '촉촉 마늘빵', '건강한 호밀빵', '달콤 모카빵', '까눌레', '마들렌'],
  '와플/크로플': ['바삭바삭 크로플', '아이스크림 얹은 크로플', '리에주 벨기에 와플', '사과잼 가득 씬와플', '악마의 누텔라 와플', '딸기잼 와플', '초코칩 와플', '생크림 폭탄 와플'],
  '빙수': ['눈꽃 인절미빙수', '전통 팥빙수', '상큼 애플망고빙수', '생딸기 듬뿍 빙수', '달콤 메론빙수', '오레오 초코빙수', '쌉쌀 녹차빙수', '치즈케이크 빙수', '복숭아 빙수'],
  '요거트/아이스크림': ['꾸덕꾸덕 그릭요거트', '상큼 요거트아이스크림', '클래식 바닐라아이스크림', '진한 초코아이스크림', '이탈리안 쫀득 젤라또', '알록달록 구슬아이스크림', '소프트아이스크림', '파르페'],

  // 기타
  '쌀국수(베트남)': ['진한 소고기쌀국수', '고소한 차돌박이쌀국수', '시원한 해물쌀국수', '깔끔 양지쌀국수', '매콤 얼큰쌀국수', '새콤달콤 분짜', '바삭한 반미 샌드위치', '짜조(스프링롤)', '월남쌈'],
  '똠양꿍(태국)': ['새콤매콤 똠양꿍', '코코넛 똠카가이', '상큼 얌운센', '매콤 솜땀(파파야 샐러드)', '뿌팟퐁커리', '무쌉', '모닝글로리 볶음'],
  '팟타이': ['통새우 팟타이', '담백한 치킨 팟타이', '넓은면 팟씨유', '인도네시아 나시고랭', '볶음면 미고랭', '파인애플 볶음밥'],
  '카레(인도)': ['부드러운 버터치킨마크니', '시금치치즈 팔락파니르', '매콤 치킨티카마살라', '톡쏘는 램빈달루', '화덕에 구운 난(갈릭/버터)', '매콤 탄두리치킨', '라씨(요구르트 음료)', '사모사'],
  '케밥': ['터키식 치킨케밥', '풍미가득 양고기케밥', '치킨+양 믹스케밥', '먹기편한 케밥랩', '쫀득 터키아이스크림', '바클라바(터키 디저트)', '피데(터키식 피자)'],
  '도시락(편의점형)': ['매콤 제육볶음도시락', '든든한 돈까스도시락', '달콤 치킨마요덮밥', '야채가득 비빔밥도시락', '푸짐 11찬도시락', '단짠 스팸마요도시락', '연어스테이크 도시락', '소불고기 도시락'],
  '밀키트 세트': ['와인안주 감바스알아히요 밀키트', '국물요리 밀푀유나베 밀키트', '매콤 우삼겹떡볶이 밀키트', '캠핑용 스테이크 밀키트', '푸짐 부대찌개 밀키트', '감자탕 밀키트', '마라샹궈 밀키트'],
  '채식/비건': ['식물성 대체육 비건버거', '정갈한 사찰음식 정식', '단짠 콩고기구이', '고기없는 비건만두', '담백 비건파스타', '야채만 채식카레', '신선발사믹 버섯샐러드', '고소한 두부스테이크', '단호박오븐구이']
};

const getListItems = (subCategory: string) => {
   // 세부 카테고리명을 키로 사용하여 정확한 리스트를 리턴
   if (menusBySubCategory[subCategory]) {
       return menusBySubCategory[subCategory];
   }
   return [`강력추천 ${subCategory}`, `매콤달달 ${subCategory}`, `단골들이 찾는 ${subCategory}`, `요즘 핫한 ${subCategory}`];
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
  '분식/야식': { bg: 'bg-[#F48FB1]', textObj: 'text-[#D32F2F]', textShadow: 'drop-shadow-[2px_2px_0px_#FFF]', font: 'font-["Black_Han_Sans"] text-sm sm:text-lg', img: '/images/category1/snack.png' },
  '패스트푸드': { bg: 'bg-[#9C27B0]', textObj: 'text-[#FFEB3B]', textShadow: 'drop-shadow-[3px_3px_0px_#000]', font: 'font-["Black_Han_Sans"] text-sm sm:text-lg', img: '/images/category1/fastfood.png' },
  '디저트': { bg: 'bg-[#00BCD4]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#E91E63]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/dessert.png' },
  '기타': { bg: 'bg-[#FFC107]', textObj: 'text-[#000]', textShadow: 'drop-shadow-[2px_2px_0px_#FFF]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/other.png' },
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
                <button onClick={() => window.open('https://link.coupang.com/a/ee5GOI', '_blank')} className="flex-1 w-full py-4 bg-[#FF0080] border-4 border-[#111827] rounded-[1.5rem] shadow-[4px_4px_0px_#111827] text-white font-['Black_Han_Sans'] text-xl hover:translate-x-[2px] hover:translate-y-[2px] rotate-[1deg]">🚀 로켓 주문</button>
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
              let typography = `text-[11px] sm:text-xl ${isRoot ? s.font : 'font-["Black_Han_Sans"]'} text-[#111827] bg-white px-1 sm:px-2 py-0.5 border-2 sm:border-4 border-[#111827] shadow-[2px_2px_0px_#E23B2A] -rotate-3 inline-block leading-tight break-keep`;

              if (isCenter) {
                  containerClass = isRoot ? "bg-[#E23B2A] border-[4px] border-[#111827] shadow-[5px_5px_0px_#111827]" : "bg-white border-[4px] border-[#111827] shadow-[5px_5px_0px_#111827]";
                  typography = isRoot ? "text-xl sm:text-5xl font-['Black_Han_Sans'] text-white drop-shadow-[2px_2px_0px_#111827]" : "text-base sm:text-3xl font-['Black_Han_Sans'] text-[#E23B2A] drop-shadow-[2px_2px_0px_#111827]";
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
