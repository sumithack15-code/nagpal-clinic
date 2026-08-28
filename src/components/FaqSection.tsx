import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS, CLINIC_CONFIG } from '../clinicData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Ultrasound', 'Appointments', 'Reports'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((f) => f.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#DDF5F4] text-[#0F8B8D] text-[11px] font-bold uppercase tracking-wider mb-3">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Clear Answers for Your Visit
          </h2>
          <p className="mt-3.5 text-base text-slate-600 leading-relaxed font-normal">
            Find answers regarding clinic consultations, ultrasound scan preparations, timings, and appointment policies.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0F8B8D] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#0F8B8D]/50 bg-[#F8FAFC] shadow-sm'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#0B1F3A]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#0F8B8D] text-white rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Desk Card */}
        <div className="mt-10 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
              <HelpCircle className="w-5 h-5 text-[#0F8B8D]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#0B1F3A]">
                Have a question not listed here?
              </p>
              <p className="text-xs text-slate-500">
                Our front desk team is happy to assist with specific inquiries.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${CLINIC_CONFIG.phone.replace(/\s+/g, '')}`}
              className="px-4 py-2.5 bg-white text-slate-800 text-xs font-bold uppercase tracking-wider rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F8B8D]" />
              <span>Call Helpline</span>
            </a>
            <a
              href={`https://wa.me/${CLINIC_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(CLINIC_CONFIG.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
