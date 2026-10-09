import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas-pro';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Instagram,
  Phone,
  Check,
  Download,
  Loader2,
  Sparkles,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { CartItem, CustomerOrderData } from '../types';
import { BUSINESS_INFO } from '../data/packagesData';

interface CheckoutModalProps {
  isOpen?: boolean;
  items: CartItem[];
  totalAmount: number;
  onClose: () => void;
}

export default function CheckoutModal({
  isOpen = true,
  items,
  totalAmount,
  onClose,
}: CheckoutModalProps) {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [eventType, setEventType] = useState('حفل زفاف ملكي');
  const [eventDate, setEventDate] = useState('');
  const [eventTimeSlot, setEventTimeSlot] = useState('الفترة المسائية (6:00 م - 11:00 م)');
  const [notes, setNotes] = useState('');

  // States
  const [isCopied, setIsCopied] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [imageSavedSuccess, setImageSavedSuccess] = useState(false);
  const [downloadedFileName, setDownloadedFileName] = useState('');
  const [isDomReady, setIsDomReady] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState<CustomerOrderData | null>(null);

  // Dedicated ref to the printable invoice DOM element
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Monitor DOM readiness
  useEffect(() => {
    if (!isOpen) {
      setIsDomReady(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setIsDomReady(Boolean(invoiceRef.current));
    }, 150);
    return () => window.clearTimeout(timer);
  }, [isOpen, fullName, phoneNumber, address, landmark, eventType, eventDate, eventTimeSlot, notes, items, totalAmount]);

  // Rebuild the invoice whenever any booking detail changes so the invoice never contains stale data.
  useEffect(() => { setGeneratedOrder(null); }, [fullName, phoneNumber, address, landmark, eventType, eventDate, eventTimeSlot, notes, items, totalAmount]);

  // Generate a unique booking reference using the current year
  const generateUniqueOrderId = (): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `ORD-${new Date().getFullYear()}-${code}`;
  };

  // Build the complete CustomerOrderData object
  const createOrderObject = (): CustomerOrderData => {
    if (generatedOrder) return generatedOrder;
    const now = new Date();
    const issueDate = now.toLocaleDateString('ar-IQ', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const issueTime = now.toLocaleTimeString('ar-IQ', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const targetDateFormatted = eventDate
      ? new Date(`${eventDate}T12:00:00`).toLocaleDateString('ar-IQ', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'يُحدد بالتنسيق المباشر مع الإدارة';

    const newOrder: CustomerOrderData = {
      orderId: generateUniqueOrderId(),
      fullName: fullName.trim() || 'زبون القصر الملكي المحترم',
      phoneNumber: phoneNumber.trim() || BUSINESS_INFO.phone,
      eventType,
      eventDate: `${targetDateFormatted} • ${eventTimeSlot}`,
      address: address.trim() || 'لم يحدد بعد',
      landmark: landmark.trim() || 'لم تحدد',
      notes: notes.trim(),
      items,
      totalAmount,
      createdAt: `${issueDate} • ${issueTime}`,
    };
    setGeneratedOrder(newOrder);
    return newOrder;
  };

  // Current dynamic timestamps for live invoice preview
  const now = new Date();
  const currentIssueDate = now.toLocaleDateString('ar-IQ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const currentIssueTime = now.toLocaleTimeString('ar-IQ', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const todayLocal = (() => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); })();

  const previewTargetDate = eventDate
    ? new Date(`${eventDate}T12:00:00`).toLocaleDateString('ar-IQ', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'يُحدد بالتنسيق المباشر مع الإدارة';

  const previewOrder = generatedOrder || {
    orderId: 'يصدر عند إنشاء الحجز',
    fullName: fullName.trim() || 'اسم صاحب الحجز المحترم',
    phoneNumber: phoneNumber.trim() || 'يُدخل عند تقديم طلب الحجز',
    eventType,
    eventDate: `${previewTargetDate} • ${eventTimeSlot}`,
    address: address.trim() || 'لم يحدد بعد',
    landmark: landmark.trim() || 'لم تحدد',
    notes: notes.trim(),
    items,
    totalAmount,
    createdAt: `${currentIssueDate} • ${currentIssueTime}`,
  };

  // Build the WhatsApp formatted message
  const generateFormattedMessage = (order: CustomerOrderData): string => {
    const itemsText = order.items
      .map((item) => {
        let details = `• ${item.name} × ${item.quantity}\nالسعر: ${item.totalPrice.toLocaleString('ar-IQ')} دينار عراقي`;
        if (item.selectedAddOns.length > 0) {
          details += `\n(الخدمات المضافة: ${item.selectedAddOns.map((a) => a.name).join('، ')})`;
        }
        return details;
      })
      .join('\n\n');

    return `━━━━━━━━━━━━━━━━━━━━
👑 طلب حجز مبدئي — ${BUSINESS_INFO.name}
رقم الحجز المعتمد: ${order.orderId}
تاريخ التحرير: ${order.createdAt}
━━━━━━━━━━━━━━━━━━━━

📋 بيانات العميل:
الاسم: ${order.fullName}
الهاتف: ${order.phoneNumber}
العنوان: ${order.address}
أقرب نقطة دالة: ${order.landmark || 'كربلاء'}

📅 تفاصيل المناسبة:
نوع المناسبة: ${order.eventType}
موعد وتوقيت الحفل: ${order.eventDate}

📦 تفاصيل الباقة والخدمات:
${itemsText}

━━━━━━━━━━━━━━━━━━━━
💰 المجموع الإجمالي: ${order.totalAmount.toLocaleString('ar-IQ')} دينار عراقي
━━━━━━━━━━━━━━━━━━━━

📝 ملاحظات خاصة:
${order.notes || 'لا يوجد ملاحظات إضافية'}`;
  };

  // 1. الدالة الرئيسية لتنزيل الفاتورة كصورة عبر html2canvas
  const handleSaveInvoiceAsImage = async () => {
    if (!invoiceRef.current) {
      alert('جاري تهيئة عنصر الفاتورة، يرجى المحاولة بعد قليل...');
      return;
    }

    if (!fullName.trim() || !phoneNumber.trim()) {
      alert('يرجى كتابة اسم صاحب الحجز ورقم الهاتف أولاً لإصدار الفاتورة الرسمية باسمك.');
      return;
    }

    setIsSavingImage(true);
    setImageSavedSuccess(false);

    const order = createOrderObject();
    const element = invoiceRef.current;
    const fileName = `فاتورة-القصر-الملكي-${order.orderId}.png`;
    setDownloadedFileName(fileName);

    try {
      // Ensure all web fonts are loaded
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      await new Promise((resolve) => setTimeout(resolve, 150));

      // Capture element using html2canvas-pro with high-resolution scale
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        imageTimeout: 15000,
        removeContainer: true,
      });

      // Convert to a PNG blob; using a Promise makes failures catchable on mobile browsers.
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) resolve(result);
          else reject(new Error('Canvas PNG generation failed'));
        }, 'image/png');
      });

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = fileName;
      link.href = blobUrl;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);

      setIsSavingImage(false);
      setImageSavedSuccess(true);
    } catch (err) {
      console.error('Failed to capture invoice with html2canvas:', err);
      setIsSavingImage(false);
      alert('حدث خطأ أثناء تنزيل الفاتورة كصورة، يرجى إعادة المحاولة.');
    }
  };

  // 2. زر إرسال الفاتورة عبر واتساب
  const handleWhatsAppOrder = () => {
    if (!fullName.trim() || !phoneNumber.trim()) {
      alert('يرجى ملء اسم صاحب الحجز ورقم الهاتف لإرسال الفاتورة عبر واتساب.');
      return;
    }

    const order = createOrderObject();
    const message = generateFormattedMessage(order);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    // فتح واتساب لا يعني أن الإدارة أكدت الحجز؛ تبقى البيانات حتى يعود المستخدم.
  };

  // 3. زر إرسال الفاتورة عبر إنستغرام
  const handleInstagramOrder = async () => {
    if (!fullName.trim() || !phoneNumber.trim()) {
      alert('يرجى إدخال اسم صاحب الحجز ورقم الهاتف أولاً.');
      return;
    }
    const order = createOrderObject();
    const message = generateFormattedMessage(order);

    try {
      await navigator.clipboard.writeText(message);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 5000);
      window.open(BUSINESS_INFO.instagramUrl, '_blank', 'noopener,noreferrer');
    } catch {
      alert('تعذر نسخ التفاصيل تلقائياً. استخدم زر واتساب لإرسال التفاصيل مباشرة.');
    }
  };

  // 4. زر اتصال مباشر
  const handleDirectCall = () => {
    window.location.href = `tel:${BUSINESS_INFO.phone}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Animated Backdrop */}
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Animated Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 25 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl border border-[#C69D4A]/50 text-right space-y-6 my-6 max-h-[94vh] overflow-y-auto"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#083B38] text-[#DFB55D] shadow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#083B38]">
                إصدار وتأكيد فاتورة الحجز الملكي
              </h3>
              <p className="text-xs text-gray-500">
                {BUSINESS_INFO.name} • كربلاء المقدسة
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 cursor-pointer transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Customer Information Form */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#083B38] border-r-4 border-[#C69D4A] pr-2.5 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#8C6D2B]" />
            <span>بيانات العميل والموعد المطلوب:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                اسم صاحب الحجز <span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                required
                placeholder="مثال: علي كريم الخفاجي"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                رقم الهاتف (الواتساب) <span className="text-red-500">*</span>:
              </label>
              <input
                type="tel"
                required
                placeholder="مثال: 07722322311"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-left focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                العنوان والمنطقة:
              </label>
              <input
                type="text"
                placeholder="كربلاء - الحي أو المنطقة"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                أقرب نقطة دالة:
              </label>
              <input
                type="text"
                placeholder="مثال: قرب فلكة التربية / شارع السعدي"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                نوع المناسبة:
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
              >
                <option value="حفل زفاف ملكي">حفل زفاف ملكي</option>
                <option value="مشية وجاهة عشائرية">مشية وجاهة عشائرية</option>
                <option value="خطوبة وعقد قران">خطوبة وعقد قران</option>
                <option value="حفلة تخرج">حفلة تخرج</option>
                <option value="حفلة خاصة أو مؤتمر">حفلة خاصة أو مؤتمر</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                تاريخ المناسبة المحدد:
              </label>
              <input
                type="date"
                min={todayLocal}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                توقيت الحفل المفضل:
              </label>
              <select
                value={eventTimeSlot}
                onChange={(e) => setEventTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
              >
                <option value="الفترة المسائية (6:00 م - 11:00 م)">
                  الفترة المسائية (من 6:00 مساءً إلى 11:00 ليلاً)
                </option>
                <option value="فترة العصر (3:00 م - 7:00 م)">
                  فترة العصر (من 3:00 بعد الظهر إلى 7:00 مساءً)
                </option>
                <option value="الفترة الصباحية (10:00 ص - 2:00 م)">
                  الفترة الصباحية (من 10:00 صباحاً إلى 2:00 ظهراً)
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              ملاحظات أو رغبات خاصة:
            </label>
            <textarea
              rows={2}
              placeholder="أي تفاصيل أو ترتيبات خاصة ترغب بإبلاغ إدارة القاعة بها..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-[#C69D4A] focus:border-[#C69D4A]"
            />
          </div>
        </div>

        {/* 2. THE ELECTRONIC INVOICE SECTION (Captured by html2canvas) */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#083B38] border-r-4 border-[#C69D4A] pr-2.5">
                معاينة ملخص الحجز:
              </h4>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-[#FAF7F2] text-[#8C6D2B] border border-[#C69D4A]/40">
                منسقة مع التواريخ ورقم الحجز
              </span>
            </div>


          </div>

          {/* ULTRA-PROFESSIONAL ROYAL INVOICE ELEMENT (Explicit Hex colors for html2canvas compatibility) */}
          <div
            ref={invoiceRef}
            id="checkout-electronic-invoice"
            className="p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#1A2E2B',
              border: '2px solid #C69D4A',
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            {/* Top Royal Brand Header */}
            <div
              className="p-5 rounded-2xl text-center space-y-1.5"
              style={{
                backgroundColor: '#083B38',
                border: '2px solid #DFB55D',
                color: '#FFFFFF',
              }}
            >
              <div
                className="flex justify-center items-center gap-1.5 text-xs font-bold tracking-widest"
                style={{ color: '#DFB55D' }}
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="mr-2 text-[11px]" style={{ color: '#FAF7F2' }}>
                  قاعة VIP الملكية الفاخرة
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-wide"
                style={{ color: '#FFFFFF' }}
              >
                {BUSINESS_INFO.name}
              </h2>
              <p className="text-xs sm:text-sm font-medium" style={{ color: '#DFB55D' }}>
                {BUSINESS_INFO.tagline} • أرقى قاعات الأعراس والمناسبات في كربلاء المقدسة
              </p>
            </div>

            {/* Official Metadata Bar: Date, Timing, & Unique Order Number */}
            <div
              className="p-4 rounded-xl text-xs grid grid-cols-1 sm:grid-cols-3 gap-3"
              style={{
                backgroundColor: '#FAF7F2',
                border: '1px solid #C69D4A',
                color: '#1A2E2B',
              }}
            >
              {/* Order Number */}
              <div className="space-y-0.5">
                <span
                  className="text-[11px] font-bold block"
                  style={{ color: '#6B7280' }}
                >
                  رقم الحجز الرسمي (Order ID):
                </span>
                <span
                  className="font-black text-sm sm:text-base tracking-wider block"
                  dir="ltr"
                  style={{ color: '#083B38' }}
                >
                  {previewOrder.orderId}
                </span>
              </div>

              {/* Issue Date & Time */}
              <div className="space-y-0.5">
                <span
                  className="text-[11px] font-bold block"
                  style={{ color: '#6B7280' }}
                >
                  تاريخ وتوقيت الإصدار:
                </span>
                <div
                  className="flex items-center gap-1 font-bold"
                  style={{ color: '#1F2937' }}
                >
                  <Clock className="w-3.5 h-3.5" style={{ color: '#8C6D2B' }} />
                  <span>{previewOrder.createdAt}</span>
                </div>
              </div>

              {/* Booking Status */}
              <div className="space-y-0.5">
                <span
                  className="text-[11px] font-bold block"
                  style={{ color: '#6B7280' }}
                >
                  حالة السجل:
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-bold"
                  style={{
                    color: '#065F46',
                    backgroundColor: '#D1FAE5',
                    border: '1px solid #A7F3D0',
                  }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  حجز مبدئي معتمد وموثق
                </span>
              </div>
            </div>

            {/* Customer & Event Details Symmetrical Grid */}
            <div
              className="p-4 sm:p-5 rounded-xl text-xs grid grid-cols-1 sm:grid-cols-2 gap-3.5"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#1A2E2B',
              }}
            >
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#FAF7F2', border: '1px solid #E5E7EB' }}
              >
                <span className="block text-[11px] mb-0.5" style={{ color: '#6B7280' }}>
                  صاحب الحجز:
                </span>
                <span className="font-bold text-sm" style={{ color: '#111827' }}>
                  {previewOrder.fullName}
                </span>
              </div>

              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#FAF7F2', border: '1px solid #E5E7EB' }}
              >
                <span className="block text-[11px] mb-0.5" style={{ color: '#6B7280' }}>
                  رقم هاتف التواصل:
                </span>
                <span className="font-bold text-sm" dir="ltr" style={{ color: '#111827' }}>
                  {previewOrder.phoneNumber}
                </span>
              </div>

              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#FAF7F2', border: '1px solid #E5E7EB' }}
              >
                <span className="block text-[11px] mb-0.5" style={{ color: '#6B7280' }}>
                  نوع المناسبة المحجوزة:
                </span>
                <span className="font-bold text-sm" style={{ color: '#083B38' }}>
                  {previewOrder.eventType}
                </span>
              </div>

              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#FAF7F2', border: '1px solid #E5E7EB' }}
              >
                <span className="block text-[11px] mb-0.5" style={{ color: '#6B7280' }}>
                  موعد وتوقيت المناسبة المقرر:
                </span>
                <span className="font-bold text-sm" style={{ color: '#083B38' }}>
                  {previewOrder.eventDate}
                </span>
              </div>

              <div
                className="sm:col-span-2 p-3 rounded-lg flex items-start gap-2"
                style={{ backgroundColor: '#FAF7F2', border: '1px solid #E5E7EB' }}
              >
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#8C6D2B' }} />
                <div>
                  <span className="block text-[11px]" style={{ color: '#6B7280' }}>
                    عنوان العميل ونقطة الاستدلال:
                  </span>
                  <span className="font-semibold" style={{ color: '#1F2937' }}>
                    {previewOrder.address} • {previewOrder.landmark || 'كربلاء'}
                  </span>
                </div>
              </div>
            </div>

            {/* Symmetrical Breakdown Table */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #E5E7EB' }}
            >
              <table className="w-full text-right text-xs" style={{ borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#083B38', color: '#FFFFFF' }}>
                  <tr>
                    <th className="py-3 px-4 font-bold" style={{ textAlign: 'right' }}>
                      الباقة / الخدمة المحجوزة
                    </th>
                    <th className="py-3 px-3 font-bold" style={{ textAlign: 'center' }}>
                      الكمية
                    </th>
                    <th className="py-3 px-4 font-bold" style={{ textAlign: 'left' }}>
                      الإجمالي (دينار عراقي)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                        borderBottom: '1px solid #E5E7EB',
                      }}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-sm" style={{ color: '#111827' }}>
                          {item.name}
                        </div>
                        <div className="text-[11px] mt-0.5" style={{ color: '#6B7280' }}>
                          {item.duration}
                        </div>
                        {item.selectedAddOns.length > 0 && (
                          <div
                            className="mt-1.5 space-y-1 text-[11px] pr-2"
                            style={{
                              color: '#4B5563',
                              borderRight: '2px solid #C69D4A',
                            }}
                          >
                            {item.selectedAddOns.map((addon, aIdx) => (
                              <div key={aIdx}>• {addon.name}</div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td
                        className="py-3 px-3 font-bold text-sm"
                        style={{ textAlign: 'center', color: '#1F2937' }}
                      >
                        {item.quantity}
                      </td>
                      <td
                        className="py-3 px-4 font-black text-sm"
                        style={{ textAlign: 'left', color: '#083B38' }}
                      >
                        {item.totalPrice.toLocaleString('ar-IQ')} د.ع
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Prominent Financial Grand Total Banner */}
            <div
              className="p-4 sm:p-5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-inner"
              style={{
                backgroundColor: '#083B38',
                border: '2px solid #DFB55D',
                color: '#FFFFFF',
              }}
            >
              <div>
                <span className="text-xs block" style={{ color: '#D1D5DB' }}>
                  المبلغ الإجمالي النهائي للحجز:
                </span>
                <span className="text-[11px] font-medium" style={{ color: '#DFB55D' }}>
                  شامل كافة التجهيزات والديكورات والضيافة المذكورة أعلاه
                </span>
              </div>
              <div className="text-left">
                <span
                  className="text-2xl sm:text-3xl font-black"
                  style={{ color: '#DFB55D' }}
                >
                  {totalAmount.toLocaleString('ar-IQ')}
                </span>
                <span className="text-sm font-bold mr-2" style={{ color: '#FFFFFF' }}>
                  دينار عراقي
                </span>
              </div>
            </div>

            {/* Notes if any */}
            {previewOrder.notes && (
              <div
                className="p-3 rounded-xl text-xs"
                style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #E5E7EB',
                  color: '#374151',
                }}
              >
                <span className="font-bold ml-1" style={{ color: '#111827' }}>
                  ملاحظات وطلبات خاصة:
                </span>
                <span>{previewOrder.notes}</span>
              </div>
            )}

            {/* Official Stamp & Venue Footer */}
            <div
              className="pt-4 text-center space-y-1.5 text-xs"
              style={{
                borderTop: '2px solid #E5E7EB',
                color: '#4B5563',
              }}
            >
              <p className="font-bold text-sm" style={{ color: '#083B38' }}>
                {BUSINESS_INFO.name} — {BUSINESS_INFO.tagline}
              </p>
              <p style={{ color: '#374151' }}>
                {BUSINESS_INFO.address} • {BUSINESS_INFO.streetFeature}
              </p>
              <p className="font-medium" style={{ color: '#6B7280' }}>
                هاتف الحجوزات: <span dir="ltr">{BUSINESS_INFO.phoneDisplay}</span> • أوقات الاستقبال: {BUSINESS_INFO.workingHours}
              </p>
              <div
                className="pt-2 text-[11px] font-bold"
                style={{ color: '#8C6D2B' }}
              >
                ✨ نتشرف باستقبالكم وصناعة ليلة من العمر لا تُنسى ✨
              </div>
            </div>
          </div>
        </div>

        {/* Animated Interactive Success Alert Banner When Image is Downloaded */}
        <AnimatePresence>
          {imageSavedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-900 text-xs sm:text-sm font-bold flex items-start sm:items-center justify-between gap-3 shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <p>تم تجهيز صورة الفاتورة للتنزيل. تحقق من مجلد التنزيلات في جهازك.</p>
                  {downloadedFileName && (
                    <span className="text-[11px] text-emerald-700 font-normal">
                      اسم الملف: {downloadedFileName}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setImageSavedSuccess(false)}
                className="p-1 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                aria-label="إغلاق التنبيه"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Booking actions: one button per action, without duplicate download controls */}
        <div className="space-y-3 pt-3 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-700 block">
            احفظ الفاتورة أو أرسل تفاصيل الحجز للإدارة:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. زر تنزيل الفاتورة كصورة */}
            <button
              type="button"
              onClick={handleSaveInvoiceAsImage}
              disabled={!isDomReady || isSavingImage}
              className="py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm gold-gradient-bg text-[#083B38] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
            >
              {isSavingImage ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#083B38]" />
                  <span>جاري تنزيل الفاتورة...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#083B38]" />
                  <span>تنزيل الفاتورة كصورة</span>
                </>
              )}
            </button>

            {/* 2. زر إرسال الفاتورة عبر واتساب */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>إرسال تفاصيل الحجز عبر واتساب</span>
            </button>

            {/* 3. زر إرسال الفاتورة عبر إنستغرام */}
            <button
              type="button"
              onClick={handleInstagramOrder}
              className="py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-95 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Instagram className="w-4 h-4" />
              <span>
                {isCopied ? 'تم نسخ الفاتورة! جاري فتح انستغرام...' : 'نسخ التفاصيل وفتح إنستغرام'}
              </span>
              {isCopied && <Check className="w-4 h-4" />}
            </button>

            {/* 4. زر اتصل مباشرتا */}
            <button
              type="button"
              onClick={handleDirectCall}
              className="py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-[#083B38] hover:bg-[#0C4A45] text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>اتصل مباشرتا: {BUSINESS_INFO.phoneDisplay}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
}
