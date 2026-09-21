import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

const GRID_ROWS = 7;
const GRID_COLS = 6;

interface WordData {
  id: number;
  direction: 'down' | 'across';
  row: number;
  col: number;
  length: number;
  answer: string;
  clue: string;
}

const PUZZLE_DATA: WordData[] = [
  { id: 1, direction: 'down', row: 0, col: 3, length: 4, answer: 'KÜRE', clue: "Güneş, Dünya ve Ay'ın ortak olan kusursuz geometrik şekli." },
  { id: 2, direction: 'down', row: 2, col: 1, length: 5, answer: 'DÜNYA', clue: "Üzerinde misafir olduğumuz, canlılara beşik olan gezegen." },
  { id: 3, direction: 'across', row: 3, col: 0, length: 5, answer: 'GÜNEŞ', clue: "Dünyamızı ısıtıp aydınlatmakla görevli olan muazzam lamba." },
  { id: 4, direction: 'across', row: 4, col: 1, length: 5, answer: 'NOHUT', clue: "Dünya'mızı büyüklük olarak modellemek isteseydik benzetebileceğimiz bakliyat." },
  { id: 5, direction: 'across', row: 6, col: 1, length: 2, answer: 'AY', clue: "Gecelerimizi aydınlatan ayna ve takvim yaprağımız." },
];

interface Cell {
  row: number;
  col: number;
  expected: string;
  number?: number;
}

export default function CrosswordPuzzle() {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [isSolved, setIsSolved] = useState(false);

  const cellMap = useMemo(() => {
    const map = new Map<string, Cell>();
      PUZZLE_DATA.forEach(word => {
      // Set the starting cell with the number
      const startKey = `${word.row},${word.col}`;
      if (!map.has(startKey)) {
        map.set(startKey, { row: word.row, col: word.col, expected: word.answer[0], number: word.id });
      } else {
        const existing = map.get(startKey)!;
        existing.number = word.id; // Just overwriting or adding to it, in our layout they don't share start cells.
      }
      
      // Fill the rest of the cells
      for(let i = 0; i < word.length; i++) {
        const r = word.direction === 'down' ? word.row + i : word.row;
        const c = word.direction === 'across' ? word.col + i : word.col;
        const key = `${r},${c}`;
        if (!map.has(key)) {
          map.set(key, { row: r, col: c, expected: word.answer[i] });
        }
      }
    });
    return map;
  }, []);

  const handleInput = (r: number, c: number, val: string) => {
    const upperVal = val.toLocaleUpperCase('tr-TR');
    const updated = { ...inputs, [`${r},${c}`]: upperVal };
    setInputs(updated);
    
    // Check for win condition
    let solved = true;
    cellMap.forEach((cell, key) => {
      if ((updated[key] || '') !== cell.expected) {
        solved = false;
      }
    });
    
    if (solved && !isSolved) {
      setIsSolved(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="bg-primary-50 rounded-3xl p-6 md:p-10 border border-primary-200 mt-8 mb-12 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold text-primary-900 mb-2">Kavram Bulmacası</h2>
        <p className="text-primary-800/80">Kelimeleri büyük harflerle boşluklara doldurunuz.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
        
        {/* Crossword Grid */}
        <div 
          className="grid gap-1 shrink-0 p-4 bg-white rounded-xl shadow-inner border border-primary-100"
          style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: GRID_ROWS }).map((_, r) => (
            Array.from({ length: GRID_COLS }).map((_, c) => {
              const key = `${r},${c}`;
              const cell = cellMap.get(key);
              
              if (!cell) {
                return <div key={key} className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent" />;
              }
              
              const isCellCorrect = isSolved || (inputs[key] === cell.expected);
              
              return (
                <div key={key} className="relative w-10 h-10 sm:w-12 sm:h-12">
                  {cell.number && (
                    <span className="absolute top-0.5 left-1 text-[10px] md:text-xs font-bold text-primary-900 z-10 pointer-events-none">
                      {cell.number}
                    </span>
                  )}
                  <input 
                    type="text"
                    maxLength={1}
                    value={inputs[key] || ''}
                    onChange={(e) => handleInput(r, c, e.target.value)}
                    disabled={isSolved}
                    className={`w-full h-full text-center font-bold text-lg md:text-xl uppercase 
                      border-2 rounded transition-colors duration-300
                      ${isCellCorrect && inputs[key] 
                        ? 'border-green-500 bg-green-50/50 text-green-700' 
                        : 'border-primary-200 bg-white focus:border-primary-500 focus:bg-primary-50 text-primary-900'
                      }
                      ${isSolved ? 'opacity-90' : ''}
                    `}
                  />
                </div>
              );
            })
          ))}
        </div>

        {/* Clues */}
        <div className="flex-grow max-w-md w-full">
          <h3 className="font-serif font-bold text-primary-900 mb-4 text-xl border-b border-primary-200 pb-2">İpuçları</h3>
          <ul className="space-y-4">
            {PUZZLE_DATA.map((word) => {
              // check if word is fully correct in current inputs
              const isWordSolved = Array.from({length: word.length}).every((_, i) => {
                const r = word.direction === 'down' ? word.row + i : word.row;
                const c = word.direction === 'across' ? word.col + i : word.col;
                return inputs[`${r},${c}`] === word.answer[i];
              });

              return (
                <li key={word.id} className="flex gap-3">
                  <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${isWordSolved ? 'bg-green-500 text-white' : 'bg-primary-200 text-primary-900'}`}>
                    {word.id}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                      {word.direction === 'across' ? 'Sağa Doğru' : 'Aşağı Doğru'}
                    </span>
                    <p className={`text-sm md:text-base transition-colors ${isWordSolved ? 'text-green-700 font-medium' : 'text-primary-800'}`}>
                      {word.clue}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      {isSolved && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 p-6 bg-green-100 border border-green-200 rounded-2xl flex flex-col items-center text-center"
        >
          <Trophy className="w-12 h-12 text-green-600 mb-3" />
          <h3 className="text-2xl font-serif font-bold text-green-800 mb-2">Tebrikler!</h3>
          <p className="text-green-700 font-medium">Bütün kavramları başarıyla buldunuz ve kainatın nizamındaki hikmetleri pekiştirdiniz.</p>
        </motion.div>
      )}
    </div>
  );
}
