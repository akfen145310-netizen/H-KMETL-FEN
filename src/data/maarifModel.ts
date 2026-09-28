import { Grade } from './grades';
import { ALL_MAARIF_GRADES } from './curriculum';

/**
 * Türkiye Yüzyılı Maarif Modeli
 * 5, 6, 7 ve 8. Sınıf Fen Bilimleri müfredatı.
 * 
 * 5. Sınıf: 7 Ünite, 18 Alt Başlık
 * 6. Sınıf: 7 Ünite, 16 Alt Başlık
 * 7. Sınıf: 7 Ünite, 17 Alt Başlık
 * 8. Sınıf: 7 Ünite, 22 Alt Başlık
 * 
 * Toplam: 28 Ünite, 73 Alt Başlık. Her alt başlık Hikmetli Fen konusunu ve özgün eğitim görsellerini eksiksiz barındırır.
 */
export const MAARIF_MODEL_GRADES: Grade[] = ALL_MAARIF_GRADES;

/**
 * Maarif Modeli üniteleri ve alt konularının istatistiklerini hesaplar
 */
export function getMaarifCurriculumStats() {
  const gradeCount = MAARIF_MODEL_GRADES.length;
  let unitCount = 0;
  let chapterCount = 0;

  for (const grade of MAARIF_MODEL_GRADES) {
    unitCount += grade.units.length;
    for (const unit of grade.units) {
      chapterCount += unit.chapters.length;
    }
  }

  return { gradeCount, unitCount, chapterCount };
}
