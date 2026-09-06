import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CertificateItem, PublicationStatus } from '../../types/portfolio';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Award,
  Save,
  Upload,
  ExternalLink,
  Eye,
  Sparkles
} from 'lucide-react';
import FileUploader from './FileUploader';
import { useGeminiTranslate } from '../../hooks/useGeminiTranslate';

export const CertificatesEditor: React.FC = () => {
  const { portfolioData, updateData } = useLanguage();
  const { certificates } = portfolioData;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CertificateItem>>({});

  const { translateToEnglish, isTranslating, streamingText } = useGeminiTranslate();
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleAutoTranslate = async (field: 'title' | 'issuer') => {
    const fieldData = formData[field] as { id?: string; en?: string };
    const textToTranslate = fieldData?.id || '';

    if (!textToTranslate) return;

    setActiveField(field);
    const translated = await translateToEnglish(textToTranslate);
    if (translated) {
      setFormData(p => ({ ...p, [field]: { id: (p[field] as any)?.id || '', en: translated } }));
    }
    setActiveField(null);
  };

  const handleAddNew = () => {
    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      title: { id: 'Nama Sertifikat / Pelatihan Baru', en: 'New Certificate Title' },
      issuer: { id: 'Penerbit Sertifikat', en: 'Issuer Authority' },
      year: new Date().getFullYear().toString(),
      category: { id: 'SERSIFIKASI SIG', en: 'GIS CERTIFICATION' },
      imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
      credentialUrl: '#',
      order: certificates.length + 1,
      visible: true,
      status: 'DRAFT',
    };

    updateData({
      ...portfolioData,
      certificates: [...certificates, newCert],
    });
    setEditingId(newCert.id);
    setFormData(newCert);
  };

  const handleStartEdit = (cert: CertificateItem) => {
    setEditingId(cert.id);
    setFormData({ ...cert });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;

    const updatedCerts = certificates.map((c) => {
      if (c.id === editingId) {
        return {
          ...c,
          ...formData,
        } as CertificateItem;
      }
      return c;
    });

    updateData({
      ...portfolioData,
      certificates: updatedCerts,
    });
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus sertifikat "${title}"?`)) {
      const updatedCerts = certificates.filter((c) => c.id !== id);
      updateData({
        ...portfolioData,
        certificates: updatedCerts,
      });
      if (editingId === id) {
        setEditingId(null);
        setFormData({});
      }
    }
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= certificates.length) return;

    const updated = [...certificates];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((c, idx) => ({ ...c, order: idx + 1 }));

    updateData({
      ...portfolioData,
      certificates: reordered,
    });
  };



  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3C6D3]/40 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B] flex items-center gap-2">
            <Award className="w-6 h-6 text-[#D99AAF]" />
            Kelola Sertifikat & Kredensial (Certificates CRUD)
          </h3>
          <p className="text-xs text-[#2D292B]/70 mt-1">
            Unggah foto/file sertifikat kompetensi, atur link verifikasi resmi, dan tipe lisensi.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold hover:bg-[#D99AAF] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Sertifikat Baru</span>
        </button>
      </div>

      {/* Certificates List */}
      <div className="space-y-4">
        {certificates.map((cert, idx) => {
          const isEditing = editingId === cert.id;

          return (
            <div
              key={cert.id}
              className={`rounded-2xl border transition-all ${isEditing
                ? 'bg-white border-[#D99AAF] shadow-md p-6 space-y-6'
                : 'bg-white/80 border-[#F3C6D3] p-4 hover:border-[#D99AAF] flex flex-col md:flex-row md:items-center justify-between gap-4'
                }`}
            >
              {!isEditing ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-[#F8F1F2] border border-[#F3C6D3] shrink-0">
                      <img src={cert.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#D99AAF] uppercase px-2 py-0.5 rounded bg-[#F8F1F2]">
                          0{idx + 1} &bull; {cert.year}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${cert.status === 'PUBLISHED' || !cert.status
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                            }`}
                        >
                          {cert.status || 'PUBLISHED'}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-base text-[#2D292B]">
                        {cert.title.id} <span className="font-normal text-xs text-[#D99AAF]">({cert.issuer.id})</span>
                      </h4>
                    </div>
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
                      disabled={idx === certificates.length - 1}
                      className="p-2 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] text-[#2D292B]/70 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStartEdit(cert)}
                      className="px-3.5 py-2 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold hover:bg-[#D99AAF] cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id, cert.title.id)}
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
                      Sunting Sertifikat #{idx + 1}
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

                  {/* Title ID & ENG */}
                  <div className="flex flex-row items-center justify-between border-t border-[#F3C6D3]/30 pt-4 pb-1 mt-4 first:mt-0 first:border-0">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#2D292B]">
                      Judul Sertifikat / Certificate Title
                    </label>
                    <button
                      onClick={() => handleAutoTranslate('title')}
                      disabled={isTranslating || !formData.title?.id}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Sparkles className={`w-3 h-3 ${isTranslating && activeField === 'title' ? 'animate-pulse' : ''}`} />
                      {isTranslating && activeField === 'title' ? 'Translating...' : 'Translate'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Judul Sertifikat (ID)</label>
                      <input
                        type="text"
                        value={formData.title?.id || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            title: { id: e.target.value, en: p.title?.en || '' },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-bold text-[#2D292B]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Certificate Title (ENG)</label>
                      <input
                        type="text"
                        value={activeField === 'title' ? streamingText : formData.title?.en || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            title: { id: p.title?.id || '', en: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-bold text-[#2D292B]"
                      />
                    </div>
                  </div>

                  {/* Issuer & Year */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#F3C6D3]/30 pt-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Penerbit (Issuer ID)</label>
                        <button onClick={() => handleAutoTranslate('issuer')} disabled={isTranslating} className="text-[#8B3A52] hover:bg-[#F3C6D3] p-1 rounded-md cursor-pointer"><Sparkles className="w-3 h-3" /></button>
                      </div>
                      <input
                        type="text"
                        value={formData.issuer?.id || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            issuer: { id: e.target.value, en: p.issuer?.en || e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Tahun Terbit</label>
                      <input
                        type="text"
                        value={formData.year || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, year: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Tautan Verifikasi / Berkas PDF</label>
                      <input
                        type="text"
                        value={formData.credentialUrl || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, credentialUrl: e.target.value }))}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B] mb-2"
                      />
                      <FileUploader
                        label=""
                        currentFileUrl=""
                        folderCategory="certificates"
                        acceptedTypes="application/pdf"
                        onUploadSuccess={(url) => setFormData((p) => ({ ...p, credentialUrl: url }))}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Status Publikasi</label>
                      <select
                        value={formData.status || 'PUBLISHED'}
                        onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as PublicationStatus }))}
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-semibold text-[#2D292B] bg-white"
                      >
                        <option value="PUBLISHED">PUBLISHED (Tampil)</option>
                        <option value="DRAFT">DRAFT (Sembunyi)</option>
                        <option value="HIDDEN">HIDDEN (Arsip)</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2 border-t border-[#F3C6D3]/30 pt-4">
                    <FileUploader
                      label="Gambar Sertifikat / Bukti Fisik"
                      currentFileUrl={formData.imageUrl}
                      folderCategory="certificates"
                      acceptedTypes="image/*"
                      onUploadSuccess={(url) => setFormData((p) => ({ ...p, imageUrl: url }))}
                      onClear={() => setFormData((p) => ({ ...p, imageUrl: '' }))}
                    />
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
