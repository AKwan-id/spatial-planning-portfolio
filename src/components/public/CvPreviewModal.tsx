import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Download, ShieldCheck, FileText } from 'lucide-react';

interface CvPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvPreviewModal: React.FC<CvPreviewModalProps> = ({ isOpen, onClose }) => {
  const { language, portfolioData, t } = useLanguage();
  const { cv } = portfolioData;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D292B]/70 backdrop-blur-md animate-fadeIn">
      <div className="glass-surface max-w-3xl w-full rounded-3xl p-6 sm:p-8 border border-[#EAA3B8] shadow-2xl relative my-8 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAA3B8]/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#FCEDF1] text-[#8B3A52]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2D292B]">
                Curriculum Vitae &mdash; Annisa Nur Prabawa
              </h3>
              <p className="text-[11px] text-[#8B3A52] font-semibold">
                {language === 'id' ? `Dokumen Resmi (${cv.updatedDate})` : `Official Document (${cv.updatedDate})`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#FCEDF1] text-[#2D292B] hover:bg-[#2D292B] hover:text-[#FDF2F5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          <div className="relative aspect-3/4 max-w-lg mx-auto rounded-2xl overflow-hidden bg-[#FDF2F5] border border-[#EAA3B8]/60 shadow-md">
            <img
              src={cv.previewImageUrl}
              alt="Curriculum Vitae Document Preview"
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>

          <p className="text-xs text-center text-[#2D292B]/80 font-medium max-w-md mx-auto">
            {t(cv.summary)}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#EAA3B8]/40 flex items-center justify-between">
          <button
            onClick={() => {
              if (cv.fileUrl && cv.fileUrl !== '#') {
                window.open(cv.fileUrl, '_blank');
              } else {
                alert(language === 'id' ? 'File CV simulasi diunduh.' : 'Simulated CV file downloaded.');
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8B3A52] text-[#FDF2F5] text-xs font-semibold hover:bg-[#2D292B] transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{language === 'id' ? 'Unduh PDF' : 'Download PDF'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#2D292B] text-[#FDF2F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#8B3A52] transition-colors cursor-pointer"
          >
            {language === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
