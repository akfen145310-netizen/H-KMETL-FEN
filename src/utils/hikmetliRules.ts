/**
 * 10 Aşamalı Risale-i Nur Anlatım Mantığı ve Düşünce Örgüsü
 * Fen bilimleri konularının iki katmanlı ("Nasıl?" ve "Neden?") olarak,
 * sınıf seviyesine uygun pedagojiyle inşa edilmesi için kurallar ve denetim motoru.
 */

export interface RisaleAsama {
  id: string;
  stageNumber: number;
  title: string;
  category: 'giris' | 'parca_vazife' | 'nizam_temsil' | 'hikmet_muhakeme';
  description: string;
  requirement: string;
  question: string;
}

export const RISALE_I_NUR_10_ASAMA: RisaleAsama[] = [
  {
    id: 'asama_1_varligi_tanit',
    stageNumber: 1,
    title: 'Aşama 1 — Varlığı Tanıt (Sistemin Kapısını Aralama)',
    category: 'giris',
    description: 'Ele alınan sistemi tanıt (Güneş, Ay, hücre, solunum sistemi, kuvvet, periyodik sistem, DNA vb.).',
    requirement: 'Sistemin kainat kitabındaki yerini, önemini ve bütün içindeki konumunu sınıf seviyesine uygun olarak açıkla.',
    question: 'Bu sistem kainat sarayında nerede duruyor ve neyi temsil ediyor?'
  },
  {
    id: 'asama_2_parcalarini_goster',
    stageNumber: 2,
    title: 'Aşama 2 — Parçalarını Göster',
    category: 'parca_vazife',
    description: 'Sistemi meydana getiren parçaları, organları, elemanları ve kavramları tek tek ortaya koy.',
    requirement: 'Müfredatta yer alan tüm bilimsel eleman ve kavramları eksiksiz listele ve tanıt.',
    question: 'Bu sistemi oluşturan temel yapı taşları ve bileşenler nelerdir?'
  },
  {
    id: 'asama_3_vazifesini_goster',
    stageNumber: 3,
    title: 'Aşama 3 — Her Parçanın Vazifesini Göster ("Nasıl?" ve "Neden?")',
    category: 'parca_vazife',
    description: 'Her parçanın ne işe yaradığını iki katmanlı olarak anlat: 1. "Nasıl?" (Bilimsel mekanizma), 2. "Neden?" (Hikmet ve gaye).',
    requirement: 'Kör tabiat dili yerine her parçanın bir vazife için teçhiz edildiğini ve görevlendirildiğini belirt.',
    question: 'Her bir parça hangi mekanizmayla ("Nasıl?") çalışıyor ve hangi ilahî maksada ("Neden?") hizmet ediyor?'
  },
  {
    id: 'asama_4_uyumu_goster',
    stageNumber: 4,
    title: 'Aşama 4 — Parçalar Arasındaki Uyumu Göster (Müthiş İttifak)',
    category: 'parca_vazife',
    description: 'Bir parçanın diğer parçalarla nasıl bağlantılı olduğunu, birbirinin imdadına nasıl koştuğunu göster.',
    requirement: 'Parçaların birbirinden haberdarmış gibi kusursuz bir yardımlaşma ve senkronizasyonla çalıştığını vurgula.',
    question: 'Farklı parçalar birbirini nasıl tamamlıyor ve tek bir ahenkte birleşiyor?'
  },
  {
    id: 'asama_5_olcu_ve_duzen',
    stageNumber: 5,
    title: 'Aşama 5 — Ölçü ve Düzeni Göster (Şaşmaz Matematik ve Zamanlama)',
    category: 'nizam_temsil',
    description: 'Sistemdeki hassas ölçüleri, oranları, sabitleri, zamanlamaları ve milimetrik düzeni somut değerlerle belirt.',
    requirement: 'Ölçüdeki en ufak bir sapmanın kaosa yol açacağını, dengenin mutlak bir ilimle korunduğunu göster.',
    question: 'Bu sistemde hangi hassas sayılar, kuvvetler ve zamanlama sınırları işlemektedir?'
  },
  {
    id: 'asama_6_benzetme_yap',
    stageNumber: 6,
    title: 'Aşama 6 — Benzetme Yap (Temsil Dürbünü)',
    category: 'nizam_temsil',
    description: 'Sistemi sınıf seviyesine uygun olarak şehir, fabrika, ordu, saray, saat veya benzeri anlaşılır bir modelle karşılaştır.',
    requirement: 'Öğrencinin zihnini somutlaştıracak Risale-i Nur üslubundaki temsil metodunu uygula.',
    question: 'Bu sistem günlük hayatta bildiğimiz hangi kusursuz mekanizmaya (saat, fabrika, şehir, ordu) benziyor?'
  },
  {
    id: 'asama_7_hikmeti_goster',
    stageNumber: 7,
    title: 'Aşama 7 — Hikmeti Göster (Canlıya ve Kainata Hizmet)',
    category: 'hikmet_muhakeme',
    description: 'Bu düzenin canlıya, insan hayatına, çevreye veya genel kainat sistemine hangi hizmetleri ve nimetleri sunduğunu açıkla.',
    requirement: 'Sistemin bir fayda, rahmet ve ikram neticesi verdiğini açıkça göster.',
    question: 'Bu harika düzen olmasaydı ne olurdu ve bu nizam bize hangi nimetleri ulaştırıyor?'
  },
  {
    id: 'asama_8_irade_ve_sanat',
    stageNumber: 8,
    title: 'Aşama 8 — İrade ve Sanat Perspektifi',
    category: 'hikmet_muhakeme',
    description: 'Bu kadar farklı parçanın birbiriyle uyumlu çalışmasını "düzenlenmişlik, ölçü, program, sanat ve hikmet" açısından değerlendir.',
    requirement: 'Şuursuz maddelerin kendi başına plan yapamayacağını, arkadaki mutlak ilim, irade ve programı vurgula.',
    question: 'Şuursuz atomlar ve parçalar kendi kendine böyle bir program ve sanat ortaya koyabilir mi?'
  },
  {
    id: 'asama_9_akil_yurutme',
    stageNumber: 9,
    title: 'Aşama 9 — Akıl Yürütme (Muhakeme Terazisi)',
    category: 'hikmet_muhakeme',
    description: 'Öğrencinin şu soruyu düşünmesini sağla: "Bu kadar farklı parçanın birbirini tamamlayacak şekilde çalışması bize nasıl bir düzen gösteriyor?"',
    requirement: '"Bir harf katipsiz, bir iğne ustasız olamazken bu harika sistem sahipsiz olabilir mi?" aklî kıyasını kurdur.',
    question: 'Birbirini tanımayan parçaların aynı gayede buluşması akla neyi ispatlar?'
  },
  {
    id: 'asama_10_sonuc_ve_tefekkur',
    stageNumber: 10,
    title: 'Aşama 10 — Sonuç ve Tefekkür Meyvesi',
    category: 'hikmet_muhakeme',
    description: 'Konuyu sınıf seviyesine tam uygun, kalbe ve akla hitap eden veciz bir tefekkür ve sonuç paragrafıyla tamamla.',
    requirement: 'Öğrenciye hitap eden sıcak bir hasbihal ve ilmi marifetullaha dönüştüren bir kapanış inşa et.',
    question: 'Bu dersten çıkan nihai hayat ve tefekkür dersi nedir?'
  }
];

