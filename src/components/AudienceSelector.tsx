import React from 'react';
import { motion } from 'motion/react';
import { AudienceCategory } from '../types';

interface AudienceSelectorProps {
  selectedCategory: AudienceCategory;
  onSelectCategory: (category: AudienceCategory) => void;
}

const AUDIENCE_OPTIONS: { id: AudienceCategory; label: string; subtitle: string }[] = [
  {
    id: 'person',
    label: '❤️ YOUR PERSON',
    subtitle: 'Couples, crushes, late-night dates & anniversaries',
  },
  {
    id: 'bestie',
    label: '👯 YOUR BESTIE',
    subtitle: 'Breakups, gossips, inside jokes & just because',
  },
  {
    id: 'people',
    label: '🎂 YOUR PEOPLE',
    subtitle: 'Squad, birthdays, house parties & office wins',
  },
];

export const AudienceSelector: React.FC<AudienceSelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="audience-section" className="w-full bg-[#FFFFFF] text-[#000000] py-20 sm:py-28 px-4 sm:px-8 border-b-4 border-[#000000]">
      <div className="max-w-7xl mx-auto">
        {/* Huge Heading */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl leading-[0.98] sm:leading-[0.95] tracking-tight uppercase text-[#000000] m-0">
            <span className="block">WHO'S</span>
            <span className="block">IT FOR?</span>
          </h2>
        </div>

        {/* Three simple choices: Large black outlined button/card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {AUDIENCE_OPTIONS.map((opt) => {
            const isSelected = selectedCategory === opt.id;
            return (
              <motion.button
                key={opt.id}
                id={`audience-btn-${opt.id}`}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategory(isSelected ? 'all' : opt.id)}
                className={`w-full text-left p-6 sm:p-8 border-4 border-[#000000] transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[170px] sm:min-h-[200px] ${
                  isSelected
                    ? 'bg-[#000000] text-[#FFFFFF] shadow-[8px_8px_0px_0px_#888888]'
                    : 'bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F3] shadow-[8px_8px_0px_0px_#000000]'
                }`}
              >
                <div>
                  <div className="font-punch text-2xl sm:text-3xl uppercase tracking-tight mb-2">
                    {opt.label}
                  </div>
                  <p className={`text-sm sm:text-base font-medium leading-snug ${isSelected ? 'text-[#CCCCCC]' : 'text-[#444444]'}`}>
                    {opt.subtitle}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t-2 border-current">
                  <span className="text-xs font-punch tracking-widest uppercase">
                    {isSelected ? 'SELECTED (CLICK TO CLEAR)' : 'VIEW BOXES'}
                  </span>
                  <span className="font-punch text-xl">→</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Clear filter button if filtered */}
        {selectedCategory !== 'all' && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm font-bold uppercase tracking-wider text-[#000000]">
              Showing boxes for selected vibe
            </p>
            <button
              id="clear-audience-filter"
              onClick={() => onSelectCategory('all')}
              className="text-xs font-punch tracking-widest uppercase border-b-2 border-[#000000] hover:opacity-70 cursor-pointer"
            >
              SHOW ALL BOXES ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
