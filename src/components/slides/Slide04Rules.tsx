import React from 'react';
import { playClick } from '../../utils/audio';
import { Trophy, CheckCircle, User, BookOpen, Target, Sparkles, Award } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
}

export const Slide04Rules: React.FC<SlideProps> = ({ onNext }) => {
  const instructions = [
    { num: 1, title: 'Complete all five missions.', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-950/70 border-emerald-600' },
    { num: 2, title: 'Work individually.', icon: User, color: 'text-amber-400', bg: 'bg-amber-950/70 border-amber-600' },
    { num: 3, title: 'Read the clues carefully.', icon: BookOpen, color: 'text-sky-400', bg: 'bg-sky-950/70 border-sky-600' },
    { num: 4, title: 'Choose or create the correct answer.', icon: CheckCircle, color: 'text-orange-400', bg: 'bg-orange-950/70 border-orange-600' },
    { num: 5, title: 'Collect Rescue Points.', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-950/70 border-yellow-500' },
  ];

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 pb-10">
      {/* Header */}
      <div className="relative z-10 text-center">
        <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono tracking-wider uppercase mb-1">
          MISSION BRIEFING & SCORING RUBRIC
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl text-yellow-300 tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          HOW TO PLAY?
        </h2>
        <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto mt-0.5">
          Follow these 5 adventure rules to rescue the fauna of Indonesia and earn your Gold Badge!
        </p>
      </div>

      {/* Main Content: 5 Instructions on Left, Scoreboard on Right */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-6xl mx-auto w-full my-auto items-stretch">
        {/* Left: 5 Illustrated Instructions */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5">
          {instructions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className={`flex items-center gap-4 p-3 sm:p-3.5 rounded-2xl border-2 ${item.bg} backdrop-blur shadow-lg transition-transform hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black/50 border border-white/20 shrink-0 font-heading text-xl sm:text-2xl text-yellow-300 shadow-inner">
                  {item.num}
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <Icon className={`w-6 h-6 ${item.color} shrink-0`} />
                  <span className="font-body text-sm sm:text-base font-bold text-stone-100">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Scoreboard Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-stone-950/90 border-4 border-amber-600 rounded-3xl p-5 shadow-2xl backdrop-blur relative">
          {/* Wood screw decorations */}
          <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-amber-400 border border-amber-700" />
          <div className="absolute top-2 right-3 w-3 h-3 rounded-full bg-amber-400 border border-amber-700" />
          <div className="absolute bottom-2 left-3 w-3 h-3 rounded-full bg-amber-400 border border-amber-700" />
          <div className="absolute bottom-2 right-3 w-3 h-3 rounded-full bg-amber-400 border border-amber-700" />

          <div className="text-center border-b border-amber-800/60 pb-3">
            <div className="flex items-center justify-center gap-2 text-yellow-400 font-heading text-2xl sm:text-3xl tracking-wide">
              <Award className="w-7 h-7 text-yellow-400" />
              GAME SCOREBOARD
            </div>
            <p className="text-[11px] sm:text-xs text-amber-200/80">Earn points on every completed mission level</p>
          </div>

          {/* Level Points Table */}
          <div className="space-y-2 py-3 font-mono text-sm sm:text-base">
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/50 border border-emerald-800/60 text-emerald-300">
              <span className="font-semibold">Level 1: Animal Scanner</span>
              <span className="font-bold text-yellow-300">10 points</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-sky-950/50 border border-sky-800/60 text-sky-300">
              <span className="font-semibold">Level 2: Wildlife Lab</span>
              <span className="font-bold text-yellow-300">20 points</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-amber-950/50 border border-amber-800/60 text-amber-300">
              <span className="font-semibold">Level 3: Mystery Evidence</span>
              <span className="font-bold text-yellow-300">20 points</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-orange-950/50 border border-orange-800/60 text-orange-300">
              <span className="font-semibold">Level 4: Control Room</span>
              <span className="font-bold text-yellow-300">20 points</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-purple-950/50 border border-purple-800/60 text-purple-300">
              <span className="font-semibold">Level 5: Campaign Poster</span>
              <span className="font-bold text-yellow-300">30 points</span>
            </div>
          </div>

          {/* TOTAL BANNER */}
          <div className="mt-2 p-3 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-stone-950 flex items-center justify-between font-heading font-extrabold shadow-md">
            <span className="text-xl sm:text-2xl tracking-wider">TOTAL SCORE:</span>
            <span className="text-2xl sm:text-3xl tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-6 h-6 text-stone-950 animate-bounce" />
              100 POINTS
            </span>
          </div>
        </div>
      </div>

      {/* LET'S PLAY Button */}
      <div className="relative z-10 flex justify-center mt-3 shrink-0 pb-4">
        <button
          type="button"
          onClick={() => {
            playClick();
            onNext();
          }}
          className="btn-game-green px-10 sm:px-14 py-3.5 sm:py-4 rounded-2xl text-xl sm:text-2xl font-extrabold text-white tracking-wider flex items-center gap-3 border-2 border-emerald-300 cursor-pointer"
        >
          <Sparkles className="w-6 h-6 text-yellow-300" />
          LET&apos;S PLAY!
        </button>
      </div>
    </div>
  );
};
