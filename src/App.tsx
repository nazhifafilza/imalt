/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { GAME_IMAGES } from './data/gameData';
import { TopBar, BottomBar } from './components/Navigation';
import { StudentNameModal } from './components/StudentNameModal';
import { stopAllAudio } from './utils/audio';

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

  const handleSelectSlide = useCallback((slideNumber: number) => {
    stopAllAudio();
    setCurrentSlide(slideNumber);
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
    <div className="flex flex-col h-screen w-screen bg-[#0d140e] text-stone-100 font-body select-none overflow-hidden">
      {/* Sticky Top Bar with score & audio */}
      <TopBar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        score={score}
      />

      {/* Main Game Stage Area with Scrollable Viewport */}
      <main className="flex-1 w-full overflow-y-auto p-2 sm:p-4 md:p-6 flex flex-col items-center justify-start relative">
        {/* Outer ambient jungle glow */}
        <div className="fixed inset-0 bg-radial from-emerald-950/40 via-stone-950/90 to-black pointer-events-none -z-10" />

        {/* 16:9 Aspect Ratio Game Container with Fluid Expansion & Scrollability */}
        <div className="relative w-full max-w-[1440px] min-h-[640px] md:min-h-[720px] rounded-2xl sm:rounded-3xl border-4 sm:border-6 border-amber-800 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between my-auto overflow-hidden bg-stone-950">
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
          <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-t-4 border-l-4 border-amber-400 rounded-tl-2xl z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-t-4 border-r-4 border-amber-400 rounded-tr-2xl z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-b-4 border-l-4 border-amber-400 rounded-bl-2xl z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-b-4 border-r-4 border-amber-400 rounded-br-2xl z-20 pointer-events-none" />

          {/* Slide Renderer: Allows internal scrolling for smaller devices */}
          <div className="relative z-10 w-full h-full flex-1 flex flex-col overflow-y-auto">
            {currentSlide === 1 && <Slide01Cover onNext={handleNext} />}
            {currentSlide === 2 && <Slide02Transmission onNext={handleNext} />}
            {currentSlide === 3 && <Slide03MeetAnimals onNext={handleNext} />}
            {currentSlide === 4 && (
              <Slide04Rules
                onNext={() => setShowNameModal(true)}
              />
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
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar for slide jumping & navigation */}
      <BottomBar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        score={score}
        onSelectSlide={handleSelectSlide}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* Student Name Input Modal (Popped up after Slide 4, before Slide 5) */}
      <StudentNameModal
        isOpen={showNameModal}
        initialName={studentName === 'Agent Rescuer' ? '' : studentName}
        onConfirm={handleConfirmStudentName}
      />
    </div>
  );
}
