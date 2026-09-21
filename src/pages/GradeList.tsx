import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  getStoredGrades, 
  Grade, 
  applyMaarifCurriculum, 
  isMaarifModelActive,
  MAARIF_MODEL_GRADES,
  getMaarifCurriculumStats 
} from '../data/grades';
import { 
  ArrowRight, 
  Library as LibraryIcon, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  X, 
  BookOpen, 
  Layers, 
  ChevronRight,
  Info
} from 'lucide-react';

export default function GradeList() {
  const [grades, setGrades] = useState<Grade[]>(getStoredGrades);
  const [isMaarifActive, setIsMaarifActive] = useState<boolean>(isMaarifModelActive);
  const [showMaarifModal, setShowMaarifModal] = useState<boolean>(false);
  const [activeTabGrade, setActiveTabGrade] = useState<string>("5");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stats = getMaarifCurriculumStats();

  useEffect(() => {
    const handleUpdate = () => {
      setGrades(getStoredGrades());
      setIsMaarifActive(isMaarifModelActive());
    };
    window.addEventListener('grades_data_updated', handleUpdate);
    return () => window.removeEventListener('grades_data_updated', handleUpdate);
  }, []);

  const handleApplyMaarif = (mode: 'replace' | 'merge' = 'replace') => {
    const result = applyMaarifCurriculum(mode);
    if (result.success) {
      setGrades(getStoredGrades());
      setIsMaarifActive(true);
      setShowMaarifModal(false);
      setToastMessage(
        `Türkiye Yüzyılı Maarif Modeli başarıyla yüklendi! 5, 6, 7 ve 8. Sınıf Fen Bilimleri (${result.stats.unitCount} Ünite, ${result.stats.chapterCount} Konu) kütüphanenize eklendi.`
      );
      setTimeout(() => {
        setToastMessage(null);
      }, 6000);
    }
  };

  const selectedMaarifGrade = MAARIF_MODEL_GRADES.find(g => g.id === activeTabGrade) || MAARIF_MODEL_GRADES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 rounded-2xl bg-emerald-900 text-emerald-50 border border-emerald-700 shadow-xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
              <span className="text-sm sm:text-base font-medium leading-snug">
                {toastMessage}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-200 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAARIF MODEL TOP ACTION BANNER (Kütüphane Başındaki Maarif Ekleme Alanı) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-primary-900 via-primary-950 to-primary-900 text-white shadow-xl border border-primary-800 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <GraduationCap className="w-4 h-4" />
              T.C. MEB Türkiye Yüzyılı Maarif Modeli
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 leading-snug">
              Maarif Modeline Göre Ünite ve Konuları Otomatik Ekle
            </h2>
            
            <p className="text-primary-200 text-sm sm:text-base leading-relaxed">
              5, 6, 7 ve 8. Sınıf Fen Bilimleri dersinin fenbilim.net ve Maarif müfredatındaki tüm ünite ve alt konu başlıklarını ({stats.unitCount} Ünite, {stats.chapterCount} Konu) tek tıkla kütüphanenize yükleyin. Her bir alt başlık "Hikmetli Yorum Çıktısı Kuralları"na tam uyumlu biçimde açılacaktır.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-primary-300">
              <span className="flex items-center gap-1.5 bg-primary-800/80 px-2.5 py-1 rounded-lg border border-primary-700">
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                4 Sınıf Düzeyi (5, 6, 7, 8)
              </span>
              <span className="flex items-center gap-1.5 bg-primary-800/80 px-2.5 py-1 rounded-lg border border-primary-700">
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                {stats.unitCount} Maarif Ünitesi
              </span>
              <span className="flex items-center gap-1.5 bg-primary-800/80 px-2.5 py-1 rounded-lg border border-primary-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {stats.chapterCount}+ Alt Konu Başlığı
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => handleApplyMaarif('replace')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-primary-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-5 h-5 text-primary-950 group-hover:rotate-12 transition-transform" />
              <span>Maarif Modeline Göre Konuları Ekle</span>
            </button>

            <button
              type="button"
              onClick={() => setShowMaarifModal(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-primary-800/90 hover:bg-primary-800 text-primary-100 hover:text-white font-medium text-xs sm:text-sm border border-primary-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-primary-300" />
              <span>Müfredat Ağacını İncele</span>
            </button>
          </div>
        </div>

        {isMaarifActive && (
          <div className="mt-4 pt-4 border-t border-primary-800/60 flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Kütüphaneniz şu anda <strong>Türkiye Yüzyılı Maarif Modeli</strong> müfredat yapısıyla çalışmaktadır.</span>
          </div>
        )}
      </motion.div>

      {/* Main Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center max-w-2xl mx-auto"
      >
        <div className="flex justify-center mb-3">
          <LibraryIcon className="w-10 h-10 text-primary-700" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900 mb-3">Müfredat Kütüphanesi</h1>
        <p className="text-base sm:text-lg text-primary-800/70">
          Ortaokul (5, 6, 7 ve 8. Sınıf) tüm fen bilimleri konuları, sıradanlıktan kurtarılmış "Hikmetli Fen" vizyonuyla yeniden inşa edildi. Sınıfınızı seçerek derin tefekkür okumalarına başlayın.
        </p>
      </motion.div>

      {/* Grade Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {grades.map((grade, i) => {
          const unitCount = grade.units.length;
          const chapterCount = grade.units.reduce((acc, u) => acc + u.chapters.length, 0);

          return (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link 
                to={`/sinif/${grade.id}`}
                className="bg-white rounded-3xl p-7 shadow-xs hover:shadow-xl border border-primary-100 flex flex-col h-full transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-800 flex items-center justify-center text-2xl font-serif font-bold group-hover:bg-primary-800 group-hover:text-white transition-colors">
                    {grade.id}
                  </div>
                  <span className="text-2xs font-semibold px-2.5 py-1 rounded-full bg-primary-100/70 text-primary-800">
                    {unitCount} Ünite • {chapterCount} Konu
                  </span>
                </div>

                <h2 className="text-xl font-serif font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {grade.name}
                </h2>
                
                <p className="text-xs sm:text-sm text-primary-800/70 mb-6 flex-grow leading-relaxed">
                  {grade.description}
                </p>

                <div className="pt-4 border-t border-primary-100/60 flex items-center justify-between text-primary-700 font-semibold text-xs sm:text-sm group-hover:text-primary-900">
                  <span>Üniteleri İncele</span>
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* MAARIF CURRICULUM TREE PREVIEW MODAL */}
      <AnimatePresence>
        {showMaarifModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full border-2 border-primary-200 shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <button
                type="button"
                onClick={() => setShowMaarifModal(false)}
                className="absolute right-5 top-5 text-primary-400 hover:text-primary-800 p-1.5 rounded-full hover:bg-primary-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-amber-800" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary-950">
                    Türkiye Yüzyılı Maarif Modeli Fen Müfredatı
                  </h3>
                  <p className="text-xs text-primary-800/80">
                    5, 6, 7 ve 8. Sınıf Maarif Modeli Üniteleri ve Alt Konuları Listesi
                  </p>
                </div>
              </div>

              {/* Grade Selector Tabs */}
              <div className="grid grid-cols-4 gap-2 mb-4 p-1.5 bg-primary-100/50 rounded-2xl border border-primary-200">
                {MAARIF_MODEL_GRADES.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setActiveTabGrade(g.id)}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                      activeTabGrade === g.id
                        ? 'bg-white text-primary-950 shadow-xs border border-primary-200'
                        : 'text-primary-700 hover:text-primary-950'
                    }`}
                  >
                    {g.id}. Sınıf ({g.units.length} Ünite)
                  </button>
                ))}
              </div>

              {/* Selected Grade Units and Chapters List (Scrollable) */}
              <div className="overflow-y-auto pr-1 space-y-4 flex-grow max-h-[50vh]">
                <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-950 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>{selectedMaarifGrade.name}:</strong> {selectedMaarifGrade.description}
                  </div>
                </div>

                {selectedMaarifGrade.units.map((unit, uIdx) => (
                  <div 
                    key={unit.id}
                    className="p-4 rounded-2xl bg-white border border-primary-200 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {uIdx + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-primary-950">
                        {unit.title}
                      </h4>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 mt-2">
                      {unit.chapters.map((ch, chIdx) => (
                        <div 
                          key={ch.id}
                          className="p-2.5 rounded-xl bg-primary-50/60 border border-primary-100 flex items-start gap-2 text-xs"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-primary-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-primary-950 block">{ch.title}</span>
                            <span className="text-2xs text-primary-700 line-clamp-1">{ch.shortDescription}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-4 mt-4 border-t border-primary-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-2xs text-primary-700">
                  Toplam: {stats.gradeCount} Sınıf Düzeyi • {stats.unitCount} Ünite • {stats.chapterCount} Alt Konu Başlığı
                </div>
                
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setShowMaarifModal(false)}
                    className="px-4 py-2 rounded-xl border border-primary-300 text-primary-800 text-xs font-medium hover:bg-primary-100 transition cursor-pointer"
                  >
                    Kapat
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyMaarif('replace')}
                    className="px-5 py-2 rounded-xl bg-primary-900 hover:bg-primary-800 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Bu Müfredatı Kütüphaneye Otomatik Ekle
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
