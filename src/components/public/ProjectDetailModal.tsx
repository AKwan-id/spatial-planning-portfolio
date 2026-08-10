import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ProjectItem, SelectedWorkItem } from '../../types/portfolio';
import { X, Calendar, Tag, Layers, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetailModalProps {
  item: ProjectItem | SelectedWorkItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ item, onClose }) => {
  const { language, t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!item) return null;

  // Determine image gallery array
  const gallery = (item as SelectedWorkItem).galleryImages || (item as ProjectItem).imageGallery || [item.coverImage];
  const fullDesc = (item as SelectedWorkItem).fullDescription || (item as ProjectItem).fullDetails || item.shortDescription || (item as ProjectItem).description;

  const currentImg = gallery[activeImageIndex] || item.coverImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2D292B]/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="glass-surface max-w-4xl w-full rounded-3xl p-6 sm:p-10 border border-[#EAA3B8] shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FCEDF1] text-[#2D292B] hover:bg-[#2D292B] hover:text-[#FDF2F5] transition-colors cursor-pointer"
          aria-label="Close detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-8">
          
          {/* Header Meta */}
          <div className="space-y-2 pr-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8B3A52]">
              <span className="px-3 py-1 rounded-full bg-[#FCEDF1] border border-[#EAA3B8]">
                {t(item.category)}
              </span>
              {item.year && (
                <span className="flex items-center gap-1 font-mono text-[#8B3A52]">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.year}
                </span>
              )}
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D292B]">
              {t(item.title)}
            </h2>

            {item.role && (
              <p className="text-xs sm:text-sm text-[#8B3A52] font-semibold">
                {language === 'id' ? 'Peran:' : 'Role:'} {t(item.role)}
              </p>
            )}
          </div>

          {/* Main Gallery Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-[#F5D5E0] border border-[#EAA3B8]/60 shadow-sm">
              <img
                src={currentImg}
                alt="Project Image"
                className="w-full h-full object-cover object-center"
              />

              {/* Gallery Controls */}
              {gallery.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                    className="p-2 rounded-full bg-[#FDF2F5]/90 text-[#2D292B] hover:bg-[#2D292B] hover:text-[#FDF2F5] transition-colors pointer-events-auto shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                    className="p-2 rounded-full bg-[#FDF2F5]/90 text-[#2D292B] hover:bg-[#2D292B] hover:text-[#FDF2F5] transition-colors pointer-events-auto shadow-sm cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#8B3A52] scale-105' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Text Description */}
          <div className="space-y-4 pt-2 border-t border-[#EAA3B8]/40">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B3A52]">
              {language === 'id' ? 'DESKRIPSI & METODOLOGI' : 'DESCRIPTION & METHODOLOGY'}
            </h4>
            <p className="text-sm sm:text-base text-[#2D292B]/85 leading-relaxed font-normal whitespace-pre-line">
              {t(fullDesc)}
            </p>
          </div>

          {/* Tools & Tech Stack */}
          <div className="space-y-3 pt-2 border-t border-[#EAA3B8]/40">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B3A52]">
              {language === 'id' ? 'PERANGKAT & TEKNOLOGI' : 'TOOLS & TECHNOLOGY'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-[#FCEDF1] border border-[#EAA3B8]/60 text-xs font-medium text-[#2D292B]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#2D292B] text-[#FDF2F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#8B3A52] transition-colors cursor-pointer"
            >
              {language === 'id' ? 'Tutup' : 'Close'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
