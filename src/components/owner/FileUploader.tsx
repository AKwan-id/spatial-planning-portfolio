import React, { useState, useRef } from 'react';
import { StorageService } from '../../services/storageService';
import { UploadCloud, File as FileIcon, X, CheckCircle, Loader } from 'lucide-react';

interface FileUploaderProps {
    label?: string;
    currentFileUrl?: string;
    folderCategory?: 'profile' | 'projects' | 'certificates' | 'cv';
    acceptedTypes?: 'image/*,application/pdf' | 'image/*' | 'application/pdf';
    onUploadSuccess: (publicUrl: string) => void;
    onClear?: () => void;
    isLoading?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    label = "Upload File",
    currentFileUrl,
    folderCategory = 'general',
    acceptedTypes = 'image/*',
    onUploadSuccess,
    onClear,
    isLoading = false
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate size (e.g. 5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError("File exceeds 5MB limit.");
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const { publicUrl, error: uploadError } = await StorageService.uploadFile(file, folderCategory);
            if (uploadError) {
                throw uploadError;
            }
            if (publicUrl) {
                onUploadSuccess(publicUrl);
            }
        } catch (err: any) {
            setError(err.message || "Failed to upload file. Please try again.");
        } finally {
            setIsUploading(false);
            // Reset input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const isPDF = currentFileUrl?.toLowerCase().includes('.pdf');

    return (
        <div className="w-full">
            {label && <label className="block text-[10px] font-bold uppercase text-[#D99AAF] mb-1.5">{label}</label>}

            <div className="flex flex-col gap-3">
                {currentFileUrl ? (
                    <div className="relative group rounded-xl border border-[#F3C6D3] bg-[#F8F1F2] p-2 overflow-hidden flex items-center gap-4">
                        {isPDF ? (
                            <div className="w-16 h-16 rounded-lg bg-white border border-[#F3C6D3] flex items-center justify-center shrink-0">
                                <FileIcon className="text-rose-400 w-8 h-8" />
                            </div>
                        ) : (
                            <div className="w-16 h-16 rounded-lg bg-white border border-[#F3C6D3] overflow-hidden shrink-0 flex items-center justify-center">
                                {/* If the link is google drive, the img might break, which is expected until they upload. We just let it handle native alt. */}
                                <img src={currentFileUrl} alt="Uploaded" className="w-full h-full object-cover text-[8px] text-center text-[#2D292B]/50" />
                            </div>
                        )}

                        <div className="flex-1 min-w-0 pr-2">
                            <p className="text-xs font-bold text-[#2D292B] truncate">
                                {isPDF ? "Dokumen PDF" : "File Gambar"}
                            </p>
                            <a
                                href={currentFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] font-mono text-[#D99AAF] hover:underline truncate block w-full mt-0.5"
                            >
                                {currentFileUrl}
                            </a>
                        </div>

                        {onClear && (
                            <button
                                type="button"
                                onClick={onClear}
                                className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors shrink-0 mr-1"
                                title="Hapus File"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ) : null}

                <div className="relative">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={acceptedTypes}
                        onChange={handleFileSelect}
                        disabled={isUploading || isLoading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <div className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${isUploading || isLoading
                            ? 'border-[#D99AAF] bg-[#D99AAF]/10'
                            : 'border-[#F3C6D3] bg-[#F8F1F2] hover:bg-[#F3C6D3]/40 hover:border-[#D99AAF]'
                        }`}>
                        {isUploading || isLoading ? (
                            <>
                                <Loader className="w-6 h-6 animate-spin text-[#D99AAF]" />
                                <span className="text-xs font-bold text-[#2D292B]/80">Mengunggah file ke cloud...</span>
                            </>
                        ) : (
                            <>
                                <UploadCloud className="w-6 h-6 text-[#D99AAF]" />
                                <span className="text-xs font-bold text-[#2D292B]">Klik atau Drag & Drop file ke sini</span>
                                <span className="text-[10px] font-medium text-[#2D292B]/60">Max 5MB. {acceptedTypes.includes('pdf') ? 'Gambar / PDF' : 'Gambar saja'}.</span>
                            </>
                        )}
                    </div>
                </div>

                {error && (
                    <p className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 p-2 rounded-xl">{error}</p>
                )}
            </div>
        </div>
    );
};

export default FileUploader;
