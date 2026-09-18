import React from 'react';
import { Sparkles, ShieldCheck, Heart, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacyModal }) => {
  return (
    <footer className="bg-[#162032] text-white pt-16 pb-12 border-t border-[#232F46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#F5B027] to-[#EB5E44] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 fill-white/80" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                VERVE <span className="text-[#EB5E44]">STUDIO</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Children grow up quickly. Photos get stored on phones. But stories become memories. Verve Studio brings the two together."
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#F5B027] font-semibold">
              <span>🇮🇳 India-First Children’s Storytelling Platform</span>
            </div>
          </div>

          {/* Col 2: Stories & Products */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white tracking-wider uppercase">
              Explore Stories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Space & Galaxy Adventures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Jungle & Wildlife Expeditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  My Journey Through India
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Magical Birthday Editions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">
                  Bedtime Dream World
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
                  Digital, Paperback & Hardcover
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white tracking-wider uppercase">
              Parent Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">
                  How Personalization Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Verve Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacyModal} className="hover:text-white transition-colors flex items-center gap-1 text-[#4EAA8C]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Children’s Photo Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Shipping & India-Wide Delivery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Support */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white tracking-wider uppercase">
              Parent Happiness Team
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Questions about creating your child’s storybook? We are here to help.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#EB5E44]" />
                <span>support@vervestudio.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F5B027]" />
                <span>WhatsApp Care: +91 98450 12890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4EAA8C]" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 border-t border-[#232F46] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Verve Studio Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacyModal} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
              Refund Policy
            </button>
            <span>•</span>
            <span className="text-[#F5B027] font-semibold">Currency: INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
