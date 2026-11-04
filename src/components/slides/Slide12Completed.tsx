import React, { useState } from 'react';
import { ANIMALS, GAME_IMAGES } from '../../data/gameData';
import { playClick, playVictory } from '../../utils/audio';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  Award,
  Printer,
  Crown,
  ChevronDown,
  Medal,
  Users,
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

  interface LeaderboardEntry {
    name: string;
    score: number;
    badge: string;
    avatar: string;
    isCurrentStudent?: boolean;
  }

  // Classroom Dummy Peers
  const dummyClassmates: LeaderboardEntry[] = [
    { name: 'Budi Santoso', score: 95, badge: 'WILDLIFE GUARDIAN', avatar: '🦁', isCurrentStudent: false },
    { name: 'Siti Rahma', score: 90, badge: 'WILDLIFE GUARDIAN', avatar: '🌿', isCurrentStudent: false },
    { name: 'Ahmad Fauzan', score: 85, badge: 'FOREST RANGER', avatar: '🦜', isCurrentStudent: false },
    { name: 'Dewi Lestari', score: 80, badge: 'ECO DEFENDER', avatar: '🦎', isCurrentStudent: false },
    { name: 'Rian Pratama', score: 75, badge: 'JUNGLE SCOUT', avatar: '🐒', isCurrentStudent: false },
  ];

  // Insert current student and sort descending by score
  const allEntries: LeaderboardEntry[] = [
    ...dummyClassmates,
    {
      name: studentName.trim() || 'Agent Rescuer',
      score: score,
      badge: currentBadge,
      avatar: '⭐',
      isCurrentStudent: true,
    },
  ].sort((a, b) => b.score - a.score);

  const studentRank = allEntries.findIndex((item) => item.isCurrentStudent) + 1;

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
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-yellow-400 font-mono tracking-wider uppercase mb-0.5">
          <Trophy className="w-5 h-5 text-yellow-400 animate-bounce" />
          FINAL MISSION DEBRIEFING • GRADE IX ENGLISH
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 tracking-wide drop-shadow-[0_4px_16px_rgba(234,179,8,0.7)]">
          CONGRATULATIONS, {studentName.toUpperCase()}!
        </h2>
        <div className="font-heading text-lg sm:text-2xl text-emerald-300 tracking-wider">
          MISSION COMPLETED • YOU RANKED #{studentRank} IN CLASS!
        </div>
      </div>

      {/* Main Grid: Left (Leaderboard Table) & Right (Hero Badge, 3 Animals & Reflection) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-6xl mx-auto w-full my-auto items-stretch">

        {/* ============================================================== */}
        {/* KOLOM KIRI: CLASSROOM MISSION LEADERBOARD                      */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-stone-950/90 border-3 border-amber-600 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur text-left">
          <div>
            <div className="flex items-center justify-between border-b border-amber-700/60 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl text-yellow-300 tracking-wide">
                    CLASSROOM MISSION LEADERBOARD
                  </h3>
                  <span className="text-[10px] text-amber-200/80 font-mono block">
                    LIVE RANKING BASED ON TOTAL RESCUE POINTS
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">
                  {allEntries.length} Rescuers
                </span>
              </div>
            </div>

            {/* Leaderboard Entries List */}
            <div className="space-y-2">
              {allEntries.map((player, index) => {
                const rank = index + 1;
                const isStudent = player.isCurrentStudent;

                return (
                  <div
                    key={index}
                    className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      isStudent
                        ? 'bg-gradient-to-r from-amber-950/90 via-amber-900/60 to-yellow-950/90 border-2 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-[1.02]'
                        : 'bg-stone-900/70 border-stone-800 text-stone-300 hover:border-amber-700/60'
                    }`}
                  >
                    {/* Rank & Player Info */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      {/* Rank Number Badge */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-heading text-base sm:text-lg shrink-0 shadow ${
                          rank === 1
                            ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-stone-950 border border-yellow-200'
                            : rank === 2
                            ? 'bg-gradient-to-br from-stone-300 to-stone-500 text-stone-950 border border-stone-200'
                            : rank === 3
                            ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 border border-amber-600'
                            : 'bg-stone-950 text-stone-400 border border-stone-800'
                        }`}
                      >
                        {rank === 1 ? '👑' : rank}
                      </div>

                      <span className="text-xl shrink-0">{player.avatar}</span>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-heading text-base sm:text-lg tracking-wide ${
                              isStudent ? 'text-yellow-300 font-extrabold' : 'text-stone-100'
                            }`}
                          >
                            {player.name}
                          </span>
                          {isStudent && (
                            <span className="text-[10px] font-mono font-bold bg-yellow-400 text-stone-950 px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                              YOU / RESCUER
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-stone-400">
                          Badge: <strong className="text-amber-300">{player.badge}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <span
                        className={`font-mono text-base sm:text-xl font-extrabold ${
                          isStudent ? 'text-emerald-400' : 'text-stone-300'
                        }`}
                      >
                        {player.score}
                      </span>
                      <span className="text-[10px] text-stone-400 block font-mono">PTS</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-amber-800/40 text-[11px] text-stone-400 flex items-center justify-between">
            <span>✨ Highest scores earn the Golden Wildlife Guardian honor!</span>
            <span className="text-yellow-400 font-bold font-mono">GRADE IX RANKING</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KOLOM KANAN: BADGE, 3 ANIMALS & EDUCATIONAL REFLECTION         */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">

          {/* Student Status & Golden Badge Card */}
          <div className="bg-stone-950/90 border-3 border-amber-500 rounded-3xl p-4 shadow-xl backdrop-blur text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                <img
                  src={GAME_IMAGES.rescueBadge}
                  alt="Golden Rescue Team Badge"
                  className="w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(234,179,8,0.8)]"
                />
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <div>
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                  EARNED BADGE STATUS
                </div>
                <div className="font-heading text-xl sm:text-2xl text-yellow-300">
                  {currentBadge}
                </div>
                <div className="text-xs text-emerald-400 font-mono font-bold">
                  {score} / 100 POINTS ACCUMULATED
                </div>
              </div>
            </div>

            {/* 3 Animals showcase miniatures */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-800 text-center">
              <div className="bg-stone-900/80 p-1.5 rounded-xl border border-emerald-600/70">
                <img src={ANIMALS.komodo.image} alt="Komodo" className="w-10 h-10 mx-auto rounded-lg object-cover mb-1" />
                <span className="font-heading text-xs text-emerald-300 block">KOMODO</span>
                <span className="text-[8px] text-stone-400">NTT</span>
              </div>

              <div className="bg-stone-900/80 p-1.5 rounded-xl border border-orange-600/70">
                <img src={ANIMALS.bekantan.image} alt="Bekantan" className="w-10 h-10 mx-auto rounded-lg object-cover mb-1" />
                <span className="font-heading text-xs text-orange-300 block">BEKANTAN</span>
                <span className="text-[8px] text-stone-400">Borneo</span>
              </div>

              <div className="bg-stone-900/80 p-1.5 rounded-xl border border-yellow-500/70">
                <img src={ANIMALS.cendrawasih.image} alt="Cendrawasih" className="w-10 h-10 mx-auto rounded-lg object-cover mb-1" />
                <span className="font-heading text-xs text-yellow-300 block">CENDRAWASIH</span>
                <span className="text-[8px] text-stone-400">Papua</span>
              </div>
            </div>
          </div>

          {/* Microteaching Reflection Accordion */}
          <div className="bg-stone-950/90 border-2 border-emerald-600 rounded-3xl p-3.5 shadow-xl backdrop-blur text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading text-base sm:text-lg text-yellow-300 tracking-wide">
                CLASSROOM REFLECTION
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Microteaching Q&A</span>
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
                      className="w-full p-2 flex items-center justify-between text-left text-xs font-bold text-amber-200 hover:text-white cursor-pointer transition"
                    >
                      <span>{r.q}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-2 pt-0 text-xs text-stone-300 font-medium leading-relaxed border-t border-stone-800/60 bg-black/40">
                        {r.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-2 p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-[11px] font-semibold italic text-center">
              &quot;Protecting wildlife starts with understanding animals and their habitats.&quot;
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TOMBOL AKSI UTAMA: CERTIFICATE & REPLAY MISSION               */}
      {/* ============================================================== */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-2 shrink-0 pb-4">
        <button
          type="button"
          onClick={() => {
            playVictory();
            setShowCertificate(true);
          }}
          className="btn-game-wood px-6 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-bold text-white tracking-wider flex items-center gap-2 border-2 border-amber-600 cursor-pointer"
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
          className="btn-game-green px-8 sm:px-12 py-3 rounded-2xl text-base sm:text-lg font-extrabold text-white tracking-wider flex items-center gap-2.5 border-2 border-emerald-300 cursor-pointer shadow-xl"
        >
          <RotateCcw className="w-5 h-5 text-yellow-300" />
          <span>REPLAY MISSION 🔄</span>
        </button>
      </div>

      {/* Modal: View Official Rescue Certificate */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full bg-[#fdf8ee] text-stone-900 border-8 border-amber-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
            <div className="border-4 border-amber-500/70 p-5 rounded-2xl relative">
              <div className="flex justify-center mb-2">
                <img src={GAME_IMAGES.rescueBadge} alt="Gold Badge" className="w-20 h-20 object-contain drop-shadow" />
              </div>
              <div className="text-xs font-mono font-bold text-amber-800 uppercase tracking-widest">
                JUNIOR HIGH SCHOOL GRADE IX • ENGLISH
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl text-amber-950 mt-1">
                CERTIFICATE OF WILDLIFE DEFENDER
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-medium mt-2">
                This certifies that <strong className="text-amber-950 text-base">{studentName.toUpperCase()}</strong> has successfully investigated and advocated for the conservation of Indonesia&apos;s fauna:
              </p>

              <div className="font-heading text-xl sm:text-2xl text-emerald-900 mt-2 tracking-wide">
                KOMODO • BEKANTAN • CENDRAWASIH
              </div>

              <div className="mt-4 pt-3 border-t border-amber-300 flex items-center justify-between text-xs text-stone-600 font-mono">
                <span>Final Score: <strong>{score} / 100 Pts</strong></span>
                <span>Badge: <strong>{currentBadge}</strong></span>
                <span>Rank: <strong>#{studentRank}</strong></span>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                Print Certificate
              </button>
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer"
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
