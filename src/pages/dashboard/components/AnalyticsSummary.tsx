
export default function AnalyticsSummary() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: 'Applications', value: '0', icon: 'ri-send-plane-fill', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Interviews', value: '0', icon: 'ri-calendar-event-fill', color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Offers', value: '0', icon: 'ri-trophy-fill', color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Response Rate', value: '0%', icon: 'ri-bar-chart-fill', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                        <i className={`${stat.icon} text-lg`}></i>
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                    <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                </div>
            ))}
        </div>
    );
}
