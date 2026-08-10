import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SakuraIcon } from './SakuraIcon';

interface NavbarProps {
  // Public navbar has no owner button
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { language, setLanguage, portfolioData, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const { projects, selectedWork, skills, experience, certificates, siteSettings } = portfolioData;

  const brandSettings = siteSettings?.brandSettings || {
    brandText: 'ANP',
    portfolioLabel: { id: 'PORTOFOLIO', en: 'PORTFOLIO' },
    showIcon: true,
  };

  // Check if sections have active published records (Section U requirement)
  const hasFeatured = projects.some((p) => p.featured && p.visible !== false && p.status !== 'HIDDEN' && p.status !== 'DRAFT') ||
    selectedWork.some((s) => s.visible !== false && s.status !== 'HIDDEN' && s.status !== 'DRAFT');

  const hasSkills = skills.some((s) => s.visible !== false && s.status !== 'HIDDEN' && s.status !== 'DRAFT');
  const hasProjects = projects.some((p) => p.visible !== false && p.status !== 'HIDDEN' && p.status !== 'DRAFT');
  const hasExperience = experience.some((e) => e.visible !== false && e.status !== 'HIDDEN' && e.status !== 'DRAFT');
  const hasCertificates = certificates.some((c) => c.visible !== false && c.status !== 'HIDDEN' && c.status !== 'DRAFT');

  const allNavItems = [
    { id: 'about', label: { id: 'TENTANG', en: 'ABOUT' }, visible: true },
    { id: 'selected-work', label: { id: 'KARYA PILIHAN', en: 'SELECTED WORK' }, visible: hasFeatured },
    { id: 'skills', label: { id: 'KEAHLIAN', en: 'SKILLS' }, visible: hasSkills },
    { id: 'projects', label: { id: 'PROYEK', en: 'PROJECTS' }, visible: hasProjects },
    { id: 'experience', label: { id: 'PENGALAMAN', en: 'EXPERIENCE' }, visible: hasExperience },
    { id: 'certificates', label: { id: 'SERTIFIKAT', en: 'CERTIFICATES' }, visible: hasCertificates },
    { id: 'cv', label: { id: 'CV', en: 'CV' }, visible: true },
    { id: 'contact', label: { id: 'KONTAK', en: 'CONTACT' }, visible: true },
  ];

  const navItems = allNavItems.filter((item) => item.visible);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentBrandText = brandSettings.brandText || 'ANP';
  const currentPortfolioLabel = t(brandSettings.portfolioLabel, language === 'id' ? 'PORTOFOLIO' : 'PORTFOLIO');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 py-3">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-surface shadow-sm py-2.5 px-4 sm:px-6'
            : 'bg-[#FDF2F5]/85 backdrop-blur-md border border-[#EAA3B8]/40 py-3.5 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo / Unified Brand Unit: [MINIMAL SAKURA ICON] ANP PORTOFOLIO / ANP PORTFOLIO */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}
            className="flex items-center gap-2 group text-left cursor-pointer select-none"
          >
            {brandSettings.showIcon !== false && (
              <div className="w-9 h-9 rounded-xl bg-[#FCEDF1] border border-[#EAA3B8] flex items-center justify-center text-[#8B3A52] group-hover:bg-[#8B3A52] group-hover:text-[#FDF2F5] transition-all shrink-0 p-1">
                <SakuraIcon className="w-7 h-7 text-current" />
              </div>
            )}
            <div className="flex items-center gap-2 font-serif font-bold text-base sm:text-lg text-[#2D292B] leading-none tracking-tight uppercase">
              <span>{currentBrandText}</span>
              <span>{currentPortfolioLabel}</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2D292B] text-[#FDF2F5] shadow-xs'
                      : 'text-[#2D292B]/80 hover:text-[#2D292B] hover:bg-[#F5D5E0]'
                  }`}
                >
                  {item.label[language]}
                </button>
              );
            })}
          </nav>

          {/* Controls: Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <div className="flex items-center bg-[#FCEDF1] border border-[#EAA3B8]/60 rounded-full p-0.5 text-xs font-medium">
              <button
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  language === 'id'
                    ? 'bg-[#8B3A52] text-[#FDF2F5] font-bold shadow-xs'
                    : 'text-[#2D292B]/70 hover:text-[#2D292B]'
                }`}
                aria-label="Switch to Indonesian"
              >
                ID
              </button>
              <span className="text-[#8B3A52]/40 text-[10px]">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#8B3A52] text-[#FDF2F5] font-bold shadow-xs'
                    : 'text-[#2D292B]/70 hover:text-[#2D292B]'
                }`}
                aria-label="Switch to English"
              >
                ENG
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#2D292B] hover:bg-[#FCEDF1] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto glass-surface rounded-2xl p-4 shadow-lg border border-[#EAA3B8]/40 animate-fadeIn">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-semibold tracking-wide transition-all ${
                  activeSection === item.id
                    ? 'bg-[#2D292B] text-[#FDF2F5]'
                    : 'text-[#2D292B] hover:bg-[#F5D5E0]'
                }`}
              >
                <span>{item.label[language]}</span>
                <ArrowUpRight className="w-4 h-4 opacity-40" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
