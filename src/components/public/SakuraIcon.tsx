import React from 'react';

interface SakuraIconProps {
  className?: string;
}

export const SakuraIcon: React.FC<SakuraIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 5-Petal Sakura Flower Outer Outline with Heart Notch Tips */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <path
          key={angle}
          d="M 60 60 C 45 42, 38 22, 50 10 C 54 6, 58 11, 60 14 C 62 11, 66 6, 70 10 C 82 22, 75 42, 60 60 Z"
          transform={`rotate(${angle}, 60, 60)`}
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      ))}

      {/* Outer Compass Concentric Rings */}
      <circle cx="60" cy="60" r="33" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="60" cy="60" r="28" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />

      {/* Compass Dial Ticks between r=28 and r=33 */}
      {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle) => (
        <line
          key={angle}
          x1="60"
          y1="28"
          x2="60"
          y2="33"
          stroke="currentColor"
          strokeWidth="1.2"
          transform={`rotate(${angle}, 60, 60)`}
        />
      ))}

      {/* Secondary Compass Star Points (NE, NW, SE, SW) */}
      <g transform="rotate(45, 60, 60)">
        <polygon points="60,24 63,60 60,60" fill="currentColor" opacity="0.6" />
        <polygon points="60,24 57,60 60,60" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.8" />
        <polygon points="60,96 63,60 60,60" fill="currentColor" opacity="0.6" />
        <polygon points="60,96 57,60 60,60" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.8" />
        <polygon points="24,60 60,63 60,60" fill="currentColor" opacity="0.6" />
        <polygon points="24,60 60,57 60,60" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.8" />
        <polygon points="96,60 60,63 60,60" fill="currentColor" opacity="0.6" />
        <polygon points="96,60 60,57 60,60" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.8" />
      </g>

      {/* Primary Compass Star Points (N, S, W, E) */}
      {/* North Pointer */}
      <polygon points="60,18 64.5,60 60,60" fill="currentColor" />
      <polygon points="60,18 55.5,60 60,60" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* South Pointer */}
      <polygon points="60,102 55.5,60 60,60" fill="currentColor" />
      <polygon points="60,102 64.5,60 60,60" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* East Pointer */}
      <polygon points="102,60 60,64.5 60,60" fill="currentColor" />
      <polygon points="102,60 60,55.5 60,60" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* West Pointer */}
      <polygon points="18,60 60,55.5 60,60" fill="currentColor" />
      <polygon points="18,60 60,64.5 60,60" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Cardinal Direction Letters N, S, E, W */}
      <text x="60" y="13" textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
        N
      </text>
      <text x="60" y="108" textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
        S
      </text>
      <text x="108" y="60" textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
        E
      </text>
      <text x="12" y="60" textAnchor="middle" dominantBaseline="central" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
        W
      </text>

      {/* Central 6-Prong Blossom Stamen / Pistil */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle}, 60, 60)`}>
          <line x1="60" y1="60" x2="60" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="60" cy="50" r="2.2" fill="currentColor" />
        </g>
      ))}
      <circle cx="60" cy="60" r="2" fill="#FFF9F7" />
    </svg>
  );
};
