import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        console.log('--- CV Upload Start ---');

        // 1. Verify User
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            throw new Error('Missing Authorization header');
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Missing Supabase Env Vars');
            throw new Error(`Server Config Error: URL=${!!supabaseUrl}, KEY=${!!supabaseAnonKey}`);
        }

        const supabaseClient = createClient(
            supabaseUrl,
            supabaseAnonKey,
            {
                global: { headers: { Authorization: authHeader } },
                auth: { persistSession: false }
            }
        );

        const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
        if (userError || !user) {
            console.error('User verification failed:', userError);
            // Distinct error message to confirm code version
            throw new Error(`DEBUG_AUTH_FAIL: ${userError?.message || 'No User'} | Project: ${supabaseUrl}`);
        }
        console.log('User verified:', user.id);

        // 2. Parse Form Data (Multipart)
        console.log('Parsing form data...');
        let formData;
        try {
            formData = await req.formData();
        } catch (e) {
            console.error('Error parsing FormData:', e);
            throw new Error('Failed to parse multipart form data');
        }

        const file = formData.get('file');

        if (!file) {
            console.error('No file provided in FormData');
            throw new Error('No file uploaded');
        }

        // 3. Robust Type Extraction
        // In Deno Edge, file is a File object but TS might complain.
        // We cast to any to access properties safely.
        const fileObj = file as any;
        const fileName = fileObj.name || 'cv.pdf';
        const fileType = fileObj.type || 'application/pdf';
        const fileSize = fileObj.size || 0;

        console.log(`File received: ${fileName}, Size: ${fileSize}, Type: ${fileType}`);

        // 4. Validation
        if (fileSize > 5 * 1024 * 1024) {
            throw new Error('File size exceeds 5MB limit');
        }

        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(fileType)) {
            // Be lenient with octet-stream if name ends in .pdf/doc
            const ext = fileName.split('.').pop()?.toLowerCase();
            const allowedExts = ['pdf', 'doc', 'docx'];
            if (!allowedExts.includes(ext)) {
                throw new Error('Invalid file type. Only PDF and DOC/DOCX allowed.');
            }
        }

        // 5. Upload to Storage (Service Role)
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        if (!serviceRoleKey) {
            console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
            throw new Error('Server misconfiguration: Missing Service Role Key');
        }

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            serviceRoleKey
        );

        const filePath = `${user.id}/cv.pdf`;

        // Robust buffer reading
        let fileBuffer;
        if (typeof fileObj.arrayBuffer === 'function') {
            fileBuffer = await fileObj.arrayBuffer();
        } else {
            // Fallback for older Deno versions or different polyfills
            throw new Error('File object does not support arrayBuffer()');
        }

        console.log('Uploading to storage path:', filePath);
        const { error: uploadError } = await supabaseAdmin
            .storage
            .from('cv-uploads')
            .upload(filePath, fileBuffer, {
                contentType: fileType,
                upsert: true
            });

        if (uploadError) {
            console.error('Storage upload error:', uploadError);
            throw uploadError;
        }
        console.log('Storage upload successful');

        // 6. Update Database
        console.log('Updating database metadata...');

        // Upsert using onConflict if simple, or explicit check
        // Using explicit check/update per previous logic which is safer for now
        const { data: existing } = await supabaseAdmin
            .from('user_cvs')
            .select('id')
            .eq('user_id', user.id)
            .maybeSingle();

        let result;
        if (existing) {
            console.log('Updating existing record:', existing.id);
            result = await supabaseAdmin.from('user_cvs').update({
                file_path: filePath,
                original_filename: fileName,
                uploaded_at: new Date().toISOString()
            }).eq('id', existing.id).select().single();
        } else {
            console.log('Inserting new record for user:', user.id);
            result = await supabaseAdmin.from('user_cvs').insert({
                user_id: user.id,
                file_path: filePath,
                original_filename: fileName
            }).select().single();
        }

        if (result.error) {
            console.error('Database update error:', result.error);
            throw result.error;
        }
        console.log('Database update successful:', result.data);

        // 7. Log Activity
        try {
            await supabaseAdmin.from('activity_logs').insert({
                user_id: user.id,
                action_type: 'UPLOAD_CV',
                title: 'Uploaded new CV',
                metadata: {
                    filename: fileName,
                    size: fileSize,
                    path: filePath
                }
            });
            console.log('Activity logged');
        } catch (logError) {
            console.error('Failed to log activity:', logError);
            // Don't fail the request just because logging failed
        }

        return new Response(
            JSON.stringify({
                success: true,
                data: result.data,
                debug: {
                    userId: user.id,
                    filePath: filePath,
                    storageUpload: 'success',
                    dbOperation: existing ? 'update' : 'insert',
                    dbResult: result.data
                }
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('--- CV Upload Error ---', error);
        const msg = error.message || 'Internal Server Error';
        return new Response(
            JSON.stringify({
                success: false,
                error: msg,
                debug: String(error)
            }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
