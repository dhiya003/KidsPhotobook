import React, { useState } from 'react';
import { 
  Story, 
  PersonalizedStoryPreview, 
  BookFormat, 
  Order, 
  ChildCharacter, 
  AgeRange, 
  StoryCategory, 
  StoryLanguage 
} from './types';
import { STORIES, INITIAL_PRICING } from './data/mockStories';
import { INITIAL_CHARACTERS } from './data/sampleCharacters';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TransformationSlider } from './components/TransformationSlider';
import { StoryCard } from './components/StoryCard';
import { CreateStoryWizard } from './components/CreateStoryWizard';
import { BookPreviewViewer } from './components/BookPreviewViewer';
import { CheckoutModal } from './components/CheckoutModal';
import { MyStoriesView } from './components/MyStoriesView';
import { AdminDashboard } from './components/AdminDashboard';
import { FAQSection } from './components/FAQSection';
import { PrivacyModal } from './components/PrivacyModal';
import { StoryDetailModal } from './components/StoryDetailModal';
import { MagicalStorybookHome } from './components/MagicalStorybookHome';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Heart, 
  Star, 
  BookOpen, 
  Truck, 
  Camera, 
  HelpCircle,
  Filter,
  Search
} from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState(false);

  // Stories & Catalog
  const [selectedStoryForWizard, setSelectedStoryForWizard] = useState<Story | null>(null);
  const [detailModalStory, setDetailModalStory] = useState<Story | null>(null);

  // Filter states for catalog
  const [ageFilter, setAgeFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Previews & Orders State
  const [activePreview, setActivePreview] = useState<PersonalizedStoryPreview | null>(null);
  const [previews, setPreviews] = useState<PersonalizedStoryPreview[]>([
    {
      id: 'prev-seed-1',
      storyId: 'magical-space-adventure',
      storyTitle: 'The Magical Space Adventure',
      childName: 'Aarav',
      childAge: 5,
      characterStyle: 'Classic Storybook',
      language: 'English',
      coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
      dedicationFrom: 'Amma & Appa',
      dedicationMessage: 'For our brave little astronaut, Aarav. May your curiosity always take you beyond the stars.',
      pages: STORIES[0].pages.map((p, idx) => ({
        pageNumber: p.pageNumber,
        sceneTitle: p.sceneTitle,
        text: p.textTemplate.replace(/\{\{childName\}\}/g, 'Aarav').replace(/\{\{favoriteColor\}\}/g, 'Royal Blue').replace(/\{\{favoriteAnimal\}\}/g, 'starlight cub'),
        imageUrl: p.defaultImage,
        isUnlockedInPreview: idx < 4
      })),
      totalPageCount: 24,
      unlockedPageCount: 4,
      createdAt: '18 Sep 2026'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'VRV-2026-8941',
      previewId: 'prev-seed-1',
      storyTitle: 'The Magical Space Adventure',
      childName: 'Aarav',
      customerName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '9876543210',
      format: 'hardcover',
      language: 'English',
      amount: 1499,
      status: 'Shipped',
      trackingNumber: 'BD-904128912',
      createdAt: '16 Sep 2026'
    }
  ]);

  const [characters, setCharacters] = useState<ChildCharacter[]>(INITIAL_CHARACTERS);

  // Checkout modal
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutFormat, setCheckoutFormat] = useState<BookFormat>('paperback');

  // Privacy modal
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Navigation helper
  const navigateTo = (view: string, storyId?: string) => {
    if (storyId) {
      const found = STORIES.find((s) => s.id === storyId);
      if (found) setSelectedStoryForWizard(found);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPersonalization = (story: Story) => {
    setSelectedStoryForWizard(story);
    navigateTo('wizard');
  };

  const handlePreviewReady = (newPreview: PersonalizedStoryPreview) => {
    setActivePreview(newPreview);
    setPreviews((prev) => [newPreview, ...prev]);
    navigateTo('preview');
  };

  const handleUnlockStory = (format: BookFormat, preview: PersonalizedStoryPreview) => {
    setCheckoutFormat(format);
    setCheckoutModalOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleDeleteCharacter = (charId: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== charId));
  };

  const handleCreateNewStoryForChar = (char?: ChildCharacter) => {
    if (char) {
      setSelectedStoryForWizard(STORIES[0]);
    }
    navigateTo('wizard');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Filtered stories in catalog
  const filteredStories = STORIES.filter((s) => {
    const matchesAge = ageFilter === 'All' || s.ageRange === ageFilter;
    const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
    const matchesSearch =
      searchQuery === '' ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAge && matchesCategory && matchesSearch;
  });

  // If Admin mode is active, render the dedicated Admin Console
  if (isAdmin) {
    return (
      <AdminDashboard
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onExitAdmin={() => setIsAdmin(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#162032] antialiased">
      {/* Top Brand Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(true)}
        myStoriesCount={previews.length}
      />

      {/* MAIN VIEW ROUTING */}
      <main className="flex-1">
        {/* ========================================================
            VIEW 1: HOMEPAGE (Magical Storybook Opening Experience)
            ======================================================== */}
        {currentView === 'home' && (
          <MagicalStorybookHome
            onStartWizard={(story) => handleStartPersonalization(story || STORIES[0])}
            onExploreCatalog={() => navigateTo('catalog')}
            onOpenStoryDetail={(story) => setDetailModalStory(story)}
            onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
          />
        )}

        {/* ========================================================
            VIEW 2: EXPLORE STORIES CATALOG (With filters)
            ======================================================== */}
        {currentView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
                Storybook Catalog
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#162032] mt-1">
                Explore All Personalized Adventures
              </h1>
              <p className="text-xs sm:text-sm text-[#56647A] mt-1 max-w-xl">
                Filter by child age, category, or themes. Each story can be personalized in English or regional Indian languages.
              </p>
            </div>

            {/* Filters bar */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8DFD1] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#56647A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search stories by title, category, or theme..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8DFD1] text-xs text-[#162032] outline-none focus:border-[#EB5E44]"
                />
              </div>

              {/* Age filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-bold text-[#56647A] shrink-0">Age:</span>
                {['All', '2–4', '4–6', '6–8'].map((age) => (
                  <button
                    key={age}
                    onClick={() => setAgeFilter(age)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      ageFilter === age
                        ? 'bg-[#162032] text-white'
                        : 'bg-[#FAF7F2] text-[#56647A] border border-[#E8DFD1] hover:border-[#162032]'
                    }`}
                  >
                    {age === 'All' ? 'All Ages' : `${age} yrs`}
                  </button>
                ))}
              </div>

              {/* Category filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-bold text-[#56647A] shrink-0">Category:</span>
                {['All', 'Space', 'Adventure', 'India', 'Birthday', 'Learning'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      categoryFilter === cat
                        ? 'bg-[#EB5E44] text-white'
                        : 'bg-[#FAF7F2] text-[#56647A] border border-[#E8DFD1] hover:border-[#162032]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            {filteredStories.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFD1] p-8">
                <BookOpen className="w-10 h-10 text-[#56647A] mx-auto mb-2 opacity-40" />
                <h3 className="font-display text-lg font-bold text-[#162032]">No stories found</h3>
                <p className="text-xs text-[#56647A] mt-1 mb-4">
                  Try adjusting your age or category filters.
                </p>
                <button
                  onClick={() => {
                    setAgeFilter('All');
                    setCategoryFilter('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#162032] text-white text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    onSelect={handleStartPersonalization}
                    onViewDetails={(s) => setDetailModalStory(s)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            VIEW 3: HOW IT WORKS
            ======================================================== */}
        {currentView === 'how-it-works' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
                The Craft Behind Verve Studio
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#162032] mt-2">
                How We Make Your Child The Hero
              </h1>
              <p className="text-sm text-[#56647A] mt-2">
                Learn how our technology and editorial illustrators collaborate to create consistent, high-resolution stories they will keep forever.
              </p>
            </div>

            <TransformationSlider onStartStory={() => navigateTo('wizard')} />

            {/* Deep dive steps */}
            <div className="space-y-6 pt-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFD1] flex flex-col sm:flex-row items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8F5] border border-[#FCD9D0] text-[#EB5E44] flex items-center justify-center font-bold text-lg shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#162032]">
                    Character Identity Extraction
                  </h3>
                  <p className="text-xs sm:text-sm text-[#56647A] mt-1 leading-relaxed">
                    When you upload your child's reference photo, our secure vision pipeline maps facial features, hairstyle, skin tone, and cheerful expression into a stylized character representation.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFD1] flex flex-col sm:flex-row items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFFBF0] border border-[#FEEBB8] text-[#F5B027] flex items-center justify-center font-bold text-lg shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#162032]">
                    Cross-Page Character Consistency
                  </h3>
                  <p className="text-xs sm:text-sm text-[#56647A] mt-1 leading-relaxed">
                    Unlike standard generators that create disjointed images, Verve Studio locks your child's Character Reference ID so they appear identifiably as themselves in every single scene across all 24 pages.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFD1] flex flex-col sm:flex-row items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-[#F0F9F5] border border-[#BDE5D3] text-[#4EAA8C] flex items-center justify-center font-bold text-lg shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#162032]">
                    Professional Indian Print Manufacturing
                  </h3>
                  <p className="text-xs sm:text-sm text-[#56647A] mt-1 leading-relaxed">
                    Once ordered, your custom book is rendered in 300 DPI print-ready CMYK format, printed on 170 GSM tear-resistant satin paper with child-safe soy inks, hand-inspected, case-bound, and shipped via express courier across India.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => navigateTo('wizard')}
                className="px-8 py-3.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white font-bold text-sm shadow-md"
              >
                Create My Child's Story
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 4: PRICING
            ======================================================== */}
        {currentView === 'pricing' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
                Transparent Pricing
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#162032] mt-2">
                Simple, Honest Formats
              </h1>
              <p className="text-sm text-[#56647A] mt-2">
                Start with a free personalized preview. Pay only when you are completely delighted with what you see.
              </p>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INITIAL_PRICING.map((plan) => (
                <div
                  key={plan.format}
                  className={`bg-white rounded-3xl p-8 border flex flex-col justify-between relative ${
                    plan.popular
                      ? 'border-[#EB5E44] ring-2 ring-[#EB5E44]/20 shadow-xl'
                      : 'border-[#E8DFD1] shadow-sm'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-[#EB5E44] text-white text-[11px] font-extrabold uppercase">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <h3 className="font-display text-xl font-bold text-[#162032]">{plan.title}</h3>
                    <p className="text-xs text-[#56647A] mt-1 mb-4">{plan.description}</p>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="font-display text-4xl font-extrabold text-[#162032]">
                        ₹{plan.price}
                      </span>
                      <span className="text-sm text-[#56647A] line-through">
                        ₹{plan.originalPrice}
                      </span>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-[#F0E9DF] text-xs text-[#162032]">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#4EAA8C] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#F0E9DF]">
                    <button
                      onClick={() => navigateTo('wizard')}
                      className={`w-full py-3 rounded-xl text-xs font-bold transition-colors ${
                        plan.popular
                          ? 'bg-[#EB5E44] hover:bg-[#D94F36] text-white shadow-md'
                          : 'bg-[#162032] hover:bg-[#EB5E44] text-white'
                      }`}
                    >
                      Personalize & Preview Free
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Gifting & Occasion callout */}
            <div className="p-6 rounded-3xl bg-[#FFF8F5] border border-[#FCD9D0] text-center max-w-2xl mx-auto">
              <h4 className="font-display font-bold text-base text-[#162032]">
                Looking for a special birthday or milestone gift?
              </h4>
              <p className="text-xs text-[#56647A] mt-1">
                Personalized books make the #1 most retained childhood gift. Grandparents, aunts, and uncles can ship directly to the child’s doorstep with free gift packaging.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 5: ABOUT VERVE STUDIO (Brand story)
            ======================================================== */}
        {currentView === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44]">
                Our Founding Story
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#162032] mt-2">
                "Children grow up quickly. Stories become memories."
              </h1>
            </div>

            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DFD1] shadow-sm space-y-6 text-sm text-[#162032] leading-relaxed">
              <p className="text-lg font-serif italic text-[#56647A]">
                Every day, parents capture dozens of photos of their children laughing, building block towers, and exploring parks. Yet almost all of those photos get forgotten deep inside smartphone galleries.
              </p>

              <p>
                <span className="font-bold">Verve Studio was founded in Bengaluru, India</span> with a simple conviction: <span className="text-[#EB5E44] font-semibold">Your child shouldn’t just read the story. They should see themselves inside it.</span>
              </p>

              <p>
                When a child opens a book and sees their own face on the cover, something extraordinary happens in their brain. Reading stops being a chore and becomes an exhilarating affirmation of their own courage, creativity, and self-worth.
              </p>

              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] space-y-2">
                <h4 className="font-display font-bold text-base text-[#162032]">
                  The Verve Studio Mission
                </h4>
                <p className="text-xs text-[#56647A]">
                  To pioneer the world’s most emotionally meaningful children’s storytelling platform—starting with personalized storybooks across India and expanding into personalized videos, audiobooks, coloring adventures, and lifelong learning memories.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F0E9DF]">
                <div>
                  <h5 className="font-display font-bold text-sm text-[#162032]">The Verve Studio Team</h5>
                  <p className="text-xs text-[#56647A]">Bengaluru, India</p>
                </div>

                <button
                  onClick={() => navigateTo('wizard')}
                  className="px-6 py-2.5 rounded-xl bg-[#EB5E44] text-white text-xs font-bold hover:bg-[#D94F36]"
                >
                  Make Your Child The Hero
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 6: FAQ
            ======================================================== */}
        {currentView === 'faq' && <FAQSection />}

        {/* ========================================================
            VIEW 7: CREATE STORY WIZARD
            ======================================================== */}
        {currentView === 'wizard' && (
          <CreateStoryWizard
            initialStory={selectedStoryForWizard}
            onPreviewReady={handlePreviewReady}
            onCancel={() => navigateTo('home')}
          />
        )}

        {/* ========================================================
            VIEW 8: BOOK PREVIEW VIEWER
            ======================================================== */}
        {currentView === 'preview' && activePreview && (
          <BookPreviewViewer
            preview={activePreview}
            onUnlockStory={handleUnlockStory}
            onEditDetails={() => navigateTo('wizard')}
          />
        )}

        {/* ========================================================
            VIEW 9: CUSTOMER PORTAL / MY STORIES & CHARACTERS
            ======================================================== */}
        {currentView === 'my-stories' && (
          <MyStoriesView
            previews={previews}
            orders={orders}
            characters={characters}
            onOpenPreview={(prev) => {
              setActivePreview(prev);
              navigateTo('preview');
            }}
            onCreateNewStory={handleCreateNewStoryForChar}
            onDeleteCharacter={handleDeleteCharacter}
          />
        )}
      </main>

      {/* CHECKOUT MODAL */}
      {activePreview && (
        <CheckoutModal
          preview={activePreview}
          format={checkoutFormat}
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* STORY DETAIL MODAL */}
      <StoryDetailModal
        story={detailModalStory}
        onClose={() => setDetailModalStory(null)}
        onStartPersonalization={handleStartPersonalization}
      />

      {/* PRIVACY & CHILD SAFETY MODAL */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        onDeleteAllPhotos={() => {
          setCharacters([]);
        }}
      />

      {/* FOOTER */}
      <Footer
        onNavigate={navigateTo}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />
    </div>
  );
}
