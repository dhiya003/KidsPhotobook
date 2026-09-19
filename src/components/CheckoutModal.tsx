import React, { useState } from 'react';
import { PersonalizedStoryPreview, BookFormat, Order, BookSizeOption } from '../types';
import { INITIAL_PRICING } from '../data/mockStories';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Download, 
  BookOpen, 
  Gift, 
  Truck, 
  CreditCard, 
  Lock, 
  ArrowRight,
  Sparkles,
  PhoneCall,
  Volume2
} from 'lucide-react';

interface CheckoutModalProps {
  preview: PersonalizedStoryPreview;
  format: BookFormat;
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  preview,
  format,
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [selectedFormat, setSelectedFormat] = useState<BookFormat>(format);
  const [selectedSize, setSelectedSize] = useState<BookSizeOption>('8.5x8.5');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [includeAudioNarrator, setIncludeAudioNarrator] = useState(false);

  // Parent & Shipping Info
  const [parentName, setParentName] = useState('Priya Sharma');
  const [parentEmail, setParentEmail] = useState('priya.sharma@example.com');
  const [parentPhone, setParentPhone] = useState('+91 98765 43210');
  const [shippingAddress, setShippingAddress] = useState('Flat 402, Sunshine Heights, Indiranagar');
  const [shippingCity, setShippingCity] = useState('Bengaluru');
  const [shippingState, setShippingState] = useState('Karnataka');
  const [shippingPincode, setShippingPincode] = useState('560038');

  // Checkout State
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<Order | null>(null);

  const activePlan = INITIAL_PRICING.find(p => p.format === selectedFormat) || INITIAL_PRICING[1];
  const isDigitalOnly = selectedFormat === 'digital';

