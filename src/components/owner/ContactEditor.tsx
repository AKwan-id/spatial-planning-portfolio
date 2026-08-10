import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, Linkedin, Phone, MapPin, Eye, EyeOff } from 'lucide-react';

export const ContactEditor: React.FC = () => {
  const { portfolioData, updateData } = useLanguage();
  const contact = portfolioData.contact;

  const handleChange = (field: keyof typeof contact, value: any) => {
    updateData({
      ...portfolioData,
      contact: {
        ...portfolioData.contact,
        [field]: value,
      },
    });
  };

  const handleBilingualChange = (
    field: 'location' | 'availabilityStatus',
    lang: 'id' | 'en',
    value: string
  ) => {
    updateData({
      ...portfolioData,
      contact: {
        ...portfolioData.contact,
        [field]: {
          ...portfolioData.contact[field],
          [lang]: value,
        },
      },
    });
  };

  const handleToggleVisibility = (field: 'email' | 'linkedin' | 'phone' | 'location') => {
    const currentVis = contact.fieldVisibility || { email: true, linkedin: true, phone: true, location: true };
    updateData({
      ...portfolioData,
      contact: {
        ...portfolioData.contact,
        fieldVisibility: {
          ...currentVis,
          [field]: !currentVis[field],
        },
      },
    });
  };

  const fieldVis = contact.fieldVisibility || { email: true, linkedin: true, phone: true, location: true };

  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#F3C6D3]/40 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B] flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#D99AAF]" />
            Kelola Informasi Kontak (Contact Info)
          </h3>
          <p className="text-xs text-[#2D292B]/70 mt-1">
            Sunting alamat email profesional, tautan LinkedIn, nomor telepon, serta status ketersediaan rekruitmen.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Email & Field Visibility */}
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-[#2D292B] flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#D99AAF]" /> Email Profesional
            </label>
            <button
              onClick={() => handleToggleVisibility('email')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer flex items-center gap-1 ${
                fieldVis.email ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {fieldVis.email ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{fieldVis.email ? 'Tampil' : 'Sembunyi'}</span>
            </button>
          </div>
          <input
            type="email"
            value={contact.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#F3C6D3] text-xs font-semibold text-[#2D292B]"
          />
        </div>

        {/* LinkedIn URL & Field Visibility */}
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-[#2D292B] flex items-center gap-1.5">
              <Linkedin className="w-4 h-4 text-[#D99AAF]" /> Profil LinkedIn
            </label>
            <button
              onClick={() => handleToggleVisibility('linkedin')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer flex items-center gap-1 ${
                fieldVis.linkedin ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {fieldVis.linkedin ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{fieldVis.linkedin ? 'Tampil' : 'Sembunyi'}</span>
            </button>
          </div>
          <input
            type="text"
            value={contact.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#F3C6D3] text-xs font-semibold text-[#2D292B]"
          />
        </div>

        {/* Phone & Field Visibility */}
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-[#2D292B] flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#D99AAF]" /> Nomor Telepon / WhatsApp
            </label>
            <button
              onClick={() => handleToggleVisibility('phone')}
              className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer flex items-center gap-1 ${
                fieldVis.phone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {fieldVis.phone ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{fieldVis.phone ? 'Tampil' : 'Sembunyi'}</span>
            </button>
          </div>
          <input
            type="text"
            value={contact.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-[#F3C6D3] text-xs font-semibold text-[#2D292B]"
          />

          {/* Phone Action Option */}
          <div className="pt-2 border-t border-[#F3C6D3]/30">
            <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1.5">
              Tipe Aksi Kontak Telepon (Phone Action)
            </span>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 text-xs font-medium text-[#2D292B] cursor-pointer">
                <input
                  type="radio"
                  name="phoneAction"
                  value="whatsapp"
                  checked={contact.phoneAction !== 'phone_call'}
                  onChange={() => handleChange('phoneAction', 'whatsapp')}
                  className="accent-[#D99AAF]"
                />
                <span>WhatsApp (Chat Langsung via wa.me)</span>
              </label>
              <label className="inline-flex items-center gap-2 text-xs font-medium text-[#2D292B] cursor-pointer">
                <input
                  type="radio"
                  name="phoneAction"
                  value="phone_call"
                  checked={contact.phoneAction === 'phone_call'}
                  onChange={() => handleChange('phoneAction', 'phone_call')}
                  className="accent-[#D99AAF]"
                />
                <span>Panggilan Telepon (Panggilan Direct tel:)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Location Bilingual */}
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-3">
          <label className="text-xs font-bold uppercase text-[#2D292B] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D99AAF]" /> Lokasi Domisili (ID / ENG)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={contact.location.id}
              onChange={(e) => handleBilingualChange('location', 'id', e.target.value)}
              placeholder="Indonesian"
              className="w-full px-4 py-2 rounded-xl border border-[#F3C6D3] text-xs"
            />
            <input
              type="text"
              value={contact.location.en}
              onChange={(e) => handleBilingualChange('location', 'en', e.target.value)}
              placeholder="English"
              className="w-full px-4 py-2 rounded-xl border border-[#F3C6D3] text-xs"
            />
          </div>
        </div>

        {/* Availability Status Badge */}
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-3">
          <label className="text-xs font-bold uppercase text-[#2D292B]">
            Status Ketersediaan Rekruitmen (Availability Status)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">ID</span>
              <input
                type="text"
                value={contact.availabilityStatus.id}
                onChange={(e) => handleBilingualChange('availabilityStatus', 'id', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#F3C6D3] text-xs"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D99AAF] uppercase block mb-1">ENG</span>
              <input
                type="text"
                value={contact.availabilityStatus.en}
                onChange={(e) => handleBilingualChange('availabilityStatus', 'en', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#F3C6D3] text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
