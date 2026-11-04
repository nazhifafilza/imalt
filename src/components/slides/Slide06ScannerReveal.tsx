import React from 'react';
import { ANIMALS, GAME_IMAGES } from '../../data/gameData';
import { playClick } from '../../utils/audio';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
}

export const Slide06ScannerReveal: React.FC<SlideProps> = ({ onNext }) => {
  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 pb-10 text-center">
      {/* Top Banner */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400 font-mono tracking-wider uppercase mb-1">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          LEVEL 1 COMPLETED • REMEMBERING MASTERED
        </div>
        <h2 className="font-heading text-4xl sm:text-6xl text-yellow-300 tracking-wide drop-shadow-[0_4px_16px_rgba(234,179,8,0.6)]">
          CORRECT ANSWER!
        </h2>
        <div className="font-heading text-2xl sm:text-4xl text-emerald-300 tracking-wider mt-0.5">
          IT&apos;S A KOMODO!
        </div>
      </div>

      {/* Center Showcase: Large Clear Komodo + Golden Badge & Points */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Large Clear Komodo Illustration */}
        <div className="relative group w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-emerald-400 shadow-[0_12px_40px_rgba(16,185,129,0.4)] bg-stone-900">
          <img
            src={ANIMALS.komodo.image}
            alt="Komodo Dragon Revealed"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 text-left">
            <span className="text-xs font-mono text-emerald-300 block">Varanus komodoensis</span>
            <span className="text-sm font-bold text-white flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              East Nusa Tenggara Islands
            </span>
          </div>
        </div>

        {/* Golden Mission Badge & Points Card */}
        <div className="flex flex-col items-center justify-between bg-stone-950/90 border-4 border-amber-500 rounded-3xl p-6 shadow-2xl backdrop-blur max-w-sm w-full">
          {/* Badge Image */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-2 animate-bounce" style={{ animationDuration: '3s' }}>
            <img
              src={GAME_IMAGES.rescueBadge}
              alt="Golden Mission Badge"
              className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(245,158,11,0.6)]"
            />
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          {/* Points Earned Banner */}
          <div className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white rounded-2xl border-2 border-emerald-300 font-heading text-2xl sm:text-3xl tracking-wider shadow-lg mb-3">
            +10 RESCUE POINTS!
          </div>

          {/* Educational summary */}
          <div className="text-left text-xs sm:text-sm text-stone-200 space-y-1.5 bg-stone-900/90 p-3 rounded-xl border border-stone-800 w-full">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              Key Characteristics Verified:
            </div>
            <p>• Large carnivorous reptile</p>
            <p>• Strong legs & long muscular tail</p>
            <p>• Endemic to East Nusa Tenggara</p>
          </div>
        </div>
      </div>

      {/* Bottom Continue Button */}
      <div className="relative z-10 flex justify-center mt-3 shrink-0 pb-4">
        <button
          type="button"
          onClick={() => {
            playClick();
            onNext();
          }}
          className="btn-game-orange px-10 sm:px-14 py-3.5 sm:py-4 rounded-2xl text-xl sm:text-2xl font-extrabold text-white tracking-wider flex items-center gap-3 border-2 border-orange-300 cursor-pointer"
        >
          <span>CONTINUE TO LEVEL 2</span>
          <ArrowRight className="w-6 h-6 text-yellow-300" />
        </button>
      </div>
    </div>
  );
};
