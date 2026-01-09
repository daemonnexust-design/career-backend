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
        <div className="space-y-6">
            <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Company Name"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                />
                <input
                    type="text"
                    placeholder="Role Title"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                />
                <button
                    type="submit"
                    disabled={adding}
                    className="bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 h-[42px]"
                >
                    {adding ? 'Adding...' : 'Add to Wishlist'}
                </button>
            </form>

            <div className="space-y-2">
                {items.length === 0 ? (
                    <p className="text-center py-8 text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                        Your wishlist is empty. Add companies you're interested in!
                    </p>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div>
                                <h4 className="font-semibold text-slate-900">{item.company_name}</h4>
                                <p className="text-sm text-slate-600">{item.role_title}</p>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                                title="Remove"
                            >
                                <i className="ri-delete-bin-line text-lg"></i>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
