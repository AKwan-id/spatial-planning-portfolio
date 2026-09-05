import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useGeminiTranslate } from '../../hooks/useGeminiTranslate';
import { FileText, Save, Upload, Download, Eye, Sparkles } from 'lucide-react';
import { DebouncedInput, DebouncedTextarea } from './DebouncedInput';

export const CvEditor: React.FC = () => {
  const { portfolioData, updateData } = useLanguage();
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

  const handlePreviewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('previewImageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('fileUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#F3C6D3]/40 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B] flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#D99AAF]" />
            Kelola Dokumen CV (Curriculum Vitae)
          </h3>
          <p className="text-xs text-[#2D292B]/70 mt-1">
            Unggah file PDF CV terbaru, atur gambar pratinjau lembar CV, serta tanggal pembaruan.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* PDF File Link & Upload */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
            Tautan / File PDF CV (Download Target)
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <DebouncedInput
              type="text"
              value={cv.fileUrl}
              onDebouncedChange={(val) => handleChange('fileUrl', val)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F3C6D3] text-xs font-mono text-[#2D292B]"
              placeholder="https://..."
            />
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold shrink-0 cursor-pointer hover:bg-[#D99AAF] transition-colors">
              <Upload className="w-4 h-4" />
              <span>Unggah File PDF Lokal</span>
              <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" />
            </label>
          </div>
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
          <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
            Gambar Pratinjau Lembar CV (Preview Image)
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-36 h-48 rounded-xl overflow-hidden bg-white border border-[#F3C6D3] shadow-xs shrink-0">
              <img src={cv.previewImageUrl} alt="CV Preview" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3 flex-1 w-full">
              <DebouncedInput
                type="text"
                value={cv.previewImageUrl}
                onDebouncedChange={(val) => handleChange('previewImageUrl', val)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
                placeholder="URL Gambar Pratinjau..."
              />
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] text-[#2D292B] text-xs font-semibold cursor-pointer hover:bg-[#D99AAF] hover:text-white transition-colors">
                <Upload className="w-4 h-4" />
                <span>Unggah Foto Pratinjau CV</span>
                <input type="file" accept="image/*" onChange={handlePreviewUpload} className="hidden" />
              </label>
            </div>
          </div>
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

