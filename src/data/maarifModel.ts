import { Grade } from './grades';
import { ALL_MAARIF_GRADES } from './curriculum';

/**
 * Türkiye Yüzyılı Maarif Modeli ve Fenbilim.net müfredatına tam uyumlu
 * 5, 6, 7 ve 8. Sınıf Fen Bilimleri müfredatı.
 * 
 * 5. Sınıf: 7 Ünite, 18 Alt Başlık (https://www.fenbilim.net/2017/12/5-sinif-fen-bilimleri-konulari.html)
 * 6. Sınıf: 7 Ünite, 16 Alt Başlık (https://www.fenbilim.net/2017/12/6-sinif-fen-bilimleri-konulari.html)
 * 7. Sınıf: 7 Ünite, 17 Alt Başlık (https://www.fenbilim.net/2015/09/fen-bilimleri-7-sinif-konulari.html)
 * 8. Sınıf: 7 Ünite, 22 Alt Başlık (https://www.fenbilim.net/2017/12/8-sinif-fen-bilimleri-konulari.html)
 * 
 * Toplam: 28 Ünite, 73 Alt Başlık. Her alt başlık Hikmetli Fen konusunu eksiksiz barındırır.
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
