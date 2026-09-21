import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  ExternalLink, 
  RotateCcw, 
  Copy, 
  Check, 
  Library, 
  Edit3, 
  Eye, 
  Layers, 
  ChevronRight, 
  AlertCircle, 
  Globe, 
  FileText, 
  Table as TableIcon, 
  Image as ImageIcon, 
  HelpCircle, 
  X,
  Compass,
  ShieldCheck,
  CheckSquare,
  Info,
  Sliders,
  Award,
  Scroll,
  CheckCircle,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { rewriteScienceText, analyzeAndRewriteWebLink, WebRewriteResult } from '../services/geminiService';
import { scrapeWebPage, ScrapedPageData } from '../services/webScraper';
import { HikmetliImage } from '../components/HikmetliImage';
import { HikmetliTableWrapper } from '../components/HikmetliTableWrapper';
import { 
  getStoredGrades, 
  updateChapterContent, 
  resetChapterToDefault, 
  applyMaarifCurriculum,
  isMaarifModelActive,
  Grade, 
  UpdateChapterResult 
} from '../data/grades';
import {
  RISALE_I_NUR_10_ASAMA,
  HIKMETLI_YORUM_KURALLARI,
  auditHikmetliCompliance,
  autoEnforceHikmetliCompliance,
  ComplianceAuditResult
} from '../utils/hikmetliRules';

