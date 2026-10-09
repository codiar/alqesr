import { MapPin, Clock, Phone, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/packagesData';

export default function LocationSection() {
  return (
    <section id="location" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#083B38] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#083B38] text-[#DFB55D] text-xs font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>الموقع الجغرافي وسهولة الوصول</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#083B38]">
            موقعنا الفاخر في كربلاء
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            موقع استراتيجي مميز يسهل وصول ضيوفكم من كافة مناطق كربلاء والمحافظات الكريمة.
          </p>
        </div>

        {/* Details Card & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Details (Right in RTL) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#C69D4A]/30 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold text-[#8C6D2B] block mb-1">
                  المحافظة والمنطقة
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#083B38]">
                  كربلاء المقدسة
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {BUSINESS_INFO.streetFeature}
                </p>
              </div>

              {/* Point of Landmark */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#083B38]/5 text-[#083B38] mt-1 border border-[#083B38]/10">
                  <MapPin className="w-5 h-5 text-[#8C6D2B]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#083B38]">العنوان التفصيلي:</h4>
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    أقرب نقطة دالة: قرب مدينة العاب السندباد، قاعة أرضية على شارع خدمي واسع
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#083B38]/5 text-[#083B38] mt-1 border border-[#083B38]/10">
                  <Clock className="w-5 h-5 text-[#8C6D2B]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#083B38]">أوقات استقبال الزبائن والحجز:</h4>
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-0.5">
                    {BUSINESS_INFO.workingHours}
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    متاح 7 أيام في الأسبوع
                  </span>
                </div>
              </div>

              {/* Phone & Direct Contact */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#083B38]/5 text-[#083B38] mt-1 border border-[#083B38]/10">
                  <Phone className="w-5 h-5 text-[#8C6D2B]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#083B38]">هاتف الحجوزات والاستعلامات:</h4>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="text-base font-extrabold text-[#083B38] hover:text-[#8C6D2B] transition-colors inline-block mt-0.5"
                    dir="ltr"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Parking Feature */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F5F0E6] text-xs text-gray-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>شارع خدمي فسيح يسمح بوقوف مواكب الأعراس وسيارات الضيوف بكل أريحية.</span>
              </div>
            </div>

            {/* Direct Google Maps Button */}
            <a
              href={BUSINESS_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm gold-gradient-bg text-[#083B38] hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shadow"
            >
              <Navigation className="w-4 h-4 text-[#083B38]" />
              <span>فتح الموقع في خرائط Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#083B38]/80" />
            </a>
          </div>

          {/* Interactive Map Visual (Left in RTL) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#C69D4A]/30 shadow-lg bg-white flex flex-col">
            <div className="p-4 bg-[#083B38] text-white flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#DFB55D]" />
                موقع قاعة القصر الملكي على الخريطة
              </span>
              <span className="text-[#DFB55D] text-[11px]">كربلاء - قرب مدينة ألعاب السندباد</span>
            </div>

            <div className="relative flex-1 min-h-[350px] w-full bg-gray-100">
              <iframe
                title="موقع قاعة القصر الملكي للمناسبات"
                src="https://maps.google.com/maps?q=32.6160,44.0249&z=15&output=embed"
                className="w-full h-full min-h-[360px] border-0"
                loading="lazy"
                allowFullScreen
              />

              {/* Floating Overlay Badge on Map */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-xl border border-[#C69D4A]/40 max-w-xs text-right">
                <p className="text-xs font-black text-[#083B38]">
                  {BUSINESS_INFO.name}
                </p>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  كربلاء قرب مدينة العاب السندباد
                </p>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#8C6D2B] hover:text-[#083B38]"
                >
                  <span>اتجاهات القيادة (GPS)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
