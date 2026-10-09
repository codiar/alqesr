import { useState, useMemo } from 'react';
import { Clock, Check, Sparkles, ArrowLeft, Plus, SearchX } from 'lucide-react';
import { PackageItem, CartItem } from '../types';
import { PACKAGES_DATA } from '../data/packagesData';
import PackageModal from './PackageModal';

interface PackagesSectionProps {
  searchQuery: string;
  onAddToCart: (item: CartItem) => void;
  onInstantBookWhatsApp: (item: CartItem) => void;
}

export default function PackagesSection({
  searchQuery,
  onAddToCart,
  onInstantBookWhatsApp,
}: PackagesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedModalPkg, setSelectedModalPkg] = useState<PackageItem | null>(null);

  const categories = [
    { id: 'all', label: 'جميع الباقات والخدمات' },
    { id: 'wedding', label: 'باقات الزفاف الملكية' },
    { id: 'mashiya', label: 'المشيات والجاهات' },
    { id: 'engagement', label: 'خطوبة وعقد قران' },
    { id: 'events', label: 'تخرج واحتفالات' },
    { id: 'hospitality', label: 'بوكسات الضيافة' },
  ];

  // Filtering
  const filteredPackages = useMemo(() => {
    return PACKAGES_DATA.filter((pkg) => {
      const matchesCategory = activeCategory === 'all' || pkg.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        pkg.name.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q) ||
        pkg.categoryLabel.toLowerCase().includes(q) ||
        pkg.features.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleQuickAdd = (pkg: PackageItem) => {
    const item: CartItem = {
      id: `${pkg.id}-${Date.now()}`,
      packageId: pkg.id,
      name: pkg.name,
      basePrice: pkg.price,
      duration: pkg.duration,
      image: pkg.image,
      quantity: 1,
      selectedAddOns: [],
      totalPrice: pkg.price,
    };
    onAddToCart(item);
  };

  return (
    <section id="packages" className="py-16 sm:py-24 bg-[#FAF7F2] text-[#083B38] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#083B38] text-[#DFB55D] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>باقات وخدمات القصر الملكي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#083B38]">
            خدماتنا الملكية الشاملة
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            اختر الباقة الأنسب لمناسبتك السعيدة، مع كامل التجهيزات الفاخرة
            والخدمات المعتمدة وشفافية الأسعار بدون أي رسوم خفية.
          </p>
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#083B38] text-[#DFB55D] shadow-md border border-[#C69D4A]/50 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#C69D4A]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 right-3 left-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#083B38] text-[#DFB55D] border border-[#C69D4A]/50 shadow">
                      {pkg.categoryLabel}
                    </span>
                    {pkg.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold gold-gradient-bg text-[#083B38] shadow">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  {/* Duration and Bottom Title */}
                  <div className="absolute bottom-3 right-3 left-3 text-right text-white">
                    <div className="flex items-center gap-1 text-[11px] text-[#DFB55D] mb-1 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight drop-shadow">
                      {pkg.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Features Snippet */}
                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <span className="text-[11px] font-bold text-gray-500 block">
                        أبرز ما تشمله الباقة:
                      </span>
                      {pkg.features.slice(0, 4).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                      {pkg.features.length > 4 && (
                        <span className="text-[11px] text-[#8C6D2B] font-semibold block pt-0.5">
                          + والمزيد من الخدمات المشمولة...
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">السعر المعتمد:</span>
                      <span className="text-xl font-black text-[#083B38]">
                        {pkg.priceFormatted}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedModalPkg(pkg)}
                        className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#083B38] text-white hover:bg-[#0C4A45] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>عرض التفاصيل</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleQuickAdd(pkg)}
                        className="w-full py-2.5 rounded-xl font-bold text-xs gold-gradient-bg text-[#083B38] hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#083B38]" />
                        <span>إضافة للحجز</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-8 max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF7F2] text-[#8C6D2B] flex items-center justify-center mx-auto">
              <SearchX className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#083B38]">لم نجد باقة تطابق بحثك</h3>
            <p className="text-xs text-gray-500">
              يرجى تجربة كلمات بحث أخرى مثل (زفاف، مشيات، كوشة، ضيافة) أو تصفح الأقسام مباشرة.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-4 py-2 rounded-xl text-xs font-bold gold-gradient-bg text-[#083B38]"
            >
              عرض جميع الباقات
            </button>
          </div>
        )}
      </div>

      {/* Package Detail Modal */}
      {selectedModalPkg && (
        <PackageModal
          pkg={selectedModalPkg}
          onClose={() => setSelectedModalPkg(null)}
          onAddToCart={onAddToCart}
          onInstantBookWhatsApp={onInstantBookWhatsApp}
        />
      )}
    </section>
  );
}
