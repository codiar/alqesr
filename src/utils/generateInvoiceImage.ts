import { toBlob, toPng } from 'html-to-image';
import { CustomerOrderData } from '../types';
import { BUSINESS_INFO } from '../data/packagesData';

/**
 * Fallback Canvas Drawer:
 * Uses 100% native HTML5 Canvas 2D API.
 * Never touches document.styleSheets or cross-origin cssRules.
 * Guarantees zero SecurityErrors.
 */
export function drawInvoiceOnCanvas(order: CustomerOrderData): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const scale = 2; // High-DPI for mobile
      const width = 800 * scale;
      
      // Calculate dynamic height based on items and add-ons
      const baseHeight = 900;
      const itemsExtraHeight = order.items.reduce((acc, item) => {
        return acc + 80 + (item.selectedAddOns.length * 30);
      }, 0);
      const height = (baseHeight + itemsExtraHeight) * scale;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to create canvas context');
      }

      ctx.scale(scale, scale);
      const w = 800;

      // 1. White Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, height / scale);

      // 2. Outer Luxury Border
      ctx.strokeStyle = '#C69D4A';
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, w - 32, (height / scale) - 32);

      ctx.strokeStyle = '#083B38';
      ctx.lineWidth = 1;
      ctx.strokeRect(22, 22, w - 44, (height / scale) - 44);

      // 3. Top Royal Header Banner
      ctx.fillStyle = '#083B38';
      ctx.fillRect(24, 24, w - 48, 140);

      // Gold Bottom Accent Line on Header
      ctx.fillStyle = '#DFB55D';
      ctx.fillRect(24, 162, w - 48, 4);

      // Five Golden Stars
      ctx.fillStyle = '#DFB55D';
      ctx.font = 'bold 20px "Cairo", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★ ★ ★ ★ ★', w / 2, 55);

      // Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px "Cairo", sans-serif';
      ctx.fillText(BUSINESS_INFO.name, w / 2, 92);

      // Subtitle / Tagline
      ctx.fillStyle = '#DFB55D';
      ctx.font = '16px "Cairo", sans-serif';
      ctx.fillText(`${BUSINESS_INFO.tagline} • قاعة أعراس ومناسبات فاخرة`, w / 2, 122);

      // VIP badge in Header
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('VIP • OFFICIAL RESERVATION INVOICE', w / 2, 148);

      let curY = 195;

      // 4. Order ID & Date Row
      ctx.fillStyle = '#FAF7F2';
      ctx.fillRect(40, curY, w - 80, 50);
      ctx.strokeStyle = '#E0BE6C';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, curY, w - 80, 50);

      ctx.fillStyle = '#083B38';
      ctx.font = 'bold 15px "Cairo", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`رقم الطلب: ${order.orderId}`, w - 60, curY + 31);

      ctx.fillStyle = '#666666';
      ctx.textAlign = 'left';
      ctx.font = '13px "Cairo", sans-serif';
      ctx.fillText(`تاريخ الإصدار: ${order.createdAt}`, 60, curY + 31);

      curY += 70;

      // 5. Customer Information Box
      ctx.fillStyle = '#FAF7F2';
      ctx.fillRect(40, curY, w - 80, 110);
      ctx.strokeStyle = '#D1D5DB';
      ctx.strokeRect(40, curY, w - 80, 110);

      ctx.fillStyle = '#083B38';
      ctx.font = 'bold 14px "Cairo", sans-serif';
      ctx.textAlign = 'right';

      // Row 1
      ctx.fillText(`اسم العميل: ${order.fullName}`, w - 60, curY + 32);
      ctx.fillText(`رقم الهاتف: ${order.phoneNumber}`, (w / 2) - 20, curY + 32);

      // Row 2
      ctx.font = '13px "Cairo", sans-serif';
      ctx.fillStyle = '#333333';
      ctx.fillText(`العنوان: ${order.address}`, w - 60, curY + 65);
      ctx.fillText(`أقرب نقطة دالة: ${order.landmark || 'كربلاء'}`, (w / 2) - 20, curY + 65);

      // Row 3
      ctx.fillText(`المناسبة: ${order.eventType}`, w - 60, curY + 95);
      ctx.fillText(`التاريخ المقترح: ${order.eventDate}`, (w / 2) - 20, curY + 95);

      curY += 135;

      // 6. Items Table Header
      ctx.fillStyle = '#083B38';
      ctx.fillRect(40, curY, w - 80, 40);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 14px "Cairo", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('الباقة / الخدمة المطلوبة', w - 60, curY + 26);

      ctx.textAlign = 'center';
      ctx.fillText('الكمية', (w / 2) + 30, curY + 26);

      ctx.textAlign = 'left';
      ctx.fillText('الإجمالي (د.ع)', 60, curY + 26);

      curY += 40;

      // Items Rows
      order.items.forEach((item, index) => {
        const itemRowHeight = 55 + (item.selectedAddOns.length * 24);
        ctx.fillStyle = index % 2 === 0 ? '#FFFFFF' : '#F9FBFB';
        ctx.fillRect(40, curY, w - 80, itemRowHeight);
        ctx.strokeStyle = '#E5E7EB';
        ctx.strokeRect(40, curY, w - 80, itemRowHeight);

        // Package Name
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 14px "Cairo", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(item.name, w - 60, curY + 26);

        // Duration / Details
        ctx.fillStyle = '#6B7280';
        ctx.font = '12px "Cairo", sans-serif';
        ctx.fillText(item.duration, w - 60, curY + 44);

        // Add-ons under item
        if (item.selectedAddOns.length > 0) {
          item.selectedAddOns.forEach((addon, aIdx) => {
            ctx.fillStyle = '#8C6D2B';
            ctx.font = '11px "Cairo", sans-serif';
            ctx.fillText(`• ${addon.name}`, w - 80, curY + 62 + (aIdx * 22));
          });
        }

        // Quantity
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 14px "Cairo", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(item.quantity), (w / 2) + 30, curY + 30);

        // Price
        ctx.fillStyle = '#083B38';
        ctx.font = 'bold 15px "Cairo", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.totalPrice.toLocaleString('ar-IQ')} د.ع`, 60, curY + 30);

        curY += itemRowHeight;
      });

      curY += 15;

      // 7. Grand Total Box
      ctx.fillStyle = '#083B38';
      ctx.fillRect(40, curY, w - 80, 60);
      ctx.strokeStyle = '#C69D4A';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, curY, w - 80, 60);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px "Cairo", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('المجموع الإجمالي للحجز:', w - 65, curY + 36);

      ctx.fillStyle = '#DFB55D';
      ctx.font = 'bold 22px "Cairo", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${order.totalAmount.toLocaleString('ar-IQ')} دينار عراقي`, 65, curY + 38);

      curY += 80;

      // 8. Notes if present
      if (order.notes) {
        ctx.fillStyle = '#F3F4F6';
        ctx.fillRect(40, curY, w - 80, 50);
        ctx.strokeStyle = '#E5E7EB';
        ctx.strokeRect(40, curY, w - 80, 50);

        ctx.fillStyle = '#374151';
        ctx.font = '12px "Cairo", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`ملاحظات: ${order.notes}`, w - 60, curY + 30);

        curY += 65;
      }

      // 9. Venue Contact & Stamp Footer
      ctx.strokeStyle = '#DFB55D';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, curY);
      ctx.lineTo(w - 60, curY);
      ctx.stroke();

      curY += 25;

      ctx.fillStyle = '#083B38';
      ctx.font = 'bold 14px "Cairo", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${BUSINESS_INFO.name} — كربلاء المقدسة`, w / 2, curY);

      curY += 22;
      ctx.fillStyle = '#4B5563';
      ctx.font = '12px "Cairo", sans-serif';
      ctx.fillText(`العنوان: ${BUSINESS_INFO.address} • هاتف الحجز: ${BUSINESS_INFO.phoneDisplay}`, w / 2, curY);

      curY += 20;
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '11px "Cairo", sans-serif';
      ctx.fillText(`${BUSINESS_INFO.streetFeature} • أوقات العمل: ${BUSINESS_INFO.workingHours}`, w / 2, curY);

      curY += 22;
      ctx.fillStyle = '#C69D4A';
      ctx.font = 'bold 12px "Cairo", sans-serif';
      ctx.fillText('✨ خلي يومك مميز معنا • نتشرف بكم ✨', w / 2, curY);

      // Convert canvas to Blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to generate image blob'));
        }
      }, 'image/png');
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Capture invoice element as image safely:
 * 1. Tries html-to-image with `skipFonts: true` (which stops the SecurityError from Google Fonts)
 * 2. If blocked or fails for any reason, falls back immediately to drawInvoiceOnCanvas.
 */
export async function captureInvoiceBlob(
  element: HTMLElement | null,
  order: CustomerOrderData
): Promise<Blob> {
  if (element) {
    try {
      const blob = await toBlob(element, {
        skipFonts: true, // Crucial: prevents SecurityError when reading cssRules from Google Fonts
        pixelRatio: 2.5,
        backgroundColor: '#FFFFFF',
        cacheBust: false,
      });
      if (blob) {
        return blob;
      }
    } catch (e) {
      console.warn('html-to-image failed, switching to native canvas renderer:', e);
    }
  }

  // Guaranteed fallback
  return drawInvoiceOnCanvas(order);
}
