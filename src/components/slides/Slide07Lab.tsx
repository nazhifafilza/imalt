import React, { useState } from 'react';
import { LAB_CARDS } from '../../data/gameData';
import { playClick, playSuccess, playError } from '../../utils/audio';
import { FlaskConical, CheckCircle2, ArrowRight, RefreshCw, HelpCircle } from 'lucide-react';

interface SlideProps {
  onNext: () => void;
  onAddScore: (points: number) => void;
}

type AnimalType = 'komodo' | 'bekantan' | 'cendrawasih';
type CategoryType = 'appearance' | 'habitat';

export const Slide07Lab: React.FC<SlideProps> = ({ onNext, onAddScore }) => {
  // Assignments map: key is `${animal}_${category}` -> cardId
  const [assignments, setAssignments] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | null>>({
    'komodo_appearance': null,
    'komodo_habitat': null,
    'bekantan_appearance': null,
    'bekantan_habitat': null,
    'cendrawasih_appearance': null,
    'cendrawasih_habitat': null,
  });

  const [selectedCardId, setSelectedCardId] = useState<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Cards currently placed
  const placedCardIds = Object.values(assignments).filter(Boolean);

  const handleCardClick = (cardId: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => {
    playClick();
    if (selectedCardId === cardId) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(cardId);
      setFeedback('Card selected! Now click an empty slot in the table.');
    }
  };

  const handleSlotClick = (animal: AnimalType, category: CategoryType) => {
    const slotKey = `${animal}_${category}`;
    if (selectedCardId) {
      playClick();
      // If card was already in another slot, clear old slot
      const newAssignments = { ...assignments };
      Object.keys(newAssignments).forEach((k) => {
        if (newAssignments[k] === selectedCardId) {
          newAssignments[k] = null;
        }
      });
      newAssignments[slotKey] = selectedCardId;
      setAssignments(newAssignments);
      setSelectedCardId(null);
      setFeedback(null);
    } else if (assignments[slotKey]) {
      // Clear slot on click
      playClick();
      setAssignments((prev) => ({ ...prev, [slotKey]: null }));
    }
  };

  const checkAnswers = () => {
    const isKomodoApp = assignments['komodo_appearance'] === 'B';
    const isKomodoHab = assignments['komodo_habitat'] === 'E';
    const isBekantanApp = assignments['bekantan_appearance'] === 'A';
    const isBekantanHab = assignments['bekantan_habitat'] === 'D';
    const isCendrawasihApp = assignments['cendrawasih_appearance'] === 'C';
    const isCendrawasihHab = assignments['cendrawasih_habitat'] === 'F';

    if (isKomodoApp && isKomodoHab && isBekantanApp && isBekantanHab && isCendrawasihApp && isCendrawasihHab) {
      playSuccess();
      setIsCompleted(true);
      setFeedback('PERFECT MATCH! All 3 animal profiles have been fully authenticated in the Wildlife Lab! (+20 Points)');
      onAddScore(20);
    } else {
      playError();
      const countCorrect = [isKomodoApp, isKomodoHab, isBekantanApp, isBekantanHab, isCendrawasihApp, isCendrawasihHab].filter(Boolean).length;
      setFeedback(`${countCorrect} of 6 slots correct! Keep matching clues based on each animal's traits.`);
    }
  };

  const resetAll = () => {
    playClick();
    setAssignments({
      'komodo_appearance': null,
      'komodo_habitat': null,
      'bekantan_appearance': null,
      'bekantan_habitat': null,
      'cendrawasih_appearance': null,
      'cendrawasih_habitat': null,
    });
    setSelectedCardId(null);
    setIsCompleted(false);
    setFeedback(null);
  };

  return (
    <div className="relative w-full min-h-full flex-1 flex flex-col justify-between p-4 sm:p-5 md:p-6 overflow-y-auto space-y-4 pb-10">
      {/* Top Banner */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 bg-stone-950/80 border-2 border-emerald-600/80 rounded-2xl p-3 backdrop-blur shadow-lg">
        <div>
          <div className="text-xs sm:text-sm font-bold text-emerald-400 font-mono tracking-wider uppercase flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-emerald-400 animate-pulse" />
            LEVEL 2 – UNDERSTANDING & APPLYING • 20 RESCUE POINTS
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl text-yellow-300 tracking-wide">
            COMPLETE THE ANIMAL PROFILE
          </h2>
        </div>

        <div className="bg-emerald-950/70 border border-emerald-500/60 text-emerald-200 text-xs sm:text-sm px-4 py-1.5 rounded-xl text-center sm:text-right font-medium">
          &quot;Match the information cards with the correct animals.&quot;
        </div>
      </div>

      {/* Main Lab Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-6xl mx-auto w-full my-auto items-stretch">
        {/* Left: 6 Information Cards Deck */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-stone-950/90 border-3 border-amber-600 rounded-2xl p-4 shadow-xl backdrop-blur">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-amber-400 font-semibold">
                EVIDENCE CARDS (SELECT TO ASSIGN):
              </span>
            </div>

            <div className="space-y-2">
              {LAB_CARDS.map((card) => {
                const isPlaced = placedCardIds.includes(card.id);
                const isSelected = selectedCardId === card.id;

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => handleCardClick(card.id)}
                    className={`w-full text-left p-2.5 rounded-xl border-2 transition-all flex items-center gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-stone-950 border-white ring-2 ring-yellow-400 scale-[1.02]'
                        : isPlaced
                        ? 'bg-stone-900/40 text-stone-400 border-stone-800 opacity-60'
                        : 'bg-stone-900 hover:bg-stone-800 text-stone-100 border-amber-700/70 hover:border-amber-400'
                    }`}
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-black/50 font-heading text-lg text-yellow-300 border border-white/20 shrink-0">
                      {card.id}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold flex-1">
                      {card.text}
                    </span>
                    {isPlaced && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-700 shrink-0">
                        Assigned
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-stone-800">
            <button
              type="button"
              onClick={resetAll}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 bg-stone-900 px-3 py-1.5 rounded-lg border border-stone-800 cursor-pointer transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Slots
            </button>

            <button
              type="button"
              onClick={checkAnswers}
              className="btn-game-gold px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-stone-950 flex items-center gap-1.5 border border-yellow-200 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-stone-950" />
              Check Matches
            </button>
          </div>
        </div>

        {/* Right: Laboratory Research Table (Animal | Appearance | Habitat) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-stone-950/90 border-3 border-emerald-600 rounded-2xl p-4 shadow-xl backdrop-blur">
          <div>
            <div className="text-xs font-mono text-emerald-400 mb-2 font-semibold">
              WILDLIFE SPECIMEN PROFILE TABLE:
            </div>

            {/* Table */}
            <div className="w-full overflow-hidden border border-emerald-700/60 rounded-xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-emerald-950/80 text-emerald-300 border-b border-emerald-700/60 font-heading text-base sm:text-lg tracking-wider">
                    <th className="p-2.5 w-1/3">Animal</th>
                    <th className="p-2.5 w-1/3 border-l border-emerald-700/60">Appearance</th>
                    <th className="p-2.5 w-1/3 border-l border-emerald-700/60">Habitat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 bg-stone-900/60">
                  {/* Row 1: KOMODO */}
                  <tr className="hover:bg-stone-900/90 transition-colors">
                    <td className="p-2.5 font-bold text-emerald-300 align-top">
                      <div className="font-heading text-lg sm:text-xl text-emerald-400">KOMODO</div>
                      <span className="text-[10px] text-stone-400 block font-normal">Reptile</span>
                    </td>

                    {/* Komodo Appearance Slot */}
                    <td
                      onClick={() => handleSlotClick('komodo', 'appearance')}
                      className="p-2.5 border-l border-stone-800 cursor-pointer align-top"
                    >
                      {assignments['komodo_appearance'] ? (
                        <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-100 text-xs font-medium">
                          <span className="font-bold text-yellow-300 mr-1">
                            [{assignments['komodo_appearance']}]
                          </span>
                          {LAB_CARDS.find((c) => c.id === assignments['komodo_appearance'])?.text}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg border-2 border-dashed border-stone-700 hover:border-emerald-500 text-stone-500 text-[11px] text-center">
                          + Tap to assign Appearance
                        </div>
                      )}
                    </td>

                    {/* Komodo Habitat Slot */}
                    <td
                      onClick={() => handleSlotClick('komodo', 'habitat')}
                      className="p-2.5 border-l border-stone-800 cursor-pointer align-top"
                    >
                      {assignments['komodo_habitat'] ? (
                        <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-100 text-xs font-medium">
                          <span className="font-bold text-yellow-300 mr-1">
                            [{assignments['komodo_habitat']}]
                          </span>
                          {LAB_CARDS.find((c) => c.id === assignments['komodo_habitat'])?.text}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg border-2 border-dashed border-stone-700 hover:border-emerald-500 text-stone-500 text-[11px] text-center">
                          + Tap to assign Habitat
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* Row 2: BEKANTAN */}
                  <tr className="hover:bg-stone-900/90 transition-colors">
                    <td className="p-2.5 font-bold text-orange-300 align-top">
                      <div className="font-heading text-lg sm:text-xl text-orange-400">BEKANTAN</div>
                      <span className="text-[10px] text-stone-400 block font-normal">Mammal</span>
                    </td>

                    {/* Bekantan Appearance Slot */}
                    <td
                      onClick={() => handleSlotClick('bekantan', 'appearance')}
                      className="p-2.5 border-l border-stone-800 cursor-pointer align-top"
                    >
                      {assignments['bekantan_appearance'] ? (
                        <div className="p-2 rounded-lg bg-orange-950/80 border border-orange-500 text-orange-100 text-xs font-medium">
                          <span className="font-bold text-yellow-300 mr-1">
                            [{assignments['bekantan_appearance']}]
                          </span>
                          {LAB_CARDS.find((c) => c.id === assignments['bekantan_appearance'])?.text}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg border-2 border-dashed border-stone-700 hover:border-orange-500 text-stone-500 text-[11px] text-center">
                          + Tap to assign Appearance
                        </div>
                      )}
                    </td>

                    {/* Bekantan Habitat Slot */}
                    <td
                      onClick={() => handleSlotClick('bekantan', 'habitat')}
                      className="p-2.5 border-l border-stone-800 cursor-pointer align-top"
                    >
                      {assignments['bekantan_habitat'] ? (
                        <div className="p-2 rounded-lg bg-orange-950/80 border border-orange-500 text-orange-100 text-xs font-medium">
                          <span className="font-bold text-yellow-300 mr-1">
                            [{assignments['bekantan_habitat']}]
                          </span>
                          {LAB_CARDS.find((c) => c.id === assignments['bekantan_habitat'])?.text}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg border-2 border-dashed border-stone-700 hover:border-orange-500 text-stone-500 text-[11px] text-center">
                          + Tap to assign Habitat
                        </div>
                      )}
                    </td>
                  </tr>

                  {/* Row 3: CENDRAWASIH */}
                  <tr className="hover:bg-stone-900/90 transition-colors">
                    <td className="p-2.5 font-bold text-yellow-300 align-top">
                      <div className="font-heading text-lg sm:text-xl text-yellow-400">CENDRAWASIH</div>
                      <span className="text-[10px] text-stone-400 block font-normal">Bird</span>
                    </td>

                    {/* Cendrawasih Appearance Slot */}
                    <td
                      onClick={() => handleSlotClick('cendrawasih', 'appearance')}
                      className="p-2.5 border-l border-stone-800 cursor-pointer align-top"
                    >
                      {assignments['cendrawasih_appearance'] ? (
                        <div className="p-2 rounded-lg bg-yellow-950/80 border border-yellow-500 text-yellow-100 text-xs font-medium">
                          <span className="font-bold text-yellow-300 mr-1">
                            [{assignments['cendrawasih_appearance']}]
                          </span>
                          {LAB_CARDS.find((c) => c.id === assignments['cendrawasih_appearance'])?.text}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg border-2 border-dashed border-stone-700 hover:border-yellow-500 text-stone-500 text-[11px] text-center">
                          + Tap to assign Appearance
                        </div>
                      )}
                    </td>

                    {/* Cendrawasih Habitat Slot */}
                    <td
                      onClick={() => handleSlotClick('cendrawasih', 'habitat')}
                      className="p-2.5 border-l border-stone-800 cursor-pointer align-top"
                    >
                      {assignments['cendrawasih_habitat'] ? (
                        <div className="p-2 rounded-lg bg-yellow-950/80 border border-yellow-500 text-yellow-100 text-xs font-medium">
                          <span className="font-bold text-yellow-300 mr-1">
                            [{assignments['cendrawasih_habitat']}]
                          </span>
                          {LAB_CARDS.find((c) => c.id === assignments['cendrawasih_habitat'])?.text}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg border-2 border-dashed border-stone-700 hover:border-yellow-500 text-stone-500 text-[11px] text-center">
                          + Tap to assign Habitat
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div className={`mt-2 p-2.5 rounded-xl border text-xs sm:text-sm font-medium ${
              isCompleted
                ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                : 'bg-amber-950 border-amber-500 text-amber-200'
            }`}>
              {feedback}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Continue Button (Active when completed) */}
      <div className="relative z-10 flex justify-center mt-2 shrink-0 pb-4">
        {isCompleted ? (
          <button
            type="button"
            onClick={() => {
              playClick();
              onNext();
            }}
            className="btn-game-green px-10 sm:px-14 py-3 sm:py-3.5 rounded-2xl text-lg sm:text-xl font-extrabold text-white tracking-wider flex items-center gap-3 border-2 border-emerald-300 cursor-pointer animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <span>CONTINUE TO LEVEL 3</span>
            <ArrowRight className="w-5 h-5 text-yellow-300" />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs text-stone-400 bg-black/60 px-4 py-2 rounded-full border border-stone-800">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Assign all 6 cards and click &quot;Check Matches&quot; to advance to Level 3!
          </div>
        )}
      </div>
    </div>
  );
};
