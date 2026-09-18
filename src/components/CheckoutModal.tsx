import React, { useState } from 'react';
import { PersonalizedStoryPreview, BookFormat, Order } from '../types';
import { INITIAL_PRICING } from '../data/mockStories';
import { 
  Sparkles, 
  Check, 
  X, 
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  Tag, 
  ArrowRight,
  Video,
  Palette,
  Truck,
  Download
} from 'lucide-react';

interface CheckoutModalProps {
  preview: PersonalizedStoryPreview;
  format: BookFormat;
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi NCR', 'Goa', 'Gujarat', 
  'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  preview,
  format,
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const currentPlan = INITIAL_PRICING.find((p) => p.format === format) || INITIAL_PRICING[1];

  // Form State
  const [customerName, setCustomerName] = useState('Priya Sharma');
  const [email, setEmail] = useState('priya.sharma@example.com');
  const [phone, setPhone] = useState('9876543210');

  // Address (for physical formats)
  const [street, setStreet] = useState('Flat 402, Lotus Residency, Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560038');

  // Add-ons
  const [addVideo, setAddVideo] = useState(false);
  const [addColoringBook, setAddColoringBook] = useState(false);

  // Coupon
  const [couponCode, setCouponCode] = useState('VERVEFIRST');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState(100);

  // Payment State
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Calculations
  const basePrice = currentPlan.price;
  const videoPrice = addVideo ? 299 : 0;
  const coloringPrice = addColoringBook ? 149 : 0;
  const shippingFee = format === 'digital' ? 0 : 0; // Free shipping promo across India
  const discountAmount = couponApplied ? couponDiscount : 0;
  const totalAmount = Math.max(0, basePrice + videoPrice + coloringPrice - discountAmount);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'VERVEFIRST') {
      setCouponApplied(true);
      setCouponDiscount(100);
    } else if (couponCode.toUpperCase() === 'HERO20') {
      setCouponApplied(true);
      setCouponDiscount(Math.round(basePrice * 0.2));
    } else {
      alert('Invalid coupon code. Try VERVEFIRST or HERO20');
    }
  };

  const handleRazorpayPayment = async () => {
    if (!customerName || !email || !phone) {
      alert('Please fill in your contact information.');
      return;
    }

    if (format !== 'digital' && (!street || !city || !pincode)) {
      alert('Please fill in your complete delivery address.');
      return;
    }

    setIsProcessing(true);

    // Simulate Razorpay gateway transaction
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newOrder: Order = {
      id: `VRV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      previewId: preview.id,
      storyTitle: preview.storyTitle,
      childName: preview.childName,
      customerName,
      email,
      phone,
      format,
      language: preview.language,
      amount: totalAmount,
      shippingAddress: format !== 'digital' ? { street, city, state, pincode } : undefined,
      status: format === 'digital' ? 'Ready for Download' : 'Payment Received',
      trackingNumber: format !== 'digital' ? `BD-${Math.floor(100000000 + Math.random() * 900000000)}` : undefined,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      pdfDownloadUrl: '#'
    };

    setIsProcessing(false);
    setCompletedOrder(newOrder);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#162032]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E8DFD1] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#E8DFD1] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#EB5E44] uppercase tracking-wider">
              Secure Checkout
            </span>
            <h3 className="font-display text-xl font-bold text-[#162032]">
              {completedOrder ? 'Order Confirmed!' : `Order ${currentPlan.title}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#56647A] hover:bg-white hover:text-[#162032] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* COMPLETED ORDER VIEW */}
        {completedOrder ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#4EAA8C] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#4EAA8C]/20">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#4EAA8C]">
                Payment Successful
              </span>
              <h2 className="font-display text-3xl font-extrabold text-[#162032] mt-1">
                {preview.childName}’s Story is on its way!
              </h2>
              <p className="text-sm text-[#56647A] mt-2">
                Order ID: <span className="font-bold text-[#162032]">{completedOrder.id}</span>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#56647A]">Storybook:</span>
                <span className="font-bold text-[#162032]">{preview.storyTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#56647A]">Child Name:</span>
                <span className="font-bold text-[#162032]">{preview.childName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#56647A]">Format:</span>
                <span className="font-bold capitalize text-[#162032]">{completedOrder.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#56647A]">Amount Paid:</span>
                <span className="font-bold text-[#EB5E44]">₹{completedOrder.amount}</span>
              </div>
              {completedOrder.trackingNumber && (
                <div className="flex justify-between pt-2 border-t border-[#E8DFD1]">
                  <span className="text-[#56647A]">Courier Tracking:</span>
                  <span className="font-bold text-[#3B97D3]">{completedOrder.trackingNumber}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  alert(`Downloading high-resolution print PDF for ${preview.childName}...`);
                }}
                className="w-full py-3 rounded-xl bg-[#EB5E44] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#D94F36]"
              >
                <Download className="w-4 h-4" />
                <span>Download Digital Story PDF</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl border border-[#E8DFD1] text-[#162032] text-xs font-bold hover:bg-[#FAF7F2]"
              >
                Go to My Stories
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Story Quick Summary */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#162032] shrink-0">
                  <img src={preview.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#162032]">{preview.storyTitle}</h4>
                  <p className="text-xs text-[#56647A]">
                    Hero: <span className="font-semibold text-[#EB5E44]">{preview.childName}</span> • {preview.language}
                  </p>
                </div>
              </div>
              <span className="font-display text-lg font-bold text-[#162032]">
                ₹{currentPlan.price}
              </span>
            </div>

            {/* Section 19: Add-on Upsells */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#162032] uppercase tracking-wider block">
                Recommended Keepsake Add-ons
              </span>

              <div
                onClick={() => setAddVideo(!addVideo)}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  addVideo ? 'border-[#EB5E44] bg-[#FFF8F5]' : 'border-[#E8DFD1] hover:border-[#162032]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#EB5E44]">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-[#162032]">
                      Personalized Animated Story Video
                    </h5>
                    <p className="text-[11px] text-[#56647A]">
                      Watch {preview.childName} come to life in a 2-minute narrated video
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#162032]">+₹299</span>
                  <input
                    type="checkbox"
                    checked={addVideo}
                    readOnly
                    className="w-4 h-4 rounded-sm accent-[#EB5E44]"
                  />
                </div>
              </div>

              <div
                onClick={() => setAddColoringBook(!addColoringBook)}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  addColoringBook ? 'border-[#EB5E44] bg-[#FFF8F5]' : 'border-[#E8DFD1] hover:border-[#162032]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#EB5E44]">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-display font-bold text-xs text-[#162032]">
                      Personalized Printable Coloring Book
                    </h5>
                    <p className="text-[11px] text-[#56647A]">
                      16 printable coloring pages featuring {preview.childName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#162032]">+₹149</span>
                  <input
                    type="checkbox"
                    checked={addColoringBook}
                    readOnly
                    className="w-4 h-4 rounded-sm accent-[#EB5E44]"
                  />
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#162032] uppercase tracking-wider block">
                Parent Contact Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none focus:border-[#EB5E44]"
                />
                <input
                  type="email"
                  placeholder="Email for digital delivery & receipts"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none focus:border-[#EB5E44]"
                />
                <div className="sm:col-span-2 flex items-center">
                  <span className="px-3 py-2.5 rounded-l-xl bg-[#FAF7F2] border border-r-0 border-[#E8DFD1] text-xs font-bold text-[#56647A]">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-r-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none focus:border-[#EB5E44]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address (Physical format) */}
            {format !== 'digital' && (
              <div className="space-y-3 pt-3 border-t border-[#F0E9DF]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#162032] uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#EB5E44]" />
                    Delivery Address in India
                  </span>
                  <span className="text-[11px] font-bold text-[#4EAA8C]">
                    Free Express Shipping
                  </span>
                </div>

                <div className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="House / Flat No., Street, Landmark"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none focus:border-[#EB5E44]"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none focus:border-[#EB5E44]"
                    />
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="px-3 py-2.5 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none bg-white"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="6-digit Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none focus:border-[#EB5E44]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Coupon Section */}
            <div className="pt-2 border-t border-[#F0E9DF]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Have a coupon code?"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-[#E8DFD1] text-xs uppercase text-[#162032] outline-none focus:border-[#EB5E44]"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="px-4 py-2 rounded-xl bg-[#162032] hover:bg-[#EB5E44] text-white text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-[11px] font-bold text-[#4EAA8C] mt-1.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Coupon code "{couponCode}" applied: ₹{couponDiscount} off!
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] space-y-2 text-xs">
              <div className="flex justify-between text-[#56647A]">
                <span>{currentPlan.title}:</span>
                <span className="text-[#162032]">₹{basePrice}</span>
              </div>
              {addVideo && (
                <div className="flex justify-between text-[#56647A]">
                  <span>Personalized Animated Story Video:</span>
                  <span className="text-[#162032]">+₹{videoPrice}</span>
                </div>
              )}
              {addColoringBook && (
                <div className="flex justify-between text-[#56647A]">
                  <span>Personalized Coloring Book:</span>
                  <span className="text-[#162032]">+₹{coloringPrice}</span>
                </div>
              )}
              {format !== 'digital' && (
                <div className="flex justify-between text-[#56647A]">
                  <span>Shipping (India-wide):</span>
                  <span className="text-[#4EAA8C] font-bold">FREE</span>
                </div>
              )}
              {couponApplied && (
                <div className="flex justify-between text-[#4EAA8C]">
                  <span>Promo Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-[#E8DFD1] font-bold text-sm text-[#162032]">
                <span>Total Amount:</span>
                <span className="text-[#EB5E44] font-display text-lg">₹{totalAmount}</span>
              </div>
            </div>

            {/* Razorpay Pay CTA */}
            <button
              id="razorpay-pay-btn"
              onClick={handleRazorpayPayment}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2B84EA] to-[#1258BC] hover:opacity-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Connecting to Razorpay...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Pay ₹{totalAmount} via Razorpay (UPI, Cards, NetBanking)</span>
                </>
              )}
            </button>

            <div className="text-center flex items-center justify-center gap-2 text-[11px] text-[#56647A]">
              <ShieldCheck className="w-4 h-4 text-[#4EAA8C]" />
              <span>100% Encrypted 256-Bit Payment Gateway with Instant Refund Protection</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
