import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function FloatingActions() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('현재 브라우저 옵션 (메뉴 ➔ 홈 화면에 추가)을 이용해 설치해주세요!');
    }
  };

  const handleKakaoShare = () => {
    const { Kakao } = window;
    if (Kakao && Kakao.isInitialized()) {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '오늘 뭐 먹지 고민될 땐?',
          description: '당신의 메뉴 원픽을 룰렛으로 정해보세요!',
          imageUrl: 'https://raw.githubusercontent.com/junghwan1291/food-app-new/main/public/images/category1/korean.png',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '메뉴 고르러 가기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert('카카오톡 공유 기능을 초기화할 수 없습니다.');
    }
  };

  const isHome = location.pathname === '/';

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 flex flex-col gap-3 z-50">
      {/* Install Button - Only on Home */}
      {isHome && (
        <button
          onClick={handleInstallClick}
          className="h-14 px-5 bg-[#111827] rounded-full shadow-[3px_3px_0px_#E23B2A] flex items-center justify-center hover:-translate-y-1 transition-transform border-2 border-white gap-2"
          title="홈 화면에 추가"
        >
          <span className="text-[1.6rem] leading-none mb-1">📱</span>
          <span className="text-white font-['Black_Han_Sans'] text-lg tracking-wide whitespace-nowrap">앱 설치</span>
        </button>
      )}

      {/* Kakao Share - Everywhere */}
      <button
        onClick={handleKakaoShare}
        className="h-14 px-5 bg-[#FEE500] rounded-full shadow-[3px_3px_0px_#111827] flex items-center justify-center hover:-translate-y-1 transition-transform border-2 border-[#111827] gap-2"
        title="카카오톡 공유하기"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 3C6.477 3 2 6.545 2 10.916c0 2.84 1.83 5.318 4.633 6.72-.18.665-.63 2.37-.65 2.454-.035.152.053.148.113.11 0 0 2.721-1.787 3.86-2.585.66.07 1.345.105 2.044.105 5.523 0 10-3.546 10-7.917C22 6.545 17.523 3 12 3z" fill="#000000"/>
        </svg>
        <span className="text-[#111827] font-['Black_Han_Sans'] text-lg tracking-wide whitespace-nowrap">공유</span>
      </button>
    </div>
  );
}
