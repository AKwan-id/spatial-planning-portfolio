import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowDownRight, MapPin, GraduationCap, Compass, Sparkles } from 'lucide-react';
import { SparklingText } from './SparklingText';

export const AboutSection: React.FC = () => {
  const { language, portfolioData, t } = useLanguage();
  const { profile } = portfolioData;

  const scrollToSelectedWork = () => {
    const el = document.getElementById('selected-work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const hasEducation = !!t(profile.education);
  const hasCareer = !!t(profile.careerInterest);
  const hasLocation = !!t(profile.location);
  const hasAnyInfo = hasEducation || hasCareer || hasLocation;

  return (
    <section
      id="about"
      data-section="about"
      className="min-h-screen pt-28 sm:pt-36 pb-20 px-4 sm:px-8 relative flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Editorial Container with glass transparency allowing background landscape to show through */}
        <div className="glass-surface rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-sm">

          {/* Subtle Decorative Architectural Grid Line */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#F3C6D3]/20 via-[#F8F1F2]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">

            {/* Left Column: Name, Field, Introduction & Info (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8 z-10">

              <div className="space-y-6">
                {/* Refined Editorial Name Typography */}
                <div className="pt-1">
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.92] space-y-1">
                    <SparklingText wrapperClass="block text-[#2D292B]">ANNISA NUR</SparklingText>
                    <SparklingText wrapperClass="block text-[#8B3A52] italic mt-1">PRABAWA</SparklingText>
                  </h1>
                </div>

                {/* Professional Field */}
                {t(profile.professionalField) && (
                  <div className="pt-1">
                    <div className="text-base sm:text-xl font-serif font-medium text-[#2D292B] border-l-2 border-[#8B3A52] pl-3.5 py-0.5 headline-shadow">
                      {t(profile.professionalField)}
                    </div>
                  </div>
                )}

                {/* Short Introduction */}
                {t(profile.shortIntro) && (
                  <p className="text-base sm:text-lg text-[#2D292B]/85 leading-relaxed max-w-2xl font-normal pt-2">
                    {t(profile.shortIntro)}
                  </p>
                )}
              </div>

              {/* Lightweight Supporting Info (Education, Career Interest, Location) */}
              {hasAnyInfo && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#EAA3B8]/40">
                  {hasEducation && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8B3A52]">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{language === 'id' ? 'Pendidikan' : 'Education'}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#2D292B]/80 font-medium">
                        {t(profile.education)}
                      </p>
                    </div>
                  )}

                  {hasCareer && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8B3A52]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{language === 'id' ? 'Minat Karir' : 'Career Focus'}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#2D292B]/80 font-medium">
                        {t(profile.careerInterest)}
                      </p>
                    </div>
                  )}

                  {hasLocation && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8B3A52]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{language === 'id' ? 'Lokasi' : 'Location'}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#2D292B]/80 font-medium">
                        {t(profile.location)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* CTA to Selected Work */}
              <div className="pt-2">
                <button
                  onClick={scrollToSelectedWork}
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#2D292B] text-[#FDF2F5] text-xs font-semibold tracking-wider uppercase hover:bg-[#8B3A52] transition-all duration-300 shadow-sm cursor-pointer group"
                >
                  <span>{language === 'id' ? 'Lihat Karya Pilihan' : 'Explore Selected Work'}</span>
                  <ArrowDownRight className="w-4 h-4 text-[#F3C6D3] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Column: Large Vertical Editorial Portrait Photo (5 cols) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-none h-[420px] sm:h-[500px] lg:h-[580px] rounded-2xl overflow-hidden border border-[#EAA3B8]/60 shadow-md group">
                <img
                  src={profile.portraitUrl}
                  alt={t(profile.portraitAlt, 'Annisa Nur Prabawa Portrait')}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 filter contrast-[1.02]"
                  loading="eager"
                  onError={(e) => {
                    // Safe fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800';
                  }}
                />

                {/* Subtle Editorial Frame Layer */}
                <div className="absolute inset-0 border-8 border-[#FDF2F5]/30 pointer-events-none rounded-2xl" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
