import React, { useState } from 'react';
import { Story, Order, GenerationJob } from '../types';
import { STORIES } from '../data/mockStories';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  ShoppingBag, 
  Printer, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Search, 
  Settings, 
  ShieldAlert,
  ChevronRight,
  Filter
} from 'lucide-react';

interface AdminDashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  onUpdateOrderStatus,
  onExitAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'stories' | 'queue' | 'config'>('overview');

  // Generation queue state
  const [generationJobs, setGenerationJobs] = useState<GenerationJob[]>([
    {
      id: 'job-9841',
      childName: 'Reyansh',
      storyTitle: 'The Magical Space Adventure',
      style: 'Classic Storybook',
      progress: 100,
      status: 'completed',
      currentStage: 'All 24 pages compiled',
      createdAt: '2 mins ago'
    },
    {
      id: 'job-9842',
      childName: 'Meera',
      storyTitle: 'The Secret Jungle Adventure',
      style: 'Watercolor',
      progress: 68,
      status: 'processing',
      currentStage: 'Generating Page 16 consistency check',
      createdAt: '5 mins ago'
    },
    {
      id: 'job-9843',
      childName: 'Vivaan',
      storyTitle: 'My Journey Through India',
      style: 'Adventure Illustration',
      progress: 25,
      status: 'failed',
      currentStage: 'Reference photo resolution below 400px threshold',
      createdAt: '12 mins ago'
    }
  ]);

  // Story config prices
  const [digitalPrice, setDigitalPrice] = useState(399);
  const [paperbackPrice, setPaperbackPrice] = useState(899);
  const [hardcoverPrice, setHardcoverPrice] = useState(1499);
  const [shippingFee, setShippingFee] = useState(0);
  const [couponCode, setCouponCode] = useState('VERVEFIRST');
  const [couponDiscount, setCouponDiscount] = useState(15);

  const retryJob = (jobId: string) => {
    setGenerationJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: 'processing', progress: 45, currentStage: 'Re-running consistency model...' } : j
      )
    );
    setTimeout(() => {
      setGenerationJobs((prev) =>
        prev.map((j) =>
          j.id === jobId ? { ...j, status: 'completed', progress: 100, currentStage: 'Completed successfully' } : j
        )
      );
    }, 1500);
  };

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.amount, 142850);
  const totalPaidOrders = orders.length + 184;

  return (
    <div className="min-h-screen bg-[#141B2B] text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Topbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#EB5E44] text-white text-[11px] font-bold">
                OPERATIONS CONSOLE
              </span>
              <span className="text-xs text-slate-400">Verve Studio v2.4 (Prod India)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
              Admin & Fulfillment Control
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              Exit to Parent Storefront
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-px overflow-x-auto">
          {[
            { id: 'overview', label: 'Analytics & Funnel' },
            { id: 'orders', label: `Orders (${orders.length + 184})` },
            { id: 'queue', label: 'AI Generation Queue (3)' },
            { id: 'stories', label: `Story Catalog (${STORIES.length})` },
            { id: 'config', label: 'Pricing & Business Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#EB5E44] text-[#EB5E44]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & FUNNEL */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Total Revenue</span>
                  <DollarSign className="w-4 h-4 text-[#4EAA8C]" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-2">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </h3>
                <p className="text-[11px] text-[#4EAA8C] mt-1 font-semibold">
                  +18.4% from last week
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Paid Orders</span>
                  <ShoppingBag className="w-4 h-4 text-[#3B97D3]" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-2">
                  {totalPaidOrders}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  128 Physical • 56 Digital
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Previews Generated</span>
                  <BookOpen className="w-4 h-4 text-[#F5B027]" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-2">
                  2,640
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Conversion to paid: 35.0%
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Avg Order Value (AOV)</span>
                  <TrendingUp className="w-4 h-4 text-[#EB5E44]" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mt-2">
                  ₹1,085
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  62% choose Hardcover edition
                </p>
              </div>
            </div>

            {/* Section 22: Conversion Funnel Analysis */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Visitor to Paid Book Conversion Funnel
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time conversion tracking through each stage of the storytelling journey.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { stage: '1. Landing Page Visitors', count: 14280, pct: '100%', drop: null },
                  { stage: '2. Story Page Views', count: 9840, pct: '68.9%', drop: '-31.1%' },
                  { stage: '3. Create Story Wizard Starts', count: 4210, pct: '29.4%', drop: '-57.2%' },
                  { stage: '4. Photo Uploads (Consented)', count: 2980, pct: '20.8%', drop: '-29.2%' },
                  { stage: '5. Free Previews Generated', count: 2640, pct: '18.4%', drop: '-11.4%' },
                  { stage: '6. Checkout Initiated', count: 1420, pct: '9.9%', drop: '-46.2%' },
                  { stage: '7. Paid Purchases (Razorpay)', count: 924, pct: '6.4%', drop: '-34.9%' }
                ].map((step, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-300">{step.stage}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">{step.count.toLocaleString()}</span>
                        <span className="font-bold text-white w-12 text-right">{step.pct}</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#F5B027] to-[#EB5E44] h-full"
                        style={{ width: step.pct }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDER FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Customer Print & Digital Orders</h3>
              <span className="text-xs text-slate-400">
                Print Partner SLA: 48 hours to courier handover
              </span>
            </div>

            <div className="space-y-3">
              {/* Sample default orders + active user orders */}
              {[
                ...orders,
                {
                  id: 'VRV-2026-1042',
                  previewId: 'prev-1',
                  storyTitle: 'The Magical Space Adventure',
                  childName: 'Aarav',
                  customerName: 'Kavita Menon',
                  email: 'kavita.m@example.com',
                  phone: '9845012345',
                  format: 'hardcover' as const,
                  language: 'English' as const,
                  amount: 1499,
                  status: 'Queued for Print' as const,
                  trackingNumber: 'BD-884192019',
                  createdAt: '18 Sep 2026'
                },
                {
                  id: 'VRV-2026-1041',
                  previewId: 'prev-2',
                  storyTitle: 'The Secret Jungle Adventure',
                  childName: 'Ananya',
                  customerName: 'Vikram Joshi',
                  email: 'vikram.j@example.com',
                  phone: '9920145678',
                  format: 'paperback' as const,
                  language: 'Hindi' as const,
                  amount: 899,
                  status: 'Printed' as const,
                  trackingNumber: 'BD-773194012',
                  createdAt: '17 Sep 2026'
                }
              ].map((ord) => (
                <div
                  key={ord.id}
                  className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#F5B027]">{ord.id}</span>
                      <span className="text-xs text-slate-400">• {ord.createdAt}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-200 text-[10px] capitalize font-bold">
                        {ord.format}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm mt-1">
                      {ord.storyTitle} — For <span className="text-[#EB5E44]">{ord.childName}</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Customer: {ord.customerName} ({ord.phone}) • Language: {ord.language}
                    </p>
                    {ord.trackingNumber && (
                      <p className="text-xs text-[#3B97D3] font-semibold mt-0.5">
                        BlueDart: {ord.trackingNumber}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <span className="text-lg font-bold text-white">₹{ord.amount}</span>

                    {/* Status dropdown */}
                    <select
                      value={ord.status}
                      onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 outline-none"
                    >
                      <option value="Payment Received">Payment Received</option>
                      <option value="Queued for Print">Queued for Print</option>
                      <option value="Printed">Printed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Ready for Download">Ready for Download</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AI GENERATION QUEUE */}
        {activeTab === 'queue' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">AI Story & Character Generation Jobs</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Character identity validation across all 24 page spreads.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {generationJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-300">{job.id}</span>
                      <span className="text-xs text-slate-400">• {job.createdAt}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        job.status === 'completed'
                          ? 'bg-[#4EAA8C]/20 text-[#4EAA8C]'
                          : job.status === 'processing'
                          ? 'bg-[#F5B027]/20 text-[#F5B027]'
                          : 'bg-[#EB5E44]/20 text-[#EB5E44]'
                      }`}>
                        {job.status.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm mt-1">
                      {job.childName}’s Adventure — {job.storyTitle} ({job.style})
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{job.currentStage}</p>

                    {/* Progress */}
                    <div className="w-full max-w-md bg-slate-900 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full ${
                          job.status === 'failed' ? 'bg-[#EB5E44]' : 'bg-[#4EAA8C]'
                        }`}
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>

                  {job.status === 'failed' && (
                    <button
                      onClick={() => retryJob(job.id)}
                      className="px-3.5 py-2 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry Job</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRICING CONFIGURATION (Section 47) */}
        {activeTab === 'config' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Configurable Business Values</h3>
              <p className="text-xs text-slate-400 mt-1">
                Prices and discounts update dynamically across the entire website without redeployment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Digital Storybook Price (₹)
                </label>
                <input
                  type="number"
                  value={digitalPrice}
                  onChange={(e) => setDigitalPrice(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Printed Paperback Price (₹)
                </label>
                <input
                  type="number"
                  value={paperbackPrice}
                  onChange={(e) => setPaperbackPrice(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Heirloom Hardcover Price (₹)
                </label>
                <input
                  type="number"
                  value={hardcoverPrice}
                  onChange={(e) => setHardcoverPrice(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Default Coupon Code
                </label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  value={couponDiscount}
                  onChange={(e) => setCouponDiscount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  India Shipping Fee (₹)
                </label>
                <input
                  type="number"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => alert('Business configurations updated successfully!')}
                className="px-6 py-2.5 rounded-xl bg-[#4EAA8C] hover:bg-[#3D9478] text-white text-xs font-bold transition-colors"
              >
                Save Live Configurations
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: STORY CATALOG */}
        {activeTab === 'stories' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Active Story Catalog ({STORIES.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STORIES.map((st) => (
                <div key={st.id} className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60">
                  <h4 className="font-bold text-white text-sm">{st.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">Age {st.ageRange} • {st.category}</p>
                  <p className="text-xs text-[#EB5E44] mt-2 font-medium">{st.languages.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
