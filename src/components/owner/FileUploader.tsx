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
            {label && <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>}

            <div className="flex flex-col gap-3">
                {currentFileUrl ? (
                    <div className="relative group rounded-xl border border-slate-700 bg-slate-800/50 p-2 overflow-hidden flex items-center gap-4">
                        {isPDF ? (
                            <div className="w-16 h-16 rounded bg-slate-700 flex items-center justify-center shrink-0">
                                <FileIcon className="text-rose-400 w-8 h-8" />
                            </div>
                        ) : (
                            <div className="w-16 h-16 rounded bg-slate-700 overflow-hidden shrink-0">
                                <img src={currentFileUrl} alt="uploaded preview" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="flex-1 truncate">
                            <p className="text-sm text-slate-200 truncate">
                                {isPDF ? "PDF Document" : "Image File"}
                            </p>
                            <a
                                href={currentFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-blue-400 hover:underline truncate block w-48"
                            >
                                {currentFileUrl}
                            </a>
                        </div>

                        {onClear && (
                            <button
                                type="button"
                                onClick={onClear}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors shrink-0 mr-2"
                                title="Remove File"
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
                    <div className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${isUploading ? 'border-blue-500/50 bg-blue-500/5' : 'border-slate-700 bg-slate-800/30 hover:bg-slate-800/80 hover:border-slate-600'
                        }`}>
                        {isUploading || isLoading ? (
                            <>
                                <Loader className="w-6 h-6 animate-spin text-blue-400" />
                                <span className="text-sm text-slate-400">Uploading to cloud...</span>
                            </>
                        ) : (
                            <>
                                <UploadCloud className="w-6 h-6 text-slate-400" />
                                <span className="text-sm text-slate-300">Click or drag file to upload</span>
                                <span className="text-xs text-slate-500">Max 5MB. {acceptedTypes.includes('pdf') ? 'Images or PDF' : 'Images only'}.</span>
                            </>
                        )}
                    </div>
                </div>

                {error && (
                    <p className="text-xs text-red-500 font-medium bg-red-500/10 p-2 rounded">{error}</p>
                )}
            </div>
        </div>
    );
};

export default FileUploader;
