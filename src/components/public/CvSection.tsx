import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FileText, Download, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SparklingText } from './SparklingText';


interface CvSectionProps {
  onViewCv: () => void;
}

export const CvSection: React.FC<CvSectionProps> = ({ onViewCv }) => {
  const { language, portfolioData, t } = useLanguage();
  const { cv } = portfolioData;

  const handleDownloadCv = () => {
    if (cv.fileUrl && cv.fileUrl !== '#') {
      window.open(cv.fileUrl, '_blank');
    } else {
      // Elegant fallback simulation alert
      onViewCv();
    }
  };

  return (
    <section id="cv" data-section="cv" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAA3B8]/40 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#8B3A52] uppercase">
              <FileText className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'DOKUMEN RESMI' : 'RESUME'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2D292B]">
              <SparklingText>
                Curriculum Vitae
              </SparklingText>
            </h2>
          </div>
        </div>

        {/* Minimal Document Card */}
        <div className="glass-surface rounded-3xl p-8 sm:p-12 border border-[#EAA3B8]/40 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left: CV Visual Preview Box (5 cols) */}
            <div className="lg:col-span-5 relative group cursor-pointer" onClick={onViewCv}>
              <div className="relative aspect-3/4 max-w-xs mx-auto rounded-2xl overflow-hidden bg-[#FDF2F5] border-2 border-[#EAA3B8] shadow-md group-hover:border-[#8B3A52] transition-all duration-300">
                <img
                  src={cv.previewImageUrl}
                  alt="CV Preview"
                  className="w-full h-full object-cover object-top opacity-90 group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800';
                  }}
                />

                {/* Overlay Eye */}
                <div className="absolute inset-0 bg-[#2D292B]/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[#FDF2F5] gap-2 p-4 text-center">
                  <Eye className="w-8 h-8 text-[#F3C6D3]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {language === 'id' ? 'Klik Untuk Melihat Document' : 'Click To View Document'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Info & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-6">

              <div className="space-y-3">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D292B]">
                  {language === 'id' ? 'CV ANNISA NUR PRABAWA' : 'ANNISA NUR PRABAWA CV'}
                </h3>

                <p className="text-sm text-[#2D292B]/80 leading-relaxed font-normal">
                  {language === 'id' ? 'Lihat atau unduh CV terbaru.' : 'View or download the latest CV.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onViewCv}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D292B] text-[#FDF2F5] text-xs font-semibold tracking-wider uppercase hover:bg-[#8B3A52] transition-all shadow-2xs cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#F3C6D3]" />
                  <span>{language === 'id' ? 'TINJAU CV' : 'VIEW CV'}</span>
                </button>

                <button
                  onClick={handleDownloadCv}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FCEDF1] border border-[#8B3A52] text-[#2D292B] text-xs font-semibold tracking-wider uppercase hover:bg-[#2D292B] hover:text-[#FDF2F5] hover:border-[#2D292B] transition-all shadow-2xs cursor-pointer group/btn"
                >
                  <Download className="w-4 h-4 text-[#8B3A52] group-hover/btn:text-[#F3C6D3] transition-colors" />
                  <span>{language === 'id' ? 'UNDUH CV' : 'DOWNLOAD CV'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
