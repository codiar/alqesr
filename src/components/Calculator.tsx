import { useState, useId } from 'react';
import { Calculator as CalcIcon, Users, Check, ShoppingBag, Send, FileText } from 'lucide-react';
import { PACKAGES_DATA, COMMON_ADD_ONS, BUSINESS_INFO } from '../data/packagesData';
import { CartItem } from '../types';

interface CalculatorProps {
  onAddToCart: (item: CartItem) => void;
  onInstantBookWhatsApp: (item: CartItem) => void;
}

export default function Calculator({ onAddToCart, onInstantBookWhatsApp }: CalculatorProps) {
  const occasionTypeId = useId();
  const guestCountId = useId();
  const eventDateId = useId();

  // State
  const [selectedPkgId, setSelectedPkgId] = useState<string>('pkg-standard-wedding');
  const [guestCount, setGuestCount] = useState<number>(150);
  const [includeBoxes, setIncludeBoxes] = useState<boolean>(true);
  const [customBoxCount, setCustomBoxCount] = useState<number>(150);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const currentPkg = PACKAGES_DATA.find((p) => p.id === selectedPkgId) || PACKAGES_DATA[0];

  // Calculations
  const basePrice = currentPkg.price;
  const boxesPrice = includeBoxes ? customBoxCount * 3500 : 0;
  
  const addOnsTotal = selectedAddOnIds.reduce((sum, id) => {
    const addon = COMMON_ADD_ONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const grandTotal = basePrice + boxesPrice + addOnsTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleGuestChange = (num: number) => {
    setGuestCount(num);
    if (includeBoxes) {
      setCustomBoxCount(num);
    }
  };

  const createCalculatedItem = (): CartItem => {
    const selectedAddOnsList = selectedAddOnIds
      .map((id) => COMMON_ADD_ONS.find((a) => a.id === id))
      .filter(Boolean)
      .map((a) => ({
        id: a!.id,
        name: a!.name,
        price: a!.price,
        quantity: 1,
      }));

    if (includeBoxes) {
      selectedAddOnsList.unshift({
        id: 'addon-boxes',
        name: `بوكسات ضيافة حلويات لمسة (${customBoxCount} بوكس)`,
        price: boxesPrice,
        quantity: customBoxCount,
      });
    }

    return {
      id: `calc-${Date.now()}`,
      packageId: currentPkg.id,
      name: `${currentPkg.name} (حساب مخصص)`,
      basePrice: currentPkg.price,
      duration: currentPkg.duration,
      image: currentPkg.image,
      quantity: 1,
      guestCount,
      hospitalityBoxesCount: includeBoxes ? customBoxCount : 0,
      hospitalityBoxPrice: 3500,
      selectedAddOns: selectedAddOnsList,
      totalPrice: grandTotal,
      eventDate,
      notes,
    };
  };

  const handleAdd = () => {
    const item = createCalculatedItem();
    onAddToCart(item);
  };

  const handleWhatsApp = () => {
    const item = createCalculatedItem();
    onInstantBookWhatsApp(item);
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-[#FAF7F2] text-[#083B38] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C69D4A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#083B38]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#083B38] text-[#DFB55D] text-xs font-bold">
            <CalcIcon className="w-3.5 h-3.5" />
            <span>حاسبة الأسعار التفاعلية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#083B38] tracking-tight">
            احسب كلفة حلمك في القصر الملكي
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            خصّص تفاصيل مناسبتك بدقة: اختر الباقة، عدد الضيوف، وبوكسات الضيافة
            واحصل على فاتورة مبدئية فورية واضحة وموثوقة.
          </p>
        </div>

        {/* The Calculator Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#C69D4A]/30 overflow-hidden">
          <div className="bg-[#083B38] p-5 sm:p-6 text-white flex flex-wrap items-center justify-between gap-4 border-b border-[#C69D4A]/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#0C3E3A] border border-[#C69D4A]/50 text-[#DFB55D]">
                <CalcIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">تحديد متطلبات المناسبة</h3>
                <p className="text-xs text-gray-300">يتم احتساب التكلفة بشكل فوري وبشفافية تامة</p>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#C69D4A]/20 text-[#DFB55D] border border-[#C69D4A]/50 font-semibold">
              أسعار رسمية معتمدة 2026
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* 1. Occasion / Package Selection */}
            <div>
              <label htmlFor={occasionTypeId} className="block text-sm font-bold text-[#083B38] mb-3">
                1. اختر الباقة الأساسية:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PACKAGES_DATA.map((pkg) => {
                  const isSelected = selectedPkgId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`p-4 rounded-2xl text-right transition-all border cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#083B38] text-white border-[#C69D4A] shadow-md ring-2 ring-[#C69D4A]/50'
                          : 'bg-[#FAF7F2] text-gray-800 border-gray-200 hover:border-[#C69D4A]/60'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-[#DFB55D] text-[#083B38] flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      )}
                      <div className="font-bold text-sm mb-1">{pkg.name}</div>
                      <div className={`text-xs mb-2 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                        {pkg.duration}
                      </div>
                      <div className={`text-sm font-extrabold ${isSelected ? 'text-[#DFB55D]' : 'text-[#8C6D2B]'}`}>
                        {pkg.priceFormatted}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Guest Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={guestCountId} className="text-sm font-bold text-[#083B38] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#8C6D2B]" />
                  <span>2. عدد الضيوف التقريبي:</span>
                </label>
                <span className="text-base font-extrabold px-3 py-1 rounded-full bg-[#083B38] text-[#DFB55D]">
                  {guestCount} ضيف
                </span>
              </div>
              
              <input
                id={guestCountId}
                type="range"
                min="50"
                max="500"
                step="25"
                value={guestCount}
                onChange={(e) => handleGuestChange(Number(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C69D4A]"
              />

              {/* Quick Guest Count Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[100, 150, 200, 250, 300, 400].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => handleGuestChange(count)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      guestCount === count
                        ? 'bg-[#C69D4A] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {count} ضيف
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Hospitality Boxes by Lamsa Sweets */}
            <div className="p-4 rounded-2xl bg-[#F5F0E6] border border-[#C69D4A]/40 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="include-boxes"
                    checked={includeBoxes}
                    onChange={(e) => setIncludeBoxes(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-[#083B38] focus:ring-[#C69D4A] cursor-pointer"
                  />
                  <div>
                    <label htmlFor="include-boxes" className="font-bold text-sm text-[#083B38] cursor-pointer block">
                      إضافة بوكس ضيافة معتمد من حلويات لمسة (@lamsa_sweet1)
                    </label>
                    <p className="text-xs text-gray-600 mt-0.5">
                      يحتوي البوكس على: قطعة كيك طازجة + عصير طبيعي + قطعة چوكليت + شوكة فاخرة
                    </p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-[#8C6D2B] whitespace-nowrap">
                  3,500 د.ع / للبوكس
                </span>
              </div>

              {includeBoxes && (
                <div className="pt-2 border-t border-[#C69D4A]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">عدد البوكسات المطلوبة:</span>
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      step="10"
                      value={customBoxCount}
                      onChange={(e) => setCustomBoxCount(Math.max(1, Number(e.target.value)))}
                      className="w-24 px-2 py-1 bg-white border border-gray-300 rounded-lg text-center font-bold text-sm text-[#083B38]"
                    />
                    <button
                      type="button"
                      onClick={() => setCustomBoxCount(guestCount)}
                      className="text-[#8C6D2B] underline font-medium hover:text-[#083B38] cursor-pointer"
                    >
                      (مطابقة لعدد الضيوف: {guestCount})
                    </button>
                  </div>
                  <div className="font-bold text-sm text-[#083B38]">
                    إجمالي الضيافة: {(customBoxCount * 3500).toLocaleString('ar-IQ')} د.ع
                  </div>
                </div>
              )}
            </div>

            {/* 4. Additional Add-ons */}
            <div>
              <label className="block text-sm font-bold text-[#083B38] mb-3">
                4. الخدمات الإضافية التكميلية (اختياري):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMMON_ADD_ONS.slice(1).map((addon) => {
                  const isChecked = selectedAddOnIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#083B38]/5 border-[#083B38] shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors ${
                            isChecked
                              ? 'bg-[#083B38] text-[#DFB55D]'
                              : 'border border-gray-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900">{addon.name}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">{addon.unit}</div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#8C6D2B] whitespace-nowrap">
                        +{addon.price.toLocaleString('ar-IQ')} د.ع
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Date & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor={eventDateId} className="block text-xs font-bold text-gray-700 mb-1">
                  تاريخ المناسبة المقترح:
                </label>
                <input
                  id={eventDateId}
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ملاحظات أو رغبات خاصة:
                </label>
                <input
                  type="text"
                  placeholder="مثال: تفضيل موعد مسائي، ديكور خاص..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
                />
              </div>
            </div>
          </div>

          {/* Bottom Total & Order Summary Bar */}
          <div className="bg-[#FAF7F2] p-6 border-t border-[#C69D4A]/30">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-right w-full lg:w-auto">
                <span className="text-xs text-gray-500 font-medium block">
                  المجموع التقديري الإجمالي للحجز:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#083B38]">
                    {grandTotal.toLocaleString('ar-IQ')}
                  </span>
                  <span className="text-base font-bold text-[#8C6D2B]">دينار عراقي</span>
                </div>
                <span className="text-[11px] text-gray-500">
                  تشمل القاعة ({currentPkg.duration})
                  {includeBoxes && ` + ${customBoxCount} بوكس ضيافة`}
                  {selectedAddOnIds.length > 0 && ` + ${selectedAddOnIds.length} خدمات إضافية`}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#083B38] text-white hover:bg-[#0C4A45] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#DFB55D]" />
                  <span>إضافة إلى الحجز</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-xs sm:text-sm gold-gradient-bg text-[#083B38] hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#083B38]" />
                  <span>تأكيد الحجز عبر واتساب</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
