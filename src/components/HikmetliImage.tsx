import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon } from 'lucide-react';
import { TopicIllustration } from './illustrations/TopicIllustration';

interface HikmetliImageProps {
  src?: string;
  alt?: string;
  title?: string;
  chapterId?: string;
}

export const HikmetliImage: React.FC<HikmetliImageProps> = ({ src, alt, title, chapterId }) => {
  const originalSrc = src || '';
  const displayAlt = alt || title || 'Konu Görseli';

  // Check if this is a topic illustration protocol or needs custom illustration
  const isTopicProtocol = originalSrc.startsWith('topic://') || !originalSrc || originalSrc.includes('fenbilim.net');
  const topicKey = isTopicProtocol ? (originalSrc.replace('topic://', '') || chapterId || displayAlt) : (chapterId || displayAlt);

  const initialSrc = originalSrc.startsWith('http://')
    ? originalSrc.replace('http://', 'https://')
    : originalSrc;

  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [triedProxy, setTriedProxy] = useState<boolean>(false);
  const [useIllustration, setUseIllustration] = useState<boolean>(isTopicProtocol);

  const handleError = () => {
    if (!triedProxy && initialSrc.startsWith('http') && !initialSrc.includes('fenbilim.net')) {
      setTriedProxy(true);
      setCurrentSrc(`https://images.weserv.nl/?url=${encodeURIComponent(initialSrc)}`);
    } else {
      setUseIllustration(true);
    }
  };

  return (
    <div className="my-8 rounded-2xl overflow-hidden shadow-sm border border-primary-200 bg-stone-50">
      {useIllustration || isTopicProtocol ? (
        <div className="w-full">
          <TopicIllustration topicId={topicKey} title={displayAlt} />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center p-2 bg-stone-100/50 min-h-[160px]">
          <img
            src={currentSrc}
            alt={displayAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={handleError}
            className="max-h-[480px] w-auto max-w-full rounded-xl object-contain shadow-xs"
          />
        </div>
      )}

      {/* Modern Hikmetli Fen educational badge */}
      <div className="p-3 bg-white/95 border-t border-primary-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="text-primary-900 font-medium italic text-left flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>{displayAlt}</span>
        </div>

        <div className="flex items-center gap-2 text-2xs text-primary-900 bg-amber-50/90 px-3 py-1 rounded-lg border border-amber-200/90 shrink-0">
          <span className="font-semibold text-primary-950">Hikmetli Fen Bilimleri</span>
          <span className="text-primary-300">|</span>
          <span className="text-amber-900 font-medium">Özgün Eğitim İllüstrasyonu</span>
        </div>
      </div>
    </div>
  );
};
