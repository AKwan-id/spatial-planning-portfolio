import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useGeminiTranslate } from '../../hooks/useGeminiTranslate';
import { ProfileData } from '../../types/portfolio';
import { Save, RefreshCw, User, Image, MapPin, GraduationCap, Sparkles } from 'lucide-react';
import { DebouncedInput, DebouncedTextarea } from './DebouncedInput';
import FileUploader from './FileUploader';


export const AboutEditor: React.FC = () => {
  const { portfolioData, updateData, language } = useLanguage();
  const profile = portfolioData.profile;
  const { translateToEnglish, isTranslating, streamingText } = useGeminiTranslate();
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleAutoTranslate = async (field: 'professionalField' | 'shortIntro' | 'education' | 'careerInterest' | 'location') => {
    const indoText = profile[field]?.id;
    if (!indoText) return;

    setActiveField(field);
    const translated = await translateToEnglish(indoText);
    if (translated) {
      handleBilingualChange(field, 'en', translated);
    }
    setActiveField(null);
  };

  const handleChange = (field: keyof ProfileData, value: any) => {
    const updated = {
      ...portfolioData,
      profile: {
        ...portfolioData.profile,
        [field]: value,
      },
    };
    updateData(updated);
  };

  const handleBilingualChange = (
    field: 'professionalField' | 'shortIntro' | 'education' | 'careerInterest' | 'location',
    lang: 'id' | 'en',
    value: string
  ) => {
    const updated = {
      ...portfolioData,
      profile: {
        ...portfolioData.profile,
        [field]: {
          ...portfolioData.profile[field],
          [lang]: value,
        },
      },
    };
    updateData(updated);
  };

  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#F3C6D3]/40 pb-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B]">
            {language === 'en' ? 'Manage "About Me" Profile' : 'Kelola Profil "About Me"'}
          </h3>
          <p className="text-xs text-[#2D292B]/70">
            {language === 'en' ? 'Edit full name, portrait photo, professional field, and general introduction.' : 'Edit nama lengkap, foto portrait, bidang keahlian, dan pengantar umum.'}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Full Name & Portrait URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
              {language === 'en' ? 'Full Name' : 'Nama Lengkap'}
            </label>
            <DebouncedInput
              type="text"
              value={profile.fullName}
              onDebouncedChange={(val) => handleChange('fullName', val)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F3C6D3] text-sm text-[#2D292B] focus:outline-none focus:border-[#D99AAF]"
            />
          </div>

          <div className="space-y-2">
            <FileUploader
              label={language === 'en' ? 'Portrait Photo URL' : 'URL Foto Portrait'}
              currentFileUrl={profile.portraitUrl}
              folderCategory="profile"
              acceptedTypes="image/*"
              onUploadSuccess={(url) => handleChange('portraitUrl', url)}
              onClear={() => handleChange('portraitUrl', '')}
            />
          </div>
        </div>

        {/* Professional Field Bilingual */}
        <div className="space-y-3 pt-4 border-t border-[#F3C6D3]/30">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
              {language === 'en' ? 'Professional Field' : 'Bidang Keahlian / Professional Field'}
            </label>
            <button
              onClick={() => handleAutoTranslate('professionalField')}
              disabled={isTranslating || !profile.professionalField.id}
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
              <DebouncedInput
                type="text"
                value={profile.professionalField.id}
                onDebouncedChange={(val) => handleBilingualChange('professionalField', 'id', val)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                English (ENG)
              </span>
              <DebouncedInput
                type="text"
                value={activeField === 'professionalField' ? streamingText : profile.professionalField.en}
                onDebouncedChange={(val) => handleBilingualChange('professionalField', 'en', val)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
          </div>
        </div>

        {/* Short Intro Bilingual */}
        <div className="space-y-3 pt-4 border-t border-[#F3C6D3]/30">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
              Pengantar Singkat / Introduction
            </label>
            <button
              onClick={() => handleAutoTranslate('shortIntro')}
              disabled={isTranslating || !profile.shortIntro.id}
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
                rows={3}
                value={profile.shortIntro.id}
                onDebouncedChange={(val) => handleBilingualChange('shortIntro', 'id', val)}
                className="w-full p-3 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                English (ENG)
              </span>
              <DebouncedTextarea
                rows={3}
                value={activeField === 'shortIntro' ? streamingText : profile.shortIntro.en}
                onDebouncedChange={(val) => handleBilingualChange('shortIntro', 'en', val)}
                className="w-full p-3 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
          </div>
        </div>

        {/* Education, Career Interest & Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F3C6D3]/30">
          <div className="space-y-2 relative">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
                Pendidikan (ID / ENG)
              </label>
              <button
                onClick={() => handleAutoTranslate('education')}
                disabled={isTranslating || !profile.education.id}
                title="Translate to English"
                className="p-1.5 rounded-full bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isTranslating ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            <DebouncedInput
              type="text"
              value={profile.education.id}
              onDebouncedChange={(val) => handleBilingualChange('education', 'id', val)}
              placeholder="Indonesian"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs mb-2"
            />
            <DebouncedInput
              type="text"
              value={activeField === 'education' ? streamingText : profile.education.en}
              onDebouncedChange={(val) => handleBilingualChange('education', 'en', val)}
              placeholder="English"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs"
            />
          </div>

          <div className="space-y-2 relative">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
                Minat Karir (ID / ENG)
              </label>
              <button
                onClick={() => handleAutoTranslate('careerInterest')}
                disabled={isTranslating || !profile.careerInterest.id}
                title="Translate to English"
                className="p-1.5 rounded-full bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isTranslating ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            <DebouncedInput
              type="text"
              value={profile.careerInterest.id}
              onDebouncedChange={(val) => handleBilingualChange('careerInterest', 'id', val)}
              placeholder="Indonesian"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs mb-2"
            />
            <DebouncedInput
              type="text"
              value={activeField === 'careerInterest' ? streamingText : profile.careerInterest.en}
              onDebouncedChange={(val) => handleBilingualChange('careerInterest', 'en', val)}
              placeholder="English"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs"
            />
          </div>

          <div className="space-y-2 relative">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
                Lokasi Domisili (ID / ENG)
              </label>
              <button
                onClick={() => handleAutoTranslate('location')}
                disabled={isTranslating || !profile.location?.id}
                title="Translate to English"
                className="p-1.5 rounded-full bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isTranslating ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            <DebouncedInput
              type="text"
              value={profile.location?.id || ''}
              onDebouncedChange={(val) => handleBilingualChange('location', 'id', val)}
              placeholder="Indonesian"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs mb-2"
            />
            <DebouncedInput
              type="text"
              value={activeField === 'location' ? (streamingText || profile.location?.en || '') : (profile.location?.en || '')}
              onDebouncedChange={(val) => handleBilingualChange('location', 'en', val)}
              placeholder="English"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
