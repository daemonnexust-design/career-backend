import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const features = [
    {
      icon: 'ri-file-text-line',
      title: 'Smart CV Analysis',
      description: 'Upload your CV and get AI-powered insights to optimize your resume for any job application.',
      image: 'https://readdy.ai/api/search-image?query=professional%20resume%20document%20being%20analyzed%20by%20AI%20with%20checkmarks%20and%20optimization%20suggestions%20floating%20around%20it%2C%20modern%20clean%20illustration%20style%20with%20teal%20and%20white%20colors%2C%20minimalist%20business%20aesthetic%20showing%20CV%20review%20process%20with%20data%20points%20and%20improvement%20indicators%2C%20digital%20art%20with%20simple%20geometric%20shapes%20and%20organized%20layout%20perfect%20for%20feature%20card&width=400&height=300&seq=feature-cv-analysis-illustration-v2&orientation=landscape'
    },
    {
      icon: 'ri-building-line',
      title: 'Company Research',
      description: 'Deep dive into company culture, values, and interview processes to prepare like a pro.',
      image: 'https://readdy.ai/api/search-image?query=modern%20office%20building%20with%20magnifying%20glass%20and%20research%20data%20charts%20floating%20around%20it%2C%20company%20culture%20analysis%20illustration%20with%20information%20bubbles%20and%20insights%2C%20professional%20business%20style%20showing%20corporate%20research%20process%20with%20teal%20accents%2C%20clean%20geometric%20design%20with%20organized%20visual%20elements%20perfect%20for%20feature%20card&width=400&height=300&seq=feature-company-research-illustration-v2&orientation=landscape'
    },
    {
      icon: 'ri-mail-line',
      title: 'Cover Letter Generator',
      description: 'Create personalized, compelling cover letters tailored to each job opportunity.',
      image: 'https://readdy.ai/api/search-image?query=elegant%20business%20letter%20with%20AI%20writing%20pen%20and%20personalization%20sparkles%20around%20it%2C%20professional%20cover%20letter%20creation%20illustration%20showing%20text%20editing%20and%20customization%2C%20modern%20style%20with%20teal%20highlights%20and%20clean%20typography%20design%2C%20digital%20illustration%20with%20organized%20composition%20perfect%20for%20feature%20card&width=400&height=300&seq=feature-cover-letter-illustration-v2&orientation=landscape'
    },
    {
      icon: 'ri-send-plane-line',
      title: 'Email Control Center',
      description: 'Manage your job application emails with smart scheduling and follow-up tracking.',
      image: 'https://readdy.ai/api/search-image?query=email%20inbox%20dashboard%20with%20calendar%20scheduling%20icons%20and%20notification%20bells%20floating%20around%20it%2C%20professional%20email%20management%20illustration%20showing%20organized%20communication%20and%20automated%20follow-ups%2C%20modern%20digital%20style%20with%20teal%20accents%20and%20clean%20UI%20elements%20representing%20control%20center%20perfect%20for%20feature%20card&width=400&height=300&seq=feature-email-control-illustration-v2&orientation=landscape'
    }
  ];

  const benefits = [
    {
      icon: 'ri-time-line',
      title: 'Save Time',
      description: 'Automate repetitive tasks and focus on what matters most - landing your dream job.',
      image: 'https://readdy.ai/api/search-image?query=minimalist%20illustration%20of%20stopwatch%20with%20automated%20workflow%20arrows%20and%20task%20checkmarks%20floating%20around%20in%20teal%20and%20emerald%20gradient%20colors%2C%20clean%20white%20background%20showing%20time%20management%20and%20efficiency%20with%20organized%20geometric%20elements%2C%20professional%20business%20style%20representing%20productivity%20automation%20and%20time%20saving%2C%20digital%20art%20with%20smooth%20gradients%20and%20simple%20shapes%20perfect%20for%20benefit%20card&width=400&height=300&seq=benefit-time-save-illustration-v5&orientation=landscape'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'AI-Powered Insights',
      description: 'Leverage cutting-edge AI to get personalized recommendations and guidance.',
      image: 'https://readdy.ai/api/search-image?query=modern%20illustration%20of%20glowing%20lightbulb%20with%20AI%20brain%20circuits%20and%20data%20streams%20in%20blue%20and%20indigo%20gradient%20colors%2C%20futuristic%20artificial%20intelligence%20concept%20with%20neural%20network%20patterns%20and%20smart%20algorithms%2C%20clean%20style%20showing%20intelligent%20insights%20and%20personalized%20recommendations%20with%20geometric%20tech%20elements%2C%20digital%20illustration%20with%20gradient%20colors%20perfect%20for%20benefit%20card&width=400&height=300&seq=benefit-ai-insights-illustration-v5&orientation=landscape'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected. We never share your information.',
      image: 'https://readdy.ai/api/search-image?query=clean%20illustration%20of%20protective%20shield%20with%20checkmark%20and%20padlock%20symbols%20in%20purple%20and%20pink%20gradient%20colors%2C%20cybersecurity%20and%20data%20protection%20concept%20with%20encryption%20icons%20and%20secure%20elements%2C%20modern%20privacy%20visualization%20with%20geometric%20patterns%20showing%20confidentiality%20and%20safety%2C%20digital%20art%20with%20gradient%20colors%20perfect%20for%20benefit%20card&width=400&height=300&seq=benefit-security-privacy-illustration-v5&orientation=landscape'
    },
    {
      icon: 'ri-trophy-line',
      title: 'Proven Results',
      description: 'Join thousands of successful job seekers who landed their dream roles.',
      image: 'https://readdy.ai/api/search-image?query=vibrant%20illustration%20of%20winner%20trophy%20with%20success%20stars%20and%20achievement%20celebration%20elements%20in%20orange%20and%20red%20gradient%20colors%2C%20career%20accomplishment%20concept%20with%20upward%20growth%20arrows%20and%20victory%20symbols%2C%20inspiring%20motivational%20design%20showing%20professional%20success%20and%20goals%20achieved%2C%20digital%20art%20with%20warm%20gradient%20colors%20perfect%20for%20benefit%20card&width=400&height=300&seq=benefit-proven-results-illustration-v5&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={user ? "/home" : "/"} className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <i className="ri-briefcase-line text-lg sm:text-xl text-white"></i>
              </div>
              <span className={`text-lg sm:text-xl font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>Career Assistant</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-4">
              {user ? (
                <Link
                  to="/home"
                  className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${scrolled ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-teal-200'}`}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-slate-900' : 'bg-white'} ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-slate-900' : 'bg-white'} ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${scrolled ? 'bg-slate-900' : 'bg-white'} ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 sm:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className={`absolute top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <span className="text-lg font-bold text-slate-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <i className="ri-close-line text-2xl text-slate-900"></i>
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-4 py-8 space-y-4">
              {user ? (
                <Link
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-6 py-3 text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg cursor-pointer"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-6 py-3 text-center text-slate-700 font-medium rounded-lg border-2 border-slate-200 hover:border-teal-600 hover:text-teal-600 transition-all cursor-pointer"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-6 py-3 text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all shadow-lg cursor-pointer"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-0">
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-center bg-[center_top]"
          style={{
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=modern%20professional%20workspace%20with%20laptop%20and%20coffee%20minimalist%20clean%20aesthetic%20soft%20natural%20lighting%20warm%20tones%20abstract%20geometric%20shapes%20floating%20in%20background%20representing%20career%20growth%20and%20success%20digital%20illustration%20style%20vertical%20composition%20centered%20subject%20perfect%20for%20mobile%20screens&width=800&height=1200&seq=landing-hero-bg-mobile-001&orientation=portrait)'
          }}
        >
          {/* Mobile-specific background for better fit */}
          <div
            className="hidden sm:block absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://readdy.ai/api/search-image?query=modern%20professional%20workspace%20with%20laptop%20and%20coffee%20minimalist%20clean%20aesthetic%20soft%20natural%20lighting%20warm%20tones%20abstract%20geometric%20shapes%20floating%20in%20background%20representing%20career%20growth%20and%20success%20digital%20illustration%20style&width=1920&height=1080&seq=landing-hero-bg-001&orientation=landscape)'
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 sm:from-black/50 sm:via-black/40 sm:to-black/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-32 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <i className="ri-sparkle-line"></i>
            <span>AI-Powered Career Tools</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
            Land Your Dream Job<br />
            <span className="text-teal-400">Faster & Smarter</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Your all-in-one career assistant powered by AI. From CV optimization to company research,
            we help you stand out and succeed in your job search.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            {user ? (
              <Link
                to="/home"
                className="w-full sm:w-auto px-10 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-2xl hover:shadow-teal-500/50 whitespace-nowrap inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Back to Dashboard
                <i className="ri-arrow-right-line"></i>
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:from-teal-600 hover:to-teal-700 transition-all shadow-2xl hover:shadow-teal-500/50 whitespace-nowrap inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  Start Free Today
                  <i className="ri-arrow-right-line"></i>
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-white/20 transition-all border border-white/20 whitespace-nowrap inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="ri-login-box-line"></i>
                  Log In
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/80 text-xs sm:text-base px-4">
            <div className="flex items-center gap-2">
              <i className="ri-check-line text-teal-400 text-lg sm:text-xl"></i>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-check-line text-teal-400 text-lg sm:text-xl"></i>
              <span>Free to start</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-3xl text-white/60"></i>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-50 rounded-full text-teal-600 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              <i className="ri-star-line"></i>
              <span>Powerful Features</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Comprehensive tools designed to streamline your job search and maximize your chances of success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Icon Overlay */}
                  <div className="absolute top-4 left-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <i className={`${feature.icon} text-xl sm:text-2xl text-white`}></i>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Your Success is Our Mission
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              We combine cutting-edge AI technology with proven career strategies to give you the competitive edge.
            </p>
          </div>

          {/* Horizontal Scrollable Cards for Mobile, Grid for Desktop */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:overflow-visible sm:mx-0 sm:px-0">
            <div className="flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 min-w-max sm:min-w-0">
              {benefits.map((benefit, index) => {
                const gradients = [
                  'from-teal-500 to-emerald-600',
                  'from-blue-500 to-indigo-600',
                  'from-purple-500 to-pink-600',
                  'from-orange-500 to-red-600'
                ];
                const bgGradients = [
                  'from-teal-50 to-emerald-50',
                  'from-blue-50 to-indigo-50',
                  'from-purple-50 to-pink-50',
                  'from-orange-50 to-red-50'
                ];
                const borderColors = [
                  'border-teal-200',
                  'border-blue-200',
                  'border-purple-200',
                  'border-orange-200'
                ];

                return (
                  <div
                    key={index}
                    className={`group relative w-64 sm:w-auto flex-shrink-0 bg-white rounded-2xl border ${borderColors[index]} shadow-lg hover:shadow-2xl transition-all hover:scale-105 overflow-hidden cursor-pointer`}
                  >
                    {/* Image Background */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">
                        {benefit.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scroll Indicator Dots for Mobile */}
          <div className="flex justify-center gap-2 mt-4 sm:hidden">
            {benefits.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 bg-gradient-to-br from-teal-500 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-base sm:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed">
            Join thousands of job seekers who are already using Career Assistant to land their dream jobs.
            Start your journey today - it's free to get started!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {user ? (
              <Link
                to="/home"
                className="w-full sm:w-auto px-10 sm:px-12 py-3 sm:py-4 bg-white text-teal-600 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl whitespace-nowrap inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                Enter Dashboard
                <i className="ri-dashboard-line"></i>
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-teal-600 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl whitespace-nowrap inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  Create Free Account
                  <i className="ri-arrow-right-line"></i>
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-white/20 transition-all border border-white/20 whitespace-nowrap inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="ri-login-box-line"></i>
                  Already have an account?
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/80 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <i className="ri-shield-check-line text-base sm:text-lg"></i>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-time-line text-base sm:text-lg"></i>
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-customer-service-line text-base sm:text-lg"></i>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link to={user ? "/home" : "/"} className="flex items-center gap-2 sm:gap-3 transition-transform hover:scale-105">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <i className="ri-briefcase-line text-lg sm:text-xl text-white"></i>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">Career Assistant</span>
            </Link>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400">
              <Link to="/terms-of-service" className="hover:text-white transition-colors cursor-pointer">
                Terms of Service
              </Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </Link>
              <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">
                NDPR Aligned
              </a>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center text-xs sm:text-sm text-gray-400">
            <p>&copy; 2025 Career Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
