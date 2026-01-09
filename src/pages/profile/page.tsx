import React from 'react';
import { ProfileForm } from './components/ProfileForm';
import { CVManager } from './components/CVManager';
import { EmailDraftsList } from './components/EmailDraftsList';
import { Wishlist } from './components/Wishlist';
import { CoverLettersList } from './components/CoverLettersList';
import { DangerZone } from './components/DangerZone';
import Navigation from '@/components/feature/Navigation';
import Footer from '@/components/feature/Footer';

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col">
            <Navigation />

            <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-5xl mx-auto space-y-16">
                    {/* Page Header */}
                    <header className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-xs font-bold uppercase tracking-widest border border-teal-100">
                            <i className="ri-settings-4-line translate-y-[0.5px]"></i>
                            Account Settings
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                            Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Workspace</span>
                        </h1>
                        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            Fine-tune your professional profile and manage your AI-powered career data.
                        </p>
                    </header>

                    {/* Profile Information */}
                    <section className="relative group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/5 to-emerald-500/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative bg-white rounded-[2.5rem] shadow-sm p-8 md:p-12 border border-slate-100">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                    <i className="ri-user-settings-line text-2xl"></i>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
                                    <p className="text-sm text-slate-500 font-medium whitespace-nowrap">Your identity across the platform</p>
                                </div>
                            </div>
                            <ProfileForm />
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* CV Management - Primary Col */}
                        <div className="lg:col-span-12 space-y-12">
                            {/* Wishlist */}
                            <section className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-12 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                        <i className="ri-magic-line text-2xl"></i>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">Career Wishlist</h2>
                                        <p className="text-sm text-slate-500 font-medium">Companies you are targeting</p>
                                    </div>
                                </div>
                                <Wishlist />
                            </section>

                            {/* CV Section */}
                            <section className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-12 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                        <i className="ri-file-user-line text-2xl"></i>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">Curriculum Vitae</h2>
                                        <p className="text-sm text-slate-500 font-medium">Used for AI application personalization</p>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <CVManager />
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Email Drafts */}
                        <section className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-10 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                    <i className="ri-mail-star-line text-xl"></i>
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Email Drafts</h2>
                            </div>
                            <EmailDraftsList />
                        </section>

                        {/* Cover Letters */}
                        <section className="bg-white rounded-[2.5rem] shadow-sm p-8 md:p-10 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                    <i className="ri-draft-line text-xl"></i>
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Cover Letters</h2>
                            </div>
                            <CoverLettersList />
                        </section>
                    </div>

                    {/* Danger Zone */}
                    <section className="relative overflow-hidden bg-red-50/30 rounded-[2.5rem] p-8 md:p-12 border border-red-100 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-100/20 rounded-full blur-3xl"></div>
                        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-red-600">
                                    <i className="ri-error-warning-fill text-2xl"></i>
                                    <h2 className="text-2xl font-bold">Danger Zone</h2>
                                </div>
                                <p className="text-slate-500 font-medium max-w-md">
                                    Irreversible actions regarding your professional data and account. Handle with extreme caution.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <DangerZone />
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
