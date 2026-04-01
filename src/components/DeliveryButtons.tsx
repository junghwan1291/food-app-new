interface DeliveryButtonsProps {
  keyword?: string; // 키워드가 없으면 메인 홈 스킴으로, 있으면 검색 스킴으로 연결
}

export default function DeliveryButtons({ keyword }: DeliveryButtonsProps) {
  const handleBaemin = () => {
    // 배달의민족 스킴 (검색 또는 메인)
    const url = keyword ? `baemin://search?keyword=${encodeURIComponent(keyword)}` : 'baemin://';
    window.location.href = url;
    
    // Fallback 통지 (스킴 안먹힐때를 대비한 간단한 timeout 처리 가능하지만 여기선 즉시 실행)
    setTimeout(() => {
        // alert('배달의민족 앱이 설치되어있지 않거나 지원하지 않는 기기입니다.');
    }, 1500);
  };

  const handleCoupang = () => {
    // 쿠팡이츠 스킴 (검색 또는 메인)
    const url = keyword ? `coupangeats://search?keyword=${encodeURIComponent(keyword)}` : 'coupangeats://';
    window.location.href = url;
  };

  return (
    <div className="flex sm:hidden flex-row gap-2 w-full mt-6 mb-2 px-2">
      <button 
        onClick={handleBaemin}
        className="flex-1 py-3 bg-[#2AC1BC] text-white font-['Black_Han_Sans'] rounded-xl text-lg shadow-[3px_3px_0px_#111827] border-[3px] border-[#111827] hover:translate-x-[2px] hover:translate-y-[2px]"
      >
        🛵 배달의민족
      </button>
      <button 
        onClick={handleCoupang}
        className="flex-1 py-3 bg-[#00A6E0] text-white font-['Black_Han_Sans'] rounded-xl text-lg shadow-[3px_3px_0px_#111827] border-[3px] border-[#111827] hover:translate-x-[2px] hover:translate-y-[2px]"
      >
        🚀 쿠팡이츠
      </button>
    </div>
  );
}
