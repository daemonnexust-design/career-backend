import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface CoverLetter {
    id: string;
    application_id: string;
    content: string;
    generated_at: string;
}

export function CoverLettersList() {
    const { user } = useAuth();
    const [letters, setLetters] = useState<CoverLetter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) fetchLetters();
    }, [user]);

    const fetchLetters = async () => {
        try {
            const { data, error } = await supabase
                .from('cover_letters')
                .select('*')
                .order('generated_at', { ascending: false });

            if (error) throw error;
            setLetters(data || []);
        } catch (error) {
            console.error('Error fetching letters:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (letter: CoverLetter) => {
        const element = document.createElement("a");
        const file = new Blob([letter.content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `cover-letter-${letter.id.slice(0, 8)}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this cover letter?')) return;
        try {
            const { error } = await supabase
                .from('cover_letters')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setLetters(letters.filter(l => l.id !== id));
        } catch (error) {
            console.error('Error deleting letter:', error);
        }
    };

    if (loading) return <div className="text-gray-500 text-sm">Loading cover letters...</div>;

    if (letters.length === 0) {
        return (
            <p className="text-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                No cover letters generated yet.
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {letters.map((letter) => (
                <div key={letter.id} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                            <i className="ri-file-text-line text-xl"></i>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Cover Letter</h4>
                            <p className="text-xs text-slate-500">Generated on {new Date(letter.generated_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleDownload(letter)}
                            className="p-2 text-slate-400 hover:text-teal-600 transition-colors"
                            title="Download TXT"
                        >
                            <i className="ri-download-line text-lg"></i>
                        </button>
                        <button
                            onClick={() => handleDelete(letter.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            title="Delete"
                        >
                            <i className="ri-delete-bin-line text-lg"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
