import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/public/Navbar';
import { AboutSection } from './components/public/AboutSection';
import { SelectedWorkSection } from './components/public/SelectedWorkSection';
import { SkillsSection } from './components/public/SkillsSection';
import { ProjectsSection } from './components/public/ProjectsSection';
import { ExperienceSection } from './components/public/ExperienceSection';
import { CertificatesSection } from './components/public/CertificatesSection';
import { CvSection } from './components/public/CvSection';
import { ContactSection } from './components/public/ContactSection';

import { ProjectDetailModal } from './components/public/ProjectDetailModal';
import { CertificateLightboxModal } from './components/public/CertificateLightboxModal';
import { CvPreviewModal } from './components/public/CvPreviewModal';
import { OwnerDashboard } from './components/owner/OwnerDashboard';

import { ProjectItem, SelectedWorkItem, CertificateItem } from './types/portfolio';
import { CanvasBackground } from './components/public/CanvasBackground';

export function PortfolioContent() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | SelectedWorkItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isOwnerRoute, setIsOwnerRoute] = useState(false);

  const { isLoading } = useLanguage();

  // Check URL pathname or hash for /owner or #owner access
  useEffect(() => {
    const checkRoute = () => {
      const isOwner = window.location.pathname === '/owner' || window.location.hash === '#owner';
      setIsOwnerRoute(isOwner);
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, []);

  const handleCloseOwnerDashboard = () => {
    setIsOwnerRoute(false);
    if (window.location.hash === '#owner') {
      window.history.pushState(null, '', window.location.pathname);
    } else if (window.location.pathname === '/owner') {
      window.history.pushState(null, '', '/');
    }
  };

  if (isOwnerRoute) {
    return <OwnerDashboard onClose={handleCloseOwnerDashboard} />;
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#2D292B] flex flex-col items-center justify-center pointer-events-none">
        <div className="w-12 h-12 border-2 border-[#D99AAF] border-t-transparent rounded-full animate-spin mb-4 shadow-sm" />
        <p className="text-[#FFF9F7] font-serif tracking-widest uppercase text-[10px] font-semibold animate-pulse">
          INITIALIZING PORTFOLIO. . .
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-[#2D292B] bg-transparent selection:bg-[#D99AAF]/40">
      {/* Layer 1: Cinematic scroll animation canvas — stays fixed at z:-1 */}
      <CanvasBackground />

      {/* Layer 2: Soft Sakura Pink atmospheric overlay — tints the cinematic without killing it */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `
            linear-gradient(
              160deg,
              rgba(248, 228, 234, 0.52) 0%,
              rgba(243, 198, 211, 0.38) 30%,
              rgba(217, 154, 175, 0.28) 60%,
              rgba(248, 228, 234, 0.48) 100%
            )
          `,
        }}
      />

      {/* Floating Header */}
      <Navbar />

      {/* Main Single-Page Public Portfolio Layout in Exact Order */}
      <main className="relative z-10 space-y-8">
        {/* SECTION 1: ABOUT ME */}
        <AboutSection />

        {/* SECTION 2: SELECTED WORK */}
        <SelectedWorkSection onSelectProject={(item) => setSelectedProject(item)} />

        {/* SECTION 3: SKILLS */}
        <SkillsSection />

        {/* SECTION 4: PROJECTS */}
        <ProjectsSection onSelectProject={(item) => setSelectedProject(item)} />

        {/* SECTION 5: EXPERIENCE */}
        <ExperienceSection />

        {/* SECTION 6: CERTIFICATES */}
        <CertificatesSection onSelectCertificate={(cert) => setSelectedCertificate(cert)} />

        {/* SECTION 7: CV */}
        <CvSection onViewCv={() => setIsCvModalOpen(true)} />

        {/* SECTION 8: CONTACT */}
        <ContactSection />
      </main>

      {/* Interactive Public Modals */}
      <ProjectDetailModal
        item={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateLightboxModal
        cert={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <CvPreviewModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
}

import { AKwanAgent } from './components/public/AKwanAgent';

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioContent />
      <AKwanAgent />
    </LanguageProvider>
  );
}
