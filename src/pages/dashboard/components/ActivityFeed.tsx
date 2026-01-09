
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface ActivityLog {
    id: string;
    action_type: string;
    title: string | null;
    created_at: string;
    metadata: any;
}

export default function ActivityFeed() {
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('activity_logs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);

            if (data) {
                setActivities(data);
            }
        } catch (error) {
            console.error('Error fetching activity:', error);
        } finally {
            setLoading(false);
        }
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'UPLOAD_CV': return { icon: 'ri-file-upload-line', color: 'text-teal-600', bg: 'bg-teal-50' };
            case 'GENERATE_LETTER': return { icon: 'ri-quill-pen-line', color: 'text-purple-600', bg: 'bg-purple-50' };
            case 'RESEARCH_COMPANY': return { icon: 'ri-search-line', color: 'text-blue-600', bg: 'bg-blue-50' };
            default: return { icon: 'ri-flashlight-line', color: 'text-slate-600', bg: 'bg-slate-50' };
        }
    };

    if (loading) return <div className="h-48 flex items-center justify-center"><div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
            </div>

            <div className="space-y-6">
                {activities.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">No recent activity</p>
                ) : (
                    activities.map((activity, index) => {
                        const style = getIconForType(activity.action_type);
                        return (
                            <div key={activity.id} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 ${style.bg} ${style.color} rounded-full flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform`}>
                                        <i className={style.icon}></i>
                                    </div>
                                    {index !== activities.length - 1 && (
                                        <div className="w-0.5 flex-1 bg-slate-100 my-2"></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-1">
                                    <h4 className="text-sm font-semibold text-slate-900">{activity.title || activity.action_type}</h4>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {new Date(activity.created_at).toLocaleDateString()} • {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
