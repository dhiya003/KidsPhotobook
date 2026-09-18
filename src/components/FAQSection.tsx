import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'Personalization' | 'Shipping & Orders' | 'Privacy & Safety';
}

const FAQS: FAQItem[] = [
  {
    category: 'Personalization',
    question: 'How does the personalization work?',
    answer: 'You simply upload one clear, front-facing photograph of your child and share their name, age, and a few favorites (like favorite color and animal). Our personalization system analyzes facial features, hairstyle, and smile to illustrate a custom, consistent character who stars on every page of a professionally authored 24-page story.'
  },
  {
    category: 'Personalization',
    question: 'What kind of photo should I upload?',
    answer: 'For the most accurate and beautiful character match, please upload a clear, front-facing close-up photo in natural daylight. Avoid sunglasses, hats, heavy shadows, or photos with multiple children.'
  },
  {
    category: 'Personalization',
    question: 'Can I preview the book before paying?',
    answer: 'Yes, 100%! Verve Studio lets you generate and experience a free personalized preview featuring your child’s customized book cover and first 4 full story spreads before deciding to unlock the full physical or digital book.'
  },
  {
    category: 'Personalization',
    question: 'Can I change the child’s name and add a custom dedication?',
    answer: 'Absolutely. You can specify the exact spelling of their first name, an optional pet name/nickname, and write a personalized parent dedication (e.g. "With love from Amma & Appa") that is printed on Page 2 of every book.'
  },
  {
    category: 'Personalization',
    question: 'What Indian languages are supported?',
    answer: 'We currently support English, Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, and Bengali editions. You can select your preferred home language during the story creation wizard.'
  },
  {
    category: 'Privacy & Safety',
    question: 'How are my child’s photographs handled and stored?',
    answer: 'Your child’s photo belongs exclusively to you. All uploaded images are encrypted in private, secure cloud storage with strict time-limited access tokens. We NEVER publish, share, or sell your child’s photos, and we never use customer photos to train public AI models.'
  },
  {
    category: 'Privacy & Safety',
    question: 'Can I delete my child’s photograph and profile?',
    answer: 'Yes. You have complete ownership. At any time from your account or by clicking "Delete Photo Data", you can permanently delete your child’s reference photo from our servers.'
  },
  {
    category: 'Shipping & Orders',
    question: 'Do you ship across India?',
    answer: 'Yes! We deliver physical paperback and hardcover editions across 19,000+ Indian pincodes via premium express couriers (BlueDart and Delhivery). Delivery typically takes 4–6 business days.'
  },
  {
    category: 'Shipping & Orders',
    question: 'Can grandparents, relatives, or friends gift this book?',
    answer: 'Yes, personalized storybooks make one of the most memorable gifts for birthdays, naming ceremonies, festivals (Diwali, Pongal, Rakhi), and milestones. You can enter the child’s details and ship directly to their family address.'
  },
  {
    category: 'Shipping & Orders',
    question: 'What is the difference between Paperback and Hardcover?',
    answer: 'Both editions are printed in an 8x8 inch square format on heavyweight 170 GSM tear-resistant satin paper. The Paperback features a glossy laminated softcover, while the Heirloom Hardcover features a 2.5mm thick rigid casebound cover with optional gold foil detailing designed to last for decades.'
  },
  {
    category: 'Shipping & Orders',
    question: 'Can I order just the Digital edition?',
    answer: 'Yes! Our Digital Storybook option (₹399) provides a high-resolution 300 DPI PDF that is instantly accessible on iPads, tablets, and phones, and can also be printed at home.'
  },
  {
    category: 'Shipping & Orders',
    question: 'What is your refund policy?',
    answer: 'Because every book is custom manufactured with your child’s name and illustrated likeness, we cannot accept returns for change of mind. However, if your book arrives damaged, with printing defects, or with a manufacturing error, we will reprint and replace it immediately at zero cost.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter(f => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#EB5E44] bg-[#FFF8F5] px-3 py-1 rounded-full border border-[#FCD9D0]">
          Parent Questions & Answers
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#162032] mt-2">
          Everything you need to know
        </h2>
        <p className="text-xs sm:text-sm text-[#56647A] mt-2">
          Learn how we turn a simple photograph into a timeless bedtime keepsake.
        </p>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          {['All', 'Personalization', 'Privacy & Safety', 'Shipping & Orders'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#162032] text-white shadow-xs'
                  : 'bg-white text-[#56647A] border border-[#E8DFD1] hover:border-[#162032]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#E8DFD1] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2]/50 transition-colors"
              >
                <span className="font-display font-bold text-sm sm:text-base text-[#162032]">
                  {faq.question}
                </span>
                <span className="w-8 h-8 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#162032] shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#56647A] leading-relaxed border-t border-[#F0E9DF] pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