  // Calculate Total
  const basePrice = activePlan.price;
  const giftWrapPrice = (!isDigitalOnly && includeGiftWrap) ? 99 : 0;
  const audioPrice = includeAudioNarrator ? 149 : 0;
  const finalTotal = basePrice + giftWrapPrice + audioPrice;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: `VRV-${Math.floor(100000 + Math.random() * 900000)}`,
        previewId: preview.id,
        storyTitle: preview.storyTitle,
        childName: preview.childName,
        customerName: parentName,
        email: parentEmail,
        phone: parentPhone,
        shippingAddress: isDigitalOnly ? undefined : {
          street: shippingAddress,
          city: shippingCity,
          state: shippingState,
          pincode: shippingPincode
        },
        format: selectedFormat,
        packageTitle: activePlan.title,
        selectedSize: isDigitalOnly ? undefined : selectedSize,
        language: preview.language,
        amount: finalTotal,
        quantity: activePlan.bundleQuantity || 1,
        includesEbook: true,
        status: isDigitalOnly ? 'Delivered' : 'Queued for Print',
        trackingNumber: isDigitalOnly ? undefined : `TRK-VRV-${Math.floor(100000 + Math.random() * 900000)}`,
        pdfDownloadUrl: `/downloads/${preview.childName.toLowerCase()}-keepsake-ebook.pdf`,
        createdAt: new Date().toISOString()
      };
      setIsProcessing(false);
      setOrderComplete(newOrder);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#162032]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E8DFD1] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#E8DFD1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EB5E44]/10 border border-[#EB5E44]/20 flex items-center justify-center text-[#EB5E44]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#EB5E44]">
                Secure 256-Bit Checkout
              </span>
              <h3 className="font-display text-xl font-bold text-[#162032]">
                {orderComplete ? 'Order Confirmed!' : `Unlock & Order ${preview.childName}’s Storybook`}
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

        {/* ORDER COMPLETE STATE */}
        {orderComplete ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#4EAA8C]/15 border-2 border-[#4EAA8C] text-[#4EAA8C] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#4EAA8C]">
                Order #{orderComplete.id} Placed Successfully
              </span>
              <h3 className="font-display text-2xl font-bold text-[#162032] mt-1">
                Thank you, {orderComplete.customerName}!
              </h3>
              <p className="text-xs text-[#56647A] mt-1.5 max-w-md mx-auto">
                {isDigitalOnly
                  ? 'Your instant 300 DPI high-res eBook is ready to read and download right now.'
                  : 'Your Hardcover keepsake has entered our editorial quality check and POD printing queue. Your Instant eBook is also ready immediately!'}
              </p>
            </div>

            {/* Instant eBook Download Card */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E8DFD1] overflow-hidden shrink-0">
                  <img src={preview.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#162032]">
                    Instant High-Res eBook (PDF)
                  </h4>
                  <p className="text-[11px] text-[#56647A]">
                    32 Full-Color Pages • Print-Ready 300 DPI • All Devices
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert(`Downloading high-res 32-page eBook for ${preview.childName}...`)}
                className="px-5 py-2.5 rounded-xl bg-[#162032] hover:bg-[#EB5E44] text-white text-xs font-bold transition-colors flex items-center gap-2 shrink-0 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download eBook</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-[#EB5E44] text-white text-xs font-bold transition-all shadow-md"
            >
              Done & Return to Studio
            </button>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Package Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#162032] block">
                Selected Keepsake Package:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INITIAL_PRICING.map((plan) => (
                  <button
                    key={plan.format}
                    type="button"
                    onClick={() => setSelectedFormat(plan.format)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      selectedFormat === plan.format
                        ? 'bg-[#FFF8F5] border-[#EB5E44] ring-2 ring-[#EB5E44]/20'
                        : 'bg-[#FAF7F2] border-[#E8DFD1] hover:border-[#162032]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-xs text-[#162032]">
                        {plan.title}
                      </span>
                      <span className="font-display font-extrabold text-sm text-[#EB5E44]">
                        ₹{plan.price}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#56647A] block mt-0.5">
                      {plan.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hardcover Size Selection (If Physical) */}
            {!isDigitalOnly && (
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD1] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#162032]">
                    Format & Dimension:
                  </span>
                  <span className="text-[10px] font-bold text-[#4EAA8C]">
                    170 GSM Silk Art Interior
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { size: '8.5x8.5' as BookSizeOption, label: '8.5 × 8.5"', desc: 'Square Deluxe' },
                    { size: '8x8' as BookSizeOption, label: '8 × 8"', desc: 'Standard' },
                    { size: 'A5' as BookSizeOption, label: 'A5', desc: 'Compact' }
                  ].map((spec) => (
                    <button
                      key={spec.size}
                      type="button"
                      onClick={() => setSelectedSize(spec.size)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedSize === spec.size
                          ? 'bg-white border-[#EB5E44] text-[#EB5E44] font-bold shadow-xs'
                          : 'bg-white/60 border-[#E8DFD1] text-[#56647A]'
                      }`}
                    >
                      <span className="text-xs block font-bold">{spec.label}</span>
                      <span className="text-[9px] text-[#8896AB] block">{spec.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add-ons */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#162032] block">
                Personalized Keepsake Add-ons:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {!isDigitalOnly && (
                  <label className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeGiftWrap}
                      onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                      className="w-4 h-4 rounded-sm accent-[#EB5E44]"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-[#162032] flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-[#EB5E44]" /> Luxury Gift Wrap (+₹99)
                      </span>
                      <span className="text-[10px] text-[#56647A] block">Gold ribbon & wax seal box</span>
                    </div>
                  </label>
                )}

                <label className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeAudioNarrator}
                    onChange={(e) => setIncludeAudioNarrator(e.target.checked)}
                    className="w-4 h-4 rounded-sm accent-[#EB5E44]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#162032] flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-[#3B97D3]" /> Audio Story Narrator (+₹149)
                    </span>
                    <span className="text-[10px] text-[#56647A] block">Professional voice narration audio</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Parent Contact & Address */}
            <div className="space-y-3 pt-2">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#162032]">
                Customer & Shipping Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-[#56647A] block mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#56647A] block mb-1">Email for Instant eBook</label>
                  <input
                    type="email"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#56647A] block mb-1">WhatsApp for Tracking</label>
                  <input
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none"
                  />
                </div>
              </div>

              {!isDigitalOnly && (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-[#56647A] block mb-1">Street Address</label>
                    <input
                      type="text"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#56647A] block mb-1">City / State</label>
                    <input
                      type="text"
                      value={`${shippingCity}, ${shippingState}`}
                      onChange={(e) => setShippingCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#56647A] block mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={shippingPincode}
                      onChange={(e) => setShippingPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Total Summary */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#56647A] block">Order Total (Taxes & Shipping Included)</span>
                <span className="font-display text-2xl font-extrabold text-[#162032]">
                  ₹{finalTotal}
                </span>
              </div>

              <button
                id="modal-complete-order-btn"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F5B027] via-[#EB5E44] to-[#D94F36] hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-[#EB5E44]/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>PAY & UNLOCK ₹{finalTotal}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
