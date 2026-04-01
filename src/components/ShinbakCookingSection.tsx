interface Props {
  foodName: string;
  youtubeShortsId?: string;
}

export default function ShinbakCookingSection({ foodName, youtubeShortsId }: Props) {
  if (!youtubeShortsId) return null;

  return (
    <section className="bg-[#111827] border-[4px] border-[#FFF9C4] rounded-[2rem] p-6 sm:p-10 shadow-[8px_8px_0px_#E23B2A] text-white my-10">
      <div className="flex flex-col items-center mb-8 text-center">
         <h2 className="text-2xl sm:text-4xl font-['Black_Han_Sans'] text-[#CCFF00] mb-3">🔥 신박한 요리 팁!</h2>
         <p className="text-gray-300 font-medium text-sm sm:text-base">{foodName} 더 맛있게 먹는 법 쇼츠로 바로 확인하기!</p>
      </div>
      
      <div className="flex justify-center w-full">
         <div className="relative w-full max-w-[315px] aspect-[9/16] rounded-2xl overflow-hidden border-4 border-[#FFF9C4] shadow-[6px_6px_0px_#CCFF00]">
            <iframe 
               src={`https://www.youtube.com/embed/${youtubeShortsId}?autoplay=0&loop=1&playlist=${youtubeShortsId}`} 
               title="YouTube Shorts" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
               className="absolute top-0 left-0 w-full h-full"
            ></iframe>
         </div>
      </div>
    </section>
  );
}
