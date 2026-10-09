import { MapPin, Phone, Clock, Instagram, Send, Navigation, Heart } from 'lucide-react';
import Logo from './Logo';
import CodiarTechLogo from './CodiarTechLogo';
import { BUSINESS_INFO } from '../data/packagesData';

export default function Footer() {
  return (
    <footer className="bg-[#051C1A] text-gray-300 border-t border-[#C69D4A]/30 relative overflow-hidden text-right">
      {/* Subtle top gold line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#C69D4A] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: About & Logo (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Logo size="lg" light={true} />
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              {BUSINESS_INFO.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#083B38] border border-[#C69D4A]/30 max-w-md text-xs space-y-1">
              <span className="font-bold text-[#DFB55D] block">ميزة الموقع:</span>
              <p className="text-gray-300">{BUSINESS_INFO.streetFeature}</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0C3E3A] hover:bg-[#11534E] text-white border border-[#C69D4A]/40 transition-colors text-xs font-semibold group"
                title="حساب الانستغرام الرسمي"
              >
                <Instagram className="w-4 h-4 text-[#DFB55D] group-hover:scale-110 transition-transform" />
                <span>انستغرام {BUSINESS_INFO.instagramHandle}</span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-800/60 hover:bg-emerald-700/80 text-white border border-emerald-500/40 transition-colors text-xs font-semibold group"
                title="مراسلة واتساب"
              >
                <Send className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>واتساب الحجوزات</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-bold text-white border-r-4 border-[#C69D4A] pr-2.5">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <a href="#home" className="hover:text-[#DFB55D] transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#DFB55D] transition-colors">
                  العرض العادي لحفلات الزفاف (4 ساعات)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#DFB55D] transition-colors">
                  حجز القاعة للمشيات والجاهات (ساعتين)
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#DFB55D] transition-colors">
                  حاسبة تكلفة الحلم والضيوف
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#DFB55D] transition-colors">
                  معرض الصور وجولة القصر
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#DFB55D] transition-colors">
                  موقعنا وخريطة الوصول
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-bold text-white border-r-4 border-[#C69D4A] pr-2.5">
              معلومات الاتصال والزيارة
            </h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DFB55D] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">العنوان:</span>
                  <span>{BUSINESS_INFO.address}</span>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#DFB55D] hover:underline mt-0.5"
                  >
                    عرض على خرائط Google ↗
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#DFB55D] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">أوقات العمل:</span>
                  <span>{BUSINESS_INFO.workingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#DFB55D] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">هاتف الحجز:</span>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="font-bold text-white hover:text-[#DFB55D] text-sm"
                    dir="ltr"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Note on Lamsa sweets partnership */}
            <div className="p-3 rounded-xl bg-[#083B38]/60 border border-[#C69D4A]/25 text-[11px] text-gray-300">
              <span className="text-[#DFB55D] font-bold block mb-0.5">ضيافة معتمدة:</span>
              بوكسات الضيافة الملكية بالتعاون مع حلويات لمسة {BUSINESS_INFO.lamsaSweetHandle}.
            </div>
          </div>
        </div>

        {/* Bottom Attribution Bar with CODIAR TECH Credit */}
        <div className="mt-14 pt-8 border-t border-[#C69D4A]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="text-center sm:text-right">
            <p>
              جميع الحقوق محفوظة © {new Date().getFullYear()} {BUSINESS_INFO.name}.
            </p>
          </div>

          {/* CODIAR TECH attribution component */}
          <div className="flex items-center">
            <CodiarTechLogo />
          </div>
        </div>
      </div>
    </footer>
  );
}
