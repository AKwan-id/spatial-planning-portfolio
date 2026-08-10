import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ProfileData } from '../../types/portfolio';
import { Save, RefreshCw, User, Image, MapPin, GraduationCap, Sparkles } from 'lucide-react';

export const AboutEditor: React.FC = () => {
  const { portfolioData, updateData } = useLanguage();
  const profile = portfolioData.profile;

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
            Kelola Profil "About Me"
          </h3>
          <p className="text-xs text-[#2D292B]/70">
            Edit nama lengkap, foto portrait, bidang keahlian, dan pengantar umum.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Full Name & Portrait URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F3C6D3] text-sm text-[#2D292B] focus:outline-none focus:border-[#D99AAF]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
              URL Foto Portrait
            </label>
            <input
              type="text"
              value={profile.portraitUrl}
              onChange={(e) => handleChange('portraitUrl', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F3C6D3] text-sm text-[#2D292B] focus:outline-none focus:border-[#D99AAF]"
            />
          </div>
        </div>

        {/* Professional Field Bilingual */}
        <div className="space-y-3 pt-4 border-t border-[#F3C6D3]/30">
          <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
            Bidang Keahlian / Professional Field
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                Bahasa Indonesia (ID)
              </span>
              <input
                type="text"
                value={profile.professionalField.id}
                onChange={(e) => handleBilingualChange('professionalField', 'id', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                English (ENG)
              </span>
              <input
                type="text"
                value={profile.professionalField.en}
                onChange={(e) => handleBilingualChange('professionalField', 'en', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
          </div>
        </div>

        {/* Short Intro Bilingual */}
        <div className="space-y-3 pt-4 border-t border-[#F3C6D3]/30">
          <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
            Pengantar Singkat / Introduction
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                Bahasa Indonesia (ID)
              </span>
              <textarea
                rows={3}
                value={profile.shortIntro.id}
                onChange={(e) => handleBilingualChange('shortIntro', 'id', e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                English (ENG)
              </span>
              <textarea
                rows={3}
                value={profile.shortIntro.en}
                onChange={(e) => handleBilingualChange('shortIntro', 'en', e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
          </div>
        </div>

        {/* Education, Career Interest & Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F3C6D3]/30">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
              Pendidikan (ID / ENG)
            </label>
            <input
              type="text"
              value={profile.education.id}
              onChange={(e) => handleBilingualChange('education', 'id', e.target.value)}
              placeholder="Indonesian"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs mb-2"
            />
            <input
              type="text"
              value={profile.education.en}
              onChange={(e) => handleBilingualChange('education', 'en', e.target.value)}
              placeholder="English"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
              Minat Karir (ID / ENG)
            </label>
            <input
              type="text"
              value={profile.careerInterest.id}
              onChange={(e) => handleBilingualChange('careerInterest', 'id', e.target.value)}
              placeholder="Indonesian"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs mb-2"
            />
            <input
              type="text"
              value={profile.careerInterest.en}
              onChange={(e) => handleBilingualChange('careerInterest', 'en', e.target.value)}
              placeholder="English"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
              Lokasi Domisili (ID / ENG)
            </label>
            <input
              type="text"
              value={profile.location?.id || ''}
              onChange={(e) => handleBilingualChange('location', 'id', e.target.value)}
              placeholder="Indonesian"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs mb-2"
            />
            <input
              type="text"
              value={profile.location?.en || ''}
              onChange={(e) => handleBilingualChange('location', 'en', e.target.value)}
              placeholder="English"
              className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
