/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import PackagesSection from './components/PackagesSection';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import MobileBottomNav from './components/MobileBottomNav';
import { CartItem } from './types';
import { BUSINESS_INFO } from './data/packagesData';
import { Send, CheckCircle2, Sparkles, X, ShoppingBag } from 'lucide-react';

interface ToastData {
  id: string;
  title: string;
  message?: string;
  type: 'cart' | 'order' | 'info';
}

export default function App() {
  // Cart state persisted in LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alqaser_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Drawers and modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Success Notification Toast state
  const [toast, setToast] = useState<ToastData | null>(null);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('alqaser_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const showToast = (title: string, message?: string, type: 'cart' | 'order' | 'info' = 'cart') => {
    setToast({
      id: String(Date.now()),
      title,
      message,
      type,
    });
  };

  // Auto-dismiss toast after 4.5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Add Item to Cart
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.packageId === item.packageId && i.name === item.name
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        updated[existingIndex].totalPrice += item.totalPrice;
        return updated;
      }
      return [...prev, item];
    });

    showToast(
      'تمت الإضافة إلى قائمة الحجز',
      `تمت إضافة "${item.name}" إلى الحجز، يمكنك متابعة إتمام الطلب`,
      'cart'
    );
    setIsCartOpen(true);
  };

  // Quantity updates
  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const unitPrice = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            totalPrice: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Instant booking action (adds to cart and triggers checkout)
  const handleInstantBookWhatsApp = (item: CartItem) => {
    setCartItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Scroll Helpers
  const scrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const cartTotalAmount = cartItems.reduce((acc, it) => acc + it.totalPrice, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A2E2B] pb-16 lg:pb-0">
      {/* Interactive Framer-Motion Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -50, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 max-w-md w-auto"
          >
            <div className="bg-[#083B38] text-white p-4 rounded-2xl shadow-2xl border-2 border-[#C69D4A] backdrop-blur-md relative overflow-hidden flex items-start gap-3.5">
              {/* Type Icon */}
              <div className="p-2 rounded-xl bg-[#0C4A45] border border-[#DFB55D]/40 text-[#DFB55D] flex-shrink-0 mt-0.5">
                {toast.type === 'order' ? (
                  <Sparkles className="w-5 h-5 text-[#DFB55D]" />
                ) : toast.type === 'cart' ? (
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
              </div>

              {/* Text content */}
              <div className="flex-1 text-right space-y-0.5 pr-1">
                <h4 className="text-sm font-black text-white">{toast.title}</h4>
                {toast.message && (
                  <p className="text-xs text-gray-200 leading-relaxed font-normal">
                    {toast.message}
                  </p>
                )}
              </div>

              {/* Dismiss Button */}
              <button
                onClick={() => setToast(null)}
                className="p-1 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
                aria-label="إغلاق التنبيه"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Animated Progress Bar */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#DFB55D]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCalculator={scrollToCalculator}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExplorePackages={scrollToPackages}
          onOpenCalculator={scrollToCalculator}
        />

        {/* Interactive Cost Calculator */}
        <Calculator
          onAddToCart={handleAddToCart}
          onInstantBookWhatsApp={handleInstantBookWhatsApp}
        />

        {/* Packages & Digital Menu Section */}
        <PackagesSection
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onInstantBookWhatsApp={handleInstantBookWhatsApp}
        />

        {/* Photo Gallery Showcase */}
        <GallerySection />

        {/* Location & Map Section */}
        <LocationSection />
      </main>

      {/* Luxury Footer with Codiar Tech Attribution */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExplorePackages={scrollToPackages}
      />

      {/* Checkout and Invoice Generation Modal with Framer-Motion Transitions */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cartItems}
        totalAmount={cartTotalAmount}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCalculator={scrollToCalculator}
      />

      {/* Floating Instant WhatsApp Button on Desktop */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
          'مرحباً قاعة القصر الملكي، أود الاستفسار عن تواريخ الحجز المتاحة والباقات الملكية.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 hidden lg:flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl border-2 border-white/50 hover:scale-105 active:scale-95 transition-all group"
        title="مراسلة فورية عبر واتساب"
      >
        <Send className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold">تواصل مباشر عبر واتساب</span>
      </a>
    </div>
  );
}
