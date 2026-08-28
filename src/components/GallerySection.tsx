import React, { useState, useEffect } from 'react';
import { CLINIC_IMAGES } from '../clinicData';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const GallerySection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') {
        setActiveImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % CLINIC_IMAGES.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + CLINIC_IMAGES.length) % CLINIC_IMAGES.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % CLINIC_IMAGES.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + CLINIC_IMAGES.length) % CLINIC_IMAGES.length);
    }
  };

  const activeImage = activeImageIndex !== null ? CLINIC_IMAGES[activeImageIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Clinic Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Inside Nagpal Clinic & Ultrasound
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            Take a look at our clinic and get familiar with our space before your visit.
          </p>
        </div>

        {/* Asymmetric Desktop Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
          
          {/* Featured Image 1: Main Exterior Entrance (Spans 7 cols on Desktop) */}
          <div
            onClick={() => setActiveImageIndex(0)}
            className="lg:col-span-7 group relative h-[320px] sm:h-[380px] lg:h-[430px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-100"
          >
            <img
              src={CLINIC_IMAGES[0].src}
              alt={CLINIC_IMAGES[0].alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
            
            {/* Top Pill */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#0B1F3A] text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                Main Exterior & Signboard
              </span>
            </div>

            {/* Bottom Caption & Expand Icon */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#DDF5F4] font-semibold">Clinic Entrance</p>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{CLINIC_IMAGES[0].title}</h3>
                <p className="text-xs text-slate-200 mt-1 max-w-md hidden sm:block">
                  {CLINIC_IMAGES[0].description}
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-[#0F8B8D] group-hover:text-white transition-colors">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Image 3: Reception Desk (Spans 5 cols on Desktop) */}
          <div
            onClick={() => setActiveImageIndex(2)}
            className="lg:col-span-5 group relative h-[320px] sm:h-[380px] lg:h-[430px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-100"
          >
            <img
              src={CLINIC_IMAGES[2].src}
              alt={CLINIC_IMAGES[2].alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#0B1F3A] text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                Interior Reception
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#DDF5F4] font-semibold">Warm Welcome</p>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{CLINIC_IMAGES[2].title}</h3>
                <p className="text-xs text-slate-200 mt-1 max-w-sm hidden sm:block">
                  {CLINIC_IMAGES[2].description}
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-[#0F8B8D] group-hover:text-white transition-colors">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Image 4: Patient Waiting Lounge (Spans 4 cols on Desktop) */}
          <div
            onClick={() => setActiveImageIndex(3)}
            className="lg:col-span-4 group relative h-[260px] sm:h-[300px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-100"
          >
            <img
              src={CLINIC_IMAGES[3].src}
              alt={CLINIC_IMAGES[3].alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#0B1F3A] text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                Waiting Lounge
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#DDF5F4] font-semibold">Patient Comfort</p>
                <h3 className="text-base font-bold text-white">{CLINIC_IMAGES[3].title}</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-[#0F8B8D] group-hover:text-white transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Image 2: Street Location View (Spans 4 cols on Desktop) */}
          <div
            onClick={() => setActiveImageIndex(1)}
            className="lg:col-span-4 group relative h-[260px] sm:h-[300px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-100"
          >
            <img
              src={CLINIC_IMAGES[1].src}
              alt={CLINIC_IMAGES[1].alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#0B1F3A] text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                Street View
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#DDF5F4] font-semibold">Road Landmark</p>
                <h3 className="text-base font-bold text-white">{CLINIC_IMAGES[1].title}</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-[#0F8B8D] group-hover:text-white transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Image 5: Facade & Building Entry (Spans 4 cols on Desktop) */}
          <div
            onClick={() => setActiveImageIndex(4)}
            className="lg:col-span-4 group relative h-[260px] sm:h-[300px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-100"
          >
            <img
              src={CLINIC_IMAGES[4].src}
              alt={CLINIC_IMAGES[4].alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#0B1F3A] text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                Building Facade
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#DDF5F4] font-semibold">Ground Floor</p>
                <h3 className="text-base font-bold text-white">{CLINIC_IMAGES[4].title}</h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 group-hover:bg-[#0F8B8D] group-hover:text-white transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>

        {/* Gallery Information Banner */}
        <div className="mt-8 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-700">
            <div className="w-8 h-8 rounded-full bg-[#DDF5F4] text-[#0F8B8D] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm font-medium">
              Real photographs of our actual facility in Pocket G, Sarita Vihar. Click on any photo to view full size.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F8B8D] bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            5 Verified Clinic Photos
          </span>
        </div>

      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-50 bg-[#0B1F3A]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Top Bar Controls */}
            <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between text-white z-20">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-wider uppercase backdrop-blur-xs">
                  {activeImageIndex + 1} of {CLINIC_IMAGES.length}
                </span>
                <span className="text-sm font-bold text-slate-200 hidden sm:inline">
                  {activeImage.category}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(null);
                }}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Close lightbox (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Previous Navigation Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#0F8B8D] text-white flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-xs"
              title="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Navigation Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#0F8B8D] text-white flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-xs"
              title="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image Container */}
            <motion.div
              key={activeImage.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[75vh] w-full flex flex-col items-center justify-center relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-2xl border border-white/10"
              />
              
              {/* Bottom Caption Box */}
              <div className="w-full max-w-3xl mt-4 bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center text-white">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {activeImage.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {activeImage.description}
                </p>
                <p className="text-[11px] text-[#DDF5F4] mt-1 italic font-medium">
                  Alt Text: “{activeImage.alt}”
                </p>
              </div>
            </motion.div>

            {/* Bottom Thumbnail Strip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 hidden md:flex">
              {CLINIC_IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                  className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#0F8B8D] scale-110 shadow-md' : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
