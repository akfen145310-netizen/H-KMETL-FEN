import React, { useState } from 'react';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

interface HikmetliImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

export const HikmetliImage: React.FC<HikmetliImageProps> = ({ src, alt, title }) => {
  const originalSrc = src || '';
  // Upgrade http to https to avoid mixed-content blocking
  const initialSrc = originalSrc.startsWith('http://')
    ? originalSrc.replace('http://', 'https://')
    : originalSrc;

  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [triedProxy, setTriedProxy] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const handleError = () => {
    // If direct load failed, try image CDN proxy as fallback
    if (!triedProxy && initialSrc.startsWith('http')) {
      setTriedProxy(true);
      // images.weserv.nl caches and serves cross-domain images without hotlink/CORS blocks
      setCurrentSrc(`https://images.weserv.nl/?url=${encodeURIComponent(initialSrc)}`);
    } else {
      setFailed(true);
    }
  };

  const displayAlt = alt || title || 'Konu Görseli';

  return (
    <figure className="my-8 rounded-2xl overflow-hidden shadow-sm border border-primary-200 bg-stone-50">
      {!failed ? (
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
      ) : (
        <div className="p-8 flex flex-col items-center justify-center text-center bg-primary-50/40 text-primary-800">
          <ImageIcon className="w-10 h-10 text-primary-400 mb-2" />
          <p className="font-medium text-sm text-primary-900">{displayAlt}</p>
          <p className="text-xs text-primary-600 mt-1">
            Görsel önizlemesi doğrudan yüklenemedi. Orijinal kaynaktan incelemek için aşağıdaki bağlantıyı kullanabilirsiniz.
          </p>
        </div>
      )}

      {/* Citation and original link panel */}
      <div className="p-3 bg-white/95 border-t border-primary-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <figcaption className="text-primary-900 font-medium italic text-left">
          📷 {displayAlt}
        </figcaption>

        {originalSrc && (
          <div className="flex items-center gap-2 text-xs text-primary-900 bg-amber-50/90 px-3 py-1.5 rounded-lg border border-amber-200/90 shrink-0">
            <span className="font-semibold text-primary-950">fenbilim.net alıntıdır.</span>
            <span className="text-primary-300">|</span>
            <a
              href={originalSrc}
              target="_blank"
              rel="noopener noreferrer"
              title={originalSrc}
              className="inline-flex items-center gap-1 font-semibold text-amber-900 hover:text-amber-950 underline transition-colors"
            >
              <span>Resim Link</span>
              <ExternalLink className="w-3.5 h-3.5 inline-block" />
            </a>
          </div>
        )}
      </div>
    </figure>
  );
};
