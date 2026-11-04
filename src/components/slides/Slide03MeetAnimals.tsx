import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ANIMALS } from '../../data/gameData';
import { playClick, stopAllAudio } from '../../utils/audio';
import {
  ArrowRight,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Square,
  MapPin,
  Check,
  Radio,
  Headphones,
} from 'lucide-react';

interface SlideProps {
  onNext: () => void;
}

export const Slide03MeetAnimals: React.FC<SlideProps> = ({ onNext }) => {
  // Audio state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeVoice, setActiveVoice] = useState<string | null>(null); // 'OVERVIEW' | 'KOMODO' | 'BEKANTAN' | 'CENDRAWASIH' | null
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Hidden audio element reference for HTML5 audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop and completely reset all audio & speech
  const stopAudio = useCallback(() => {
    // 1. Reset HTML5 Audio
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.loop = false; // Strictly enforce no looping
      } catch (err) {
        console.warn(err);
      }
    }

    // 2. Cancel Browser Speech Synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        console.warn(err);
      }
    }

    setIsPlaying(false);
    setIsPaused(false);
    setActiveVoice(null);
  }, []);

  // Pause current audio / speech
  const pauseAudio = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      try {
        audioRef.current.pause();
      } catch (err) {
        console.warn(err);
      }
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        try {
          window.speechSynthesis.pause();
        } catch (err) {
          console.warn(err);
        }
      }
    }

    setIsPlaying(false);
    setIsPaused(true);
  }, []);

  // Resume or start playing speech
  const speakText = useCallback(
    (trackId: string, textToSpeak: string) => {
      if (isMuted) return;

      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }

      // If already paused on the same track, resume it
      if (isPaused && activeVoice === trackId && window.speechSynthesis.paused) {
        try {
          window.speechSynthesis.resume();
          setIsPlaying(true);
          setIsPaused(false);
          return;
        } catch (err) {
          console.warn(err);
        }
      }

      // Otherwise cancel existing audio and start fresh
      stopAudio();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        setActiveVoice(trackId);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveVoice(null);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveVoice(null);
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn(err);
      }
    },
    [isMuted, isPaused, activeVoice, stopAudio]
  );

  // Full overview narration script for Grade IX English
  const overviewScript =
    'Welcome to the wildlife dossier! Meet our three target species in Indonesia. ' +
    'First is the Komodo, a large reptile with strong legs and a long tail, living on several islands in East Nusa Tenggara. ' +
    'Second is the Bekantan, a reddish-brown monkey with a long, distinctive nose from Borneo mangrove forests. ' +
    'Third is the Cendrawasih, a magnificent bird with colorful and distinctive feathers associated with Papua. ' +
    'Study their characteristics carefully before proceeding!';

  // Toggle main overview narration
  const handleToggleOverviewNarration = () => {
    playClick();

    if (isPlaying) {
      pauseAudio();
    } else {
      speakText('OVERVIEW', overviewScript);
    }
  };

  // Toggle individual card pronunciation/narration
  const handleToggleCardAudio = (name: string, characteristics: string[]) => {
    playClick();

    if (isPlaying && activeVoice === name) {
      pauseAudio();
    } else {
      const cardScript = `${name}. ${characteristics.join('. ')}.`;
      speakText(name, cardScript);
    }
  };

  // Toggle mute
  const handleToggleMute = () => {
    playClick();
    if (!isMuted) {
      stopAudio();
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // CRITICAL REQUIREMENT: Auto-stop when navigating away (unmount) and ensure loop = false
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = false; // Strictly enforce no infinite looping
    }

    return () => {
      // Auto-stop on leaving Slide 3
      stopAudio();
      stopAllAudio();
    };
  }, [stopAudio]);

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-3 sm:p-5 md:p-6 overflow-y-auto space-y-4 pb-12">
      {/* Hidden audio element ensuring loop is false and paused on navigation */}
      <audio ref={audioRef} preload="none" loop={false} />

      {/* Top Section */}
      <div className="relative z-10 text-center">
        <div className="text-xs sm:text-sm font-bold text-amber-300 font-mono tracking-wider uppercase mb-1">
          ANIMAL DOSSIER // CHAPTER: EXPLORING FAUNA OF INDONESIA
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl text-yellow-300 tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          WHO ARE WE GOING TO RESCUE?
        </h2>
        <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto mt-0.5">
          Study the three key wildlife species and their identifying characteristics carefully!
        </p>

        {/* ============================================================== */}
        {/* SLIDE 3 AUDIO CONTROL BAR (PLAY, PAUSE, STOP, MUTE)           */}
        {/* ============================================================== */}
        <div className="mt-3 max-w-3xl mx-auto bg-stone-950/90 border-2 border-amber-600/80 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur flex flex-wrap items-center justify-between gap-3">
          {/* Audio Status & Sound Wave Indicator */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-500/70 flex items-center justify-center text-amber-300 shrink-0">
              <Headphones className="w-5 h-5 text-amber-300" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-yellow-300 tracking-wide font-mono">
                  AUDIO NARRATION
                </span>
                {isPlaying && (
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-full" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_200ms] h-3/4" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_300ms] h-full" />
                    <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_150ms] h-1/2" />
                  </div>
                )}
              </div>
              <div className="text-[11px] text-stone-300 font-mono">
                {isMuted ? (
                  <span className="text-red-400">Audio Muted 🔇</span>
                ) : isPlaying ? (
                  <span className="text-emerald-400 font-semibold">
                    Playing: {activeVoice === 'OVERVIEW' ? 'Full Overview Narration' : `${activeVoice} Audio`} 🔊
                  </span>
                ) : isPaused ? (
                  <span className="text-amber-400 font-semibold">Audio Paused ⏸️ (Click Play to resume)</span>
                ) : (
                  <span className="text-stone-400">Audio Ready • Click Play for voiceover</span>
                )}
              </div>
            </div>
          </div>

          {/* Audio Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={handleToggleOverviewNarration}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer shadow-md ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 border border-amber-300'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400'
              }`}
              title={isPlaying ? 'Pause Audio Narration' : 'Play Audio Narration'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>PAUSE ⏸️</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY NARRATION 🔊</span>
                </>
              )}
            </button>

            {/* Stop & Reset Button */}
            <button
              type="button"
              onClick={() => {
                playClick();
                stopAudio();
              }}
              disabled={!isPlaying && !isPaused}
              className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border transition cursor-pointer ${
                isPlaying || isPaused
                  ? 'bg-stone-900 hover:bg-red-950/80 text-red-300 border-red-700/80'
                  : 'bg-stone-900/50 text-stone-600 border-stone-800 cursor-not-allowed opacity-50'
              }`}
              title="Stop and Reset Audio"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>STOP ⏹️</span>
            </button>

            {/* Mute Toggle */}
            <button
              type="button"
              onClick={handleToggleMute}
              className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
                isMuted
                  ? 'bg-red-950 text-red-400 border-red-700'
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
              }`}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3 Large Illustrated Animal Information Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto w-full my-auto items-stretch">
        {/* CARD 1 - KOMODO */}
        <div className={`group flex flex-col justify-between bg-stone-950/85 hover:bg-stone-900/95 border-3 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur transition-all duration-300 hover:-translate-y-1 ${
          activeVoice === 'KOMODO' && isPlaying
            ? 'border-yellow-400 ring-2 ring-yellow-400/50'
            : 'border-emerald-600'
        }`}>
          <div>
            {/* Header with image */}
            <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border-2 border-emerald-500/80 mb-3 bg-stone-900">
              <img
                src={ANIMALS.komodo.image}
                alt="Komodo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-emerald-950/90 text-emerald-200 border border-emerald-500 text-xs font-bold px-2.5 py-1 rounded-lg">
                CARD 1
              </div>

              {/* Per-card play/pause button */}
              <button
                type="button"
                onClick={() => handleToggleCardAudio(ANIMALS.komodo.name, ANIMALS.komodo.characteristics)}
                className={`absolute top-2 right-2 p-2 rounded-xl border transition cursor-pointer shadow-lg flex items-center gap-1 text-xs font-bold ${
                  activeVoice === 'KOMODO' && isPlaying
                    ? 'bg-amber-500 text-stone-950 border-amber-300 animate-pulse'
                    : 'bg-stone-950/85 hover:bg-emerald-600 text-white border-emerald-400'
                }`}
                title={activeVoice === 'KOMODO' && isPlaying ? 'Pause Komodo Audio' : 'Listen to Komodo'}
              >
                {activeVoice === 'KOMODO' && isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>LISTEN</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading text-2xl sm:text-3xl text-emerald-300 tracking-wide">
                KOMODO
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
                REPTILE
              </span>
            </div>

            {/* 4 Required Bullet Characteristics */}
            <ul className="space-y-2 text-stone-200 text-xs sm:text-sm font-medium">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>A large reptile.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Has strong legs.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Has a long tail.</span>
              </li>
              <li className="flex items-start gap-2 text-emerald-200">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Lives on several islands in East Nusa Tenggara.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/60 text-[11px] text-emerald-400/90 font-mono flex items-center justify-between">
            <span>STATUS: Endangered • Apex Predator</span>
            {activeVoice === 'KOMODO' && isPlaying && (
              <span className="text-yellow-300 animate-pulse font-bold">● SPEAKING</span>
            )}
          </div>
        </div>

        {/* CARD 2 - BEKANTAN */}
        <div className={`group flex flex-col justify-between bg-stone-950/85 hover:bg-stone-900/95 border-3 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur transition-all duration-300 hover:-translate-y-1 ${
          activeVoice === 'BEKANTAN' && isPlaying
            ? 'border-yellow-400 ring-2 ring-yellow-400/50'
            : 'border-orange-600'
        }`}>
          <div>
            {/* Header with image */}
            <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border-2 border-orange-500/80 mb-3 bg-stone-900">
              <img
                src={ANIMALS.bekantan.image}
                alt="Bekantan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-orange-950/90 text-orange-200 border border-orange-500 text-xs font-bold px-2.5 py-1 rounded-lg">
                CARD 2
              </div>

              {/* Per-card play/pause button */}
              <button
                type="button"
                onClick={() => handleToggleCardAudio(ANIMALS.bekantan.name, ANIMALS.bekantan.characteristics)}
                className={`absolute top-2 right-2 p-2 rounded-xl border transition cursor-pointer shadow-lg flex items-center gap-1 text-xs font-bold ${
                  activeVoice === 'BEKANTAN' && isPlaying
                    ? 'bg-amber-500 text-stone-950 border-amber-300 animate-pulse'
                    : 'bg-stone-950/85 hover:bg-orange-600 text-white border-orange-400'
                }`}
                title={activeVoice === 'BEKANTAN' && isPlaying ? 'Pause Bekantan Audio' : 'Listen to Bekantan'}
              >
                {activeVoice === 'BEKANTAN' && isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>LISTEN</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading text-2xl sm:text-3xl text-orange-300 tracking-wide">
                BEKANTAN
              </h3>
              <span className="text-[11px] font-mono text-orange-400 bg-orange-950 px-2 py-0.5 rounded border border-orange-700">
                MAMMAL
              </span>
            </div>

            {/* 4 Required Bullet Characteristics */}
            <ul className="space-y-2 text-stone-200 text-xs sm:text-sm font-medium">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>A reddish-brown monkey.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Has a long and big nose.</span>
              </li>
              <li className="flex items-start gap-2 text-orange-200">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Lives in Borneo.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Can be found in mangrove forests.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-orange-900/60 text-[11px] text-orange-400/90 font-mono flex items-center justify-between">
            <span>STATUS: Vulnerable • Endemic Primate</span>
            {activeVoice === 'BEKANTAN' && isPlaying && (
              <span className="text-yellow-300 animate-pulse font-bold">● SPEAKING</span>
            )}
          </div>
        </div>

        {/* CARD 3 - CENDRAWASIH */}
        <div className={`group flex flex-col justify-between bg-stone-950/85 hover:bg-stone-900/95 border-3 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur transition-all duration-300 hover:-translate-y-1 ${
          activeVoice === 'CENDRAWASIH' && isPlaying
            ? 'border-amber-400 ring-2 ring-yellow-400/50'
            : 'border-yellow-500'
        }`}>
          <div>
            {/* Header with image */}
            <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border-2 border-yellow-400/80 mb-3 bg-stone-900">
              <img
                src={ANIMALS.cendrawasih.image}
                alt="Cendrawasih"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-yellow-950/90 text-yellow-300 border border-yellow-500 text-xs font-bold px-2.5 py-1 rounded-lg">
                CARD 3
              </div>

              {/* Per-card play/pause button */}
              <button
                type="button"
                onClick={() => handleToggleCardAudio(ANIMALS.cendrawasih.name, ANIMALS.cendrawasih.characteristics)}
                className={`absolute top-2 right-2 p-2 rounded-xl border transition cursor-pointer shadow-lg flex items-center gap-1 text-xs font-bold ${
                  activeVoice === 'CENDRAWASIH' && isPlaying
                    ? 'bg-amber-500 text-stone-950 border-amber-300 animate-pulse'
                    : 'bg-stone-950/85 hover:bg-yellow-600 text-white border-yellow-400'
                }`}
                title={activeVoice === 'CENDRAWASIH' && isPlaying ? 'Pause Cendrawasih Audio' : 'Listen to Cendrawasih'}
              >
                {activeVoice === 'CENDRAWASIH' && isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>LISTEN</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading text-2xl sm:text-3xl text-yellow-300 tracking-wide">
                CENDRAWASIH
              </h3>
              <span className="text-[11px] font-mono text-yellow-400 bg-yellow-950 px-2 py-0.5 rounded border border-yellow-600">
                BIRD
              </span>
            </div>

            {/* 4 Required Bullet Characteristics */}
            <ul className="space-y-2 text-stone-200 text-xs sm:text-sm font-medium">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>A beautiful Indonesian bird.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Has colorful feathers.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Has distinctive feather patterns.</span>
              </li>
              <li className="flex items-start gap-2 text-yellow-200">
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <span>Associated with Papua.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-yellow-900/60 text-[11px] text-yellow-400/90 font-mono flex items-center justify-between">
            <span>STATUS: Protected • Bird of Paradise</span>
            {activeVoice === 'CENDRAWASIH' && isPlaying && (
              <span className="text-yellow-300 animate-pulse font-bold">● SPEAKING</span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation action */}
      <div className="relative z-10 flex justify-center mt-3 shrink-0 pb-4">
        <button
          type="button"
          onClick={() => {
            stopAudio();
            stopAllAudio();
            playClick();
            onNext();
          }}
          className="btn-game-orange px-8 sm:px-12 py-3 sm:py-3.5 rounded-2xl text-lg sm:text-xl font-bold text-white tracking-wider flex items-center gap-3 border-2 border-orange-300 cursor-pointer shadow-xl hover:scale-105 transition-transform"
        >
          <span>CONTINUE TO GAME RULES</span>
          <ArrowRight className="w-5 h-5 text-yellow-300" />
        </button>
      </div>
    </div>
  );
};
