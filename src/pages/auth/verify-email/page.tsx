import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmailPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleResend = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user?.email) throw new Error("No user email found");

            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: user.email,
            });

            if (error) throw error;
            setMessage("Verification email resent! Please check your inbox.");
        } catch (err: any) {
            setMessage(err.message || "Failed to resend email.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-mail-check-line text-4xl text-teal-600"></i>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-2">Verify your email</h1>
                <p className="text-slate-600 mb-8">
                    We've sent a verification link to your email address. Please click the link to confirm your account and access the dashboard.
                </p>

                {message && (
                    <div className={`p-4 rounded-xl text-sm mb-6 ${message.includes('resent') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        onClick={handleResend}
                        disabled={loading}
                        className="w-full py-3 px-4 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Resend Verification Email'}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full py-3 px-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                    >
                        Log Out
                    </button>
                </div>

                <p className="mt-8 text-xs text-slate-400">
                    Didn't receive an email? Check your spam folder or try resending.
                </p>
            </div>
        </div>
    );
}