export default function Converter() {
  // Mode: 'url' (web link) or 'text' (manual text paste)
  const [inputMode, setInputMode] = useState<'url' | 'text'>('url');
  
  // Target grade level selection (auto, 5, 6, 7, 8) for pedagogical alignment
  const [targetGrade, setTargetGrade] = useState<string>('auto');

  // Rules guide and modal states
  const [showRulesBanner, setShowRulesBanner] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  
  // Input fields
  const [inputUrl, setInputUrl] = useState('');
  const [inputText, setInputText] = useState('');
  
  // Output and processing states
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isEditingOutput, setIsEditingOutput] = useState(false);

  // Link analysis metadata from AI
  const [aiAnalysisResult, setAiAnalysisResult] = useState<WebRewriteResult | null>(null);
  const [scrapedData, setScrapedData] = useState<ScrapedPageData | null>(null);

  // Grades and chapter selection state (NO automatic updating - requires explicit confirmation)
  const [grades, setGrades] = useState<Grade[]>(getStoredGrades);
  const [isMaarif, setIsMaarif] = useState<boolean>(isMaarifModelActive);
  const [selectedGradeId, setSelectedGradeId] = useState<string>('');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');
  
  // Confirmation Modal state
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [updateResult, setUpdateResult] = useState<UpdateChapterResult | null>(null);
  const [lastUpdatedChapter, setLastUpdatedChapter] = useState<{ gradeId: string; chapterId: string } | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  // Sync grades whenever custom event fires
  useEffect(() => {
    const handleUpdate = () => {
      setGrades(getStoredGrades());
      setIsMaarif(isMaarifModelActive());
    };
    window.addEventListener('grades_data_updated', handleUpdate);
    return () => window.removeEventListener('grades_data_updated', handleUpdate);
  }, []);

  // Dismiss notification after 6 seconds
  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => setNotificationMessage(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  // Handle URL Conversion
  const handleConvertUrl = async () => {
    if (!inputUrl.trim()) return;

    setIsLoading(true);
    setLoadingStepText('Web sayfası taranıyor ve tablolar / görseller taranıyor...');
    setError('');
    setAiAnalysisResult(null);
    setScrapedData(null);
    setUpdateResult(null);
    setNotificationMessage(null);

    try {
      // Step 1: Scrape Web Page
      const scraped = await scrapeWebPage(inputUrl);
      setScrapedData(scraped);

      // Step 2: Analyze with Gemini AI
      setLoadingStepText(
        `Konu 10 aşamalı Risale-i Nur mantığıyla inceleniyor (${scraped.tables.length} tablo ve ${scraped.images.length} görsel taranıyor)...`
      );
      const preferredGrade = targetGrade === 'auto' ? undefined : targetGrade;
      const analysis = await analyzeAndRewriteWebLink(scraped, preferredGrade);
      setAiAnalysisResult(analysis);
      setOutputText(analysis.hikmetliContent);

      // Auto-suggest grade if detected (or respect user choice)
      const effectiveGrade = preferredGrade || analysis.detectedGrade;
      if (effectiveGrade && ['5', '6', '7', '8'].includes(effectiveGrade)) {
        const matchingGrade = grades.find((g) => g.id === effectiveGrade);
        if (matchingGrade) {
          setSelectedGradeId(matchingGrade.id);

          // Check if there is a chapter title that closely matches detectedTopic
          const allChapters = matchingGrade.units.flatMap((u) => u.chapters);
          const matchedChapter = allChapters.find((c) =>
            c.title.toLowerCase().includes(analysis.detectedTopic.toLowerCase()) ||
            analysis.detectedTopic.toLowerCase().includes(c.title.toLowerCase())
          );
          if (matchedChapter) {
            setSelectedChapterId(matchedChapter.id);
          }
        }
      }
    } catch (err: any) {
      console.error('URL Convert Error:', err);
      setError(err.message || 'Web sitesi incelenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
      setLoadingStepText('');
    }
  };

  // Handle Text Conversion
  const handleConvertText = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setLoadingStepText('Metin 10 aşamalı Risale-i Nur tefekkür mantığı ve iki katmanlı ("Nasıl?" & "Neden?") izahla inşa ediliyor...');
    setError('');
    setAiAnalysisResult(null);
    setScrapedData(null);
    setUpdateResult(null);
    setNotificationMessage(null);

    try {
      const preferredGrade = targetGrade === 'auto' ? undefined : targetGrade;
      const result = await rewriteScienceText(inputText, preferredGrade);
      setOutputText(result);
      if (preferredGrade) {
        setSelectedGradeId(preferredGrade);
      }
    } catch (err: any) {
      console.error('Text Convert Error:', err);
      setError(err.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
      setLoadingStepText('');
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Grade selection handler
  const handleGradeChange = (gradeId: string) => {
    setSelectedGradeId(gradeId);
    setSelectedChapterId(''); // Reset chapter when grade changes
    setUpdateResult(null);
  };

  // Chapter selection handler (Does NOT automatically save anymore!)
  const handleChapterChange = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setUpdateResult(null);
  };

  // Prepare confirmation prompt details
  const activeGrade = grades.find((g) => g.id === selectedGradeId);
  const activeUnit = activeGrade?.units.find((u) => u.chapters.some((c) => c.id === selectedChapterId));
  const activeChapter = activeUnit?.chapters.find((c) => c.id === selectedChapterId);

  // Exact confirmation question as requested:
  // "Hikmetli fen çıktısı seçtiğiniz [X] konu olarak kütüphaneye eklenecektir. Onaylıyor musunuz?"
  const confirmationPromptText = activeChapter
    ? `Hikmetli fen çıktısı seçtiğiniz "${activeGrade?.name} > ${activeUnit?.title} > ${activeChapter.title}" konusu olarak kütüphaneye eklenecektir. Onaylıyor musunuz?`
    : '';

  // Trigger Confirmation Modal
  const handleInitiateAdd = () => {
    if (!selectedGradeId || !selectedChapterId || !outputText.trim()) {
      setError('Lütfen kütüphaneye eklemek için önce bir sınıf ve konu seçin.');
      return;
    }
    setError('');
    setShowConfirmModal(true);
  };

  // Apply update to library AFTER user confirms
  const handleConfirmAddToLibrary = () => {
    if (!selectedGradeId || !selectedChapterId || !outputText.trim()) return;

    const res = updateChapterContent(selectedGradeId, selectedChapterId, outputText);
    if (res.success) {
      setUpdateResult(res);
      setLastUpdatedChapter({ gradeId: selectedGradeId, chapterId: selectedChapterId });
      setNotificationMessage(
        `"${res.chapterTitle}" konusu seçtiğiniz kütüphane bölümüne başarıyla eklendi ve kaydedildi.`
      );
      setError('');
    } else {
      setError(res.error || 'Bölüm güncellenemedi.');
    }
    setShowConfirmModal(false);
  };

  // Revert back to default original content
  const handleRevert = () => {
    if (!lastUpdatedChapter) return;
    if (window.confirm('Bu bölümün içeriğini orijinal varsayılan metne geri döndürmek istediğinizden emin misiniz?')) {
      const success = resetChapterToDefault(lastUpdatedChapter.gradeId, lastUpdatedChapter.chapterId);
      if (success) {
        setUpdateResult(null);
        setLastUpdatedChapter(null);
        setNotificationMessage('Bölüm orijinal varsayılan içeriğine geri döndürüldü.');
      }
    }
  };

  // Real-time compliance audit for the output text
  const auditResult: ComplianceAuditResult = auditHikmetliCompliance(outputText);

  // Auto-enforce 100% compliance if any standard was missing
  const handleAutoEnforce = () => {
    if (!outputText.trim()) return;
    const enforced = autoEnforceHikmetliCompliance(outputText, aiAnalysisResult?.detectedTopic || 'Fen Konusu');
    setOutputText(enforced);
    setNotificationMessage('Metin Hikmetli Yorum Çıktısı Kurallarına %100 uyumlu hale getirildi (Mukaddime, Hikmet Pencereleri, Hülasa).');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-900 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-primary-700" />
          Hikmetli Fen Yapay Zekâ Editörü
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary-900 mb-4">
          Hikmetli Çevirmen & Kütüphane Aktarıcı
        </h1>
        <p className="text-base sm:text-lg text-primary-800/80 max-w-2xl mx-auto">
          İster bir eğitim web sitesi linki girin, ister sıradan fen metni yapıştırın. Yapay zeka konuyu tanır, tablolardaki şablonu korur ve görselleri tefekkür penceresinden inceleyerek kütüphanenize hazır hale getirir.
        </p>
      </div>

      {/* Rules Guide Bar - 10 Aşamalı Risale-i Nur Düşünce Örgüsü */}
      <div className="mb-8 bg-white border border-primary-200 rounded-2xl shadow-xs overflow-hidden">
        <div 
          onClick={() => setShowRulesBanner(!showRulesBanner)}
          className="w-full flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-primary-50 to-amber-50/50 hover:bg-primary-100/50 transition cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <Scroll className="w-5 h-5 text-amber-800" />
            </div>
            <div className="text-left">
              <h2 className="text-base sm:text-lg font-serif font-bold text-primary-950 flex items-center gap-2">
                10 Aşamalı Risale-i Nur Düşünce Örgüsü
                <span className="text-xs font-sans font-semibold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  10 Aşama & İki Katmanlı İzah ("Nasıl?" ve "Neden?")
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-primary-800/80">
                Varlığı Tanıt → Parçalarını Göster → Vazifesini Anlat → Uyum → Ölçü → Benzetme → Hikmet → İrade/Sanat → Akıl Yürütme → Sonuç
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowRulesModal(true);
              }}
              className="text-xs font-semibold text-primary-900 bg-white hover:bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-300 transition shadow-2xs hidden sm:inline-flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-primary-700" />
              10 Aşamayı Detaylı İncele
            </button>
            <span className="text-xs font-medium text-primary-700 bg-primary-200/60 px-2 py-1 rounded-md">
              {showRulesBanner ? 'Gizle ▲' : 'Aşamaları Gör ▼'}
            </span>
          </div>
        </div>

        {/* Expandable Accordion Body */}
        {showRulesBanner && (
          <div className="p-5 sm:p-6 bg-white border-t border-primary-200 grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs text-primary-900">
            {RISALE_I_NUR_10_ASAMA.map((stage) => (
              <div key={stage.id} className="p-3.5 rounded-xl bg-primary-50/70 border border-primary-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold font-serif text-primary-950 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-2xs flex items-center justify-center font-sans font-bold shrink-0">
                      {stage.stageNumber}
                    </span>
                    <span className="line-clamp-1">{stage.title.split('—')[1]?.trim() || stage.title}</span>
                  </div>
                  <p className="text-primary-800/80 leading-relaxed mb-2 text-2xs">
                    {stage.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-primary-200/60 text-3xs font-medium text-primary-700 italic">
                  "{stage.question}"
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Target Grade Selector (Pedagojik Seviye Ayarı) */}
      <div className="mb-6 bg-white border border-primary-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-100 text-primary-900 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-primary-800" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-primary-950 flex items-center gap-2">
              Pedagojik Anlatım Seviyesi
              <span className="text-2xs font-sans font-normal text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-200">
                Risale-i Nur Ders Seviyesi
              </span>
            </h3>
            <p className="text-xs text-primary-800/80">
              Konu anlatım dili, benzetmeler ve tefekkür derinliği seçilen sınıf düzeyine otomatik uyarlanır.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-primary-50/80 p-1.5 rounded-xl border border-primary-200">
          {[
            { id: 'auto', label: '✨ Otomatik Tespit', hint: 'Metinden / linkten anla' },
            { id: '5', label: '5. Sınıf', hint: 'Somut ve hayret uyandıran dil' },
            { id: '6', label: '6. Sınıf', hint: 'Sistemler ve fabrika temsili' },
            { id: '7', label: '7. Sınıf', hint: 'Mikro/makro mizan ve ayna' },
            { id: '8', label: '8. Sınıf', hint: 'DNA, olasılık ve program' }
          ].map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setTargetGrade(g.id)}
              title={g.hint}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                targetGrade === g.id
                  ? 'bg-primary-900 text-white shadow-xs'
                  : 'text-primary-800 hover:bg-white hover:text-primary-950'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Source Input (URL or Text) & Output Text */}
      <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-10">
        {/* Input Column */}
        <div className="flex flex-col">
          {/* Tabs: Web Sitesi Linki vs Metin Yapıştır */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex bg-primary-100/80 p-1 rounded-xl border border-primary-200">
              <button
                type="button"
                onClick={() => setInputMode('url')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  inputMode === 'url'
                    ? 'bg-white text-primary-900 shadow-xs'
                    : 'text-primary-800/70 hover:text-primary-900'
                }`}
              >
                <Globe className="w-4 h-4 text-primary-700" />
                Web Sitesi Linki (URL)
              </button>
              <button
                type="button"
                onClick={() => setInputMode('text')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  inputMode === 'text'
                    ? 'bg-white text-primary-900 shadow-xs'
                    : 'text-primary-800/70 hover:text-primary-900'
                }`}
              >
                <FileText className="w-4 h-4 text-primary-700" />
                Metin Yapıştır
              </button>
            </div>

            <span className="text-xs text-primary-800/60 font-medium">
              {inputMode === 'url' ? 'Otomatik Konu & Tablo Tespiti' : 'Doğrudan Metin Dönüştürme'}
            </span>
          </div>

          {/* Mode 1: Web Sitesi Linki Girişi */}
          {inputMode === 'url' ? (
            <div className="flex-grow flex flex-col justify-between p-5 rounded-2xl border-2 border-primary-200 bg-white shadow-xs min-h-[380px]">
              <div>
                <label className="block text-sm font-bold text-primary-900 mb-2 font-serif">
                  Dönüştürülecek Web Sayfası Bağlantısı (URL):
                </label>
                <div className="relative mb-3">
                  <Globe className="w-5 h-5 absolute left-3.5 top-3.5 text-primary-400" />
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://www.fenbilim.net/2020/09/5-sinif-gunes-dunya-ve-ay.html"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-primary-300 focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 text-sm text-primary-900 placeholder:text-primary-400 font-sans"
                  />
                </div>

                {/* Quick Samples */}
                <div className="mt-4 p-3.5 bg-primary-50/70 rounded-xl border border-primary-100">
                  <span className="text-xs font-bold text-primary-800/80 block mb-2">
                    💡 Hızlı Test Linkleri (Tıklayıp Deneyin):
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => setInputUrl('https://www.fenbilim.net/2017/07/5-sinif-gunesin-yapisi-ve-ozellikleri.html')}
                      className="text-left text-xs text-primary-900 hover:text-primary-950 font-medium p-1.5 rounded-lg hover:bg-white transition cursor-pointer flex items-center justify-between"
                    >
                      <span>☀️ 5. Sınıf: Güneş'in Yapısı ve Özellikleri</span>
                      <span className="text-[10px] text-primary-500 font-mono">fenbilim.net</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputUrl('https://www.fenbilim.net/2017/07/5-sinif-ayin-hareketleri-ve-evreleri.html')}
                      className="text-left text-xs text-primary-900 hover:text-primary-950 font-medium p-1.5 rounded-lg hover:bg-white transition cursor-pointer flex items-center justify-between"
                    >
                      <span>🌙 5. Sınıf: Ay'ın Hareketleri ve Evreleri</span>
                      <span className="text-[10px] text-primary-500 font-mono">fenbilim.net</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputUrl('https://www.fenbilim.net/2015/03/5-sinif-surtunme-kuvveti.html')}
                      className="text-left text-xs text-primary-900 hover:text-primary-950 font-medium p-1.5 rounded-lg hover:bg-white transition cursor-pointer flex items-center justify-between"
                    >
                      <span>⚖️ 5. Sınıf: Sürtünme Kuvveti</span>
                      <span className="text-[10px] text-primary-500 font-mono">fenbilim.net</span>
                    </button>
                  </div>
                </div>

                {/* Information Box */}
                <div className="mt-4 p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 text-xs text-amber-950 leading-relaxed flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Yapay Zeka Analiz Özellikleri:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-amber-900/90">
                      <li>Sayfa konusunu ve sınıf seviyesini otomatik tanır.</li>
                      <li>Sayfadaki tabloları bulur ve tablo şablonunu birebir koruyarak hikmet diliyle doldurur.</li>
                      <li>Görselleri tespit eder ve her görsele hikmetli tefekkür yorumu ekler.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* URL Analyze Button */}
              <button
                onClick={handleConvertUrl}
                disabled={!inputUrl.trim() || isLoading}
                className="mt-6 w-full bg-primary-900 text-white font-medium py-3.5 px-6 rounded-xl hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-md cursor-pointer text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{loadingStepText || 'İnceleniyor...'}</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-5 h-5 text-amber-300" />
                    Linki İncele ve Hikmet Diline Çevir
                    <ArrowRight className="w-5 h-5 hidden sm:block" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Mode 2: Metin Yapıştırma */
            <div className="flex-grow flex flex-col justify-between">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Örn: Katı maddeler ısı aldığında taneciklerin titreşimi artar ve genleşirler. Isı verdiklerinde ise büzülürler... (İçerisinde tablo veya karşılaştırma varsa şablonu aynen korunacaktır)"
                className="flex-grow min-h-[380px] w-full p-5 rounded-2xl border-2 border-primary-200 bg-white focus:outline-none focus:border-primary-800 focus:ring-1 focus:ring-primary-800 resize-none font-sans text-primary-900 shadow-xs leading-relaxed text-sm sm:text-base"
              />

              <button
                onClick={handleConvertText}
                disabled={!inputText.trim() || isLoading}
                className="mt-4 w-full bg-primary-900 text-white font-medium py-4 px-6 rounded-2xl hover:bg-primary-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-md cursor-pointer text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{loadingStepText || 'Hikmet Diline Dönüştürülüyor...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    Hikmet Diline Çevir
                    <ArrowRight className="w-5 h-5 hidden sm:block" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Output Column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-primary-900 font-serif font-bold text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-sans font-bold">2</span>
              Hikmetli Yorum (Çıktı)
            </label>
            
            <div className="flex items-center gap-2">
              {outputText && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditingOutput(!isEditingOutput)}
                    className="inline-flex items-center gap-1.5 text-xs text-primary-800 hover:text-primary-950 bg-primary-100/70 hover:bg-primary-100 px-2.5 py-1.5 rounded-lg border border-primary-200 font-medium transition cursor-pointer"
                  >
                    {isEditingOutput ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        Önizle
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3.5 h-3.5" />
                        Metni Düzenle
                      </>
                    )}
                  </button>

                  <button 
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-primary-800 hover:text-primary-950 bg-primary-100/70 hover:bg-primary-100 px-2.5 py-1.5 rounded-lg border border-primary-200 font-medium transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Kopyalandı' : 'Kopyala'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* AI Recognition Badge if link was analyzed */}
          {aiAnalysisResult && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-3 bg-amber-50/80 border border-amber-300/80 rounded-xl text-xs text-amber-950 flex flex-wrap items-center justify-between gap-2 shadow-2xs"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold font-serif text-sm flex items-center gap-1.5 text-primary-950">
                  <Compass className="w-4 h-4 text-amber-700" />
                  Tanınan Konu: {aiAnalysisResult.detectedTopic}
                </span>
                {aiAnalysisResult.detectedGrade && (
                  <span className="bg-primary-900 text-white font-semibold px-2 py-0.5 rounded-md">
                    {aiAnalysisResult.detectedGrade}. Sınıf
                  </span>
                )}
                {aiAnalysisResult.tablesProcessedCount > 0 && (
                  <span className="bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <TableIcon className="w-3 h-3 text-emerald-700" />
                    {aiAnalysisResult.tablesProcessedCount} Tablo Şablonu Korundu
                  </span>
                )}
                {aiAnalysisResult.imagesProcessedCount > 0 && (
                  <span className="bg-blue-100 text-blue-900 font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-blue-700" />
                    {aiAnalysisResult.imagesProcessedCount} Görsel İncelendi
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* Compliance Status & Enforce Bar when output exists */}
          {outputText && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-3 bg-white border border-primary-200 rounded-xl shadow-2xs flex flex-wrap items-center justify-between gap-2.5"
            >
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                  auditResult.isFullyCompliant 
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300' 
                    : 'bg-amber-50 text-amber-950 border border-amber-300'
                }`}>
                  <ShieldCheck className={`w-4 h-4 ${auditResult.isFullyCompliant ? 'text-emerald-600' : 'text-amber-600'}`} />
                  Hikmet Kurallarına Uyum: %{auditResult.score} {auditResult.isFullyCompliant ? '✓ (Tam Uyumlu)' : '(İnceleyiniz)'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowRulesModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-900 bg-primary-100/70 hover:bg-primary-100 px-3 py-1.5 rounded-lg border border-primary-200 transition cursor-pointer"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-primary-700" />
                  Kural Raporu
                </button>

                {!auditResult.isFullyCompliant && (
                  <button
                    type="button"
                    onClick={handleAutoEnforce}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-primary-900 hover:bg-primary-800 px-3 py-1.5 rounded-lg transition shadow-2xs cursor-pointer"
                    title="Eksik Mukaddime, Hikmet Penceresi veya Hülasa kısımlarını yapılandırıp %100 uyumlu kılar."
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Kurallarla Güçlendir (%100)
                  </button>
                )}
              </div>
            </motion.div>
          )}

          <div className="flex-grow min-h-[380px] w-full p-5 md:p-7 rounded-2xl border-2 border-primary-200 bg-white shadow-xs overflow-y-auto max-h-[500px]">
            {error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm leading-relaxed flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold mb-1">İşlem Hatası:</strong>
                  {error}
                </div>
              </div>
            ) : isEditingOutput ? (
              <textarea
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                placeholder="Çıktı metnini buradan düzenleyebilirsiniz..."
                className="w-full h-full min-h-[340px] focus:outline-none font-mono text-sm text-primary-950 leading-relaxed resize-none"
              />
            ) : outputText ? (
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
                  }}
                >
                  {outputText}
                </Markdown>
              </div>
            ) : (
              <div className="h-full min-h-[340px] flex flex-col items-center justify-center text-primary-800/40 italic font-serif text-center px-4">
                <Sparkles className="w-12 h-12 mb-3 opacity-25 text-primary-700" />
                <p className="max-w-sm">
                  "Çevrilen hikmetli metin burada görünecektir. Tablo şablonları korunur, görseller tefekkür yorumlarıyla işlenir. Ardından aşağıdan onaylayarak kütüphanenize ekleyebilirsiniz."
                </p>
              </div>
            )}
          </div>

          {outputText && (
            <div className="mt-2 text-xs text-primary-800/60 text-right">
              {outputText.split(/\s+/).filter(Boolean).length} kelime | Tablolar & görseller hazır
            </div>
          )}
        </div>
      </div>

      {/* SELECTION AREA: Choose Grade and Chapter & Confirm Before Adding */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-primary-200 shadow-md"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-primary-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-900 flex items-center justify-center shadow-xs">
              <Library className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary-900 flex items-center gap-2">
                Kütüphanede Eklenecek Bölümü Seçin
              </h2>
              <p className="text-sm text-primary-800/70">
                Otomatik ekleme yapılmaz. Sınıf ve konuyu siz seçersiniz, ardından onayınızla kütüphaneye kaydedilir.
              </p>
            </div>
          </div>

          {/* Quick AI suggestion button if available */}
          {aiAnalysisResult && activeChapter && (
            <div className="bg-amber-50 border border-amber-300/80 px-4 py-2 rounded-2xl text-xs font-semibold text-amber-950 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Yapay zeka eşleşmesi: {activeChapter.title}</span>
            </div>
          )}
        </div>

        {/* Step 1: Grade Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <label className="text-primary-900 font-serif font-bold text-base sm:text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-900 text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
              Hedef Sınıf Seviyesini Seçin
            </label>
            <div className="flex items-center gap-2">
              {isMaarif ? (
                <span className="inline-flex items-center gap-1 text-2xs text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 font-semibold">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  Maarif Modeli Aktif
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    applyMaarifCurriculum('replace');
                    setGrades(getStoredGrades());
                    setIsMaarif(true);
                    setNotificationMessage("Maarif Modeli müfredatı başarıyla yüklendi!");
                  }}
                  className="inline-flex items-center gap-1 text-2xs text-amber-950 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg border border-amber-300 font-semibold transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Maarif Müfredatını Yükle
                </button>
              )}
              {selectedGradeId && (
                <span className="text-xs font-semibold text-primary-800 bg-primary-50 px-2.5 py-1 rounded-md border border-primary-200">
                  Seçili: {grades.find((g) => g.id === selectedGradeId)?.name}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {grades.map((grade) => {
              const isSelected = selectedGradeId === grade.id;
              const totalChapters = grade.units.reduce((acc, u) => acc + u.chapters.length, 0);

              return (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => handleGradeChange(grade.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary-900 bg-primary-900 text-white shadow-md scale-[1.02]'
                      : 'border-primary-200 bg-primary-50/40 hover:bg-primary-100/60 text-primary-900 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-lg sm:text-xl">{grade.name}</span>
                    {isSelected ? (
                      <Check className="w-5 h-5 text-amber-300" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-primary-400" />
                    )}
                  </div>
                  <span className={`text-xs block font-medium ${isSelected ? 'text-primary-200' : 'text-primary-800/60'}`}>
                    {grade.units.length} Ünite · {totalChapters} Konu
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Chapter Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-primary-900 font-serif font-bold text-base sm:text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary-900 text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
              Hedef Konuyu (Bölümü) Seçin
            </label>
            {activeChapter && (
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Seçilen Konu: {activeChapter.title}
              </span>
            )}
          </div>
          
          {!selectedGradeId ? (
            <div className="p-8 bg-primary-50/50 rounded-2xl border-2 border-dashed border-primary-200 text-center text-primary-800/60 italic font-serif">
              <Layers className="w-8 h-8 mx-auto mb-2 text-primary-400 opacity-60" />
              Lütfen önce yukarıdaki 1. Adım'dan bir sınıf seçin. Sınıf seçildiğinde o sınıfa ait tüm üniteler ve konular burada açılacaktır.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Dropdown select */}
              <div>
                <select
                  value={selectedChapterId}
                  onChange={(e) => handleChapterChange(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-primary-300 bg-white font-serif text-primary-900 text-base focus:outline-none focus:border-primary-900 focus:ring-1 focus:ring-primary-900 shadow-xs cursor-pointer"
                >
                  <option value="">-- Bir konu seçin --</option>
                  {activeGrade?.units.map((unit) => (
                    <optgroup key={unit.id} label={`📖 ${unit.title}`}>
                      {unit.chapters.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>
                          {chapter.title}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Visual Chapter Grid / List for interactive selection */}
              <div className="bg-primary-50/50 p-4 sm:p-5 rounded-2xl border border-primary-200 max-h-72 overflow-y-auto space-y-3">
                <div className="text-xs font-bold text-primary-800/70 uppercase tracking-wider mb-1">
                  Veya aşağıdaki ünitelerden konuya doğrudan tıklayarak seçin:
                </div>

                {activeGrade?.units.map((unit, uIdx) => (
                  <div key={unit.id} className="bg-white p-3.5 rounded-xl border border-primary-100 shadow-2xs">
                    <div className="text-xs font-bold text-primary-900 mb-2.5 font-serif flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-800 text-[10px] flex items-center justify-center font-sans font-bold">
                        {uIdx + 1}
                      </span>
                      {unit.title}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {unit.chapters.map((ch) => {
                        const isChSelected = selectedChapterId === ch.id;
                        return (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => handleChapterChange(ch.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-2 text-left ${
                              isChSelected
                                ? 'bg-primary-900 text-white shadow-sm ring-2 ring-primary-900 ring-offset-1'
                                : 'bg-primary-50 text-primary-900 hover:bg-primary-100 border border-primary-200/70'
                            }`}
                          >
                            {isChSelected && <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                            <span>{ch.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action & Status Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-primary-100">
          <div className="text-sm">
            {outputText.trim() ? (
              <span className="text-emerald-700 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 
                Hikmet diline çevrilmiş metin hazır. Konuyu seçtikten sonra 'Kütüphaneye Ekle' butonuna basarak onaylayabilirsiniz.
              </span>
            ) : (
              <span className="text-amber-800 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Önce yukarıdaki linki veya metni dönüştürün.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleInitiateAdd}
              disabled={!selectedGradeId || !selectedChapterId || !outputText.trim()}
              className="w-full sm:w-auto bg-primary-900 text-white font-medium px-7 py-3.5 rounded-xl hover:bg-primary-800 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-md cursor-pointer whitespace-nowrap text-base"
            >
              <BookOpen className="w-5 h-5" />
              Kütüphaneye Ekle
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        <AnimatePresence>
          {notificationMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3.5 bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs sm:text-sm rounded-xl font-medium flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                {notificationMessage}
              </span>
              <button 
                onClick={() => setNotificationMessage(null)}
                className="text-emerald-800 hover:text-emerald-950 font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Card */}
        <AnimatePresence>
          {updateResult && updateResult.success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              className="mt-6 p-6 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shrink-0 mt-0.5 md:mt-0 shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-emerald-950 font-serif">
                    Kütüphanedeki Konu Başarıyla Değiştirildi!
                  </h4>
                  <p className="text-sm text-emerald-900/90 mt-1 leading-relaxed">
                    <strong>{updateResult.gradeName}</strong> &gt; <strong>{updateResult.unitTitle}</strong> &gt; <strong className="text-emerald-950 underline">"{updateResult.chapterTitle}"</strong> konusunun içeriği, dönüştürdüğünüz yeni Hikmet Dili ile güncellendi ve kütüphaneye kaydedildi.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
                {lastUpdatedChapter && (
                  <button
                    onClick={handleRevert}
                    title="Yapılan bu değişikliği geri alıp orijinal ders metnine döndürür"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-emerald-800 bg-white hover:bg-emerald-100 rounded-xl border border-emerald-300 transition cursor-pointer shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Orijinale Geri Al
                  </button>
                )}

                {lastUpdatedChapter && (
                  <Link
                    to={`/sinif/${lastUpdatedChapter.gradeId}/bolum/${lastUpdatedChapter.chapterId}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition cursor-pointer whitespace-nowrap"
                  >
                    Bölümü Kütüphanede Gör
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* CONFIRMATION MODAL - Explicit confirmation dialog required by user */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-primary-200 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="absolute right-5 top-5 text-primary-400 hover:text-primary-800 p-1.5 rounded-full hover:bg-primary-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-amber-800" />
              </div>

              <h3 className="text-xl font-serif font-bold text-primary-900 mb-2">
                Kütüphaneye Ekleme Onayı
              </h3>

              {/* Exact phrasing required by user */}
              <div className="p-4 bg-primary-50 rounded-2xl border border-primary-200 my-4 text-primary-950 font-serif text-base sm:text-lg leading-relaxed">
                "{confirmationPromptText}"
              </div>

              <p className="text-xs text-primary-700/80 mb-6">
                Onayladığınızda bu konunun kütüphanedeki mevcut metni, yeni oluşturulan hikmetli içerikle değiştirilecektir. Dilediğiniz zaman "Orijinale Geri Al" ile eski haline getirebilirsiniz.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-primary-300 text-primary-800 font-medium text-sm hover:bg-primary-100 transition cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAddToLibrary}
                  className="px-6 py-2.5 rounded-xl bg-primary-900 hover:bg-primary-800 text-white font-semibold text-sm transition flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Check className="w-4 h-4 text-amber-300" />
                  Evet, Onaylıyorum ve Kütüphaneye Ekle
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HIKMETLI YORUM KURALLARI & AUDIT MODAL */}
      <AnimatePresence>
        {showRulesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-2 border-primary-200 shadow-2xl relative max-h-[90vh] flex flex-col"
            >
              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="absolute right-5 top-5 text-primary-400 hover:text-primary-800 p-1.5 rounded-full hover:bg-primary-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-amber-800" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-primary-950">
                    10 Aşamalı Risale-i Nur Düşünce Örgüsü
                  </h3>
                  <p className="text-xs text-primary-800/80">
                    Kainat Kitabı (Mana-i Harfi), İki Katmanlı İzah ("Nasıl?" ve "Neden?") ve Pedagojik Seviye İlkeleri
                  </p>
                </div>
              </div>

              {/* Compliance Score Bar if output exists */}
              {outputText && (
                <div className="mb-4 p-4 rounded-2xl bg-primary-50 border border-primary-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-primary-800 uppercase tracking-wider">
                      Mevcut Çıktının Uyum Puanı
                    </div>
                    <div className="text-2xl font-bold font-serif text-primary-950 flex items-center gap-2 mt-0.5">
                      %{auditResult.score}
                      <span className={`text-xs font-sans px-2.5 py-0.5 rounded-full font-semibold ${
                        auditResult.isFullyCompliant ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-950'
                      }`}>
                        {auditResult.isFullyCompliant ? '✓ Tüm Standartlar Karşılandı' : 'İyileştirme Yapılabilir'}
                      </span>
                    </div>
                  </div>

                  {!auditResult.isFullyCompliant && (
                    <button
                      type="button"
                      onClick={() => {
                        handleAutoEnforce();
                      }}
                      className="px-4 py-2 bg-primary-900 hover:bg-primary-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Metni %100 Uyumlu Kıl
                    </button>
                  )}
                </div>
              )}

              {/* Rules List (Scrollable) */}
              <div className="overflow-y-auto pr-1 space-y-3 flex-grow max-h-[50vh]">
                {(outputText ? auditResult.checklist : HIKMETLI_YORUM_KURALLARI.map(r => ({ rule: r, satisfied: true, feedback: r.description }))).map((item, idx) => (
                  <div 
                    key={item.rule.id}
                    className={`p-3.5 rounded-2xl border transition ${
                      item.satisfied 
                        ? 'bg-white border-primary-200' 
                        : 'bg-amber-50/50 border-amber-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 font-serif font-bold text-primary-950 text-sm">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-2xs flex items-center justify-center font-sans font-bold shrink-0">
                          {item.rule.number}
                        </span>
                        {item.rule.title}
                      </div>

                      {outputText && (
                        <span className={`text-2xs font-semibold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1 ${
                          item.satisfied 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {item.satisfied ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              Uyumlu
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              Eksik
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-primary-800/90 leading-relaxed mb-2">
                      {item.rule.description}
                    </p>

                    <div className="text-2xs text-primary-700 bg-primary-50/60 p-2 rounded-lg border border-primary-200/50">
                      <strong>Kural Şartı:</strong> {item.rule.requirement}
                    </div>

                    {outputText && !item.satisfied && (
                      <div className="mt-2 text-2xs text-amber-900 bg-amber-100/60 p-2 rounded-lg border border-amber-200 font-medium">
                        ⚠️ <strong>Öneri:</strong> {item.feedback}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 mt-4 border-t border-primary-200 flex items-center justify-between">
                <div className="text-2xs text-primary-700/80">
                  Hikmetli Fen Yapay Zekâ Müfredat Standartları v4.0
                </div>
                <button
                  type="button"
                  onClick={() => setShowRulesModal(false)}
                  className="px-5 py-2 rounded-xl bg-primary-900 hover:bg-primary-800 text-white font-semibold text-xs transition cursor-pointer"
                >
                  Tamam, Anladım
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
