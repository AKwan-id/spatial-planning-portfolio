import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ProjectCategoryType, ProjectItem, SelectedWorkItem } from '../../types/portfolio';
import { FolderGit2, Map, Calendar, ArrowUpRight, Layers } from 'lucide-react';
import { SparklingText } from './SparklingText';


interface ProjectsSectionProps {
  onSelectProject: (item: ProjectItem | SelectedWorkItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const { language, portfolioData, t } = useLanguage();
  const { projects } = portfolioData;

  const [activeFilter, setActiveFilter] = useState<ProjectCategoryType>('all');

  const defaultTabs = [
    { id: 'all', label: { id: 'SEMUA PROYEK', en: 'ALL PROJECTS' } },
    { id: 'maps', label: { id: 'PETA', en: 'MAPS' } },
    { id: 'planning', label: { id: 'PERENCANAAN', en: 'PLANNING' } },
    { id: 'research', label: { id: 'RISET', en: 'RESEARCH' } },
    { id: 'other', label: { id: 'LAINNYA', en: 'OTHER' } },
  ];

  const categories = portfolioData.projectCategories
    ? [
      { id: 'all', label: { id: 'SEMUA PROYEK', en: 'ALL PROJECTS' } },
      ...portfolioData.projectCategories.map((c) => ({ id: c.id, label: c.label })),
    ]
    : defaultTabs;

  const visibleProjects = projects
    .filter((p) => p.visible !== false && p.status !== 'HIDDEN' && p.status !== 'DRAFT')
    .sort((a, b) => a.order - b.order);

  if (visibleProjects.length === 0) {
    return null;
  }

  const filteredProjects = visibleProjects.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.category === activeFilter;
  });

  return (
    <section id="projects" data-section="projects" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAA3B8]/40 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FCEDF1]/90 backdrop-blur-md border border-[#EAA3B8]/60 shadow-sm text-[10px] sm:text-xs font-bold tracking-widest text-[#8B3A52] uppercase">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'PORTOFOLIO LENGKAP' : 'GALLERY'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2D292B] text-glow-white">
              <SparklingText>
                {language === 'id' ? 'Galeri Proyek Spasial' : 'Spatial Projects Gallery'}
              </SparklingText>
            </h2>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#EAA3B8]/30 pb-4">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${activeFilter === tab.id
                ? 'bg-[#2D292B] text-[#FDF2F5] shadow-xs'
                : 'bg-[#FCEDF1] text-[#2D292B]/80 border border-[#EAA3B8]/50 hover:bg-[#F3C6D3]/50 hover:text-[#2D292B]'
                }`}
            >
              {tab.label[language]}
            </button>
          ))}
        </div>

        {/* Project Gallery Cards */}
        {filteredProjects.length === 0 ? (
          <div className="glass-surface rounded-2xl p-12 text-center text-[#2D292B]/60 font-medium">
            {language === 'id' ? 'Belum ada proyek dalam kategori ini.' : 'No projects found in this category.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="glass-surface rounded-3xl overflow-hidden border border-[#EAA3B8]/40 hover:border-[#8B3A52] transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image Container */}
                  <div className="relative aspect-16/10 overflow-hidden bg-[#F5D5E0]">
                    <img
                      src={project.coverImage}
                      alt={t(project.title)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000';
                      }}
                    />

                    {/* Category Overlay Tag */}
                    <div className="absolute top-3 left-3 bg-[#FDF2F5]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-[#2D292B] uppercase border border-[#EAA3B8]/60 shadow-2xs">
                      {t(project.categoryLabel)}
                    </div>

                    {project.year && (
                      <div className="absolute top-3 right-3 bg-[#2D292B]/85 text-[#FDF2F5] backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono">
                        {project.year}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#2D292B] group-hover:text-[#8B3A52] transition-colors leading-snug">
                      {t(project.title)}
                    </h3>
                    <p className="text-xs text-[#2D292B]/80 leading-relaxed line-clamp-3">
                      {t(project.description)}
                    </p>
                  </div>
                </div>

                {/* Card Footer Tools */}
                <div className="p-6 pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#EAA3B8]/30">
                    {project.tools.slice(0, 3).map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#FCEDF1] border border-[#EAA3B8]/40 text-[10px] text-[#2D292B]/85 font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                    {project.tools.length > 3 && (
                      <span className="text-[10px] text-[#8B3A52] font-medium px-1">
                        +{project.tools.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-[#8B3A52] group-hover:text-[#2D292B] transition-colors pt-1">
                    <span>{language === 'id' ? 'Detail Proyek' : 'View Details'}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
