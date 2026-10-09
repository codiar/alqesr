import { useState } from 'react';
import { Camera, Eye, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/packagesData';

export default function GallerySection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
      );
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#062321] text-white relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0C3E3A]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#083B38] text-[#DFB55D] text-xs font-bold border border-[#C69D4A]/40">
            <Camera className="w-3.5 h-3.5" />
            <span>معرض الصور الملكية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            جولة بصرية داخل القصر الملكي
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            شاهد روعة التفاصيل المعمارية، إضاءة الأقواس، فخامة المسرح والكوشة،
            وترتيب طاولات الضيافة الملوكية في كربلاء.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer border border-[#C69D4A]/30 bg-[#083B38] shadow-lg hover:shadow-2xl hover:border-[#DFB55D] transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* View Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="p-3 rounded-full bg-[#C69D4A] text-[#083B38] shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-6 h-6" />
                </span>
              </div>

              {/* Text Info at bottom */}
              <div className="absolute bottom-4 right-4 left-4 text-right">
                <span className="text-[11px] font-bold text-[#DFB55D] block mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-white leading-snug drop-shadow">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <button
            onClick={closeLightbox}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-20 cursor-pointer"
            aria-label="السابق"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-20 cursor-pointer"
            aria-label="التالي"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image & Caption */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-center">
            <img
              src={GALLERY_ITEMS[selectedPhotoIndex].image}
              alt={GALLERY_ITEMS[selectedPhotoIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-[#C69D4A]/50"
            />
            <div className="mt-4 text-white max-w-lg">
              <span className="text-xs font-bold text-[#DFB55D]">
                {GALLERY_ITEMS[selectedPhotoIndex].category}
              </span>
              <h3 className="text-lg font-bold">
                {GALLERY_ITEMS[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                {GALLERY_ITEMS[selectedPhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
