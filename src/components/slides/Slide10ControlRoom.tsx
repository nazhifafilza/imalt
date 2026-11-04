import React, { useState } from 'react';
import { ANIMALS } from '../../data/gameData';
import { playClick, playSuccess, playVictory } from '../../utils/audio';
import {
  Sparkles,
  Send,
  Bookmark,
  Stamp,
  GripHorizontal,
  Layers,
  HelpCircle,
  Image as ImageIcon,
  Check,
  RotateCcw,
} from 'lucide-react';

interface SlideProps {
  onNext: () => void;
  onAddScore: (points: number) => void;
}

export const Slide10ControlRoom: React.FC<SlideProps> = ({
  onNext,
  onAddScore,
}) => {
  // Field values - initially EMPTY as specified
  const [selectedAnimalId, setSelectedAnimalId] = useState<'komodo' | 'bekantan' | 'cendrawasih' | null>(null);
  const [animalName, setAnimalName] = useState<string>('');
  const [characteristic, setCharacteristic] = useState<string>('');
  const [habitat, setHabitat] = useState<string>('');
  const [slogan, setSlogan] = useState<string>('');
  const [selectedStamp, setSelectedStamp] = useState('WILDLIFE GUARDIAN');

  // Drag over states for individual drop zones
  const [activeDropZone, setActiveDropZone] = useState<string | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Preset options for the 4 steps
  const characteristicOptions = [
    'Has colorful feathers',
    'Has long nose & big body',
    'Has strong legs & sharp claws',
  ];

  const habitatOptions = [
    'Associated with Papua Canopy',
    'Borneo Mangrove Forests',
    'East Nusa Tenggara Savanna',
  ];

  const sloganOptions = [
    "Protect Indonesia's rare birds of paradise!",
    'Stop deforestation in Borneo mangroves!',
    'Preserve the wild dragon sanctuary!',
    'Save endangered Indonesian wildlife now!',
  ];

  // Helper to apply animal
  const selectAnimal = (id: 'komodo' | 'bekantan' | 'cendrawasih', audio = true) => {
    if (audio) playClick();
    setSelectedAnimalId(id);
    setAnimalName(ANIMALS[id].name);
  };

  // Helper to apply characteristic
  const selectCharacteristic = (text: string, audio = true) => {
    if (audio) playClick();
    setCharacteristic(text);
  };

  // Helper to apply habitat
  const selectHabitat = (text: string, audio = true) => {
    if (audio) playClick();
    setHabitat(text);
  };

  // Helper to apply slogan
  const selectSlogan = (text: string, audio = true) => {
    if (audio) playClick();
    setSlogan(text);
  };

  // Generic Drag Start Handler
  const handleDragStart = (e: React.DragEvent, type: 'animal' | 'characteristic' | 'habitat' | 'slogan', value: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type, value }));
    e.dataTransfer.effectAllowed = 'copyMove';
  };

  // Generic Drop Zone Handler
  const handleDropOnZone = (e: React.DragEvent, targetZone: 'animal' | 'characteristic' | 'habitat' | 'slogan' | 'any') => {
    e.preventDefault();
    setActiveDropZone(null);
    setIsCardHovered(false);

    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const data = JSON.parse(dataStr);

      if (data.type === 'animal') {
        playSuccess();
        selectAnimal(data.value as 'komodo' | 'bekantan' | 'cendrawasih', false);
      } else if (data.type === 'characteristic') {
        playSuccess();
        selectCharacteristic(data.value, false);
      } else if (data.type === 'habitat') {
        playSuccess();
        selectHabitat(data.value, false);
      } else if (data.type === 'slogan') {
        playSuccess();
        selectSlogan(data.value, false);
      }
    } catch (err) {
      console.warn('Drop parsing error', err);
    }
  };

  const handleResetCard = () => {
    playClick();
    setSelectedAnimalId(null);
    setAnimalName('');
    setCharacteristic('');
    setHabitat('');
    setSlogan('');
  };

  const handleSubmit = () => {
    playVictory();
    onAddScore(30);
    setTimeout(() => {
      onNext();
    }, 800);
  };

  const currentAnimal = selectedAnimalId ? ANIMALS[selectedAnimalId] : null;

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-3 sm:p-5 md:p-6 overflow-y-auto space-y-4 pb-12">
      {/* Top Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 bg-stone-950/85 border-2 border-amber-600/80 rounded-2xl p-3 backdrop-blur shadow-lg">
        <div>
          <div className="text-xs sm:text-sm font-bold text-amber-400 font-mono tracking-wider uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400 animate-pulse" />
            LEVEL 4 – CREATING • CAMPAIGN CARD BUILDER
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl text-yellow-300 tracking-wide">
            BUILD YOUR CAMPAIGN POSTER
          </h2>
        </div>

        <div className="bg-amber-950/70 border border-amber-500/60 text-amber-200 text-xs sm:text-sm px-4 py-1.5 rounded-xl text-center sm:text-right font-medium">
          &quot;Drag or click items from the 4 steps on the right into the campaign card on the left!&quot;
        </div>
      </div>

      {/* Main 2-Column Split: Kolom Kiri (Drop Zone) & Kolom Kanan (4 Draggable Steps) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-6xl mx-auto w-full my-auto items-stretch">

        {/* ============================================================== */}
        {/* KOLOM KIRI: YOUR CAMPAIGN CARD (DROP ZONE)                    */}
        {/* ============================================================== */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsCardHovered(true);
          }}
          onDragLeave={() => setIsCardHovered(false)}
          onDrop={(e) => handleDropOnZone(e, 'any')}
          className={`lg:col-span-6 flex flex-col justify-between bg-amber-50 text-stone-900 border-4 rounded-3xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative transition-all duration-300 ${
            isCardHovered ? 'border-emerald-500 ring-4 ring-emerald-400 bg-amber-100' : 'border-amber-600'
          }`}
        >
          {/* Background Ambient Glow */}
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-yellow-400/25 rounded-full blur-xl pointer-events-none" />

          <div>
            {/* Header: Title + Reset + Badge Stamp */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-amber-800/40 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-700" />
                <h3 className="font-heading text-xl sm:text-2xl text-amber-950 tracking-wider">
                  YOUR CAMPAIGN CARD
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetCard}
                  className="p-1 px-2 text-[10px] bg-stone-900/10 hover:bg-stone-900/20 text-stone-700 rounded-lg flex items-center gap-1 transition"
                  title="Clear all fields"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>

                <div className="flex items-center gap-1.5 border border-amber-800 text-amber-900 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-200/70 shadow-sm">
                  <Stamp className="w-3.5 h-3.5 text-amber-800" />
                  {selectedStamp}
                </div>
              </div>
            </div>

            {/* Poster Body: Image Drop Zone & 4 Text Drop Zones */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center mb-3">

              {/* Animal Hero Artwork Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setActiveDropZone('animal');
                }}
                onDragLeave={() => setActiveDropZone(null)}
                onDrop={(e) => handleDropOnZone(e, 'animal')}
                className={`sm:col-span-4 flex flex-col items-center justify-center p-2 rounded-2xl border-2 border-dashed transition-all min-h-[140px] sm:min-h-[170px] ${
                  activeDropZone === 'animal'
                    ? 'border-emerald-600 bg-emerald-50 scale-105'
                    : 'border-amber-700/60 bg-amber-100/50'
                }`}
              >
                {currentAnimal ? (
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-amber-800 shadow bg-stone-950 group">
                    <img
                      src={currentAnimal.image}
                      alt={currentAnimal.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[10px] font-mono text-center py-0.5 font-bold">
                      {currentAnimal.category}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-2 flex flex-col items-center justify-center text-amber-900/70">
                    <ImageIcon className="w-8 h-8 text-amber-600/70 mb-1 animate-pulse" />
                    <span className="font-heading text-sm sm:text-base text-amber-950 leading-tight">
                      ANIMAL IMAGE
                    </span>
                    <span className="text-[9px] font-mono mt-0.5 text-amber-800">
                      [ Drop animal here ]
                    </span>
                  </div>
                )}
              </div>

              {/* 4 Text Fields: Each acts as specific drop zone */}
              <div className="sm:col-span-8 space-y-2 text-xs sm:text-sm">

                {/* 1. ANIMAL FIELD DROP ZONE */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setActiveDropZone('animal-field');
                  }}
                  onDragLeave={() => setActiveDropZone(null)}
                  onDrop={(e) => handleDropOnZone(e, 'animal')}
                  className={`p-1 rounded-xl transition ${
                    activeDropZone === 'animal-field' ? 'bg-emerald-200/70 ring-2 ring-emerald-500' : ''
                  }`}
                >
                  <label className="font-mono text-[11px] font-bold text-amber-900 block mb-0.5">
                    • Animal:
                  </label>
                  <input
                    type="text"
                    value={animalName}
                    onChange={(e) => setAnimalName(e.target.value)}
                    placeholder="[ Kosong / Drop animal here ]"
                    className="w-full bg-white/95 border border-amber-400 focus:border-amber-700 rounded-lg px-2.5 py-1 font-heading text-lg text-amber-950 outline-none shadow-inner placeholder:text-stone-400 placeholder:font-normal placeholder:text-xs"
                  />
                </div>

                {/* 2. SPECIAL CHARACTERISTIC DROP ZONE */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setActiveDropZone('char-field');
                  }}
                  onDragLeave={() => setActiveDropZone(null)}
                  onDrop={(e) => handleDropOnZone(e, 'characteristic')}
                  className={`p-1 rounded-xl transition ${
                    activeDropZone === 'char-field' ? 'bg-emerald-200/70 ring-2 ring-emerald-500' : ''
                  }`}
                >
                  <label className="font-mono text-[11px] font-bold text-amber-900 block mb-0.5">
                    • Special characteristic:
                  </label>
                  <input
                    type="text"
                    value={characteristic}
                    onChange={(e) => setCharacteristic(e.target.value)}
                    placeholder="[ Kosong / Drop characteristic here ]"
                    className="w-full bg-white/95 border border-amber-400 focus:border-amber-700 rounded-lg px-2.5 py-1 font-semibold text-stone-800 outline-none text-xs shadow-inner placeholder:text-stone-400 placeholder:font-normal"
                  />
                </div>

                {/* 3. HABITAT DROP ZONE */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setActiveDropZone('hab-field');
                  }}
                  onDragLeave={() => setActiveDropZone(null)}
                  onDrop={(e) => handleDropOnZone(e, 'habitat')}
                  className={`p-1 rounded-xl transition ${
                    activeDropZone === 'hab-field' ? 'bg-emerald-200/70 ring-2 ring-emerald-500' : ''
                  }`}
                >
                  <label className="font-mono text-[11px] font-bold text-amber-900 block mb-0.5">
                    • Habitat:
                  </label>
                  <input
                    type="text"
                    value={habitat}
                    onChange={(e) => setHabitat(e.target.value)}
                    placeholder="[ Kosong / Drop habitat here ]"
                    className="w-full bg-white/95 border border-amber-400 focus:border-amber-700 rounded-lg px-2.5 py-1 font-semibold text-stone-800 outline-none text-xs shadow-inner placeholder:text-stone-400 placeholder:font-normal"
                  />
                </div>

                {/* 4. PROTECTION SLOGAN DROP ZONE */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setActiveDropZone('slogan-field');
                  }}
                  onDragLeave={() => setActiveDropZone(null)}
                  onDrop={(e) => handleDropOnZone(e, 'slogan')}
                  className={`p-1 rounded-xl transition ${
                    activeDropZone === 'slogan-field' ? 'bg-emerald-200/70 ring-2 ring-emerald-500' : ''
                  }`}
                >
                  <label className="font-mono text-[11px] font-bold text-amber-900 block mb-0.5">
                    • Protection slogan:
                  </label>
                  <textarea
                    rows={2}
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder="[ Kosong / Drop slogan here ]"
                    className="w-full bg-white/95 border border-amber-400 focus:border-amber-700 rounded-lg px-2.5 py-1 font-bold text-emerald-900 outline-none text-xs sm:text-sm resize-none shadow-inner placeholder:text-stone-400 placeholder:font-normal placeholder:text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Stamp selector */}
            <div className="pt-2.5 border-t border-amber-800/30 flex items-center justify-between text-[11px]">
              <span className="font-mono font-bold text-amber-900">Choose Badge Stamp:</span>
              <div className="flex gap-1.5">
                {['WILDLIFE GUARDIAN', 'SAVE INDONESIA', 'GRADE IX HERO'].map((stamp) => (
                  <button
                    key={stamp}
                    type="button"
                    onClick={() => {
                      playClick();
                      setSelectedStamp(stamp);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                      selectedStamp === stamp
                        ? 'bg-amber-800 text-white shadow'
                        : 'bg-amber-200/80 text-amber-900 hover:bg-amber-300'
                    }`}
                  >
                    {stamp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* KOLOM KANAN: 4 DRAGGABLE STEPS (SPECIES, CHAR, HABITAT, SLOGAN)*/}
        {/* ============================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-3">

          {/* STEP 1: TARGET SPECIES (DRAGGABLE & CLICKABLE) */}
          <div className="bg-stone-950/90 border-2 border-stone-800 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                STEP 1: TARGET SPECIES (DRAG OR CLICK)
              </span>
              <span className="text-[10px] text-stone-400 flex items-center gap-1">
                <GripHorizontal className="w-3 h-3 text-amber-400" />
                Drag to Card
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['komodo', 'bekantan', 'cendrawasih'] as const).map((id) => {
                const item = ANIMALS[id];
                const isSelected = selectedAnimalId === id;
                return (
                  <div
                    key={id}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, 'animal', id)}
                    onClick={() => selectAnimal(id)}
                    className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center text-center cursor-grab active:cursor-grabbing select-none group relative ${
                      isSelected
                        ? 'bg-emerald-950/90 border-emerald-400 ring-2 ring-emerald-300 shadow-md scale-[1.02]'
                        : 'bg-stone-900/80 border-stone-700 hover:border-amber-500 opacity-90 hover:opacity-100 hover:scale-[1.01]'
                    }`}
                    title="Drag to Campaign Card or Click to Apply"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-white/20 mb-1 bg-stone-950">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="font-heading text-sm sm:text-base text-yellow-300 leading-tight">
                      {item.name}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center text-[10px] font-bold">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SPECIAL CHARACTERISTIC (DRAGGABLE & CLICKABLE) */}
          <div className="bg-stone-950/90 border-2 border-stone-800 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                STEP 2: SPECIAL CHARACTERISTIC (DRAG OR CLICK)
              </span>
            </div>

            <div className="space-y-1.5">
              {characteristicOptions.map((text, idx) => {
                const isSelected = characteristic === text;
                return (
                  <div
                    key={idx}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, 'characteristic', text)}
                    onClick={() => selectCharacteristic(text)}
                    className={`p-2 rounded-xl border-2 transition-all flex items-center justify-between text-left cursor-grab active:cursor-grabbing text-xs font-medium ${
                      isSelected
                        ? 'bg-amber-950/90 border-amber-400 text-yellow-200 ring-2 ring-yellow-400'
                        : 'bg-stone-900/80 border-stone-700 text-stone-200 hover:border-amber-500'
                    }`}
                    title="Drag to Campaign Card or Click to Apply"
                  >
                    <div className="flex items-center gap-2">
                      <GripHorizontal className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{text}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: HABITAT (DRAGGABLE & CLICKABLE) */}
          <div className="bg-stone-950/90 border-2 border-stone-800 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-sky-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                STEP 3: HABITAT (DRAG OR CLICK)
              </span>
            </div>

            <div className="space-y-1.5">
              {habitatOptions.map((text, idx) => {
                const isSelected = habitat === text;
                return (
                  <div
                    key={idx}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, 'habitat', text)}
                    onClick={() => selectHabitat(text)}
                    className={`p-2 rounded-xl border-2 transition-all flex items-center justify-between text-left cursor-grab active:cursor-grabbing text-xs font-medium ${
                      isSelected
                        ? 'bg-sky-950/90 border-sky-400 text-sky-200 ring-2 ring-sky-400'
                        : 'bg-stone-900/80 border-stone-700 text-stone-200 hover:border-sky-500'
                    }`}
                    title="Drag to Campaign Card or Click to Apply"
                  >
                    <div className="flex items-center gap-2">
                      <GripHorizontal className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{text}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 4: PROTECTION SLOGAN (DRAGGABLE & CLICKABLE) */}
          <div className="bg-stone-950/90 border-2 border-stone-800 rounded-2xl p-2.5 sm:p-3 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-orange-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                STEP 4: PROTECTION SLOGAN (DRAG OR CLICK)
              </span>
            </div>

            <div className="space-y-1.5">
              {sloganOptions.map((text, idx) => {
                const isSelected = slogan === text;
                return (
                  <div
                    key={idx}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, 'slogan', text)}
                    onClick={() => selectSlogan(text)}
                    className={`p-2 rounded-xl border-2 transition-all flex items-center justify-between text-left cursor-grab active:cursor-grabbing text-xs font-semibold ${
                      isSelected
                        ? 'bg-orange-950/90 border-orange-400 text-orange-200 ring-2 ring-orange-400'
                        : 'bg-stone-900/80 border-stone-700 text-stone-200 hover:border-orange-500'
                    }`}
                    title="Drag to Campaign Card or Click to Apply"
                  >
                    <div className="flex items-center gap-2">
                      <GripHorizontal className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>&quot;{text}&quot;</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* TOMBOL SUBMIT CAMPAIGN (MELANJUTKAN KE SLIDE 11 FEEDBACK)      */}
      {/* ============================================================== */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 shrink-0 pb-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-game-green px-10 sm:px-16 py-3.5 sm:py-4 rounded-2xl text-xl sm:text-2xl font-extrabold text-white tracking-wider flex items-center gap-3 border-2 border-emerald-300 cursor-pointer shadow-xl animate-pulse"
        >
          <Send className="w-6 h-6 text-yellow-300" />
          SUBMIT CAMPAIGN (+30 RESCUE POINTS)
        </button>

        <div className="flex items-center gap-2 text-xs text-stone-400 bg-black/60 px-4 py-1 rounded-full border border-stone-800">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          Drag or click items from all 4 steps to complete your campaign poster, then submit!
        </div>
      </div>
    </div>
  );
};
