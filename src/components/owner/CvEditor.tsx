import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useGeminiTranslate } from '../../hooks/useGeminiTranslate';
import { FileText, Save, Eye, Sparkles } from 'lucide-react';
import { DebouncedInput, DebouncedTextarea } from './DebouncedInput';
import FileUploader from './FileUploader';

export const CvEditor: React.FC = () => {
  const { portfolioData, updateData, language } = useLanguage();
  const cv = portfolioData.cv;
  const { translateToEnglish, isTranslating, streamingText } = useGeminiTranslate();
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleAutoTranslate = async (field: 'summary') => {
    const indoText = cv[field]?.id;
    if (!indoText) return;

    setActiveField(field);
    const translated = await translateToEnglish(indoText);
    if (translated) {
      handleBilingualChange(field, 'en', translated);
    }
    setActiveField(null);
  };

  const handleBilingualChange = (field: 'summary', lang: 'id' | 'en', value: string) => {
    updateData({
      ...portfolioData,
      cv: {
        ...portfolioData.cv,
        summary: {
          ...portfolioData.cv.summary,
          [lang]: value,
        },
      },
    });
  };

  const handleChange = (field: keyof typeof cv, value: any) => {
    updateData({
      ...portfolioData,
      cv: {
        ...portfolioData.cv,
        [field]: value,
      },
    });
  };



  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#F3C6D3]/40 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#D99AAF]" />
            {language === 'en' ? 'Official Document Management (CV)' : 'Manajemen Dokumen Resmi (CV)'}
          </h3>
          <p className="text-xs text-[#2D292B]/70 mt-1 leading-relaxed">
            {language === 'en' ? 'Manage the distribution of your curriculum vitae. Upload the latest publicly downloadable PDF file and provide a visual preview to facilitate recruiters.' : 'Kelola pembagian dokumen riwayat hidup Anda. Unggah berkas PDF terbaru yang dapat diunduh publik dan sediakan pratinjau visual untuk mempermudah rekruter.'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* PDF File Link & Upload */}
        <div className="space-y-2">
          <FileUploader
            label="Tautan / File PDF CV (Download Target)"
            currentFileUrl={cv.fileUrl}
            folderCategory="cv"
            acceptedTypes="application/pdf"
            onUploadSuccess={(url) => handleChange('fileUrl', url)}
            onClear={() => handleChange('fileUrl', '')}
          />
        </div>

        {/* Updated Date */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
            Tanggal Pembaruan Dokumen (Updated Date)
          </label>
          <DebouncedInput
            type="text"
            value={cv.updatedDate}
            onDebouncedChange={(val) => handleChange('updatedDate', val)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
            placeholder="Mei 2024 / May 2024"
          />
        </div>

        {/* Preview Image Upload & URL */}
        <div className="space-y-3 pt-4 border-t border-[#F3C6D3]/30">
          <FileUploader
            label="Gambar Pratinjau Lembar CV (Preview Image)"
            currentFileUrl={cv.previewImageUrl}
            folderCategory="cv"
            acceptedTypes="image/*"
            onUploadSuccess={(url) => handleChange('previewImageUrl', url)}
            onClear={() => handleChange('previewImageUrl', '')}
          />
        </div>

        {/* Summary Text Bilingual */}
        <div className="space-y-3 pt-4 border-t border-[#F3C6D3]/30">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
              Ringkasan Profil CV (Summary Text)
            </label>
            <button
              onClick={() => handleAutoTranslate('summary')}
              disabled={isTranslating || !cv.summary.id}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50"
            >
              <Sparkles className={`w-3 h-3 ${isTranslating ? 'animate-pulse' : ''}`} />
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                Bahasa Indonesia (ID)
              </span>
              <DebouncedTextarea
                rows={4}
                value={cv.summary.id}
                onDebouncedChange={(val) => handleBilingualChange('summary', 'id', val)}
                className="w-full p-3 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                English (ENG)
              </span>
              <DebouncedTextarea
                rows={4}
                value={activeField === 'summary' ? streamingText || cv.summary.en : cv.summary.en}
                onDebouncedChange={(val) => handleBilingualChange('summary', 'en', val)}
                className="w-full p-3 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

