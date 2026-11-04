import React, { useState, useEffect, useRef } from 'react';
import { playClick, playSuccess } from '../utils/audio';
import { Compass, ShieldCheck, User, Sparkles, ArrowRight } from 'lucide-react';

interface StudentNameModalProps {
  isOpen: boolean;
  initialName: string;
  onConfirm: (name: string) => void;
}

export const StudentNameModal: React.FC<StudentNameModalProps> = ({
  isOpen,
  initialName,
  onConfirm,
}) => {
  const [name, setName] = useState(initialName || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = name.trim() || 'Agent Rescuer';
    playSuccess();
    onConfirm(finalName);
  };

  const presetNames = ['Bima Sakti', 'Nabila Putri', 'Arkan Pratama', 'Zahra Amelia'];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="relative max-w-lg w-full bg-gradient-to-b from-stone-900 via-stone-950 to-amber-950 text-stone-100 border-4 border-amber-600 rounded-3xl p-6 sm:p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden">
        {/* Decorative corner nails */}
        <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-amber-400 border border-amber-700" />
        <div className="absolute top-2 right-3 w-3 h-3 rounded-full bg-amber-400 border border-amber-700" />
        <div className="absolute bottom-2 left-3 w-3 h-3 rounded-full bg-amber-400 border border-amber-700" />
        <div className="absolute bottom-2 right-3 w-3 h-3 rounded-full bg-amber-400 border border-amber-700" />

        {/* Hero badge header */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 border-2 border-yellow-300 shadow-xl flex items-center justify-center">
            <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-stone-950 animate-spin" style={{ animationDuration: '16s' }} />
          </div>
        </div>

        <div className="text-[11px] sm:text-xs font-mono font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          TASK FORCE REGISTRATION • GRADE IX ENGLISH
        </div>

        <h3 className="font-heading text-2xl sm:text-4xl text-yellow-300 tracking-wide mb-1">
          ENTER YOUR FULL NAME / NAMA SISWA
        </h3>

        <p className="text-xs sm:text-sm text-stone-300 max-w-sm mx-auto mb-5">
          Your name will be registered on the official Classroom Leaderboard & Wildlife Defender Certificate!
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Nazhifa Filza..."
              maxLength={30}
              className="w-full bg-stone-900 border-2 border-amber-500/80 focus:border-emerald-400 text-stone-100 font-heading text-xl sm:text-2xl text-center placeholder:text-stone-500 rounded-2xl py-3 pl-12 pr-4 outline-none shadow-inner tracking-wide uppercase transition"
            />
          </div>

          {/* Quick preset suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
            <span className="text-stone-400 font-mono">Quick Pick:</span>
            {presetNames.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  playClick();
                  setName(preset);
                }}
                className="px-2 py-0.5 rounded-lg bg-stone-900/90 hover:bg-amber-900/60 border border-stone-700 text-amber-200 transition cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="btn-game-green w-full py-3.5 sm:py-4 rounded-2xl text-lg sm:text-xl font-extrabold text-white tracking-wider border-2 border-emerald-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-xl mt-2"
          >
            <span>START RESCUE MISSIONS</span>
            <ArrowRight className="w-5 h-5 text-yellow-300" />
          </button>
        </form>
      </div>
    </div>
  );
};
