import React, { useState, useEffect } from 'react';

// Bintang SVG 4-titik elegan
const Star = ({ color, size, style }: any) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 68 68"
        fill="none"
        style={{ ...style, position: 'absolute', pointerEvents: 'none', zIndex: 10 }}
        className="animate-sparkle"
    >
        <path
            d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
            fill={color}
        />
    </svg>
);

const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface SparklingTextProps {
    children: React.ReactNode;
    wrapperClass?: string; // e.g. "inline-block", "block"
}

export const SparklingText: React.FC<SparklingTextProps> = ({ children, wrapperClass = "inline-block" }) => {
    const [sparkles, setSparkles] = useState<any[]>([]);

    useEffect(() => {
        // Generate bintang setiap 400ms agar pas (tidak terlalu sepi, tidak terlalu ramai)
        const interval = setInterval(() => {
            const sparkle = {
                id: String(Math.random()),
                createdAt: Date.now(),
                // Warna Sakura & Rose Gold
                color: ['#D99AAF', '#F3C6D3', '#8B3A52', '#FDF2F5'][Math.floor(random(0, 4))],
                size: random(10, 24),
                style: {
                    top: random(-5, 95) + '%',
                    left: random(-5, 100) + '%',
                }
            };
            setSparkles(current => [...current, sparkle]);
        }, 400);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Bersihkan bintang yang umurnya lebih dari 1500ms (1.5 detik animasi selesai)
        const cleanup = setInterval(() => {
            const now = Date.now();
            setSparkles(current => current.filter(s => now - s.createdAt < 1500));
        }, 200);
        return () => clearInterval(cleanup);
    }, []);

    return (
        <span className={`relative glow-pijar ${wrapperClass}`}>
            {sparkles.map(s => (
                <Star key={s.id} color={s.color} size={s.size} style={s.style} />
            ))}
            <span className="relative z-1">{children}</span>
        </span>
    );
};
