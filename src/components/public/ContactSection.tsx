import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, Linkedin, Phone, MapPin, Send, Compass, ArrowUpRight } from 'lucide-react';
import { SparklingText } from './SparklingText';


export const ContactSection: React.FC = () => {
  const { language, portfolioData, t } = useLanguage();
  const { contact, siteSettings } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const vis = contact.fieldVisibility || { email: true, linkedin: true, phone: true, location: true };

  return (
    <section id="contact" data-section="contact" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Cinematic Closing Banner */}
        <div className="glass-surface-dark rounded-3xl p-8 sm:p-14 lg:p-16 text-[#FFF9F7] relative overflow-hidden border border-[#D99AAF]/30 shadow-xl">

          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D99AAF]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF9F7] leading-tight">
              
                {language === 'id' ? 'Mari Terhubung & Berkolaborasi' : 'Let’s Connect & Collaborate'}
              
            </h2>

            {/* Direct Contact Cards (Email, LinkedIn, Phone ONLY) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">

              {/* Email Card */}
              {vis.email !== false && (
                <a
                  href={`mailto:${contact.email}`}
                  className="p-4 rounded-2xl bg-[#FFF9F7]/10 hover:bg-[#FFF9F7]/20 border border-[#F3C6D3]/20 transition-all flex items-center justify-between group min-w-0"
                >
                  <div className="flex items-center gap-3 min-w-0 overflow-hidden pr-2">
                    <div className="w-10 h-10 rounded-xl bg-[#D99AAF]/20 flex items-center justify-center text-[#F3C6D3] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#F3C6D3] block">
                        Email
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#FFF9F7] block whitespace-nowrap overflow-hidden">
                        {contact.email}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#F3C6D3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              )}

              {/* LinkedIn Card */}
              {vis.linkedin !== false && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#FFF9F7]/10 hover:bg-[#FFF9F7]/20 border border-[#F3C6D3]/20 transition-all flex items-center justify-between group min-w-0"
                >
                  <div className="flex items-center gap-3 min-w-0 overflow-hidden pr-2">
                    <div className="w-10 h-10 rounded-xl bg-[#D99AAF]/20 flex items-center justify-center text-[#F3C6D3] shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#F3C6D3] block">
                        LinkedIn
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#FFF9F7] block whitespace-nowrap overflow-hidden">
                        {contact.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '') || 'Annisa Nur Prabawa'}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#F3C6D3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              )}

              {/* Phone Card (WhatsApp or Phone Call) */}
              {vis.phone !== false && (() => {
                const isWhatsapp = contact.phoneAction !== 'phone_call';
                const cleanDigits = contact.phone.replace(/[^0-9]/g, '');
                const waNumber = cleanDigits.startsWith('0') ? '62' + cleanDigits.slice(1) : cleanDigits;
                const phoneHref = isWhatsapp
                  ? `https://wa.me/${waNumber}`
                  : `tel:${contact.phone.replace(/[^0-9+]/g, '')}`;

                return (
                  <a
                    href={phoneHref}
                    target={isWhatsapp ? "_blank" : undefined}
                    rel={isWhatsapp ? "noopener noreferrer" : undefined}
                    className="p-4 rounded-2xl bg-[#FFF9F7]/10 hover:bg-[#FFF9F7]/20 border border-[#F3C6D3]/20 transition-all flex items-center justify-between group min-w-0"
                  >
                    <div className="flex items-center gap-3 min-w-0 overflow-hidden pr-2">
                      <div className="w-10 h-10 rounded-xl bg-[#D99AAF]/20 flex items-center justify-center text-[#F3C6D3] shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#F3C6D3] block">
                          {isWhatsapp ? 'WhatsApp' : (language === 'id' ? 'Telepon' : 'Phone')}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#FFF9F7] block whitespace-nowrap overflow-hidden">
                          {contact.phone}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#F3C6D3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  </a>
                );
              })()}
            </div>

          </div>
        </div>

        {/* Minimal Footer with Dynamic Year */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#EAA3B8]/40 text-xs text-[#2D292B]/70 font-medium text-glow-white">
          <div className="text-center sm:text-left">
            <span>© {new Date().getFullYear()} {siteSettings?.title || 'Annisa Nur Prabawa'}</span>
            {siteSettings?.footerText && (
              <>
                <span className="hidden sm:inline mx-2">—</span>
                <span className="block sm:inline mt-1 sm:mt-0">{t(siteSettings.footerText)}</span>
              </>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="text-xs text-[#8B3A52] font-semibold hover:text-[#2D292B] transition-colors cursor-pointer"
          >
            {language === 'id' ? 'Kembali ke Atas ↑' : 'Back to Top ↑'}
          </button>
        </div>

      </div>
    </section>
  );
};
