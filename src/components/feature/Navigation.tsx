import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserAvatarMenu } from './UserAvatarMenu';

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/home', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { path: '/company-research', label: 'Skills & Research', icon: 'ri-search-line' },
    { path: '/cover-letter', label: 'Cover Letters', icon: 'ri-file-text-line' },
  ];

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg">
                <i className="ri-briefcase-4-line text-lg md:text-xl text-white"></i>
              </div>
              <h1 className="text-base md:text-xl font-semibold text-slate-900 tracking-tight">Career Assistant</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${location.pathname === item.path
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                  <i className={`${item.icon} text-base`}></i>
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="ml-4 pl-4 border-l border-slate-200">
                {user ? (
                  <UserAvatarMenu />
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 text-sm font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              {user && <UserAvatarMenu />}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl text-slate-700`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full pt-16">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-4 text-base font-medium ${location.pathname === item.path
                  ? 'bg-teal-50 text-teal-700 border-r-4 border-teal-600'
                  : 'text-slate-700'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <i className={`${item.icon} text-xl`}></i>
              <span>{item.label}</span>
            </Link>
          ))}

          {!user && (
            <div className="mt-4 pt-4 border-t border-slate-200 px-6 space-y-3">
              <Link to="/login" className="block text-center py-2 text-slate-700 font-medium">Log In</Link>
              <Link to="/signup" className="block text-center py-2 bg-teal-600 text-white rounded-lg font-medium">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
