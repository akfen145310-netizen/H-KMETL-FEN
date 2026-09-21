import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Download, 
  RotateCcw, 
  Copy, 
  Check, 
  Lock, 
  KeyRound, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  X 
} from 'lucide-react';
import { getStoredGrades, Grade, resetChapterToDefault } from '../data/grades';
import { 
  isConverterAuthenticated, 
  loginConverter, 
  DEFAULT_ADMIN_PASSWORD 
} from '../utils/authService';
import { HikmetliImage } from '../components/HikmetliImage';
import { HikmetliTableWrapper } from '../components/HikmetliTableWrapper';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CrosswordPuzzle from '../components/puzzles/CrosswordPuzzle';

export default function ChapterView() {
  const { gradeId, chapterId } = useParams<{ gradeId: string, chapterId: string }>();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [grades, setGrades] = useState<Grade[]>(getStoredGrades);
  const [showResetNotice, setShowResetNotice] = useState(false);
  const [copied, setCopied] = useState(false);

  // Authorized reset modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setGrades(getStoredGrades());
    };
    window.addEventListener('grades_data_updated', handleUpdate);
    return () => window.removeEventListener('grades_data_updated', handleUpdate);
  }, []);
  
  const grade = grades.find(g => g.id === gradeId);
  const unit = grade?.units.find(u => u.chapters.some(c => c.id === chapterId));
  const chapter = unit?.chapters.find(c => c.id === chapterId);

  const performReset = () => {
    if (!gradeId || !chapterId) return;
    const success = resetChapterToDefault(gradeId, chapterId);
    if (success) {
      setShowResetNotice(true);
      setTimeout(() => setShowResetNotice(false), 3000);
    }
  };

  const handleResetToDefault = () => {
    if (!gradeId || !chapterId) return;

    // Check if user is authenticated
    if (isConverterAuthenticated()) {
      if (window.confirm("Bu bölümün içeriğini orijinal varsayılan metne sıfırlamak istiyor musunuz?")) {
        performReset();
      }
    } else {
      // Prompt for authorized password
      setAuthPassword('');
      setAuthError('');
      setShowAuthModal(true);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!authPassword.trim()) {
      setAuthError('Lütfen yetkili şifresini giriniz.');
      return;
    }

    const success = loginConverter(authPassword);
    if (success) {
      setShowAuthModal(false);
      setAuthPassword('');
      setAuthError('');
      performReset();
    } else {
      setAuthError('Hatalı yetkili şifresi! Bölüm içeriğini sıfırlama işlemi yalnızca yetkili öğretmen ve yöneticiler tarafından yapılabilir.');
    }
  };

  const handleCopyContent = async () => {
    if (!chapter) return;
    try {
      await navigator.clipboard.writeText(chapter.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = chapter.content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadPDF = async () => {
    if (!pdfRef.current) return;
    
    // Add a loading state visually if needed, but doing directly:
    const canvas = await html2canvas(pdfRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    // A4 padding: 10mm
    const margin = 10;
    const contentWidth = pdfWidth - (margin * 2);
    
    const imgProps = pdf.getImageProperties(imgData);
    const contentHeight = (imgProps.height * contentWidth) / imgProps.width;
    
    // Handle multi-page if contentHeight > A4 height
    let heightLeft = contentHeight;
    let position = margin;
    let pageHeight = pdf.internal.pageSize.getHeight() - (margin * 2);

    pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - contentHeight; // Push the image up
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position + margin, contentWidth, contentHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`HikmetliFen_${gradeId}Sinif_${chapterId}.pdf`);
  };

  if (!chapter || !grade) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif text-primary-900 mb-4">Bölüm bulunamadı</h1>
        <Link to="/kutuphane" className="text-primary-700 hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4"/> Kütüphaneye Dön
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <Link 
          to={`/sinif/${grade.id}`} 
          className="inline-flex items-center gap-2 text-primary-800/60 hover:text-primary-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {grade.name} Konularına Dön
        </Link>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button 
            onClick={handleCopyContent}
            title="Bu bölümün tüm metnini panoya kopyala"
            className="inline-flex items-center gap-1.5 text-primary-800 bg-white border border-primary-200 px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-primary-50 transition shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-primary-600" />
                <span>Metni Kopyala</span>
              </>
            )}
          </button>

          <button 
            onClick={downloadPDF}
            className="inline-flex items-center gap-1.5 bg-primary-800 text-white px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-primary-700 transition shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF İndir</span>
          </button>

          <button 
            onClick={handleResetToDefault}
            title="Konu içeriğini orijinal başlangıç metnine geri döndür (Yetkili Şifresi Gerekir)"
            className="inline-flex items-center gap-1.5 text-primary-700 bg-primary-50 border border-primary-200/80 px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-primary-100 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-primary-600" />
            <span>Orijinale Sıfırla</span>
            <span className="text-3xs bg-amber-400/20 text-amber-950 px-1.5 py-0.5 rounded border border-amber-300/40 flex items-center gap-0.5 font-normal ml-0.5">
              <Lock className="w-2.5 h-2.5" />
              Yetkili
            </span>
          </button>
        </div>
      </div>

      {showResetNotice && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-medium flex items-center justify-between animate-fade-in">
          <span>✓ Bu bölümün içeriği orijinal varsayılan metne başarıyla sıfırlandı.</span>
        </div>
      )}

      <article className="bg-white rounded-3xl shadow-sm border border-primary-100">
        {/* PDF Capture Region Starts Here */}
        <div ref={pdfRef} className="bg-white pb-12 rounded-3xl overflow-hidden">
          {chapter.imageUrl && (
            <div className="w-full h-64 md:h-96 relative">
              <img 
                src={chapter.imageUrl} 
                alt={chapter.hikmetliTitle || chapter.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/60 to-transparent flex items-end">
                <div className="p-8 md:p-12">
                  <div className="text-primary-100 font-medium text-xs md:text-sm mb-2 opacity-90 tracking-wide flex flex-wrap items-center gap-2">
                    <span>{grade.name}</span>
                    <span>•</span>
                    <span>{unit?.title}</span>
                  </div>
                  <div className="inline-block bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-md mb-3">
                    Müfredat Konusu: {chapter.title}
                  </div>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                    {chapter.hikmetliTitle || chapter.title}
                  </h1>
                </div>
              </div>
            </div>
          )}

          <div className={`px-6 sm:px-8 md:px-12 lg:px-16 ${!chapter.imageUrl ? 'pt-10 md:pt-14' : 'pt-8 md:pt-10'}`}>
             {!chapter.imageUrl && (
                <div className="mb-10">
                   <div className="text-primary-800/60 font-medium text-sm mb-2 uppercase tracking-widest">
                    {grade.name} • {unit?.title}
                  </div>
                  <div className="inline-block bg-primary-100 text-primary-900 text-xs font-semibold px-2.5 py-1 rounded-md mb-3">
                    Müfredat Konusu: {chapter.title}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-900 leading-tight">
                    {chapter.hikmetliTitle || chapter.title}
                  </h1>
                </div>
             )}
             <div className="markdown-body">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img(props: any) {
                      return <HikmetliImage {...props} />;
                    },
                    table(props: any) {
                      return (
                        <HikmetliTableWrapper>
                          <table {...props}>{props.children}</table>
                        </HikmetliTableWrapper>
                      );
                    },
                    p(props: any) {
                      const text = String(props.children || '');
                      // If the paragraph is only a citation line that HikmetliImage already renders, hide it to prevent duplicate text
                      if (text.includes('fenbilim.net alıntıdır') && text.includes('Resim Link')) {
                        return null;
                      }
                      return <p {...props}>{props.children}</p>;
                    },
                    code(props: any) {
                      const {children, className, node, ...rest} = props;
                      const match = /language-(\w+)/.exec(className || '');
                      if (match && match[1] === 'puzzle') {
                        if (String(children).trim() === 'crossword') {
                          return <CrosswordPuzzle />;
                        }
                      }
                      return <code {...rest} className={className}>{children}</code>;
                    }
                  }}
                >
                  {chapter.content}
                </Markdown>
             </div>
             
             <div className="mt-16 text-center text-primary-800/40 italic font-serif border-t border-primary-100 pt-8">
              "Kainat, okunmayı bekleyen muazzam ve manidar bir kitaptır." <br/> — Hikmetli Fen Bilimleri Seti
            </div>
          </div>
        </div>
        {/* PDF Capture Region Ends Here */}
      </article>

      {/* AUTHORIZATION REQUIRED MODAL FOR RESET */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-primary-200 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthPassword('');
                  setAuthError('');
                }}
                className="absolute right-5 top-5 text-primary-400 hover:text-primary-800 p-1.5 rounded-full hover:bg-primary-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4 border border-amber-300 shadow-xs">
                <Lock className="w-7 h-7 text-amber-800" />
              </div>

              <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-950 text-2xs font-bold uppercase tracking-wider rounded-full border border-amber-300 mb-2">
                Yetkili Onayı Gerekli
              </span>

              <h3 className="text-xl font-serif font-bold text-primary-950 mb-1.5">
                Konu İçeriğini Sıfırlama Yetkilendirmesi
              </h3>

              <p className="text-xs text-primary-800/80 mb-4 leading-relaxed">
                Bu ders konusunun içeriğini orijinal haline geri döndürmek veya değiştirmek yalnızca yetkili öğretmen ve yöneticilere açıktır. Lütfen yetkili şifrenizi giriniz.
              </p>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-primary-900 mb-1">
                    Yetkili Şifresi
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="Yetkili şifrenizi giriniz..."
                      autoFocus
                      required
                      className="w-full px-3.5 py-2.5 pr-10 bg-primary-50/50 border border-primary-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-800 transition p-1 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-2xs text-amber-950">
                  <span className="font-bold">Başlangıç Şifresi:</span>{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono font-bold text-amber-900">
                    {DEFAULT_ADMIN_PASSWORD}
                  </code>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAuthModal(false);
                      setAuthPassword('');
                      setAuthError('');
                    }}
                    className="px-4 py-2 rounded-xl border border-primary-300 text-xs font-semibold text-primary-800 hover:bg-primary-50 transition cursor-pointer"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary-900 hover:bg-primary-800 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-amber-300" />
                    Doğrula ve Sıfırla
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
