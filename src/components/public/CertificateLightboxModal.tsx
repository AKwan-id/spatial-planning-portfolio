import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CertificateItem } from '../../types/portfolio';
import { X, ExternalLink, ShieldCheck, Calendar } from 'lucide-react';

interface CertificateLightboxModalProps {
  cert: CertificateItem | null;
  onClose: () => void;
}

export const CertificateLightboxModal: React.FC<CertificateLightboxModalProps> = ({ cert, onClose }) => {
  const { language, t } = useLanguage();

  if (!cert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D292B]/70 backdrop-blur-md animate-fadeIn">
      <div className="glass-surface max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-[#EAA3B8] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FCEDF1] text-[#2D292B] hover:bg-[#2D292B] hover:text-[#FDF2F5] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1 pr-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B3A52] font-bold">
              {t(cert.category)} &bull; {cert.year}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#2D292B]">
              {t(cert.title)}
            </h3>
            <p className="text-xs font-semibold text-[#2D292B]/80 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#8B3A52]" />
              <span>{t(cert.issuer)}</span>
            </p>
          </div>

          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F5D5E0] border border-[#EAA3B8]/60 shadow-inner">
            <img
              src={cert.imageUrl}
              alt={t(cert.title)}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800';
              }}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {cert.credentialUrl && cert.credentialUrl !== '#' ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8B3A52] text-[#FDF2F5] text-xs font-semibold hover:bg-[#2D292B] transition-colors"
              >
                <span>{language === 'id' ? 'Buka Tautan Verifikasi' : 'Open Verification Link'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : <div />}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-[#2D292B] text-[#FDF2F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#8B3A52] transition-colors cursor-pointer"
            >
              {language === 'id' ? 'Tutup' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
