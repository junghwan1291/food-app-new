import { useNavigate } from 'react-router-dom';

export default function Market() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1E8D9] font-['Inter',_sans-serif] selection:bg-[#E23B2A] selection:text-white px-4">
       <div className="text-center bg-white border-4 border-[#111827] p-8 shadow-[8px_8px_0px_#FF0080] rounded-[2rem] transform -rotate-2 max-w-lg w-full relative overflow-hidden">
           {/* Retro backdrop element */}
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#CCFF00] rounded-full mix-blend-multiply opacity-50 border-4 border-[#111827] shadow-[2px_2px_0px_#111827]"></div>
           <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#00E5FF] rounded-full mix-blend-multiply opacity-50 border-4 border-[#111827] shadow-[2px_2px_0px_#111827]"></div>

           <h1 className="text-4xl sm:text-5xl font-['Black_Han_Sans'] text-[#E23B2A] mb-4 relative z-10 drop-shadow-[2px_2px_0px_#111827]">
              🛒 마트 식재료 장보기 
           </h1>
           <p className="font-bold text-gray-700 mb-8 whitespace-pre-wrap break-keep text-lg sm:text-xl relative z-10">
              마트 갈 때 뭘 살지 고민되시나요?<br />
              이곳에서 신선하고 맛있는 식재료 리스트를<br />한눈에 골라보세요!<br />
              <span className="text-sm font-normal text-gray-500 mt-4 block">(해당 기능은 곧 정식 오픈됩니다!)</span>
           </p>
           
           <button 
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-[#CCFF00] text-[#111827] font-['Black_Han_Sans'] text-2xl border-4 border-[#111827] shadow-[4px_4px_0px_#111827] rounded-full hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#111827] transition-all relative z-10 active:scale-95"
           >
              ← 홈으로 돌아가기
           </button>
       </div>
    </div>
  );
}
