import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getStoredGrades, Grade } from '../data/grades';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';

export default function GradeDetail() {
  const { gradeId } = useParams<{ gradeId: string }>();
  const [grades, setGrades] = useState<Grade[]>(getStoredGrades);

  useEffect(() => {
    const handleUpdate = () => {
      setGrades(getStoredGrades());
    };
    window.addEventListener('grades_data_updated', handleUpdate);
    return () => window.removeEventListener('grades_data_updated', handleUpdate);
  }, []);

  const grade = grades.find(g => g.id === gradeId);

  if (!grade) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-serif text-primary-900 mb-4">Sınıf bulunamadı</h1>
        <Link to="/kutuphane" className="text-primary-700 hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4"/> Kütüphaneye Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        to="/kutuphane" 
        className="inline-flex items-center gap-2 text-primary-800/60 hover:text-primary-900 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Sınıf Seçimine Dön
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 font-serif px-3 py-1 rounded-full text-xs font-semibold border border-amber-300">
            <span>🏛️</span>
            Türkiye Yüzyılı Maarif Modeli
          </div>
          <div className="inline-block bg-primary-100 text-primary-900 font-serif px-3 py-1 rounded-full text-xs font-semibold">
            Hikmetli Fen Müfredatı
          </div>
          <span className="text-xs text-primary-600 font-medium">
            {grade.units.length} Ünite • {grade.units.reduce((acc, u) => acc + u.chapters.length, 0)} Konu Başlığı
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-4">{grade.name} Konuları</h1>
        <p className="text-base sm:text-lg text-primary-800/70 border-l-4 border-primary-200 pl-4">{grade.description}</p>
      </motion.div>

      <div className="space-y-12">
        {grade.units.map((unit, uIdx) => (
          <motion.div 
            key={unit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: uIdx * 0.1 }}
          >
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary-800 text-white flex items-center justify-center text-sm">
                {uIdx + 1}
              </span>
              {unit.title}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {unit.chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  to={`/sinif/${grade.id}/bolum/${chapter.id}`}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary-100 hover:shadow-md hover:border-primary-300 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-primary-900 mb-2 group-hover:text-primary-700 transition">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-primary-800/70 mb-4">
                      {chapter.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center text-primary-700 font-medium text-sm">
                    Okumaya Başla
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
