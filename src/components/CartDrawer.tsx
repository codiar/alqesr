import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedCheckout: () => void;
  onExplorePackages: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
  onExplorePackages,
}: CartDrawerProps) {
  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Animated Backdrop */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Animated Sliding Drawer */}
          <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 27, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col text-right"
            >
              {/* Header */}
              <div className="p-5 bg-[#083B38] text-white flex items-center justify-between border-b border-[#C69D4A]/30">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#DFB55D]" />
                  <h3 className="font-bold text-lg">قائمة الحجز</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#0C3E3A] text-[#DFB55D] border border-[#C69D4A]/40 font-semibold">
                    {items.length} {items.length === 1 ? 'باقة' : 'عناصر'}
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="إغلاق قائمة الحجز"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center text-xs text-gray-500 pb-2 border-b">
                      <span>العناصر المختارة في الحجز:</span>
                      <button
                        onClick={onClearCart}
                        className="text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>مسح قائمة الحجز</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#C69D4A]/25 space-y-3"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-[#C69D4A]/30"
                            />
                            <div className="flex-1">
                              <h4 className="font-bold text-sm text-[#083B38] leading-tight">
                                {item.name}
                              </h4>
                              <span className="text-[11px] text-gray-500 block mt-0.5">
                                {item.duration}
                              </span>
                              <span className="text-xs font-black text-[#8C6D2B] block mt-1">
                                {item.totalPrice.toLocaleString('ar-IQ')} د.ع
                              </span>
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                              aria-label="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Add-ons list if any */}
                          {item.selectedAddOns.length > 0 && (
                            <div className="text-[11px] text-gray-600 bg-white p-2.5 rounded-xl border border-gray-100 space-y-1">
                              <span className="font-bold text-[#083B38] block">المشمول والإضافات:</span>
                              {item.selectedAddOns.map((addon, aIdx) => (
                                <div key={aIdx} className="flex justify-between items-center text-[11px]">
                                  <span>• {addon.name}</span>
                                  <span className="font-medium text-[#8C6D2B]">
                                    {addon.price > 0
                                      ? `+${addon.price.toLocaleString('ar-IQ')} د.ع`
                                      : 'مشمول'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-200 text-xs">
                            <span className="text-gray-500">الكمية:</span>
                            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-200">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded text-gray-600 hover:text-black cursor-pointer"
                                aria-label="تقليل"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center font-bold text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded text-gray-600 hover:text-black cursor-pointer"
                                aria-label="زيادة"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Empty Cart State */
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-[#FAF7F2] text-[#8C6D2B] flex items-center justify-center border border-[#C69D4A]/30">
                      <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-[#083B38]">قائمة الحجز فارغة حالياً</h4>
                      <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                        لم تقم باختيار أي باقة أو خدمة بعد. تصفح باقات الزفاف والمشيات الفاخرة واختر ما يناسبك.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onExplorePackages();
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-bold gold-gradient-bg text-[#083B38] shadow hover:shadow-md cursor-pointer"
                    >
                      استعراض باقات القصر
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Checkout Bar */}
              {items.length > 0 && (
                <div className="p-5 bg-[#FAF7F2] border-t border-[#C69D4A]/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 block">المجموع النهائي:</span>
                      <span className="text-2xl font-black text-[#083B38]">
                        {totalAmount.toLocaleString('ar-IQ')}{' '}
                        <span className="text-sm font-bold text-[#8C6D2B]">د.ع</span>
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500">فاتورة شاملة</span>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onProceedCheckout();
                    }}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm gold-gradient-bg text-[#083B38] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>متابعة تأكيد الحجز وإصدار الفاتورة</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
