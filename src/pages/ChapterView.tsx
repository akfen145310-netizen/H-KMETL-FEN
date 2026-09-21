import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { ArrowLeft, Download, RotateCcw } from 'lucide-react';
import { getStoredGrades, Grade, resetChapterToDefault } from '../data/grades';
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

  const handleResetToDefault = () => {
    if (!gradeId || !chapterId) return;
    if (window.confirm("Bu bölümün içeriğini orijinal varsayılan metne sıfırlamak istiyor musunuz?")) {
      resetChapterToDefault(gradeId, chapterId);
      setShowResetNotice(true);
      setTimeout(() => setShowResetNotice(false), 3000);
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
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <Link 
          to={`/sinif/${grade.id}`} 
          className="inline-flex items-center gap-2 text-primary-800/60 hover:text-primary-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {grade.name} Konularına Dön
        </Link>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleResetToDefault}
            title="Konu içeriğini orijinal başlangıç metnine geri döndür"
            className="inline-flex items-center gap-1.5 text-primary-700 bg-primary-50 border border-primary-200/80 px-3 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-primary-100 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Orijinale Sıfırla
          </button>
          <button 
            onClick={downloadPDF}
            className="inline-flex items-center gap-2 bg-primary-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            PDF Olarak İndir
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

          <div className={`md:px-12 px-6 ${!chapter.imageUrl ? 'pt-12' : 'pt-8'}`}>
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
    </motion.div>
  );
}
