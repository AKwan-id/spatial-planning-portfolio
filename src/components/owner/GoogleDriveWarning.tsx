import React from 'react';
import { AlertCircle } from 'lucide-react';

export const GoogleDriveWarning: React.FC = () => {
    return (
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-800">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
            <div className="space-y-1.5 flex-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-900">Tips Link Foto (Google Drive)</h4>
                <p className="text-xs leading-relaxed opacity-90">
                    Agar foto muncul, wajib pakai <strong>Direct Link Generator</strong> (misal: <a href="https://www.labnol.org/embed/google/drive/" target="_blank" rel="noreferrer" className="underline hover:text-amber-950 font-semibold">labnol.org</a>).
                </p>
                <ul className="text-[10px] list-disc list-inside space-y-0.5 pl-1 opacity-85">
                    <li>Pastikan Akses Foto di Google Drive diubah menjadi <strong className="font-semibold text-amber-950">"Siapa saja yang memiliki tautan" / Publik</strong>.</li>
                    <li>Paste link Drive asli ke labnol.org, tekan <em>Generate</em>, lalu paste hasil link barunya ke kolom ini.</li>
                </ul>
            </div>
        </div>
    );
};
