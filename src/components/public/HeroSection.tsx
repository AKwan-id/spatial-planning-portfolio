import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Decorative Cartographic Background: Central Java silhouette abstract */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center transform transition-transform duration-700 opacity-60"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <svg viewBox="0 0 1000 600" className="w-[150%] sm:w-[120%] lg:w-full h-auto text-[#D99AAF]/40 stroke-current fill-none stroke-[2px]">
          {/* Abstract stylized coordinate grid overlay */}
          <path d="M0,100 L1000,100 M0,200 L1000,200 M0,300 L1000,300 M0,400 L1000,400 M0,500 L1000,500" strokeWidth="0.5" strokeDasharray="5, 15" />
          <path d="M100,0 L100,600 M200,0 L200,600 M300,0 L300,600 M400,0 L400,600 M500,0 L500,600 M600,0 L600,600 M700,0 L700,600 M800,0 L800,600 M900,0 L900,600" strokeWidth="0.5" strokeDasharray="5, 15" />
          
          {/* Stylized Abstract Central Java Polygon (decorative spatial node network) */}
          <path d="M 250,300 Q 300,280 350,290 T 450,260 Q 550,250 650,230 T 750,280 Q 720,320 680,310 T 550,350 Q 500,400 450,380 T 350,380 Q 300,350 250,300 Z" className="text-[#8B3A52]/10 fill-current stroke-[#8B3A52]/30" strokeWidth="2.5" />
          
          {/* Cartographic internal linework & contours */}
          <path d="M 280,310 Q 320,290 360,295 T 440,270 Q 540,265 630,250 T 700,285" strokeWidth="1.5" strokeDasharray="8,6" />
          <path d="M 320,330 Q 350,310 380,320 T 480,290" strokeWidth="0.75" />
          <path d="M 450,260 L 650,230 L 750,280" strokeWidth="1" className="stroke-[#8B3A52]/50" />
          
          {/* Spatial node markers */}
          <circle cx="450" cy="260" r="5" className="fill-[#8B3A52]/70" />
          <circle cx="650" cy="230" r="3.5" className="fill-[#8B3A52]/70" />
          <circle cx="750" cy="280" r="4" className="fill-[#8B3A52]/70" />
          <circle cx="350" cy="290" r="6" className="fill-none stroke-[#8B3A52]/80" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 mix-blend-multiply">
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[140px] leading-none font-bold tracking-tighter text-[#2D292B] glow-pijar">
          ANNISA NUR PRABAWA
        </h1>
        <p className="mt-4 sm:mt-6 text-xl sm:text-3xl md:text-4xl font-medium tracking-[0.3em] sm:tracking-[0.6em] text-[#8B3A52] uppercase ml-3">
          {language === 'id' ? 'PORTOFOLIO' : 'PORTFOLIO'}
        </p>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce cursor-pointer z-10 hover:opacity-100 transition-opacity" 
        onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}
      >
         <span className="text-[#8B3A52] text-xs font-bold tracking-[0.3em] uppercase mb-3">SCROLL</span>
         <div className="w-[1.5px] h-16 bg-gradient-to-b from-[#8B3A52] to-transparent"></div>
      </div>
    </section>
  );
};
