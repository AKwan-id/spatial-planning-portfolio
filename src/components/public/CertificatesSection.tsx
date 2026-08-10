import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CertificateItem } from '../../types/portfolio';
import { Award, ExternalLink, Eye, Calendar, ShieldCheck } from 'lucide-react';
import { SparklingText } from './SparklingText';


interface CertificatesSectionProps {
  onSelectCertificate: (cert: CertificateItem) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ onSelectCertificate }) => {
  const { language, portfolioData, t } = useLanguage();
  const { certificates } = portfolioData;

  const visibleCerts = certificates
    .filter((c) => c.visible !== false && c.status !== 'HIDDEN' && c.status !== 'DRAFT')
    .sort((a, b) => a.order - b.order);

  if (visibleCerts.length === 0) {
    return null;
  }

  return (
    <section id="certificates" data-section="certificates" className="py-24 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAA3B8]/40 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#8B3A52] uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'KREDENSIAL' : 'CREDENTIALS'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#2D292B]">
              <SparklingText>
                {language === 'id' ? 'Sertifikat & Lisensi' : 'Certificates & Credentials'}
              </SparklingText>
            </h2>
          </div>
        </div>

        {/* Certificate Minimal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleCerts.map((cert) => (
            <div
              key={cert.id}
              className="glass-surface rounded-3xl p-6 sm:p-8 border border-[#EAA3B8]/40 hover:border-[#8B3A52] transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col sm:flex-row gap-6 items-center group"
            >
              {/* Image Thumbnail Preview */}
              <div
                onClick={() => onSelectCertificate(cert)}
                className="relative w-full sm:w-44 h-32 rounded-2xl overflow-hidden bg-[#F5D5E0] border border-[#EAA3B8]/60 cursor-pointer group/img shrink-0"
              >
                <img
                  src={cert.imageUrl}
                  alt={t(cert.title)}
                  className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-[#2D292B]/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-[#FDF2F5] gap-1.5 text-xs font-semibold">
                  <Eye className="w-4 h-4" />
                  <span>{language === 'id' ? 'Pratinjau' : 'Preview'}</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FCEDF1] text-[#8B3A52] border border-[#EAA3B8]/50">
                    {t(cert.category)}
                  </span>
                  <span className="text-xs text-[#2D292B]/70 font-mono font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#8B3A52]" />
                    {cert.year}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectCertificate(cert)}
                  className="font-serif text-xl font-bold text-[#2D292B] group-hover:text-[#8B3A52] transition-colors leading-snug cursor-pointer"
                >
                  {t(cert.title)}
                </h3>

                <p className="text-xs font-medium text-[#2D292B]/80 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B3A52]" />
                  <span>{t(cert.issuer)}</span>
                </p>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onSelectCertificate(cert)}
                    className="text-xs font-semibold text-[#2D292B] hover:text-[#8B3A52] flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'id' ? 'Lihat Sertifikat' : 'View Credential'}</span>
                    <Eye className="w-3.5 h-3.5 text-[#8B3A52]" />
                  </button>

                  {cert.credentialUrl && cert.credentialUrl !== '#' && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#8B3A52] hover:text-[#2D292B] flex items-center gap-1"
                    >
                      <span>{language === 'id' ? 'Tautan Resmi' : 'Official Link'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
