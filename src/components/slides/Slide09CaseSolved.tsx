import React, { useState } from 'react';
import { ANIMALS } from '../../data/gameData';
import { playClick } from '../../utils/audio';
import { ArrowRight, CheckCircle2, Sparkles, MapPin, Check } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
}

export const Slide09CaseSolved: React.FC<SlideProps> = ({ onNext }) => {
  const [selectedClues, setSelectedClues] = useState<number[]>([3]); // Evidence 3 selected by default

  const toggleClue = (idx: number) => {
    playClick();
    setSelectedClues((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const clueOptions = [
    { id: 1, text: 'Evidence 1: It is a mammal.' },
    { id: 2, text: 'Evidence 2: It has reddish-brown fur.' },
    { id: 3, text: 'Evidence 3: It has a long and big nose.' },
    { id: 4, text: 'Evidence 4: It lives in Borneo.' },
  ];

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 pb-10 text-center">
      {/* Top Victory Banner */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-yellow-400 font-mono tracking-wider uppercase mb-1">
          <CheckCircle2 className="w-5 h-5 text-yellow-400" />
          LEVEL 3 COMPLETED • ANALYZING MASTERED
        </div>
        <h2 className="font-heading text-4xl sm:text-6xl text-yellow-300 tracking-wide drop-shadow-[0_4px_16px_rgba(234,179,8,0.7)]">
          CASE SOLVED!
        </h2>
        <div className="font-heading text-2xl sm:text-4xl text-orange-400 tracking-wider">
          THE ANIMAL IS A BEKANTAN!
        </div>
        <p className="text-amber-100 text-sm sm:text-base font-bold mt-1">
          &quot;You found all the clues!&quot;
        </p>
      </div>

      {/* Main Center Stage: Bekantan Illustration & Reflection Question */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Large Bekantan Illustration in golden frame */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative group w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-orange-400 shadow-[0_12px_40px_rgba(234,88,12,0.4)] bg-stone-900">
            <img
              src={ANIMALS.bekantan.image}
              alt="Bekantan Proboscis Monkey"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 text-left">
              <span className="text-xs font-mono text-orange-300 block">Nasalis larvatus (Proboscis Monkey)</span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                Borneo Mangrove Forests
              </span>
            </div>
            <Sparkles className="absolute top-3 right-3 w-7 h-7 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Right: Golden Success Card with Interactive Reflection Question */}
        <div className="md:col-span-7 flex flex-col justify-between bg-stone-950/90 border-4 border-amber-500 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur text-left">
          {/* Points earned */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-amber-800/60">
            <span className="font-heading text-2xl text-yellow-300 tracking-wide">
              INVESTIGATION SUCCESS
            </span>
            <span className="font-heading text-2xl text-emerald-400 bg-emerald-950 px-3 py-1 rounded-xl border border-emerald-600">
              +20 RESCUE POINTS
            </span>
          </div>

          <div>
            <h3 className="font-heading text-xl sm:text-2xl text-amber-200 tracking-wide mb-2">
              Which evidence helped you identify the Bekantan?
            </h3>
            <p className="text-xs text-stone-300 mb-3">
              Tap the key evidence clues your team relied on to discuss in English:
            </p>

            {/* Interactive Clue Selection */}
            <div className="space-y-2">
              {clueOptions.map((clue) => {
                const isSelected = selectedClues.includes(clue.id);
                return (
                  <button
                    key={clue.id}
                    type="button"
                    onClick={() => toggleClue(clue.id)}
                    className={`w-full text-left p-2.5 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-orange-950/80 border-orange-400 text-orange-100 shadow-sm'
                        : 'bg-stone-900/80 border-stone-850 text-stone-300 hover:border-amber-600'
                    }`}
                  >
                    <span className="font-body text-xs sm:text-sm font-semibold">
                      {clue.text}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-yellow-400">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Key Clue
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-stone-900/80 rounded-xl border border-stone-800 text-xs text-stone-300 font-medium">
            <span className="text-amber-400 font-bold">English Discovery:</span> &quot;The long and big nose is unique to the male Bekantan, which uses it to attract mates and make warning vocalizations!&quot;
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="relative z-10 flex justify-center mt-3 shrink-0 pb-4">
        <button
          type="button"
          onClick={() => {
            playClick();
            onNext();
          }}
          className="btn-game-orange px-10 sm:px-14 py-3.5 sm:py-4 rounded-2xl text-xl sm:text-2xl font-extrabold text-white tracking-wider flex items-center gap-3 border-2 border-orange-300 cursor-pointer"
        >
          <span>CONTINUE TO LEVEL 4</span>
          <ArrowRight className="w-6 h-6 text-yellow-300" />
        </button>
      </div>
    </div>
  );
};
