import React from 'react';
import { X, ShieldCheck, Lock, Trash2, CheckCircle2, FileText } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteAllPhotos?: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  onDeleteAllPhotos
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#162032]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E8DFD1] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#E8DFD1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4EAA8C] text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#4EAA8C] uppercase tracking-wider">
                Child Safety & Data Privacy
              </span>
              <h3 className="font-display text-xl font-bold text-[#162032]">
                Your child’s photo belongs to you.
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#56647A] hover:bg-white hover:text-[#162032] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs sm:text-sm leading-relaxed text-[#56647A]">
          <div className="p-4 rounded-2xl bg-[#F0F9F5] border border-[#BDE5D3] text-[#2A7E5B]">
            <p className="font-semibold text-xs">
              "We use your uploaded photo solely to create their personalized experience. We do not publicly display your child's photograph, we do not sell your data, and we do not use your child's photographs to train public artificial intelligence models."
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-base text-[#162032]">
              Our 5 Child Safety Commitments
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#4EAA8C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#162032]">1. Parental & Legal Guardian Authority:</span>
                  <p className="text-xs text-[#56647A] mt-0.5">
                    We require explicit parental or legal guardian consent prior to accepting any photograph. Only guardians may submit photos for book creation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#4EAA8C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#162032]">2. Zero Public Directory:</span>
                  <p className="text-xs text-[#56647A] mt-0.5">
                    No customer photo or child portrait is ever placed in public internet folders, search indexes, or marketing collaterals without separate written parent release.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#4EAA8C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#162032]">3. Encrypted Private Storage:</span>
                  <p className="text-xs text-[#56647A] mt-0.5">
                    All reference imagery is encrypted in isolated cloud buckets with signed, time-limited tokens (TTL max 60 minutes) used solely during production rendering.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#4EAA8C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#162032]">4. Automatic Expiration & Deletion:</span>
                  <p className="text-xs text-[#56647A] mt-0.5">
                    Reference photos are scheduled for automatic hard deletion after story fulfillment unless you specifically request saving your reusable character profile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#4EAA8C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#162032]">5. Right to Instant Erasure:</span>
                  <p className="text-xs text-[#56647A] mt-0.5">
                    You hold the unconditional right to delete your child’s photo and character data at any moment with a single click.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action to delete photos */}
          <div className="pt-4 border-t border-[#F0E9DF] p-4 rounded-2xl bg-[#FFF5F5] border border-[#FAD2D2] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h5 className="font-display font-bold text-xs text-[#D94F36]">
                Erase Photo & Character Data
              </h5>
              <p className="text-[11px] text-[#56647A]">
                Permanently purge all uploaded reference photos from our processing servers.
              </p>
            </div>

            <button
              onClick={() => {
                if (confirm('Permanently purge all uploaded photos and character data from servers?')) {
                  if (onDeleteAllPhotos) onDeleteAllPhotos();
                  alert('All child photos have been permanently removed.');
                  onClose();
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#D94F36] hover:bg-[#C24129] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Photo Data</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DFD1] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#162032] text-white text-xs font-bold hover:bg-[#EB5E44] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
