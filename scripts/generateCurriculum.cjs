const fs = require('fs');
const path = require('path');

const curriculumDir = path.join(process.cwd(), 'src', 'data', 'curriculum');
if (!fs.existsSync(curriculumDir)) {
  fs.mkdirSync(curriculumDir, { recursive: true });
}

// Helper to build chapter content with 10-Stage Risale-i Nur Thought Framework
function makeChapter({ id, title, hikmetliTitle, shortDesc, imageUrl, fenConcept, tefekkurInsight, tableRows, conclusion, gradeLevel = 5 }) {
  const content = `
# ${hikmetliTitle}

> **Bismillah:** *"Bütün mevcudat lisan-ı hal ile Bismillah der; Halık-ı Zülcelal'in namına hareket edip, O'nun rahmet ve hikmet hazinelerinden birer numuneyi bize takdim eder."*

## 1. Varlığı Tanıt (Sistemin Kapısını Aralama)
**${title}**, kainat kitabında sergilenen harika nizamın ve ilahi sanatın en çarpıcı sayfalarından biridir. ${shortDesc} Bu sistem, varlık sahnesinde kendi kendine veya rastlantıyla ortaya çıkmış değildir; her bir noktası gayeli, hikmetli ve bir amaca hizmet edecek şekilde var edilmiştir.

## 2. Parçalarını Göster & 3. Her Parçanın Vazifesi (Nasıl ve Neden?)
Bu sistemde vazifeli olan unsurlar, kavramlar ve hadiseler iki derin katmanda şöyle anlaşılır:

- **1. Katman ("NASIL?" — Bilimsel Mekanizma ve Kanunlar):**
${fenConcept}

- **2. Katman ("NEDEN?" — Hikmet, Gaye ve İlahi Sanat):**
${tefekkurInsight}

${imageUrl ? `![${hikmetliTitle}](${imageUrl})
fenbilim.net alıntıdır. [Resim Link](${imageUrl})
> **Tefekkür Dürbünü:** Görseldeki hassas yapı ve nizam; kör, sağır ve şuursuz maddelerin değil, her şeyi her an gören ve bilen bir Sanatkârın mührüdür.
` : ''}

## 4. Parçalar Arasındaki Harika Uyum (Müthiş İttifak)
Bu sistemin hiçbir parçası diğerinden habersiz değildir. Bir parçanın ürettiği netice, diğer parçanın başlangıcı olur. Tıpkı birbirinin lisanını bilen akıllı görevliler gibi, tüm unsurlar tam bir dayanışma ve yardımlaşma ile tek bir ortak maksada hizmet eder.

## 5. Ölçü, Mizan ve İnce Düzen
Sistemdeki oranlar, sayılar, fiziksel büyüklükler ve zamanlamalar milimetrik bir hesapla takdir edilmiştir. Ölçüdeki en ufak bir sapma tüm ahengi bozacakken, kanunların şaşmaz bir istikrarla işlemesi mutlak bir nizamın varlığını ispatlar.

## 6. Temsil ve Benzetme Dürbünü (Hakikate Açılan Pencere)
Gelin bu hakikati 5. sınıf seviyemize uygun bir temsil dürbünüyle anlayalım:
Nasıl ki binlerce çarkı, akrebi ve yelkovanı olan antika bir saat veya her departmanı birbiriyle uyumla işleyen devasa bir fabrika; kendi kendine kurulamaz, parçaları tesadüfen birleşemez ve mutlaka usta bir mühendisin ilmini gösterir. Aynen öyle de **${title}** nizamı, kainat sarayındaki o muazzam fabrikanın şaşmaz bir dairesidir.

## 7. Hikmet Penceresi: Canlıya ve Kainata Sunulan Hizmet
Bu sistemin canlılar alemi, insan hayatı ve yeryüzündeki nizam için sunduğu rahmetli hizmetler:

| Fen Bilimleri Unsuru ("Nasıl?") | Hikmet ve İlahî Tecelli ("Neden?") | İnce Ayar ve Tefekkür Dersi |
| :--- | :--- | :--- |
${tableRows.map(r => `| ${r[0]} | ${r[1]} | ${r[2]} |`).join('\n')}

## 8. İrade, Sanat ve Program Perspektifi
Aklı, şuuru, gözü ve merhameti olmayan cansız atomların veya maddelerin böylesine muazzam bir gayede birleşmesi; onların kendi kabiliyeti değildir. Bu durum, her şeyin arkasında sonsuz bir İrade, Program, Kusursuz Sanat ve Hikmet Sahibinin (Sâni-i Zülcelal'in) bulunduğunu açıkça ilan eder.

## 9. Akıl Yürütme ve Basiret Terazisi
> **Tefekkür ve Muhakeme Sorusu:** *"Bu kadar farklı parçanın birbirini tamamlayacak şekilde kusursuz çalışması bize nasıl bir düzen gösteriyor? Bir harf katipsiz, bir köy muhtarsız, bir iğne ustasız olamazken; bu harika sistem nasıl sahipsiz ve programsız olabilir?"*

## 10. Netice ve Tefekkür Meyvesi
${conclusion}
`.trim();

  return {
    id,
    title,
    hikmetliTitle,
    shortDescription: shortDesc,
    imageUrl,
    content
  };
}

