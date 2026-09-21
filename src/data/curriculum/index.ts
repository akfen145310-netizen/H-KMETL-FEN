import { Grade } from '../grades';
import { GRADE_5_CURRICULUM } from './grade5';
import { GRADE_6_CURRICULUM } from './grade6';
import { GRADE_7_CURRICULUM } from './grade7';
import { GRADE_8_CURRICULUM } from './grade8';

/**
 * Türkiye Yüzyılı Maarif Modeli ve Fenbilim.net müfredatına tam uyumlu
 * 5, 6, 7 ve 8. Sınıf Fen Bilimleri ünite ve alt konu başlıkları kütüphanesi.
 * Toplam 28 Ünite ve 73 Alt Başlığın tamamı Hikmetli Fen içerikleriyle eksiksiz donatılmıştır.
 */
export const ALL_MAARIF_GRADES: Grade[] = [
  GRADE_5_CURRICULUM,
  GRADE_6_CURRICULUM,
  GRADE_7_CURRICULUM,
  GRADE_8_CURRICULUM,
];

export {
  GRADE_5_CURRICULUM,
  GRADE_6_CURRICULUM,
  GRADE_7_CURRICULUM,
  GRADE_8_CURRICULUM,
};
