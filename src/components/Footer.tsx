import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  ArrowUp,
  MessageSquare
} from 'lucide-react';
import { CLINIC_CONFIG, SERVICES_LIST } from '../clinicData';
import clinicLogo from '../assets/images/Green and White Modern Medical Logo.jpeg';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0B1F3A] text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Philosophy (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={clinicLogo}
                alt="Nagpal Clinic & Ultrasound"
                className="w-11 h-11 rounded-xl object-contain bg-white p-0.5 ring-1 ring-slate-700 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white leading-tight">
                  Nagpal Clinic
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F8B8D]">
                  & Ultrasound
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Dedicated to compassionate clinical consultations and accurate diagnostic ultrasound services in a modern, private healthcare environment.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                <Shield className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>Patient Trust & Ethical Practice</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#hero" className="hover:text-[#0F8B8D] transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#0F8B8D] transition-colors">About Clinic</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0F8B8D] transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#ultrasound" className="hover:text-[#0F8B8D] transition-colors">Ultrasound Imaging</a>
              </li>
              <li>
                <a href="#why-choose" className="hover:text-[#0F8B8D] transition-colors">Why Patients Choose Us</a>
              </li>
              <li>
                <a href="#doctor" className="hover:text-[#0F8B8D] transition-colors">Doctor Profile</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#0F8B8D] transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#0F8B8D] transition-colors">Contact & Timings</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Diagnostic Services (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {SERVICES_LIST.map((srv) => (
                <li key={srv.id}>
                  <a href="#services" className="hover:text-[#0F8B8D] transition-colors line-clamp-1">
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Hours (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Contact & Hours
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0F8B8D] shrink-0 mt-0.5" />
                <span>{CLINIC_CONFIG.address.fullFormatted}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0F8B8D] shrink-0" />
                <div className="flex flex-wrap items-center gap-x-2">
                  <a href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-white" title="Clinic Landline">
                    {CLINIC_CONFIG.phoneDisplay}
                  </a>
                  <span className="text-slate-500">/</span>
                  <a href={`tel:${(CLINIC_CONFIG.mobilePhone || '9911121054').replace(/\s+/g, '')}`} className="hover:text-white" title="Mobile Helpline">
                    {CLINIC_CONFIG.mobileDisplay || '+91 99111 21054'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(CLINIC_CONFIG.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp: {CLINIC_CONFIG.whatsappDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0F8B8D] shrink-0" />
                <span>{CLINIC_CONFIG.email}</span>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#0F8B8D] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-200">Mon – Sat: 9:00 AM – 8:30 PM</p>
                    <p className="text-[11px] text-rose-400 font-medium">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Medical Disclaimer */}
        <div className="py-6 border-b border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Medical Notice:</strong> The information provided on this website is for general informational and appointment scheduling purposes only and does not constitute professional medical advice, diagnosis, or treatment. Always consult a qualified medical practitioner regarding any medical condition or diagnostic investigation.
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Nagpal Clinic & Ultrasound. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
