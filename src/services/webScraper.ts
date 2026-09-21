export interface ScrapedImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ScrapedTable {
  id: string;
  title: string;
  markdown: string;
  rowCount: number;
}

export interface ScrapedPageData {
  url: string;
  title: string;
  headings: string[];
  mainText: string;
  images: ScrapedImage[];
  tables: ScrapedTable[];
  formattedPromptForAi: string;
}

// Convert HTML Table element to clean Markdown Table
function htmlTableToMarkdown(tableEl: HTMLTableElement, index: number): ScrapedTable | null {
  const rows = Array.from(tableEl.querySelectorAll('tr'));
  if (rows.length === 0) return null;

  // Try to find a title from caption or preceding heading
  let title = '';
  const caption = tableEl.querySelector('caption');
  if (caption && caption.textContent?.trim()) {
    title = caption.textContent.trim();
  } else {
    let prev = tableEl.previousElementSibling;
    while (prev) {
      if (/^H[1-6]$/i.test(prev.tagName) || prev.tagName === 'P' || prev.tagName === 'STRONG') {
        const text = prev.textContent?.trim();
        if (text && text.length < 120) {
          title = text;
          break;
        }
      }
      prev = prev.previousElementSibling;
    }
  }

  // Extract cells row by row
  const tableData: string[][] = [];
  let maxCols = 0;

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll('th, td'));
    if (cells.length === 0) continue;
    const rowCells = cells.map((c) => {
      return (c.textContent || '').replace(/[\r\n\t]+/g, ' ').replace(/\|/g, '\\|').trim();
    });
    if (rowCells.some((c) => c.length > 0)) {
      tableData.push(rowCells);
      if (rowCells.length > maxCols) {
        maxCols = rowCells.length;
      }
    }
  }

  if (tableData.length === 0 || maxCols === 0) return null;

  // Pad rows that have fewer columns
  for (const row of tableData) {
    while (row.length < maxCols) {
      row.push('');
    }
  }

  const headerRow = tableData[0];
  const dataRows = tableData.slice(1);

  // Build markdown string
  let md = `| ${headerRow.join(' | ')} |\n`;
  md += `| ${headerRow.map(() => '---').join(' | ')} |\n`;

  for (const row of dataRows) {
    md += `| ${row.join(' | ')} |\n`;
  }

  return {
    id: `tablo-${index + 1}`,
    title: title || `Tablo ${index + 1}`,
    markdown: md.trim(),
    rowCount: tableData.length,
  };
}

