import { MAARIF_MODEL_GRADES, getMaarifCurriculumStats } from './maarifModel';
import { ALL_MAARIF_GRADES } from './curriculum';
import { isConverterAuthenticated } from '../utils/authService';

export interface ChapterContent {
  id: string;
  title: string;              // Fenbilim.net müfredatındaki alt konu başlığı (örn: "1. Bölüm: Gökyüzündeki Komşumuz: Güneş")
  hikmetliTitle?: string;      // Açılan sayfada kullanılacak Hikmetli Fen başlığı (örn: "Güneş: Semadaki İlahî Lamba ve Hayat Kaynağı")
  shortDescription: string;
  content: string;
  imageUrl?: string;
}

export interface Unit {
  id: string;
  title: string;              // Fenbilim.net ünite başlığı (örn: "1. ÜNİTE: Gökyüzündeki Komşularımız ve Biz")
  chapters: ChapterContent[];
}

export interface Grade {
  id: string;
  name: string;
  description: string;
  units: Unit[];
}

/**
 * Varsayılan sınıf verileri (Türkiye Yüzyılı Maarif Modeli ve Fenbilim.net'e tam uyumlu 5, 6, 7 ve 8. Sınıf)
 * Toplam 28 Ünite ve 73 Alt Başlık
 */
export const gradesData: Grade[] = ALL_MAARIF_GRADES;

export const GRADES_STORAGE_KEY = "hikmetli_fen_maarif_v6";
const LEGACY_STORAGE_KEYS = [
  "hikmetli_fen_maarif_v5", 
  "hikmetli_fen_grades_v4", 
  "hikmetli_fen_grades_v3", 
  "hikmetli_fen_grades_v2", 
  "hikmetli_fen_grades_v1"
];

/**
 * Toplam konu sayısını hesaplar
 */
function getTotalChapterCount(grades: Grade[]): number {
  if (!Array.isArray(grades)) return 0;
  return grades.reduce((total, g) => {
    if (!g.units || !Array.isArray(g.units)) return total;
    return total + g.units.reduce((uTotal, u) => uTotal + (u.chapters?.length || 0), 0);
  }, 0);
}

export const getStoredGrades = (): Grade[] => {
  if (typeof window === "undefined") {
    return MAARIF_MODEL_GRADES;
  }
  try {
    const saved = localStorage.getItem(GRADES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure that if user had an older partial state with fewer than 70 chapters, we refresh to the full 73 chapters
      if (Array.isArray(parsed) && parsed.length >= 4 && getTotalChapterCount(parsed) >= 70) {
        return parsed;
      }
    }

    // Default to Maarif Model grades for fresh sessions or upgrade
    localStorage.setItem(GRADES_STORAGE_KEY, JSON.stringify(MAARIF_MODEL_GRADES));
    return MAARIF_MODEL_GRADES;
  } catch (err) {
    console.error("Grades verisi localStorage'dan yüklenemedi:", err);
  }
  return MAARIF_MODEL_GRADES;
};

export const saveStoredGrades = (data: Grade[]): void => {
  if (typeof window === "undefined") return;
  // Güvenlik doğrulaması: Veri tabanında kalıcı değişiklik sadece yetkili oturumuyla yapılabilir
  if (!isConverterAuthenticated()) {
    console.warn("Yetkisiz veri kaydetme engellendi: saveStoredGrades yalnızca yetkili kullanıcılar tarafından çağrılabilir.");
    return;
  }
  try {
    localStorage.setItem(GRADES_STORAGE_KEY, JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
      const gIndex = gradesData.findIndex(g => g.id === data[i].id);
      if (gIndex !== -1) {
        gradesData[gIndex] = data[i];
      }
    }
    window.dispatchEvent(new CustomEvent("grades_data_updated", { detail: data }));
  } catch (err) {
    console.error("Grades verisi kaydedilemedi:", err);
  }
};

export interface UpdateChapterResult {
  success: boolean;
  gradeName?: string;
  unitTitle?: string;
  chapterTitle?: string;
  error?: string;
}

