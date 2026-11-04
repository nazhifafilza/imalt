import React, { useState } from 'react';
import { playClick, playSuccess, playVictory } from '../../utils/audio';
import { MessageSquareHeart, Sparkles, Trophy, HeartHandshake } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
  onAddScore: (points: number) => void;
}

export const Slide11Campaign: React.FC<SlideProps> = ({
  onNext,
  onAddScore,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState<number>(1); // Default to 1 (Super Fun)
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const emojiOptions = [
    {
      id: 1,
      emoji: '🤩',
      label: 'Super Fun & Easy!',
      desc: 'Loved identifying animals and creating posters.',
      activeClass: 'border-emerald-400 bg-emerald-950/90 text-emerald-100 shadow-[0_0_25px_rgba(52,211,153,0.5)] ring-4 ring-emerald-400 scale-[1.04]',
      inactiveClass: 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-emerald-600/70',
    },
    {
      id: 2,
      emoji: '🙂',
      label: 'Good Practice!',
      desc: 'Helped me learn English wildlife descriptions.',
      activeClass: 'border-yellow-400 bg-yellow-950/90 text-yellow-100 shadow-[0_0_25px_rgba(250,204,21,0.5)] ring-4 ring-yellow-400 scale-[1.04]',
      inactiveClass: 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-yellow-600/70',
    },
    {
      id: 3,
      emoji: '🧠',
      label: 'Challenging but Learnt A Lot!',
      desc: 'Tested my vocabulary and deductive thinking.',
      activeClass: 'border-orange-400 bg-orange-950/90 text-orange-100 shadow-[0_0_25px_rgba(251,146,60,0.5)] ring-4 ring-orange-400 scale-[1.04]',
      inactiveClass: 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-orange-600/70',
    },
  ];

  const handleSelect = (id: number) => {
    playClick();
    setSelectedEmoji(id);
  };

  const handleFinish = () => {
    playVictory();
    setIsSubmitting(true);
    onAddScore(20); // Adds final reflection points (completing 100/100 total)
    setTimeout(() => {
      onNext();
    }, 700);
  };

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto space-y-5 pb-12 text-center">
      {/* Top Header */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-yellow-400 font-mono tracking-wider uppercase mb-1">
          <MessageSquareHeart className="w-5 h-5 text-yellow-400 animate-bounce" />
          SLIDE 11 • MISSION REFLECTION & STUDENT FEEDBACK
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl text-yellow-300 tracking-wide drop-shadow-[0_4px_16px_rgba(234,179,8,0.7)]">
          HOW WAS YOUR LESSON & CAMPAIGN EXPERIENCE?
        </h2>
        <p className="text-amber-100 text-sm sm:text-base font-semibold mt-1">
          Select an emoji to reflect on today&apos;s English activity:
        </p>
      </div>

      {/* Center Card: 3 Large Interactive Emoji Buttons & Mini Comment Box */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto flex flex-col items-center space-y-6">

        {/* 3 Large Emoji Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
          {emojiOptions.map((opt) => {
            const isSelected = selectedEmoji === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id)}
                className={`p-5 sm:p-6 rounded-3xl border-3 flex flex-col items-center text-center cursor-pointer transition-all duration-300 backdrop-blur-md select-none ${
                  isSelected ? opt.activeClass : opt.inactiveClass
                }`}
              >
                <span className="text-5xl sm:text-6xl mb-3 drop-shadow transform transition-transform group-hover:scale-110">
                  {opt.emoji}
                </span>
                <span className="font-heading text-lg sm:text-xl tracking-wide block mb-1">
                  {opt.label}
                </span>
                <span className="text-xs text-stone-300 font-normal leading-snug">
                  {opt.desc}
                </span>
                {isSelected && (
                  <span className="mt-3 text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30">
                    Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Optional Mini Notes / Favorite Word Learned Box */}
        <div className="w-full max-w-2xl bg-stone-950/85 border-2 border-amber-600/70 rounded-2xl p-4 text-left shadow-xl backdrop-blur">
          <label className="font-mono text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
            <HeartHandshake className="w-4 h-4 text-amber-400" />
            Short Comment / Favorite Word Learned today (Optional):
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g., 'Endemic species', 'Varanus komodoensis', 'Mangrove forest sanctuary'..."
            className="w-full bg-stone-900 border border-stone-700 focus:border-amber-400 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 outline-none transition"
          />
        </div>
      </div>

      {/* Bottom Main Action Button */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 shrink-0 pb-4">
        <button
          type="button"
          onClick={handleFinish}
          disabled={isSubmitting}
          className="btn-game-green px-10 sm:px-16 py-3.5 sm:py-4 rounded-2xl text-xl sm:text-2xl font-extrabold text-white tracking-wider flex items-center gap-3 border-2 border-emerald-300 cursor-pointer shadow-xl animate-pulse"
        >
          <Trophy className="w-6 h-6 text-yellow-300" />
          COMPLETE MISSION & REVEAL FINAL SCORE 🎉
        </button>
      </div>
    </div>
  );
};
