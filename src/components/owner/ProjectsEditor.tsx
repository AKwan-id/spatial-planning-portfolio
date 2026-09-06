import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ProjectItem, ProjectCategoryConfig, PublicationStatus } from '../../types/portfolio';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  Star,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Upload,
  X,
  Check,
  Tag,
  Layers,
  FolderGit2,
  Save,
  Sparkles
} from 'lucide-react';
import FileUploader from './FileUploader';
import { useGeminiTranslate } from '../../hooks/useGeminiTranslate';

export const ProjectsEditor: React.FC = () => {
  const { portfolioData, updateData, language } = useLanguage();
  const { projects, projectCategories } = portfolioData;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProjectItem>>({});
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState({ id: '', en: '' });

  const { translateToEnglish, isTranslating, streamingText } = useGeminiTranslate();
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleAutoTranslate = async (field: 'title' | 'description' | 'role' | 'category') => {
    let textToTranslate = '';

    if (field === 'category') {
      textToTranslate = newCategoryName.id;
    } else {
      const fieldData = formData[field] as { id?: string; en?: string };
      textToTranslate = fieldData?.id || '';
    }

    if (!textToTranslate) return;

    setActiveField(field);
    const translated = await translateToEnglish(textToTranslate);
    if (translated) {
      if (field === 'category') {
        setNewCategoryName(p => ({ ...p, en: translated }));
      } else {
        setFormData(p => ({ ...p, [field]: { id: (p[field] as any)?.id || '', en: translated } }));
      }
    }
    setActiveField(null);
  };

  // Default Categories if not specified
  const categories: ProjectCategoryConfig[] = projectCategories || [
    { id: 'maps', label: { id: 'PETA', en: 'MAPS' } },
    { id: 'planning', label: { id: 'PERENCANAAN', en: 'PLANNING' } },
    { id: 'research', label: { id: 'RISET', en: 'RESEARCH' } },
    { id: 'other', label: { id: 'LAINNYA', en: 'OTHER' } },
  ];

  const handleAddNew = () => {
    const newProject: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: { id: 'Judul Proyek Baru', en: 'New Project Title' },
      description: { id: 'Deskripsi singkat proyek spasial...', en: 'Short description of spatial project...' },
      fullDetails: { id: 'Detail lengkap metodologi, analisis geospasial, dan hasil...', en: 'Full details of methodology, geospatial analysis, and outcomes...' },
      category: categories[0]?.id || 'maps',
      categoryLabel: categories[0]?.label || { id: 'PETA', en: 'MAPS' },
      coverImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000',
      imageGallery: ['https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000'],
      tools: ['ArcGIS Pro', 'QGIS'],
      year: new Date().getFullYear().toString(),
      role: { id: 'Analis Spasial & Perencana', en: 'Spatial Analyst & Planner' },
      order: projects.length + 1,
      featured: false,
      visible: true,
      status: 'PUBLISHED',
    };

    updateData({
      ...portfolioData,
      projects: [...projects, newProject],
    });
    setEditingId(newProject.id);
    setFormData(newProject);
  };

  const handleStartEdit = (proj: ProjectItem) => {
    setEditingId(proj.id);
    setFormData({ ...proj });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;

    const updatedProjects = projects.map((p) => {
      if (p.id === editingId) {
        return {
          ...p,
          ...formData,
        } as ProjectItem;
      }
      return p;
    });

    updateData({
      ...portfolioData,
      projects: updatedProjects,
    });
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
      const updatedProjects = projects.filter((p) => p.id !== id);
      updateData({
        ...portfolioData,
        projects: updatedProjects,
      });
      if (editingId === id) {
        setEditingId(null);
        setFormData({});
      }
    }
  };

  const handleToggleFeatured = (id: string) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === id) {
        return { ...p, featured: !p.featured };
      }
      return p;
    });
    updateData({
      ...portfolioData,
      projects: updatedProjects,
    });
  };

  const handleStatusChange = (id: string, status: PublicationStatus) => {
    const updatedProjects = projects.map((p) => {
      if (p.id === id) {
        return { ...p, status };
      }
      return p;
    });
    updateData({
      ...portfolioData,
      projects: updatedProjects,
    });
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Recalculate order numbers
    const reordered = updated.map((p, idx) => ({ ...p, order: idx + 1 }));

    updateData({
      ...portfolioData,
      projects: reordered,
    });
  };



  const handleRemoveGalleryImage = (index: number) => {
    const currentGallery = formData.imageGallery || [];
    setFormData((prev) => ({
      ...prev,
      imageGallery: currentGallery.filter((_, i) => i !== index),
    }));
  };

  const handleAddCategory = () => {
    if (!newCategoryName.id.trim() || !newCategoryName.en.trim()) return;
    const catId = newCategoryName.en.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newCatConfig: ProjectCategoryConfig = {
      id: catId,
      label: { id: newCategoryName.id.toUpperCase(), en: newCategoryName.en.toUpperCase() },
    };

    const updatedCategories = [...categories, newCatConfig];
    updateData({
      ...portfolioData,
      projectCategories: updatedCategories,
    });
    setNewCategoryName({ id: '', en: '' });
  };

  const handleDeleteCategory = (catId: string) => {
    if (window.confirm('Hapus kategori ini? Proyek yang menggunakan kategori ini akan dialihkan ke kategori default.')) {
      const updatedCategories = categories.filter((c) => c.id !== catId);
      updateData({
        ...portfolioData,
        projectCategories: updatedCategories,
      });
    }
  };

  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3C6D3]/40 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B] flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-[#D99AAF]" />
            {language === 'en' ? 'Project Portfolio Management' : 'Manajemen Portofolio Proyek'}
          </h3>
          <p className="text-xs text-[#2D292B]/70 mt-1 leading-relaxed">
            {language === 'en' ? 'The central hub for managing your entire project catalog. Edit metadata, control publication statuses, and attribute categories for a professionally structured portfolio.' : 'Pusat tata kelola seluruh katalog proyek. Sunting metadata, kelola status publikasi proyek, serta atribusikan kategori untuk portofolio yang terstruktur profesional.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCategoryModal(!showCategoryModal)}
            className="px-4 py-2 rounded-xl bg-white border border-[#F3C6D3] text-[#2D292B] text-xs font-semibold hover:border-[#D99AAF] flex items-center gap-1.5 cursor-pointer"
          >
            <Tag className="w-3.5 h-3.5 text-[#D99AAF]" />
            <span>{language === 'en' ? 'Manage Categories' : 'Kelola Kategori'}</span>
          </button>

          <button
            onClick={handleAddNew}
            className="px-4 py-2 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold hover:bg-[#D99AAF] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'en' ? 'Add New Project' : 'Tambah Proyek Baru'}</span>
          </button>
        </div>
      </div>

      {/* Category Management Drawer */}
      {showCategoryModal && (
        <div className="p-4 rounded-xl bg-white border border-[#F3C6D3] space-y-4 animate-fadeIn">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D292B]">
            Daftar Kategori Proyek
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="px-3 py-1.5 rounded-lg bg-[#F8F1F2] border border-[#F3C6D3] text-xs font-semibold text-[#2D292B] flex items-center gap-2"
              >
                <span>{cat.label.id} / {cat.label.en}</span>
                {categories.length > 1 && (
                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="text-rose-600 hover:text-rose-800 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F3C6D3]/30">
            <input
              type="text"
              placeholder="Nama Kategori (ID)"
              value={newCategoryName.id}
              onChange={(e) => setNewCategoryName((p) => ({ ...p, id: e.target.value }))}
              className="px-3 py-1.5 text-xs rounded-lg border border-[#F3C6D3] bg-[#FFF9F7]"
            />
            <input
              type="text"
              placeholder="Category Name (ENG)"
              value={activeField === 'category' ? streamingText : newCategoryName.en}
              onChange={(e) => setNewCategoryName((p) => ({ ...p, en: e.target.value }))}
              className="px-3 py-1.5 text-xs rounded-lg border border-[#F3C6D3] bg-[#FFF9F7]"
            />
            <button
              onClick={() => handleAutoTranslate('category')}
              disabled={isTranslating || !newCategoryName.id}
              className="px-2 py-1.5 rounded-lg bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] disabled:opacity-50 cursor-pointer flex items-center justify-center"
              title="Auto Translate"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isTranslating && activeField === 'category' ? 'animate-pulse' : ''}`} />
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

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj, idx) => {
          const isEditing = editingId === proj.id;

          return (
            <div
              key={proj.id}
              className={`rounded-2xl border transition-all ${isEditing
                ? 'bg-white border-[#D99AAF] shadow-md p-6 space-y-6'
                : 'bg-white/80 border-[#F3C6D3] p-4 hover:border-[#D99AAF] flex flex-col md:flex-row md:items-center justify-between gap-4'
                }`}
            >
              {/* ITEM SUMMARY VIEW */}
              {!isEditing ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-14 rounded-xl overflow-hidden bg-[#F8F1F2] border border-[#F3C6D3] shrink-0">
                      <img src={proj.coverImage} alt="" className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#D99AAF] uppercase px-2 py-0.5 rounded bg-[#F8F1F2]">
                          0{idx + 1} &bull; {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="text-[10px] font-bold text-[#D99AAF] bg-[#F3C6D3]/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> Featured
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${proj.status === 'PUBLISHED' || !proj.status
                            ? 'bg-emerald-100 text-emerald-800'
                            : proj.status === 'DRAFT'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-800'
                            }`}
                        >
                          {proj.status || 'PUBLISHED'}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#2D292B]">
                        {proj.title.id}
                      </h4>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-[#F3C6D3]/30 shrink-0">
                    <button
                      onClick={() => handleToggleFeatured(proj.id)}
                      className={`p-2 rounded-xl border text-xs font-semibold cursor-pointer ${proj.featured
                        ? 'bg-[#D99AAF] text-[#FFF9F7] border-[#D99AAF]'
                        : 'bg-[#F8F1F2] text-[#2D292B]/70 border-[#F3C6D3] hover:text-[#2D292B]'
                        }`}
                      title="Toggle Featured State (Selected Work)"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      onClick={() => handleMoveOrder(idx, 'up')}
                      disabled={idx === 0}
                      className="p-2 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] text-[#2D292B]/70 hover:text-[#2D292B] disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleMoveOrder(idx, 'down')}
                      disabled={idx === projects.length - 1}
                      className="p-2 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] text-[#2D292B]/70 hover:text-[#2D292B] disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleStartEdit(proj)}
                      className="px-3.5 py-2 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold hover:bg-[#D99AAF] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(proj.id, proj.title.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                /* EDITING FORM VIEW */
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#F3C6D3]/40 pb-3">
                    <h4 className="font-serif text-lg font-bold text-[#2D292B]">
                      Sunting Proyek #{idx + 1}
                    </h4>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Perubahan</span>
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setFormData({});
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </div>

                  {/* Title ID & ENG */}
                  <div className="flex flex-row items-center justify-between border-t border-[#F3C6D3]/30 pt-4 pb-1 mt-4 first:mt-0 first:border-0">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#2D292B]">
                      Judul Proyek / Project Title
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
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Judul (ID)</label>
                      <input
                        type="text"
                        value={formData.title?.id || ''}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, title: { id: e.target.value, en: p.title?.en || '' } }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-bold text-[#2D292B]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Title (ENG)</label>
                      <input
                        type="text"
                        value={activeField === 'title' ? streamingText : formData.title?.en || ''}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, title: { id: p.title?.id || '', en: e.target.value } }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs font-bold text-[#2D292B]"
                      />
                    </div>
                  </div>

                  {/* Category, Year, Publication Status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Kategori</label>
                      <select
                        value={formData.category || 'maps'}
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
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Tahun Proyek</label>
                      <input
                        type="text"
                        value={formData.year || ''}
                        onChange={(e) => setFormData((p) => ({ ...p, year: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      />
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
                        <option value="PUBLISHED">PUBLISHED (Tampil di Website)</option>
                        <option value="DRAFT">DRAFT (Dalam Penulisan)</option>
                        <option value="HIDDEN">HIDDEN (Sembunyikan)</option>
                      </select>
                    </div>
                  </div>

                  {/* Descriptions ID & ENG */}
                  <div className="flex flex-row items-center justify-between border-t border-[#F3C6D3]/30 pt-4 pb-1 mt-4 first:mt-0 first:border-0">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#2D292B]">
                      Deskripsi Singkat / Short Description
                    </label>
                    <button
                      onClick={() => handleAutoTranslate('description')}
                      disabled={isTranslating || !formData.description?.id}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Sparkles className={`w-3 h-3 ${isTranslating && activeField === 'description' ? 'animate-pulse' : ''}`} />
                      {isTranslating && activeField === 'description' ? 'Translating...' : 'Translate'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Deskripsi Singkat (ID)</label>
                      <textarea
                        rows={3}
                        value={formData.description?.id || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            description: { id: e.target.value, en: p.description?.en || '' },
                          }))
                        }
                        className="w-full p-3 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Short Description (ENG)</label>
                      <textarea
                        rows={3}
                        value={activeField === 'description' ? streamingText : formData.description?.en || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            description: { id: p.description?.id || '', en: e.target.value },
                          }))
                        }
                        className="w-full p-3 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      />
                    </div>
                  </div>

                  {/* Role ID & ENG */}
                  <div className="flex flex-row items-center justify-between border-t border-[#F3C6D3]/30 pt-4 pb-1 mt-4 first:mt-0 first:border-0">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#2D292B]">
                      Peran dalam Proyek / Role in Project
                    </label>
                    <button
                      onClick={() => handleAutoTranslate('role')}
                      disabled={isTranslating || !formData.role?.id}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FCEDF1] text-[#8B3A52] hover:bg-[#F3C6D3] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Sparkles className={`w-3 h-3 ${isTranslating && activeField === 'role' ? 'animate-pulse' : ''}`} />
                      {isTranslating && activeField === 'role' ? 'Translating...' : 'Translate'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Peran dalam Proyek (ID)</label>
                      <input
                        type="text"
                        value={formData.role?.id || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            role: { id: e.target.value, en: p.role?.en || '' },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-[#D99AAF]">Role in Project (ENG)</label>
                      <input
                        type="text"
                        value={activeField === 'role' ? streamingText : formData.role?.en || ''}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            role: { id: p.role?.id || '', en: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      />
                    </div>
                  </div>

                  {/* Tools Array */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-[#D99AAF]">
                      Perangkat & Metodologi (Dipisahkan koma)
                    </label>
                    <input
                      type="text"
                      value={formData.tools?.join(', ') || ''}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#F3C6D3] text-xs text-[#2D292B]"
                      placeholder="ArcGIS Pro, QGIS, Remote Sensing, AutoCAD"
                    />
                  </div>

                  {/* Cover Image Upload & Preview */}
                  <div className="space-y-2 border-t border-[#F3C6D3]/30 pt-4">
                    <FileUploader
                      label="Foto Sampul Proyek (Cover Image)"
                      currentFileUrl={formData.coverImage}
                      folderCategory="projects"
                      acceptedTypes="image/*"
                      onUploadSuccess={(url) => setFormData((p) => ({ ...p, coverImage: url }))}
                      onClear={() => setFormData((p) => ({ ...p, coverImage: '' }))}
                    />
                  </div>

                  {/* Gallery Management */}
                  <div className="space-y-3 border-t border-[#F3C6D3]/30 pt-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <label className="text-xs font-bold uppercase text-[#2D292B]">
                        Galeri Media Proyek ({formData.imageGallery?.length || 0} Gambar / Dokumen)
                      </label>
                      <div className="w-full md:w-64">
                        <FileUploader
                          label=""
                          folderCategory="projects"
                          acceptedTypes="image/*,application/pdf"
                          onUploadSuccess={(url) => {
                            const currentGallery = formData.imageGallery || [];
                            setFormData((prev) => ({
                              ...prev,
                              imageGallery: [...currentGallery, url],
                            }));
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {formData.imageGallery?.map((imgUrl, gIdx) => (
                        <div key={gIdx} className="relative group rounded-xl overflow-hidden border border-[#F3C6D3] aspect-16/10 bg-[#F8F1F2]">
                          <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleRemoveGalleryImage(gIdx)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-rose-600 text-white opacity-90 hover:opacity-100 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Checkbox */}
                  <div className="pt-2 border-t border-[#F3C6D3]/30 flex items-center gap-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-[#2D292B] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured || false}
                        onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                        className="w-4 h-4 rounded text-[#D99AAF] focus:ring-[#D99AAF]"
                      />
                      <span>Tampilkan di Section Karya Pilihan Utama (Selected Work)</span>
                    </label>
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
