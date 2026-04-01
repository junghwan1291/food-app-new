import { KITCHEN_ITEMS } from '../data/partnersData';

export default function KitchenItemsSection() {
  return (
    <section className="bg-white border-[4px] border-[#111827] rounded-[2rem] p-5 sm:p-8 shadow-[6px_6px_0px_#111827] mt-8 w-full max-w-[800px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end gap-2 mb-6 justify-center text-center">
        <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans'] text-[#00A6E0]">🛒 이런 신박한 주방템 어때요?</h2>
        <p className="text-[10px] sm:text-xs text-gray-500 font-medium pb-1 leading-tight sm:ml-auto">수수료를 제공받을 수 있음</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 place-items-center">
        {KITCHEN_ITEMS.map((item) => (
          <div key={item.id} className="relative w-full max-w-[190px] flex flex-col items-center justify-center bg-[#F1E8D9] border-[3px] border-[#111827] rounded-2xl shadow-[4px_4px_0px_#111827] px-1 h-[285px] sm:h-[295px] overflow-hidden group">
              <div className="absolute top-0 w-full bg-[#00A6E0] text-white border-b-[3px] border-[#111827] text-center font-['Black_Han_Sans'] text-xs py-1 z-30 truncate px-2">{item.name}</div>
              <div className="w-full h-full pt-6 flex items-center justify-center [&>iframe]:w-full [&>iframe]:h-full" dangerouslySetInnerHTML={{ __html: item.html }} />
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
