import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SkillCategoryType, SkillItem } from '../../types/portfolio';
import { Cpu, Search, Check, Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { SparklingText } from './SparklingText';


export const SkillsSection: React.FC = () => {
  const { language, portfolioData, t } = useLanguage();
  const { skills } = portfolioData;

  const [activeCategory, setActiveCategory] = useState<SkillCategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const categories: { id: SkillCategoryType | 'all'; label: { id: string; en: string } }[] = [
    { id: 'all', label: { id: 'SEMUA KEAHLIAN', en: 'ALL SKILLS' } },
    { id: 'spatial_planning', label: { id: 'SPASIAL & PERENCANAAN', en: 'SPATIAL & PLANNING' } },
    { id: 'technical_design', label: { id: 'TEKNIK & DESAIN', en: 'TECHNICAL & DESIGN' } },
    { id: 'productivity', label: { id: 'PRODUKTIVITAS & DOKUMEN', en: 'PRODUCTIVITY & DOCS' } },
    { id: 'other', label: { id: 'LAINNYA', en: 'OTHER' } },
  ];

  const visibleSkills = skills
    .filter((s) => s.visible !== false && s.status !== 'HIDDEN' && s.status !== 'DRAFT')
    .sort((a, b) => a.order - b.order);

  if (visibleSkills.length === 0) {
    return null;
  }

  const filteredSkills = visibleSkills.filter((s) => {
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    const descText = t(s.description, '');
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 8);

  return (
    <section id="skills" data-section="skills" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAA3B8]/40 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FCEDF1]/90 backdrop-blur-md border border-[#EAA3B8]/60 shadow-sm text-[10px] sm:text-xs font-bold tracking-widest text-[#8B3A52] uppercase">
              <Cpu className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'KOMPETENSI' : 'COMPETENCIES'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2D292B] drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]">
              <SparklingText>
                {language === 'id' ? 'Keahlian & Kompetensi' : 'Skills & Expertise'}
              </SparklingText>
            </h2>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="glass-surface rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#EAA3B8]/40">
          {/* Categories Pill Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowAll(false);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${activeCategory === cat.id
                  ? 'bg-[#2D292B] text-[#FDF2F5] shadow-xs'
                  : 'bg-[#FCEDF1]/90 text-[#2D292B]/80 hover:bg-[#F3C6D3]/60 hover:text-[#2D292B]'
                  }`}
              >
                {cat.label[language]}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#8B3A52] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'id' ? 'Cari keahlian...' : 'Search skills...'}
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-[#FCEDF1] border border-[#EAA3B8]/60 text-xs text-[#2D292B] placeholder:text-[#2D292B]/50 focus:outline-none focus:border-[#8B3A52]"
            />
          </div>
        </div>

        {/* Skills Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedSkills.map((skill) => (
            <div
              key={skill.id}
              className={`glass-surface rounded-2xl p-5 border transition-all duration-300 hover:border-[#8B3A52] group ${skill.featured ? 'border-[#EAA3B8] bg-[#FCEDF1]/90' : 'border-[#EAA3B8]/30'
                }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] font-mono tracking-wider font-bold text-[#8B3A52] uppercase px-2 py-0.5 rounded bg-[#FCEDF1]">
                  {t(skill.categoryLabel)}
                </span>
                {skill.featured && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-[#8B3A52] bg-[#F3C6D3]/40 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              <h3 className="font-serif text-lg font-bold text-[#2D292B] group-hover:text-[#8B3A52] transition-colors leading-snug">
                {skill.name}
              </h3>

              {skill.description && (
                <p className="text-xs text-[#2D292B]/80 mt-2 leading-relaxed font-normal">
                  {t(skill.description)}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Expand / Collapse Control if skills list is long */}
        {filteredSkills.length > 8 && (
          <div className="text-center pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FCEDF1] border border-[#EAA3B8] text-[#2D292B] text-xs font-semibold tracking-wider uppercase hover:bg-[#2D292B] hover:text-[#FDF2F5] hover:border-[#2D292B] transition-all cursor-pointer"
            >
              <span>
                {showAll
                  ? language === 'id'
                    ? 'Tampilkan Lebih Sedikit'
                    : 'Show Less'
                  : language === 'id'
                    ? `Lihat Semua Keahlian (${filteredSkills.length})`
                    : `View All Skills (${filteredSkills.length})`}
              </span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
