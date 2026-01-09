import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export function ProfileForm() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        full_name: '',
        headline: '',
        bio: '',
        location: '',
        experience_level: 'mid'
    });

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('full_name, headline, bio, location, experience_level')
                .eq('id', user?.id)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    full_name: data.full_name || '',
                    headline: data.headline || '',
                    bio: data.bio || '',
                    location: data.location || '',
                    experience_level: data.experience_level || 'mid'
                });
            }
        } catch (error: any) {
            console.error('Error fetching profile:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage(null);

            const { error } = await supabase
                .from('profiles')
                .update(formData)
                .eq('id', user?.id);

            if (error) throw error;

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={updateProfile} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-teal-500/5 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center">
                            <i className="ri-user-3-line absolute left-4 text-slate-400 group-focus-within:text-teal-500 transition-colors"></i>
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                                placeholder="e.g. Alexander Mercer"
                            />
                        </div>
                    </div>
                </div>

                {/* Headline */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Professional Headline</label>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-teal-500/5 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center">
                            <i className="ri-briefcase-line absolute left-4 text-slate-400 group-focus-within:text-teal-500 transition-colors"></i>
                            <input
                                type="text"
                                value={formData.headline}
                                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                                placeholder="e.g. Senior Product Designer"
                            />
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Location</label>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-teal-500/5 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center">
                            <i className="ri-map-pin-line absolute left-4 text-slate-400 group-focus-within:text-teal-500 transition-colors"></i>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                                placeholder="e.g. London, UK"
                            />
                        </div>
                    </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Experience Level</label>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-teal-500/5 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <div className="relative flex items-center">
                            <i className="ri-stairs-line absolute left-4 text-slate-400 group-focus-within:text-teal-500 transition-colors"></i>
                            <select
                                value={formData.experience_level}
                                onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all text-slate-900 font-medium appearance-none"
                            >
                                <option value="entry">Entry Level</option>
                                <option value="mid">Mid-Level Professional</option>
                                <option value="senior">Senior Level</option>
                                <option value="executive">Executive / Strategy</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-4 text-slate-400 pointer-events-none"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Professional Bio</label>
                <div className="relative group">
                    <div className="absolute inset-0 bg-teal-500/5 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        className="relative w-full px-5 py-4 bg-white border border-slate-200 rounded-3xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium resize-none"
                        placeholder="Share a brief overview of your professional journey and goals..."
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-50">
                {message ? (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-left-4 duration-300 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                        }`}>
                        <i className={message.type === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'}></i>
                        {message.text}
                    </div>
                ) : (
                    <div className="text-xs text-slate-400 font-medium hidden sm:block">
                        <i className="ri-lock-2-line mr-1"></i>
                        Data securely encrypted and user-scoped
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl font-bold shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Saving...</span>
                        </>
                    ) : (
                        <>
                            <i className="ri-save-3-line"></i>
                            <span>Save Profile</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
