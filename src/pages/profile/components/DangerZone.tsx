import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function DangerZone() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [confirmInput, setConfirmInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteAccount = async () => {
        if (confirmInput !== 'DELETE MY ACCOUNT') return;

        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase.functions.invoke('delete-account', {
                body: { confirmation: confirmInput }
            });

            if (error) throw error;

            // Account deleted. Sign out and redirect.
            await supabase.auth.signOut();
            navigate('/');

        } catch (err: any) {
            setError(err.message || 'Failed to delete account');
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-red-600 border-2 border-red-100 rounded-2xl font-bold hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
                <i className="ri-delete-bin-line"></i>
                Terminate Account
            </button>
            <p className="text-xs font-medium text-slate-400 max-w-xs">
                Deleting your account will purge all professional data, CVs, and generated content immediately.
            </p>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] max-w-lg w-full p-8 md:p-10 shadow-2xl border border-white animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                            <i className="ri-alarm-warning-line text-3xl"></i>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">Final Confirmation</h3>
                        <p className="text-slate-500 font-medium mb-8">
                            This action is final. Your digital professional identity within this platform will be permanently erased.
                        </p>

                        <div className="p-6 bg-red-50/50 border border-red-100 rounded-3xl mb-8 space-y-3">
                            <div className="flex gap-3 text-red-800 text-sm font-bold">
                                <i className="ri-error-warning-line translate-y-[2px]"></i>
                                <span>The following will be deleted:</span>
                            </div>
                            <ul className="grid grid-cols-1 gap-2">
                                {[
                                    'Full professional profile & bio',
                                    'Target company wishlist',
                                    'Uploaded CV & AI training data',
                                    'All generated email drafts & letters'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-red-700/70 text-sm font-medium">
                                        <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                                Type <span className="text-red-600">DELETE MY ACCOUNT</span> to proceed
                            </label>
                            <input
                                type="text"
                                value={confirmInput}
                                onChange={(e) => setConfirmInput(e.target.value)}
                                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-black text-slate-900 placeholder:text-slate-300 uppercase tracking-wider"
                                placeholder="PROCEED WITH CAUTION"
                            />
                        </div>

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-2">
                                <i className="ri-error-warning-line"></i>
                                {error}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 mt-10">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 active:scale-95 transition-all text-base"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={confirmInput !== 'DELETE MY ACCOUNT' || loading}
                                className="flex-[2] px-8 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 shadow-xl shadow-red-500/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all flex items-center justify-center gap-2 text-base"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <i className="ri-delete-bin-7-line text-xl"></i>
                                        <span>Confirm Obliteration</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
