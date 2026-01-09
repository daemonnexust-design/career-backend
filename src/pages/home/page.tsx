import { useAuth } from '../../hooks/useAuth';
import Layout from '../../components/feature/Layout';
import CVWidget from '../dashboard/components/CVWidget';
import AnalyticsSummary from '../dashboard/components/AnalyticsSummary';
import ActivityFeed from '../dashboard/components/ActivityFeed';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.first_name || 'Professional';

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">{firstName}</span>
              </h1>
              <p className="text-slate-600 mt-1">
                Here's what's happening with your job search today.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/company-research"
                className="px-4 py-2 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <i className="ri-search-line mr-2"></i>
                Research
              </Link>
              <Link
                to="/upload-cv"
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-teal-500/20 transition-all"
              >
                <i className="ri-add-line mr-2"></i>
                New Application
              </Link>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

            {/* Left Column (Main) */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">

              {/* Analytics Section */}
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Overview</h2>
                <AnalyticsSummary />
              </section>

              {/* Tools Grid */}
              <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Company Research', desc: 'Analyze company culture & values', icon: 'ri-briefcase-line', link: '/company-research', color: 'text-blue-500', bg: 'bg-blue-50' },
                    { title: 'Cover Letter', desc: 'Generate tailored cover letters', icon: 'ri-quill-pen-line', link: '/cover-letter', color: 'text-purple-500', bg: 'bg-purple-50' },
                    { title: 'Email Control', desc: 'Draft professional emails', icon: 'ri-mail-check-line', link: '/email-control', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { title: 'Wishlist', desc: 'Manage your dream jobs', icon: 'ri-heart-line', link: '/profile', color: 'text-pink-500', bg: 'bg-pink-50' }
                  ].map((tool, idx) => (
                    <Link key={idx} to={tool.link} className="group p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform`}>
                          <i className={`${tool.icon} text-xl`}></i>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">{tool.title}</h3>
                          <p className="text-sm text-slate-500 mt-1">{tool.desc}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recent Applications (Placeholder) */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">Recent Applications</h2>
                  <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">View All</button>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-folder-add-line text-2xl text-slate-400"></i>
                  </div>
                  <h3 className="text-slate-900 font-medium mb-1">No applications yet</h3>
                  <p className="text-slate-500 text-sm mb-4">Start tracking your job applications here</p>
                  <button className="text-sm text-teal-600 font-medium border border-teal-200 px-4 py-2 rounded-lg hover:bg-teal-50">
                    Track Application
                  </button>
                </div>
              </section>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6 md:space-y-8">

              {/* CV Widget */}
              <section className="h-[280px]">
                <CVWidget />
              </section>

              {/* Activity Feed */}
              <section>
                <ActivityFeed />
              </section>

              {/* Daily Tip */}
              <section className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <i className="ri-lightbulb-flash-line text-8xl transform rotate-12"></i>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 text-indigo-100 text-sm font-medium uppercase tracking-wider">
                    <i className="ri-sparkling-fill text-yellow-300"></i>
                    Daily Tip
                  </div>
                  <p className="text-lg font-medium leading-relaxed mb-4">
                    "Tailoring your CV for every application increases your chances by 40%."
                  </p>
                  <button className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm">
                    Read more
                  </button>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
