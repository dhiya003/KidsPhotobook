import React, { useState } from 'react';
import { Sparkles, BookOpen, User, ShieldCheck, Menu, X, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, storyId?: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  myStoriesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isAdmin,
  onToggleAdmin,
  myStoriesCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Explore Stories' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'about', label: 'Our Story' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F5B027] to-[#EB5E44] flex items-center justify-center text-white shadow-md shadow-[#EB5E44]/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-white/80" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-[#162032] flex items-center gap-1">
                VERVE <span className="text-[#EB5E44]">STUDIO</span>
              </span>
              <p className="text-[11px] font-medium text-[#56647A] tracking-wider uppercase -mt-1 hidden sm:block">
                Make your child the hero
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-semibold transition-colors ${
                  currentView === link.id
                    ? 'text-[#EB5E44]'
                    : 'text-[#162032] hover:text-[#EB5E44]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin Switcher */}
            <button
              id="admin-toggle-btn"
              onClick={onToggleAdmin}
              title="Toggle Admin View"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isAdmin
                  ? 'bg-[#162032] text-[#F5B027] border-[#162032]'
                  : 'bg-white/80 text-[#56647A] border-[#E8DFD1] hover:border-[#162032]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              {isAdmin ? 'Admin: Active' : 'Admin Portal'}
            </button>

            {/* My Characters / Stories */}
            <button
              id="my-stories-nav-btn"
              onClick={() => onNavigate('my-stories')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                currentView === 'my-stories'
                  ? 'bg-[#162032] text-white border-[#162032]'
                  : 'bg-white text-[#162032] border-[#E8DFD1] hover:border-[#F5B027] shadow-xs'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#EB5E44]" />
              <span>My Stories</span>
              {myStoriesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#EB5E44] text-white text-[10px] flex items-center justify-center font-bold">
                  {myStoriesCount}
                </span>
              )}
            </button>

            {/* Primary CTA */}
            <button
              id="header-create-story-btn"
              onClick={() => onNavigate('wizard')}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#EB5E44] hover:bg-[#D94F36] shadow-sm shadow-[#EB5E44]/25 hover:shadow-md transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Their Story</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-wizard-quick-btn"
              onClick={() => onNavigate('wizard')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#EB5E44]"
            >
              Create
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#162032] hover:bg-[#E8DFD1]/50 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF7F2] border-b border-[#E8DFD1] px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                  currentView === link.id
                    ? 'bg-[#EB5E44]/10 text-[#EB5E44]'
                    : 'text-[#162032] hover:bg-[#E8DFD1]/40'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E8DFD1] flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('my-stories');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E8DFD1] text-sm font-semibold text-[#162032] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#EB5E44]" />
                My Stories
              </span>
              {myStoriesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#EB5E44] text-white text-xs">
                  {myStoriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onToggleAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-4 rounded-xl bg-[#162032] text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-[#F5B027]" />
              {isAdmin ? 'Exit Admin Dashboard' : 'Open Admin Dashboard'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
