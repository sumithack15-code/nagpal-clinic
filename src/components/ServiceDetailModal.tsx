import React, { useEffect } from 'react';
import { X, CheckCircle2, Clock, Droplets, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B1F3A]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#0B1F3A] text-white px-6 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#DDF5F4] font-bold">
              {service.category} Service Details
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {service.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Overview */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
              Clinical Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Key Advantages */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              What This Service Includes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#0F8B8D] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Instructions */}
          {service.preparationGuide && service.preparationGuide.length > 0 && (
            <div className="bg-[#F8FAFC] border-l-4 border-[#0F8B8D] rounded-r-2xl p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B1F3A]">
                <Droplets className="w-4 h-4 text-[#0F8B8D]" />
                <span>Patient Preparation & Guidelines</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                {service.preparationGuide.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F8B8D] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Duration & Reassurance */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0F8B8D]" />
              <span>Estimated duration: {service.estimatedDuration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0F8B8D]" />
              <span>Private sanitized consultation room</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 px-6 sm:px-8 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close Details
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F8B8D] hover:bg-[#0d797b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service</span>
          </button>
        </div>

      </div>
    </div>
  );
};
