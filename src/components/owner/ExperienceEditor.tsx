import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ExperienceItem, ExperienceType, PublicationStatus } from '../../types/portfolio';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Briefcase,
  Save,
  CheckCircle2,
  X
} from 'lucide-react';

export const ExperienceEditor: React.FC = () => {
  const { portfolioData, updateData } = useLanguage();
  const { experience } = portfolioData;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ExperienceItem>>({});

  const experienceTypes: { id: ExperienceType; label: { id: string; en: string } }[] = [
    { id: 'work', label: { id: 'KERJA', en: 'WORK' } },
    { id: 'internship', label: { id: 'MAGANG', en: 'INTERNSHIP' } },
    { id: 'organization', label: { id: 'ORGANISASI', en: 'ORGANIZATION' } },
    { id: 'kkn', label: { id: 'KKN & LAPANGAN', en: 'FIELD & KKN' } },
    { id: 'volunteering', label: { id: 'SUKARELAWAN', en: 'VOLUNTEERING' } },
    { id: 'other', label: { id: 'LAINNYA', en: 'OTHER' } },
  ];

  const handleAddNew = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: { id: 'Peran / Jabatan Baru', en: 'New Role Title' },
      organization: { id: 'Nama Instansi / Perusahaan', en: 'Organization / Company Name' },
      period: { id: '2024 - Sekarang', en: '2024 - Present' },
      type: 'work',
      typeLabel: { id: 'KERJA', en: 'WORK' },
      description: { id: 'Deskripsi singkat tanggung jawab...', en: 'Brief description of responsibilities...' },
      bullets: {
        id: ['Pencapaian atau tugas utama 1', 'Pencapaian atau tugas utama 2'],
        en: ['Key achievement or primary duty 1', 'Key achievement or primary duty 2'],
      },
      location: { id: 'Yogyakarta, Indonesia', en: 'Yogyakarta, Indonesia' },
      order: experience.length + 1,
      visible: true,
      status: 'PUBLISHED',
    };

    updateData({
      ...portfolioData,
      experience: [...experience, newExp],
    });
    setEditingId(newExp.id);
    setFormData(newExp);
  };

  const handleStartEdit = (exp: ExperienceItem) => {
    setEditingId(exp.id);
    setFormData({ ...exp });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;

    const updatedExp = experience.map((e) => {
      if (e.id === editingId) {
        return {
          ...e,
          ...formData,
        } as ExperienceItem;
      }
      return e;
    });

    updateData({
      ...portfolioData,
      experience: updatedExp,
    });
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string, roleTitle: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus pengalaman "${roleTitle}"?`)) {
      const updatedExp = experience.filter((e) => e.id !== id);
      updateData({
        ...portfolioData,
        experience: updatedExp,
      });
      if (editingId === id) {
        setEditingId(null);
        setFormData({});
      }
    }
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experience.length) return;

    const updated = [...experience];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((e, idx) => ({ ...e, order: idx + 1 }));

    updateData({
      ...portfolioData,
      experience: reordered,
    });
  };

  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3C6D3]/40 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B] flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#D99AAF]" />
            Kelola Rekam Jejak (Experience CRUD)
          </h3>
          <p className="text-xs text-[#2D292B]/70 mt-1">
            Tambah riwayat pekerjaan, magang, organisasi, kegiatan lapangan KKN, dan poin-poin capaian.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold hover:bg-[#D99AAF] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Pengalaman Baru</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((exp, idx) => {
          const isEditing = editingId === exp.id;

          return (
            <div
              key={exp.id}
              className={`rounded-2xl border transition-all ${
                isEditing
                  ? 'bg-white border-[#D99AAF] shadow-md p-6 space-y-6'
                  : 'bg-white/80 border-[#F3C6D3] p-4 hover:border-[#D99AAF] flex flex-col md:flex-row md:items-center justify-between gap-4'
              }`}
            >
              {!isEditing ? (
                <>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#D99AAF] uppercase px-2 py-0.5 rounded bg-[#F8F1F2]">
                        0{idx + 1} &bull; {exp.type}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          exp.status === 'PUBLISHED' || !exp.status
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {exp.status || 'PUBLISHED'}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#2D292B]">
                      {exp.role.id} <span className="font-normal text-xs text-[#D99AAF]">@ {exp.organization.id}</span>
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-[#F3C6D3]/30 shrink-0">
                    <button
                      onClick={() => handleMoveOrder(idx, 'up')}
                      disabled={idx === 0}
                      className="p-2 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] text-[#2D292B]/70 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMoveOrder(idx, 'down')}
                      disabled={idx === experience.length - 1}
                      className="p-2 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] text-[#2D292B]/70 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStartEdit(exp)}
                      className="px-3.5 py-2 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold hover:bg-[#D99AAF] cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id, exp.role.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                /* EDIT FORM */
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#F3C6D3]/40 pb-3">
                    <h4 className="font-serif text-lg font-bold text-[#2D292B]">
                      Sunting Pengalaman #{idx + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 cursor-pointer flex items-center gap-1"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan</span>
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setFormData({});
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </div>

                  {/* Role Title ID & ENG */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Peran / Posisi (ID)</label>
                      <input
                        type="text"
                        value={formData.role?.id || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            role: { id: e.target.value, en: p.role?.en || '' },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-bold text-[#2D292B]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Role / Position (ENG)</label>
                      <input
                        type="text"
                        value={formData.role?.en || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            role: { id: p.role?.id || '', en: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-bold text-[#2D292B]"
                      />
                    </div>
                  </div>

                  {/* Organization & Period */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Instansi / Perusahaan (ID)</label>
                      <input
                        type="text"
                        value={formData.organization?.id || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            organization: { id: e.target.value, en: p.organization?.en || e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Periode (ID/ENG)</label>
                      <input
                        type="text"
                        value={formData.period?.id || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            period: { id: e.target.value, en: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Tipe Pengalaman</label>
                      <select
                        value={formData.type || 'work'}
                        onChange={(e) => {
                          const val = e.target.value as ExperienceType;
                          const found = experienceTypes.find((t) => t.id === val);
                          setFormData((p) => ({
                            ...p,
                            type: val,
                            typeLabel: found ? found.label : { id: val.toUpperCase(), en: val.toUpperCase() },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-semibold text-[#2D292B] bg-white"
                      >
                        {experienceTypes.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.label.id} ({t.label.en})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description ID & ENG */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Ringkasan Tugas (ID)</label>
                      <textarea
                        rows={2}
                        value={formData.description?.id || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            description: { id: e.target.value, en: p.description?.en || '' },
                          }))
                        }
                        className="w-full p-2.5 rounded-xl border border-[#F3C6D3] text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Summary (ENG)</label>
                      <textarea
                        rows={2}
                        value={formData.description?.en || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            description: { id: p.description?.id || '', en: e.target.value },
                          }))
                        }
                        className="w-full p-2.5 rounded-xl border border-[#F3C6D3] text-xs"
                      />
                    </div>
                  </div>

                  {/* Bullet Highlights ID & ENG */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#F3C6D3]/30 pt-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">
                        Poin Capaian ID (1 Poin Per Baris)
                      </label>
                      <textarea
                        rows={4}
                        value={formData.bullets?.id?.join('\n') || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            bullets: {
                              id: e.target.value.split('\n').filter(Boolean),
                              en: p.bullets?.en || [],
                            },
                          }))
                        }
                        className="w-full p-2.5 rounded-xl border border-[#F3C6D3] text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">
                        Bullet Points ENG (1 Point Per Line)
                      </label>
                      <textarea
                        rows={4}
                        value={formData.bullets?.en?.join('\n') || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            bullets: {
                              id: p.bullets?.id || [],
                              en: e.target.value.split('\n').filter(Boolean),
                            },
                          }))
                        }
                        className="w-full p-2.5 rounded-xl border border-[#F3C6D3] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
