import React, { useState } from 'react';
import { playClick, playSuccess, playError } from '../../utils/audio';
import { FileSearch, Sparkles, AlertCircle, Eye, Stamp, ShieldCheck } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
  onAddScore: (points: number) => void;
}

export const Slide08Evidence: React.FC<SlideProps> = ({ onNext, onAddScore }) => {
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const evidenceItems = [
    { num: 1, title: 'Evidence 1', text: 'It is a mammal.', tag: 'Class: Mammalia' },
    { num: 2, title: 'Evidence 2', text: 'It has reddish-brown fur.', tag: 'Fur Coloration' },
    { num: 3, title: 'Evidence 3', text: 'It has a long and big nose.', tag: 'Key Facial Trait' },
    { num: 4, title: 'Evidence 4', text: 'It lives in Borneo.', tag: 'Habitat: Mangroves' },
  ];

  const handleChoice = (choice: 'komodo' | 'bekantan' | 'cendrawasih') => {
    if (choice === 'bekantan') {
      playSuccess();
      setFeedback({
        message: 'BRILLIANT DEDUCTION! All four clues point directly to the Bekantan! Case solved!',
        isError: false,
      });
      setTimeout(() => {
        onAddScore(20);
        onNext();
      }, 900);
    } else if (choice === 'komodo') {
      playError();
      setFeedback({
        message: 'Incorrect! Evidence 1 states it is a mammal with fur. Komodo is a reptile with scales!',
        isError: true,
      });
    } else {
      playError();
      setFeedback({
        message: 'Incorrect! Evidence 1 states it is a mammal, and Evidence 4 states Borneo. Cendrawasih is a bird from Papua!',
        isError: true,
      });
    }
  };

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 pb-10">
      {/* Top Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 bg-stone-950/85 border-2 border-amber-600/80 rounded-2xl p-3 sm:p-4 backdrop-blur shadow-lg">
        <div>
          <div className="text-xs sm:text-sm font-bold text-amber-400 font-mono tracking-wider uppercase flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-amber-400 animate-pulse" />
            LEVEL 3 – ANALYZING • 20 RESCUE POINTS
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-yellow-300 tracking-wide">
            SOLVE THE MYSTERY CASE!
          </h2>
        </div>

        <div className="bg-amber-950/70 border border-amber-500/60 text-amber-200 text-xs sm:text-sm px-4 py-2 rounded-xl text-center sm:text-right font-medium">
          &quot;Analyze the forensic clues from Case File 001.&quot;
        </div>
      </div>

      {/* Main Detective Desk Layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 max-w-5xl mx-auto w-full my-auto items-stretch">
        {/* Left: TOP SECRET Manila Folder with 4 Evidence Cards */}
        <div className="md:col-span-7 flex flex-col justify-between bg-[#2d180d] border-4 border-amber-700/80 rounded-3xl p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* TOP SECRET Red Stamp */}
          <div className="absolute top-3 right-4 rotate-12 border-3 border-red-500 text-red-500 font-heading text-xl sm:text-2xl px-3 py-0.5 rounded tracking-widest pointer-events-none opacity-85 shadow-sm">
            TOP SECRET
          </div>

          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-1">
              <Stamp className="w-4 h-4 text-amber-400" />
              SPECIAL WILDLIFE INVESTIGATION
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl text-amber-100 tracking-wide mb-4">
              CASE FILE 001
            </h3>

            {/* 4 Pinned Evidence Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {evidenceItems.map((item, index) => (
                <div
                  key={item.num}
                  onClick={() => {
                    playClick();
                    setActiveEvidenceIndex(activeEvidenceIndex === index ? null : index);
                  }}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer relative shadow ${
                    activeEvidenceIndex === index
                      ? 'bg-amber-100 text-stone-900 border-yellow-400 scale-[1.03]'
                      : 'bg-[#fcf5e5] text-stone-900 border-amber-800/40 hover:scale-[1.01]'
                  }`}
                >
                  {/* Pin tack */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-600 border border-stone-800 shadow-sm" />
                  
                  <div className="flex items-center justify-between mt-1 mb-1">
                    <span className="font-heading text-lg text-amber-900 tracking-wide">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded">
                      {item.tag}
                    </span>
                  </div>
                  <p className="font-body text-xs sm:text-sm font-bold text-stone-900">
                    &quot;{item.text}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-900/60 flex items-center justify-between text-xs text-amber-300 font-mono">
            <span>STATUS: 4/4 CLUES UNLOCKED</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> Ready for identification
            </span>
          </div>
        </div>

        {/* Right: Answer Buttons */}
        <div className="md:col-span-5 flex flex-col justify-between bg-stone-950/90 border-3 border-amber-600 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur">
          <div>
            <div className="text-xs font-mono text-amber-400 tracking-wider mb-1">
              FINAL QUESTION:
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl text-yellow-300 tracking-wide mb-4">
              WHO IS THE ANIMAL?
            </h3>

            {/* Answer Buttons A, B, C */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleChoice('komodo')}
                className="w-full btn-game-wood p-3.5 rounded-2xl flex items-center justify-between text-left border-2 border-amber-700 text-white cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-black/40 font-heading text-xl text-yellow-300 border border-white/20">
                    A
                  </span>
                  <span className="font-heading text-xl sm:text-2xl tracking-wide">
                    KOMODO
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleChoice('bekantan')}
                className="w-full btn-game-green p-3.5 rounded-2xl flex items-center justify-between text-left border-2 border-emerald-300 text-white cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-black/40 font-heading text-xl text-yellow-300 border border-white/20">
                    B
                  </span>
                  <div>
                    <span className="font-heading text-xl sm:text-2xl tracking-wide block">
                      BEKANTAN
                    </span>
                    <span className="text-xs text-emerald-100 font-medium">
                      Reddish-brown monkey • Long nose • Borneo
                    </span>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-45 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleChoice('cendrawasih')}
                className="w-full btn-game-wood p-3.5 rounded-2xl flex items-center justify-between text-left border-2 border-amber-700 text-white cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-black/40 font-heading text-xl text-yellow-300 border border-white/20">
                    C
                  </span>
                  <span className="font-heading text-xl sm:text-2xl tracking-wide">
                    CENDRAWASIH
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mt-3 p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm font-medium ${
                feedback.isError
                  ? 'bg-red-950/80 border-red-500 text-red-200'
                  : 'bg-emerald-950/80 border-emerald-400 text-emerald-200 animate-pulse'
              }`}
            >
              <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${feedback.isError ? 'text-red-400' : 'text-emerald-400'}`} />
              <span>{feedback.message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer advice */}
      <div className="relative z-10 text-center text-xs text-stone-400 font-medium shrink-0 pb-4">
        Tip: Cross-reference the class (mammal) and facial feature (big nose) with your animal dossier!
      </div>
    </div>
  );
};
