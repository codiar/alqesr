import { Home, Sparkles, Calculator as CalcIcon, ShoppingBag, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/packagesData';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCalculator: () => void;
}

export default function MobileBottomNav({
  cartCount,
  onOpenCart,
  onOpenCalculator,
}: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#083B38]/95 backdrop-blur-md border-t border-[#C69D4A]/40 shadow-2xl py-2 px-3">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Home */}
        <a
          href="#home"
          className="flex flex-col items-center justify-center text-gray-300 hover:text-[#DFB55D] transition-colors py-1 px-2"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold">الرئيسية</span>
        </a>

        {/* Packages */}
        <a
          href="#packages"
          className="flex flex-col items-center justify-center text-gray-300 hover:text-[#DFB55D] transition-colors py-1 px-2"
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold">الباقات</span>
        </a>

        {/* Calculator Button (Center highlight) */}
        <button
          onClick={onOpenCalculator}
          className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-[#C69D4A] to-[#DFB55D] text-[#083B38] p-3 rounded-full shadow-lg border-2 border-[#FAF7F2] active:scale-95 transition-transform cursor-pointer"
          aria-label="احسب الكلفة"
        >
          <CalcIcon className="w-5 h-5" />
          <span className="text-[9px] font-bold mt-0.5">احسب الكلفة</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center text-gray-300 hover:text-[#DFB55D] transition-colors py-1 px-2 relative cursor-pointer"
          aria-label="الحجوزات"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#C69D4A] text-[#083B38] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold">الحجوزات</span>
        </button>

        {/* Direct Call */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex flex-col items-center justify-center text-gray-300 hover:text-emerald-400 transition-colors py-1 px-2"
        >
          <Phone className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold">اتصال</span>
        </a>
      </div>
    </div>
  );
}
