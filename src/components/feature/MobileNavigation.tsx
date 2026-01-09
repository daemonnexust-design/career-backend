import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { to: '/home', icon: 'ri-home-5-line', label: 'Home' },
    { to: '/profile', icon: 'ri-user-settings-line', label: 'Profile' },
    { to: '/upload-cv', icon: 'ri-file-upload-line', label: 'Upload CV' },
    { to: '/company-research', icon: 'ri-search-line', label: 'Research' },
    { to: '/cover-letter', icon: 'ri-file-text-line', label: 'Cover Letter' },
    { to: '/email-control', icon: 'ri-mail-send-line', label: 'Email Control' }
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <i className="ri-briefcase-4-line text-lg text-white"></i>
            </div>
            <span className="text-lg font-bold text-slate-900">Career</span>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span
                className={`block h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
              ></span>
              <span
                className={`block h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                  }`}
              ></span>
              <span
                className={`block h-0.5 bg-slate-900 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
              ></span>
            </div>
          </button>
        </div>
      </div>
    </header >

      {/* Mobile Menu Overlay */ }
      < div
  className = {`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'
    }`
}
      >
  {/* Backdrop */ }
  < div
className = {`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
  }`}
onClick = {() => setIsOpen(false)}
        ></div >

  {/* Menu Panel */ }
  < div
className = {`absolute top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
        >
  {/* Menu Header */ }
  < div className = "flex items-center justify-between px-4 py-3 border-b border-slate-200" >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <i className="ri-briefcase-4-line text-lg text-white"></i>
              </div>
              <span className="text-lg font-bold text-slate-900">Menu</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <i className="ri-close-line text-2xl text-slate-900"></i>
            </button>
          </div >

  {/* User Info */ }
{
  user && (
    <Link to="/profile" className="block px-4 py-4 bg-gradient-to-br from-teal-50 to-emerald-50 border-b border-slate-200 active:bg-teal-100 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
          <i className="ri-user-line text-xl text-white"></i>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {user.email}
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            View Profile <i className="ri-arrow-right-s-line"></i>
          </p>
        </div>
      </div>
    </Link>
  )
}

{/* Navigation Links */ }
<nav className="flex-1 overflow-y-auto py-2">
  {navItems.map((item) => {
    const isActive = location.pathname === item.to;
    return (
      <Link
        key={item.to}
        to={item.to}
        className={`flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer ${isActive
          ? 'bg-teal-50 text-teal-600 border-r-4 border-teal-600'
          : 'text-slate-700 hover:bg-slate-50'
          }`}
      >
        <i className={`${item.icon} text-xl`}></i>
        <span className="text-base font-medium">{item.label}</span>
        {isActive && (
          <i className="ri-arrow-right-s-line text-lg ml-auto"></i>
        )}
      </Link>
    );
  })}
</nav>

{/* Menu Footer */ }
<div className="border-t border-slate-200 p-4 space-y-2">
  <Link
    to="/privacy-policy"
    className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
  >
    <i className="ri-shield-check-line text-lg"></i>
    <span className="text-sm">Privacy Policy</span>
  </Link>
  <Link
    to="/terms-of-service"
    className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
  >
    <i className="ri-file-list-line text-lg"></i>
    <span className="text-sm">Terms of Service</span>
  </Link>
  {user && (
    <button
      onClick={handleSignOut}
      className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
    >
      <i className="ri-logout-box-line text-lg"></i>
      <span className="text-sm font-medium">Sign Out</span>
    </button>
  )}
</div>
        </div >
      </div >
    </>
  );
}
