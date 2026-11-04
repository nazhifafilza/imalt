import React from 'react';
import { ANIMALS } from '../../data/gameData';
import { playClick } from '../../utils/audio';
import { Compass, Sparkles, MapPin, ShieldCheck } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
}

export const Slide01Cover: React.FC<SlideProps> = ({ onNext }) => {
  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 text-center overflow-y-auto space-y-4 sm:space-y-6 pb-10">
      {/* Decorative top banners & wooden signs */}
      <div className="relative z-10 flex flex-col items-center mt-1 animate-fade-in">
        {/* Curated school & subject pill-free banner */}
        <div className="flex items-center gap-3 text-amber-200/90 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1 drop-shadow">
          <span>ENGLISH</span>
          <span className="text-amber-400 font-bold">•</span>
          <span>GRADE IX JUNIOR HIGH SCHOOL</span>
          <span className="text-amber-400 font-bold">•</span>
          <span className="text-emerald-300">CHAPTER: EXPLORING FAUNA OF INDONESIA</span>
        </div>

        {/* 3D Adventure Title Signboard */}
        <div className="relative max-w-4xl mx-auto px-8 py-3 bg-gradient-to-b from-stone-900/90 via-stone-950/95 to-amber-950/90 border-4 border-amber-600 rounded-3xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* Wood nail bolts */}
          <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-amber-400 shadow-inner border border-amber-700" />
          <div className="absolute top-2 right-3 w-3 h-3 rounded-full bg-amber-400 shadow-inner border border-amber-700" />
          <div className="absolute bottom-2 left-3 w-3 h-3 rounded-full bg-amber-400 shadow-inner border border-amber-700" />
          <div className="absolute bottom-2 right-3 w-3 h-3 rounded-full bg-amber-400 shadow-inner border border-amber-700" />

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-amber-400 to-orange-500 drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)]">
            ANIMAL RESCUE MISSION
          </h1>
          <p className="font-body text-xl sm:text-2xl md:text-3xl font-bold text-amber-100 drop-shadow flex items-center justify-center gap-2 mt-1">
            <Sparkles className="w-6 h-6 text-yellow-300 inline animate-spin" style={{ animationDuration: '6s' }} />
            Save Indonesian Wildlife!
            <Sparkles className="w-6 h-6 text-yellow-300 inline animate-spin" style={{ animationDuration: '6s' }} />
          </p>
        </div>
      </div>

      {/* The 3 Main Animals in Hero Showcase */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 my-auto items-stretch">
        {/* Komodo */}
        <div className="group relative flex flex-row sm:flex-col items-center sm:text-center bg-stone-950/70 hover:bg-stone-900/80 p-2.5 sm:p-3 rounded-2xl border-2 border-emerald-600/80 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 gap-3">
          <div className="relative w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0">
            <img
              src={ANIMALS.komodo.image}
              alt="Komodo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-emerald-900/90 text-emerald-200 text-[9px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded border border-emerald-500">
              REPTILE
            </div>
          </div>
          <div className="text-left sm:text-center">
            <h3 className="font-heading text-lg sm:text-2xl md:text-3xl text-emerald-300 sm:mt-2 tracking-wide">
              KOMODO
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
              East Nusa Tenggara
            </p>
          </div>
        </div>

        {/* Bekantan */}
        <div className="group relative flex flex-row sm:flex-col items-center sm:text-center bg-stone-950/70 hover:bg-stone-900/80 p-2.5 sm:p-3 rounded-2xl border-2 border-orange-600/80 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 gap-3">
          <div className="relative w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-xl overflow-hidden border-2 border-orange-500 shadow-md shrink-0">
            <img
              src={ANIMALS.bekantan.image}
              alt="Bekantan"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-orange-900/90 text-orange-200 text-[9px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded border border-orange-500">
              MAMMAL
            </div>
          </div>
          <div className="text-left sm:text-center">
            <h3 className="font-heading text-lg sm:text-2xl md:text-3xl text-orange-300 sm:mt-2 tracking-wide">
              BEKANTAN
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
              Borneo (Mangroves)
            </p>
          </div>
        </div>

        {/* Cendrawasih */}
        <div className="group relative flex flex-row sm:flex-col items-center sm:text-center bg-stone-950/70 hover:bg-stone-900/80 p-2.5 sm:p-3 rounded-2xl border-2 border-yellow-500/80 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 gap-3">
          <div className="relative w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-xl overflow-hidden border-2 border-yellow-400 shadow-md shrink-0">
            <img
              src={ANIMALS.cendrawasih.image}
              alt="Cendrawasih"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-yellow-950/90 text-yellow-300 text-[9px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded border border-yellow-500">
              BIRD
            </div>
          </div>
          <div className="text-left sm:text-center">
            <h3 className="font-heading text-lg sm:text-2xl md:text-3xl text-yellow-300 sm:mt-2 tracking-wide">
              CENDRAWASIH
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-300 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-yellow-400 shrink-0" />
              Papua (Tropical Forest)
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="relative z-10 my-2 sm:my-4 flex flex-col items-center gap-2 shrink-0 pb-4">
        <button
          type="button"
          onClick={() => {
            playClick();
            onNext();
          }}
          className="btn-game-green px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl text-xl sm:text-2xl font-extrabold text-white tracking-wider flex items-center gap-3 border-2 border-emerald-300 cursor-pointer"
        >
          <Compass className="w-7 h-7 text-yellow-300 animate-spin" style={{ animationDuration: '10s' }} />
          START MISSION
        </button>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300 font-medium bg-black/60 px-4 py-1 rounded-full border border-stone-700">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          5 Interactive Missions • 100 Rescue Points to Collect
        </div>
      </div>
    </div>
  );
};
