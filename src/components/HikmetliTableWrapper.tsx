import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, ArrowRightLeft, MoveHorizontal } from 'lucide-react';

interface HikmetliTableWrapperProps {
  children: React.ReactNode;
}

export const HikmetliTableWrapper: React.FC<HikmetliTableWrapperProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canScrollHorizontally, setCanScrollHorizontally] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check whether content overflows horizontally
  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setCanScrollHorizontally(scrollWidth > clientWidth + 4);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children, isExpanded]);

  const handleScroll = () => {
    if (containerRef.current && containerRef.current.scrollLeft > 10) {
      setHasScrolled(true);
    }
  };

  return (
    <div
      className={`my-6 transition-all duration-300 relative group ${
        isExpanded
          ? 'table-expanded-mode -mx-2 sm:-mx-6 md:-mx-12 lg:-mx-20 shadow-lg bg-amber-50/40 p-2 sm:p-4 rounded-2xl border-2 border-amber-300/80 z-10'
          : 'table-normal-mode'
      }`}
    >
      {/* Action Header Bar for Table */}
      <div className="flex items-center justify-between gap-2 px-1 pb-1.5 text-xs text-primary-800/70 font-sans select-none">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-primary-900 bg-primary-100/90 text-[11px] px-2 py-0.5 rounded-md border border-primary-200">
            📊 Tablo Görünümü
          </span>
          {canScrollHorizontally && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-200 animate-pulse">
              <MoveHorizontal className="w-3 h-3" />
              Geniş Tablo (Yatay kaydırılabilir)
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Mobile swipe helper indicator */}
          {canScrollHorizontally && !hasScrolled && (
            <span className="inline-flex sm:hidden items-center gap-1 text-[10px] text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded font-medium">
              <ArrowRightLeft className="w-3 h-3 text-amber-600" />
              Kaydır
            </span>
          )}

          {/* Desktop/Tablet Expand Table Width toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Tablo alanını daralt (orijinal genişlik)" : "Tablo alanını genişlet"}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary-800 hover:text-primary-950 bg-white hover:bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-200 shadow-2xs transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-primary-700" />
                <span className="hidden sm:inline">Normal Boyuta Daralt</span>
                <span className="sm:hidden">Daralt</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-primary-700" />
                <span className="hidden sm:inline">Sadece Bu Tabloyu Genişlet</span>
                <span className="sm:hidden">Genişlet</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Responsive Horizontal Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-primary-50 rounded-xl border border-primary-200/90 bg-white shadow-xs transition-all touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="min-w-full inline-block align-middle">
          {children}
        </div>
      </div>

      {/* Mobile scroll hint indicator at bottom if scrollable */}
      {canScrollHorizontally && (
        <div className="sm:hidden flex items-center justify-between text-[11px] text-primary-800/60 px-2 pt-1.5 font-medium">
          <span>👈 Tüm sütunları görmek için parmağınızla kaydırın 👉</span>
          <span className="text-[10px] text-primary-700 bg-primary-100 px-1.5 py-0.5 rounded">Yatay Kaydırma</span>
        </div>
      )}
    </div>
  );
};
