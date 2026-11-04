import React, { useState } from 'react';
import { ANIMALS } from '../../data/gameData';
import { playClick, playSuccess, playError } from '../../utils/audio';
import { Search, Eye, Footprints, AlertCircle, Scan, Sparkles } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
  onAddScore: (points: number) => void;
}

export const Slide05Scanner: React.FC<SlideProps> = ({ onNext, onAddScore }) => {
  // 9 tiles state (true = revealed, false = covered)
  const [revealedTiles, setRevealedTiles] = useState<boolean[]>([
    false, false, false,
    false, true, false, // Center tile revealed by default as an initial hint
    false, false, false,
  ]);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [scannerPulse, setScannerPulse] = useState(false);

  const toggleTile = (index: number) => {
    playClick();
    setRevealedTiles((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const revealAllTiles = () => {
    playClick();
    setScannerPulse(true);
    setRevealedTiles([true, true, true, true, true, true, true, true, true]);
    setTimeout(() => setScannerPulse(false), 800);
  };

  const handleAnswer = (choice: 'komodo' | 'bekantan' | 'cendrawasih') => {
    if (choice === 'komodo') {
      playSuccess();
      setFeedback({
        message: "EXCELLENT! It's a Komodo! Strong legs and scaly tail detected!",
        isError: false,
      });
      setTimeout(() => {
        onAddScore(10);
        onNext();
      }, 900);
    } else if (choice === 'bekantan') {
      playError();
      setFeedback({
        message: "Not quite! A Bekantan has reddish-brown fur and a long nose. Look at those scaly claws!",
        isError: true,
      });
    } else {
      playError();
      setFeedback({
        message: "Not quite! A Cendrawasih has colorful feathers and wings. This creature is a large reptile!",
        isError: true,
      });
    }
  };

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 pb-10">
      {/* Top Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 bg-stone-950/80 border-2 border-emerald-600/80 rounded-2xl p-3 sm:p-4 backdrop-blur shadow-lg">
        <div>
          <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono tracking-wider uppercase flex items-center gap-2">
            <Scan className="w-4 h-4 text-emerald-400 animate-pulse" />
            LEVEL 1 – REMEMBERING • 10 RESCUE POINTS
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-yellow-300 tracking-wide">
            WHO IS HIDING?
          </h2>
        </div>

        <div className="bg-emerald-950/70 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm px-4 py-2 rounded-xl text-center sm:text-right font-medium max-w-md">
          &quot;Look carefully at the hidden animal. Can you identify it?&quot;
        </div>
      </div>

      {/* Main Scanner Chamber */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 max-w-5xl mx-auto w-full my-auto items-center">
        {/* Left: 9-Tile Mystery Scanner Screen */}
        <div className="md:col-span-7 flex flex-col items-center">
          <div className={`relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border-4 border-emerald-500 bg-stone-950 shadow-[0_10px_35px_rgba(0,0,0,0.8)] ${scannerPulse ? 'ring-4 ring-emerald-300 animate-pulse' : ''}`}>
            {/* The hidden Komodo image underneath */}
            <img
              src={ANIMALS.komodo.image}
              alt="Hidden Animal"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* High-tech Scanner Grid Overlay with 9 Clickable Mystery Tiles */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1.5 p-1.5 bg-black/20">
              {revealedTiles.map((isRevealed, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleTile(idx)}
                  className={`relative flex flex-col items-center justify-center transition-all duration-300 rounded-xl cursor-pointer ${
                    isRevealed
                      ? 'bg-transparent border border-emerald-400/40 hover:bg-emerald-400/10'
                      : 'bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-950 border-2 border-emerald-600/70 shadow-inner hover:scale-[0.98]'
                  }`}
                  title={isRevealed ? 'Revealed' : 'Click to uncover'}
                >
                  {!isRevealed ? (
                    <div className="flex flex-col items-center text-center p-1">
                      <Search className="w-5 h-5 text-emerald-400 mb-0.5 animate-bounce" />
                      <span className="font-heading text-lg sm:text-xl text-yellow-300 drop-shadow">
                        ?
                      </span>
                      <span className="text-[9px] font-mono text-emerald-300/80">TILE {idx + 1}</span>
                    </div>
                  ) : (
                    <div className="absolute top-1 right-1 bg-black/60 rounded px-1 text-[9px] font-mono text-emerald-300">
                      SCAN
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Scanner reticle & footprints overlay */}
            <div className="absolute inset-0 pointer-events-none border-2 border-emerald-400/30 rounded-3xl flex items-center justify-center">
              <div className="w-32 h-32 border border-emerald-400/20 rounded-full" />
              <div className="w-48 h-48 border border-emerald-400/20 rounded-full" />
            </div>
          </div>

          {/* Scanner Controls */}
          <div className="flex items-center gap-3 mt-3">
            <button
              type="button"
              onClick={revealAllTiles}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-emerald-300 border border-emerald-600/50 text-xs font-semibold cursor-pointer shadow transition"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              SCAN ALL TILES
            </button>
            <div className="flex items-center gap-1.5 text-xs text-stone-300 font-mono">
              <Footprints className="w-4 h-4 text-amber-400" />
              Reptilian footprints detected
            </div>
          </div>
        </div>

        {/* Right: Answer Choices & Identification Terminal */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-4 bg-stone-950/85 border-3 border-amber-600 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur">
          <div>
            <div className="text-xs font-mono text-amber-400 tracking-wider mb-1">
              CHOOSE YOUR IDENTIFICATION:
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl text-stone-100 tracking-wide mb-3">
              SELECT THE SPECIES
            </h3>

            {/* Answer Buttons A, B, C */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleAnswer('komodo')}
                className="w-full btn-game-green p-3.5 sm:p-4 rounded-2xl flex items-center justify-between text-left border-2 border-emerald-300 text-white cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-black/40 font-heading text-xl text-yellow-300 border border-white/20">
                    A
                  </span>
                  <div>
                    <span className="font-heading text-xl sm:text-2xl tracking-wide block">
                      KOMODO
                    </span>
                    <span className="text-xs text-emerald-100 font-medium">
                      Large reptile • East Nusa Tenggara
                    </span>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-45 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleAnswer('bekantan')}
                className="w-full btn-game-wood p-3.5 sm:p-4 rounded-2xl flex items-center justify-between text-left border-2 border-amber-500 text-white cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-black/40 font-heading text-xl text-amber-300 border border-white/20">
                    B
                  </span>
                  <div>
                    <span className="font-heading text-xl sm:text-2xl tracking-wide block">
                      BEKANTAN
                    </span>
                    <span className="text-xs text-amber-200 font-medium">
                      Reddish-brown monkey • Borneo
                    </span>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleAnswer('cendrawasih')}
                className="w-full btn-game-wood p-3.5 sm:p-4 rounded-2xl flex items-center justify-between text-left border-2 border-amber-500 text-white cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-black/40 font-heading text-xl text-yellow-300 border border-white/20">
                    C
                  </span>
                  <div>
                    <span className="font-heading text-xl sm:text-2xl tracking-wide block">
                      CENDRAWASIH
                    </span>
                    <span className="text-xs text-yellow-200 font-medium">
                      Colorful bird • Papua
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Dynamic Feedback Banner */}
          {feedback && (
            <div
              className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm font-medium ${
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

      {/* Footer hint */}
      <div className="relative z-10 text-center text-xs text-stone-400 font-medium shrink-0 pb-4">
        Tip: Click on the tiles to reveal hidden clues before choosing!
      </div>
    </div>
  );
};