export async function scrapeWebPage(inputUrl: string): Promise<ScrapedPageData> {
  let cleanUrl = inputUrl.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let html = '';
  let lastError: Error | null = null;

  // Strategy 1: Local Vite proxy endpoint
  try {
    const response = await fetch(`/api/fetch-url?url=${encodeURIComponent(cleanUrl)}`);
    if (response.ok) {
      html = await response.text();
    } else {
      throw new Error(`Proxy sunucusu yanıt vermedi (${response.status})`);
    }
  } catch (err: any) {
    lastError = err;
    console.warn('Local proxy failed, trying CORS fallback...', err);

    // Strategy 2: allorigins fallback
    try {
      const fallbackRes = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`
      );
      if (fallbackRes.ok) {
        html = await fallbackRes.text();
      } else {
        throw new Error('CORS proxy yanıt vermedi');
      }
    } catch (fallbackErr: any) {
      lastError = fallbackErr;

      // Strategy 3: codetabs fallback
      try {
        const codetabsRes = await fetch(
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(cleanUrl)}`
        );
        if (codetabsRes.ok) {
          html = await codetabsRes.text();
        } else {
          throw new Error('İkincil CORS proxy yanıt vermedi');
        }
      } catch (finalErr: any) {
        lastError = finalErr;
      }
    }
  }

  if (!html || html.trim().length === 0) {
    throw new Error(
      `Web sayfasına ulaşılamadı (${cleanUrl}). Lütfen linkin doğruluğunu kontrol edin veya sayfa içeriğini kopyalayarak 'Metin Yapıştır' sekmesinden doğrudan dönüştürün.`
    );
  }

  // Parse HTML using DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Remove unwanted elements
  const unwantedSelectors = [
    'script',
    'style',
    'noscript',
    'iframe',
    'nav',
    'header',
    'footer',
    'aside',
    '.sidebar',
    '.ad',
    '.ads',
    '.advertisement',
    '#comments',
    '.comments',
    '.social-share',
    '.breadcrumb',
    '.menu',
    'form',
  ];

  for (const selector of unwantedSelectors) {
    doc.querySelectorAll(selector).forEach((el) => el.remove());
  }

  // Extract Page Title
  let pageTitle = '';
  const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content');
  const h1 = doc.querySelector('h1')?.textContent?.trim();
  const titleTag = doc.querySelector('title')?.textContent?.trim();

  pageTitle = h1 || ogTitle || titleTag || cleanUrl;
  pageTitle = pageTitle.replace(/\s*[-–|].*$/, '').trim(); // Remove site name suffix like " - Fenbilim.net"

  // Extract Tables Before converting text
  const scrapedTables: ScrapedTable[] = [];
  const tableElements = Array.from(doc.querySelectorAll('table'));
  tableElements.forEach((tableEl, idx) => {
    const scraped = htmlTableToMarkdown(tableEl, idx);
    if (scraped && scraped.rowCount > 1) {
      scrapedTables.push(scraped);
    }
  });

  // Extract Images
  const scrapedImages: ScrapedImage[] = [];
  const imgElements = Array.from(doc.querySelectorAll('img'));
  const seenSrcs = new Set<string>();

  for (const img of imgElements) {
    let src = img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-original');
    if (!src) continue;

    // If wrapped in an <a> linking to full image, prefer full image
    const parentLink = img.closest('a');
    if (parentLink) {
      const href = parentLink.getAttribute('href');
      if (href && /\.(jpg|png|jpeg|webp)$/i.test(href)) {
        src = href;
      }
    }

    // Resolve relative URLs to absolute
    try {
      src = new URL(src, cleanUrl).href;
    } catch {
      continue;
    }

    // Upgrade http to https
    if (src.startsWith('http://')) {
      src = src.replace('http://', 'https://');
    }

    // Upgrade Blogger / Google thumbnail sizes to s1600 for sharp display
    if (src.includes('blogger.googleusercontent.com') || src.includes('bp.blogspot.com')) {
      src = src.replace(/\/(s320|s400|s499|s640|s72-c|w\d+-h\d+[^/]*)\//, '/s1600/');
    }

    if (seenSrcs.has(src)) continue;

    // Filter out common unwanted non-educational icons/logos/backgrounds
    const lowerSrc = src.toLowerCase();
    const rawAlt = (img.getAttribute('alt') || '').trim();
    const title = (img.getAttribute('title') || '').trim();

    if (
      lowerSrc.includes('logo') ||
      lowerSrc.includes('icon') ||
      lowerSrc.includes('avatar') ||
      lowerSrc.includes('badge') ||
      lowerSrc.includes('banner_ad') ||
      lowerSrc.includes('pixel') ||
      lowerSrc.includes('spacer') ||
      lowerSrc.includes('button') ||
      lowerSrc.includes('repeat-bg') ||
      lowerSrc.includes('bgdot') ||
      lowerSrc.includes('quote') ||
      lowerSrc.includes('dmca') ||
      lowerSrc.endsWith('.svg') ||
      lowerSrc.endsWith('.gif')
    ) {
      continue;
    }

    // Check figure caption if present
    let caption = '';
    const figure = img.closest('figure');
    if (figure) {
      const figcap = figure.querySelector('figcaption');
      if (figcap) {
        caption = figcap.textContent?.trim() || '';
      }
    }

    // Generate descriptive alt if missing
    let finalAlt = rawAlt || title || caption;
    if (!finalAlt) {
      const urlFileName = src.split('/').pop()?.split('.')[0] || '';
      if (urlFileName && urlFileName.length > 3) {
        finalAlt = urlFileName.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      } else {
        finalAlt = 'Konu Anlatımı Görseli';
      }
    }

    seenSrcs.add(src);
    scrapedImages.push({
      src,
      alt: finalAlt,
      caption: caption || undefined,
    });

    if (scrapedImages.length >= 8) break; // Keep top educational images
  }

  // Check if text indicates the start of questions/evaluation section
  const isQuestionMarker = (txt: string): boolean => {
    const lower = txt.toLowerCase().trim();
    return (
      lower.startsWith('sorular') ||
      lower.startsWith('örnek sorular') ||
      lower.startsWith('çalışma soruları') ||
      lower.startsWith('konu değerlendirme') ||
      lower.startsWith('değerlendirme soruları') ||
      lower.startsWith('konu sonu test') ||
      lower.startsWith('kazanım testi') ||
      lower.startsWith('çıkmış sorular') ||
      lower.startsWith('etkinlik soruları') ||
      /^soru\s*[1-9]/i.test(lower) ||
      /^örnek\s*[1-9]/i.test(lower) ||
      /^test\s*[1-9]/i.test(lower) ||
      lower.includes('aşağıdaki soruları cevaplayınız') ||
      lower.includes('doğru yanlış soruları') ||
      lower.includes('boşluk doldurma soruları') ||
      lower.includes('cevap anahtarı')
    );
  };

  // Extract Headings (stopping at question sections)
  const headings: string[] = [];
  const headingElements = Array.from(doc.querySelectorAll('h1, h2, h3, h4'));
  for (const h of headingElements) {
    const text = h.textContent?.trim();
    if (!text || text.length < 3 || text.length > 150) continue;
    if (isQuestionMarker(text)) {
      break; // Stop collecting headings when question section starts
    }
    headings.push(text);
  }

  // Extract Main Article Text (stopping when questions/exercises begin)
  const articleEl =
    doc.querySelector('article') ||
    doc.querySelector('main') ||
    doc.querySelector('.post-content') ||
    doc.querySelector('.entry-content') ||
    doc.body;
  const paragraphs: string[] = [];

  const textNodes = Array.from(articleEl.querySelectorAll('p, li, blockquote, div.content, h2, h3, h4'));
  for (const el of textNodes) {
    const text = el.textContent?.trim();
    if (!text || text.length < 20) continue;

    // Detect if we hit the questions/quizzes section at the end of the topic
    if (isQuestionMarker(text)) {
      break; // End of subject explanation reached! Do not extract questions.
    }

    if (!text.startsWith('Copyright') && !text.includes('Tüm hakları saklıdır')) {
      paragraphs.push(text);
    }
  }

  const mainText = paragraphs.slice(0, 50).join('\n\n');

  // Format AI prompt data with all tables and images explicitly presented
  let promptBuilder = `### KAYNAK WEB SAYFASI BİLGİLERİ:\n`;
  promptBuilder += `- Kaynak Link: ${cleanUrl}\n`;
  promptBuilder += `- Sayfa Başlığı: ${pageTitle}\n`;
  if (headings.length > 0) {
    promptBuilder += `- Sayfadaki Ana Başlıklar: ${headings.slice(0, 10).join(' | ')}\n`;
  }

  if (scrapedTables.length > 0) {
    promptBuilder += `\n### SAYFADAKİ TABLOLAR (ŞABLONLARI KORUNMALIDIR):\n`;
    scrapedTables.forEach((t) => {
      promptBuilder += `\n#### ${t.title}:\n${t.markdown}\n`;
    });
  } else {
    promptBuilder += `\n(Sayfada özel HTML tablosu bulunamadı, metin içindeki karşılaştırmalar incelenecek.)\n`;
  }

  if (scrapedImages.length > 0) {
    promptBuilder += `\n### SAYFADAKİ GÖRSELLER (METNE YERLEŞTİRİLİRKEN ALTINA TAM ALINTI LİNKİ EKLENMELİDİR):\n`;
    scrapedImages.forEach((img, i) => {
      promptBuilder += `- Görsel ${i + 1}: URL: ${img.src} | Açıklama: ${img.alt}${img.caption ? ` | Altyazı: ${img.caption}` : ''}\n  (Zorunlu kural: Metne eklerken altına "fenbilim.net alıntıdır. [Resim Link](${img.src})" şeklinde alıntı ve resim linkini yerleştir.)\n`;
    });
  }

  promptBuilder += `\n### KAYNAK METİN İÇERİĞİ:\n${mainText}\n`;

  return {
    url: cleanUrl,
    title: pageTitle,
    headings,
    mainText,
    images: scrapedImages,
    tables: scrapedTables,
    formattedPromptForAi: promptBuilder,
  };
}
