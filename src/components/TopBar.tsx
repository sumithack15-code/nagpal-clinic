import React from 'react';
import { Phone, Clock, MapPin, FileSpreadsheet } from 'lucide-react';
import { CLINIC_CONFIG } from '../clinicData';

interface TopBarProps {
  onOpenSheetsModal?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenSheetsModal }) => {
  return (
    <div id="top-announcement-bar" className="bg-[#0B1F3A] text-white py-2 px-4 sm:px-8 border-b border-slate-800 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Tagline */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F8B8D]" />
          <span className="text-slate-200">
            Trusted Healthcare • Advanced Ultrasound • Compassionate Care
          </span>
        </div>

        {/* Right: Quick Timings, Direct Helpline & Sheets Feed */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-5 text-slate-300 text-[11px] tracking-normal font-medium normal-case">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-[#0F8B8D]" />
            <span>Mon – Sat: 9:00 AM – 8:30 PM (Sun: Closed)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#0F8B8D]" />
            <a
              href={CLINIC_CONFIG.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors"
            >
              Get Directions
            </a>
          </div>

          {onOpenSheetsModal && (
            <button
              type="button"
              onClick={onOpenSheetsModal}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer text-[10px] font-semibold"
              title="Google Sheets Appointment Feed"
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
              <span>Sheets Sync</span>
            </button>
          )}

          <div className="flex items-center gap-2 font-bold text-white tracking-normal">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#0F8B8D]" />
              <a
                href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                className="hover:text-[#0F8B8D] transition-colors"
                title="Call Clinic Landline"
              >
                {CLINIC_CONFIG.phoneDisplay}
              </a>
            </div>
            <span className="text-slate-600">/</span>
            <a
              href={`tel:${(CLINIC_CONFIG.mobilePhone || '9911121054').replace(/\s+/g, '')}`}
              className="hover:text-[#0F8B8D] transition-colors"
              title="Call Mobile Helpline"
            >
              {CLINIC_CONFIG.mobileDisplay || '+91 99111 21054'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

