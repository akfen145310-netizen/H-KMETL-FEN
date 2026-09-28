const fs = require('fs');
const path = require('path');

// Helper to determine the domain of a chapter for topic-specific representation and harmony
function getDomain(id, title) {
  const s = (id + ' ' + title).toLowerCase();
  if (/gunes|ay|dunya|tutulma|uzay|mevsimler|iklim/.test(s)) return 'astronomy';
  if (/sindirim|besin|gıd/.test(s)) return 'digestion';
  if (/dolasim|kan|kalp/.test(s)) return 'circulation';
  if (/solunum|akciger|nefes/.test(s)) return 'respiration';
  if (/bosaltim|bobrek/.test(s)) return 'excretion';
  if (/denetleyici|duzenleyici|sinir|hormon/.test(s)) return 'nervous';
  if (/destek|hareket|kemik|kas|iskelet/.test(s)) return 'musculoskeletal';
  if (/ureme|buyume|gelisme/.test(s)) return 'reproduction';
  if (/hucre|organel/.test(s)) return 'cell';
  if (/dna|genetik|kalitim|mutasyon|adaptasyon|biyoteknoloji/.test(s)) return 'genetics';
  if (/kuvvet|kutle|agirlik|surtunme|bileske|surat|is-enerji|enerji-donusum|basinc|basit-makine/.test(s)) return 'physics';
  if (/isik|golge|yansima|ayna|mercek|sogurulma|kirilma/.test(s)) return 'optics';
  if (/tanecikli|isi|sicaklik|hal-degisim|genlesme|buzulme|yogunluk|saf-madde|karisim|periyodik|kimyasal|asit|baz/.test(s)) return 'chemistry';
  if (/elektrik|devre|ampul|direnc|yuk/.test(s)) return 'electricity';
  if (/atik|geri-donusum|biyocesitlilik|cevre|besin-zinciri|surdurulebilir|madde-donguleri/.test(s)) return 'ecology';
  return 'general';
}

function getCleanTopic(title) {
  if (!title) return '';
  const parts = title.split(':');
  return parts[parts.length - 1].trim();
}

function cleanOrthography(str) {
  if (!str) return '';
  return str
    .replace(/Dünyamıza/g, "Dünya'mıza")
    .replace(/Dünyamızdan/g, "Dünya'mızdan")
    .replace(/Dünyamızın/g, "Dünya'mızın")
    .replace(/Dünyamız/g, "Dünya'mız")
    .replace(/Dünyanın/g, "Dünya'nın")
    .replace(/Dünyaya/g, "Dünya'ya")
    .replace(/Güneşin/g, "Güneş'in")
    .replace(/Güneşe/g, "Güneş'e")
    .replace(/Ayın/g, "Ay'ın")
    .replace(/Aya/g, "Ay'a")
    .replace(/\bilahi\b/gi, 'ilahî')
    .replace(/\bhakiki\b/gi, 'hakikî')
    .replace(/\bsemavi\b/gi, 'semavî')
    .replace(/\bfıtri\b/gi, 'fıtrî')
    .replace(/\bnizami\b/gi, 'nizamî')
    .replace(/\bHalık-ı Zülcelalin\b/g, "Halık-ı Zülcelal'in")
    .replace(/\bSanatkârın\b/g, "Sanatkâr'ın")
    .replace(/\bSâni-i Zülcelalin\b/g, "Sâni-i Zülcelal'in")
    .replace(/\bKainatın\b/g, "Kainat'ın")
    .replace(/;\s*onların/g, ', onların')
    .replace(/;\s*Güneş'in/g, ', Güneş\'in')
    .replace(/;\s*kendi kendine/g, ', kendi kendine')
    .replace(/;\s*insanlığa/g, ', insanlığa');
}

function formatShortDescSentence(shortDesc, cleanTopic) {
  let cleaned = cleanOrthography(shortDesc).trim();
  if (!cleaned) return '';
  if (cleaned.endsWith('.')) cleaned = cleaned.slice(0, -1).trim();
  
  // Check if it already has a finite verb
  const hasVerb = /(incelenir|ele alınır|anlatılır|açıklanır|gösterir|sağlar|öğretir|eder|kılar)$/i.test(cleaned);
  if (hasVerb) {
    return `Bu tefekkür bahsinde; ${cleaned}.`;
  }
  return `Bu tefekkür bahsinde; ${cleaned} derinlemesine ele alınmakta ve kainattaki muazzam nizam adım adım keşfedilmektedir.`;
}

