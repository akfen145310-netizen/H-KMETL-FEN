import { GoogleGenAI } from "@google/genai";
import { ScrapedPageData } from "./webScraper";

// Initialize the Gemini AI client
let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    throw new Error(
      "GEMINI_API_KEY anahtarı tanımlanmamış. Lütfen Google AI Studio arayüzündeki ayarlar (Settings / Secrets) menüsünden Gemini API anahtarınızı tanımlayın."
    );
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const RİSALE_NUR_METHODOLOGY_INSTRUCTION = `
Sen, kainat kitabını ve fen bilimlerini Risale-i Nur'un tefekkür ve anlatım mantığıyla açıklayan uzman bir eğitimcisin.
Metinleri yapay veya arkaik şekilde birebir taklit etmeyeceksin.
Bunun yerine Risale-i Nur'un en temel pedagojik ve aklî düşünce örgüsünü kullanarak, fen bilimleri konularını doğrudan şu 10 AŞAMALI DÜŞÜNCE ÖRGÜSÜ ile ve "NASIL?" ile "NEDEN?" sorularını birlikte kullanarak anlatacaksın.

===================================================================
10 AŞAMALI RİSALE-İ NUR ANLATIM MANTIĞI VE DÜŞÜNCE ÖRGÜSÜ
===================================================================

AŞAMA 1 — VARLIĞI TANIT:
Ele alınan sistemi tanıt (Güneş sistemi, hücre, solunum sistemi, kuvvet, periyodik tablo, DNA vb.). Sistemin kainattaki yerini ve önemini belirt.

AŞAMA 2 — PARÇALARINI GÖSTER:
Sistemin parçalarını, organlarını, elemanlarını ve kavramlarını tek tek açıkla.

AŞAMA 3 — HER PARÇANIN VAZİFESİNİ GÖSTER:
Her parçanın ne işe yaradığını, hangi vazifeyi yerine getirdiğini anlat.

AŞAMA 4 — PARÇALAR ARASINDAKİ UYUMU GÖSTER:
Bir parçanın diğer parçalarla nasıl bağlantılı olduğunu, birbirine nasıl yardım ettiğini göster.

AŞAMA 5 — ÖLÇÜ VE DÜZENİ GÖSTER:
Sistemdeki hassas ölçüleri, oranları, zamanlamaları, fiziksel sabitleri ve şaşmaz düzeni somut sayılarla belirt.

AŞAMA 6 — BENZETME YAP (TEMSİL DÜRBÜNÜ):
Sistemi şehir, fabrika, ordu, saray, saat veya benzeri öğrencinin çok iyi bildiği anlaşılır bir sistemle karşılaştır.

AŞAMA 7 — HİKMETİ GÖSTER:
Bu düzenin canlıya, insana, çevreye veya genel sisteme hangi hizmetleri, faydaları ve nimetleri sunduğunu açıkla.

AŞAMA 8 — İRADE VE SANAT PERSPEKTİFİ:
Bu kadar farklı ve şuursuz parçanın birbiriyle uyumlu çalışmasını "düzenlenmişlik, ölçü, program, sanat ve hikmet" açısından değerlendir.

AŞAMA 9 — AKIL YÜRÜTME (MUHAKEME):
Öğrencinin şu temel soruyu düşünmesini sağla:
"Bu kadar farklı parçanın birbirini tamamlayacak şekilde çalışması bize nasıl bir düzen, ilim ve irade gösteriyor? Kör tesadüf veya şuursuz atomlar bunu yapabilir mi?"

AŞAMA 10 — SONUÇ VE TEFEKKÜR MEYVESİ:
Konuyu kısa, sıcak, öğrencinin aklına ve kalbine hitap eden veciz bir tefekkür ve sonuç paragrafıyla tamamla.

===================================================================
"NASIL?" VE "NEDEN?" SORULARINI BİRLİKTE KULLAN (İKİ KATMANLI ANLATIM)
===================================================================
Her konuyu iki katmanlı ele al:
1. "NASIL?" Katmanı (Bilimsel Hakikat): Konunun bilimsel mekanizmasını, kanunlarını, MEB fen müfredatındaki terimleri, deneyleri, büyüklükleri ve ölçülerini eksiksiz, bilimsel olarak doğru ve duru bir dille açıkla.
2. "NEDEN?" Katmanı (Hikmet ve Mana-i Harfî): O mekanizmanın arkasındaki maksadı, gayeyi, rahmeti, sanatı ve Yaratıcının isimlerinin (Alîm, Hakîm, Kadîr, Rezzâk, Musavvir, Mukaddir vb.) tecellilerini göster.

===================================================================
SINIF SEVİYESİNE MUTLAK PEDAGOJİK UYUM
===================================================================
- 5. Sınıf (10-11 yaş): Somut, canlı, sevimli, hayranlık uyandıran bir dil; anlaşılır saray ve saat benzetmeleri.
- 6. Sınıf (11-12 yaş): Vücut sistemleri, dünya ve gezegenler; intizam, vazife bilinci ve fabrika benzetmeleri.
- 7. Sınıf (12-13 yaş): Hücre, atom, kuvvet, iş, enerji, ışık; mikro ve makro alem arasındaki mizan, ayna ve laboratuvar benzetmeleri.
- 8. Sınıf (13-14 yaş / LGS): DNA, kalıtım, periyodik sistem, kimyasal tepkimeler, basınç; olasılık hesaplarının tesadüfü imkansız kılması, hendese ve yazılım/program analojileri.
- Asla anlaşılmaz, arkaik veya aşırı ağdalı kelimeler kullanma; duru, akıcı, edebi, sevimli ve berrak bir Türkçe kur.

===================================================================
ZORUNLU BİÇİM VE ÇIKTI STANDARDI
===================================================================
# [Konu Başlığı]: [Risale-i Nur Dersi Hikmetli Başlığı]

> **Bismillah:** *"Bütün mevcudat lisan-ı hal ile Bismillah der; ilahî nizamın, ilmin ve rahmetin birer mektubu olarak vazifesini yapar."*

## 1. Varlığı Tanıt (Sistemin Kapısını Aralama)
...

## 2. Parçalarını Göster & 3. Her Parçanın Vazifesi (Nasıl ve Neden?)
...

## 4. Parçalar Arasındaki Harika Uyum (Müthiş İttifak ve Yardımlaşma)
...

## 5. Ölçü, Mizan ve İnce Düzen (Şaşmaz Matematik ve Zamanlama)
...

## 6. Temsil ve Benzetme Dürbünü (Şehir / Fabrika / Saray / Saat Karşılaştırması)
...

## 7. Hikmet Penceresi: Canlıya ve Kainata Sunulan Hizmet
...

## 8. İrade, Sanat ve Program Perspektifi
...

## 9. Akıl Yürütme ve Basiret Terazisi
> **Tefekkür ve Muhakeme Sorusu:** "Bu kadar farklı parçanın birbirini tamamlayacak şekilde çalışması bize nasıl bir düzen gösteriyor?"
...

## 10. Netice ve Tefekkür Meyvesi
...

- TABLOLAR: Kaynaktaki tüm tablolar Markdown formatında (| Sütun 1 | Sütun 2 |) korunur, en sağa "Hikmet & İnce Ayar" sütunu eklenir.
- GÖRSELLER:
  ![Açıklama](URL)
  fenbilim.net alıntıdır. [Resim Link](URL)
  > **Tefekkür Dürbünü:** [Görseldeki tasarımı ve nizamı anlatan açıklama]
- SEMBOLLER: Temiz Türkçe semboller ('→', '×', '=', N, g/cm³). Kesinlikle LaTeX ('\\rightarrow') yok!
- SORULARI VE TESTLERİ ÇIKTIYA DAHİL ETME: Konu bitimindeki test sorularını KESİNLİKLE ÇIKTIYA ALMA, ÇÖZMEYE ÇALIŞMA!
`;

