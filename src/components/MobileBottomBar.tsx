import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { CLINIC_CONFIG } from '../clinicData';

interface MobileBottomBarProps {
  onOpenBookingModal: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBookingModal }) => {
  return (
    <div
      id="mobile-sticky-bottom-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-100 px-3 py-2.5 shadow-2xl"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
          id="mobile-sticky-call-btn"
          className="flex-1 py-2.5 px-2 bg-slate-100 active:bg-slate-200 text-[#0B1F3A] rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors"
          aria-label="Call clinic phone"
        >
          <Phone className="w-4 h-4 text-[#0F8B8D]" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(CLINIC_CONFIG.whatsappDefaultMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-sticky-whatsapp-btn"
          className="flex-1 py-2.5 px-2 bg-[#25D366]/15 active:bg-[#25D366]/25 text-[#128C7E] rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>

        {/* Book Appointment CTA Button */}
        <button
          type="button"
          id="mobile-sticky-book-btn"
          onClick={onOpenBookingModal}
          className="flex-1 py-2.5 px-2 bg-[#0F8B8D] active:bg-[#0d797b] text-white rounded-xl flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          aria-label="Open booking dialog"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Slot</span>
        </button>
      </div>
    </div>
  );
};
