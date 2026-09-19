import React from 'react';
import { PersonalizedStoryPreview, Order, ChildCharacter } from '../types';
import { 
  BookOpen, 
  Sparkles, 
  Download, 
  Truck, 
  Plus, 
  Clock, 
  CheckCircle2, 
  User, 
  Trash2,
  ExternalLink
} from 'lucide-react';

interface MyStoriesViewProps {
  previews: PersonalizedStoryPreview[];
  orders: Order[];
  characters: ChildCharacter[];
  onOpenPreview: (preview: PersonalizedStoryPreview) => void;
  onCreateNewStory: (char?: ChildCharacter) => void;
  onDeleteCharacter: (charId: string) => void;
}

export const MyStoriesView: React.FC<MyStoriesViewProps> = ({
  previews,
  orders,
  characters,
  onOpenPreview,
  onCreateNewStory,
  onDeleteCharacter
}) => {
  const [activeTab, setActiveTab] = React.useState<'stories' | 'characters' | 'orders'>('stories');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD1]">
        <div>
          <span className="text-xs font-bold text-[#EB5E44] uppercase tracking-wider">
            Parent Dashboard
          </span>
          <h1 className="font-display text-3xl font-extrabold text-[#162032] mt-1">
            My Family’s Stories & Characters
          </h1>
          <p className="text-xs sm:text-sm text-[#56647A] mt-1">
            Revisit past adventures, track book printing, and create new stories for your children.
          </p>
        </div>

        <button
          onClick={() => onCreateNewStory()}
          className="px-5 py-2.5 rounded-xl bg-[#EB5E44] hover:bg-[#D94F36] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Another Story</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8DFD1] pb-px">
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'stories'
              ? 'border-[#EB5E44] text-[#EB5E44]'
              : 'border-transparent text-[#56647A] hover:text-[#162032]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Stories ({previews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('characters')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'characters'
              ? 'border-[#EB5E44] text-[#EB5E44]'
              : 'border-transparent text-[#56647A] hover:text-[#162032]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Character Profiles ({characters.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-[#EB5E44] text-[#EB5E44]'
              : 'border-transparent text-[#56647A] hover:text-[#162032]'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Orders & Deliveries ({orders.length})</span>
        </button>
      </div>

      {/* TAB 1: STORIES */}
      {activeTab === 'stories' && (
        <div>
          {previews.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFD1] p-8">
              <BookOpen className="w-12 h-12 text-[#EB5E44] mx-auto mb-3 opacity-40" />
              <h3 className="font-display text-lg font-bold text-[#162032]">No stories created yet</h3>
              <p className="text-xs text-[#56647A] mt-1 mb-6 max-w-sm mx-auto">
                Transform your child’s photo into their first personalized adventure in under 2 minutes.
              </p>
              <button
                onClick={() => onCreateNewStory()}
                className="px-6 py-2.5 rounded-xl bg-[#162032] text-white text-xs font-bold hover:bg-[#EB5E44] transition-colors"
              >
                Create Their First Story
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {previews.map((prev) => (
                <div
                  key={prev.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E8DFD1] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-[#162032]">
                      <img src={prev.coverUrl} alt={prev.storyTitle} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      <div className="absolute top-3 left-3 bg-[#EB5E44] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        Hero: {prev.childName}
                      </div>
                      <div className="absolute bottom-3 inset-x-3 text-white">
                        <h4 className="font-display font-bold text-base line-clamp-1">{prev.storyTitle}</h4>
                        <p className="text-[11px] text-white/80">{prev.totalPageCount} Pages • {prev.language}</p>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#56647A]">
                        <span>Created: {prev.createdAt}</span>
                        <span className="px-2 py-0.5 rounded-md bg-[#F0F9F5] text-[#2A7E5B] font-bold text-[10px]">
                          Preview Ready
                        </span>
                      </div>

                      <p className="text-xs text-[#162032] line-clamp-2 italic bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DFD1]/50">
                        "{prev.dedicationMessage}"
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-[#F0E9DF] flex items-center gap-2">
                    <button
                      onClick={() => onOpenPreview(prev)}
                      className="flex-1 py-2.5 rounded-xl bg-[#162032] hover:bg-[#EB5E44] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Story Preview</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: REUSABLE CHARACTERS (Section 11 & 38) */}
      {activeTab === 'characters' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-[#FFF8F5] border border-[#FCD9D0] flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#EB5E44] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display font-bold text-sm text-[#162032]">
                Reusable Child Character Profiles
              </h4>
              <p className="text-xs text-[#56647A] mt-0.5">
                Once a child character is crafted, you can reuse them across multiple storybooks, birthday products, and learning materials without re-uploading photos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {characters.map((char) => (
              <div
                key={char.id}
                className="bg-white rounded-3xl p-6 border border-[#E8DFD1] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    {/* Character vs photo avatars */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#EB5E44] shadow-md bg-[#162032]">
                        <img src={char.canonicalCharacterPortraitUrl || char.photoUrl} alt={char.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md absolute -bottom-2 -right-2 bg-black">
                        <img src={char.photoUrl} alt="Original" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display text-xl font-bold text-[#162032]">
                          {char.name} {char.nickname && `(${char.nickname})`}
                        </h4>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${char.name}'s character profile and associated reference photos?`)) {
                              onDeleteCharacter(char.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-[#56647A] hover:text-[#D94F36] hover:bg-[#FFF5F5] transition-colors"
                          title="Delete photo & character"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#56647A]">
                        {char.age} years old • {char.storiesCount} stories created
                      </p>
                    </div>
                  </div>

                  {/* Character attributes */}
                  <div className="mt-4 pt-4 border-t border-[#F0E9DF] grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#56647A]">Favorite Color:</span>
                      <p className="font-bold text-[#162032]">{char.favoriteColor}</p>
                    </div>
                    <div>
                      <span className="text-[#56647A]">Favorite Animal:</span>
                      <p className="font-bold text-[#162032]">{char.favoriteAnimal}</p>
                    </div>
                    <div>
                      <span className="text-[#56647A]">Style:</span>
                      <p className="font-bold text-[#162032]">{char.preferredStyle}</p>
                    </div>
                    <div>
                      <span className="text-[#56647A]">Last Used:</span>
                      <p className="font-bold text-[#162032]">{char.lastUsedDate}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0E9DF]">
                  <button
                    onClick={() => onCreateNewStory(char)}
                    className="w-full py-2.5 rounded-xl bg-[#162032] hover:bg-[#EB5E44] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create Another Adventure for {char.name}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS & DELIVERIES */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFD1] p-8">
              <Truck className="w-12 h-12 text-[#56647A] mx-auto mb-3 opacity-40" />
              <h3 className="font-display text-lg font-bold text-[#162032]">No orders placed yet</h3>
              <p className="text-xs text-[#56647A] mt-1">
                Completed print and digital orders will appear here with live tracking.
              </p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-2xl p-5 border border-[#E8DFD1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#162032]">{ord.id}</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[10px] font-bold text-[#56647A] border border-[#E8DFD1]">
                      {ord.createdAt}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#F0F9F5] text-[#2A7E5B] text-[10px] font-bold">
                      {ord.status}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-[#162032] mt-1">
                    {ord.storyTitle} (For {ord.childName})
                  </h4>
                  <p className="text-xs text-[#56647A]">
                    Format: <span className="capitalize font-semibold text-[#162032]">{ord.format}</span> • Language: {ord.language}
                  </p>

                  {ord.trackingNumber && (
                    <p className="text-xs text-[#3B97D3] font-semibold mt-1">
                      Courier Tracking: {ord.trackingNumber} (BlueDart Express)
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="font-display text-lg font-bold text-[#162032]">
                    ₹{ord.amount}
                  </span>

                  <button
                    onClick={() => alert(`Downloading high-resolution PDF for ${ord.childName}...`)}
                    className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#E8DFD1] text-[#162032] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#E8DFD1]"
                  >
                    <Download className="w-3.5 h-3.5 text-[#EB5E44]" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
