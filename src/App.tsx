import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Story, 
  PersonalizedStoryPreview, 
  Order, 
  ChildCharacter 
} from './types';
import { STORIES } from './data/mockStories';
import { INITIAL_CHARACTERS } from './data/sampleCharacters';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MagicalStorybookHome } from './components/MagicalStorybookHome';
import { StoryLibraryView } from './components/StoryLibraryView';
import { StoryDetailView } from './components/StoryDetailView';
import { HowItWorksView } from './components/HowItWorksView';
import { AboutView } from './components/AboutView';
import { GiftsView } from './components/GiftsView';
import { CreateStoryWizard } from './components/CreateStoryWizard';
import { BookPreviewViewer } from './components/BookPreviewViewer';
import { MyStoriesView } from './components/MyStoriesView';
import { AdminDashboard } from './components/AdminDashboard';
import { FAQSection } from './components/FAQSection';
import { PrivacyModal } from './components/PrivacyModal';

export default function App() {
  // Navigation & View state: 'home' | 'stories' | 'story-detail' | 'how-it-works' | 'about' | 'gifts' | 'faq' | 'wizard' | 'preview' | 'my-stories'
  const [currentView, setCurrentView] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState(false);

  // Selected story for detail and wizard
  const [selectedStoryForDetail, setSelectedStoryForDetail] = useState<Story>(STORIES[0]);
  const [selectedStoryForWizard, setSelectedStoryForWizard] = useState<Story | null>(null);

  // Seed sample personalized preview (Aarav Space Adventure)
  const initialSeedPreview: PersonalizedStoryPreview = {
    id: 'prev-seed-1',
    storyId: 'magical-space-adventure',
    storyTitle: 'The Magical Space Adventure',
    childProfile: INITIAL_CHARACTERS[0],
    childName: 'Aarav',
    childAge: 5,
    gender: 'boy',
    characterStyle: '3D Magical',
    illustrationMode: 'mode_a_photo',
    language: 'English',
    coverUrl: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    characterFaceUrl: '/src/assets/images/aarav_magical_3d_1789745946003.jpg',
    dedicationFrom: 'Amma & Appa',
    dedicationMessage: 'For our brave little astronaut, Aarav. May your curiosity always take you beyond the stars.',
    pages: [],
    totalPageCount: 32,
    unlockedPageCount: 32,
    createdAt: '18 Sep 2026',
    approvalStatus: 'pending_review'
  };

  const [activePreview, setActivePreview] = useState<PersonalizedStoryPreview | null>(initialSeedPreview);
  const [previews, setPreviews] = useState<PersonalizedStoryPreview[]>([initialSeedPreview]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'WV-2026-8941',
      previewId: 'prev-seed-1',
      storyTitle: 'The Magical Space Adventure',
      childName: 'Aarav',
      customerName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '9876543210',
      format: 'hardcover',
      packageTitle: 'Personalized Hardcover + Instant eBook',
      language: 'English',
      amount: 999,
      quantity: 1,
      includesEbook: true,
      status: 'In Production',
      trackingNumber: 'BD-904128912',
      createdAt: '18 Sep 2026'
    }
  ]);

  const [characters, setCharacters] = useState<ChildCharacter[]>(INITIAL_CHARACTERS);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Navigation router
  const navigateTo = (view: string, storyId?: string) => {
    if (storyId) {
      const found = STORIES.find((s) => s.id === storyId);
      if (found) {
        setSelectedStoryForDetail(found);
        setSelectedStoryForWizard(found);
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStoryForDetail = (story: Story) => {
    setSelectedStoryForDetail(story);
    setCurrentView('story-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPersonalization = (story: Story) => {
    setSelectedStoryForWizard(story);
    setCurrentView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCustomStory = () => {
    setSelectedStoryForWizard(null);
    setCurrentView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviewReady = (newPreview: PersonalizedStoryPreview) => {
    setActivePreview(newPreview);
    setPreviews((prev) => [newPreview, ...prev]);
    setCurrentView('preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setCurrentView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#161922] font-sans antialiased selection:bg-[#F3D7CD] selection:text-[#C05638]">
      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(true)}
        myStoriesCount={previews.length}
      />

      {/* Main View Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {/* VIEW 1: HOME */}
            {currentView === 'home' && (
              <MagicalStorybookHome
                onSelectStory={handleSelectStoryForDetail}
                onCreateCustomStory={handleStartCustomStory}
              />
            )}

            {/* VIEW 2: STORIES CATALOG */}
            {(currentView === 'stories' || currentView === 'catalog') && (
              <StoryLibraryView
                onSelectStory={handleSelectStoryForDetail}
                onStartWizard={(storyId) => {
                  if (storyId) {
                    const st = STORIES.find(s => s.id === storyId);
                    if (st) setSelectedStoryForWizard(st);
                  }
                  setCurrentView('wizard');
                }}
              />
            )}

            {/* VIEW 3: STORY DETAIL */}
            {currentView === 'story-detail' && (
              <StoryDetailView
                story={selectedStoryForDetail}
                onBack={() => setCurrentView('stories')}
                onPersonalize={handleStartPersonalization}
              />
            )}

            {/* VIEW 4: HOW IT WORKS */}
            {currentView === 'how-it-works' && (
              <HowItWorksView
                onStartWizard={() => setCurrentView('wizard')}
              />
            )}

            {/* VIEW 5: ABOUT */}
            {currentView === 'about' && (
              <AboutView
                onExploreStories={() => setCurrentView('stories')}
                onStartWizard={() => setCurrentView('wizard')}
              />
            )}

            {/* VIEW 6: GIFTS */}
            {currentView === 'gifts' && (
              <GiftsView
                onStartWizard={(storyId) => {
                  if (storyId) {
                    const st = STORIES.find(s => s.id === storyId);
                    if (st) setSelectedStoryForWizard(st);
                  }
                  setCurrentView('wizard');
                }}
              />
            )}

            {/* VIEW 7: FAQ */}
            {currentView === 'faq' && <FAQSection />}

            {/* VIEW 8: CREATE STORY WIZARD */}
            {currentView === 'wizard' && (
              <CreateStoryWizard
                initialStory={selectedStoryForWizard}
                onPreviewReady={handlePreviewReady}
                onCancel={() => setCurrentView('home')}
              />
            )}

            {/* VIEW 9: PROOF PREVIEW VIEWER */}
            {currentView === 'preview' && activePreview && (
              <BookPreviewViewer
                preview={activePreview}
                onBack={() => setCurrentView('wizard')}
                onOrderSuccess={handleOrderSuccess}
                onUpdatePreview={(updated) => {
                  setActivePreview(updated);
                  setPreviews((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p))
                  );
                }}
              />
            )}

            {/* VIEW 10: MY STORIES & ORDERS */}
            {currentView === 'my-stories' && (
              <MyStoriesView
                previews={previews}
                orders={orders}
                characters={characters}
                onOpenPreview={(prev) => {
                  setActivePreview(prev);
                  setCurrentView('preview');
                }}
                onCreateNewStory={handleCreateNewStoryForChar}
                onDeleteCharacter={handleDeleteCharacter}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Privacy & Safety Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        onDeleteAllPhotos={() => setCharacters([])}
      />

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />
    </div>
  );
}
