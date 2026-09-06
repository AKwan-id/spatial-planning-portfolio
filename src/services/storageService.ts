import { supabase } from './SupabaseClient';
import { v4 as uuidv4 } from 'uuid';

export const BUCKET_NAME = 'portfolio-assets';

export interface UploadResult {
    publicUrl: string;
    error: Error | null;
}

export const StorageService = {
    /**
     * Upload a file (image or pdf) to Supabase Storage
     * @param file The file object from an input element
     * @param folder Optional subfolder string (e.g., 'projects' or 'cv')
     * @returns An object containing either the public URL or an error
     */
    async uploadFile(file: File, folder: string = 'general'): Promise<UploadResult> {
        try {
            // 1. Check if user is authenticated (should be Admin)
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                throw new Error('You must be logged in as an Admin to upload files.');
            }

            // 2. Generate unique filename to avoid overriding
            const fileExt = file.name.split('.').pop();
            const fileName = `${folder}/${uuidv4()}.${fileExt}`;

            // 3. Upload to supabase storage bucket
            const { data, error: uploadError } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false // We use UUID, so no need to upsert
                });

            if (uploadError) {
                console.error('Storage Upload Error:', uploadError);
                throw uploadError;
            }

            // 4. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(fileName);

            return { publicUrl, error: null };
        } catch (error: any) {
            console.error('File Upload Failed:', error.message);
            return { publicUrl: '', error };
        }
    },

    /**
     * Deletes a file from Supabase storage based on its full URL or path
     * @param fileUrl The full public URL or relative path inside the bucket
     */
    async deleteFile(fileUrl: string): Promise<boolean> {
        if (!fileUrl) return false;

        try {
            // Extract the path from a potential full URL
            let filePath = fileUrl;
            const urlPattern = new RegExp(`.*\/storage\/v1\/object\/public\/${BUCKET_NAME}\/(.*)`);
            const match = fileUrl.match(urlPattern);

            if (match && match[1]) {
                // If it was a full URL, we extract just the path part
                filePath = match[1];
            }

            const { error } = await supabase.storage
                .from(BUCKET_NAME)
                .remove([filePath]);

            if (error) {
                console.error('Error deleting file:', error);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Failed to delete file from storage', error);
            return false;
        }
    }
};
