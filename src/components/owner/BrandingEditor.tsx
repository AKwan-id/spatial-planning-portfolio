import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useGeminiTranslate } from '../../hooks/useGeminiTranslate';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import { SakuraIcon } from '../public/SakuraIcon';
import { DebouncedInput } from './DebouncedInput';

export const BrandingEditor: React.FC = () => {
  const { portfolioData, updateData } = useLanguage();
  const siteSettings = portfolioData.siteSettings;
  const { translateToEnglish, isTranslating } = useGeminiTranslate();

  const handleTranslateLabel = async () => {
    const indoText = brandSettings.portfolioLabel.id;
    if (!indoText) return;
    const translated = await translateToEnglish(indoText);
    if (translated) {
      handleLabelChange('en', translated);
    }
  };

  const handleTranslateFooter = async () => {
    const indoText = siteSettings.footerText.id;
    if (!indoText) return;
    const translated = await translateToEnglish(indoText);
    if (translated) {
      handleFooterChange('en', translated);
    }
  };

  const brandSettings = siteSettings?.brandSettings || {
    brandText: 'ANP',
    portfolioLabel: { id: 'PORTOFOLIO', en: 'PORTFOLIO' },
    showIcon: true,
  };

  const handleBrandTextChange = (text: string) => {
    updateData({
      ...portfolioData,
      siteSettings: {
        ...portfolioData.siteSettings,
        brandSettings: {
          ...brandSettings,
          brandText: text,
        },
      },
    });
  };

  const handleLabelChange = (lang: 'id' | 'en', value: string) => {
    updateData({
      ...portfolioData,
      siteSettings: {
        ...portfolioData.siteSettings,
        brandSettings: {
          ...brandSettings,
          portfolioLabel: {
            ...brandSettings.portfolioLabel,
            [lang]: value,
          },
        },
      },
    });
  };

  const handleToggleIcon = () => {
    updateData({
      ...portfolioData,
      siteSettings: {
        ...portfolioData.siteSettings,
        brandSettings: {
          ...brandSettings,
          showIcon: brandSettings.showIcon === false ? true : false,
        },
      },
    });
  };

  const handleFooterChange = (lang: 'id' | 'en', value: string) => {
    updateData({
      ...portfolioData,
      siteSettings: {
        ...portfolioData.siteSettings,
        footerText: {
          ...portfolioData.siteSettings.footerText,
          [lang]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#F3C6D3]/40 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#D99AAF]" />
            Kelola Identitas Branding (Navbar & Footer Branding)
          </h3>
          <p className="text-xs text-[#2D292B]/70 mt-1">
            Atur unit branding di sudut kiri navigasi (Logo Sakura + Inisial + Label Portofolio) serta teks hak cipta pada footer.
          </p>
        </div>
      </div>

      {/* Live Branding Preview */}
      <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99AAF]">
          Pratinjau Navigasi Branding Utama (Public Live Unit)
        </span>
        <div className="p-4 rounded-xl bg-[#FFF9F7] border border-[#F3C6D3]/40 flex items-center gap-2">
          {brandSettings.showIcon !== false && (
            <div className="w-9 h-9 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] flex items-center justify-center text-[#D99AAF] p-1">
              <SakuraIcon className="w-7 h-7" />
            </div>
          )}
          <div className="flex items-center gap-2 font-serif font-bold text-base sm:text-lg text-[#2D292B] uppercase tracking-tight">
            <span>{brandSettings.brandText || 'ANP'}</span>
            <span>{brandSettings.portfolioLabel.id}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Brand Text Input */}
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-2">
          <label className="text-xs font-bold uppercase text-[#2D292B]">
            Teks Inisial Brand (Default: ANP)
          </label>
          <DebouncedInput
            type="text"
            value={brandSettings.brandText}
            onDebouncedChange={(val) => handleBrandTextChange(val)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#F3C6D3] text-sm font-serif font-bold text-[#2D292B]"
          />
        </div>

        {/* Portfolio Label Bilingual */}
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-[#2D292B]">
              Label Sub-Branding (Bilingual: ID / ENG)
            </label>
            <button
              onClick={handleTranslateLabel}
              disabled={isTranslating || !brandSettings.portfolioLabel.id}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50"
            >
              <Sparkles className={`w-3 h-3 ${isTranslating ? 'animate-pulse' : ''}`} />
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                Bahasa Indonesia (Default: PORTOFOLIO)
              </span>
              <DebouncedInput
                type="text"
                value={brandSettings.portfolioLabel.id}
                onDebouncedChange={(val) => handleLabelChange('id', val)}
                className="w-full px-4 py-2 rounded-xl border border-[#F3C6D3] text-xs font-semibold text-[#2D292B]"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">
                English (Default: PORTFOLIO)
              </span>
              <DebouncedInput
                type="text"
                value={brandSettings.portfolioLabel.en}
                onDebouncedChange={(val) => handleLabelChange('en', val)}
                className="w-full px-4 py-2 rounded-xl border border-[#F3C6D3] text-xs font-semibold text-[#2D292B]"
              />
            </div>
          </div>
        </div>

        {/* Show / Hide Sakura Icon Toggle */}
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase text-[#2D292B]">
              Tampilkan Icon Sakura di Navigasi
            </h4>
            <p className="text-[11px] text-[#2D292B]/70">
              Ikon Sakura Pink berbentuk geometris minimalis untuk melengkapi visual identity.
            </p>
          </div>
          <button
            onClick={handleToggleIcon}
            className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer flex items-center gap-1.5 ${brandSettings.showIcon !== false
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-slate-100 text-slate-600'
              }`}
          >
            {brandSettings.showIcon !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{brandSettings.showIcon !== false ? 'Tampil' : 'Sembunyi'}</span>
          </button>
        </div>

        {/* Footer Text */}
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-[#2D292B]">
              Teks Bidang Keahlian di Footer (Footer Professional Subtitle)
            </label>
            <button
              onClick={handleTranslateFooter}
              disabled={isTranslating || !siteSettings.footerText.id}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50"
            >
              <Sparkles className={`w-3 h-3 ${isTranslating ? 'animate-pulse' : ''}`} />
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">ID</span>
              <DebouncedInput
                type="text"
                value={siteSettings.footerText.id}
                onDebouncedChange={(val) => handleFooterChange('id', val)}
                className="w-full px-4 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">ENG</span>
              <DebouncedInput
                type="text"
                value={siteSettings.footerText.en}
                onDebouncedChange={(val) => handleFooterChange('en', val)}
                className="w-full px-4 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
