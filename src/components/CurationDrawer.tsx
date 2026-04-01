import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CurationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subMenus: string[];
}

export default function CurationDrawer({ isOpen, onClose, title, subMenus }: CurationDrawerProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />
          
          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-[#F1E8D9] z-[110] shadow-[-10px_0px_30px_rgba(0,0,0,0.3)] border-l-[6px] border-[#111827] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b-[4px] border-[#111827] bg-[#E23B2A] text-white flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-bold opacity-90 mb-1 leading-none">원하시는 메뉴를 선택하세요</p>
                <h2 className="text-xl sm:text-2xl font-['Black_Han_Sans'] leading-tight">{title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="bg-white text-[#111827] border-[3px] border-[#111827] p-2 rounded-full shadow-[3px_3px_0px_#111827] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {subMenus.map((menu, idx) => (
                <motion.button
                  key={menu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  onClick={() => {
                    navigate(`/category/${menu}`);
                    onClose();
                  }}
                  className="w-full bg-white border-[4px] border-[#111827] p-5 rounded-2xl shadow-[6px_6px_0px_#111827] hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#111827] transition-all text-left flex items-center justify-between group"
                >
                  <span className="text-xl sm:text-2xl font-['Black_Han_Sans'] text-[#111827]">{menu}</span>
                  <div className="w-10 h-10 rounded-full bg-[#CCFF00] border-[3px] border-[#111827] flex items-center justify-center font-bold text-xl group-hover:rotate-12 transition-transform shadow-[2px_2px_0px_#111827]">➔</div>
                </motion.button>
              ))}
              
              <div className="mt-auto py-10 text-center">
                <p className="text-sm text-gray-500 font-medium italic">심혈을 기울여 골랐습니다! ✨</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
