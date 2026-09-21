const fs = require('fs');
const path = require('path');

const curriculumDir = path.join(process.cwd(), 'src', 'data', 'curriculum');
if (!fs.existsSync(curriculumDir)) {
  fs.mkdirSync(curriculumDir, { recursive: true });
}

// Helper to build chapter content with 10-Stage Risale-i Nur Thought Framework (6. Sınıf Seviyesi)
function makeChapter({ id, title, hikmetliTitle, shortDesc, imageUrl, fenConcept, tefekkurInsight, tableRows, conclusion, gradeLevel = 6 }) {
  const content = `
# ${hikmetliTitle}

> **Bismillah:** *"Bütün mevcudat lisan-ı hal ile Bismillah der; Halık-ı Zülcelal'in namına hareket edip, O'nun rahmet ve hikmet hazinelerinden birer numuneyi bize takdim eder."*

## 1. Varlığı Tanıt (Sistemin Kapısını Aralama)
**${title}**, kainat kitabında ve insan fıtratında sergilenen harika nizamın ve ilahi sanatın en ibretli sayfalarından biridir. ${shortDesc} Bu sistem, varlık sahnesinde kendi kendine veya rastlantıyla ortaya çıkmış değildir; her bir noktası gayeli, hikmetli ve bir amaca hizmet edecek şekilde var edilmiştir.

## 2. Parçalarını Göster & 3. Her Parçanın Vazifesi (Nasıl ve Neden?)
Bu sistemde vazifeli olan unsurlar, organlar, kavramlar ve hadiseler iki derin katmanda şöyle anlaşılır:

- **1. Katman ("NASIL?" — Bilimsel Mekanizma ve Kanunlar):**
${fenConcept}

- **2. Katman ("NEDEN?" — Hikmet, Gaye ve İlahi Sanat):**
${tefekkurInsight}

${imageUrl ? `![${hikmetliTitle}](${imageUrl})
fenbilim.net alıntıdır. [Resim Link](${imageUrl})
> **Tefekkür Dürbünü:** Görseldeki hassas yapı ve nizam; kör, sağır ve şuursuz maddelerin değil, her şeyi her an gören ve bilen bir Sanatkârın mührüdür.
` : ''}

## 4. Parçalar Arasındaki Harika Uyum (Müthiş İttifak)
Bu sistemin hiçbir parçası diğerinden habersiz değildir. Tıpkı vücuttaki organların ve gökyüzündeki gezegenlerin ahengi gibi, tüm unsurlar tam bir dayanışma ve yardımlaşma ile tek bir ortak maksada hizmet eder. Bir parçanın aksaması bütünü etkileyecekken, kusursuz bir vazife şuuruyla hareket edilir.

## 5. Ölçü, Mizan ve İnce Düzen
Sistemdeki oranlar, kuvvetler, hızlar ve zamanlamalar milimetrik bir hesapla takdir edilmiştir. Ölçüdeki en ufak bir sapma tüm ahengi bozacakken, kanunların şaşmaz bir istikrarla işlemesi mutlak bir nizamın varlığını ispatlar.

## 6. Temsil ve Benzetme Dürbünü (Hakikate Açılan Pencere)
Gelin bu hakikati 6. sınıf seviyemize uygun bir temsil dürbünüyle anlayalım:
Nasıl ki binlerce neferi olan intizamlı bir ordu veya yüzlerce makinesi senkronize çalışan devasa bir fabrika; komutansız ve mühendissiz idare edilemez. Aynen öyle de **${title}** nizamı, kainat fabrikasındaki o muazzam intizamın şaşmaz bir şubesidir.

## 7. Hikmet Penceresi: Canlıya ve Kainata Sunulan Hizmet
Bu sistemin canlılar alemi, insan hayatı ve yeryüzündeki nizam için sunduğu rahmetli hizmetler:

| Fen Bilimleri Unsuru ("Nasıl?") | Hikmet ve İlahî Tecelli ("Neden?") | İnce Ayar ve Tefekkür Dersi |
| :--- | :--- | :--- |
${tableRows.map(r => `| ${r[0]} | ${r[1]} | ${r[2]} |`).join('\n')}

## 8. İrade, Sanat ve Program Perspektifi
Aklı, şuuru ve hayatı olmayan hücrelerin, kemiklerin, gezegenlerin veya kuvvetlerin böylesine muazzam bir gayede birleşmesi; onların kendi kabiliyeti değildir. Bu durum, her şeyin arkasında sonsuz bir İrade, Program, Kusursuz Sanat ve Hikmet Sahibinin (Sâni-i Zülcelal'in) bulunduğunu açıkça ilan eder.

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

// ==========================================
// GRADE 6
// ==========================================
const grade6Units = [
  {
    id: "6-u1-gunes-sistemi-ve-tutulmalar",
    title: "1. ÜNİTE: GÜNEŞ SİSTEMİ VE TUTULMALAR",
    chapters: [
      makeChapter({
        id: "6-u1-c1-gunes-sistemi",
        title: "1. Bölüm: Güneş Sistemi",
        hikmetliTitle: "Güneş Sistemi: Gezegenlerin İntizamlı Tavafı",
        shortDesc: "Güneş, karasal ve gazsal gezegenler, asteroid kuşağı ve uzay boşluğundaki şaşmaz yörünge dengeleri.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9z8y7x6w5v4u3t2_gunes-sistemi.png",
        fenConcept: "Güneş Sistemi, merkezde Güneş ve onun etrafında eliptik yörüngelerde dolanan 8 gezegen (Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün), uydular, cüce gezegenler ve asteroidlerden oluşur. İlk dört gezegen karasal (iç), son dört gezegen gazsal (dış) gezegendir. Mars ile Jüpiter arasında asteroid kuşağı bulunur.",
        tefekkurInsight: "Milyonlarca kilometre hızla uzay boşluğunda dönen devasa gezegenlerin birbirine çarpmadan, bir milim sapmadan milyarlarca yıldır yüzmesi; semavatın mutlak bir Sultan tarafından idare edildiğinin apaçık delilidir.",
        tableRows: [
          ["Gezegenlerin eliptik yörüngelerde dolanması", "Kainattaki ahenkli tavaf ve nizam kanunu", "Yörüngeler rastgele olsaydı gezegenler birbirine çarpıp yok olurdu."],
          ["Jüpiter ve Satürn'ün dev kütleleriyle göktaşlarını süpürmesi", "Dünya'yı kozmik tehlikelerden koruyan ilahî birer kalkan olması", "Dev gezegenler Dünya'mıza koruyucu bekçi kılınmıştır."],
          ["Dünya'nın yaşam kuşağında (Goldilocks) yer alması", "Suyun sıvı kalabileceği tek hassas mesafede bulunması", "Hayat için takdir edilen kusursuz rahmet mesafesi."]
        ],
        conclusion: "Güneş Sistemi, boşlukta başıboş gezen taş ve gaz kütleleri değil; her biri belirlenmiş yörüngesinde vazifesini aksatmayan itaatkâr sema ordularıdır."
      }),
      makeChapter({
        id: "6-u1-c2-tutulmalar",
        title: "2. Bölüm: Güneş ve Ay Tutulmaları",
        hikmetliTitle: "Güneş ve Ay Tutulmaları: Semadaki İlahî Saat ve Gölge Ayetleri",
        shortDesc: "Güneş tutulması (yeni ay) ve Ay tutulması (dolunay) hadiseleri, ışık ve gölgenin semavi hizalanması.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8x7w6v5u4t3s2r1_tutulmalar.jpg",
        fenConcept: "Güneş tutulması, Ay'ın Güneş ile Dünya arasına girmesiyle (Yeni Ay evresinde) Güneş ışığının Dünya'nın belirli bölgelerine ulaşamamasıdır. Ay tutulması ise Dünya'nın Güneş ile Ay arasına girmesiyle (Dolunay evresinde) Dünya'nın gölgesinin Ay'ın üzerine düşmesidir. Her ay tutulma gerçekleşmez çünkü Ay'ın yörüngesi ile Dünya'nın yörüngesi arasında yaklaşık 5 derecelik bir açı vardır.",
        tefekkurInsight: "Güneş ve Ay tutulmalarının yüzyıllar öncesinden saniyesi saniyesine hesaplanabilmesi; kainat saatini kuran Kudret'in şaşmaz matematiksel intizamını ispat eder.",
        tableRows: [
          ["Ay'ın Güneş'i tam örtmesi (aynı açısal büyüklük)", "Güneş 400 kat büyük ama 400 kat uzakta takdir edilmiştir", "Bu harika oran tesadüf olamaz; tam tutulma için özel tasarlanmıştır."],
          ["Tutulmaların saniyesi saniyesine hesaplanabilmesi", "Kainattaki belirlenmiş sünnetullah ve matematiksel kanun", "İntizam olmasaydı gelecekteki tutulmalar asla bilinemezdi."],
          ["Gündüzün ortasında havanın kararması ve yıldızların belirmesi", "İnsana acziyetini ve kainatın sahibini hatırlatan bir ibret tablosu", "Güneş ve Ay'ın kendi kendine değil, emre bağlı hareket ettiğinin ilanıdır."]
        ],
        conclusion: "Tutulmalar, Güneş ve Ay'ın birer ilahî memur olduğunu; ne zaman örtüleceklerini ve ne zaman ışık saçacaklarını sadece Rablerinin bildiğini gösteren muazzam ayetlerdir."
      })
    ]
  },
  {
    id: "6-u2-kuvvetin-etkisinde-hareket",
    title: "2. ÜNİTE: KUVVETİN ETKİSİNDE HAREKET",
    chapters: [
      makeChapter({
        id: "6-u2-c1-bileske-kuvvet",
        title: "1. Bölüm: Bileşke Kuvvet",
        hikmetliTitle: "Bileşke Kuvvet: Zıt Yönlerin Birliğinde Kudret Tecellisi",
        shortDesc: "Net kuvvet, aynı ve zıt yönlü kuvvetlerin bileşkesi, dengelenmiş ve dengelenmemiş kuvvetler.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7w6v5u4t3s2r1q0_bileske-kuvvet.png",
        fenConcept: "Bir cisme birden fazla kuvvet etki ettiğinde, bu kuvvetlerin yaptığı toplam etkiyi tek başına yapan kuvvete bileşke (net) kuvvet (R) denir. Aynı yönlü kuvvetler toplanır, zıt yönlü kuvvetler çıkarılır. Net kuvvet sıfır ise cisim dengelenmiş kuvvetler etkisindedir (durur veya sabit hızla gider); sıfırdan farklı ise dengelenmemiş kuvvetler etkisindedir (hızlanır, yavaşlar veya yön değiştirir).",
        tefekkurInsight: "Kainatta yıldızların çekiminden atom içi kuvvetlere kadar trilyonlarca kuvvetin birbirini sıfırlayarak muazzam bir denge (mizan) kurması, mutlak bir Vahid'in kudretini gösterir.",
        tableRows: [
          ["Dengelenmiş kuvvetlerde cismin durumunu koruması (eylemsizlik)", "Tabiattaki sükunet, kararlılık ve istikrar kanunu", "Her kuvvet başıboş etki etseydi kainatta hiçbir şey sabit duramazdı."],
          ["Zıt yönlü kuvvetlerin birbirini dengelemesi", "Kainattaki mizan ve hassas adalet terazisi", "Kuvvetler dengesi sayesinde dağlar yerinde durur, binalar ayakta kalır."],
          ["Dengelenmemiş kuvvetlerle hareketin başlaması", "Varlık alemine dinamizm ve tekamül veren ilahî sevk", "Kuvvet uygulandığında eşya yeni bir vazifeye koşar."]
        ],
        conclusion: "Bileşke kuvvet kuralları, kainattaki her zerrenin tek bir irade tarafından kontrol edildiğini ve dengede tutulduğunu gösterir."
      }),
      makeChapter({
        id: "6-u2-c2-sabit-suratli-hareket",
        title: "2. Bölüm: Sabit Süratli ve Sabit Hızlı Hareket",
        hikmetliTitle: "Sabit Süratli Hareket: Nizamın Şaşmayan Zaman Ölçüsü",
        shortDesc: "Alınan yol, zaman, sürat formülü (v = x/t), yol-zaman ve sürat-zaman grafikleri ve intizamlı hareket.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6v5u4t3s2r1q0p9_sabit-surat.jpg",
        fenConcept: "Bir hareketlinin birim zamanda aldığı yola sürat denir (Sürat = Yol / Zaman). Bir hareketli eşit zaman aralıklarında eşit yollar alıyorsa buna sabit süratli hareket denir. Birimi m/s veya km/h'dir. Yol-zaman grafiğinde doğru eğimi sürati verir; sürat-zaman grafiğinde çizgi yataydır.",
        tefekkurInsight: "Işığın saniyede 300.000 km sabit süratle yayılması, Dünya'nın yörüngesindeki şaşmaz sürati; kainat saatçisinin zamanı ve mesafeyi ne büyük bir hassasiyetle tanzim ettiğini gösterir.",
        tableRows: [
          ["Eşit zamanda eşit yollar alınması", "Kainattaki düzen, ahenk ve şaşmaz matematiksel ritim", "Tesadüfi hareket dalgalı ve kaotik olurdu; sabit sürat nizamı haykırır."],
          ["Sürat formülünün evrensel geçerliliği", "Fizik kanunlarının her yerde aynı adaletle işlemesi", "Kanun koyucunun her mekanda tek ve hakim olduğunu ispatlar."],
          ["Gök cisimlerinin periyodik dolanma süratleri", "Mevsimlerin ve yılların tam vaktinde gelmesi nimeti", "Dünya biraz yavaşlasaydı Güneş'e düşer, hızlansaydı uzaya savrulurdu."]
        ],
        conclusion: "Sabit süratli hareket, intizamın ve dakikliğin fizik alemindeki tecellisi olup insana vakti ve planı öğretir."
      })
    ]
  },
  {
    id: "6-u3-canlilarda-sistemler",
    title: "3. ÜNİTE: CANLILARDA SİSTEMLER",
    chapters: [
      makeChapter({
        id: "6-u3-c1-ureme-buyume-gelisme",
        title: "1. Bölüm: Bitki ve Hayvanlarda Üreme, Büyüme ve Gelişme",
        hikmetliTitle: "Canlılarda Üreme ve Gelişme: Bir Tohum ve Damladan Hayatın Fışkırması",
        shortDesc: "Eşeyli ve eşeysiz üreme, çiçeğin kısımları, tozlaşma, tohumun çimlenmesi, başkalaşım (metamorfoz).",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5u4t3s2r1q0p9o8_cicek-ureme.png",
        fenConcept: "Canlılar nesillerini devam ettirmek için ürerler. Eşeysiz üreme (bölünme, tomurcuklanma, rejenerasyon, vejetatif) tek atadan gerçekleşirken, eşeyli üremede dişi ve erkek üreme hücreleri döllenir. Çiçekli bitkilerde taç yaprak, çanak yaprak, erkek organ (polen) ve dişi organ bulunur. Rüzgar ve böceklerle tozlaşma gerçekleşir; tohum uygun sıcaklık, su ve oksijenle (SOS) çimlenir. Kurbağa ve kelebek gibi canlılarda başkalaşım görülür.",
        tefekkurInsight: "Kupkuru bir tohumun karanlık toprak altında suyla buluşup yarılması ve içinden devasa bir ağacın çıkması, ölü topraktan hayat fışkırtan ilahî kudretin en parlak diriliş sahnesidir.",
        tableRows: [
          ["Tohumun içinde embriyo ve besin deposunun hazır bulunması", "Yavru fidenin ilk ihtiyaçlarının önceden düşünülüp paketlenmesi", "Kör tabiat geleceği görüp tohumun içine azık koyamaz."],
          ["Arıların çiçekleri tozlaştırırken bal yapması", "Bitkiler ve hayvanlar arasındaki muhteşem yardımlaşma zinciri", "Birbirini tanımayan iki canlının işbirliği tek bir İdareciyi gösterir."],
          ["Tırtılın kozaya girip muazzam kanatlı bir kelebeğe dönüşmesi", "Yoktan var etme ve suret verme sanatının hayret verici numunesi", "Çirkin bir kurttan rengarenk bir kelebek nakşeden Sonsuz Sanatkârdır."]
        ],
        conclusion: "Üreme ve büyüme kanunları, hayatın tesadüfen değil; her an 'Kün fe yekûn' (Ol der ve olur) emriyle tazelenip devam ettirildiğini gösterir."
      }),
      makeChapter({
        id: "6-u3-c2-denetleyici-ve-duzenleyici-sistemler",
        title: "2. Bölüm: Denetleyici ve Düzenleyici Sistemler",
        hikmetliTitle: "Denetleyici ve Düzenleyici Sistemler: Beden Sarayının Görünmez İdarecileri",
        shortDesc: "Sinir sistemi (beyin, beyincik, omurilik, omurilik soğanı), refleksler ve iç salgı bezleri (hormonlar).",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4t3s2r1q0p9o8n7_sinir-sistemi.jpg",
        fenConcept: "Denetleyici ve düzenleyici sistemler vücuttaki sistemlerin uyum içinde çalışmasını sağlar. Sinir sistemi; merkezi (beyin: hafıza/öğrenme, beyincik: denge, omurilik soğanı: sistemlerin çalışması, omurilik: refleksler) ve çevresel sinir sisteminden oluşur. İç salgı bezleri (hipofiz, tiroit, pankreas, böbrek üstü, eşeysel bezler) ise hormon salgılayarak yavaş ve uzun süreli düzenleme yapar.",
        tefekkurInsight: "Elinize sıcak bir çaydanlık değdiğinde düşünmeye vakit kalmadan milisaniyeler içinde elinizi çektiren omurilik refleksi; sizi sizden daha çok düşünen bir Rahîm-i Zülcelal'in emniyet sigortasıdır.",
        tableRows: [
          ["Nöronların saniyede 120 metre hızla elektriksel ve kimyasal mesaj taşıması", "Vücut sarayındaki en ileri teknoloji haberleşme ağı", "Trilyonlarca kablonun karışmadan hedef organa bağlanması mucizedir."],
          ["Omurilik soğanının solunum, yutma ve kalp atışını kontrol etmesi", "Hayati fonksiyonların insanın unutkan iradesine bırakılmaması", "Nefes almayı hatırlamak zorunda kalsaydık uyurken ölürdük."],
          ["İnsülin ve glukagonun kan şekerini miligram hassasiyetinde tutması", "Kandaki yakıtın dengede tutulması için konulmuş kimyasal terazi", "Pankreas bir fabrikanın yapamadığı kimyayı sessizce icra eder."]
        ],
        conclusion: "Sinirlerimiz ve hormonlarımız, beden mülkümüzün her an ilahî bir şefkat ve dikkatle idare edildiğinin canlı delilleridir."
      })
    ]
  },
  {
    id: "6-u4-isigin-yansimasi-ve-renkler",
    title: "4. ÜNİTE: IŞIĞIN YANSIMASI VE RENKLER",
    chapters: [
      makeChapter({
        id: "6-u4-c1-isigin-yansimasi",
        title: "1. Bölüm: Işığın Yansıması",
        hikmetliTitle: "Işığın Yansıması: Işığın Aynalarda Hakikati Bildirmesi",
        shortDesc: "Düzgün ve dağınık yansıma, yansıma kanunları (gelen ışın, yansıyan ışın, yüzey normali).",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3s2r1q0p9o8n7m6_isik-yansimasi.png",
        fenConcept: "Işığın bir yüzeye çarpıp geldiği ortama geri dönmesine yansıma denir. Pürüzsüz yüzeylerde düzgün yansıma (net görüntü), pürüzlü yüzeylerde dağınık yansıma oluşur. Yansıma kanunlarına göre: Gelen ışın, yansıyan ışın ve yüzey normali aynı düzlemdedir; gelme açısı daima yansıma açısına eşittir.",
        tefekkurInsight: "Işığın dağınık yansıması sayesinde bir odadaki bütün eşyalar her açıdan görülebilir. Eğer sadece düzgün yansıma olsaydı, sadece ışığın tam gözümüze yansıdığı noktayı görür, her yeri karanlık zannederdik.",
        tableRows: [
          ["Gelme açısının yansıma açısına daima eşit olması (i = r)", "Kainattaki geometrik adalet ve değişmez ilahî kanun", "Işık yüzeye nasıl hürmetle yaklaştıysa aynı açıyla karşılık bulur."],
          ["Dağınık yansıma ile cisimlerin her yönden görünmesi", "Görme nimetinin genişletilmesi ve karanlık noktaların aydınlanması", "Kitap sayfalarının parlamadan okunabilmesi dağınık yansıma lütfudur."],
          ["Durgun su yüzeyinin ayna gibi dağları yansıtması", "Yeryüzü meşherinde ilahî güzelliklerin temaşaya sunulması", "Su ve ışık birleşip yeryüzüne estetik bir tablo çizer."]
        ],
        conclusion: "Işığın yansıma kanunları, maddenin nura verdiği intizamlı selamı ve görme nimetinin estetik dengesini ilan eder."
      }),
      makeChapter({
        id: "6-u4-c2-aynalar",
        title: "2. Bölüm: Aynalar",
        hikmetliTitle: "Aynalar: Suretleri Gösteren ve Hikmetleri Yansıtan Sırlar",
        shortDesc: "Düz ayna, çukur ayna, tümsek ayna; görüntü özellikleri ve teknolojideki kullanım alanları.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2r1q0p9o8n7m6l5_aynalar.jpg",
        fenConcept: "Yansıtıcı yüzeyi düz olan aynalara düzlem ayna (görüntü düz, eşit boyda, simetrik ve sanal), küre kapağı şeklinde olanlara küresel ayna denir. Çukur aynalar ışığı odakta toplar ve devasa teleskoplarda, dişçi aynalarında kullanılır (büyük/ters veya büyük/düz görüntü). Tümsek aynalar ışığı dağıtır, geniş görüş alanı sağlar (araç yan aynaları ve kavşak aynaları).",
        tefekkurInsight: "Aynalar ışığı ve suretleri gösterir ama kendileri bir şey üretmez. İnsan da kainat aynasında yaratıcısının isim ve sıfatlarını gösteren şuurlu bir tefekkür aynasıdır.",
        tableRows: [
          ["Tümsek aynanın geniş alanı tek karede toplaması", "Sürücülere kaza riskinden korunma ve emniyet sunması", "Küçücük bir aynaya koca caddenin sığdırılması optik bir lütuftur."],
          ["Çukur aynanın Güneş ışınlarını odakta toplayıp yakması", "Dağınık enerjinin tek merkezde toplanarak kudrete dönüşmesi", "Hedefe odaklanmanın fıtri kanununu bize öğretir."],
          ["Düz aynada görüntünün simetrik olması", "İnsanın kendi suretine bakıp yaratılış güzelliğini tefekkür etmesi", "Ayna olmasaydı insan kendi yüzündeki cemal ve nizamı göremezdi."]
        ],
        conclusion: "Aynaların çeşitleri ve görüntü kanunları, optik bilimiyle insan hayatını kolaylaştıran ilahî hikmetlerin yansımalarıdır."
      }),
      makeChapter({
        id: "6-u4-c3-isigin-sogurulmasi",
        title: "3. Bölüm: Işığın Soğurulması",
        hikmetliTitle: "Işığın Soğurulması ve Renkler: Enerjinin Canlılara Hayat Olarak Saklanması",
        shortDesc: "Işığın maddeler tarafından emilmesi, koyu ve açık renklerin ısınma farkı, beyaz ışığın prizmada renklere ayrılması.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1q0p9o8n7m6l5k4_isik-sogurulma.png",
        fenConcept: "Işığın maddeler tarafından tutulmasına ışığın soğurulması (emilmesi) denir. Soğurulan ışık enerjisi ısı enerjisine dönüşür. Koyu renkli cisimler ışığı daha çok soğurarak çabuk ısınırken, açık renkli cisimler ışığı yansıtır. Beyaz ışık aslında kırmızı, turuncu, sarı, yeşil, mavi ve mor (KUTUSAMAM) renklerin birleşiminden oluşur.",
        tefekkurInsight: "Karanlık ve renksiz gibi görünen Güneş ışığının içinde gökkuşağının yedi renginin gizlenmesi ve bu renklerin çiçeklerde nakış nakış açması, gizli güzelliklerin açığa çıkarılması sanatıdır.",
        tableRows: [
          ["Koyu renklerin ışığı soğurarak ısınması", "Kışın koyu giyinerek bedeni koruma hikmeti ve Güneş panelleri", "İnsan tabiatın bu fıtri kanununu taklit ederek temiz enerji üretir."],
          ["Güneş ışığının yağmur damlalarında kırılarak gökkuşağı oluşturması", "Gökyüzüne asılmış rengarenk bir ilahî rahmet ve ümit müjdesi", "Işığın prizmadan geçerken renklere ayrılması optik bir sanat şölenidir."],
          ["Bitkilerin klorofille yeşil ışık hariç diğerlerini soğurması", "Işık enerjisinin besin ve oksijene (fotosenteze) dönüştürülmesi", "Güneş enerjisi soğurulmasaydı sofralarımıza tek bir elma gelemezdi."]
        ],
        conclusion: "Işığın soğurulması, semadan gelen nurun yeryüzü sofrasında ısıya, renge ve gıdaya dönüşerek hayat kılınmasıdır."
      })
    ]
  },
  {
    id: "6-u5-maddenin-ayirt-edici-ozellikleri",
    title: "5. ÜNİTE: MADDENİN AYIRT EDİCİ ÖZELLİKLERİ",
    chapters: [
      makeChapter({
        id: "6-u5-c1-genlesme-ve-buzulme",
        title: "1. Bölüm: Genleşme ve Büzülme",
        hikmetliTitle: "Genleşme ve Büzülme: Isının Zerrelere Verdiği Nefes ve İbret",
        shortDesc: "Isınan maddelerin genleşmesi, soğuyan maddelerin büzülmesi, metal çiftleri ve termostatların çalışma prensibi.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0p9o8n7m6l5k4j3_genlesme-buzulme.jpg",
        fenConcept: "Maddelerin ısı alarak hacimlerinin artmasına genleşme, ısı vererek hacimlerinin küçülmesine büzülme denir. Katı, sıvı ve gazlar genleşir; gazlar her sıcaklıkta eşit genleştiği için genleşme gazlarda ayırt edici özellik değildir, katı ve sıvılarda ayırt edicidir. Tren raylarında boşluk bırakılması, elektrik tellerinin kışın gerilip yazın sarkması bu kanunun neticesidir.",
        tefekkurInsight: "Isınan zerrelere sanki görünmez bir el dokunur ve aralarını açarak genleştirir; soğuduğunda ise birbirine yaklaştırır. Bu kanun sayesinde termometreler çalışır ve evlerimizdeki termostatlar yangınları önler.",
        tableRows: [
          ["Termometrelerdeki sıvının genleşerek dereceyi göstermesi", "Maddenin sıcaklığı insana lisan-ı hal ile haber vermesi", "Genleşme kanunu olmasaydı sıcaklığı ölçüp tıpta teşhis koyamazdık."],
          ["Tren rayları arasında genleşme payı bırakılması", "İnsanın ilahî fizik kanunlarına hürmet ve riayet zorunluluğu", "Fizik kanununu dikkate almayan mühendislerin rayları yazın bükülür."],
          ["Suyun donarken genleşmesi (istisna mucize)", "0°C ile 4°C arasında suyun diğer tüm maddelerin tersine davranması", "Bu istisnai kanun olmasaydı buz dibe batar ve denizlerde hayat biterdi."]
        ],
        conclusion: "Genleşme ve büzülme, ısının zerreler üzerindeki ölçülü hükümranlığını ve tabiatın nefes alışverişini gösterir."
      }),
      makeChapter({
        id: "6-u5-c2-hal-degisim-noktalari",
        title: "2. Bölüm: Maddenin Hâl Değişim Noktaları",
        hikmetliTitle: "Hâl Değişim Noktaları: Maddenin Kimliğindeki Hassas İlahî Mühürler",
        shortDesc: "Erime noktası, donma noktası, kaynama noktası; saf maddeler için ayırt edici özelliklerin hikmeti.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9o8n7m6l5k4j3i2_hal-degisim-noktasi.png",
        fenConcept: "Saf maddelerin eridiği sıcaklığa erime noktası, donduğu sıcaklığa donma noktası, kaynadığı sıcaklığa kaynama noktası denir. Aynı saf madde için erime noktası donma noktasına eşittir (saf su 0°C'de erir ve donar, 100°C'de kaynar; demir 1538°C'de erir). Bu sıcaklıklar madde miktarına bağlı değildir ve maddeler için ayırt edici kimlik kartıdır.",
        tefekkurInsight: "Her saf maddeye kendine mahsus bir erime ve kaynama derecesi tayin edilmesi; kainattaki element ve bileşiklerin birbirine karışmadan kimliklerini korumasını sağlayan ilahî bir mühürdür.",
        tableRows: [
          ["Demirin 1538°C'de, suyun 0°C'de erimesi", "Her maddeye dünyadaki vazifesine uygun sağlamlık ve akışkanlık verilmesi", "Demir oda sıcaklığında eriseydi binalar ve köprüler inşa edilemezdi."],
          ["Kaynama ve erime noktalarının madde miktarıyla değişmemesi", "Bir damla suyun da bir okyanusun da aynı kanuna tabi olması", "Kudret nazarında az ile çok, küçük ile büyük müsavidir."],
          ["Tuz atılan suyun donma noktasının düşmesi", "Kışın yollara tuz atılarak buzlanmanın önlenmesi imkanı", "İnsana sunulan kimyasal kolaylıklar ve emniyet vesileleri."]
        ],
        conclusion: "Hâl değişim noktaları, maddelerin her birine vurulmuş şaşmaz birer yaratılış mührü ve kimlik belgesidir."
      }),
      makeChapter({
        id: "6-u5-c3-yogunluk",
        title: "3. Bölüm: Yoğunluk",
        hikmetliTitle: "Yoğunluk: Gemileri Yüzdüren, Taşları Batıran Mizan",
        shortDesc: "Kütle-hacim ilişkisi (d = m/V), yoğunluğun ayırt edici olması ve suyun yoğunluğunun mucizevi tasarımı.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8n7m6l5k4j3i2h1_yogunluk.jpg",
        fenConcept: "Bir maddenin birim hacmindeki kütlesine yoğunluk (özkütle) denir (Yoğunluk = Kütle / Hacim, d = m/V). Birimi g/cm³'tür. Saf maddeler için ayırt edici bir özelliktir. Yoğunluğu sıvının yoğunluğundan küçük olan cisimler yüzer, eşit olanlar askıda kalır, büyük olanlar batar. Suyun yoğunluğu +4°C'de en büyük değerine (1 g/cm³) ulaşır.",
        tefekkurInsight: "Binlerce tonluk çelik bir geminin yoğunluk prensibiyle su üstünde kuş gibi yüzmesi, insanın aklına bu fizik mizanını kavrama kabiliyeti verilerek denizlerin ona musahhar kılınmasıdır.",
        tableRows: [
          ["Buzun yoğunluğunun sudan küçük olması (d_buz = 0.9 g/cm³)", "Göllerde buzun su üstünde yüzüp alt tarafta 4°C'lik hayat havuzu bırakması", "Bu harika kanun olmasaydı kışın bütün göl ve denizler dipten donar, balıklar ölürdü."],
          ["Zeytinyağının suyun üstüne çıkması", "Birbiri içinde çözünmeyen sıvıların yoğunluk sırasına dizilmesi", "Tabiatta zerrelerin bile ağırlık ve hacim mizanıyla tanzim edildiğini gösterir."],
          ["Kütle ve hacim oranının saf maddelerde daima sabit kalması", "Maddenin atomik paketlenmesindeki şaşmaz geometrik nizam", "Madde miktarı artsa da yoğunluk değişmez; kanun sabittir."]
        ],
        conclusion: "Yoğunluk kanunu, denizleri insanlığa yol kılan, göllerdeki balıkları kışın dondan koruyan hassas bir ilahî terazidir."
      })
    ]
  },
  {
    id: "6-u6-elektrigin-iletimi-ve-direnc",
    title: "6. ÜNİTE: ELEKTRİĞİN İLETİMİ VE DİRENÇ",
    chapters: [
      makeChapter({
        id: "6-u6-c1-elektrigin-iletimi",
        title: "1. Bölüm: Elektriğin İletimi",
        hikmetliTitle: "Elektriğin İletimi: İletken ve Yalıtkanların Şefkatli Dengesi",
        shortDesc: "Elektrik enerjisini ileten ve iletmeyen maddeler, katı ve sıvı iletkenler ve insan sağlığının korunması.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7m6l5k4j3i2h1g0_iletken-yalitkan.png",
        fenConcept: "Elektrik enerjisini üzerinden geçiren maddelere iletken madde (bakır, alüminyum, demir, altın, tuzlu su, asitli su), geçirmeyen maddelere yalıtkan madde (plastik, kauçuk, cam, porselen, saf su, şekerli su, hava) denir. Elektrik kablolarının içi iletken bakırla kaplanırken, dışı bizi çarpmalardan korumak için yalıtkan plastikle kaplanır.",
        tefekkurInsight: "Eğer her madde iletken olsaydı elektrik prizlerine dokunamaz, yıldırım düştüğünde tüm yeryüzü kavrulurdu; her şey yalıtkan olsaydı elektrik hiçbir yere taşınamazdı.",
        tableRows: [
          ["Bakır ve metallerin iletken yaratılması", "Enerjinin santrallerden evlerimize kilometrelerce taşınması nimeti", "Metallerin elektron yapısı bu hızlı iletim için özel tasarlanmıştır."],
          ["Plastik ve havanın yalıtkan olması", "İnsanları elektrik çarpmalarından ve yangınlardan koruyan kalkan", "Yalıtkanlık olmasaydı hiçbir elektronik cihazı elimizde tutamazdık."],
          ["Saf suyun yalıtkan, tuzlu suyun iletken olması", "İyonların varlığıyla suyun kimliğinin değişmesi mucizesi", "Tabiatta maddelerin bir araya gelerek yeni vazifeler üstlenmesi."]
        ],
        conclusion: "İletkenlik ve yalıtkanlık özellikleri; enerjinin hem faydalı hem de emniyetli bir şekilde insanlığın hizmetine verilmesini sağlayan ikili bir rahmettir."
      }),
      makeChapter({
        id: "6-u6-c2-elektriksel-direnc",
        title: "2. Bölüm: Elektriksel Direnç ve Bağlı Olduğu Faktörler",
        hikmetliTitle: "Elektriksel Direnç: Akımın Önündeki İmtihan ve Işığa Dönüşen Isı",
        shortDesc: "Direnç kavramı, telin boyu, dik kesit alanı ve cinsinin dirence etkisi; ampul flamanının akkor hale gelmesi.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6l5k4j3i2h1g0f9_elektriksel-direnc.jpg",
        fenConcept: "Maddelerin elektrik akımına karşı gösterdiği zorluğa elektriksel direnç denir (R). Birimi Ohm'dur (Ω). Bir iletkenin direnci; boyu (L) arttıkça artar, dik kesit alanı (S) arttıkça azalır ve iletkenin cinsine (özdirenç) bağlıdır. Akkor ampullerdeki ince ve uzun tungsten tel yüksek direnç göstererek akkor hale gelir ve ışık yayar.",
        tefekkurInsight: "Ampulün içindeki tungsten telin dirence karşı direnerek akkorlaşması ve karanlığı aydınlatması; meşakkat ve gayretin neticesinde nurlu neticelerin doğuşuna fiziki bir temsildir.",
        tableRows: [
          ["Telin boyu uzadıkça direncin artması", "Mesafenin getirdiği zorluk ve akımın imtihanı", "Enerjinin taşınmasında kalın ve kısa yolların tercih edilme hikmeti."],
          ["Telin kalınlığı arttıkça direncin azalması", "Geniş yollarda akışın rahatlaması gibi elektronların ferahlığı", "Cömert ve geniş kanallardan geçen akım daha az kayba uğrar."],
          ["Ampul flamanının akkorlaşıp ışık saçması", "Direncin yok edici bir engel değil, aydınlatıcı bir vesileye dönüştürülmesi", "Elektrik sobaları ve fırınlar da bu direnç nimetiyle ısı üretir."]
        ],
        conclusion: "Elektriksel direnç, elektronların intizamlı akışındaki fren mekanizması olup insanlığa aydınlık ve sıcaklık hediye eden harika bir fizik kanunudur."
      })
    ]
  },
  {
    id: "6-u7-surdurulebilir-yasam-ve-etkilesim",
    title: "7. ÜNİTE: SÜRDÜRÜLEBİLİR YAŞAM VE ETKİLEŞİM",
    chapters: [
      makeChapter({
        id: "6-u7-c1-biyocesitlilik",
        title: "1. Bölüm: Biyoçeşitlilik",
        hikmetliTitle: "Biyoçeşitlilik: Yeryüzü Meşherindeki Sonsuz Sanat Çeşitliliği",
        shortDesc: "Ekosistem, habitat, biyoçeşitlilik, Türkiye'nin endemik zenginliği ve nesli tükenme tehlikesindeki türler.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5k4j3i2h1g0f9e8_biyocesitlilik.png",
        fenConcept: "Bir bölgede yaşayan canlı türlerinin çeşit ve sayıca zenginliğine biyoçeşitlilik denir. Ekosistem çeşitliliği, tür çeşitliliği ve genetik çeşitlilikten oluşur. Türkiye; iklim ve yeryüzü şekilleri zenginliği sayesinde dünyada biyoçeşitliliği en yüksek ülkelerden biridir. Doğal afetler, çevre kirliliği, aşırı avlanma ve plansız kentleşme biyoçeşitliliği tehdit eder.",
        tefekkurInsight: "Milyonlarca farklı canlı türünün her birine ayrı bir suret, ayrı bir rızık ve ayrı bir güzellik giydirilmesi; Nakkaş-ı Ezelî'nin sanatındaki tükenmez zenginliği sergiler.",
        tableRows: [
          ["Her canlının ekosistemde vazgeçilmez bir halka olması", "Kainattaki hassas ekolojik denge ve hiçbir canlının gereksiz olmaması", "Bir böcek türü dahi yok olsa yüzlerce bitkinin tozlaşması durabilir."],
          ["Türkiye'deki endemik bitki türlerinin Avrupa'nın tamamından fazla olması", "Vatan topraklarına lütfedilmiş muazzam bir zenginlik ve emanet", "Bu güzellikleri korumak ilahî sanata saygının gereğidir."],
          ["Tıpta kullanılan ilaçların çoğunun bitki ve hayvanlardan elde edilmesi", "Canlılar aleminin insan için birer şifa eczanesi kılınması", "Hastalığı veren şifasını da tabiat ecza dolabına yerleştirmiştir."]
        ],
        conclusion: "Biyoçeşitlilik, Yüce Yaratıcı'nın yeryüzü meşherine serptiği rengarenk canlı sanat eserlerinin ve ekolojik dengenin bütünüdür."
      }),
      makeChapter({
        id: "6-u7-c2-insan-ve-cevre-etkilesimi",
        title: "2. Bölüm: İnsan ve Çevre Etkileşimi",
        hikmetliTitle: "İnsan ve Çevre Etkileşimi: Emanete Sadakat ve Tabiatla Sulh",
        shortDesc: "Hava, su, toprak ve ses kirliliği; sera etkisi, küresel iklim değişikliği ve çevre bilinci.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4j3i2h1g0f9e8d7_cevre-etkilesimi.jpg",
        fenConcept: "İnsanın ihtiyaçlarını karşılarken tabii dengeyi bozması çevre kirliliğine (hava, su, toprak, ses ve ışık kirliliği) yol açar. Fosil yakıtların aşırı kullanımı sera gazlarını (CO2) artırarak sera etkisine ve küresel ısınmaya sebep olur. Bu durum buzulların erimesine, çölleşmeye ve iklim krizine neden olur.",
        tefekkurInsight: "Kainat insana bir miras değil, gelecek nesillere ulaştırılacak tertemiz bir emanettir. İnsanın hırsı yüzünden havanın ve suların kirletilmesi, yaratılış gayesine ve emanet şuuruna aykırıdır.",
        tableRows: [
          ["Ağaçların karbondioksiti emip oksijen üretmesi", "Yeryüzü akciğerlerinin fabrikanın dumanını temizleme hizmeti", "Bir ağacın kloroplastı, insanın kurduğu dev filtrelerden daha hikmetlidir."],
          ["Fabrika atıklarının nehirlere dökülmesinin hayatı yok etmesi", "İnsanın kendi eliyle fesat ve tahribat çıkarması uyarısı", "Tabiata zulmeden sonunda kendi nefesine ve suyuna zehir katar."],
          ["Yenilenebilir enerji (güneş, rüzgar) kullanımının artırılması", "Kainatın tabii ve temiz kaynaklarıyla uyum içinde yaşama şuuru", "Güneş her gün temiz ve tükenmez bir enerjiyle doğmaktadır."]
        ],
        conclusion: "Çevre ahlakı, kainattaki ilahî düzene saygı duymak ve yeryüzü misafirhanesini kirletmeden gelecek nesillere devretmektir."
      })
    ]
  }
];

console.log("Grade 6 units built successfully with total chapters:", grade6Units.reduce((a, b) => a + b.chapters.length, 0));

fs.writeFileSync(
  path.join(curriculumDir, "grade6.ts"),
  `import { Grade } from '../grades';\n\nexport const GRADE_6_CURRICULUM: Grade = {\n  id: "6",\n  name: "6. Sınıf",\n  description: "Türkiye Yüzyılı Maarif Modeli ve Fenbilim.net müfredatına göre hazırlanmış 7 ünite ve 16 alt konu başlığında Hikmetli Fen tefekkür okumaları.",\n  units: ${JSON.stringify(grade6Units, null, 2)}\n};\n`
);
console.log("grade6.ts written!");