function getHarmonyParagraph(domain) {
  switch (domain) {
    case 'astronomy':
      return 'Bu sistemin hiçbir parçası diğerinden bağımsız veya habersiz değildir. Güneş\'in çekirdeğindeki füzyon enerjisinden gezegenlerin eliptik yörüngelerine kadar tüm unsurlar, şaşmaz bir senkronizasyonla birbirini tamamlar. Tıpkı aynı emri dinleyen intizamlı bir ordunun neferleri gibi, her bir gök cismi tam bir dayanışma ve yardımlaşma ile ortak bir maksada hizmet eder.';
    case 'digestion':
    case 'circulation':
    case 'respiration':
    case 'excretion':
    case 'nervous':
    case 'musculoskeletal':
    case 'reproduction':
      return 'Bu sistemin hiçbir organı veya dokusu diğerinden bağımsız ya da habersiz değildir. Bir organın tamamladığı vazife, diğer organın başlangıcı ve hayat vesilesi olur. Tıpkı aynı fabrika çatısı altında senkronize çalışan tezgâhlar gibi, vücuttaki tüm hücreler ve organlar tam bir dayanışma, itaat ve yardımlaşma ile tek bir ortak hayata hizmet eder.';
    case 'cell':
    case 'genetics':
      return 'Bu sistemin hiçbir zerre veya nükleotidi diğerinden habersiz değildir. DNA sarmalındaki bazların eşleşmesinden hücre çekirdeğindeki yönetime kadar her aşama, kusursuz bir bilgi akışıyla yürütülür. Tıpkı devasa bir kütüphanenin fihristi gibi, tüm moleküller tam bir ahenk, disiplin ve yardımlaşma ile hayatın sürekliliğine hizmet eder.';
    case 'physics':
      return 'Bu sistemdeki hiçbir kuvvet veya enerji türü diğerinden habersiz değildir. Bir cismin uyguladığı etki ya da dönüştürdüğü enerji, diğer parçanın dengesine ve hareketine zemin hazırlar. Tıpkı hassas bir saatin çarkları gibi, tüm fiziksel etkenler tam bir dayanışma ve nizam ile ortak bir dengeye hizmet eder.';
    case 'optics':
      return 'Bu sistemdeki hiçbir ışık ışını veya optik yüzey diğerinden bağımsız değildir. Işığın kaynağından çıkışı, doğrusal yayılışı, yüzeyden yansıması veya kırılarak odaklanması birbirine sımsıkı bağlı kanunlarla cereyan eder. Tıpkı kusursuz bir optik laboratuvarı gibi, tüm unsurlar tam bir uyum ve intizam ile görme ve aydınlanma gayesine hizmet eder.';
    case 'chemistry':
      return 'Bu nizamdaki hiçbir atom, molekül veya element diğerinden habersiz değildir. Bir zerreye tesir eden sıcaklık, bütün maddenin hareketini değiştirir; atomların kurduğu bağlar yeni ve hayati bileşiklerin doğmasına vesile olur. Tıpkı aynı lisanı konuşan itaatkâr görevliler gibi, tüm zerreler tam bir yardımlaşma ile kainattaki zengin çeşitliliğe hizmet eder.';
    case 'electricity':
      return 'Bu elektrik sistemindeki hiçbir devre elemanı veya yük diğerinden bağımsız değildir. Üreteçten çıkan elektronlar, iletken telin kılavuzluğunda anahtardan geçerek ampulü ışıldatır. Tıpkı birbirine el veren intizamlı bir zincirin halkaları gibi, tüm bileşenler tam bir dayanışma ve yardımlaşma ile enerjinin akışına hizmet eder.';
    case 'ecology':
      return 'Bu ekolojik dengenin hiçbir halkası diğerinden bağımsız veya habersiz değildir. Güneş\'in enerjisini bağrına basan bitkilerden onları tüketen canlılara ve atıkları temizleyen ayrıştırıcılara kadar her nefer vazifesini bilir. Tıpkı israfsız işleyen devasa bir devridaim tesisi gibi, tüm varlıklar tam bir dayanışma ve iktisat ile yeryüzünün temizliğine ve canlılığına hizmet eder.';
    default:
      return 'Bu sistemin hiçbir parçası diğerinden habersiz değildir. Bir parçanın ürettiği netice, diğer parçanın başlangıcı olur. Tıpkı birbirinin lisanını bilen akıllı görevliler gibi, tüm unsurlar tam bir dayanışma ve yardımlaşma ile tek bir ortak maksada hizmet eder.';
  }
}

