import React from 'react';
import { Lock, MapPin, Shield, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
  onOpenPrivacyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate = () => {}, onOpenPrivacyModal = () => {} }) => {
  return (
    <footer className="border-t border-[#EBE4DA] bg-[#FAF8F5] py-8 text-xs text-[#56647A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-serif-story text-xl font-bold text-[#161922]">
              Verve Studio
            </span>
            <span className="hidden sm:inline text-[#D5CDC2]">•</span>
            <span className="text-[#64748B]">
              Personalized Stories &nbsp;•&nbsp; Meaningful Keepsakes &nbsp;•&nbsp; A Lifetime of Memories
            </span>
          </div>

          {/* Right: 4 Trust Badges & Privacy Trigger */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center text-[#56647A] font-medium text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#C05638]" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C05638]" />
              <span>Made in India</span>
            </div>
            <button 
              type="button"
              onClick={onOpenPrivacyModal}
              className="flex items-center gap-1.5 hover:text-[#C05638] transition cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#C05638]" />
              <span>Privacy Protected</span>
            </button>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C05638]" />
              <span>Quality Checked</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
