import { useState } from 'react';
import { Image as ImageIcon, Printer, Check, Loader2, Sparkles, X } from 'lucide-react';
import { CustomerOrderData } from '../types';
import { BUSINESS_INFO } from '../data/packagesData';
import { captureInvoiceBlob } from '../utils/generateInvoiceImage';
import Logo from './Logo';

interface PrintableReceiptProps {
  order: CustomerOrderData;
  onClose: () => void;
  autoDownloadImage?: boolean;
}

export default function PrintableReceipt({ order, onClose }: PrintableReceiptProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    setIsDownloaded(false);
    setErrorMessage(null);

    const element = document.getElementById('printable-invoice');
    const fileName = `فاتورة-${order.orderId}.png`;

    try {
      // Use the safe capture with skipFonts: true and canvas fallback
      const blob = await captureInvoiceBlob(element, order);

      // Check if Web Share API with files is supported (iOS Safari / Android Chrome can save directly to Photos)
      if (
        navigator.canShare &&
        navigator.canShare({ files: [new File([blob], fileName, { type: 'image/png' })] })
      ) {
        try {
          const file = new File([blob], fileName, { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: `فاتورة حجز ${order.orderId}`,
            text: `فاتورة حجز من ${BUSINESS_INFO.name}`,
          });
          setIsDownloading(false);
          setIsDownloaded(true);
          return;
        } catch {
          // User cancelled share dialog, continue to direct download
        }
      }

      // Direct PNG file download
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = fileName;
      link.href = objectUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);

      setIsDownloading(false);
      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 5000);
    } catch (error) {
      console.error('Failed to capture invoice as image', error);
      setErrorMessage('تعذر حفظ الصورة تلقائياً، يمكنك استخدام خيار طباعة / PDF لحفظ الفاتورة كملف.');
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-[#C69D4A]/50 text-right space-y-5 max-h-[95vh] overflow-y-auto">
        {/* Actions bar (hidden during print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4 no-print">
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Action: Download as Image directly to Phone */}
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold gold-gradient-bg text-[#083B38] shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري تجهيز الصورة...</span>
                </>
              ) : isDownloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>تم حفظ الصورة في هاتفك! 🎉</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4" />
                  <span>تنزيل الفاتورة كصورة للهاتف (PNG)</span>
                </>
              )}
            </button>

            {/* Print/PDF */}
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#083B38] text-white hover:bg-[#0C4A45] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#DFB55D]" />
              <span>طباعة / PDF</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-gray-500 hover:text-gray-800 font-bold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            <span>إغلاق</span>
          </button>
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs font-bold no-print">
            {errorMessage}
          </div>
        )}

        {/* Success Banner if image downloaded */}
        {isDownloaded && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 no-print">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>تم حفظ الفاتورة بنجاح في جهازك كصورة، يمكنك الآن إرسالها أو الاحتفاظ بها في معرض الصور.</span>
          </div>
        )}

        {/* The Printable & Capturable Container */}
        <div
          id="printable-invoice"
          className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C69D4A]/40 space-y-6 text-[#1A2E2B]"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#083B38] pb-5">
            <div>
              <Logo size="md" light={false} />
            </div>
            <div className="text-left space-y-0.5">
              <span className="text-xs font-bold text-[#8C6D2B] block">فاتورة حجز رسمية</span>
              <span className="text-sm sm:text-base font-black text-[#083B38] block" dir="ltr">
                {order.orderId}
              </span>
              <span className="text-[11px] text-gray-500 block">{order.createdAt}</span>
              <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                حجز معتمد ★★★★★
              </span>
            </div>
          </div>

          {/* Customer Details Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#C69D4A]/30 text-xs">
            <div>
              <span className="text-gray-500 block">اسم العميل:</span>
              <span className="font-bold text-gray-900 text-sm">{order.fullName}</span>
            </div>
            <div>
              <span className="text-gray-500 block">رقم الهاتف:</span>
              <span className="font-bold text-gray-900" dir="ltr">{order.phoneNumber}</span>
            </div>
            <div>
              <span className="text-gray-500 block">العنوان:</span>
              <span className="font-bold text-gray-900">{order.address}</span>
            </div>
            <div>
              <span className="text-gray-500 block">أقرب نقطة دالة:</span>
              <span className="font-bold text-gray-900">{order.landmark || 'كربلاء'}</span>
            </div>
            {order.eventType && (
              <div>
                <span className="text-gray-500 block">نوع المناسبة:</span>
                <span className="font-bold text-gray-900">{order.eventType}</span>
              </div>
            )}
            {order.eventDate && (
              <div>
                <span className="text-gray-500 block">تاريخ المناسبة:</span>
                <span className="font-bold text-gray-900">{order.eventDate}</span>
              </div>
            )}
          </div>

          {/* Items Table */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#083B38] text-white">
                <tr>
                  <th className="py-2.5 px-3 font-bold">الباقة / الخدمة</th>
                  <th className="py-2.5 px-3 font-bold text-center">الكمية</th>
                  <th className="py-2.5 px-3 font-bold text-left">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-[11px] text-gray-500">{item.duration}</div>
                      {item.selectedAddOns.length > 0 && (
                        <div className="mt-1 space-y-0.5 text-[11px] text-gray-600 pr-2 border-r-2 border-[#C69D4A]/50">
                          {item.selectedAddOns.map((addon, aIdx) => (
                            <div key={aIdx}>
                              • {addon.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-left font-black text-[#083B38]">
                      {item.totalPrice.toLocaleString('ar-IQ')} د.ع
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grand Total */}
          <div className="flex justify-between items-center p-4 rounded-2xl bg-[#083B38] text-white shadow-inner">
            <span className="text-xs sm:text-sm font-bold">المجموع الإجمالي للحجز:</span>
            <span className="text-xl sm:text-2xl font-black text-[#DFB55D]">
              {order.totalAmount.toLocaleString('ar-IQ')} دينار عراقي
            </span>
          </div>

          {/* Notes if any */}
          {order.notes && (
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <span className="font-bold text-gray-800 block mb-1">ملاحظات الزبون:</span>
              <p>{order.notes}</p>
            </div>
          )}

          {/* Official Venue Stamp & Contact Details */}
          <div className="border-t-2 border-[#C69D4A]/30 pt-4 text-center space-y-1.5 text-xs text-gray-600">
            <p className="font-bold text-[#083B38] text-sm">
              {BUSINESS_INFO.name} — {BUSINESS_INFO.tagline}
            </p>
            <p className="font-medium">
              {BUSINESS_INFO.address} • هاتف الحجز: {BUSINESS_INFO.phoneDisplay}
            </p>
            <p className="text-[10px] text-gray-400">
              {BUSINESS_INFO.streetFeature} • أوقات العمل: {BUSINESS_INFO.workingHours}
            </p>
            <div className="pt-2 flex items-center justify-center gap-1 text-[10px] text-[#8C6D2B]">
              <Sparkles className="w-3 h-3 text-[#C69D4A]" />
              <span>نتشرف بخدمتكم ونتمنى لكم ليلة سعيدة ملؤها الفرح والسرور</span>
              <Sparkles className="w-3 h-3 text-[#C69D4A]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