// Alias for backwards compatibility
export const HIKMETLI_YORUM_KURALLARI = RISALE_I_NUR_10_ASAMA.map((item) => ({
  id: item.id,
  number: item.stageNumber,
  title: item.title,
  category: item.category as any,
  description: item.description,
  requirement: item.requirement,
  example: item.question
}));

export interface ComplianceAuditResult {
  score: number; // 0 - 100
  isFullyCompliant: boolean;
  checklist: {
    rule: RisaleAsama;
    satisfied: boolean;
    feedback: string;
  }[];
}

/**
 * Verilen bir metnin 10 Aşamalı Risale-i Nur Düşünce Örgüsüne ne kadar uyduğunu denetler.
 */
export function auditHikmetliCompliance(content: string): ComplianceAuditResult {
  if (!content || !content.trim()) {
    return {
      score: 0,
      isFullyCompliant: false,
      checklist: RISALE_I_NUR_10_ASAMA.map((stage) => ({
        rule: stage,
        satisfied: false,
        feedback: 'Metin henüz oluşturulmadı.'
      }))
    };
  }

  const text = content;
  const lower = text.toLowerCase();

  // 1. Varlığı Tanıt
  const hasStage1 = /1\.\s*Varlığı\s+Tanıt|Sistemin\s+Kapısını\s+Aralama|Mukaddime/i.test(text);

  // 2. Parçalarını Göster
  const hasStage2 = /2\.\s*Parçalarını\s+Göster|Sistemin\s+Parçaları|Bileşenler/i.test(text) || (text.includes('1. Katman') && text.includes('NASIL?'));

  // 3. Her Parçanın Vazifesi (Nasıl ve Neden)
  const hasStage3 = /3\.\s*Her\s+Parçanın\s+Vazifesi|Vazifesi|NASIL\?|NEDEN\?/i.test(text) && (text.includes('Nasıl') || text.includes('Neden'));

  // 4. Parçalar Arasındaki Uyum
  const hasStage4 = /4\.\s*Parçalar\s+Arasındaki|Harika\s+Uyum|Müthiş\s+İttifak|Dayanışma/i.test(text);

  // 5. Ölçü ve Düzen
  const hasStage5 = /5\.\s*Ölçü|Mizan|İnce\s+Düzen|Matematik|Zamanlama/i.test(text);

  // 6. Benzetme Yap (Temsil Dürbünü)
  const hasStage6 = /6\.\s*Temsil|Benzetme|Dürbünü|saat|fabrika|saray|ordu|şehir/i.test(text);

  // 7. Hikmet Penceresi / Hizmet
  const hasStage7 = /7\.\s*Hikmet\s+Penceresi|Sunulan\s+Hizmet|Nimet|Hikmet/i.test(text);

  // 8. İrade ve Sanat
  const hasStage8 = /8\.\s*İrade|Sanat|Program\s+Perspektifi/i.test(text);

  // 9. Akıl Yürütme
  const hasStage9 = /9\.\s*Akıl\s+Yürütme|Basiret\s+Terazisi|Muhakeme|Bu kadar farklı parçanın/i.test(text);

  // 10. Sonuç
  const hasStage10 = /10\.\s*Netice|Sonuç|Tefekkür\s+Meyvesi|Hülasa/i.test(text);

  const checks = [
    { rule: RISALE_I_NUR_10_ASAMA[0], satisfied: hasStage1, feedback: hasStage1 ? 'Sistem tanıtımı mevcut.' : 'Aşama 1 (Varlığı Tanıt) başlığı veya izahı eksik.' },
    { rule: RISALE_I_NUR_10_ASAMA[1], satisfied: hasStage2, feedback: hasStage2 ? 'Parçaların izahı mevcut.' : 'Aşama 2 (Parçalarını Göster) eksik.' },
    { rule: RISALE_I_NUR_10_ASAMA[2], satisfied: hasStage3, feedback: hasStage3 ? '"Nasıl?" ve "Neden?" iki katmanlı vazife izahı yapılmış.' : 'Aşama 3 ("Nasıl?" ve "Neden?") iki katmanlı vazife izahı eksik.' },
    { rule: RISALE_I_NUR_10_ASAMA[3], satisfied: hasStage4, feedback: hasStage4 ? 'Parçalar arası uyum ve ittifak gösterilmiş.' : 'Aşama 4 (Parçalar Arasındaki Uyum) eksik.' },
    { rule: RISALE_I_NUR_10_ASAMA[4], satisfied: hasStage5, feedback: hasStage5 ? 'Hassas ölçü, mizan ve zamanlama anlatılmış.' : 'Aşama 5 (Ölçü ve Düzen) eksik.' },
    { rule: RISALE_I_NUR_10_ASAMA[5], satisfied: hasStage6, feedback: hasStage6 ? 'Temsil ve benzetme (saray/saat/fabrika) yer alıyor.' : 'Aşama 6 (Benzetme Yap - Temsil Dürbünü) eksik.' },
    { rule: RISALE_I_NUR_10_ASAMA[6], satisfied: hasStage7, feedback: hasStage7 ? 'Canlıya ve sisteme sunulan hikmet ve hizmet belirtilmiş.' : 'Aşama 7 (Hikmeti Göster) eksik.' },
    { rule: RISALE_I_NUR_10_ASAMA[7], satisfied: hasStage8, feedback: hasStage8 ? 'İrade, sanat ve program perspektifi vurgulanmış.' : 'Aşama 8 (İrade ve Sanat Perspektifi) eksik.' },
    { rule: RISALE_I_NUR_10_ASAMA[8], satisfied: hasStage9, feedback: hasStage9 ? 'Öğrenciyi düşündüren akıl yürütme sorusu mevcut.' : 'Aşama 9 (Akıl Yürütme ve Basiret Terazisi) eksik.' },
    { rule: RISALE_I_NUR_10_ASAMA[9], satisfied: hasStage10, feedback: hasStage10 ? 'Veciz sonuç ve tefekkür meyvesi ile tamamlanmış.' : 'Aşama 10 (Sonuç ve Tefekkür Meyvesi) eksik.' },
  ];

  const satisfiedCount = checks.filter(c => c.satisfied).length;
  const score = Math.round((satisfiedCount / checks.length) * 100);

  return {
    score,
    isFullyCompliant: score >= 80,
    checklist: checks
  };
}

export function autoEnforceHikmetliCompliance(content: string, topic?: string): string {
  let text = content.trim();

  // Ensure Bismillah quote if missing
  if (!text.includes('Bismillah her hayrın başıdır') && !text.includes('Bütün mevcudat lisan-ı hal ile Bismillah der')) {
    text = `> **Bismillah:** *"Bütün mevcudat lisan-ı hal ile Bismillah der; Halık-ı Zülcelal'in namına hareket edip, O'nun rahmet ve hikmet hazinelerinden birer numuneyi bize takdim eder."*\n\n` + text;
  }

  return text;
}
