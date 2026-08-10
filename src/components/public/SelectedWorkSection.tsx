import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SelectedWorkItem, ProjectItem } from '../../types/portfolio';
import { ArrowUpRight, Layers, Calendar, Tag } from 'lucide-react';
import { SparklingText } from './SparklingText';


interface SelectedWorkSectionProps {
  onSelectProject: (item: SelectedWorkItem | ProjectItem) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const { language, portfolioData, t } = useLanguage();
  const { projects, selectedWork } = portfolioData;

  // Derive featured works from projects array
  const featuredProjects = projects
    .filter((p) => p.featured && p.visible !== false && p.status !== 'HIDDEN' && p.status !== 'DRAFT')
    .sort((a, b) => (a.featuredOrder ?? a.order) - (b.featuredOrder ?? b.order));

  // Fallback to selectedWork array if no projects have featured flag set
  const displayWorks = featuredProjects.length > 0 ? featuredProjects : selectedWork.filter(item => item.visible !== false);

  if (displayWorks.length === 0) {
    return null;
  }

  return (
    <section
      id="selected-work"
      data-section="selected-work"
      className="py-24 px-4 sm:px-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAA3B8]/40 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#8B3A52] uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'KARYA UTAMA' : 'HIGHLIGHTS'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2D292B]">
              <SparklingText>
                {language === 'id' ? 'Karya Pilihan' : 'Selected Work'}
              </SparklingText>
            </h2>
          </div>
        </div>

        {/* Selected Work Editorial Showcase */}
        <div className="space-y-12">
          {displayWorks.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className="glass-surface rounded-3xl p-6 sm:p-10 transition-all duration-300 hover:shadow-md group border border-[#EAA3B8]/40 overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                  {/* Visual Cover (7 cols) */}
                  <div className={`lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-[#EAA3B8]/40 bg-[#F5D5E0]">
                      <img
                        src={item.coverImage}
                        alt={t(item.title)}
                        className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D292B]/30 via-transparent to-transparent opacity-60" />

                      {/* Year Badge */}
                      {item.year && (
                        <div className="absolute top-4 left-4 bg-[#FDF2F5]/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#2D292B] border border-[#EAA3B8]/50 flex items-center gap-1.5 shadow-2xs">
                          <Calendar className="w-3 h-3 text-[#8B3A52]" />
                          <span>{item.year}</span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4 bg-[#2D292B]/90 text-[#FDF2F5] backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium tracking-wide">
                        {t(item.category)}
                      </div>
                    </div>
                  </div>

                  {/* Text Details (5 cols) */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>

                    <div className="space-y-3">
                      <span className="text-xs font-mono tracking-widest text-[#8B3A52] uppercase block font-semibold">
                        0{index + 1} &mdash; {t(item.category)}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D292B] leading-tight group-hover:text-[#8B3A52] transition-colors">
                        {t(item.title)}
                      </h3>
                      <p className="text-sm text-[#2D292B]/80 leading-relaxed font-normal">
                        {t(item.shortDescription)}
                      </p>
                    </div>

                    {/* Role & Tools */}
                    <div className="space-y-4 pt-2 border-t border-[#EAA3B8]/30">
                      {item.role && (
                        <div className="text-xs text-[#2D292B]/70 font-medium">
                          <span className="text-[#8B3A52] font-semibold">{language === 'id' ? 'Peran:' : 'Role:'}</span>{' '}
                          {t(item.role)}
                        </div>
                      )}

                      {/* Tools Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.tools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-[#FCEDF1] border border-[#EAA3B8]/50 text-[#2D292B]/85 text-[11px] font-medium"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => onSelectProject(item)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FCEDF1] border border-[#8B3A52] text-[#2D292B] text-xs font-semibold tracking-wider uppercase hover:bg-[#2D292B] hover:text-[#FDF2F5] hover:border-[#2D292B] transition-all duration-300 shadow-2xs cursor-pointer group/btn"
                      >
                        <span>{language === 'id' ? 'Lihat Detail Proyek' : 'View Project Details'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#8B3A52] group-hover/btn:text-[#F3C6D3] transition-colors" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
