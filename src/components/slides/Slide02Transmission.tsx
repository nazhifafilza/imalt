import React, { useState, useEffect } from 'react';
import { IndonesiaMap } from '../IndonesiaMap';
import { playClick, stopAllAudio } from '../../utils/audio';
import { Radio, AlertTriangle, CheckCircle2, Volume2, Pause, Shield } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
}

export const Slide02Transmission: React.FC<SlideProps> = ({ onNext }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<'komodo' | 'bekantan' | 'cendrawasih' | null>('komodo');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  const toggleSpeakTransmission = () => {
    playClick();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      "Hello, Wildlife Rescuers! Three Indonesian animals need our attention. We need your help to identify them, investigate their characteristics, and create a protection campaign. Are you ready to join our mission?"
    );
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 pb-10">
      {/* Top Emergency Siren & Warning Header */}
      <div className="relative z-10 flex items-center justify-between bg-stone-950/80 border-2 border-red-600/80 rounded-2xl p-3 sm:p-4 backdrop-blur shadow-[0_0_20px_rgba(220,38,38,0.3)]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-red-600/30 border-2 border-red-500 rounded-xl text-red-400">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          </div>
          <div>
            <div className="text-[11px] sm:text-xs text-red-400 font-mono tracking-wider">
              PRIORITY TRANSMISSION // RESCUE HQ FREQ: 142.80 MHZ
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl text-white tracking-wide">
              EMERGENCY ALERT!
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleSpeakTransmission}
          className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-300 border border-amber-500/50 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all"
        >
          {isSpeaking ? (
            <>
              <Pause className="w-4 h-4 text-green-400 fill-current animate-pulse" />
              <span>Pause Audio ⏸️</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Read Aloud 🔊</span>
            </>
          )}
        </button>
      </div>

      {/* Main Center Console: Split Screen */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 my-auto items-stretch">
        {/* Left: Radio Terminal Message Screen */}
        <div className="md:col-span-6 flex flex-col justify-between bg-stone-950/90 border-2 border-amber-600/70 rounded-2xl p-4 sm:p-6 shadow-2xl relative">
          <div className="absolute top-2 right-3 flex items-center gap-2 text-[10px] text-amber-400 font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            INCOMING SIGNAL
          </div>

          <div>
            <div className="text-amber-500 font-mono text-xs tracking-wider mb-2">
              DISPATCH TO: GRADE IX WILDLIFE TASK FORCE
            </div>
            
            <div className="space-y-3 font-body text-stone-100 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-amber-200 text-base sm:text-lg">
                &quot;Hello, Wildlife Rescuers!
              </p>
              <p>
                Three Indonesian animals need our attention.
              </p>
              <p className="text-stone-300">
                We need your help to <span className="text-emerald-400 font-bold underline decoration-emerald-500 underline-offset-4">identify them</span>, <span className="text-orange-400 font-bold underline decoration-orange-500 underline-offset-4">investigate their characteristics</span>, and <span className="text-yellow-400 font-bold underline decoration-yellow-500 underline-offset-4">create a protection campaign</span>.
              </p>
              <p className="font-bold text-yellow-300 text-base sm:text-lg pt-1">
                Are you ready to join our mission?&quot;
              </p>
            </div>
          </div>

          {/* Rescue Task summary tags */}
          <div className="mt-4 pt-3 border-t border-stone-800 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-stone-300">
            <div className="bg-emerald-950/60 border border-emerald-700/60 p-2 rounded-lg">
              <span className="text-emerald-400 block font-bold">TASK 1</span>
              Identify Species
            </div>
            <div className="bg-amber-950/60 border border-amber-700/60 p-2 rounded-lg">
              <span className="text-amber-400 block font-bold">TASK 2</span>
              Investigate Clues
            </div>
            <div className="bg-orange-950/60 border border-orange-700/60 p-2 rounded-lg">
              <span className="text-orange-400 block font-bold">TASK 3</span>
              Launch Campaign
            </div>
          </div>
        </div>

        {/* Right: Digital Map of Indonesia with live radar blips */}
        <div className="md:col-span-6 flex flex-col justify-between bg-stone-950/90 border-2 border-emerald-600/70 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              TERRITORIAL RESCUE RADAR
            </span>
            <span className="text-[11px] text-stone-400">Tap regions to investigate</span>
          </div>

          <div className="h-56 sm:h-64">
            <IndonesiaMap
              activeAnimalId={selectedAnimal}
              onSelectAnimal={(id) => {
                playClick();
                setSelectedAnimal(id);
              }}
            />
          </div>

          {/* Region details preview */}
          <div className="mt-2 p-2.5 bg-stone-900/90 rounded-xl border border-stone-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-300">Target Region:</span>
              <span className="text-stone-200">
                {selectedAnimal === 'komodo' && 'East Nusa Tenggara (Komodo Dragon Sanctuary)'}
                {selectedAnimal === 'bekantan' && 'Borneo Mangrove Forests (Bekantan Habitat)'}
                {selectedAnimal === 'cendrawasih' && 'Papua Canopy Rainforest (Cendrawasih Paradise)'}
              </span>
            </div>
            <span className="text-[10px] bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded font-mono">
              STATUS: URGENT
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Mission Acceptance Button */}
      <div className="relative z-10 flex justify-center mt-3 shrink-0 pb-4">
        <button
          type="button"
          onClick={() => {
            playClick();
            onNext();
          }}
          className="btn-game-green px-10 sm:px-14 py-3.5 sm:py-4 rounded-2xl text-xl sm:text-2xl font-extrabold text-white tracking-wider flex items-center gap-3 border-2 border-emerald-300 cursor-pointer"
        >
          <CheckCircle2 className="w-6 h-6 text-yellow-300" />
          ACCEPT MISSION
        </button>
      </div>
    </div>
  );
};
