import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MEAL_KITS, HOT_SPOTS, LANDING_MEAL_KITS } from '../data/partnersData';
import { FOOD_DETAILS, DEFAULT_FOOD_DETAIL } from '../data/foodDetailsData';

// --- ?곗씠?곕쿋?댁뒪 ---

const rootCategories: string[] = ['?쒖떇', '以묒떇', '?쇱떇', '?묒떇', '?ㅻ뒛 萸?癒뱀??', '遺꾩떇/?쇱떇', '?⑥뒪?명뫖??, '?붿???, '湲고?'];

const subCategories: Record<string, string[]> = {
  '?쒖떇': ['李뚭컻/?꾧낏', '援?갈/??, '援ъ씠/蹂띠쓬', '李?議곕┝', '?ㅻ줈媛湲?, '?앹꽑/?대Ъ', '鍮꾨퉼諛?二?, '援?닔/?됰㈃', '湲고? ?쒖떇/?꾩떆??],
  '以묒떇': ['吏쒖옣/吏щ퐬', '?뺤닔???源', '留덈씪/蹂띠쓬?붾━', '諛λ쪟(蹂띠쓬諛???', '?ㅻ줈媛湲?, '留뚮몢/?ㅼ꽟', '?됰㈃/肄⑷뎅??, '?쇳뭹?붾━(?묒옣????', '?명듃硫붾돱'],
  '?쇱떇': ['珥덈갈(?ㅼ떆)', '?덇퉴??, '?쇰찘/?뚮컮', '??갈(?덈?由?', '?ㅻ줈媛湲?, '?곕룞/?섎쿋', '移대젅', '?먮룞(?源??갈)', '???댁궛臾?],
  '?묒떇': ['?뚯뒪?', '?ㅽ뀒?댄겕', '由ъ“???꾨씪??, '?쇱옄', '?ㅻ줈媛湲?, '?먮윭???ъ?', '?ㅻ??쇱씠??, '?섑봽/釉뚮윴移?, '?ъ씠??媛const menusBySubCategory: Record<string, string[]> = {
  // ?쒖떇
  '李뚭컻/?꾧낏': ['?쇱?源移섏컡媛?, '?쒖옣李뚭컻', '遺?李뚭컻', '?쒕몢遺李뚭컻', '泥?뎅??, '?숉깭李뚭컻', '?뚭낢李쎌쟾怨?, '留뚮몢?꾧낏'],
  '援?갈/??: ['?쒕?援?갈', '?쇱?援?갈', '堉덊빐?κ뎅', '?ㅻ쟻??, '?섏＜怨고깢', '瑗щ━怨고깢', '?뺢컝鍮꾪깢', '肄⑸굹臾쇨뎅諛?, '?⑺깭?댁옣援?, '異붿뼱??, '?쇨퀎??, '?↔컻??, '媛먯옄??],
  '援ъ씠/蹂띠쓬': ['?쒖쑁蹂띠쓬', '??컝鍮?, '遺덇퀬湲?, '?숈?蹂띠쓬', '彛덇씀誘몃낭??, '?쇨껸?닿뎄??, '?쇱??묐뀗媛덈퉬', '李⑤룎諛뺤씠援ъ씠', '?ㅻ━援ъ씠', '?붾뜒援ъ씠'],
  '李?議곕┝': ['?쇱?媛덈퉬李?, '?뚭컝鍮꾩컻', '臾듭?吏?깃컝鍮꾩컻', '?덈룞李쒕떗', '??낭?뚰깢', '媛덉튂議곕┝', '肄붾떎由ъ“由?, '媛꾩옣寃뚯옣', '?먮?議곕┝'],
  '?앹꽑/?대Ъ': ['怨좊벑?닿뎄??, '?쇱튂援ъ씠', '議곌린援ъ씠', '?대Ъ李?, '?꾧뎄李?, '苑껉쾶??, '?고룷??, '?ㅼ쭠?댁닕??, '?뺤깉?곌뎄??, '媛덉튂議곕┝', '肄붾떎由ъ“由?],
  '鍮꾨퉼諛?二?: ['鍮꾨퉼諛?, '?뚯넡鍮꾨퉼諛?, '?≫쉶鍮꾨퉼諛?, '?숈?鍮꾨퉼諛?, '?곗콈鍮꾨퉼諛?, '?꾨났二?, '?뚭퀬湲곗＝', '?⑦샇諛뺤＝', '?μ＝', '?묒엫?먯＝'],
  '援?닔/?됰㈃': ['臾쇰깋硫?, '鍮꾨퉼?됰㈃', '?됱뼇?됰㈃', '留됯뎅??, '?붿튂援?닔', '諛붿??쎌뭡援?닔', '??뭡援?닔', '?섏젣鍮?, '怨좉린援?닔', '肄⑷뎅??, '鍮꾨퉼援?닔'],
  '湲고? ?쒖떇/?꾩떆??: ['?쒖젙??, '?덈갈?뺤떇', '蹂대━諛μ젙??, '?↔컝鍮꾩젙??, '?꾩떆??, '援ъ젅??, '?좎꽑濡?, '?곗옂諛?],

  // 以묒떇
  '吏쒖옣/吏щ퐬': ['吏쒖옣硫?, '媛꾩쭨??, '?곷컲吏쒖옣', '吏щ퐬', '?대Ъ吏щ퐬', '李⑤룎諛뺤씠吏щ퐬', '諛깆㎚戮?, '蹂띠쓬吏щ퐬', '吏ъ쭨硫?],
  '?뺤닔???源': ['?뺤닔??, '轅붾컮濡쒖슦', '源먰뭾湲?, '?좊┛湲?, '?щ┝?덉슦', '移좊━?덉슦', '硫섎낫??, '?덉슦?源'],
  '留덈씪/蹂띠쓬?붾━': ['留덈씪??, '留덈씪?밴텋', '?좉텋', '怨좎텛?≪콈', '留덊뙆?먮?', '?붾낫梨?, '?좎궛??, '?댄뼢媛吏'],
  '諛λ쪟(蹂띠쓬諛???': ['怨꾨?蹂띠쓬諛?, '?덉슦蹂띠쓬諛?, '寃뚯궡蹂띠쓬諛?, '?≪콈諛?, '怨좎텛?≪콈諛?, '吏쒖옣諛?, '吏щ퐬諛?, '留덊뙆?먮?諛?],
  '留뚮몢/?ㅼ꽟': ['援곕쭔??, '臾쇰쭔??, '李먮쭔??, '?뺣쭔??, '?ㅼ삤濡깅컮??, '?섍???, '?쇰쭏??, '?덉슦?ㅼ꽟', '異섍텒'],
  '?됰㈃/肄⑷뎅??: ['以묓솕?됰㈃', '?대Ъ?됰㈃', '臾쇰?硫?, '鍮꾨퉼諛硫?, '?됱㎚戮?],
  '?쇳뭹?붾━(?묒옣????': ['?묒옣??, '?꾧?蹂?, '?ㅽ뼢?μ쑁', '?숉뙆??, '?쒖옄?꾩뒪', '踰좎씠吏뺣뜒', '?댄뙆由щ깋梨?, '遺덈룄??],
  '?명듃硫붾돱': ['吏쒖옣+吏щ퐬 ?명듃', '吏щ퐬+?뺤닔???명듃', '留덈씪 肄붿뒪', '蹂띠쓬諛??명듃', '媛議?肄붿뒪', '?꾨━誘몄뾼 肄붿뒪'],

  // ?쇱떇
  '珥덈갈(?ㅼ떆)': ['紐⑤벉珥덈갈', '?곗뼱珥덈갈', '愿묒뼱珥덈갈', '?덉슦珥덈갈', '?μ뼱珥덈갈', '李몄튂珥덈갈', '?뚭퀬湲곗큹諛?, '罹섎━?щ땲?꾨·', '?꾪넗留덈겮', '?좊?珥덈갈'],
  '?덇퉴??: ['?깆떖?덇퉴??, '?덉떖?덇퉴??, '移섏쫰?덇퉴??, '寃쎌뼇?앸룉源뚯뒪', '?앹꽑源뚯뒪', '移섑궓移댁툩', '硫섏튂移댁툩'],
  '?쇰찘/?뚮컮': ['?덉퐫痢좊씪硫?, '誘몄냼?쇰찘', '?쇱쑀?쇰찘', '?쒖삤?쇰찘', '?꾪깂硫?, '?꾨??쇱냼諛?, '?됰え諛', '?됱슦??],
  '??갈(?덈?由?': ['媛痢좊룞', '?먮퉬??, '洹쒕룞', '?ㅼ빞瑗щ룞', '?ъ???, '?곕굹湲곕룞', '?몃Ⅴ紐щ룞', '?ㅽ뀒?ㅻ룞'],
  '?곕룞/?섎쿋': ['媛?쎌슦??, '?덉슦?源?곕룞', '?대У?곕룞', '移대젅?곕룞', '諛??좊굹踰?, '紐⑥툩?섎쿋', '?ㅽ궎?쇳궎', '?ㅻ툕?ㅻ툕'],
  '移대젅': ['鍮꾪봽移대젅', '?ы겕移대젅', '移섑궓移대젅', '?덉슦移대젅', '?쇱콈移대젅', '?⑤컯移대젅', '?덇퉴?ㅼ뭅??],
  '?먮룞(?源??갈)': ['?덉슦?먮룞', '?μ뼱?먮룞', '?쇱콈?먮룞', '?ㅼ쭠?댄뀗??, '紐⑤벉?먮룞', '媛?쇱븘寃뚮룞'],
  '???댁궛臾?: ['紐⑤벉?ъ떆誘?, '?곗뼱?ъ떆誘?, '愿묒뼱?ъ떆誘?, '李몄튂??, '諛⑹뼱??, '?肄붿??щ퉬', '?⑥깉?고쉶', '?깃쾶???곕땲)'],

  // ?묒떇
  '?뚯뒪?': ['源뚮Ⅴ蹂대굹??, '?뚮━?ㅼ삱由ъ삤', '?좊쭏?좏뙆?ㅽ?', '蹂쇰줈?ㅼ젣', '濡쒖젣?뚯뒪?', '遊됯낏??, '?ъ?諛뷀뙆?ㅽ?', '?몃윭?뚰겕由쇳뙆?ㅽ?', '紐낅??뚯뒪?', '諛붿쭏?섏뒪?좏뙆?ㅽ?'],
  '?ㅽ뀒?댄겕': ['?덉떖?ㅽ뀒?댄겕', '?깆떖?ㅽ뀒?댄겕', '梨꾨걹?ㅽ뀒?댄겕', '?곕낯?ㅽ뀒?댄겕', '?좊쭏?명겕?ㅽ뀒?댄겕', '?⑤컯?ㅽ뀒?댄겕', '李뱀뒪?뚯씠??, '?댁튂?댁뒪?뚯씠??],
  '由ъ“???꾨씪??: ['?몃윭?뚮━議곕삉', '?댁궛臾쇰━議곕삉', '?щ┝由ъ“??, '?ㅼ쭠?대㉨臾쇰━議곕삉', '濡쒖젣由ъ“??, '?덉슦?꾨씪??, '移섑궓?꾨씪??],
  '?쇱옄': ['留덈Ⅴ寃뚮━??, '怨좊Ⅴ怨ㅼ「??, '?섑띁濡쒕땲', '肄ㅻ퉬?ㅼ씠??, '遺덇퀬湲고뵾??, '?섏??댁븞', '怨좉뎄留덊뵾??, '?쒖뭅怨좏뵾??],
  '?먮윭???ъ?': ['由ъ퐫?移섏쫰?먮윭??, '?곗뼱?먮윭??, '????댁궡?먮윭??, '移댄봽?덉젣', '?쒖??먮윭??, '?곗뼱?ъ?', '李몄튂?ъ?', '鍮꾪봽?ъ?'],
  '?ㅻ??쇱씠??: ['?꾪넻?ㅻ??쇱씠??, '?곕?湲?쇱뒪?ㅻ??쇱씠??, '?좊꽕?대룄?ㅻ??쇱씠??, '?щ┝?ㅻ??쇱씠??, '源移섏삤誘?쇱씠??, '?덇퉴?ㅼ삤誘?쇱씠??],
  '?섑봽/釉뚮윴移?: ['?묒넚?댁뒪??, '肄섏뒪??, '?⑦샇諛뺤뒪??, '?대옩李⑥슦??, '?먭렇踰좊꽕?뺥듃', '?ъ??댄겕', '?꾨젋移섑넗?ㅽ듃', '?꾩궗?대낵'],
  '?ъ씠??媛먯옄?源 ??': ['?꾨젋移섑봽?쇱씠', '移섏쫰?ㅽ떛', '?대땲?몃쭅', '踰꾪뙏濡쒖쐷', '留덈뒛鍮?, '?섏큹', '移섏쫰蹂?],

  // 遺꾩떇/?쇱떇
  '?〓낭??: ['?〓낭??, '援?Ъ?〓낭??, '濡쒖젣?〓낭??, '吏쒖옣?〓낭??, '留덈씪?〓낭??, '利됱꽍?〓낭??, '?쇰낭??, '源뚮Ⅴ蹂대굹?쇰뼞蹂띠씠'],
  '?源/?쒕?': ['紐⑤벉?源', '源留먯씠', '?ㅼ쭠?댄?源', '?덉슦?源', '怨좉뎄留덊?源', '李곗닚?', '?쒕?蹂띠쓬'],
  '源諛?: ['?먯“源諛?, '李몄튂源諛?, '移섏쫰源諛?, '?덇퉴?ㅺ?諛?, '?덉슦?源源諛?, '異⑸Т源諛?, '?ㅽ넗源諛?],
  '?쇰㈃/?곕룞': ['?쇰㈃', '移섏쫰?쇰㈃', '?대Ъ?쇰㈃', '?〓씪硫?, '媛?쎌슦??, '已꾨㈃', '?대У??],
  '??컻/?ㅻ룎堉?: ['援?Ъ??컻', '臾대펷??컻', '?듬펷??컻', '吏곹솕??컻', '?ㅻ룎堉덈낭??, '移섏쫰遺덈떗'],
  '怨깆갹/留됱갹': ['?쇱콈怨깆갹', '?뚭낢李?, '?뚭낢李쎄뎄??, '?쇱?留됱갹援ъ씠', '?李쎄뎄??, '?뱀뼇援ъ씠', '怨깆갹?꾧낏'],
  '??遺移④컻': ['?대Ъ?뚯쟾', '源移섏쟾', '?ㅼ쭠?대?異붿쟾', '媛먯옄??, '?밸몢??, '?뚭퀬湲곗쑁??, '?숉깭??, '?몃컯??],
  '?꾧뎄李??대Ъ李?: ['?꾧뎄李?, '?대Ъ李?, '苑껉쾶李?, '?꾧뎄??, '?대Ъ??],

  // ?⑥뒪?명뫖??  '移섑궓(?꾨씪?대뱶)': ['?꾨씪?대뱶移섑궓', '?쒖궡移섑궓', '?쏅궇?듬떗', '??컯??, '?뚮떗', '?숇큺', '媛꾩옣留덈뒛移섑궓'],
  '移섑궓(?묐뀗)': ['?묐뀗移섑궓', '留ㅼ슫?묐뀗移섑궓', '媛꾩옣移섑궓', '肉뚮쭅?댁튂??, '留덈뒛媛꾩옣移섑궓', '怨좎텛留덉슂移섑궓'],
  '移섑궓(援ъ씠)': ['濡쒖뒪?몄튂??, '諛붾쿋?먯튂??, '??텋援ъ씠移섑궓', '?뚭툑援ъ씠移섑궓', '?곕━?쇰겮移섑궓'],
  '?꾨쾭嫄??명듃': ['鍮낅㎘?명듃', '??쇱꽭??, '遺덇퀬湲곕쾭嫄곗꽭??, '?몄씠踰꾧굅?명듃', '移섏쫰踰꾧굅?명듃', '?덉슦踰꾧굅?명듃', '移섑궓踰꾧굅?명듃'],
  '?섏젣踰꾧굅': ['踰좎씠而⑥튂利덈쾭嫄?, '?몃윭?뚮쾭嫄?, '?붾툝?⑦떚踰꾧굅', '?덉슦踰꾧굅', '?꾨낫移대룄踰꾧굅', '移섏쫰??룷踰꾧굅', '?ㅽ뙆?댁떆移섑궓踰꾧굅'],
  '?뚮뱶?꾩튂/?좎뒪??: ['?먭렇?좎뒪??, '?꾩튂利덊넗?ㅽ듃', '?대읇?뚮뱶?꾩튂', 'BLT?뚮뱶?꾩튂', '?곗뼱?뚮뱶?꾩튂', '?먭렇留덉슂?뚮뱶?꾩튂', '移섑궓?뚮뱶?꾩튂'],
  '?ル룄洹?: ['?ル룄洹?, '媛먯옄?ル룄洹?, '移섏쫰?ル룄洹?, '?뚯떆吏?ル룄洹?, '?ㅼ쭠?대㉨臾쇳빂?꾧렇'],
  '?肄?釉뚮━??: ['鍮꾪봽?肄?, '移섑궓?肄?, '移섑궓釉뚮━??, '鍮꾪봽釉뚮━??, '?섏궗?붿븘', '?섏큹', '?뚰엳?'],

  // ?붿???  '而ㅽ뵾': ['?꾨찓由ъ뭅??, '?먯뒪?꾨젅??, '肄쒕뱶釉뚮（', '?붿뭅?섏씤', '?쒕┰而ㅽ뵾', '?꾩씤?덊럹??],
  '?쇱빱???쇰뼹': ['移댄럹?쇰뼹', '諛붾땺?쇰씪??, '移대씪硫쒕쭏?쇱븘??, '移댄럹紐⑥뭅', '?뱀감?쇰뼹', '珥덉퐫?쇰뼹', '?묐떦踰꾨툝??],
  '?먯씠??二쇱뒪': ['?먮そ?먯씠??, '?덈が?먯씠??, '泥?룷?꾩뿉?대뱶', '?멸린二쇱뒪', '?ㅼ쐞二쇱뒪', '?ㅻ젋吏二쇱뒪', '留앷퀬?ㅻТ??, '釉붾（踰좊━?ㅻТ??],
  '耳?댄겕/?瑜댄듃': ['移섏쫰耳?댄겕', '珥덉퐫耳?댄겕', '?곕씪誘몄닔', '?앺겕由쇱??댄겕', '?멸린耳?댄겕', '?먭렇?瑜댄듃', '?몃몢?瑜댄듃', '?덈뱶踰⑤껙耳?댄겕'],
  '踰좎씠而ㅻ━/鍮?: ['?뚭툑鍮?, '?щ（?꾩긽', '踰좎씠湲', '?숇쾭??, '移섏쫰?ㅼ퐯', '?앸뭇', '留덈뒛鍮?, '源뚮닃??],
  '????щ줈??: ['?щ줈??, '由ъ뿉二쇱???, '?ъ???, '?꾪뀛?쇱???, '?멸린?쇱???, '?앺겕由쇱???],
  '鍮숈닔': ['?몄젅誘몃튃??, '?λ튃??, '留앷퀬鍮숈닔', '?멸린鍮숈닔', '?뱀감鍮숈닔', '硫붾줎鍮숈닔', '?ㅻ젅?ㅻ튃??],
  '?붽굅???꾩씠?ㅽ겕由?: ['洹몃┃?붽굅??, '?붽굅?몄븘?댁뒪?щ┝', '諛붾땺?쇱븘?댁뒪?щ┝', '珥덉퐫?꾩씠?ㅽ겕由?, '?ㅻ씪??, '?뚰봽?몄븘?댁뒪?щ┝'],

  // 湲고?
  '?援?닔(踰좏듃??': ['?뚭퀬湲곗?援?닔', '李⑤룎諛뺤씠?援?닔', '?대Ъ?援?닔', '遺꾩쭨', '諛섎?', '?ㅽ봽留곷·', '?붾궓??],
  '?좎뼇轅??쒓뎅)': ['?좎뼇轅?, '?좎뭅媛??, '?쒕?', '肉뚰뙚?곸빱由?, '?뚯슫??, '紐⑤떇湲濡쒕━蹂띠쓬'],
  '?잜???: ['?덉슦?잜???, '移섑궓?잜???, '?잛뵪??, '?섏떆怨좊옲', '誘멸퀬??],
  '移대젅(?몃룄)': ['踰꾪꽣移섑궓而ㅻ━', '?붾씫?뚮땲瑜?, '移섑궓?곗뭅留덉궡??, '??, '?꾨몢由ъ튂??, '?쇱뵪', '?щえ??],
  '耳諛?: ['移섑궓耳諛?, '?묎퀬湲곗?諛?, '誘뱀뒪耳諛?, '耳諛λ옪', '諛뷀겢?쇰컮', '?쇰뜲'],
  '?꾩떆???몄쓽?먰삎)': ['?쒖쑁?꾩떆??, '?덇퉴?ㅻ룄?쒕씫', '移섑궓留덉슂??갈', '鍮꾨퉼諛λ룄?쒕씫', '?ㅽ뙵留덉슂?꾩떆??, '?뚮텋怨좉린?꾩떆??],
  '諛?ㅽ듃 ?명듃': ['媛먮컮?ㅼ븣?꾪엳??, '諛??좊굹踰?, '?곗궪寃밸뼞蹂띠씠', '?ㅽ뀒?댄겕諛?ㅽ듃', '遺?李뚭컻諛?ㅽ듃', '留덈씪?밴텋諛?ㅽ듃'],
  '梨꾩떇/鍮꾧굔': ['鍮꾧굔踰꾧굅', '?ъ같?뚯떇', '肄⑷퀬湲곌뎄??, '鍮꾧굔留뚮몢', '鍮꾧굔?뚯뒪?', '?먮??ㅽ뀒?댄겕', '?⑦샇諛뺢뎄??],
};??, '移섑궓?쒖? ?먮윭??, '?⑦샇諛??먮윭??, '?앹뿰???ъ?', '李몄튂 ?ъ?', '洹몃┫?쒕퉬???ъ?', '?щ┝???먮윭??],
  '?ㅻ??쇱씠??: ['異붿뼲???꾪넻?ㅻ??쇱씠??, '吏꾪븳 ?곕?湲?쇱뒪?ㅻ??쇱씠??, '?뚯삤由??좊꽕?대룄?ㅻ??쇱씠??, '遺?쒕윭???щ┝?뚯뒪?ㅻ??쇱씠??, '留ㅼ숴 源移섏삤誘?쇱씠??, '?덇퉴???ㅻ??쇱씠??, '?뚯떆吏 ?ㅻ??쇱씠??],
  '?섑봽/釉뚮윴移?: ['吏꾪븳 ?묒넚?댁뒪??, '?ъ숴 肄섏뒪??, '?⑦샇諛뺤뒪??, '議곌컻 ?대옩李⑥슦??, '釉뚮윴移??먭렇踰좊꽕?뺥듃', '硫붿씠???ъ??댄겕', '??떊 ?꾨젋移섑넗?ㅽ듃', '?됯?由ъ떆 釉붾옓?쇱뒪??, '?꾩궗?대낵', '?щ줈?щТ??],
  '?ъ씠??媛먯옄?源 ??': ['諛붿궘 ?꾨젋移섑봽?쇱씠', '耳?댁? ?⑥?媛먯옄', '紐⑥쭨?먮씪 移섏쫰?ㅽ떛', '?대땲?몃쭅', '留ㅼ숴 踰꾪뙏濡쒖쐷', '留덈뒛鍮?媛덈┃諛붽쾶??', '?곹겮 肄섏깘?щ뱶', '?댁돩釉뚮씪??, '?섏큹移섏쫰', '移섏쫰蹂?],

  // 遺꾩떇/?쇱떇
  '?〓낭??: ['留ㅼ숴?ъ숴 諛곕떖?〓낭??, '袁몃뜒 援?Ъ?〓낭??, '?멸린??컻 濡쒖젣?〓낭??, '吏쒖옣?〓낭??, '?쇱뼹??留덈씪?〓낭??, '移섏쫰??깂 ?〓낭??, '已??媛?섎뼞?〓낭??, '?щ━?щ퓤 利됱꽍?〓낭??, '?쇰낭??, '源뚮Ⅴ蹂대굹???〓낭??, '?쏅궇 ?숆탳???〓낭??],
  '?源/?쒕?': ['諛붿궘諛붿궘 紐⑤벉?源', '?밸㈃媛??源留먯씠', '????ㅼ쭠?댄?源', '?뺤깉?고?源', '?ъ숴 怨좉뎄留덊?源', '?쇰겮留뚮몢', '已꾧퉫 李곗닚?', '?댁옣?ы븿 ?쏅궇?쒕?', '留ㅼ숴?ъ숴 ?쒕?蹂띠쓬', '諛깆닚?蹂띠쓬'],
  '源諛?: ['苑됱갔 ?먯“源諛?, '留덉슂?щ퓤 李몄튂源諛?, '紐⑥쭨?먮씪 移섏쫰源諛?, '諛붿궘 ?덇퉴?ㅺ?諛?, '?듭깉?고?源源諛?, '留ㅼ숴 硫몄튂異붾븸源諛?, '?ㅼ씠?댄듃 怨꾨?吏?④?諛??ㅽ넗)', '?듭쁺 異⑸Т源諛?, '臾듭?吏李몄튂源諛?, '瑗щ쭏源諛?],
  '?쇰㈃/?곕룞': ['怨꾨????좊씪硫?, '怨좎냼??移섏쫰?쇰㈃', '臾쇰쭔?먮씪硫?, '?대Ъ ?щ퓤?쇰㈃', '已꾧퉫 ?〓씪硫?, '源泥쐓t 媛?쎌슦??, '留ㅼ숴?덉숴 已꾨㈃', '鍮꾨퉼留뚮몢', '?붿튂援?닔', '?대У??],
  '??컻/?ㅻ룎堉?: ['留ㅼ슫 援?Ъ??컻', '??텋 臾대펷??컻', '肄쒕씪寃??듬펷??컻', '??텋 吏곹솕??컻', '?ㅻ룆?ㅻ룆 ?ㅻ룎堉덈낭??, '源媛猷?二쇰㉨諛?, '?ъ뒳?ъ뒳 怨꾨?李?, '移섏쫰遺덈떗'],
  '怨깆갹/留됱갹': ['?밸㈃媛???쇱콈怨깆갹', '留덈뒛?щ퓤 ?뚭낢李?, '李곗닚? 怨깆갹蹂띠쓬', '吏湲吏湲 ?뚭낢李쎄뎄??, '怨좎냼???쇱?留됱갹援ъ씠', '留ㅼ슫 遺덈쭑李?, '?李쎄뎄??, '?뱀뼇援ъ씠', '怨깆갹?꾧낏', '?쇳넻援ъ씠'],
  '??遺移④컻': ['諛붿궘 ?대Ъ?뚯쟾', '留ㅼ숴 源移섏쟾', '?ㅼ쭠??遺異붿쟾', '已??諛붿궘 媛먯옄??, '?먰댘 ?밸몢??, '紐낆젅 紐⑤벉??, '怨좎냼???뚭퀬湲곗쑁??, '?숉깭??, '源살옂??, '?몃컯??],
  '?꾧뎄李??대Ъ李?: ['留ㅼ숴 肄⑸굹臾쇱븘援ъ컻', '?몄쭚 ?대Ъ李?, '怨좎냼???뚯컻', '?援щ퐟李?, '苑껉쾶李?, '?꾧뎄??, '?대Ъ??, '?숈?蹂띠쓬', '?숉깭??],

  // ?⑥뒪?명뫖??  '移섑궓(?꾨씪?대뱶)': ['諛붿궘 ?⑷툑?щ━釉?移섑궓', '?щ━?ㅽ뵾 移섑궓', '異붿뼲???쏅궇?듬떗', '?쒖궡 ?꾨씪?대뱶', '?ъ숴 諛붿궘 ??컯??, '?뚯떥???뚮떗', '?숇큺 肄ㅻ낫', '?ロ썑?쇱씠??, '媛꾩옣留덈뒛 移섑궓'],
  '移섑궓(?묐뀗)': ['?꾪넻 ?묐뀗移섑궓', '?덈Ъ李붾걫 留ㅼ슫?묐뀗移섑궓', '?⑥쭬 媛꾩옣移섑궓', '?뚯떥 留덈뒛媛꾩옣移섑궓', '?⑥쭬 留덈쾿肉뚮쭅??移섑궓', '遺?쒕윭???덊봽由쇱뼇?먯튂??, '怨좎텛留덉슂 移섑궓', '移섏쫰蹂?異붽?'],
  '移섑궓(援ъ씠)': ['?ㅻ툙援ъ씠 濡쒖뒪?몄튂??, '留ㅼ숴 諛붾쿋?먯튂??, '??텋?묐뀗援ъ씠', '?대갚???뚭툑援ъ씠', '媛덈┃ 濡쒖뒪?몄튂??, '?쒖궡 諛붾쿋??, '?곕━?쇰겮 ?ㅻ툙援ъ씠'],
  '?꾨쾭嫄??명듃': ['?대옒??鍮낅㎘ ?명듃', '吏곹솕 遺덈쭧 ????명듃', '?ъ숴 遺덇퀬湲곕쾭嫄??명듃', '媛?깅퉬 ?몄씠踰꾧굅 ?명듃', '移섏쫰踰꾧굅 ?명듃', '?깃? ?덉슦踰꾧굅 ?명듃', '?몄쭚 ??뚮쾭嫄??명듃', '移섑궓踰꾧굅 ?명듃', '紐⑥쭨?먮씪?몃뜑踰꾧굅 ?명듃'],
  '?섏젣踰꾧굅': ['踰좎씠而⑥튂利?踰꾧굅', '?몃윭??癒몄돩猷?踰꾧굅', '?≪쬂???붾툝?⑦떚 踰꾧굅', '?덉슦?듭궡 踰꾧굅', '?꾨낫移대룄 踰꾧굅', '諛붿궘 ?댁돩釉뚮씪??踰꾧굅', '移섏쫰??룷 ?섏젣踰꾧굅', '?ㅽ뙆?댁떆 移섑궓踰꾧굅'],
  '?뚮뱶?꾩튂/?좎뒪??: ['?ъ숴 ?먭렇?좎뒪??, '踰꾪꽣援ъ씠 ?꾩튂利덊넗?ㅽ듃', '異붿뼲??湲멸굅由ы넗?ㅽ듃', '?좊뱺???대읇?뚮뱶?꾩튂', '踰좎씠而?BLT?뚮뱶?꾩튂', '?덉젣 ?곗뼱?뚮뱶?꾩튂', '遺?쒕윭???먭렇留덉슂?뚮뱶?꾩튂', '移섑궓?먮뜑 ?뚮뱶?꾩튂', '移댁빞?좎뒪??],
  '?ル룄洹?: ['諛붿궘 紐낅옉?ル룄洹?, '?꾧묠鍮?諛⑸쭩??媛먯옄?ル룄洹?, '彛??섏뼱?섎뒗 紐⑥쭨?먮씪移섏쫰?ル룄洹?, '?ㅼ쭠?대㉨臾쇳빂?꾧렇', '?≪쬂?≫뙜 ?뚯떆吏?ル룄洹?, '泥대떎移섏쫰 ?ル룄洹?, '?쇰㈃?ㅻ궢 ?ル룄洹?],
  '?肄?釉뚮━??: ['?뺥넻 鍮꾪봽?肄?, '?ㅽ뙆?댁떆 ?ы겕?肄?, '移섑궓 釉뚮━??, '鍮꾪봽 釉뚮━??, '移섏쫰?щ퓤 ?섏궗?붿븘', '怨쇱뭅紐곕━? ?섏큹', '?먮씈???뚰엳? ?뚮옒??, '?붿튌?쇰떎', '遺由щ삉蹂?],

  // ?붿???  '而ㅽ뵾': ['源붾걫???꾨찓由ъ뭅??, '?ъ숴 ?ㅼ씠利먮꽋 ?꾨찓由ъ뭅??, '遺?쒕윭??肄쒕뱶釉뚮（', '諛ㅼ뿉???붿뭅?섏씤 ?꾨찓由ъ뭅??, '吏꾪븳 ?먯뒪?꾨젅??, '?쒕┰ 而ㅽ뵾', '?꾩씤?덊럹??],
  '?쇱빱???쇰뼹': ['怨좎냼??移댄럹?쇰뼹', '?ъ숴 諛붾땺?쇰씪??, '移대씪硫?留덈겮?꾨삉', '?ъ숴?됱? 移댄럹紐⑥뭅', '?쒖＜ ?뱀감?쇰뼹', '由ъ뼹 珥덉퐫?쇰뼹', '濡쒖뿴 諛?ы떚', '?먯깋 怨좉뎄留덈씪??, '?묐떦 踰꾨툝??, '留먯감?쇰뼹'],
  '?먯씠??二쇱뒪': ['?곹겮 ?먮そ?먯씠??, '泥?웾 ?덈が?먯씠??, '?ъ숴 泥?룷?꾩뿉?대뱶', '?앷낵???멸린諛붾굹?섏＜??, '?덉숴 ?ㅼ쐞二쇱뒪', '嫄닿컯 ?좊쭏?좎＜??, '100% 李⑹쬂 ?ㅻ젋吏二쇱뒪', '?쒖썝???먮몢?ㅻТ??, '留앷퀬?ㅻТ??, '釉붾（踰좊━?ㅻТ??],
  '耳?댄겕/?瑜댄듃': ['吏꾪븳 ?댁슃 移섏쫰耳?댄겕', '袁몃뜒 珥덉퐫耳?댄겕', '?댁궡?밸뒗 ?곕씪誘몄닔', '怨쇱씪 ?щ퓤 ?앺겕由쇱??댄겕', '?곹겮 ?멸린耳?댄겕', '寃됰컮?띿큺 ?먭렇?瑜댄듃', '怨좎냼???몃몢?瑜댄듃', '?곹겮 怨쇱씪?瑜댄듃', '?덈뱶踰⑤껙 耳?댄겕', '?밴렐 耳?댄겕'],
  '踰좎씠而ㅻ━/鍮?: ['踰꾪꽣?숆뎬 ?뚭툑鍮?, '寃곗씠?댁븘?덈뒗 ?щ（?꾩긽', '?뚮젅??踰좎씠湲', '?ъ숴怨좎냼 ?숇쾭??, '移섏쫰 ?ㅼ퐯', '?곗쑀 ?앸뭇', '珥됱큺 留덈뒛鍮?, '嫄닿컯???몃?鍮?, '?ъ숴 紐⑥뭅鍮?, '源뚮닃??, '留덈뱾??],
  '????щ줈??: ['諛붿궘諛붿궘 ?щ줈??, '?꾩씠?ㅽ겕由??뱀? ?щ줈??, '由ъ뿉二?踰④린?????, '?ш낵??媛???ъ???, '?낅쭏???꾪뀛?????, '?멸린?????, '珥덉퐫移????, '?앺겕由???깂 ???],
  '鍮숈닔': ['?덇퐙 ?몄젅誘몃튃??, '?꾪넻 ?λ튃??, '?곹겮 ?좏뵆留앷퀬鍮숈닔', '?앸뵺湲??щ퓤 鍮숈닔', '?ъ숴 硫붾줎鍮숈닔', '?ㅻ젅??珥덉퐫鍮숈닔', '?됱? ?뱀감鍮숈닔', '移섏쫰耳?댄겕 鍮숈닔', '蹂듭댂??鍮숈닔'],
  '?붽굅???꾩씠?ㅽ겕由?: ['袁몃뜒袁몃뜒 洹몃┃?붽굅??, '?곹겮 ?붽굅?몄븘?댁뒪?щ┝', '?대옒??諛붾땺?쇱븘?댁뒪?щ┝', '吏꾪븳 珥덉퐫?꾩씠?ㅽ겕由?, '?댄깉由ъ븞 已???ㅻ씪??, '?뚮줉?щ줉 援ъ뒳?꾩씠?ㅽ겕由?, '?뚰봽?몄븘?댁뒪?щ┝', '?뚮Ⅴ??],

  // 湲고?
  '?援?닔(踰좏듃??': ['吏꾪븳 ?뚭퀬湲곗?援?닔', '怨좎냼??李⑤룎諛뺤씠?援?닔', '?쒖썝???대Ъ?援?닔', '源붾걫 ?묒??援?닔', '留ㅼ숴 ?쇳겙?援?닔', '?덉숴?ъ숴 遺꾩쭨', '諛붿궘??諛섎? ?뚮뱶?꾩튂', '吏쒖“(?ㅽ봽留곷·)', '?붾궓??],
  '?좎뼇轅??쒓뎅)': ['?덉숴留ㅼ숴 ?좎뼇轅?, '肄붿퐫???좎뭅媛??, '?곹겮 ?뚯슫??, '留ㅼ숴 ?쒕?(?뚰뙆???먮윭??', '肉뚰뙚?곸빱由?, '臾댁뙃', '紐⑤떇湲濡쒕━ 蹂띠쓬'],
  '?잜???: ['?듭깉???잜???, '?대갚??移섑궓 ?잜???, '?볦?硫??잛뵪??, '?몃룄?ㅼ떆???섏떆怨좊옲', '蹂띠쓬硫?誘멸퀬??, '?뚯씤?좏뵆 蹂띠쓬諛?],
  '移대젅(?몃룄)': ['遺?쒕윭??踰꾪꽣移섑궓留덊겕??, '?쒓툑移섏튂利??붾씫?뚮땲瑜?, '留ㅼ숴 移섑궓?곗뭅留덉궡??, '?≪룜???⑤퉰?щ（', '?붾뜒??援ъ슫 ??媛덈┃/踰꾪꽣)', '留ㅼ숴 ?꾨몢由ъ튂??, '?쇱뵪(?붽뎄瑜댄듃 ?뚮즺)', '?щえ??],
  '耳諛?: ['?고궎??移섑궓耳諛?, '?띾?媛???묎퀬湲곗?諛?, '移섑궓+??誘뱀뒪耳諛?, '癒밴린?명븳 耳諛λ옪', '已???고궎?꾩씠?ㅽ겕由?, '諛뷀겢?쇰컮(?고궎 ?붿???', '?쇰뜲(?고궎???쇱옄)'],
  '?꾩떆???몄쓽?먰삎)': ['留ㅼ숴 ?쒖쑁蹂띠쓬?꾩떆??, '?좊뱺???덇퉴?ㅻ룄?쒕씫', '?ъ숴 移섑궓留덉슂??갈', '?쇱콈媛??鍮꾨퉼諛λ룄?쒕씫', '?몄쭚 11李щ룄?쒕씫', '?⑥쭬 ?ㅽ뙵留덉슂?꾩떆??, '?곗뼱?ㅽ뀒?댄겕 ?꾩떆??, '?뚮텋怨좉린 ?꾩떆??],
  '諛?ㅽ듃 ?명듃': ['??몄븞二?媛먮컮?ㅼ븣?꾪엳??諛?ㅽ듃', '援?Ъ?붾━ 諛??좊굹踰?諛?ㅽ듃', '留ㅼ숴 ?곗궪寃밸뼞蹂띠씠 諛?ㅽ듃', '罹좏븨???ㅽ뀒?댄겕 諛?ㅽ듃', '?몄쭚 遺?李뚭컻 諛?ㅽ듃', '媛먯옄??諛?ㅽ듃', '留덈씪?밴텋 諛?ㅽ듃'],
  '梨꾩떇/鍮꾧굔': ['?앸Ъ???泥댁쑁 鍮꾧굔踰꾧굅', '?뺢컝???ъ같?뚯떇 ?뺤떇', '?⑥쭬 肄⑷퀬湲곌뎄??, '怨좉린?녿뒗 鍮꾧굔留뚮몢', '?대갚 鍮꾧굔?뚯뒪?', '?쇱콈留?梨꾩떇移대젅', '?좎꽑諛쒖궗誘?踰꾩꽢?먮윭??, '怨좎냼???먮??ㅽ뀒?댄겕', '?⑦샇諛뺤삤釉먭뎄??]
};

const getListItems = (subCategory: string) => {
   // ?몃? 移댄뀒怨좊━紐낆쓣 ?ㅻ줈 ?ъ슜?섏뿬 ?뺥솗??由ъ뒪?몃? 由ы꽩
   if (menusBySubCategory[subCategory]) {
       return menusBySubCategory[subCategory];
   }
   return [`媛뺣젰異붿쿇 ${subCategory}`, `留ㅼ숴?щ떖 ${subCategory}`, `?④낏?ㅼ씠 李얜뒗 ${subCategory}`, `?붿쬁 ?ロ븳 ${subCategory}`];
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

  // 臾댁옉?꾨줈 ?욊퀬 ?곸쐞 4媛??좏깮
  const shuffled = [...allMenuNames].sort(() => 0.5 - Math.random());
  const selectedMenus = shuffled.slice(0, 4);

  return selectedMenus.map((menuName, idx) => {
    const detail = FOOD_DETAILS[menuName] || DEFAULT_FOOD_DETAIL(menuName);
    // 媛?硫붾돱??泥?踰덉㎏ 諛?ㅽ듃瑜?媛?몄샂 (?놁쑝硫?root??湲곕낯媛??쒖슜)
    return detail.mealKits[0] || { ...MEAL_KITS['root'][0], id: 999 + idx };
  });
};

const rootStyles: Record<string, { bg: string, textObj: string, textShadow: string, font: string, img: string }> = {
  '?쒖떇': { bg: 'bg-[#FF9800]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#D32F2F]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/korean.png' },
  '以묒떇': { bg: 'bg-[#D32F2F]', textObj: 'text-[#FFEB3B]', textShadow: 'drop-shadow-[3px_3px_0px_#000]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/chinese.png' },
  '?쇱떇': { bg: 'bg-[#03A9F4]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#1A237E]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/japanese.png' },
  '?묒떇': { bg: 'bg-[#4CAF50]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#1B5E20]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/western.png' },
  '遺꾩떇/?쇱떇': { bg: 'bg-[#F48FB1]', textObj: 'text-[#D32F2F]', textShadow: 'drop-shadow-[2px_2px_0px_#FFF]', font: 'font-["Black_Han_Sans"] text-sm sm:text-lg', img: '/images/category1/snack.png' },
  '?⑥뒪?명뫖??: { bg: 'bg-[#9C27B0]', textObj: 'text-[#FFEB3B]', textShadow: 'drop-shadow-[3px_3px_0px_#000]', font: 'font-["Black_Han_Sans"] text-sm sm:text-lg', img: '/images/category1/fastfood.png' },
  '?붿???: { bg: 'bg-[#00BCD4]', textObj: 'text-[#FFF]', textShadow: 'drop-shadow-[3px_3px_0px_#E91E63]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/dessert.png' },
  '湲고?': { bg: 'bg-[#FFC107]', textObj: 'text-[#000]', textShadow: 'drop-shadow-[2px_2px_0px_#FFF]', font: 'font-["Black_Han_Sans"]', img: '/images/category1/other.png' },
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
        flatLists = currentSubCats.filter(sub => sub !== '?ㅻ줈媛湲?).flatMap(sub => menusBySubCategory[sub] || []);
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
            <h1 className="text-4xl sm:text-5xl font-['Black_Han_Sans'] text-[#E23B2A] mb-8 drop-shadow-[2px_2px_0px_#111827] text-center -rotate-2 uppercase">{subLayer} 由ъ뒪??</h1>
            <button onClick={() => { setDirection(-1); setSubLayer(null); }} className="w-full bg-[#111827] border-4 border-[#111827] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-['Black_Han_Sans'] text-xl hover:translate-x-[2px] hover:translate-y-[2px] mb-4">移댄뀒怨좊━ ?ㅼ떆 怨좊Ⅴ湲?/button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
               <button onClick={() => window.open(`https://map.naver.com/v5/search/${encodeURIComponent(subLayer)}`, '_blank')} className="bg-[#ccfff5] border-[3px] border-[#111827] rounded-xl py-3 font-['Black_Han_Sans'] text-lg text-[#111827] shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px]">?띂截?洹쇱쿂 ?앸떦 李얘린</button>
               <button onClick={() => navigate('/market')} className="bg-[#FFF9C4] border-[3px] border-[#111827] rounded-xl py-3 font-['Black_Han_Sans'] text-lg text-[#E23B2A] shadow-[3px_3px_0px_#111827] hover:translate-x-[1px] hover:translate-y-[1px]">?썟 諛?ㅽ듃 二쇰Ц</button>
            </div>
            <div className="flex flex-col gap-4">
              {getListItems(subLayer).map((item, idx) => (
                <button key={idx} onClick={() => navigate(`/category/${item}`)} className="group w-full bg-white border-4 border-[#111827] shadow-[4px_4px_0px_#111827] py-4 px-6 rounded-2xl flex items-center justify-between hover:translate-x-[2px] hover:translate-y-[2px]">
                    <span className="font-['Black_Han_Sans'] text-[#111827] text-lg sm:text-3xl">{item}</span>
                    <div className="w-8 h-8 rounded-full bg-[#E23B2A] border-2 border-[#111827] text-white flex items-center justify-center font-bold font-sans flex-shrink-0">??/div>
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
            <h1 className="text-[2.5rem] sm:text-6xl font-['Black_Han_Sans'] text-[#E23B2A] mb-4 drop-shadow-[2px_2px_0px_#111827] rotate-[-2deg] uppercase">{layer === 'root' ? '?ㅻ뒛 萸?癒뱀??' : layer}</h1>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-4 w-full px-2 max-w-[650px] mx-auto">
                <button onClick={handleRandomPick} className="flex-1 w-full py-4 bg-[#CCFF00] border-4 border-[#111827] rounded-[1.5rem] shadow-[4px_4px_0px_#111827] text-[#111827] font-['Black_Han_Sans'] text-xl hover:translate-x-[2px] hover:translate-y-[2px] -rotate-[2deg]">?렡 {layer === 'root' ? '吏꾩쭨 ?꾨Т嫄곕굹' : `${layer} ??醫뗭븘??}</button>
                <button onClick={() => window.open('https://link.coupang.com/a/ee5GOI', '_blank')} className="flex-1 w-full py-4 bg-[#FF0080] border-4 border-[#111827] rounded-[1.5rem] shadow-[4px_4px_0px_#111827] text-white font-['Black_Han_Sans'] text-xl hover:translate-x-[2px] hover:translate-y-[2px] rotate-[1deg]">?? 濡쒖폆 二쇰Ц</button>
            </div>
        </div>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={layer} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="grid grid-cols-3 grid-rows-3 gap-2 sm:gap-6 w-full max-w-[650px] aspect-square relative z-10">
            {currentGridIndex.map((itemName, index) => {
              const isCenter = index === 4;
              const isRoot = layer === 'root';
              const s = rootStyles[itemName] || rootStyles[layer] || { bg: 'bg-[#FFF]', font: 'font-["Black_Han_Sans"] text-sm sm:text-lg', img: '' };
              const category2ImgIndex = index > 4 ? index : index + 1; // 1~8 ?ㅽ궢 泥섎━
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
              if (!isRoot && isCenter) displayLabel = '???ㅻ줈';
              if (displayLabel === '?ㅻ뒛 萸?癒뱀??') displayLabel = '?꾨Т嫄곕굹';

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
                    <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans']">?썟 ???섍???諛?ㅽ듃</h2>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium pb-1 leading-tight">???ъ뒪?낆? 荑좏뙜 ?뚰듃?덉뒪 ?쒕룞???쇳솚?쇰줈 ?섏닔猷뚮? ?쒓났諛쏆뒿?덈떎.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 pb-2 place-items-center">
                    {randomizedMealKits.map((item, idx) => (
                         <div key={`${item.id}-${idx}`} className="relative w-full max-w-[190px] flex flex-col items-center justify-center bg-white border-[3px] border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] px-1 h-[285px] sm:h-[295px]">
                              {layer === 'root' && idx === 0 && <div className="absolute -top-4 -left-2 z-30 bg-[#E23B2A] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-[8deg] whitespace-nowrap animate-pulse">?뵦 HOT ?쒖떇</div>}
                              {layer === 'root' && idx === 1 && <div className="absolute -top-4 -left-2 z-30 bg-[#00E5FF] text-[#111827] font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-3 whitespace-nowrap">?뜙 ?꾩떆??/div>}
                              {layer === 'root' && idx === 2 && <div className="absolute -top-4 -left-2 z-30 bg-[#FF9800] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] -rotate-[5deg] whitespace-nowrap">?뜚 ?묒떇</div>}
                              {layer === 'root' && idx === 3 && <div className="absolute -top-4 -left-2 z-30 bg-[#4CAF50] text-white font-['Black_Han_Sans'] text-[10px] sm:text-xs px-2 py-1 rounded-full border-2 border-[#111827] shadow-[2px_2px_0px_#111827] rotate-2 whitespace-nowrap">??異붿쿇 ?덈ぉ</div>}
                              {item.html && <div className="w-full h-[260px] flex items-center justify-center overflow-hidden rounded-xl bg-white" dangerouslySetInnerHTML={{ __html: item.html }} />}
                         </div>
                    ))}
                  </div>
                </section>

                <section className="bg-[#FFF9C4] border-[4px] border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827]">
                  <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans'] mb-4 text-[#E23B2A]">?뵦 ?붿쬁 ?ロ븳 媛寃?/h2>
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
