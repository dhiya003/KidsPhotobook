import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, storyId?: string) => void;
  cartCount?: number;
  onOpenSearch?: () => void;
  isAdmin?: boolean;
  onToggleAdmin?: () => void;
  myStoriesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount = 0,
  onOpenSearch,
  isAdmin = false,
  onToggleAdmin,
  myStoriesCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE4DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 group text-left focus:outline-none cursor-pointer"
          >
            <span className="font-serif-story text-2xl sm:text-3xl font-bold tracking-tight text-[#161922]">
              Verve Studio
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              id="nav-link-stories"
              onClick={() => onNavigate('stories')}
              className={`transition-colors cursor-pointer ${
                currentView === 'stories' || currentView === 'catalog'
                  ? 'text-[#C05638] font-semibold'
                  : 'text-[#161922] hover:text-[#C05638]'
              }`}
            >
              Stories
            </button>
            <button
              id="nav-link-how-it-works"
              onClick={() => onNavigate('how-it-works')}
              className={`transition-colors cursor-pointer ${
                currentView === 'how-it-works'
                  ? 'text-[#C05638] font-semibold'
                  : 'text-[#161922] hover:text-[#C05638]'
              }`}
            >
              How it Works
            </button>
            <button
              id="nav-link-gifts"
              onClick={() => onNavigate('gifts')}
              className={`transition-colors cursor-pointer ${
                currentView === 'gifts'
                  ? 'text-[#C05638] font-semibold'
                  : 'text-[#161922] hover:text-[#C05638]'
              }`}
            >
              Gifts
            </button>
            <button
              id="nav-link-about"
              onClick={() => onNavigate('about')}
              className={`transition-colors cursor-pointer ${
                currentView === 'about'
                  ? 'text-[#C05638] font-semibold'
                  : 'text-[#161922] hover:text-[#C05638]'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon */}
            <button
              id="nav-search-btn"
              onClick={() => {
                if (onOpenSearch) onOpenSearch();
                else onNavigate('stories');
              }}
              title="Search stories"
              className="p-2 rounded-full text-[#161922] hover:text-[#C05638] hover:bg-[#F0E9DF]/60 transition cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / My Orders */}
            <button
              id="nav-account-btn"
              onClick={() => onNavigate('account')}
              title="My Account & Orders"
              className={`p-2 rounded-full transition cursor-pointer ${
                currentView === 'account'
                  ? 'text-[#C05638] bg-[#C05638]/10'
                  : 'text-[#161922] hover:text-[#C05638] hover:bg-[#F0E9DF]/60'
              }`}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart / Bag */}
            <button
              id="nav-cart-btn"
              onClick={() => onNavigate('account')}
              title="Shopping Cart & Orders"
              className="p-2 rounded-full text-[#161922] hover:text-[#C05638] hover:bg-[#F0E9DF]/60 transition relative cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C05638] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[#161922] hover:bg-[#F0E9DF]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#EBE4DA] px-6 py-5 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3 font-medium text-base">
            <button
              onClick={() => {
                onNavigate('stories');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#161922] hover:text-[#C05638]"
            >
              Stories
            </button>
            <button
              onClick={() => {
                onNavigate('how-it-works');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#161922] hover:text-[#C05638]"
            >
              How it Works
            </button>
            <button
              onClick={() => {
                onNavigate('gifts');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#161922] hover:text-[#C05638]"
            >
              Gifts
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#161922] hover:text-[#C05638]"
            >
              About
            </button>
            <button
              onClick={() => {
                onNavigate('account');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#161922] hover:text-[#C05638] border-t border-[#EBE4DA] pt-3"
            >
              My Orders & Account
            </button>
          </div>

          <button
            onClick={() => {
              onNavigate('wizard');
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 rounded-xl bg-[#C05638] hover:bg-[#AC492E] text-white font-medium text-sm transition shadow-sm"
          >
            Create a Story
          </button>
        </div>
      )}
    </header>
  );
};