// GRADE 5 DATA
const grade5Units = [
  {
    id: "5-u1-gokyuzundeki-komsularimiz",
    title: "1. ÜNİTE: Gökyüzündeki Komşularımız ve Biz",
    chapters: [
      makeChapter({
        id: "5-u1-c1-gunes",
        title: "1. Bölüm: Gökyüzündeki Komşumuz: Güneş",
        hikmetliTitle: "Güneş: Semadaki İlahî Lamba ve Hayat Kaynağı",
        shortDesc: "Güneş'in yapısı, katmanları, akıl almaz büyüklüğü ve Dünyamıza sunduğu ölçülü ısı ve ışık rahmeti.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHZ_hgcG8CJV_PLW-xjFGRKMoDNLjWdV-3JDIdiZMmhQMCGJIB5V19AOB1oPEqUl2TTYXN-uz1UsS9utfDB0PZlZ1rJkUL234rUqVm_flUdwyeBauU5PXUrpRHmNyvVaph2eL5uq2v1xCR/s1600/gunes-katmanlari.png",
        fenConcept: "Güneş, Samanyolu Galaksisi'nde orta büyüklükte bir yıldızdır. Küre şeklinde olup merkezindeki çekirdekte hidrojenin helyuma dönüşmesiyle muazzam bir ısı ve ışık enerjisi açığa çıkar. Dünyamızdan yaklaşık 149,5 milyon kilometre uzaktadır ve Dünya'nın yaklaşık 109 katı çapa, 1 milyon 300 bin katı hacme sahiptir.",
        tefekkurInsight: "Trilyonlarca ton hidrojen gazının uzay boşluğunda bir anda patlayıp tükenmek yerine, milyarlarca yıldır saniyede milyonlarca tonluk muntazam bir ölçüyle kontrollü şekilde yakılması; Güneş'in arkasındaki sonsuz ilim ve kudret sahibinin idaresini ispatlar.",
        tableRows: [
          ["Güneş'in çekirdeğindeki termonükleer füzyon", "Canlıların rızkı için gökyüzüne asılmış sönmez bir ilahî ocak", "Şuursuz gazlar canlıların ihtiyacını bilip ısı ve ışık üretemez."],
          ["149.5 milyon km'lik hassas mesafe", "Dünya'nın donmaması ve yanmaması için takdir edilmiş rahmet mesafesi", "İnce ayar, kainattaki her şeyin bir ölçü ile yaratıldığını gösterir."],
          ["Güneş lekeleri ve dönme hareketi", "Semavi lambanın kendi ekseni etrafında intizamlı dönüşü", "Her gök cismi belirlenmiş bir yörüngede vazifesini icra eder."]
        ],
        conclusion: "Güneş, kendi başına yanan şuursuz bir gök cismi değil; yeryüzü sarayında ağırlanan canlılara ısı, ışık ve hayat ulaştırmak üzere vazifelendirilmiş muazzam bir memurdur."
      }),
      makeChapter({
        id: "5-u1-c2-ay",
        title: "2. Bölüm: Gökyüzündeki Komşumuz: Ay",
        hikmetliTitle: "Ay: Geceyi Aydınlatan Kandil ve İlahî Takvim",
        shortDesc: "Ay'ın yapısı, atmosferi, evreleri ve yeryüzündeki zaman hesaplarına birer takvim oluşundaki hikmetler.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6w78g492gE0tZ0P4g3Y-H6Tqf0r4i2Z8Y8d8g7h6j5k4l3m2n1o/s1600/ayin-evreleri.jpg",
        fenConcept: "Ay, Dünya'mızın tek doğal uydusudur. Kendi ışığı yoktur; Güneş'ten aldığı ışığı yansıtır. Atmosferi yok denecek kadar incedir; bu sebeple gece ile gündüz arasındaki sıcaklık farkı çok yüksektir ve rüzgar, yağmur gibi hava olayları görülmez. Dünya etrafında dolanırken Güneş'e göre konumu değiştikçe hilal, ilk dördün, dolunay ve son dördün evrelerini alır.",
        tefekkurInsight: "Ay'ın gökyüzünde hilalden dolunaya muntazam bir ritimle büyüyüp küçülmesi, insanlığa binlerce yıldır göksel bir takvim vazifesi görmekte ve zamanı ölçmeyi öğretmektedir.",
        tableRows: [
          ["Ay'ın Güneş ışığını yansıtması", "Gözleri kamaştırmayan zarif bir gece lambası ve nur aynası", "Doğrudan yakmayan, dinlendirici bir ışığın insan fıtratına uygun tanzimi."],
          ["Ay'ın evrelerinin 29.5 günde tekrarlanması", "İnsanlar için gökyüzüne asılmış şaşmaz bir takvim ve hesap göstergesi", "Tesadüf bu kadar dakik bir matematiksel periyodu devam ettiremez."],
          ["Ay'ın Dünya ile kütleçekim kilidi (hep aynı yüzünün görünmesi)", "Dünyamıza bakan yüzün korunması ve dengeli çekim tesiri", "Kainatta hiçbir hareket başıboş değildir."]
        ],
        conclusion: "Ay, gecenin karanlığında yeryüzüne huzur ve sükunet bahşeden bir kandil; günleri ve ayları hesaplamaya yarayan ilahî bir takvimdir."
      }),
      makeChapter({
        id: "5-u1-c3-dunya-ve-komsulari",
        title: "3. Bölüm: Dünya'mız ve Gökyüzündeki Komşularımız",
        hikmetliTitle: "Dünya ve Semavi Komşuları: Kainat Sarayındaki Muazzam Dans",
        shortDesc: "Güneş, Dünya ve Ay'ın birbirlerine göre hareketleri, dönme ve dolanma süreleri ve kusursuz senkronizasyon.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7XQ7Y1Z5_5v-N2e4s_U8k1q0z-9y6l4w2t5r8/s1600/dunya-gunes-ay-hareketleri.png",
        fenConcept: "Dünya kendi ekseni etrafında 24 saatte dönerek gece ve gündüzü; Güneş etrafında 365 gün 6 saatte dolanarak mevsimleri oluşturur. Ay, hem kendi etrafında hem de Dünya etrafında yaklaşık 27,3 günde döner. Bu hareketlerin yönü batıdan doğuya (saat yönünün tersine) doğrudur.",
        tefekkurInsight: "Milyarlarca tonluk devasa gök cisimlerinin uzay boşluğunda hiçbir ray veya direk olmadan, birbirine çarpmadan ve milimetrik bir senkronizasyonla dönmesi, Kainat Sultanı'nın mutlak nizamını haykırır.",
        tableRows: [
          ["Dünya'nın kendi etrafında 24 saatlik dönüşü", "Canlıların çalışma ve dinlenme fıtratına uygun gece-gündüz tanzimi", "Gündüz maişet, gece sükunet için özel olarak dizayn edilmiştir."],
          ["Ay ve Dünya'nın hareket yönlerinin uyumu", "Kainattaki ahenk, birlik (tevhid) ve intizam mührü", "Birden fazla idareci olsaydı göklerde kaos çıkardı."],
          ["Yörünge kararlılığı ve kütleçekim dengesi", "Gök cisimlerinin boşlukta düşmeden ve savrulmadan yüzdürülmesi", "Kudret kanunları kainatı bir nakış gibi işlemektedir."]
        ],
        conclusion: "Güneş, Dünya ve Ay; sema kubbesinde başıboş değil, her biri kendisi için çizilmiş yörüngede itaatle vazife yapan ilahî memurlardır."
      })
    ]
  },
  {
    id: "5-u2-kuvveti-taniyalim",
    title: "2. ÜNİTE: Kuvveti Tanıyalım",
    chapters: [
      makeChapter({
        id: "5-u2-c1-kuvvet-ve-olculmesi",
        title: "1. Bölüm: Kuvvet ve Kuvvetin Ölçülmesi",
        hikmetliTitle: "Kuvvet ve Ölçülmesi: Kudretin Eşyadaki Görünmeyen Eli",
        shortDesc: "Duran cisimleri hareket ettiren, hareketlileri durduran kuvvet kavramı, dinamometre ve esneklik kanunu.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEig7z5r4m3k2j1h0g9f8e7d6c5b4a3_2z1y0x9/s1600/dinamometre-kuvvet.jpg",
        fenConcept: "Kuvvet, duran bir cismi hareket ettirebilen, hareket eden bir cismi durdurabilen, yönünü, hızını ve şeklini değiştirebilen etkidir. Birimi Newton'dur (N) ve dinamometre ile ölçülür. Dinamometreler esnek yayların uzama prensibine göre çalışır.",
        tefekkurInsight: "Maddenin kendi başına kör ve cansız zerrelerden oluştuğu düşünülürse; eşyayı hareket ettiren veya durduran kuvvet kanunları, Fail-i Hakiki'nin mülkündeki tasarrufunu gösterir.",
        tableRows: [
          ["Kuvvetin yön, doğrultu ve büyüklüğe sahip olması", "Eşyaya yön veren mutlak bir irade ve planın varlığı", "Tesadüfi etkiler belirli bir gaye ve intizam doğuramaz."],
          ["Yaylardaki esneklik özelliği", "Maddeye verilmiş biçim değiştirip eski haline dönebilme kabiliyeti", "Esneklik kanunu olmasaydı ölçüm ve pek çok teknoloji imkansız olurdu."],
          ["Dinamometredeki orantılı uzama (Hooke Kanunu)", "Kainatta geçerli matematiksel adalet ve mizan", "Maddenin her tepkisi şaşmaz bir hesapla takdir edilmiştir."]
        ],
        conclusion: "Kuvvet, kainat tezgâhında eşyayı şekillendiren, hareket ettiren ve nizama sokan ilahî kudretin görünmeyen bir tecellisidir."
      }),
      makeChapter({
        id: "5-u2-c2-kutle-ve-agirlik",
        title: "2. Bölüm: Kütle ve Ağırlık İlişkisi",
        hikmetliTitle: "Kütle ve Ağırlık: Mizan ve Yerçekimindeki İnce Ayar",
        shortDesc: "Değişmeyen madde miktarı kütle ile gök cisminin uyguladığı kütleçekim kuvveti olan ağırlık arasındaki tefekkür.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4t3r2e1w0q9z8y7x6c5v4b3n2m1_kutle-agirlik.png",
        fenConcept: "Kütle, bir cismi oluşturan değişmeyen madde miktarıdır; eşit kollu terazi ile ölçülür ve birimi kg veya gramdır. Ağırlık ise bir cisme etki eden yerçekimi kuvvetidir; dinamometre ile ölçülür, birimi Newton'dur ve bulunulan gezegene veya konuma göre değişir.",
        tefekkurInsight: "Dünya'nın bizi uzaya fırlatmadan tam kıvamında bir yerçekimiyle bağrına basması, hem yürüyebilmemizi hem de ezilmeden nefes alabilmemizi sağlayan bir rahmet cilvesidir.",
        tableRows: [
          ["Kütlenin evrenin her yerinde sabit kalması", "Eşyanın hakikatinin ve varlık cevherinin korunması kanunu", "Yaratılan her zerrenin kimliği korunmaktadır."],
          ["Ağırlığın yerçekimine göre değişmesi", "Maddenin bulunduğu ortamla girdiği münasebet ve itaat hali", "Çekim kuvveti bir an kalksa denizler ve atmosfer uzaya dağılırdı."],
          ["Dünya'daki çekim kuvvetinin canlılara uygunluğu", "İnsan iskeleti ve kan dolaşımına tam uygun takdir edilmiş çekim", "Jüpiter gibi olsaydı ezilirdik, Ay gibi olsaydı atmosfer tutunamazdı."]
        ],
        conclusion: "Ağırlık ve yerçekimi, yeryüzü beşiğinde emniyetle yaşayabilmemiz için takdir edilmiş şefkatli bir çekim bağıdır."
      }),
      makeChapter({
        id: "5-u2-c3-surtunme-kuvveti",
        title: "3. Bölüm: Sürtünme Kuvveti",
        hikmetliTitle: "Sürtünme Kuvveti: Dengeli Hareketin ve Emniyetin Rahmetli Freni",
        shortDesc: "Hareketi zorlaştıran ama yürümemizi, durmamızı ve yazı yazmamızı sağlayan sürtünme kuvvetinin sırları.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8y7x6c5v4b3n2m1_surtunme-kuvveti.jpg",
        fenConcept: "Sürtünme kuvveti, temas eden yüzeyler arasında hareketi zorlaştıran veya engelleyen kuvvettir. Yüzeyin pürüzlülüğüne ve cismin ağırlığına bağlıdır. Havanın sürtünmesine hava direnci, suyun sürtünmesine su direnci denir. Kinetik enerjiyi ısı enerjisine dönüştürür.",
        tefekkurInsight: "Sürtünme ilk bakışta hareketi engelleyen bir zorluk gibi görünse de; o olmasaydı ne yürüyebilir, ne araba durabilir, ne de elimizdeki bir bardağı tutabilirdik. Her şey sonsuza dek kayıp giderdi.",
        tableRows: [
          ["Yüzeyler arasındaki mikroskobik pürüzlerin kilitlenmesi", "Hareketin kontrol altında tutulması için eşyaya konulmuş ilahî fren", "Sürtünme olmasaydı yeryüzünde hiçbir bina ve eşya sabit kalamazdı."],
          ["Hava direncinin paraşütçüleri ve yağmur damlalarını yavaşlatması", "Gökten inen damlaların kurşun gibi başımıza inmesini önleyen hava yastığı", "Atmosfer gazları merhametle hız kesici bir perde kılınmıştır."],
          ["Sürtünmenin ısıya dönüşmesi", "Enerjinin yok olmayıp başka bir hikmetli şekle bürünmesi", "Kainatta hiçbir emek ve hareket israf edilmez."]
        ],
        conclusion: "Sürtünme kuvveti, insan hayatının dengesi, emniyeti ve adımlarının sağlamlığı için yerleştirilmiş gizli bir rahmet kanunudur."
      })
    ]
  },
  {
    id: "5-u3-canlilarin-yapisina-yolculuk",
    title: "3. ÜNİTE: Canlıların Yapısına Yolculuk",
    chapters: [
      makeChapter({
        id: "5-u3-c1-hucre-ve-organelleri",
        title: "1. Bölüm: Hücre ve Organelleri",
        hikmetliTitle: "Hücre ve Organelleri: Mikroskobik Şehirdeki Muazzam Sanat",
        shortDesc: "Canlılığın en küçük yapı taşı hücre, çekirdek, sitoplazma, hücre zarı ve organellerin muazzam iş bölümü.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3d2c1b0a9z8y7x6c5v4_hucre-yapisi.png",
        fenConcept: "Hücre, canlıların canlılık özelliği gösteren en küçük yapı birimidir. Hücre zarı, sitoplazma ve çekirdek olmak üzere üç ana kısımdan oluşur. Sitoplazmada mitokondri (enerji), ribozom (protein), kloroplast (fotosentez), koful (depo) gibi hayati organeller görev yapar. Bitki ve hayvan hücreleri arasında kloroplast, hücre duvarı ve sentriyoller gibi farklar vardır.",
        tefekkurInsight: "Gözle görülemeyecek kadar minik bir hücrenin içinde binlerce fabrikanın, enerji santrallerinin ve bilgi kütüphanelerinin kusursuz bir intizamla çalışması, Sanatkâr-ı Ezelî'nin sonsuz ilmini gösterir.",
        tableRows: [
          ["Hücre zarının seçici geçirgenliği", "Şehre giren çıkan maddeleri tanıyan şuurlu bir gümrük kapısı", "Cansız moleküller neyin faydalı neyin zehirli olduğunu kendi kendine bilemez."],
          ["Mitokondrinin enerji (ATP) üretmesi", "Mikroskobik beden santralinin gece gündüz canlılığa güç vermesi", "Açığa çıkan enerji canlılığın devamı için kusursuz tanzim edilmiştir."],
          ["Çekirdekteki DNA yönetim merkezi", "Milyarlarca harflik hayat programının mikronluk çekirdeğe şifrelenmesi", "Kitap varsa yazar vardır; bu muazzam kod tesadüfen yazılamaz."]
        ],
        conclusion: "Her bir hücre, içine ciltler dolusu bilgi ve fabrika yerleştirilmiş mikroskobik bir sanat şaheseridir."
      }),
      makeChapter({
        id: "5-u3-c2-destek-ve-hareket",
        title: "2. Bölüm: Destek ve Hareket Sistemi",
        hikmetliTitle: "Destek ve Hareket Sistemi: İnsan Bedenindeki Kusursuz Mimari",
        shortDesc: "Kemikler, eklemler, kıkırdak ve kasların bir araya gelerek bedene sağladığı sağlamlık, esneklik ve hareket nimeti.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2a1z0y9x8w7v6u5t4s3_destek-hareket.jpg",
        fenConcept: "Destek ve hareket sistemi; iskelet sistemi (kemikler, kıkırdak, eklemler) ve kas sisteminden (çizgili, düz, kalp kası) oluşur. Kemikler vücuda şekil verir, iç organları korur, kalsiyum depolar ve kan hücresi üretir. Eklemler kemikleri birbirine bağlayarak hareketi sağlar.",
        tefekkurInsight: "206 kemiğin birbirine menteşelenmesi, eklem sıvısıyla yağlanarak aşınmasının önlenmesi ve kasların zıt çiftler halinde kasılıp gevşeyerek bizi yürütmesi, ilahî bir biyomühendislik harikasıdır.",
        tableRows: [
          ["Kemiklerin hafif ama çelikten sağlam yapısı", "Bedenin kolay taşınabilmesi ve organların zırh gibi korunması", "Ağır olsaydı yürüyemezdik, zayıf olsaydı ayakta duramazdık."],
          ["Eklem sıvısının (sinovyal sıvı) ömür boyu yağlama yapması", "Sürtünmeyi sıfırlayarak kemiklerin erimesini engelleyen rahmet", "İnsan yapımı hiçbir makine ömür boyu yağlanmadan çalışamaz."],
          ["Kalp kasının istemsiz ve yorulmaksızın atması", "İnsanın uyurken dahi hayatının kesintisiz idame ettirilmesi", "Kendi irademize bırakılsaydı uyuduğumuz anda hayat biterdi."]
        ],
        conclusion: "Destek ve hareket sistemimiz, her an şükretmemiz gereken kusursuz bir mimari ve paha biçilmez bir hareket hürriyetidir."
      })
    ]
  },
  {
    id: "5-u4-isigin-dunyasi",
    title: "4. ÜNİTE: Işığın Dünyası",
    chapters: [
      makeChapter({
        id: "5-u4-c1-isigin-yayilmasi",
        title: "1. Bölüm: Işığın Yayılması",
        hikmetliTitle: "Işığın Yayılması: Nurun Kainata Süratli ve Doğrusal Tecellisi",
        shortDesc: "Işık kaynakları, ışığın her yöne ve doğrusal yollarla yayılması ve görme nimetinin temelleri.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7f6e5d4c3b2a1z0_isigin-yayilmasi.png",
        fenConcept: "Işık bir enerji türüdür. Doğal ve yapay ışık kaynaklarından çıkan ışık, homojen ortamlarda her yöne ve doğrular (ışınlar) boyunca saniyede 300.000 km hızla yayılır. Işığın doğrusal yayıldığının en büyük kanıtı gölge oluşumu ve iğne deliği kamerasındaki görüntüdür.",
        tefekkurInsight: "Işığın her yöne doğrusal olarak yayılması, kainattaki karanlık köşelerin aydınlanmasını ve varlıkların birbirini görüp tanımasını sağlayan nurani bir lütuftur.",
        tableRows: [
          ["Işığın saniyede 300.000 km hızla yayılması", "Güneş'ten çıkan ışığın 8 dakikada canlılara hayat ulaştırması", "Akıl almaz hız, kainattaki haberleşmenin ve hayatın anında tecellisidir."],
          ["Işığın her yöne doğrusal yayılması", "Adaletli bir aydınlanma ve görme hadisesinin nizamı", "Işık eğri büğrü yayılsaydı net görme ve gölge oluşamazdı."],
          ["Işık ışınlarının birbirinin içinden geçebilmesi", "Milyarlarca görüntünün birbirine karışmadan gözümüze ulaşması", "Göz bebeğimize aynı anda binlerce varlığın resmi nizamla girer."]
        ],
        conclusion: "Işık, kainat sergisindeki ilahî sanatları temaşa edebilmemiz için yaratılmış en süratli ve latif memurdur."
      }),
      makeChapter({
        id: "5-u4-c2-isik-madde-etkilesimi",
        title: "2. Bölüm: Işığın Madde İle Etkileşimi",
        hikmetliTitle: "Işığın Madde İle Etkileşimi: Saydamlık, Yansıma ve Hikmetli Perdeler",
        shortDesc: "Saydam, yarı saydam ve opak maddeler; ışığın geçişi ve canlıların yaşamına sunduğu mahremiyet ve aydınlık.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8k7j6h5g4f3e2d1_madde-isik.jpg",
        fenConcept: "Işığı tamamen geçiren maddelere saydam (cam, hava, su), kısmen geçirenlere yarı saydam (buzlu cam, yağlı kağıt), hiç geçirmeyenlere ise opak (opak/saydam olmayan: tahta, taş, demir) maddeler denir. Opak maddeler ışığı soğurur veya yansıtır.",
        tefekkurInsight: "Eğer her şey saydam olsaydı evlerimizde mahremiyet ve gölgelik kalmazdı; her şey opak olsaydı ne pencerelerimizden ışık girer ne de gözlerimiz görebilirdi.",
        tableRows: [
          ["Göz merceğimizin ve korneanın saydam yaratılması", "Işığın retina tabakasına engelsiz geçip görmeyi sağlaması", "Göz dokusu opak olsaydı dünya ebedi bir karanlık olurdu."],
          ["Havanın ve suyun saydam olması", "Güneş ışığının yeryüzüne ve deniz diplerindeki canlılara ulaşması", "Hava opak olsaydı yeryüzünde fotosentez ve yaşam mümkün olmazdı."],
          ["Toprağın ve duvarların opak olması", "Canlılara gölgelenme, sığınma ve mahremiyet alanı sunulması", "Her maddenin geçirgenliği fıtratına ve vazifesine göre ayarlanmıştır."]
        ],
        conclusion: "Maddelerin saydamlık dereceleri, canlıların barınma, görme ve beslenme ihtiyaçlarına göre milimetrik bir hikmetle tayin edilmiştir."
      }),
      makeChapter({
        id: "5-u4-c3-tam-golge",
        title: "3. Bölüm: Tam Gölgenin Oluşumu",
        hikmetliTitle: "Tam Gölgenin Oluşumu: Işığın Yokluğundaki Varlık ve İbret",
        shortDesc: "Opak cisimlerin arkasında oluşan tam gölge, gölge boyunun değişimi ve gölgelerin insana verdiği serinlik nimeti.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd5c4b3a2z1y0x9_tam-golge.png",
        fenConcept: "Işık kaynağından çıkan ışınlar opak cisimle karşılaştığında cismin arkasına geçemez. Bu sebeple cismin arkasındaki karanlık bölgeye tam gölge denir. Işık kaynağı ile cisim arasındaki mesafe değiştikçe gölgenin büyüklüğü ve şekli değişir.",
        tefekkurInsight: "Gölge, ışığın yokluğu gibi görünse de aslında kavurucu güneşin altında canlılara bir sığınak ve serinlik rahmetidir.",
        tableRows: [
          ["Işığın doğrusal yayılması sonucu gölge sınırlarının netliği", "Geometrik kanunların kainattaki kusursuz tatbikatı", "Işığın kanunları değişmez, hendese şaşmaz."],
          ["Güneş'in gün içindeki konumuna göre gölge boylarının değişmesi", "İnsanlara zamanı ve namaz vakitlerini gösteren tabii güneş saati", "Gölge boyu asırlarca insanlığın zaman pusulası olmuştur."],
          ["Gölgenin serinliği ve sığınak olması", "Hararetli anlarda canlılara lütfedilen huzurlu bir istirahat perdesi", "Gölge dahi amaçsız değil, canlıları himaye eden bir nimet kılınmıştır."]
        ],
        conclusion: "Tam gölge hadisesi, ışığın doğrusal yayılışının ispatı olduğu gibi, yeryüzü misafirlerine serinlik sunan bir ilahî sığınaktır."
      })
    ]
  },
  {
    id: "5-u5-maddenin-dogasi",
    title: "5. ÜNİTE: Maddenin Doğası",
    chapters: [
      makeChapter({
        id: "5-u5-c1-tanecikli-yapi",
        title: "1. Bölüm: Maddenin Tanecikli Yapısı",
        hikmetliTitle: "Maddenin Tanecikli Yapısı: Zerrelerin İntizamlı Ordusu",
        shortDesc: "Maddelerin atom ve moleküllerden oluşması, katı, sıvı ve gaz hallerindeki taneciklerin hareket sırları.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6g5f4e3d2c1b0_tanecikli-yapi.jpg",
        fenConcept: "Bütün maddeler taneciklerden (atom veya moleküllerden) oluşur ve tanecikler arasında boşluklar bulunur. Tanecikler titreşim, öteleme ve dönme hareketleri yaparlar. Katı tanecikleri sadece titreşirken, sıvı ve gaz tanecikleri hem titreşim, hem öteleme hem de dönme hareketi yapar.",
        tefekkurInsight: "Gözümüzle göremediğimiz trilyonlarca zerrenin bir araya gelerek suyu, havayı ve demiri teşkil etmesi; her zerrenin bir ordunun neferi gibi emre itaat ettiğini gösterir.",
        tableRows: [
          ["Taneciklerin durmaksızın hareket etmesi", "Eşyadaki dinamizm ve hayatın kesintisiz akışı", "Cansız zerreler kendi kendine enerji üretip dans edemez."],
          ["Katı, sıvı ve gazdaki boşluk oranlarının farklılığı", "Maddelere şekil, akışkanlık ve uçuculuk kabiliyetinin verilmesi", "Su sıvı olmasaydı içemezdik, hava gaz olmasaydı soluyamazdık."],
          ["Sıcaklık arttıkça taneciklerin hızlanması", "Isı enerjisinin zerrelere intikal edip onları coşturması", "Termodinamik kanunları kainatın her zerresinde aynı intizamla işler."]
        ],
        conclusion: "Madde zerreleri, kendilerini yaratan ve sevk eden Yüce Kudret'in kanunlarına mutlak bir intizamla boyun eğen itaatkâr neferlerdir."
      }),
      makeChapter({
        id: "5-u5-c2-isi-ve-sicaklik",
        title: "2. Bölüm: Isı ve Sıcaklık",
        hikmetliTitle: "Isı ve Sıcaklık: Enerjinin Canlılara Hayat Veren Ölçüsü",
        shortDesc: "Isı enerjisi ile sıcaklık kavramlarının farkı, termometre kullanımı ve ısının sıcaktan soğuğa akışındaki adalet.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5e4d3c2b1a0_isi-sicaklik.png",
        fenConcept: "Isı bir enerji türüdür; birimi Joule veya Kalori'dir ve kalorimetre kabı ile hesaplanır. Sıcaklık ise bir enerji değil, taneciklerin ortalama kinetik enerjisinin bir ölçüsüdür; termometre ile ölçülür ve birimi Derece Celsius'tur (°C). Isı alışverişi her zaman sıcak maddeden soğuk maddeye doğru gerçekleşir.",
        tefekkurInsight: "Isının daima sıcaktan soğuğa doğru kendiliğinden akması, kainattaki denge ve adaleti sağlayan, zenginden fakire ikram gibi bir termodinamik rahmet kanunudur.",
        tableRows: [
          ["Isı enerjisinin sıcaktan soğuğa akması", "Tabiatta aşırı uçların dengelenmesi ve sıcaklık eşitliği gayesi", "Soğuktan sıcağa aksaydı sıcak daha yanar, soğuk daha donardı."],
          ["Termometredeki sıvının düzenli genleşmesi", "Sıcaklığın matematiksel olarak tespit edilebilmesi lütfu", "Maddenin genleşme kanunu insana teşhis ve teknoloji imkanı verir."],
          ["Canlıların vücut sıcaklığının sabit tutulması", "Beden sarayındaki enzimlerin çalışması için takdir edilen hassas ayar", "37°C'den bir iki derece sapma dahi hayatı tehdit eder."]
        ],
        conclusion: "Isı ve sıcaklık dengesi, kainat fırınının canlıları yakmadan, dondurmadan tam kıvamında ısıtan şefkatli bir ölçüsüdür."
      }),
      makeChapter({
        id: "5-u5-c3-hal-degisimi",
        title: "3. Bölüm: Maddenin Hâl Değişimi",
        hikmetliTitle: "Maddenin Hâl Değişimi: Katıdan Gaza İlahî Terbiye ve Döngü",
        shortDesc: "Erime, donma, buharlaşma, yoğuşma, süblimleşme ve kırağılaşma olayları ve yeryüzündeki su döngüsünün mucizesi.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4d3c2b1a0z9_hal-degisimi.jpg",
        fenConcept: "Maddelerin ısı alarak veya ısı vererek bir fiziksel hâlden diğerine geçmesine hâl değişimi denir. Isı alan maddeler erir, buharlaşır veya süblimleşir; ısı veren maddeler donar, yoğuşur veya kırağılaşır. Hâl değişimi süresince saf maddelerin sıcaklığı sabit kalır.",
        tefekkurInsight: "Suyun buharlaşıp göğe yükselmesi, bulut olup taşınması ve yağmur olarak yeryüzüne inmesi; hâl değişim kanunları sayesinde kurulan devasa bir ilahî arıtma ve sulama tesisidir.",
        tableRows: [
          ["Buharlaşmanın her sıcaklıkta gerçekleşmesi", "Yeryüzündeki suların ve çamaşırların her mevsim kuruyup yenilenmesi", "Sadece 100°C'de buharlaşsaydı denizlerden buhar çıkmaz, yağmur yağmazdı."],
          ["Suyun donarken hacminin büyümesi (özgül anomali)", "Göl ve denizlerin üstten donarak dipteki balıkların korunması", "Diğer maddeler gibi büzülseydi denizler dipten donar, deniz hayatı biterdi."],
          ["Hâl değiştirirken sıcaklığın sabit kalması", "Ortamın ani sıcaklık şoklarından korunması", "Eriyen kar ve buzlar havanın aniden ısınmasını veya soğumasını frenler."]
        ],
        conclusion: "Hâl değişimleri, suyun ve havanın yeryüzü sofrasına tertemiz ve arıtılmış olarak yeniden sunulmasını sağlayan ilahî bir döngüdür."
      }),
      makeChapter({
        id: "5-u5-c4-madde-ve-isi",
        title: "4. Bölüm: Madde ve Isı",
        hikmetliTitle: "Madde ve Isı: Yalıtım ve İletimdeki Şefkatli Tasarım",
        shortDesc: "Isı iletkeni ve ısı yalıtkanı maddeler, binalarda yalıtımın önemi ve canlıların kürklerindeki ilahî yalıtım.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3c2b1a0z9y8_madde-isi.png",
        fenConcept: "Isıyı iyi ileten maddelere ısı iletkeni (bakır, demir, alüminyum), ısıyı zor ileten maddelere ısı yalıtkanı (ahşap, strafor, plastik, hava, yün) denir. Binalarda ve termoslarda ısı yalıtımı yapılarak enerji tasarrufu sağlanır.",
        tefekkurInsight: "Kutup ayısının kürkünün içi boş tüylerle havayı hapsedip yalıtım sağlaması, insanın bugün straforla yaptığı mantolama tekniğinin milyonlarca yıldır tabiatta var olduğunu gösterir.",
        tableRows: [
          ["Metallerin ısı iletkeni olarak tanzimi", "Yemeklerin tencerelerde çabuk ve dengeli pişmesi nimeti", "Tencereler yalıtkan olsaydı yemek pişirmek saatler sürerdi."],
          ["Havanın mükemmel bir ısı yalıtkanı olması", "Çift camların ve kuş tüylerinin arasına havanın hapsedilmesi", "Görünmeyen hava, canlıları dondurucu soğuktan koruyan bir yorgandır."],
          ["Yalıtım sayesinde enerji israfının önlenmesi", "Kainattaki iktisat kanununa insanın uyması gerekliliği", "Kaynakları israf etmemek, kainatın genel tasarruf nizamına ittibadır."]
        ],
        conclusion: "Isı iletim ve yalıtım özellikleri; canlıların yaşamlarını soğuk ve sıcaktan muhafaza eden şefkatli bir ilahî koruma kalkanıdır."
      })
    ]
  },
  {
    id: "5-u6-elektrik-devre-elemanlari",
    title: "6. ÜNİTE: Elektrik Devre Elemanları",
    chapters: [
      makeChapter({
        id: "5-u6-c1-semboller-ve-semalar",
        title: "1. Bölüm: Devre Elemanlarının Sembollerle Gösterimi ve Devre Şemaları",
        hikmetliTitle: "Devre Elemanları ve Şemaları: Enerjinin İntizamlı Yolları",
        shortDesc: "Pil, ampul, anahtar, iletken tel sembolleri; bilimsel dil birliği ve devredeki kusursuz elektron akışı.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2b1a0z9y8x7_devre-semalari.jpg",
        fenConcept: "Elektrik devresinde yer alan pil (güç kaynağı), ampul (ışık üretici), anahtar (devreyi açıp kapayan kontrolcü) ve iletken tel (akımı taşıyan yol) evrensel sembollerle gösterilir. Bu sembollerle çizilen resimlere devre şeması denir. Şemalar bütün dünyadaki bilim insanlarının ortak bir lisanla anlaşmasını sağlar.",
        tefekkurInsight: "Bir elektrik devresinin çalışması için her parçanın birbiriyle tam temas etmesi gerekir; kopuk bir tel bütün akımı keser. Bu durum kainattaki her parçanın birbiriyle bağlantılı olduğunu gösterir.",
        tableRows: [
          ["Devre elemanlarının evrensel sembollerle çizilmesi", "İnsan aklına lütfedilen ortak lisan ve ilim birliği", "İlim, kâinatın şifrelerini çözmek için bahşedilmiş ortak bir dildir."],
          ["Anahtarın açık veya kapalı olmasıyla akımın denetlenmesi", "İrade ve sebeplere bağlı olarak neticelerin tecelli etmesi", "Düğmeye basmak sebeptir; elektriği yaratan ise her an kudret sahibidir."],
          ["Pilin kimyasal enerjiyi elektrik enerjisine çevirmesi", "Maddenin içine gizlenmiş gizli enerjinin açığa çıkarılması", "Küçücük bir pilin içine hapsedilen potansiyel kudret hayret vericidir."]
        ],
        conclusion: "Devre şemaları, insanın enerjiyi yönetmek için kurduğu intizamlı bir plan olduğu gibi; kainattaki bütün sistemlerin arkasında da ezelî bir ilahî plan vardır."
      }),
      makeChapter({
        id: "5-u6-c2-ampul-parlakligi",
        title: "2. Bölüm: Basit Bir Elektrik Devresinde Ampul Parlaklığını Etkileyen Değişkenler",
        hikmetliTitle: "Ampul Parlaklığı ve Değişkenler: Sebep-Sonuç İçindeki Hikmetli Kanunlar",
        shortDesc: "Bağımsız değişken, bağımlı değişken, kontrol edilen değişken; pil ve ampul sayısının parlaklığa etkisi.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1a0z9y8x7w6_ampul-parlakligi.png",
        fenConcept: "Bir elektrik devresinde pil sayısı arttıkça akım artar ve ampul parlaklığı artar (bağımsız değişken: pil sayısı). Ampul sayısı arttıkça devre direnci artar ve ampullerin parlaklığı azalır (bağımsız değişken: ampul sayısı). Deneylerde değiştirilmeyen sabit tutulan değişkenlere kontrol edilen değişken denir.",
        tefekkurInsight: "Deneylerdeki değişkenlerin sebep-sonuç ilişkisine şaşmaz bir matematikle uyması; kainatta tesadüfe yer olmadığını, her etkinin belirlenmiş bir kanunla karşılık bulduğunu ispat eder.",
        tableRows: [
          ["Pil sayısı arttıkça ampulün daha parlak yanması", "Enerji kaynağının gücü ile neticenin doğru orantılı tecellisi", "Sebep güçlendikçe izhar edilen eser de parlar."],
          ["Ampul sayısı arttıkça ışığın bölüşülmesi", "Paylaşım, denge ve adaletin fiziksel devredeki kanunu", "Aynı kaynak çoğalan taliplere bölüştürülür."],
          ["Bilimsel deneylerdeki sebep-sonuç tutarlılığı", "Tabiatta kararlılık ve güvenilirlik sağlayan sünnetullah", "Kanunlar her saniye değişseydi hiçbir bilim ve teknoloji üretilemezdi."]
        ],
        conclusion: "Ampulün parlaklığındaki hassas matematiksel ölçü; kainatın her köşesinde hüküm süren adalet ve nizamın somut bir numunesidir."
      })
    ]
  },
  {
    id: "5-u7-surdurulebilir-yasam-ve-geri-donusum",
    title: "7. ÜNİTE: Sürdürülebilir Yaşam ve Geri Dönüşüm",
    chapters: [
      makeChapter({
        id: "5-u7-c1-evsel-atiklar-ve-geri-donusum",
        title: "1. Bölüm: Evsel Atıklar ve Geri Dönüşüm",
        hikmetliTitle: "Evsel Atıklar ve Geri Dönüşüm: Kainattaki İktisat ve İsrafsızlık Kanunu",
        shortDesc: "Evsel atıklar, organik atıklar, geri dönüşebilen maddeler ve kainattaki muazzam temizlik ve iktisat nizamı.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0z9y8x7w6v5_geri-donusum.jpg",
        fenConcept: "Evlerde kullanılan ve artık ihtiyaç duyulmayan maddelere evsel atık denir. Plastik, cam, metal ve kağıt gibi atıklar fiziksel ve kimyasal işlemlerle yeniden hammaddeye dönüştürülerek geri kazanılır. Organik atıklardan ise kompost gübre üretilir. Geri dönüşüm tabii kaynakları korur, enerji tasarrufu sağlar ve çevre kirliliğini önler.",
        tefekkurInsight: "Koca kainat fabrikasında hiçbir şey çöpe atılmaz; dökülen sonbahar yaprakları bile mikroorganizmalar eliyle baharın toprağına gübre yapılır. Kainatta israf yoktur; insan da bu iktisat kanununa uymakla mükelleftir.",
        tableRows: [
          ["Tabiattaki sonbahar yapraklarının toprağa karışması", "Kainattaki kusursuz ve masrafsız ilahî geri dönüşüm fabrikası", "Trilyonlarca canlı ölmesine rağmen ormanlar pırıl pırıl ve temizdir."],
          ["Kağıt geri dönüşümü ile ağaçların kesilmekten kurtulması", "Emanet edilen orman nimetini koruma ve şükür vazifesi", "Bir ton kullanılmış kağıt 17 ağacın hayatını kurtarır."],
          ["Plastik ve metallerin yeniden eritilip kullanılması", "Yeryüzü madenlerini ve petrolünü iktisatla tüketme şuuru", "İsraf eden tükenir, iktisat eden bereket bulur."]
        ],
        conclusion: "Geri dönüşüm, sadece çevre mühendisliği değil; kainattaki İsmi Kuddüs (tertemiz kılan) ve İsmi Hakîm (israfsız yaratan) tecellilerine hürmetin ifadesidir."
      })
    ]
  }
];

console.log("Grade 5 units built successfully with total chapters:", grade5Units.reduce((a, b) => a + b.chapters.length, 0));

// Output grade5.ts file
fs.writeFileSync(
  path.join(curriculumDir, "grade5.ts"),
  `import { Grade } from '../grades';\n\nexport const GRADE_5_CURRICULUM: Grade = {\n  id: "5",\n  name: "5. Sınıf",\n  description: "Türkiye Yüzyılı Maarif Modeli ve Fenbilim.net müfredatına göre hazırlanmış 7 ünite ve 18 alt konu başlığında Hikmetli Fen tefekkür okumaları.",\n  units: ${JSON.stringify(grade5Units, null, 2)}\n};\n`
);
console.log("grade5.ts written!");
