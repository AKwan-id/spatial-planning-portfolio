import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ExperienceType } from '../../types/portfolio';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { SparklingText } from './SparklingText';


export const ExperienceSection: React.FC = () => {
  const { language, portfolioData, t } = useLanguage();
  const { experience } = portfolioData;

  const [activeType, setActiveType] = useState<ExperienceType | 'all'>('all');

  const filterTabs: { id: ExperienceType | 'all'; label: { id: string; en: string } }[] = [
    { id: 'all', label: { id: 'SEMUA PENGALAMAN', en: 'ALL EXPERIENCE' } },
    { id: 'work', label: { id: 'KERJA', en: 'WORK' } },
    { id: 'internship', label: { id: 'MAGANG', en: 'INTERNSHIP' } },
    { id: 'organization', label: { id: 'ORGANISASI & KKN', en: 'ORGANIZATION & FIELD' } },
  ];

  const visibleExp = experience
    .filter((exp) => exp.visible !== false && exp.status !== 'HIDDEN' && exp.status !== 'DRAFT')
    .sort((a, b) => a.order - b.order);

  if (visibleExp.length === 0) {
    return null;
  }

  const filteredExp = visibleExp.filter((exp) => {
    if (activeType === 'all') return true;
    return exp.type === activeType;
  });

  return (
    <section id="experience" data-section="experience" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAA3B8]/40 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FCEDF1]/90 backdrop-blur-md border border-[#EAA3B8]/60 shadow-sm text-[10px] sm:text-xs font-bold tracking-widest text-[#8B3A52] uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'REKAM JEJAK' : 'REKORD'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2D292B] drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]">
              <SparklingText>
                {language === 'id' ? 'Pengalaman & Rekam Jejak' : 'Professional Experience'}
              </SparklingText>
            </h2>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${activeType === tab.id
                ? 'bg-[#2D292B] text-[#FDF2F5] shadow-xs'
                : 'bg-[#FCEDF1] text-[#2D292B]/80 border border-[#EAA3B8]/50 hover:bg-[#F3C6D3]/50'
                }`}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>

        {/* Editorial Timeline */}
        <div className="relative border-l-2 border-[#EAA3B8]/60 ml-3 sm:ml-6 space-y-10 pl-6 sm:pl-10">
          {filteredExp.map((exp, idx) => {
            const bulletList = exp.bullets
              ? exp.bullets[language] || exp.bullets.en || exp.bullets.id
              : [];

            return (
              <div key={exp.id} className="relative group">
                {/* Timeline Node Icon */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#FDF2F5] border-2 border-[#8B3A52] flex items-center justify-center group-hover:bg-[#8B3A52] transition-colors shadow-2xs">
                  <div className="w-2 h-2 rounded-full bg-[#8B3A52] group-hover:bg-[#FDF2F5]" />
                </div>

                {/* Content Card */}
                <div className="glass-surface rounded-3xl p-6 sm:p-8 border border-[#EAA3B8]/40 space-y-4 hover:border-[#8B3A52] transition-colors shadow-2xs">

                  {/* Top Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAA3B8]/30 pb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FCEDF1] text-[#8B3A52] border border-[#EAA3B8]/50">
                      {t(exp.typeLabel)}
                    </span>

                    <div className="flex items-center gap-4 text-xs text-[#2D292B]/70 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#8B3A52]" />
                        <span>{t(exp.period)}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#8B3A52]" />
                          <span>{t(exp.location)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Role Title & Organization */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-[#2D292B]">
                      {t(exp.role)}
                    </h3>
                    <p className="text-sm font-semibold text-[#8B3A52]">
                      {t(exp.organization)}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#2D292B]/80 leading-relaxed font-normal">
                    {t(exp.description)}
                  </p>

                  {/* Bullet Highlights */}
                  {bulletList && bulletList.length > 0 && (
                    <ul className="space-y-2 pt-2 text-xs sm:text-sm text-[#2D292B]/85">
                      {bulletList.map((item, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#8B3A52] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