// Helper to sanitize any accidental LaTeX arrows, trailing questions, or formatting glitches
export function sanitizeHikmetliOutput(text: string): string {
  let cleaned = text;

  // 1. Replace raw LaTeX arrows or 'rightarrow' with standard arrow symbol '→'
  cleaned = cleaned.replace(/\\rightarrow/g, '→');
  cleaned = cleaned.replace(/\\longrightarrow/g, '→');
  cleaned = cleaned.replace(/\\leftarrow/g, '←');
  cleaned = cleaned.replace(/\\leftrightarrow/g, '↔');
  cleaned = cleaned.replace(/(\s)rightarrow(\s)/gi, '$1→$2');
  cleaned = cleaned.replace(/(\s)leftarrow(\s)/gi, '$1←$2');

  // 2. Clean up excessive \text{...} wrappers in simple formulas
  cleaned = cleaned.replace(/\\text\{([^}]+)\}/g, '$1');

  // 3. Cut off trailing evaluation questions / quiz sections if model generated them
  const cutOffPatterns = [
    /\n#{1,4}\s*(?:Konu\s+Değerlendirme|Örnek\s+Sorular|Çalışma\s+Soruları|Değerlendirme\s+Soruları|Konu\s+Sonu\s+Test|Kazanım\s+Testi|Sorular ve Çözümler|Çözümlü\s+Sorular)[\s\S]*$/i,
    /\n\*\*(?:Konu\s+Değerlendirme|Örnek\s+Sorular|Çalışma\s+Soruları|Sorular)\*\*[\s\S]*$/i,
    /\n(?:Soru\s+1|Örnek\s+Soru\s+1|Test\s+Soruları)[\s\S]*$/i,
  ];
  for (const pattern of cutOffPatterns) {
    cleaned = cleaned.replace(pattern, '');
  }

  // 4. Ensure blockquote formatting for Hikmet Penceresi is properly indented
  cleaned = cleaned.replace(/\n(?!\>)\s*\*\*Hikmet Penceresi:\*\*/g, '\n\n> **Hikmet Penceresi:**');
  cleaned = cleaned.replace(/\n(?!\>)\s*\*\*Görsel Tefekkür Yorumu:\*\*/g, '\n> **Görsel Tefekkür Yorumu:**');
  cleaned = cleaned.replace(/\n(?!\>)\s*\*\*Tefekkür Dürbünü:\*\*/g, '\n> **Tefekkür Dürbünü:**');

  return cleaned.trim();
}

