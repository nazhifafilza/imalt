import React from 'react';
import { AnimalInfo } from '../data/gameData';

interface IndonesiaMapProps {
  activeAnimalId?: 'komodo' | 'bekantan' | 'cendrawasih' | null;
  onSelectAnimal?: (id: 'komodo' | 'bekantan' | 'cendrawasih') => void;
}

export const IndonesiaMap: React.FC<IndonesiaMapProps> = ({
  activeAnimalId,
  onSelectAnimal,
}) => {
  return (
    <div className="relative w-full h-full min-h-[180px] bg-emerald-950/70 rounded-xl border-2 border-emerald-700/60 p-3 overflow-hidden shadow-inner">
      {/* Grid lines for radar / military rescue effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#065f4625_1px,transparent_1px),linear-gradient(to_bottom,#065f4625_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Stylized SVG Map of Indonesian Archipelago */}
      <svg
        viewBox="0 0 800 360"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ocean waves subtle pattern */}
        <path d="M 50 40 Q 150 30 250 40 T 450 40 T 650 40" stroke="#047857" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
        <path d="M 100 320 Q 200 310 300 320 T 500 320 T 700 320" stroke="#047857" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

        {/* Sumatra */}
        <path
          d="M 80 80 L 140 130 L 190 200 L 220 240 L 200 255 L 160 220 L 110 150 L 60 90 Z"
          fill="#15803d"
          stroke="#4ade80"
          strokeWidth="1.5"
          className="hover:fill-emerald-600 transition-colors cursor-pointer"
        />

        {/* Java */}
        <path
          d="M 230 270 L 320 272 L 390 275 L 395 285 L 310 285 L 225 280 Z"
          fill="#15803d"
          stroke="#4ade80"
          strokeWidth="1.5"
        />

        {/* Kalimantan / Borneo (BEKANTAN REGION) */}
        <path
          d="M 280 120 L 370 110 L 410 160 L 390 230 L 320 235 L 270 190 L 260 140 Z"
          fill={activeAnimalId === 'bekantan' ? '#ea580c' : '#166534'}
          stroke={activeAnimalId === 'bekantan' ? '#fdba74' : '#4ade80'}
          strokeWidth={activeAnimalId === 'bekantan' ? '3' : '1.5'}
          className="transition-all duration-300 cursor-pointer hover:fill-amber-600"
          onClick={() => onSelectAnimal?.('bekantan')}
        />

        {/* Sulawesi */}
        <path
          d="M 430 160 L 450 140 L 480 145 L 455 180 L 490 210 L 470 240 L 440 220 L 445 190 Z"
          fill="#15803d"
          stroke="#4ade80"
          strokeWidth="1.5"
        />

        {/* Nusa Tenggara & Bali & Flores / Komodo Islands (KOMODO REGION) */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectAnimal?.('komodo')}
        >
          {/* Bali, Lombok, Sumbawa, Komodo, Flores, Timor */}
          <ellipse cx="410" cy="285" rx="8" ry="4" fill="#15803d" stroke="#4ade80" strokeWidth="1" />
          <ellipse cx="430" cy="286" rx="9" ry="4" fill="#15803d" stroke="#4ade80" strokeWidth="1" />
          <ellipse cx="455" cy="288" rx="14" ry="5" fill="#15803d" stroke="#4ade80" strokeWidth="1" />
          <ellipse
            cx="485"
            cy="289"
            rx="16"
            ry="6"
            fill={activeAnimalId === 'komodo' ? '#059669' : '#15803d'}
            stroke={activeAnimalId === 'komodo' ? '#34d399' : '#4ade80'}
            strokeWidth={activeAnimalId === 'komodo' ? '3' : '1.5'}
          />
          <ellipse cx="525" cy="290" rx="20" ry="7" fill={activeAnimalId === 'komodo' ? '#059669' : '#15803d'} stroke="#4ade80" strokeWidth="1.5" />
          <ellipse cx="560" cy="298" rx="16" ry="7" fill="#15803d" stroke="#4ade80" strokeWidth="1" />
        </g>

        {/* Maluku */}
        <path d="M 540 170 L 560 160 L 575 180 L 550 200 Z" fill="#15803d" stroke="#4ade80" strokeWidth="1" />
        <path d="M 550 220 L 575 225 L 565 245 Z" fill="#15803d" stroke="#4ade80" strokeWidth="1" />

        {/* Papua / New Guinea (CENDRAWASIH REGION) */}
        <path
          d="M 610 170 L 670 175 L 750 185 L 750 280 L 680 270 L 630 220 L 590 190 Z"
          fill={activeAnimalId === 'cendrawasih' ? '#eab308' : '#166534'}
          stroke={activeAnimalId === 'cendrawasih' ? '#fde047' : '#4ade80'}
          strokeWidth={activeAnimalId === 'cendrawasih' ? '3' : '1.5'}
          className="transition-all duration-300 cursor-pointer hover:fill-yellow-600"
          onClick={() => onSelectAnimal?.('cendrawasih')}
        />

        {/* Glowing Radar Rings & Pulsing Blips */}
        {/* Bekantan: Borneo Pin */}
        <g transform="translate(340, 170)" className="cursor-pointer" onClick={() => onSelectAnimal?.('bekantan')}>
          <circle cx="0" cy="0" r="16" className="animate-ping fill-orange-500/40" />
          <circle cx="0" cy="0" r="8" fill="#f97316" stroke="#fff" strokeWidth="2" />
        </g>

        {/* Komodo: NTT Pin */}
        <g transform="translate(490, 285)" className="cursor-pointer" onClick={() => onSelectAnimal?.('komodo')}>
          <circle cx="0" cy="0" r="16" className="animate-ping fill-emerald-500/40" />
          <circle cx="0" cy="0" r="8" fill="#10b981" stroke="#fff" strokeWidth="2" />
        </g>

        {/* Cendrawasih: Papua Pin */}
        <g transform="translate(680, 220)" className="cursor-pointer" onClick={() => onSelectAnimal?.('cendrawasih')}>
          <circle cx="0" cy="0" r="16" className="animate-ping fill-yellow-500/40" />
          <circle cx="0" cy="0" r="8" fill="#eab308" stroke="#fff" strokeWidth="2" />
        </g>
      </svg>

      {/* Floating Region Labels */}
      <div className="absolute top-2 left-3 bg-stone-900/80 backdrop-blur border border-emerald-600/50 rounded-lg px-2.5 py-1 text-xs text-emerald-300 font-mono flex items-center gap-1.5 shadow-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        LIVE SATELLITE RADAR: INDONESIA ARCHIPELAGO
      </div>

      <div className="absolute bottom-2 inset-x-3 flex justify-between items-center text-[11px] font-semibold text-stone-200">
        <button
          type="button"
          onClick={() => onSelectAnimal?.('bekantan')}
          className={`px-2 py-0.5 rounded transition border ${
            activeAnimalId === 'bekantan'
              ? 'bg-orange-600 text-white border-orange-300 ring-2 ring-orange-400'
              : 'bg-stone-900/80 hover:bg-orange-950/80 border-orange-500/40 text-orange-300'
          }`}
        >
          BORNEO: Bekantan
        </button>

        <button
          type="button"
          onClick={() => onSelectAnimal?.('komodo')}
          className={`px-2 py-0.5 rounded transition border ${
            activeAnimalId === 'komodo'
              ? 'bg-emerald-600 text-white border-emerald-300 ring-2 ring-emerald-400'
              : 'bg-stone-900/80 hover:bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
          }`}
        >
          EAST NUSA TENGGARA: Komodo
        </button>

        <button
          type="button"
          onClick={() => onSelectAnimal?.('cendrawasih')}
          className={`px-2 py-0.5 rounded transition border ${
            activeAnimalId === 'cendrawasih'
              ? 'bg-yellow-600 text-stone-950 border-yellow-300 ring-2 ring-yellow-400'
              : 'bg-stone-900/80 hover:bg-yellow-950/80 border-yellow-500/40 text-yellow-300'
          }`}
        >
          PAPUA: Cendrawasih
        </button>
      </div>
    </div>
  );
};
