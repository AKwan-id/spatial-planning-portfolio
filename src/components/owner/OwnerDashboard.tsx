import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { portfolioRepository } from '../../services/portfolioRepository';
import { authService } from '../../services/AuthService';
import { supabase } from '../../services/SupabaseClient';
import { AboutEditor } from './AboutEditor';
import { BrandingEditor } from './BrandingEditor';
import { SelectedWorkEditor } from './SelectedWorkEditor';
import { SkillsEditor } from './SkillsEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { CertificatesEditor } from './CertificatesEditor';
import { CvEditor } from './CvEditor';
import { ContactEditor } from './ContactEditor';

import {
  Settings,
  User,
  Star,
  Cpu,
  FolderGit2,
  Briefcase,
  Award,
  FileText,
  Mail,
  Download,
  Upload,
  RotateCcw,
  Eye,
  X,
  Check,
  LogIn,
  ShieldAlert,
  EyeOff,
  Lock
} from 'lucide-react';

interface OwnerDashboardProps {
  onClose: () => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ onClose }) => {
  const { portfolioData, updateData, resetData, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<
    'branding' | 'about' | 'selectedWork' | 'skills' | 'projects' | 'experience' | 'certificates' | 'cv' | 'contact' | 'backup'
  >('about');

  const [importJson, setImportJson] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [debugLog, setDebugLog] = useState<string>('');

  useEffect(() => {
    const initializeAuth = async () => {
      const sess = await authService.getCurrentSession();
      setSession(sess);
      if (sess?.user?.id) {
        // Verify if user is in admin_users table
        const { data, error } = await supabase!.from('admin_users').select('id').eq('id', sess.user.id).maybeSingle();
        setDebugLog(JSON.stringify({ data, error }, null, 2));
        if (data && !error) setIsAdmin(true);
      }
      setAuthLoading(false);
    };
    initializeAuth();

    const { data: { subscription } } = authService.onAuthStateChange(async (_event, sess) => {
      setSession(sess);
      if (sess?.user?.id) {
        const { data, error } = await supabase!.from('admin_users').select('id').eq('id', sess.user.id).maybeSingle();
        setDebugLog(JSON.stringify({ data, error }, null, 2));
        setIsAdmin(!!data && !error);
      } else {
        setIsAdmin(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fitur Keamanan: Auto-logout setelah 1 jam tanpa interaksi apa-apa
  useEffect(() => {
    let timeoutId: number | NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      if (session && isAdmin) {
        timeoutId = setTimeout(() => {
          authService.signOut();
        }, 3600000); // 1 Jam = 3.600.000 ms
      }
    };

    if (session && isAdmin) {
      window.addEventListener('mousemove', resetTimer);
      window.addEventListener('mousedown', resetTimer);
      window.addEventListener('keypress', resetTimer);
      window.addEventListener('scroll', resetTimer);
      window.addEventListener('touchstart', resetTimer);
      resetTimer();
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [session, isAdmin]);

  const handleExport = () => {
    const jsonStr = portfolioRepository.exportAsJson(portfolioData);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `annisa_portfolio_data_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showStatus('Data portfolio berhasil diexport dalam format JSON.', 'success');
  };

  const handleImport = async () => {
    if (!importJson.trim()) {
      showStatus('Harap masukkan string JSON yang valid.', 'error');
      return;
    }
    const success = await portfolioRepository.importFromJson(importJson);
    if (success) {
      showStatus('Data portfolio berhasil diimport!', 'success');
      setImportJson('');
      setTimeout(() => window.location.reload(), 1500); // Reload to reflect changes
    } else {
      showStatus('Gagal mengimport JSON. Pastikan format JSON sesuai struktur portfolio.', 'error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setImportJson(content);
        showStatus('File JSON berhasil dimuat! Klik "Jalankan Import" untuk menyimpan.', 'success');
      } catch (err) {
        showStatus('Gagal membaca file JSON.', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan data portofolio ke standar awal?')) {
      resetData();
      showStatus('Data berhasil dikembalikan ke standar awal.', 'success');
    }
  };

  const showStatus = (text: string, type: 'success' | 'error') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const tabs = [
    { id: 'branding', label: '1. Brand & Logo', icon: Settings },
    { id: 'about', label: '2. About Me', icon: User },
    { id: 'selectedWork', label: '3. Selected Work', icon: Star },
    { id: 'skills', label: '4. Skills', icon: Cpu },
    { id: 'projects', label: '5. Projects', icon: FolderGit2 },
    { id: 'experience', label: '6. Experience', icon: Briefcase },
    { id: 'certificates', label: '7. Certificates', icon: Award },
    { id: 'cv', label: '8. CV Document', icon: FileText },
    { id: 'contact', label: '9. Contact Info', icon: Mail },
    { id: 'backup', label: 'Backup / Export', icon: Settings },
  ];

  if (authLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#2D292B]/90 backdrop-blur-md flex flex-col items-center justify-center animate-pulse">
        <p className="text-[#FFF9F7] font-serif tracking-widest uppercase text-sm font-semibold">Memverifikasi Otoritas. . .</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="fixed inset-0 z-50 bg-[#2D292B]/90 backdrop-blur-md flex flex-col items-center justify-center px-4 animate-fadeIn">
        <div className="glass-surface p-8 max-w-sm w-full rounded-2xl flex flex-col items-center text-center shadow-2xl border border-[#F3C6D3]/40 mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#8B3A52] flex items-center justify-center text-[#FDF2F5] mb-6 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2D292B] mb-2 tracking-wide uppercase">RESTRICTED ZONE</h2>
          <p className="text-[11px] text-[#2D292B]/80 mb-8 font-medium leading-relaxed">
            Modul Manajemen Portofolio dilindungi oleh autentikasi Supabase dan Row Level Security (RLS). Silakan masuk sebagai Administrator.
          </p>
          <button
            onClick={() => authService.signInWithGoogle()}
            className="w-full flex items-center justify-center gap-3 bg-[#2D292B] hover:bg-[#8B3A52] text-[#FDF2F5] transition-all px-6 py-3.5 rounded-full font-bold tracking-wide text-xs cursor-pointer shadow-md"
          >
            <LogIn className="w-4 h-4" />
            CONTINUE WITH GOOGLE
          </button>
          <button
            onClick={onClose}
            className="mt-6 text-[#2D292B]/50 hover:text-[#2D292B] font-semibold text-[10px] tracking-wider transition-colors uppercase cursor-pointer"
          >
            Kembali ke Publik
          </button>
        </div>
      </div>
    );
  }

  if (session && !isAdmin) {
    return (
      <div className="fixed inset-0 z-50 bg-[#2D292B]/90 backdrop-blur-md flex flex-col items-center justify-center px-4 animate-fadeIn">
        <div className="glass-surface p-8 max-w-sm w-full rounded-2xl flex flex-col items-center text-center shadow-2xl border border-rose-500/50 mx-auto bg-[#FDF2F5]">
          <div className="w-16 h-16 rounded-full bg-[#2D292B] border border-[#D99AAF] flex items-center justify-center text-[#FDF2F5] mb-6 shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#2D292B] mb-2 tracking-wide uppercase">AKSES DITOLAK</h2>
          <p className="text-[11px] text-[#2D292B]/80 mb-6 font-medium leading-relaxed">
            Sistem mengenali kredensial Google Anda ({session.user?.email}), namun Anda tidak terdaftar sebagai Administrator.
            <br /><br />
            <span className="text-[9px] font-mono text-rose-800/80 bg-rose-100 p-2 rounded block break-all text-left uppercase whitespace-pre-wrap border border-rose-200">
              DIAGNOSTIC LOG:<br />{debugLog}
            </span>
          </p>
          <div className="space-y-3 w-full">
            <button
              onClick={() => authService.signOut()}
              className="w-full flex items-center justify-center gap-2 bg-[#2D292B] hover:bg-[#8B3A52] text-[#FDF2F5] transition-all px-6 py-3.5 rounded-full font-bold tracking-wide text-xs cursor-pointer shadow-md"
            >
              <LogIn className="w-4 h-4" />
              Ganti Akun Email
            </button>
            <button
              onClick={onClose}
              className="w-full text-[#2D292B]/50 hover:text-[#2D292B] font-semibold text-[10px] tracking-wider transition-colors uppercase cursor-pointer py-2"
            >
              Kembali ke Publik
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#2D292B]/80 backdrop-blur-md flex flex-col animate-fadeIn">

      {/* Top Bar */}
      <div className="bg-[#2D292B] text-[#FFF9F7] px-6 py-4 flex items-center justify-between border-b border-[#D99AAF]/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#D99AAF]/20 text-[#F3C6D3]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold tracking-tight">
              PORTFOLIO OWNER DASHBOARD
            </h2>
            <p className="text-[11px] text-[#F3C6D3]/80 font-mono">
              Management Portal &bull; Annisa Nur Prabawa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFF9F7] text-[#2D292B] text-xs font-semibold hover:bg-[#F3C6D3] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Tinjau Tampilan Publik</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#FFF9F7]/10 text-[#FFF9F7] hover:bg-[#FFF9F7]/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Status Alert Banner */}
      {statusMessage && (
        <div
          className={`px-6 py-2.5 text-xs font-semibold text-center text-white ${statusMessage.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
            }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Body Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#F8F1F2]">

        {/* Sidebar Nav */}
        <div className="w-full md:w-64 bg-[#2D292B] p-3 md:p-4 border-b md:border-b-0 md:border-r border-[#D99AAF]/20 overflow-x-auto md:overflow-y-auto shrink-0 flex flex-row md:flex-col gap-2 md:gap-1 scrollbar-hide items-center md:items-stretch">
          <div className="hidden md:block text-[10px] font-mono uppercase tracking-widest text-[#D99AAF] px-3 py-2 font-bold shrink-0">
            MODUL MANAJEMEN
          </div>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`shrink-0 md:w-full flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 py-2.5 md:py-2.5 rounded-full md:rounded-xl text-xs md:text-sm font-semibold tracking-wide transition-all text-center md:text-left cursor-pointer whitespace-nowrap ${isActive
                  ? 'bg-[#D99AAF] text-[#FFF9F7] shadow-sm'
                  : 'bg-[#FFF9F7]/5 md:bg-transparent text-[#FFF9F7]/70 hover:bg-[#FFF9F7]/10 hover:text-[#FFF9F7]'
                  }`}
              >
                <Icon className="w-4 h-4 hidden md:block" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="shrink-0 hidden md:flex pt-6 border-t border-[#D99AAF]/20 flex-col space-y-2 px-1">
            <button
              onClick={() => authService.signOut()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-orange-950/40 hover:bg-orange-800/60 text-orange-200 text-xs font-medium cursor-pointer mb-2"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign Out Session</span>
            </button>
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#FFF9F7]/10 hover:bg-[#FFF9F7]/20 text-[#FFF9F7] text-xs font-medium cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-200 text-xs font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>

        {/* Main Content Workspace */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          {activeTab === 'branding' && <BrandingEditor />}
          {activeTab === 'about' && <AboutEditor />}
          {activeTab === 'selectedWork' && <SelectedWorkEditor onGoToProjects={() => setActiveTab('projects')} />}
          {activeTab === 'skills' && <SkillsEditor />}
          {activeTab === 'projects' && <ProjectsEditor />}
          {activeTab === 'experience' && <ExperienceEditor />}
          {activeTab === 'certificates' && <CertificatesEditor />}
          {activeTab === 'cv' && <CvEditor />}
          {activeTab === 'contact' && <ContactEditor />}

          {activeTab === 'backup' && (
            <div className="bg-[#FFF9F7] p-8 rounded-2xl border border-[#F3C6D3]/60 space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2D292B]">
                  Backup, Export & Import JSON
                </h3>
                <p className="text-xs text-[#2D292B]/70 mt-1">
                  Unduh cadangan data portofolio atau import file JSON dari penyimpanan eksternal.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#F3C6D3]/40">
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D292B] text-[#FFF9F7] text-xs font-semibold cursor-pointer hover:bg-[#D99AAF] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Data Portofolio (JSON)</span>
                </button>

                <div className="space-y-4 pt-4">
                  <label className="text-xs font-bold text-[#2D292B] uppercase block border-b border-[#F3C6D3]/40 pb-2">
                    Import Data JSON (Upload File atau Paste Teks)
                  </label>

                  {/* File Upload Button */}
                  <div className="flex items-center gap-4">
                    <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#2D292B] text-[#2D292B] text-xs font-semibold cursor-pointer hover:bg-[#F8F1F2] transition-colors relative overflow-hidden">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Pilih File .json</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                    <span className="text-[11px] text-[#2D292B]/50 italic">Atau paste isi teks json di bawah</span>
                  </div>

                  <textarea
                    rows={6}
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    placeholder="Tempelkan string JSON portofolio di sini..."
                    className="w-full p-3 rounded-xl bg-white border border-[#F3C6D3] text-xs font-mono text-[#2D292B] focus:outline-none focus:ring-1 focus:ring-[#D99AAF]"
                  />

                  <button
                    onClick={handleImport}
                    disabled={!importJson.trim()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D99AAF] text-[#FFF9F7] text-xs font-semibold cursor-pointer hover:bg-[#2D292B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Jalankan Import Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
