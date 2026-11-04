import React, { useState } from 'react';
import { playClick, toggleSound, isSoundEnabled, stopAllAudio } from '../utils/audio';
import { Volume2, VolumeX, Maximize2, Minimize2, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

interface NavigationProps {
  currentSlide: number; // 1 to 12
  totalSlides: number;
  score: number;
  onSelectSlide: (slideNumber: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const SLIDE_TITLES = [
  '1. Game Cover',
  '2. Emergency Alert',
  '3. Meet Animals',
  '4. Game Rules',
  '5. L1: Scanner',
  '6. L1: Revealed',
  '7. L2: Lab Match',
  '8. L3: Mystery',
  '9. L3: Solved',
  '10. L4: Control',
  '11. L5: Campaign',
  '12. Completed',
];

export const TopBar: React.FC<Pick<NavigationProps, 'currentSlide' | 'totalSlides' | 'score'>> = ({
  currentSlide,
  totalSlides,
  score,
}) => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playClick();
    } else {
      stopAllAudio();
    }
  };

  const handleToggleFullscreen = () => {
    playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-0 w-full bg-stone-950/95 border-b-2 border-amber-700/80 px-3 sm:px-6 py-2.5 flex items-center justify-between text-stone-100 z-40 backdrop-blur shadow-md select-none shrink-0">
      {/* Brand / Game Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center border border-yellow-300 shadow-sm shrink-0">
          <Compass className="w-5 h-5 text-stone-950" />
        </div>
        <div>
          <div className="font-heading text-lg sm:text-xl text-yellow-300 tracking-wider leading-none">
            ANIMAL RESCUE MISSION
          </div>
          <div className="text-[10px] text-amber-200/80 font-mono hidden sm:block">
            FAUNA OF INDONESIA • GRADE IX ENGLISH
          </div>
        </div>
      </div>

      {/* Center: Slide indicator */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono font-bold bg-stone-900 border border-amber-600/70 px-3 py-1 rounded-full text-amber-300 shadow-inner">
          FRAME {currentSlide} / {totalSlides}
        </span>
      </div>

      {/* Right: Score + Audio + Fullscreen */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Rescue Points Display */}
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-950 to-stone-900 border border-amber-500/80 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-yellow-300 shadow">
          <span className="hidden sm:inline">POINTS:</span>
          <span className="font-mono text-emerald-400 font-extrabold">{score}</span>
          <span className="text-stone-400 text-xs">/ 100</span>
        </div>

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={handleToggleSound}
          className="p-1.5 sm:p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-700 transition cursor-pointer"
          title={soundOn ? 'Mute SFX' : 'Unmute SFX'}
        >
          {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={handleToggleFullscreen}
          className="p-1.5 sm:p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-700 transition cursor-pointer hidden sm:block"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};

export const BottomBar: React.FC<NavigationProps> = ({
  currentSlide,
  totalSlides,
  onSelectSlide,
  onPrev,
  onNext,
}) => {
  return (
    <footer className="sticky bottom-0 w-full bg-stone-950/95 border-t-2 border-amber-800/80 px-3 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 z-40 select-none shadow-2xl backdrop-blur shrink-0">
      {/* Navigation Step buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentSlide <= 1}
          onClick={() => {
            playClick();
            onPrev();
          }}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
            currentSlide <= 1
              ? 'opacity-40 border-stone-800 text-stone-600 cursor-not-allowed'
              : 'bg-stone-900 hover:bg-stone-800 border-amber-700 text-amber-200'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>PREV</span>
        </button>

        <button
          type="button"
          disabled={currentSlide >= totalSlides}
          onClick={() => {
            playClick();
            onNext();
          }}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
            currentSlide >= totalSlides
              ? 'opacity-40 border-stone-800 text-stone-600 cursor-not-allowed'
              : 'bg-emerald-800 hover:bg-emerald-700 border-emerald-500 text-white'
          }`}
        >
          <span>NEXT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 12 Frame Selector Chips (Quick jump for teachers & students) */}
      <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1 scrollbar-none">
        {SLIDE_TITLES.map((title, idx) => {
          const slideNum = idx + 1;
          const isActive = currentSlide === slideNum;
          return (
            <button
              key={slideNum}
              type="button"
              onClick={() => {
                playClick();
                onSelectSlide(slideNum);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold whitespace-nowrap transition cursor-pointer border ${
                isActive
                  ? 'bg-amber-500 text-stone-950 border-amber-300 shadow scale-105'
                  : 'bg-stone-900/90 text-stone-400 border-stone-800 hover:text-stone-200 hover:border-amber-700'
              }`}
              title={title}
            >
              {slideNum}
            </button>
          );
        })}
      </div>

      {/* Quick Microteaching hint */}
      <div className="hidden lg:flex items-center gap-2 text-[11px] text-stone-400 font-mono">
        <span>Use ◄ / ► arrow keys • Scroll down if needed</span>
      </div>
    </footer>
  );
};
