import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, MessageSquare } from 'lucide-react';
import { CLINIC_CONFIG } from '../clinicData';
import clinicLogo from '../assets/images/Green and White Modern Medical Logo.jpeg';

interface NavbarProps {
  onOpenBookingModal: (preselectedService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Ultrasound', href: '#ultrasound' },
    { name: 'Doctors', href: '#doctor' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Branding */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Nagpal Clinic and Ultrasound - Home"
          >
            <img
              src={clinicLogo}
              alt="Nagpal Clinic & Ultrasound Official Logo"
              className="h-[46px] sm:h-[48px] w-auto object-contain rounded-md shrink-0 shadow-xs group-hover:scale-102 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col leading-none">
              <span className="text-[#0B1F3A] font-extrabold text-lg sm:text-xl tracking-tight uppercase font-['Plus_Jakarta_Sans',sans-serif]">
                Nagpal Clinic
              </span>
              <span className="text-[#0F8B8D] text-xs font-semibold tracking-wider mt-0.5 uppercase">
                & Ultrasound
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[13px] font-semibold text-[#172033] uppercase tracking-wide">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#0F8B8D] transition-colors py-1 hover:border-b-2 hover:border-[#0F8B8D]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Call Clinic Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F8B8D]" />
              <span>Helpline</span>
            </a>

            <button
              type="button"
              id="nav-book-btn"
              onClick={() => onOpenBookingModal()}
              className="bg-[#0F8B8D] text-white px-6 py-2.5 sm:py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#0F8B8D]/20 hover:bg-[#0D7A7C] transition-all cursor-pointer active:scale-98"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              id="mobile-book-header-btn"
              onClick={() => onOpenBookingModal()}
              className="px-3.5 py-1.5 bg-[#0F8B8D] text-white text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 shadow-md shadow-[#0F8B8D]/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0B1F3A] hover:bg-slate-100 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#0B1F3A]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#0F8B8D] hover:bg-slate-50 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-2.5 bg-[#0F8B8D] text-white font-semibold rounded-lg text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
                className="py-2 px-3 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>Call Clinic</span>
              </a>
              <a
                href={`https://wa.me/${CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(CLINIC_CONFIG.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-3 bg-[#25D366]/10 text-[#128C7E] text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