function getRepresentationParagraph(domain, cleanTopic) {
  switch (domain) {
    case 'astronomy':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki kubbesinde binlerce avize ve feneri bulunan muazzam bir sarayın lambaları kendi kendine yanıp sönmez, şaşmaz bir elektrik şebekesini ve usta bir mühendisi gösterir; aynen öyle de ${cleanTopic} nizamı, sema tavanına asılmış ilahî kandillerin ve yörüngelerin kusursuz bir saat gibi intizamla işlemesidir.`;
    case 'digestion':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki devasa bir şehrin gıdalarını karşılayan, gelen zahireyi en küçük zerrelerine kadar ayrıştıran, faydalı olanları tasnif edip zararlıları dışarı atan mükemmel bir gıda fabrikası veya saray aşevi mühendissiz ve aşçısız kurulamaz; aynen öyle de ${cleanTopic} nizamı, insan beden sarayındaki o muazzam gıda işleme ve rafine etme dairesinin şaşmaz bir tecellisidir.`;
    case 'circulation':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki büyük bir metropolün tüm mahallelerine temiz su ulaştıran, atık suları toplayıp arıtan ve gece gündüz hiç durmaksızın çalışan devasa bir lojistik su şebekesi kendi kendine döşenemez; aynen öyle de ${cleanTopic} nizamı, beden şehrindeki trilyonlarca hücreye oksijen ve rızık taşıyan o muhteşem nehirler ağının ve pompalama merkezinin şaşmaz bir şubesidir.`;
    case 'respiration':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki yer altındaki devasa bir madende veya kapalı bir şehir merkezinde çalışanların nefes alabilmesi için kurulmuş yüksek teknolojili bir havalandırma, oksijenlendirme ve filtreleme tesisi kendi kendine var olamaz; aynen öyle de ${cleanTopic} nizamı, bedenimizin her an taze hava ile buluşmasını temin eden kusursuz bir ilahî filtreleme dairesidir.`;
    case 'excretion':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki modern bir endüstri şehrinin bütün kimyasal atıklarını mikron düzeyinde filtreleyen, yararlı mineralleri geri kazanıp zararlıları uzaklaştıran ileri teknolojiye sahip bir arıtma tesisi tesadüfen bir araya gelemez; aynen öyle de ${cleanTopic} nizamı, kanımızı her gün defalarca süzen ve arıtan muhteşem bir ilahî laboratuvardır.`;
    case 'nervous':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki bir ülkenin bütün vilayetlerini birbirine bağlayan yüksek hızlı fiber optik haberleşme ağı, telefon santralleri ve merkezî kumanda üssü kendi kendine kurulamaz; aynen öyle de ${cleanTopic} nizamı, beden ülkesindeki milyarlarca sinirsel ve hormonal habercinin tek bir merkezden idare edildiği muazzam bir yönetim sistemidir.`;
    case 'musculoskeletal':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki gökdelenleri ayakta tutan çelik konstrüksiyon, menteşeli kapılar, hidrolik amortisörler ve güçlü vinç motorları usta bir mimarın ve makine mühendisinin eseridir; aynen öyle de ${cleanTopic} nizamı, insan beden sarayını dimdik ayakta tutan ve ona zarafetle hareket kabiliyeti veren kusursuz bir biyomekanik mimaridir.`;
    case 'reproduction':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki küçücük bir tohumun veya çekirdeğin içine koca bir ağacın tüm planını şifreleyen ve onu baharda harika çiçeklerle süsleyen bir tezgâh kendi kendine işleyemez; aynen öyle de ${cleanTopic} nizamı, hayatın devamı için takdir edilmiş o muazzam dokuma ve yaratılış tezgâhının şaşmaz bir mucizesidir.`;
    case 'cell':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki surlarla korunan, merkezinde yönetim sarayı, etrafında enerji santralleri, üretim atölyeleri, kütüphaneleri ve geri dönüşüm merkezleri bulunan modern bir şehir devleti kendi kendine kurulamaz; aynen öyle de ${cleanTopic} nizamı, mikroskobik boyutlarda inşa edilmiş o muazzam ilahî şehrin ve biyolojik fabrikanın şaşmaz bir dairesidir.`;
    case 'genetics':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki trilyonlarca satır hatasız kod içeren devasa bir yazılım programı veya milyonlarca ciltlik bir ansiklopedinin şifreli mikroçipi rastgele tuşlara basılarak yazılamaz; aynen öyle de ${cleanTopic} nizamı, canlıların tüm özelliklerini mikroskobik bir çekirdeğe nakşeden o sonsuz ilim ve kader programının harika bir sahifesidir.`;
    case 'physics':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki ağır yükleri kolayca kaldıran vinçler, hidrolik presler, hassas dişli çarklar ve terazi mekanizmaları mutlaka fizik kanunlarını bilen mahir bir mühendisin planıyla üretilir; aynen öyle de ${cleanTopic} nizamı, kainat atölyesinde eşyayı hareket ettiren, durduran ve dengede tutan görünmeyen ilahî kudret terazisinin şaşmaz bir cilvesidir.`;
    case 'optics':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki ışığı tam odak noktasına toplayan teleskoplar, mikroskoplar ve fotoğraf makineleri optik kanunlarını bilen bir ustanın ilmini gösterir; aynen öyle de ${cleanTopic} nizamı, kainat sergisini aydınlatan nurun, yansımanın ve renklerin arkasındaki sonsuz ilahî cemalin ve basiretin tecellisidir.`;
    case 'chemistry':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki her bir odası belirli bir elemente tahsis edilmiş, kapı numaraları proton sayılarına göre şaşmaz bir nizamla dizilmiş devasa bir kimya sarayı tesadüfen yükselemez; aynen öyle de ${cleanTopic} nizamı, kainat laboratuvarındaki zerrelerin ve elementlerin belirli vezinlerle dizildiği o muazzam intizamın apaçık bir delilidir.`;
    case 'electricity':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki bir şehrin aydınlatma şebekesinde kablolar, transformatörler, emniyet sigortaları ve anahtarlar bilinçli bir elektrik mühendisi tarafından döşenir; aynen öyle de ${cleanTopic} nizamı, görünmeyen elektronları intizamlı bir akımla faydamıza koşturan ilahî hikmet ve nizamın şaşmaz bir yoludur.`;
    case 'ecology':
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki hiçbir atığın çöpe atılmadığı, her bir artığın yeniden işlenip hammaddeye dönüştürüldüğü sıfır atıklı ve mükemmel bir geri dönüşüm kompleksi kendi kendine işleyemez; aynen öyle de ${cleanTopic} nizamı, yeryüzü sofrasında hiçbir zerreyi zayi etmeyen o muazzam Kuddûs ve Rezzâk tecellisinin şaşmaz bir devridaimidir.`;
    default:
      return `Gelin, bu hakikati zihnimizde somutlaştırmak adına Risale-i Nur usulü bir temsil dürbünüyle seyredelim: Nasıl ki binlerce çarkı bulunan antika bir saat veya her departmanı uyumla işleyen devasa bir fabrika kendi kendine kurulamaz ve mutlaka mahir bir ustayı gösterir; aynen öyle de ${cleanTopic} nizamı, kainat sarayındaki o muazzam fabrikanın şaşmaz bir dairesidir.`;
  }
}

function buildTurkishTeacherChapter({ id, title, hikmetliTitle, shortDesc, imageUrl, fenConcept, tefekkurInsight, tableRows, conclusion }) {
  const cleanTopic = getCleanTopic(title);
  const domain = getDomain(id, title);
  const sentenceShortDesc = formatShortDescSentence(shortDesc, cleanTopic);
  
  const cleanedFenConcept = cleanOrthography(fenConcept).trim();
  const cleanedTefekkur = cleanOrthography(tefekkurInsight).trim();
  const cleanedConclusion = cleanOrthography(conclusion).trim();
  
  const harmony = getHarmonyParagraph(domain);
  const representation = getRepresentationParagraph(domain, cleanTopic);

  const cleanedTableRows = tableRows.map(r => [
    cleanOrthography(r[0]),
    cleanOrthography(r[1]),
    cleanOrthography(r[2])
  ]);

  const content = `
# ${hikmetliTitle}

> **Bismillah:** *"Bütün mevcudat lisan-ı hal ile Bismillah der; Halık-ı Zülcelal'in namına hareket edip, O'nun rahmet ve hikmet hazinelerinden birer numuneyi bize takdim eder."*

## 1. Varlığı Tanıt (Sistemin Kapısını Aralama)
${cleanTopic}; kainat kitabında sergilenen muazzam nizamın, ince hendesenin ve ilahî sanatın en ibretli sayfalarından biridir. ${sentenceShortDesc} Nitekim bu muazzam sistem, varlık sahnesinde kendi kendine veya kör bir tesadüf neticesinde ortaya çıkmış değildir; bilakis her bir noktası gayeli, hikmetli ve hayata hizmet edecek bir nizamla var edilmiştir.

## 2. Parçalarını Göster & 3. Her Parçanın Vazifesi (Nasıl ve Neden?)
Bu sistemde vazifeli olan unsurlar, kavramlar ve hadiseler iki derin katmanda şöyle anlaşılır:

- **1. Katman ("NASIL?" — Bilimsel Mekanizma ve Kanunlar):**
${cleanedFenConcept}

- **2. Katman ("NEDEN?" — Hikmet, Gaye ve İlahî Sanat):**
${cleanedTefekkur}

![${hikmetliTitle}](topic://${id})

> **Tefekkür Dürbünü:** Konu illüstrasyonunda sergilenen hassas yapı ve nizam; kör, sağır ve şuursuz maddelerin değil, her şeyi her an gören, bilen ve sonsuz bir hikmetle tanzim eden Yüce Sanatkâr'ın (Sâni-i Hakîm'in) eşsiz mührüdür.

## 4. Parçalar Arasındaki Harika Uyum (Müthiş İttifak)
${harmony}

## 5. Ölçü, Mizan ve İnce Düzen
Sistemdeki oranlar, sayılar, fiziksel büyüklükler ve zamanlamalar milimetrik bir hesapla takdir edilmiştir. Ölçüdeki en ufak bir sapma tüm ahengi bozacakken, kanunların şaşmaz bir istikrarla işlemesi, her şeyin mutlak bir İlim ve Mizan Sahibi tarafından tanzim edildiğini ispatlar.

## 6. Temsil ve Benzetme Dürbünü (Hakikate Açılan Pencere)
${representation}

## 7. Hikmet Penceresi: Canlıya ve Kainata Sunulan Hizmet
Bu sistemin canlılar alemi, insan hayatı ve yeryüzündeki nizam için sunduğu rahmetli hizmetler:

| Fen Bilimleri Unsuru ("Nasıl?") | Hikmet ve İlahî Tecelli ("Neden?") | İnce Ayar ve Tefekkür Dersi |
| :--- | :--- | :--- |
${cleanedTableRows.map(r => `| ${r[0]} | ${r[1]} | ${r[2]} |`).join('\n')}

## 8. İrade, Sanat ve Program Perspektifi
Nitekim aklı, şuuru, bilgisi ve merhameti bulunmayan cansız maddelerin, atomların veya organların böylesine muazzam bir gayede ittifak etmesi, elbette onların kendi kabiliyeti değildir. Bilakis bu durum; her şeyi her an ilmiyle kuşatan, kudretiyle tanzim eden ve sonsuz bir hikmetle programlayan Yüce Sanatkâr'ın (Sâni-i Hakîm'in) eseridir.

## 9. Akıl Yürütme ve Basiret Terazisi
> **Tefekkür ve Muhakeme Sorusu:** "Birbirinden habersiz sayısız parçanın tek bir hedefe yönelik olarak kusursuz bir ahenkle çalışması akla neyi gösterir? Nasıl ki tek bir harf dahi kâtipsiz, bir köy muhtarsız ve küçücük bir iğne ustasız olamaz; öyleyse her an muazzam dengelerle dönen ve işleyen bu harika sistem sahipsiz, ilimsiz ve programsız olabilir mi?"

## 10. Netice ve Tefekkür Meyvesi
${cleanedConclusion}
`.trim();

  return {
    id,
    title,
    hikmetliTitle,
    shortDescription: cleanOrthography(shortDesc),
    imageUrl: "",
    content
  };
}

module.exports = {
  buildTurkishTeacherChapter,
  cleanOrthography,
  getCleanTopic,
  getDomain
};
