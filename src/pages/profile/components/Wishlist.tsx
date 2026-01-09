import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface WishlistItem {
    id: string;
    company_name: string;
    role_title: string;
}

export function Wishlist() {
    const { user } = useAuth();
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCompany, setNewCompany] = useState('');
    const [newRole, setNewRole] = useState('');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (user) fetchWishlist();
    }, [user]);

    const fetchWishlist = async () => {
        try {
            const { data, error } = await supabase
                .from('wishlist')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCompany || !newRole) return;

        try {
            setAdding(true);
            const { data, error } = await supabase
                .from('wishlist')
                .insert({
                    user_id: user?.id,
                    company_name: newCompany,
                    role_title: newRole
                })
                .select()
                .single();

            if (error) throw error;
            setItems([data, ...items]);
            setNewCompany('');
            setNewRole('');
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        } finally {
            setAdding(false);
        }
    };

    const removeItem = async (id: string) => {
        try {
            const { error } = await supabase
                .from('wishlist')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    if (loading) return <div className="text-gray-500 text-sm">Loading wishlist...</div>;

    return (
        <div className="space-y-8">
            <form onSubmit={addItem} className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <i className="ri-building-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors"></i>
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-medium text-slate-900"
                        required
                    />
                </div>
                <div className="flex-1 relative group">
                    <i className="ri-award-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors"></i>
                    <input
                        type="text"
                        placeholder="Target Role"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-medium text-slate-900"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={adding}
                    className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-700 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 min-w-[160px]"
                >
                    {adding ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <i className="ri-add-line text-lg"></i>
                            <span>Add Target</span>
                        </>
                    )}
                </button>
            </form>

            <div className="grid grid-cols-1 gap-3">
                {items.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-[2.5rem]">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <i className="ri-star-line text-3xl"></i>
                        </div>
                        <p className="text-slate-400 font-medium">Your wishlist is empty.</p>
                        <p className="text-xs text-slate-300 mt-1">Add companies you're dreaming of joining.</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="group flex justify-between items-center p-5 bg-white rounded-2xl border border-slate-100 hover:border-teal-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:from-teal-50 group-hover:to-emerald-50 group-hover:text-teal-600 transition-colors">
                                    <i className="ri-building-fill text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{item.company_name}</h4>
                                    <p className="text-sm font-medium text-slate-500">{item.role_title}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                                title="Remove from wishlist"
                            >
                                <i className="ri-delete-bin-line text-xl"></i>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
