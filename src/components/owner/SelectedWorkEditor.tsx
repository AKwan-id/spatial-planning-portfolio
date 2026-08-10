import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Star, ArrowUp, ArrowDown, FolderGit2, Check, Eye } from 'lucide-react';

interface SelectedWorkEditorProps {
  onGoToProjects: () => void;
}

export const SelectedWorkEditor: React.FC<SelectedWorkEditorProps> = ({ onGoToProjects }) => {
  const { portfolioData, updateData } = useLanguage();
  const { projects } = portfolioData;

  const featuredProjects = projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? a.order) - (b.featuredOrder ?? b.order));

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

  const handleMoveFeaturedOrder = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= featuredProjects.length) return;

    const updated = [...featuredProjects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Map back to projects with updated featuredOrder
    const updatedProjects = projects.map((p) => {
      const featuredIdx = updated.findIndex((f) => f.id === p.id);
      if (featuredIdx !== -1) {
        return { ...p, featuredOrder: featuredIdx + 1 };
      }
      return p;
    });

    updateData({
      ...portfolioData,
      projects: updatedProjects,
    });
  };

  return (
    <div className="space-y-8 bg-[#FFF9F7] p-6 sm:p-8 rounded-2xl border border-[#F3C6D3]/60 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3C6D3]/40 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2D292B] flex items-center gap-2">
            <Star className="w-6 h-6 text-[#D99AAF] fill-current" />
            Kelola Karya Utama (Selected Work Highlights)
          </h3>
          <p className="text-xs text-[#2D292B]/70 mt-1">
            Selected Work merupakan kumpulan proyek yang ditandai sebagai <strong className="text-[#2D292B]">Featured</strong> di Galeri Proyek. Atur urutan tampilan karya pilihan recruiter di sini.
          </p>
        </div>

        <button
          onClick={onGoToProjects}
          className="px-4 py-2 rounded-xl bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold hover:bg-[#D99AAF] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Buka Semua Proyek</span>
        </button>
      </div>

      {featuredProjects.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-[#F3C6D3] space-y-3">
          <p className="text-xs font-medium text-[#2D292B]/70">
            Belum ada proyek yang ditandai sebagai "Featured".
          </p>
          <button
            onClick={onGoToProjects}
            className="px-4 py-2 rounded-xl bg-[#D99AAF] text-white text-xs font-bold hover:bg-[#2D292B] cursor-pointer"
          >
            Pilih Proyek Featured
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#D99AAF]">
            {featuredProjects.length} Proyek Utama Ditampilkan di Section Selected Work:
          </p>

          <div className="space-y-3">
            {featuredProjects.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white border border-[#F3C6D3] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-[#F8F1F2] border border-[#F3C6D3] shrink-0">
                    <img src={item.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#D99AAF] uppercase">
                      Urutan #{idx + 1} &bull; {item.category}
                    </span>
                    <h4 className="font-serif font-bold text-base text-[#2D292B]">
                      {item.title.id}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveFeaturedOrder(idx, 'up')}
                    disabled={idx === 0}
                    className="p-2 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] text-[#2D292B]/70 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMoveFeaturedOrder(idx, 'down')}
                    disabled={idx === featuredProjects.length - 1}
                    className="p-2 rounded-xl bg-[#F8F1F2] border border-[#F3C6D3] text-[#2D292B]/70 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100 cursor-pointer"
                  >
                    Copot Featured
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
