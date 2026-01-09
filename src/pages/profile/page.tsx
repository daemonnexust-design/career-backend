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
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navigation />

            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-12">
                    <header>
                        <h1 className="text-3xl font-bold text-slate-900 text-center">Settings & Profile</h1>
                        <p className="text-slate-500 text-center mt-2">Manage your data, CV, and preferences</p>
                    </header>

                    {/* Profile Information */}
                    <section className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                            <i className="ri-user-line text-2xl text-teal-600"></i>
                            <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                        </div>
                        <ProfileForm />
                    </section>

                    {/* Wishlist */}
                    <section className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
                        <div className="flex items-center gap-3 mb-8">
                            <i className="ri-star-line text-2xl text-teal-600"></i>
                            <h2 className="text-xl font-bold text-slate-900">Career Wishlist</h2>
                        </div>
                        <Wishlist />
                    </section>

                    {/* CV Management */}
                    <section className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
                        <div className="flex items-center gap-3 mb-2">
                            <i className="ri-file-upload-line text-2xl text-teal-600"></i>
                            <h2 className="text-xl font-bold text-slate-900">Your CV</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-8">Maintain your professional curriculum vitae for AI model context</p>
                        <CVManager />
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Email Drafts */}
                        <section className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <i className="ri-mail-send-line text-2xl text-teal-600"></i>
                                <h2 className="text-xl font-bold text-slate-900">Email Drafts</h2>
                            </div>
                            <EmailDraftsList />
                        </section>

                        {/* Cover Letters */}
                        <section className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                                <i className="ri-file-text-line text-2xl text-teal-600"></i>
                                <h2 className="text-xl font-bold text-slate-900">Cover Letters</h2>
                            </div>
                            <CoverLettersList />
                        </section>
                    </div>

                    {/* Danger Zone */}
                    <section className="bg-red-50 rounded-3xl p-8 border border-red-100">
                        <div className="flex items-center gap-3 mb-2 text-red-800">
                            <i className="ri-error-warning-line text-2xl"></i>
                            <h2 className="text-xl font-bold">Danger Zone</h2>
                        </div>
                        <p className="text-sm text-red-600 mb-6 font-medium">Irreversible actions regarding your professional data and account</p>
                        <DangerZone />
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