/**
 * Ensures that educational images discovered during scraping are actually present
 * in the final markdown text.
 */
export function ensureImagesEmbedded(
  content: string,
  images: { src: string; alt: string; caption?: string }[]
): string {
  if (!images || images.length === 0) return content;

  let updatedContent = content;
  const missingImages = images.filter((img) => !updatedContent.includes(img.src));
  if (missingImages.length === 0) return updatedContent;

  // Split by markdown headings (## or ###)
  const sections = updatedContent.split(/(?=\n#{2,3}\s+)/g);

  if (sections.length > 1) {
    missingImages.forEach((img, idx) => {
      const altWords = (img.alt || '')
        .toLowerCase()
        .replace(/[^a-z0-9ğüşıöç\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3);

      let matchedIdx = -1;
      if (altWords.length > 0) {
        matchedIdx = sections.findIndex((sec) =>
          altWords.some((w) => sec.toLowerCase().includes(w))
        );
      }

      // Distribute evenly across sections if no exact keyword match
      if (matchedIdx === -1) {
        matchedIdx = (idx + 1) % sections.length;
      }

      const imgBlock = `\n\n![${img.alt}](${img.src})\nfenbilim.net alıntıdır. [Resim Link](${img.src})\n> **Tefekkür Dürbünü:** Görseldeki sanat ve hassas ölçü, kör tesadüfün değil sonsuz bir ilim ve iradenin şahididir.\n`;
      sections[matchedIdx] = sections[matchedIdx].trimEnd() + imgBlock;
    });

    return sections.join('\n');
  } else {
    missingImages.forEach((img) => {
      updatedContent += `\n\n![${img.alt}](${img.src})\nfenbilim.net alıntıdır. [Resim Link](${img.src})\n> **Tefekkür Dürbünü:** Görseldeki sanat ve hassas ölçü, kör tesadüfün değil sonsuz bir ilim ve iradenin şahididir.\n`;
    });
    return updatedContent;
  }
}

export async function rewriteScienceText(inputText: string, targetGrade?: string): Promise<string> {
  const ai = getAiClient();

  const gradeContext = targetGrade && ['5', '6', '7', '8'].includes(targetGrade)
    ? `HEDEF SINIF DÜZEYİ: ${targetGrade}. Sınıf. Anlatım dilini, benzetmelerini ve pedagojik derinliğini KESİNLİKLE ${targetGrade}. sınıf öğrencisinin seviyesine göre ayarla.`
    : `HEDEF SINIF DÜZEYİ: Metinden tespit edilen ortaokul sınıf düzeyine (5, 6, 7 veya 8. sınıf) göre tam uyumlu pedagoji kullan.`;

  const userPrompt = `Aşağıda verilen fen bilimleri konusunu, RİSALE-İ NUR ANLATIM MANTIĞI VE 10 AŞAMALI DÜŞÜNCE ÖRGÜSÜYLE, "NASIL?" VE "NEDEN?" SORULARINI BİRLİKTE ELE ALARAK yeniden inşa et.

${gradeContext}

10 AŞAMA ZORUNLU YAPISI:
AŞAMA 1 — Varlığı Tanıt
AŞAMA 2 — Parçalarını Göster
AŞAMA 3 — Her Parçanın Vazifesini Göster (Nasıl ve Neden)
AŞAMA 4 — Parçalar Arasındaki Uyumu Göster
AŞAMA 5 — Ölçü ve Düzeni Göster (Hassas ölçüler, oranlar, zamanlamalar)
AŞAMA 6 — Benzetme Yap (Şehir, fabrika, ordu, saray veya saat ile karşılaştır)
AŞAMA 7 — Hikmeti Göster (Canlıya ve sisteme hizmeti)
AŞAMA 8 — İrade ve Sanat Perspektifi (Düzenlenmişlik, ölçü, program, sanat)
AŞAMA 9 — Akıl Yürütme ("Bu kadar farklı parçanın birbirini tamamlayacak şekilde çalışması bize nasıl bir düzen gösteriyor?")
AŞAMA 10 — Sonuç (Kısa tefekkür ve sonuç)

KAYNAK METİN:
${inputText}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction: RİSALE_NUR_METHODOLOGY_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const output = response.text || "Metin dönüştürülemedi.";
    return sanitizeHikmetliOutput(output);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const message = error?.message || "";
    if (
      message.includes("API key not valid") ||
      message.includes("API_KEY_INVALID") ||
      message.includes("invalid api key")
    ) {
      throw new Error(
        "Geçersiz API Anahtarı: Lütfen geçerli ve aktif bir Google AI Studio Gemini API anahtarı girdiğinizden emin olun."
      );
    }
    if (message.includes("quota") || message.includes("RESOURCE_EXHAUSTED")) {
      throw new Error(
        "API Kotası Aşıldı: API istek sınırına ulaşıldı. Lütfen kısa bir süre sonra tekrar deneyin."
      );
    }
    throw new Error(
      error?.message ||
        "Metin dönüştürme işlemi sırasında bir hata oluştu. Lütfen API anahtarınızı ve internet bağlantınızı kontrol edin."
    );
  }
}

export interface WebRewriteResult {
  detectedGrade: string; // "5" | "6" | "7" | "8" | ""
  detectedTopic: string;
  suggestedUnitTitle?: string;
  hikmetliContent: string;
  tablesProcessedCount: number;
  imagesProcessedCount: number;
  summary: string;
}

export async function analyzeAndRewriteWebLink(
  pageData: ScrapedPageData,
  preferredGrade?: string
): Promise<WebRewriteResult> {
  const ai = getAiClient();

  const gradeHint = preferredGrade && ['5', '6', '7', '8'].includes(preferredGrade)
    ? `Kullanıcı özellikle ${preferredGrade}. Sınıf düzeyinde hazırlanmasını istedi.`
    : `Sayfanın başlığından ve içeriğinden hangi sınıfa (5, 6, 7 veya 8) ait olduğunu tespit et.`;

  const prompt = `Aşağıda bir eğitim web sayfasından çıkarılan fen bilimleri konusu, sayfadaki tablolar ve görseller yer almaktadır.
Lütfen bu konuyu RİSALE-İ NUR ANLATIM MANTIĞI VE 10 AŞAMALI DÜŞÜNCE ÖRGÜSÜYLE, "NASIL?" VE "NEDEN?" SORULARINI BİRLİKTE ELE ALARAK, tespit edilen sınıf seviyesine tam uygun olarak inşa et:

${gradeHint}

ZORUNLU ÇIKTI KURALLARI:
1. Konuyu tanı ve sınıf düzeyini tespit et ("5", "6", "7" veya "8").
2. 10 AŞAMALI DÜŞÜNCE ÖRGÜSÜNÜ EKSİKSİZ UYGULA:
   - ## 1. Varlığı Tanıt
   - ## 2. Parçalarını Göster & 3. Her Parçanın Vazifesi (Nasıl ve Neden?)
   - ## 4. Parçalar Arasındaki Harika Uyum
   - ## 5. Ölçü, Mizan ve İnce Düzen
   - ## 6. Temsil ve Benzetme Dürbünü (Şehir, fabrika, ordu, saray veya saat ile karşılaştır)
   - ## 7. Hikmet Penceresi: Canlıya ve Sisteme Sunulan Hizmet
   - ## 8. İrade, Sanat ve Program Perspektifi
   - ## 9. Akıl Yürütme ve Basiret Terazisi ("Bu kadar farklı parçanın birbirini tamamlayacak şekilde çalışması bize nasıl bir düzen gösteriyor?")
   - ## 10. Netice ve Tefekkür Meyvesi
3. Sayfadaki her tabloyu TABLO ŞABLONUNU VE SÜTUNLARINI AYNEN KORUYARAK ve en sağa "Hikmet & İnce Ayar" sütunu ekleyerek hücreleri doldur.
4. Sayfadaki görselleri Markdown formatında yerleştir:
   ![Açıklama](URL)
   fenbilim.net alıntıdır. [Resim Link](URL)
   > **Tefekkür Dürbünü:** [Görseldeki sanat ve nizamı anlatan açıklama]
5. Standart temiz semboller ('→', '×', '÷', N, °C). Kesinlikle LaTeX yok!
6. KONU BİTİMİNİ ALGILA: Sonda yer alan test sorularını, çoktan seçmeli soruları KESİNLİKLE DAHİL ETME!

KAYNAK VERİ:
${pageData.formattedPromptForAi}

LÜTFEN CEVABINI SADECE AŞAĞIDAKİ JSON FORMATINDA DÖNDÜR:
\`\`\`json
{
  "detectedGrade": "5", 
  "detectedTopic": "Tanınan Konu Başlığı",
  "suggestedUnitTitle": "İlgili Ünite Başlığı",
  "summary": "10 Aşama Risale-i Nur mantığıyla işlenen konunun kısa özeti.",
  "hikmetliContent": "Tüm 10 aşaması, korunmuş Markdown tabloları, benzetmeleri, yerleştirilmiş görselleri ve neticesiyle tam ders metni"
}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: RİSALE_NUR_METHODOLOGY_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const rawText = response.text || "";
    
    let parsed: any = null;
    try {
      const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/) || rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        parsed = JSON.parse(rawText);
      }
    } catch {
      parsed = {
        detectedGrade: preferredGrade || "",
        detectedTopic: pageData.title || "Web Sayfasından Dönüştürülen Konu",
        summary: "Web sayfası içeriği 10 Aşamalı Risale-i Nur mantığıyla uyarlandı.",
        hikmetliContent: rawText,
      };
    }

    let gradeStr = String(parsed.detectedGrade || preferredGrade || "").replace(/[^0-9]/g, "");
    if (!["5", "6", "7", "8"].includes(gradeStr)) {
      const lower = (pageData.title + " " + pageData.url).toLowerCase();
      if (lower.includes("5-sinif") || lower.includes("5. sinif") || lower.includes("5.sınıf")) gradeStr = "5";
      else if (lower.includes("6-sinif") || lower.includes("6. sinif") || lower.includes("6.sınıf")) gradeStr = "6";
      else if (lower.includes("7-sinif") || lower.includes("7. sinif") || lower.includes("7.sınıf")) gradeStr = "7";
      else if (lower.includes("8-sinif") || lower.includes("8. sinif") || lower.includes("8.sınıf")) gradeStr = "8";
      else gradeStr = preferredGrade || "5";
    }

    const cleanedContent = sanitizeHikmetliOutput(parsed.hikmetliContent || rawText);
    const contentWithImages = ensureImagesEmbedded(cleanedContent, pageData.images);

    return {
      detectedGrade: gradeStr,
      detectedTopic: parsed.detectedTopic || pageData.title || "Fen Konusu",
      suggestedUnitTitle: parsed.suggestedUnitTitle || "",
      hikmetliContent: contentWithImages,
      tablesProcessedCount: pageData.tables.length,
      imagesProcessedCount: pageData.images.length,
      summary:
        parsed.summary ||
        `Sayfa içeriği 10 Aşamalı Risale-i Nur düşünce örgüsü ve ${gradeStr}. sınıf seviyesine uygun olarak işlendi.`,
    };
  } catch (error: any) {
    console.error("Gemini Web Rewrite Error:", error);
    const message = error?.message || "";
    if (
      message.includes("API key not valid") ||
      message.includes("API_KEY_INVALID") ||
      message.includes("invalid api key")
    ) {
      throw new Error(
        "Geçersiz API Anahtarı: Lütfen geçerli ve aktif bir Google AI Studio Gemini API anahtarı girdiğinizden emin olun."
      );
    }
    if (message.includes("quota") || message.includes("RESOURCE_EXHAUSTED")) {
      throw new Error(
        "API Kotası Aşıldı: API istek sınırına ulaşıldı. Lütfen kısa bir süre sonra tekrar deneyin."
      );
    }
    throw new Error(
      error?.message ||
        "Web sayfası dönüştürülürken bir hata oluştu. Lütfen bağlantınızı ve API anahtarınızı kontrol edin."
    );
  }
}
