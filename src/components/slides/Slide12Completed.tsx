import React, { useState } from 'react';
import { ANIMALS, GAME_IMAGES } from '../../data/gameData';
import { playClick, playVictory } from '../../utils/audio';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  Award,
  Printer,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Star,
} from 'lucide-react';

interface SlideProps {
  studentName?: string;
  score: number;
  onRestart: () => void;
}

export const Slide12Completed: React.FC<SlideProps> = ({
  studentName = 'Agent Rescuer',
  score,
  onRestart,
}) => {
  const [openReflection, setOpenReflection] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Determine badge based on score
  const getBadgeTitle = (pts: number) => {
    if (pts >= 80) return 'WILDLIFE GUARDIAN';
    if (pts >= 70) return 'FOREST RANGER';
    if (pts >= 60) return 'ECO DEFENDER';
    return 'JUNGLE SCOUT';
  };

  const currentBadge = getBadgeTitle(score);

  const reflections = [
    {
      id: 1,
      q: '1. What animal did you learn about today?',
      a: 'We learned about three iconic Indonesian animals: the Komodo (East Nusa Tenggara), the Bekantan (Borneo), and the Cendrawasih (Papua).',
    },
    {
      id: 2,
      q: '2. What is its special characteristic?',
      a: 'Komodo has strong legs and a long tail; Bekantan has a large, long nose and reddish-brown fur; and Cendrawasih has distinctive, breathtaking colorful feathers.',
    },
    {
      id: 3,
      q: '3. How can we protect Indonesian wildlife?',
      a: 'By protecting their natural rainforest and mangrove habitats, enforcing anti-poaching laws, educating local communities, and raising global awareness!',
    },
  ];

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-3 sm:p-5 md:p-6 overflow-y-auto space-y-4 pb-12 text-center">
      {/* Top Banner */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-yellow-400 font-mono tracking-wider uppercase mb-1">
          <Trophy className="w-5 h-5 text-yellow-400 animate-bounce" />
          FINAL MISSION COMPLETE • GRADE IX ENGLISH
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 tracking-wide drop-shadow-[0_4px_16px_rgba(234,179,8,0.7)]">
          CONGRATULATIONS, {studentName.toUpperCase()}!
        </h2>
        <div className="font-heading text-base sm:text-xl text-emerald-300 tracking-wider flex items-center gap-2 justify-center mt-0.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>MISSION ACCOMPLISHED • ALL 3 SPECIES PROTECTED!</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CENTERED FINAL SCORE DISPLAY (NO LEADERBOARD / NO RANK)        */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-3xl mx-auto w-full my-auto flex flex-col items-center">
        <div className="w-full bg-stone-950/90 border-4 border-amber-500 rounded-3xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur text-center relative overflow-hidden">
          {/* Ambient inner glow */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge & Decorative Sparkles */}
          <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-3">
            <img
              src={GAME_IMAGES.rescueBadge}
              alt="Rescue Team Badge"
              className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(234,179,8,0.8)] animate-pulse"
              style={{ animationDuration: '3s' }}
            />
            <Sparkles
              className="absolute -top-1 -right-1 w-6 h-6 text-yellow-300 animate-spin"
              style={{ animationDuration: '8s' }}
            />
            <Star className="absolute -bottom-1 -left-1 w-5 h-5 text-amber-400" />
          </div>

          {/* Title & Badge Level */}
          <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/80 px-4 py-1.5 rounded-full mb-3 shadow">
            <span className="text-xs font-mono text-amber-300 uppercase tracking-widest font-bold">
              EARNED HONOR:
            </span>
            <span className="font-heading text-sm sm:text-base text-yellow-300 tracking-wider">
              {currentBadge}
            </span>
          </div>

          {/* Huge Centered Final Score */}
          <div className="my-2">
            <div className="text-xs sm:text-sm font-mono font-bold text-stone-300 tracking-widest uppercase mb-1">
              YOUR FINAL RESCUE SCORE
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-mono text-6xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-300 to-amber-300 drop-shadow-[0_4px_24px_rgba(250,204,21,0.6)]">
                {score}
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-stone-400">
                / 100 PTS
              </span>
            </div>

            {/* Score Progress Bar */}
            <div className="max-w-md mx-auto w-full bg-stone-900 h-3 rounded-full overflow-hidden border border-amber-700/60 p-0.5 mt-2">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-yellow-300 rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(234,179,8,0.7)]"
                style={{ width: `${Math.max(5, Math.min(100, score))}%` }}
              />
            </div>
          </div>

          {/* Three Rescued Species Showcase */}
          <div className="mt-6 pt-5 border-t border-amber-800/50">
            <div className="text-xs font-mono text-emerald-400 tracking-wider uppercase mb-3 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>INDONESIAN FAUNA PROTECTED IN THIS MISSION</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* KOMODO */}
              <div className="bg-stone-900/80 border border-emerald-600/70 p-3 rounded-2xl flex items-center sm:flex-col sm:text-center gap-3">
                <img
                  src={ANIMALS.komodo.image}
                  alt="Komodo"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 border border-emerald-500/80 shadow"
                />
                <div className="text-left sm:text-center">
                  <span className="font-heading text-sm sm:text-base text-emerald-300 block">
                    KOMODO
                  </span>
                  <span className="text-[11px] text-stone-300 block">East Nusa Tenggara</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Large Reptile</span>
                </div>
              </div>

              {/* BEKANTAN */}
              <div className="bg-stone-900/80 border border-orange-600/70 p-3 rounded-2xl flex items-center sm:flex-col sm:text-center gap-3">
                <img
                  src={ANIMALS.bekantan.image}
                  alt="Bekantan"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 border border-orange-500/80 shadow"
                />
                <div className="text-left sm:text-center">
                  <span className="font-heading text-sm sm:text-base text-orange-300 block">
                    BEKANTAN
                  </span>
                  <span className="text-[11px] text-stone-300 block">Borneo Mangroves</span>
                  <span className="text-[10px] text-orange-400 font-mono">Long-nosed Monkey</span>
                </div>
              </div>

              {/* CENDRAWASIH */}
              <div className="bg-stone-900/80 border border-yellow-500/70 p-3 rounded-2xl flex items-center sm:flex-col sm:text-center gap-3">
                <img
                  src={ANIMALS.cendrawasih.image}
                  alt="Cendrawasih"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 border border-yellow-400/80 shadow"
                />
                <div className="text-left sm:text-center">
                  <span className="font-heading text-sm sm:text-base text-yellow-300 block">
                    CENDRAWASIH
                  </span>
                  <span className="text-[11px] text-stone-300 block">Papua Canopy</span>
                  <span className="text-[10px] text-yellow-400 font-mono">Colorful Bird</span>
                </div>
              </div>
            </div>
          </div>

          {/* Microteaching Reflection Accordion */}
          <div className="mt-5 pt-4 border-t border-stone-800 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading text-sm sm:text-base text-yellow-300 tracking-wide">
                CLASSROOM LEARNING SUMMARY
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">English Grade IX</span>
            </div>

            <div className="space-y-1.5">
              {reflections.map((r) => {
                const isOpen = openReflection === r.id;
                return (
                  <div key={r.id} className="border border-stone-800 rounded-xl overflow-hidden bg-stone-900/70">
                    <button
                      type="button"
                      onClick={() => {
                        playClick();
                        setOpenReflection(isOpen ? null : r.id);
                      }}
                      className="w-full p-2.5 flex items-center justify-between text-left text-xs font-bold text-amber-200 hover:text-white cursor-pointer transition"
                    >
                      <span>{r.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-2.5 pt-0 text-xs text-stone-300 font-medium leading-relaxed border-t border-stone-800/60 bg-black/40">
                        {r.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM ACTION BUTTONS: VIEW CERTIFICATE & REPLAY MISSION       */}
      {/* ============================================================== */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-2 shrink-0 pb-4">
        <button
          type="button"
          onClick={() => {
            playVictory();
            setShowCertificate(true);
          }}
          className="btn-game-wood px-6 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-bold text-white tracking-wider flex items-center gap-2 border-2 border-amber-600 cursor-pointer shadow-lg hover:scale-105 transition-transform"
        >
          <Award className="w-5 h-5 text-yellow-300" />
          <span>VIEW RESCUE CERTIFICATE</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClick();
            onRestart();
          }}
          className="btn-game-green px-8 sm:px-12 py-3 rounded-2xl text-base sm:text-lg font-extrabold text-white tracking-wider flex items-center gap-2.5 border-2 border-emerald-300 cursor-pointer shadow-xl hover:scale-105 transition-transform"
        >
          <RotateCcw className="w-5 h-5 text-yellow-300" />
          <span>REPLAY MISSION 🔄</span>
        </button>
      </div>

      {/* Modal: View Official Rescue Certificate (Rank excluded) */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full bg-[#fdf8ee] text-stone-900 border-8 border-amber-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="border-4 border-amber-500/70 p-5 rounded-2xl relative">
              <div className="flex justify-center mb-2">
                <img
                  src={GAME_IMAGES.rescueBadge}
                  alt="Gold Badge"
                  className="w-20 h-20 object-contain drop-shadow"
                />
              </div>
              <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest">
                JUNIOR HIGH SCHOOL GRADE IX • ENGLISH
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl text-amber-950 mt-1">
                CERTIFICATE OF WILDLIFE DEFENDER
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-medium mt-2">
                This certifies that{' '}
                <strong className="text-amber-950 text-base">{studentName.toUpperCase()}</strong> has
                successfully investigated and advocated for the conservation of Indonesia&apos;s fauna:
              </p>

              <div className="font-heading text-xl sm:text-2xl text-emerald-900 mt-2 tracking-wide">
                KOMODO • BEKANTAN • CENDRAWASIH
              </div>

              <div className="mt-4 pt-3 border-t border-amber-300 flex items-center justify-around text-xs text-stone-700 font-mono">
                <span>
                  Final Score: <strong>{score} / 100 Pts</strong>
                </span>
                <span>
                  Honor Badge: <strong>{currentBadge}</strong>
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                Print Certificate
              </button>
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
