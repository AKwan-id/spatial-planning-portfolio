import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SkillItem, SkillCategoryConfig, PublicationStatus } from '../../types/portfolio';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Star,
  Cpu,
  Save,
  Tag,
  X,
  Sparkles
} from 'lucide-react';
import { useGeminiTranslate } from '../../hooks/useGeminiTranslate';

export const SkillsEditor: React.FC = () => {
  const { portfolioData, updateData } = useLanguage();
  const { skills, skillCategories } = portfolioData;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SkillItem>>({});
  const [showCatModal, setShowCatModal] = useState(false);
  const [newCat, setNewCat] = useState({ id: '', en: '' });

  const { translateToEnglish, isTranslating, streamingText } = useGeminiTranslate();
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleAutoTranslateDescription = async () => {
    const textToTranslate = formData.description?.id;
    if (!textToTranslate) return;
    setActiveField('description');
    const translated = await translateToEnglish(textToTranslate);
    if (translated) {
      setFormData((p) => ({
        ...p,
        description: { id: p.description?.id || '', en: translated },
      }));
    }
    setActiveField(null);
  };

  const handleAutoTranslateCategory = async () => {
    if (!newCat.id) return;
    setActiveField('newCat');
    const translated = await translateToEnglish(newCat.id);
    if (translated) {
      setNewCat((p) => ({ ...p, en: translated }));
    }
    setActiveField(null);
  };

  const categories: SkillCategoryConfig[] = skillCategories || [
    { id: 'spatial_planning', label: { id: 'SPASIAL & PERENCANAAN', en: 'SPATIAL & PLANNING' } },
    { id: 'technical_design', label: { id: 'TEKNIK & DESAIN', en: 'TECHNICAL & DESIGN' } },
    { id: 'productivity', label: { id: 'PRODUKTIVITAS & DOKUMEN', en: 'PRODUCTIVITY & DOCS' } },
    { id: 'other', label: { id: 'LAINNYA', en: 'OTHER' } },
  ];

  const handleAddNew = () => {
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: 'Nama Keahlian Baru',
      category: categories[0]?.id || 'spatial_planning',
      categoryLabel: categories[0]?.label || { id: 'SPASIAL & PERENCANAAN', en: 'SPATIAL & PLANNING' },
      featured: false,
      order: skills.length + 1,
      visible: true,
      status: 'DRAFT',
      description: { id: 'Penjelasan penggunaan keahlian...', en: 'Explanation of competency application...' },
    };

    updateData({
      ...portfolioData,
      skills: [...skills, newSkill],
    });
    setEditingId(newSkill.id);
    setFormData(newSkill);
  };

  const handleStartEdit = (skill: SkillItem) => {
    setEditingId(skill.id);
    setFormData({ ...skill });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;

    const updatedSkills = skills.map((s) => {
      if (s.id === editingId) {
        return {
          ...s,
          ...formData,
        } as SkillItem;
      }
      return s;
    });

    updateData({
      ...portfolioData,
      skills: updatedSkills,
    });
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus keahlian "${name}"?`)) {
      const updatedSkills = skills.filter((s) => s.id !== id);
      updateData({
        ...portfolioData,
        skills: updatedSkills,
      });
      if (editingId === id) {
        setEditingId(null);
        setFormData({});
      }
    }
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= skills.length) return;

    const updated = [...skills];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((s, idx) => ({ ...s, order: idx + 1 }));

    updateData({
      ...portfolioData,
      skills: reordered,
    });
  };

  const handleAddCategory = () => {
    if (!newCat.id.trim() || !newCat.en.trim()) return;
    const catId = newCat.en.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newCatConfig: SkillCategoryConfig = {
      id: catId,
      label: { id: newCat.id.toUpperCase(), en: newCat.en.toUpperCase() },
    };

    updateData({
      ...portfolioData,
      skillCategories: [...categories, newCatConfig],
    });
    setNewCat({ id: '', en: '' });
  };

  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3C6D3]/40 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B] flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#D99AAF]" />
            Kelola Taksonomi Keahlian (Skills CRUD)
          </h3>
          <p className="text-xs text-[#2D292B]/70 mt-1">
            Tambah, sunting, kelompokkan dalam kategori, serta tandai keahlian prioritas (Featured).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCatModal(!showCatModal)}
            className="px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-[#2D292B] text-xs font-semibold hover:border-[#D99AAF] flex items-center gap-1.5 cursor-pointer"
          >
            <Tag className="w-3.5 h-3.5 text-[#D99AAF]" />
            <span>Kategori Keahlian</span>
          </button>

          <button
            onClick={handleAddNew}
            className="px-4 py-2 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold hover:bg-[#D99AAF] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Keahlian</span>
          </button>
        </div>
      </div>

      {/* Category Manager */}
      {showCatModal && (
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-4 animate-fadeIn">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
            Daftar Kategori Keahlian
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c.id} className="px-3 py-1.5 rounded-lg bg-[#F8F1F2] border border-[#F3C6D3] text-xs font-semibold">
                {c.label.id} ({c.label.en})
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F3C6D3]/30">
            <input
              type="text"
              placeholder="Nama Kategori (ID)"
              value={newCat.id}
              onChange={(e) => setNewCat((p) => ({ ...p, id: e.target.value }))}
              className="px-3 py-1.5 text-xs rounded-lg border border-[#F3C6D3] bg-[#FFF9F7]"
            />
            <input
              type="text"
              placeholder="Category Name (ENG)"
              value={activeField === 'newCat' ? streamingText : newCat.en}
              onChange={(e) => setNewCat((p) => ({ ...p, en: e.target.value }))}
              className="px-3 py-1.5 text-xs rounded-lg border border-[#F3C6D3] bg-[#FFF9F7]"
            />
            <button
              onClick={handleAutoTranslateCategory}
              disabled={isTranslating || !newCat.id}
              className="px-2 py-1.5 rounded-lg bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] disabled:opacity-50 cursor-pointer flex items-center justify-center"
              title="Auto Translate"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isTranslating && activeField === 'newCat' ? 'animate-pulse' : ''}`} />
            </button>
            <button
              onClick={handleAddCategory}
              className="px-3 py-1.5 rounded-lg bg-[#D99AAF] text-[#FFF9F7] text-xs font-bold cursor-pointer hover:bg-[#2D292B]"
            >
              Tambah Kategori
            </button>
          </div>
        </div>
      )}

      {/* Skills Grid/List */}
      <div className="space-y-3">
        {skills.map((skill, idx) => {
          const isEditing = editingId === skill.id;

          return (
            <div
              key={skill.id}
              className={`rounded-2xl border transition-all ${isEditing
                ? 'bg-white border-[#D99AAF] shadow-md p-6 space-y-4'
                : 'bg-white/80 border-[#F3C6D3] p-4 hover:border-[#D99AAF] flex flex-col md:flex-row md:items-center justify-between gap-4'
                }`}
            >
              {!isEditing ? (
                <>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#D99AAF] uppercase px-2 py-0.5 rounded bg-[#F8F1F2]">
                        0{idx + 1} &bull; {skill.category}
                      </span>
                      {skill.featured && (
                        <span className="text-[10px] font-bold text-[#D99AAF] bg-[#F3C6D3]/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> Featured
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${skill.status === 'PUBLISHED' || !skill.status
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                          }`}
                      >
                        {skill.status || 'PUBLISHED'}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-base text-[#2D292B]">{skill.name}</h4>
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
                      disabled={idx === skills.length - 1}
                      className="p-2 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] text-[#2D292B]/70 disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleStartEdit(skill)}
                      className="px-3.5 py-2 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold hover:bg-[#D99AAF] cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id, skill.name)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F3C6D3]/40 pb-3">
                    <h4 className="font-serif text-lg font-bold text-[#2D292B]">
                      Sunting Keahlian #{idx + 1}
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Nama Keahlian</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-bold text-[#2D292B]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Kategori</label>
                      <select
                        value={formData.category || 'spatial_planning'}
                        onChange={(e) => {
                          const catId = e.target.value;
                          const selectedCat = categories.find((c) => c.id === catId);
                          setFormData((p) => ({
                            ...p,
                            category: catId,
                            categoryLabel: selectedCat ? selectedCat.label : { id: catId.toUpperCase(), en: catId.toUpperCase() },
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-semibold text-[#2D292B] bg-white"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label.id} ({c.label.en})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Status Publikasi</label>
                      <select
                        value={formData.status || 'PUBLISHED'}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, status: e.target.value as PublicationStatus }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-semibold text-[#2D292B] bg-white"
                      >
                        <option value="PUBLISHED">PUBLISHED (Tampil)</option>
                        <option value="DRAFT">DRAFT (Sembunyi)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 flex flex-row items-center justify-between border-t border-[#F3C6D3]/30 pt-4">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-[#2D292B]">
                        Keterangan Metodologi / Description
                      </label>
                      <button
                        onClick={handleAutoTranslateDescription}
                        disabled={isTranslating || !formData.description?.id}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Sparkles className={`w-3 h-3 ${isTranslating && activeField === 'description' ? 'animate-pulse' : ''}`} />
                        {isTranslating && activeField === 'description' ? 'Translating...' : 'Translate'}
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Keterangan (ID)</label>
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
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Description (ENG)</label>
                      <textarea
                        rows={2}
                        value={activeField === 'description' ? streamingText : (formData.description?.en || '')}
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

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                      className="w-4 h-4 rounded text-[#D99AAF]"
                    />
                    <label className="text-xs font-bold text-[#2D292B]">Tandai sebagai Keahlian Utama (Featured)</label>
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
