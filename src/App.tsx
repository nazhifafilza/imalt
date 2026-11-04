/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { GAME_IMAGES } from './data/gameData';
import { StudentNameModal } from './components/StudentNameModal';
import { stopAllAudio, playClick, toggleSound, isSoundEnabled } from './utils/audio';
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Compass,
} from 'lucide-react';

// 12 Slides
import { Slide01Cover } from './components/slides/Slide01Cover';
import { Slide02Transmission } from './components/slides/Slide02Transmission';
import { Slide03MeetAnimals } from './components/slides/Slide03MeetAnimals';
import { Slide04Rules } from './components/slides/Slide04Rules';
import { Slide05Scanner } from './components/slides/Slide05Scanner';
import { Slide06ScannerReveal } from './components/slides/Slide06ScannerReveal';
import { Slide07Lab } from './components/slides/Slide07Lab';
import { Slide08Evidence } from './components/slides/Slide08Evidence';
import { Slide09CaseSolved } from './components/slides/Slide09CaseSolved';
import { Slide10ControlRoom } from './components/slides/Slide10ControlRoom';
import { Slide11Campaign } from './components/slides/Slide11Campaign';
import { Slide12Completed } from './components/slides/Slide12Completed';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Student name state & modal flag (triggered after slide 4)
  const [studentName, setStudentName] = useState<string>('Agent Rescuer');
  const [showNameModal, setShowNameModal] = useState<boolean>(false);

  // Completed levels tracking to prevent double-scoring
  const [completedLevels, setCompletedLevels] = useState<Record<number, boolean>>({});

  const totalSlides = 12;

  const handleAddScore = useCallback((points: number) => {
    setScore((prev) => Math.min(100, prev + points));
  }, []);

  // Auto-stop all speech and HTML5 audio whenever currentSlide changes
  useEffect(() => {
    stopAllAudio();
  }, [currentSlide]);

  const handleNext = useCallback(() => {
    stopAllAudio();
    if (currentSlide === 4) {
      setShowNameModal(true);
      return;
    }
    setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
  }, [currentSlide, totalSlides]);

  const handlePrev = useCallback(() => {
    stopAllAudio();
    setCurrentSlide((prev) => Math.max(1, prev - 1));
  }, []);

  const handleRestart = useCallback(() => {
    stopAllAudio();
    setCurrentSlide(1);
    setScore(0);
    setCompletedLevels({});
  }, []);

  const handleConfirmStudentName = (name: string) => {
    stopAllAudio();
    setStudentName(name);
    setShowNameModal(false);
    setCurrentSlide(5);
  };

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in inputs or textareas
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="h-screen w-screen bg-[#0d140e] text-stone-100 font-body select-none overflow-hidden p-1 sm:p-2 md:p-3 flex items-center justify-center">
      {/* Outer ambient jungle radial glow */}
      <div className="fixed inset-0 bg-radial from-emerald-950/40 via-stone-950/90 to-black pointer-events-none -z-10" />

      {/* Main Responsive Game Container (Takes 100% available viewport height/width) */}
      <div className="relative w-full max-w-[1440px] h-full rounded-2xl sm:rounded-3xl border-2 sm:border-4 md:border-6 border-amber-800 shadow-[0_15px_50px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden bg-stone-950">
        {/* Background Image: Lush Indonesian Tropical Rainforest */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none"
          style={{
            backgroundImage: `url(${GAME_IMAGES.jungleBg})`,
          }}
        >
          {/* Ambient Darkening Scrim for high legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/65 to-stone-950/90 backdrop-blur-[2px]" />
        </div>

        {/* Wooden corner decorative brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 sm:w-10 sm:h-10 border-t-4 border-l-4 border-amber-400 rounded-tl-xl sm:rounded-tl-2xl z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-6 h-6 sm:w-10 sm:h-10 border-t-4 border-r-4 border-amber-400 rounded-tr-xl sm:rounded-tr-2xl z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-10 sm:h-10 border-b-4 border-l-4 border-amber-400 rounded-bl-xl sm:rounded-bl-2xl z-20 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-10 sm:h-10 border-b-4 border-r-4 border-amber-400 rounded-br-xl sm:rounded-br-2xl z-20 pointer-events-none" />

        {/* ============================================================== */}
        {/* ULTRA-COMPACT FLOATING GAME HUD (NON-INTRUSIVE OVERLAY)        */}
        {/* Does NOT take vertical layout height, leaves 100% focus on main*/}
        {/* ============================================================== */}
        <aside
          aria-label="Mission Controls"
          className="absolute top-2 right-2 sm:top-3 sm:right-4 z-40 flex items-center gap-1.5 sm:gap-2 bg-stone-950/85 border border-amber-600/70 backdrop-blur-md rounded-full px-2 sm:px-3 py-1 shadow-xl text-stone-200"
        >
          {/* Back button (when slide > 1) */}
          {currentSlide > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-amber-300 hover:text-white px-1.5 py-0.5 rounded-lg hover:bg-stone-800 transition cursor-pointer"
              title="Go to previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">BACK</span>
            </button>
          )}

          {/* Current Frame Chip */}
          <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 bg-stone-900/90 border border-amber-700/60 px-2 py-0.5 rounded-full">
            {currentSlide}/{totalSlides}
          </span>

          {/* Score Display Chip */}
          <div className="flex items-center gap-1 bg-amber-950/70 border border-amber-500/60 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-yellow-300">
            <span className="hidden md:inline text-[9px] text-amber-300/80 font-mono">PTS:</span>
            <span className="font-mono text-emerald-400 font-extrabold">{score}</span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-1 rounded-full text-stone-300 hover:text-amber-300 hover:bg-stone-800 transition cursor-pointer"
            title={soundOn ? 'Mute Sound' : 'Unmute Sound'}
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            )}
          </button>

          {/* Fullscreen Toggle (Desktop/Tablet) */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="p-1 rounded-full text-stone-300 hover:text-amber-300 hover:bg-stone-800 transition cursor-pointer hidden sm:block"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </aside>

        {/* ============================================================== */}
        {/* MAIN SLIDE RENDERER (MAXIMIZED VIEWPORT PRESENCE)              */}
        {/* ============================================================== */}
        <main className="relative z-10 w-full h-full flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
          {currentSlide === 1 && <Slide01Cover onNext={handleNext} />}
          {currentSlide === 2 && <Slide02Transmission onNext={handleNext} />}
          {currentSlide === 3 && <Slide03MeetAnimals onNext={handleNext} />}
          {currentSlide === 4 && (
            <Slide04Rules onNext={() => setShowNameModal(true)} />
          )}
          {currentSlide === 5 && (
            <Slide05Scanner
              onNext={handleNext}
              onAddScore={(pts) => {
                if (!completedLevels[1]) {
                  setCompletedLevels((prev) => ({ ...prev, 1: true }));
                  handleAddScore(pts);
                }
              }}
            />
          )}
          {currentSlide === 6 && <Slide06ScannerReveal onNext={handleNext} />}
          {currentSlide === 7 && (
            <Slide07Lab
              onNext={handleNext}
              onAddScore={(pts) => {
                if (!completedLevels[2]) {
                  setCompletedLevels((prev) => ({ ...prev, 2: true }));
                  handleAddScore(pts);
                }
              }}
            />
          )}
          {currentSlide === 8 && (
            <Slide08Evidence
              onNext={handleNext}
              onAddScore={(pts) => {
                if (!completedLevels[3]) {
                  setCompletedLevels((prev) => ({ ...prev, 3: true }));
                  handleAddScore(pts);
                }
              }}
            />
          )}
          {currentSlide === 9 && <Slide09CaseSolved onNext={handleNext} />}
          {currentSlide === 10 && (
            <Slide10ControlRoom
              onNext={handleNext}
              onAddScore={(pts) => {
                if (!completedLevels[4]) {
                  setCompletedLevels((prev) => ({ ...prev, 4: true }));
                  handleAddScore(pts);
                }
              }}
            />
          )}
          {currentSlide === 11 && (
            <Slide11Campaign
              onNext={handleNext}
              onAddScore={(pts) => {
                if (!completedLevels[5]) {
                  setCompletedLevels((prev) => ({ ...prev, 5: true }));
                  handleAddScore(pts);
                }
              }}
            />
          )}
          {currentSlide === 12 && (
            <Slide12Completed
              studentName={studentName}
              score={score}
              onRestart={handleRestart}
            />
          )}
        </main>
      </div>

      {/* Student Name Input Modal (Popped up after Slide 4, before Slide 5) */}
      <StudentNameModal
        isOpen={showNameModal}
        initialName={studentName === 'Agent Rescuer' ? '' : studentName}
        onConfirm={handleConfirmStudentName}
      />
    </div>
  );
}
