import { Sparkles, Calendar, Phone, ChevronDown, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/packagesData';
import facadeImg from '../assets/images/palace_facade_night_1791505127529.jpg';
import entranceImg from '../assets/images/royal_entrance_arches_1791505161121.jpg';

interface HeroProps {
  onExplorePackages: () => void;
  onOpenCalculator: () => void;
}

export default function Hero({ onExplorePackages, onOpenCalculator }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-[#062321]">
      {/* Background Hero Image with Deep Royal Green Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={facadeImg}
          alt="قاعة القصر الملكي للمناسبات في كربلاء"
          className="w-full h-full object-cover object-center scale-105 animate-fade-in filter brightness-75 contrast-110"
        />
        {/* Multilayer Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#062321] via-[#083B38]/80 to-[#05221F]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#062321]/60 to-[#062321]" />
        
        {/* Gold Ornament Pattern Lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#dfb55d_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content (Right in RTL) */}
          <div className="lg:col-span-7 text-right space-y-6">
            {/* Top VIP Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0C3E3A]/90 border border-[#C69D4A]/60 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#DFB55D]" />
              <span className="text-xs sm:text-sm font-bold text-[#DFB55D] tracking-wide">
                القاعة الملكية الأولى في كربلاء المقدسة ★★★★★
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              {BUSINESS_INFO.name}
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold gold-gradient-text mt-2 font-['Amiri',serif]">
                {BUSINESS_INFO.tagline}
              </span>
            </h1>

            {/* Sub-description */}
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl leading-relaxed font-normal">
              أرقى قاعات الأعراس والمناسبات الفاخرة، حيث يلتقي التصميم الملكي الأسطوري
              مع الكوشة الملكية، أنظمة الصوت والإضاءة المسرحية، كادر الضيافة والتصوير المتكامل،
              وضيافة حلويات لمسة المعتمدة.
            </p>

            {/* Key Advantages Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm text-gray-200">
              <span className="inline-flex items-center gap-1.5 bg-[#0C3E3A]/80 px-3 py-1 rounded-full border border-[#C69D4A]/30">
                <CheckCircle2 className="w-4 h-4 text-[#DFB55D]" />
                مطلة على شارع خدمي واسع
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#0C3E3A]/80 px-3 py-1 rounded-full border border-[#C69D4A]/30">
                <CheckCircle2 className="w-4 h-4 text-[#DFB55D]" />
                كادر تصوير وأمانات وضيافة
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#0C3E3A]/80 px-3 py-1 rounded-full border border-[#C69D4A]/30">
                <CheckCircle2 className="w-4 h-4 text-[#DFB55D]" />
                حجز فوري وشفاف بالفاتورة
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExplorePackages}
                className="px-7 py-3.5 rounded-full font-bold text-sm sm:text-base gold-gradient-bg text-[#083B38] shadow-xl hover:shadow-[#C69D4A]/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-[#083B38]" />
                <span>احجز تاريخك الآن</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base bg-[#0C3E3A]/80 hover:bg-[#104b46] text-[#FAF7F2] border border-[#C69D4A]/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#DFB55D]" />
                <span>احسب كلفة حلمك</span>
              </button>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="px-5 py-3.5 rounded-full font-semibold text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Floating Royal Showcase Card (Left in RTL) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-[#C69D4A] via-[#8C6D2B] to-[#083B38] shadow-2xl">
              <div className="bg-[#083B38] rounded-[14px] p-6 text-white space-y-5">
                <div className="flex items-center justify-between border-b border-[#C69D4A]/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold text-[#DFB55D]">العرض الملكي المعتمد</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C69D4A]/20 text-[#DFB55D] border border-[#C69D4A]/40 font-semibold">
                    4 ساعات
                  </span>
                </div>

                <div className="relative h-44 rounded-xl overflow-hidden shadow-inner">
                  <img
                    src={entranceImg}
                    alt="مدخل الأقواس الملكية"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 right-3 text-right">
                    <p className="text-sm font-bold text-white drop-shadow">ممر الأقواس الملكية المضيئة</p>
                    <p className="text-[11px] text-[#DFB55D]">استقبال ملوكي يليق بضيوفكم</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-gray-400">سعر العرض العادي (4 ساعات):</span>
                    <span className="font-bold text-[#DFB55D] text-base">1,700,000 د.ع</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-gray-400">سعر حجز المشيات (ساعتين):</span>
                    <span className="font-bold text-[#DFB55D]">750,000 د.ع</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-gray-400">بوكس ضيافة حلويات لمسة:</span>
                    <span className="font-bold text-emerald-400">3,500 د.ع / للبوكس</span>
                  </div>
                </div>

                <button
                  onClick={onExplorePackages}
                  className="w-full py-2.5 rounded-xl font-bold text-xs gold-gradient-bg text-[#083B38] hover:opacity-95 transition-all text-center block shadow-md cursor-pointer"
                >
                  استعراض كامل التفاصيل والحجز
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down Scroll Arrow */}
      <a
        href="#packages"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-xs text-gray-300 hover:text-[#DFB55D] transition-colors"
      >
        <span>استكشف الباقات</span>
        <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
      </a>
    </section>
  );
}
