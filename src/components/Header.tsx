import { useState, useEffect } from 'react';
import { Phone, Clock, Search, ShoppingBag, Menu, X, MapPin } from 'lucide-react';
import Logo from './Logo';
import { BUSINESS_INFO } from '../data/packagesData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCalculator: () => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onOpenCalculator,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'خدماتنا والباقات', href: '#packages' },
    { name: 'احسب كلفة حلمك', href: '#calculator', onClick: onOpenCalculator },
    { name: 'معرض القصر', href: '#gallery' },
    { name: 'موقعنا الفاخر', href: '#location' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#05221F] text-[#FAF7F2] text-xs border-b border-[#C69D4A]/25 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Working hours & Status */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#0C3E3A] text-[#DFB55D] px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-[#C69D4A]/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              مفتوح الآن للحجوزات
            </span>
            <div className="hidden sm:flex items-center gap-1 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-[#DFB55D]" />
              <span>{BUSINESS_INFO.workingHours}</span>
            </div>
          </div>

          {/* Direct Phone & Address indicator */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-1 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#DFB55D]" />
              <span>كربلاء • قرب مدينة العاب السندباد</span>
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 font-bold text-[#E0BE6C] hover:text-white transition-colors bg-[#083B38] px-2.5 py-1 rounded-md border border-[#C69D4A]/40"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#083B38]/95 backdrop-blur-md shadow-lg border-b border-[#C69D4A]/30 py-2.5'
            : 'bg-[#083B38] border-b border-[#C69D4A]/20 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <Logo size={isScrolled ? 'sm' : 'md'} light={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className="text-sm font-medium text-gray-200 hover:text-[#DFB55D] transition-colors relative py-1 hover:border-b-2 hover:border-[#DFB55D]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Search, Cart & Booking CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block w-48 lg:w-60">
              <input
                type="text"
                placeholder="ابحث عن باقة، خدمة، ضيافة..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#05221F] text-xs text-white placeholder-gray-400 pl-3 pr-9 py-2 rounded-full border border-[#C69D4A]/40 focus:outline-none focus:border-[#DFB55D] focus:ring-1 focus:ring-[#DFB55D]"
              />
              <Search className="w-4 h-4 text-[#DFB55D] absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Mobile Search Icon Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-full text-gray-200 hover:text-[#DFB55D] hover:bg-[#0C3E3A]"
              aria-label="البحث"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#0C3E3A] hover:bg-[#11534E] text-[#DFB55D] border border-[#C69D4A]/40 transition-all duration-200 hover:scale-105"
              aria-label="الحجز"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C69D4A] text-[#083B38] font-bold text-[11px] rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Booking CTA Button */}
            <a
              href="#packages"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full font-bold text-xs gold-gradient-bg text-[#083B38] hover:shadow-lg transition-transform duration-200 hover:scale-105"
            >
              احجز موعدك الآن
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-[#0C3E3A]"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="md:hidden px-4 pt-2 pb-3 bg-[#05221F] border-t border-[#C69D4A]/30">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن باقة، خدمة، ضيافة..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full bg-[#083B38] text-sm text-white placeholder-gray-400 pl-3 pr-9 py-2 rounded-full border border-[#C69D4A]/60 focus:outline-none focus:border-[#DFB55D]"
              />
              <Search className="w-4 h-4 text-[#DFB55D] absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#083B38] border-b border-[#C69D4A]/40 px-6 py-4 space-y-3 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                if (link.onClick) link.onClick();
                setMobileMenuOpen(false);
              }}
              className="block text-base font-medium text-gray-100 hover:text-[#DFB55D] py-2 border-b border-[#0C3E3A]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#0C3E3A] text-[#DFB55D] font-bold border border-[#C69D4A]/40"
              dir="ltr"
            >
              <Phone className="w-4 h-4" />
              <span>اتصال: {BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg font-bold text-sm gold-gradient-bg text-[#083B38]"
            >
              استعراض الباقات والحجز
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
