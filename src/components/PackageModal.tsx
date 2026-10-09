import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle2, ShoppingBag, Send, Sparkles } from 'lucide-react';
import { PackageItem, CartItem } from '../types';
import { COMMON_ADD_ONS } from '../data/packagesData';

interface PackageModalProps {
  pkg: PackageItem | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onInstantBookWhatsApp: (item: CartItem) => void;
}

export default function PackageModal({
  pkg,
  onClose,
  onAddToCart,
  onInstantBookWhatsApp,
}: PackageModalProps) {
  if (!pkg) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [includeBoxes, setIncludeBoxes] = useState<boolean>(pkg.id === 'pkg-standard-wedding');
  const [boxesCount, setBoxesCount] = useState<number>(150);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(150);
  const [notes, setNotes] = useState<string>('');

  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Price calculations
  const basePackageTotal = pkg.price * quantity;
  const boxesTotal = includeBoxes ? boxesCount * 3500 : 0;
  const addOnsTotal = selectedAddOnIds.reduce((sum, id) => {
    const addon = COMMON_ADD_ONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const grandTotal = basePackageTotal + boxesTotal + addOnsTotal;

  const buildCartItem = (): CartItem => {
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
        name: `بوكسات ضيافة حلويات لمسة (${boxesCount} بوكس)`,
        price: boxesTotal,
        quantity: boxesCount,
      });
    }

    return {
      id: `${pkg.id}-${Date.now()}`,
      packageId: pkg.id,
      name: pkg.name,
      basePrice: pkg.price,
      duration: pkg.duration,
      image: pkg.image,
      quantity,
      guestCount,
      hospitalityBoxesCount: includeBoxes ? boxesCount : 0,
      hospitalityBoxPrice: 3500,
      selectedAddOns: selectedAddOnsList,
      totalPrice: grandTotal,
      eventDate,
      notes,
    };
  };

  const handleAdd = () => {
    onAddToCart(buildCartItem());
    onClose();
  };

  const handleWhatsApp = () => {
    onInstantBookWhatsApp(buildCartItem());
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Animated Backdrop */}
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Animated Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 25 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#C69D4A]/40 overflow-hidden my-6 max-h-[90vh] flex flex-col text-right"
        >
          {/* Header with image */}
          <div className="relative h-56 sm:h-64 flex-shrink-0">
            <img
              src={pkg.image}
              alt={pkg.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#083B38] via-[#083B38]/40 to-black/30" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges and titles */}
            <div className="absolute bottom-4 right-4 left-4 flex flex-col gap-1 text-white">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#C69D4A] text-[#083B38]">
                  {pkg.categoryLabel}
                </span>
                <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {pkg.duration}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {pkg.name}
              </h3>
              <p className="text-xs text-[#DFB55D]">{pkg.subtitle}</p>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-6 text-[#1A2E2B] flex-1">
            {/* Price Header */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#C69D4A]/30">
              <div>
                <span className="text-xs text-gray-500 block">السعر الأساسي المعتمد:</span>
                <span className="text-2xl font-black text-[#083B38]">
                  {pkg.priceFormatted}
                </span>
              </div>
              <div className="text-left text-xs text-[#8C6D2B] font-semibold">
                <span className="block">شامل التنظيم الملكي</span>
                <span>{pkg.duration}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-bold text-[#083B38] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C69D4A]" />
                نبذة عن الباقة:
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {pkg.description}
              </p>
            </div>

            {/* Features List */}
            <div>
              <h4 className="text-sm font-bold text-[#083B38] mb-3">
                ما تشمله الباقة بالتفصيل:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pkg.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hospitality Box Option (From Menu) */}
            <div className="p-4 rounded-2xl bg-[#F5F0E6] border border-[#C69D4A]/40 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="modal-include-boxes"
                    checked={includeBoxes}
                    onChange={(e) => setIncludeBoxes(e.target.checked)}
                    className="w-5 h-5 rounded text-[#083B38] focus:ring-[#C69D4A] cursor-pointer"
                  />
                  <div>
                    <label htmlFor="modal-include-boxes" className="font-bold text-xs sm:text-sm text-[#083B38] cursor-pointer block">
                      إضافة بوكس ضيافة حلويات لمسة (@lamsa_sweet1)
                    </label>
                    <p className="text-[11px] text-gray-600">
                      كيك + عصير + چوكليت + شوكة فاخرة (3,500 د.ع للبوكس)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8C6D2B]">
                  3,500 د.ع
                </span>
              </div>

              {includeBoxes && (
                <div className="flex items-center justify-between pt-2 border-t border-[#C69D4A]/20 text-xs">
                  <div className="flex items-center gap-2">
                    <span>العدد:</span>
                    <input
                      type="number"
                      min="10"
                      max="800"
                      step="10"
                      value={boxesCount}
                      onChange={(e) => setBoxesCount(Math.max(1, Number(e.target.value)))}
                      className="w-20 px-2 py-1 bg-white border border-gray-300 rounded-lg text-center font-bold"
                    />
                    <span>بوكس</span>
                  </div>
                  <span className="font-bold text-[#083B38]">
                    +{(boxesCount * 3500).toLocaleString('ar-IQ')} د.ع
                  </span>
                </div>
              )}
            </div>

            {/* Add-ons Selector */}
            <div>
              <h4 className="text-sm font-bold text-[#083B38] mb-2.5">
                خدمات إضافية يمكن طلبها مع الباقة:
              </h4>
              <div className="space-y-2">
                {COMMON_ADD_ONS.slice(1).map((addon) => {
                  const isSelected = selectedAddOnIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#083B38]/5 border-[#083B38]'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-[#083B38] text-[#DFB55D] border-[#083B38]' : 'border-gray-400'
                        }`}>
                          {isSelected && '✓'}
                        </div>
                        <span className="font-medium text-gray-800">{addon.name}</span>
                      </div>
                      <span className="font-bold text-[#8C6D2B]">
                        +{addon.price.toLocaleString('ar-IQ')} د.ع
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event details inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  تاريخ المناسبة المتوقع:
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  عدد الضيوف المتوقع:
                </label>
                <input
                  type="number"
                  min="50"
                  max="600"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* Footer actions with Total */}
          <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#C69D4A]/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-gray-500 block">المجموع مع الإضافات:</span>
              <div className="text-xl sm:text-2xl font-black text-[#083B38]">
                {grandTotal.toLocaleString('ar-IQ')} <span className="text-xs font-bold text-[#8C6D2B]">د.ع</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAdd}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#083B38] text-white hover:bg-[#0C4A45] transition-all flex items-center gap-1.5 cursor-pointer shadow active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-[#DFB55D]" />
                <span>إضافة للسلة</span>
              </button>

              <button
                onClick={handleWhatsApp}
                className="px-5 py-2.5 rounded-xl font-bold text-xs gold-gradient-bg text-[#083B38] hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4 text-[#083B38]" />
                <span>حجز مباشر عبر واتساب</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