export const updateChapterContent = (
  gradeId: string,
  chapterId: string,
  newContent: string
): UpdateChapterResult => {
  // Güvenlik denetimi: Değişiklik yetkili şifresi gerektirir
  if (!isConverterAuthenticated()) {
    return {
      success: false,
      error: "Yetkisiz işlem! Konu içeriğini güncellemek veya değiştirmek için yetkili şifresi ile oturum açılmalıdır."
    };
  }

  const currentGrades = getStoredGrades();
  let foundGradeName = "";
  let foundUnitTitle = "";
  let foundChapterTitle = "";
  let isUpdated = false;

  // Extract a title if markdown starts with # Title
  const titleMatch = newContent.match(/^\s*#\s+([^\n\r]+)/);
  const extractedTitle = titleMatch ? titleMatch[1].trim() : null;

  const newGrades = currentGrades.map((grade) => {
    if (grade.id !== gradeId) return grade;
    foundGradeName = grade.name;

    return {
      ...grade,
      units: grade.units.map((unit) => {
        const hasChapter = unit.chapters.some((c) => c.id === chapterId);
        if (!hasChapter) return unit;
        foundUnitTitle = unit.title;

        return {
          ...unit,
          chapters: unit.chapters.map((chapter) => {
            if (chapter.id !== chapterId) return chapter;
            foundChapterTitle = chapter.title;
            isUpdated = true;

            return {
              ...chapter,
              hikmetliTitle: extractedTitle || chapter.hikmetliTitle || chapter.title,
              content: newContent,
            };
          }),
        };
      }),
    };
  });

  if (isUpdated) {
    saveStoredGrades(newGrades);
    return {
      success: true,
      gradeName: foundGradeName,
      unitTitle: foundUnitTitle,
      chapterTitle: extractedTitle || foundChapterTitle,
    };
  }

  return {
    success: false,
    error: "Belirtilen sınıf veya konu bulunamadı.",
  };
};

export const addNewChapter = (
  gradeId: string,
  unitId: string,
  title: string,
  content: string,
  shortDescription?: string
): UpdateChapterResult => {
  const currentGrades = getStoredGrades();
  let foundGradeName = "";
  let foundUnitTitle = "";
  let isUpdated = false;
  const newChapterId = "konu-" + Math.random().toString(36).substring(2, 9);

  const titleMatch = content.match(/^\s*#\s+([^\n\r]+)/);
  const finalTitle = title.trim() || (titleMatch ? titleMatch[1].trim() : "Yeni Hikmetli Konu");

  const newGrades = currentGrades.map((grade) => {
    if (grade.id !== gradeId) return grade;
    foundGradeName = grade.name;

    return {
      ...grade,
      units: grade.units.map((unit) => {
        if (unit.id !== unitId) return unit;
        foundUnitTitle = unit.title;
        isUpdated = true;

        const newChapter: ChapterContent = {
          id: newChapterId,
          title: finalTitle,
          hikmetliTitle: finalTitle,
          shortDescription: shortDescription || "Hikmet diliyle zenginleştirilmiş fen konusu.",
          content: content,
          imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
        };

        return {
          ...unit,
          chapters: [...unit.chapters, newChapter],
        };
      }),
    };
  });

  if (isUpdated) {
    saveStoredGrades(newGrades);
    return {
      success: true,
      gradeName: foundGradeName,
      unitTitle: foundUnitTitle,
      chapterTitle: finalTitle,
    };
  }

  return {
    success: false,
    error: "Belirtilen sınıf veya ünite bulunamadı.",
  };
};

export const resetChapterToDefault = (gradeId: string, chapterId: string): boolean => {
  if (!isConverterAuthenticated()) {
    console.warn("Yetkisiz işlem: resetChapterToDefault yetkili şifresi gerektirir.");
    return false;
  }

  const defaultGrade = gradesData.find((g) => g.id === gradeId);
  if (!defaultGrade) return false;

  let defaultChapter: ChapterContent | undefined;
  for (const u of defaultGrade.units) {
    const c = u.chapters.find((ch) => ch.id === chapterId);
    if (c) {
      defaultChapter = c;
      break;
    }
  }
  if (!defaultChapter) return false;

  return updateChapterContent(gradeId, chapterId, defaultChapter.content).success;
};

export const resetAllGradesToDefault = (): void => {
  if (typeof window === "undefined") return;
  if (!isConverterAuthenticated()) {
    console.warn("Yetkisiz işlem: resetAllGradesToDefault yetkili şifresi gerektirir.");
    return;
  }
  localStorage.removeItem(GRADES_STORAGE_KEY);
  for (const legacy of LEGACY_STORAGE_KEYS) {
    localStorage.removeItem(legacy);
  }
  window.dispatchEvent(new CustomEvent("grades_data_updated", { detail: gradesData }));
};

export { MAARIF_MODEL_GRADES, getMaarifCurriculumStats } from './maarifModel';

export const applyMaarifCurriculum = (mode: 'replace' | 'merge' = 'replace') => {
  if (typeof window === "undefined") {
    return { success: true, stats: getMaarifCurriculumStats() };
  }

  if (!isConverterAuthenticated()) {
    console.warn("Yetkisiz işlem: applyMaarifCurriculum yetkili şifresi gerektirir.");
    return {
      success: false,
      stats: getMaarifCurriculumStats(),
      error: "Yetkisiz işlem! Maarif müfredatını uygulamak veya değiştirmek için yetkili şifresi gereklidir."
    };
  }

  if (mode === 'replace') {
    saveStoredGrades(MAARIF_MODEL_GRADES);
    return {
      success: true,
      stats: getMaarifCurriculumStats()
    };
  }

  // Merge mode: keep existing custom chapters, but ensure all Maarif units and chapters exist
  const current = getStoredGrades();
  const merged: Grade[] = MAARIF_MODEL_GRADES.map(mGrade => {
    const existingGrade = current.find(cg => cg.id === mGrade.id);
    if (!existingGrade) return mGrade;

    const mergedUnits: Unit[] = mGrade.units.map(mUnit => {
      const existingUnit = existingGrade.units.find(eu => eu.id === mUnit.id || eu.title === mUnit.title);
      if (!existingUnit) return mUnit;

      // Keep user customized content for chapters with matching id
      const mergedChapters: ChapterContent[] = mUnit.chapters.map(mChapter => {
        const existingChapter = existingUnit.chapters.find(ec => ec.id === mChapter.id);
        return existingChapter || mChapter;
      });

      // Add any custom extra chapters created by user
      const customChapters = existingUnit.chapters.filter(ec => !mUnit.chapters.some(mc => mc.id === ec.id));

      return {
        ...mUnit,
        chapters: [...mergedChapters, ...customChapters]
      };
    });

    // Also preserve any custom units created by user
    const customUnits = existingGrade.units.filter(eu => !mGrade.units.some(mu => mu.id === eu.id || mu.title === eu.title));

    return {
      ...mGrade,
      units: [...mergedUnits, ...customUnits]
    };
  });

  saveStoredGrades(merged);
  return {
    success: true,
    stats: getMaarifCurriculumStats()
  };
};

export const isMaarifModelActive = (): boolean => {
  const current = getStoredGrades();
  const g5 = current.find(g => g.id === "5");
  if (!g5) return false;
  return g5.units.some(u => u.title.includes("Gökyüzündeki Komşularımız"));
};
