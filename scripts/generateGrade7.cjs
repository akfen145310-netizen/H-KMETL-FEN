const fs = require('fs');
const path = require('path');

const curriculumDir = path.join(process.cwd(), 'src', 'data', 'curriculum');
if (!fs.existsSync(curriculumDir)) {
  fs.mkdirSync(curriculumDir, { recursive: true });
}

// Helper to build chapter content with 10-Stage Risale-i Nur Thought Framework (7. Sınıf Seviyesi)
function makeChapter({ id, title, hikmetliTitle, shortDesc, imageUrl, fenConcept, tefekkurInsight, tableRows, conclusion, gradeLevel = 7 }) {
  const content = `
# ${hikmetliTitle}

> **Bismillah:** *"Bütün mevcudat lisan-ı hal ile Bismillah der; Halık-ı Zülcelal'in namına hareket edip, O'nun rahmet ve hikmet hazinelerinden birer numuneyi bize takdim eder."*

## 1. Varlığı Tanıt (Sistemin Kapısını Aralama)
**${title}**, kainat kitabında mikro alemden makro aleme kadar uzanan derin intizamın ve ilahi sanatın en parlak sayfalarından biridir. ${shortDesc} Bu sistem, varlık sahnesinde kendi kendine veya rastlantıyla ortaya çıkmış değildir; her bir noktası gayeli, hikmetli ve bir amaca hizmet edecek şekilde var edilmiştir.

## 2. Parçalarını Göster & 3. Her Parçanın Vazifesi (Nasıl ve Neden?)
Bu sistemde vazifeli olan unsurlar, atomlar, hücreler, kuvvetler ve kavramlar iki derin katmanda şöyle anlaşılır:

- **1. Katman ("NASIL?" — Bilimsel Mekanizma ve Kanunlar):**
${fenConcept}

- **2. Katman ("NEDEN?" — Hikmet, Gaye ve İlahi Sanat):**
${tefekkurInsight}

${imageUrl ? `![${hikmetliTitle}](${imageUrl})
fenbilim.net alıntıdır. [Resim Link](${imageUrl})
> **Tefekkür Dürbünü:** Görseldeki hassas yapı ve nizam; kör, sağır ve şuursuz maddelerin değil, her şeyi her an gören ve bilen bir Sanatkârın mührüdür.
` : ''}

## 4. Parçalar Arasındaki Harika Uyum (Müthiş İttifak)
Bu sistemin hiçbir parçası diğerinden habersiz değildir. Tıpkı hücredeki organellerin veya atomdaki parçacıkların ahengi gibi, tüm unsurlar tam bir dayanışma ve yardımlaşma ile tek bir ortak maksada hizmet eder. Bir parçanın aksaması bütünü kaosa sürükleyecekken, muazzam bir mizan korunur.

## 5. Ölçü, Mizan ve İnce Düzen
Sistemdeki oranlar, enerjiler, çekim kuvvetleri ve dalga boyları milimetrik bir hesapla takdir edilmiştir. Ölçüdeki en ufak bir sapma tüm ahengi bozacakken, kanunların şaşmaz bir istikrarla işlemesi mutlak bir nizamın varlığını ispatlar.

## 6. Temsil ve Benzetme Dürbünü (Hakikate Açılan Pencere)
Gelin bu hakikati 7. sınıf seviyemize uygun bir temsil dürbünüyle anlayalım:
Nasıl ki bir mikroskop veya teleskop gibi hassas optik cihazlar, aynalar ve prizmalar; kendi kendine dökülüp birleşemez ve mutlaka optik kanunlarını bilen bir ustanın ilmini gösterir. Aynen öyle de **${title}** nizamı, kainat laboratuvarındaki o muazzam mizan ve aynaların şaşmaz bir tecellisidir.

## 7. Hikmet Penceresi: Canlıya ve Kainata Sunulan Hizmet
Bu sistemin canlılar alemi, insan hayatı ve kainattaki enerji dengesi için sunduğu rahmetli hizmetler:

| Fen Bilimleri Unsuru ("Nasıl?") | Hikmet ve İlahî Tecelli ("Neden?") | İnce Ayar ve Tefekkür Dersi |
| :--- | :--- | :--- |
${tableRows.map(r => `| ${r[0]} | ${r[1]} | ${r[2]} |`).join('\n')}

## 8. İrade, Sanat ve Program Perspektifi
Aklı, şuuru ve hayatı olmayan atomların, ışık ışınlarının veya enerjilerin böylesine muazzam bir gayede birleşmesi; onların kendi kabiliyeti değildir. Bu durum, her şeyin arkasında sonsuz bir İrade, Program, Kusursuz Sanat ve Hikmet Sahibinin (Sâni-i Zülcelal'in) bulunduğunu açıkça ilan eder.

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
// GRADE 7
// ==========================================
const grade7Units = [
  {
    id: "7-u1-uzay-cagi",
    title: "1. ÜNİTE: UZAY ÇAĞI",
    chapters: [
      makeChapter({
        id: "7-u1-c1-uzay-arastirmalari",
        title: "1. Bölüm: Türkiye ve Uzay Araştırmaları",
        hikmetliTitle: "Uzay Araştırmaları ve Türkiye: İnsanın Semavata Açılan İlim Kanatları",
        shortDesc: "Uzay roketleri, yapay uydular (Türksat, Göktürk, İmece), uzay istasyonları ve Türkiye'nin uzay vizyonu.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3i2h1g0f9e8d7c6_turkiye-uzay.png",
        fenConcept: "Uzay araştırmalarında roketler, uzay mekikleri, uzay sondaları, teleskoplar ve yapay uydular kullanılır. Türkiye; Türksat haberleşme uyduları ve Rasat, Göktürk, İmece gözlem uyduları ile uzayda aktif bir güçtür. Uzay kirliliği, işlevini yitirmiş uyduların ve roket parçalarının Dünya yörüngesinde oluşturduğu tehlikeli enkazlardır.",
        tefekkurInsight: "İnsanın minicik bedenine rağmen aklı ve ilmiyle semanın derinliklerini keşfetmeye muktedir kılınması, ona bahşedilen hilafet ve ilim kabiliyetinin bir tecellisidir.",
        tableRows: [
          ["Uyduların Dünya etrafında kütleçekim dengesiyle dönmesi", "Gök cisimlerinin ve insan yapımı uyduların ilahî kanunlara itaat etmesi", "Fizik kanunlarına uyulmadığı anda uydu uzaya fırlar veya yere çakılır."],
          ["Teleskoplarla milyarlarca ışık yılı ötenin incelenmesi", "İnsanın gözüne ilim dürbünleri verilerek kainat meşherini temaşa ettirmesi", "Büyüklük karşısında insanın acziyetini ve secde etmesi gerektiğini öğretir."],
          ["Uzay kirliliğinin tehlikesi", "İnsanın gittiği her mekanı kirletmemesi gerektiği ahlakı", "Sema boşluğunda bile temizlik ve nizamı korumak mesuliyettir."]
        ],
        conclusion: "Uzay araştırmaları, insanın göklere açılan tefekkür pencereleri olup Sanatkâr-ı Azam'ın semavat sarayındaki azametini tasdik ettirir."
      }),
      makeChapter({
        id: "7-u1-c2-uzayda-neler-var",
        title: "2. Bölüm: Uzayda Neler Var?",
        hikmetliTitle: "Uzayda Neler Var? Galaksiler, Yıldızlar ve Sonsuzluk Aynası",
        shortDesc: "Yıldızların oluşumu (bulutsu/nebula), kara delikler, galaksi çeşitleri ve ışık yılı mesafeleri.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2h1g0f9e8d7c6b5_uzayda-neler-var.jpg",
        fenConcept: "Uzayda bulutsular (nebula: yıldızların doğum yeri), yıldızlar, gezegenler, kara delikler ve galaksiler yer alır. Yıldızlar da doğar, yaşar ve ölür (süpernova, nötron yıldızı veya kara delik). Samanyolu Galaksisi sarmal yapıdadır. Uzaydaki devasa mesafeler ışık yılı (ışığın 1 yılda aldığı yol: yaklaşık 9.46 trilyon km) ile ölçülür.",
        tefekkurInsight: "Milyarlarca galaksi ve her galakside yüz milyarlarca yıldızın varlığı; sonsuz kudret ve azameti tefekkür ettirerek insanı hayret secdesine davet eder.",
        tableRows: [
          ["Bulutsulardan yıldızların doğması", "Kainatın her an yeni yıldızlarla donatılan diri bir fabrika olması", "Madde başıboş değil, her an ilahî inşa ve tekamül altındadır."],
          ["Işık yılı mesafelerinin büyüklüğü", "İnsan zihninin idrakini aşan sonsuz bir vüsat ve mekan genişliği", "Bu azametli mekanı yaratan Kudret'in sonsuzluğunu gösterir."],
          ["Kara deliklerin muazzam kütleçekimi", "Işığı bile hapseden kozmik çekim kudretinin azametli işareti", "Görünmeyen devasa kuvvetlerin varlığına fiziksel delildir."]
        ],
        conclusion: "Uzayın derinliklerindeki yıldızlar ve galaksiler; sema kubbesine asılmış nurlu kandiller ve sonsuz ilmin nakışlarıdır."
      })
    ]
  },
  {
    id: "7-u2-kuvvet-ve-enerjiyi-kesfedelim",
    title: "2. ÜNİTE: KUVVET VE ENERJİYİ KEŞFEDELİM",
    chapters: [
      makeChapter({
        id: "7-u2-c1-kuvvet-is-enerji",
        title: "1. Bölüm: Kuvvet, İş ve Enerji İlişkisi",
        hikmetliTitle: "Kuvvet, İş ve Enerji: Emek, Hareket ve Kudretin Kanunları",
        shortDesc: "Fiziksel anlamda iş yapma şartları (W = F . x), kinetik ve potansiyel (çekim ve esneklik) enerji.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1h0f9e8d7c6b5a4_is-enerji.png",
        fenConcept: "Fiziksel anlamda iş yapılabilmesi için bir cisme kuvvet uygulanmalı ve cisim uygulanan kuvvet doğrultusunda yol almalıdır (İş = Kuvvet × Yol, W = F × x). Birimi Joule'dür. İş yapabilme yeteneğine enerji denir. Hareket halindeki cisimler kinetik enerjiye (kütle ve sürate bağlı), yüksekteki cisimler çekim potansiyel enerjisine (kütle ve yüksekliğe bağlı) sahiptir.",
        tefekkurInsight: "Bir işin vücuda gelmesi için kuvvet ve hareketin aynı doğrultuda olması gerekir. İnsanın hayırlı niyetleri ile fiillerinin aynı istikamette olması gerektiği gibi, kainatta da gaye ve amel birlikteliği şarttır.",
        tableRows: [
          ["Kuvvetin yol aldırmasıyla iş yapılması", "Gayret ve amelin hedefe yönelik olduğunda netice vermesi kanunu", "Boşuna sarf edilen kuvvet değil, doğrultusunda hareket ettiren kuvvet kıymetlidir."],
          ["Yüksekteki cisimlerin potansiyel enerji depolaması", "Makam ve irtifa arttıkça mesuliyet ve kudret potansiyelinin artması", "Barajlardaki suyun potansiyeli şehirleri aydınlatan elektriğe dönüşür."],
          ["Kinetik enerjinin süratin karesiyle artması", "Hızlandıkça tesirin katlanarak büyümesi hikmeti", "Hızlı giden araçların fren mesafesinin uzaması bu ilahî kanunun sonucudur."]
        ],
        conclusion: "Kuvvet ve enerji kanunları, kainatta hiçbir emeğin zayi olmadığını ve her hareketin bir kudret hazinesinden beslendiğini gösterir."
      }),
      makeChapter({
        id: "7-u2-c2-enerji-donusumleri",
        title: "2. Bölüm: Enerji Dönüşümleri",
        hikmetliTitle: "Enerji Dönüşümleri: Kaybolmayan Kudretin Bir Halden Diğerine Akışı",
        shortDesc: "Potansiyel ve kinetik enerjinin birbirine dönüşümü, sürtünme ile ısıya dönüşüm ve enerjinin korunumu kanunu.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0g9f8e7d6c5b4a3_enerji-korunumu.jpg",
        fenConcept: "Enerji yoktan var edilemez, var olan enerji de yok edilemez; sadece bir türden diğerine dönüşür (Enerjinin Korunumu Kanunu). Mekanik enerji, kinetik ve potansiyel enerjinin toplamıdır. Lunapark trenlerinde tepe noktasında potansiyel maksimum iken aşağı indikçe kinetik enerjiye dönüşür. Sürtünme olan ortamlarda mekanik enerjinin bir kısmı ısı enerjisine dönüşür.",
        tefekkurInsight: "Kainattaki enerjinin toplamının asla eksilmemesi ve bir kılıktan başka bir kılığa bürünmesi; mülkün Sahibinin hazinesinin zeval bulmaz ebediyetini fısıldar.",
        tableRows: [
          ["Enerjinin yok olmayıp dönüşmesi (Termodinamiğin 1. Kanunu)", "Kainattaki mutlak tasarruf, iktisat ve adalet kanunu", "Hiçbir zerre ve hiçbir enerji başıboş kaybolup gitmez."],
          ["Sarkaçta enerjinin kinetik ve potansiyel arasında salınması", "Kainattaki muazzam ritim, ahenk ve ölçülü hareket", "Kaybolmayan toplam mekanik enerji nizamı ispatlar."],
          ["Sürtünmeyle enerjinin ısıya dönüşmesi", "Görünüşte kayıp gibi duran enerjinin ortamı ısıtarak fayda üretmesi", "Hiçbir hareket boşuna değildir; her hareketin bir neticesi vardır."]
        ],
        conclusion: "Enerji dönüşümleri, kainat sarayında hiçbir şeyin israf edilmediğini ve her enerjinin ilahî bir mizanla korunduğunu gösterir."
      })
    ]
  },
  {
    id: "7-u3-vucudumuzdaki-sistemler",
    title: "3. ÜNİTE: VÜCUDUMUZDAKİ SİSTEMLER",
    chapters: [
      makeChapter({
        id: "7-u3-c1-sindirim-sistemi",
        title: "1. Bölüm: Sindirim Sistemi",
        hikmetliTitle: "Sindirim Sistemi: Beden Fabrikasının Rızkı Zerre Zerre Ayıran Hikmeti",
        shortDesc: "Ağız, yutak, yemek borusu, mide, ince bağırsak, kalın bağırsak; mekanik ve kimyasal sindirim, enzimler.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9f8e7d6c5b4a3z2_sindirim-sistemi.png",
        fenConcept: "Besinlerin kana geçebilecek kadar küçük parçalara ayrılmasına sindirim denir. Mekanik sindirim (dişler ve kaslarla parçalama) ve kimyasal sindirim (su ve enzimlerle moleküllere ayırma) olarak gerçekleşir. Karbonhidratlar ağızda, proteinler midede, yağlar ince bağırsakta sindirilmeye başlar. İnce bağırsaktaki villuslar (tümörler) besinleri emerek kana verir.",
        tefekkurInsight: "Yediğimiz sert bir ekmeğin ve etin asitler ve enzimlerle parçalanıp gözümüze fer, kasımıza kuvvet olacak şekilde moleküllerine ayrılması; beden mutfağındaki ilahî kimyagerin harika sanatıdır.",
        tableRows: [
          ["Tükürükteki amilaz enziminin ekmeği ağızda parçalaması", "Daha ilk lokmada başlayan şefkatli kimyasal karşılama", "Beden sarayına giren misafir lokma hürmetle çözülür."],
          ["Mide asidinin (HCl) mideyi delmemesi için mukus salgısı", "Yakıcı asidin ortasında mide duvarının korunmasındaki rahmet", "Zehir ile panzehir aynı kapta emniyetle tutulmaktadır."],
          ["İnce bağırsaktaki milyonlarca villusun emilim yüzeyini futbol sahası kadar genişletmesi", "Rızkın tek bir kırıntısının bile ziyan edilmeden kana geçirilmesi", "İktisat ve verimliliğin zirve mimarisi."]
        ],
        conclusion: "Sindirim sistemi, yeryüzü sofrasındaki rızıkları beden hücrelerine yakıt yapan muazzam bir kimya fabrikası ve şükür vesilesidir."
      }),
      makeChapter({
        id: "7-u3-c2-dolasim-sistemi",
        title: "2. Bölüm: Dolaşım Sistemi",
        hikmetliTitle: "Dolaşım Sistemi: Kalp Pompasının Damar Nehirlerinde Hayat Dağıtması",
        shortDesc: "Kalbin 4 odacığı, atardamar, toplardamar, kılcal damarlar; küçük ve büyük kan dolaşımı, kan hücreleri.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8e7d6c5b4a3z2y1_dolasim-sistemi.jpg",
        fenConcept: "Dolaşım sistemi; kalp, damarlar ve kandan oluşur. Kalp 4 odacıklıdır (üstte kulakçıklar, altta karıncıklar). Küçük kan dolaşımı kanı akciğere götürüp temizler; büyük kan dolaşımı temiz kanı tüm vücuda dağıtıp kirli kanı toplar. Kanda alyuvarlar (oksijen taşır), akyuvarlar (mikroplarla savaşır) ve kan pulcukları (pıhtılaşmayı sağlar) bulunur.",
        tefekkurInsight: "Kalbin bir ömür boyu yorulmadan günde yaklaşık 100.000 kez atıp 100.000 kilometrelik damar nehirlerine hayat pompalaması, beden şehrine su ve erzak dağıtan sönmez bir motordur.",
        tableRows: [
          ["Alyuvarların disk şeklinde olup oksijen bağlaması", "Her bir hücreye taze oksijen yetiştiren kurye neferler", "Alyuvarlar çekirdeklerini bile feda ederek daha çok oksijen taşır."],
          ["Akyuvarların mikropları tanıyıp antikor üretmesi", "Beden kalesini savunan fedakâr ve şuurlu ordu", "Gözsüz akyuvarın düşman mikrobu bulup yutması hayret vericidir."],
          ["Kan pulcuklarının (trombosit) yaralanan yeri pıhtılaştırması", "Beden musluğunun kan kaybından boşalmasını engelleyen acil tamir timi", "Pıhtılaşma olmasaydı küçücük bir iğne batmasıyla tüm kanımız akıp biterdi."]
        ],
        conclusion: "Dolaşım sistemi, her an taze bir hayat dağıtan damar ırmakları ve dinlenmeksizin atan şefkatli bir kalp mucizesidir."
      }),
      makeChapter({
        id: "7-u3-c3-solunum-sistemi",
        title: "3. Bölüm: Solunum Sistemi",
        hikmetliTitle: "Solunum Sistemi: Her Nefeste Tazelenen Hayat ve Oksijen Şöleni",
        shortDesc: "Burun, yutak, gırtlak, soluk borusu, bronşlar, bronşioller ve alveoller; diyafram kası ve gaz alışverişi.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7e6d5c4b3a2z1y0_solunum-sistemi.png",
        fenConcept: "Solunum sistemi hücreler için gerekli oksijeni havadan alıp kanda biriken karbondioksiti vücuttan uzaklaştırır. Burunda hava nemlendirilir, ısıtılır ve kıllarla süzülür. Soluk borusundaki kıkırdak halkalar borunun kapanmasını engeller. Akciğerlerdeki 300 milyon alveolde gaz alışverişi gerçekleşir. Diyafram kası nefes alma ve vermede hayati rol oynar.",
        tefekkurInsight: "Aldığımız her nefeste hayat verici iki nimet gizlidir: Biri nefesi almak, diğeri ise zehirli karbondioksiti verip ferahlamaktır. İnsan her nefeste iki defa şükre mecburdur.",
        tableRows: [
          ["Burun içindeki mukus ve kılcal damarların havayı ısıtması ve filtrelemesi", "Havanın ciğerlere tam kıvamında ve tertemiz ulaştırılması", "Klima ve filtre mühendisliğinin en mükemmel fıtri numunesi."],
          ["Soluk borusunun 'C' şeklindeki kıkırdak halkaları", "Soluk yolunun hiçbir zaman tıkanıp kapanmaması teminatı", "Boru kapansaydı birkaç dakikada boğulma gerçekleşirdi."],
          ["Alveollerin yüzey genişliğinin 100 metrekare olması", "Küçücük göğüs kafesine bir tenis kortu büyüklüğünde soluma alanı sığdırılması", "Sonsuz sanat ve هندese ile nefes tazelenmektedir."]
        ],
        conclusion: "Solunum sistemi, bize her saniye tazelenen havayı ve hayat bağışlayan nefesi sunan şefkatli bir ilahî ihsandır."
      }),
      makeChapter({
        id: "7-u3-c4-bosaltim-sistemi",
        title: "4. Bölüm: Boşaltım Sistemi",
        hikmetliTitle: "Boşaltım Sistemi: Böbrek Süzgeçlerinin Kanı Arıtan İlahî Filtresi",
        shortDesc: "Böbrekler, üreter, idrar kesesi, üretra; nefronlar, kanın süzülmesi ve atık maddelerin temizlenmesi.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6d5c4b3a2z1y0x9_bosaltim-sistemi.jpg",
        fenConcept: "Vücutta metabolik faaliyetler sonucu oluşan zararlı ve atık maddelerin (üre, ürik asit, fazla tuz ve su) vücuttan atılmasına boşaltım denir. Boşaltım organları; böbrekler (kanı süzer), üreter (idrar borusu), idrar kesesi (depolar) ve üretradır (dışarı atar). Böbreklerin temel süzme birimi olan nefronlar günde yaklaşık 180 litre sıvıyı süzer ve %99'unu geri emer.",
        tefekkurInsight: "Böbrek hastalarının saatlerce diyaliz makinelerine bağlı kalması, iki avuç büyüklüğündeki böbreklerimizin sessiz sedasız yaptığı süzme ve arıtma mucizesinin değerini anlamamıza yeter.",
        tableRows: [
          ["Böbreklerdeki 2 milyon nefronun kanı mikron hassasiyetinde süzmesi", "Zararlı maddeleri atıp faydalı glikoz ve proteinleri tutan şuurlu filtre", "Cansız zerreler neyin faydalı neyin zararlı olduğunu ayırt edemez."],
          ["Süzülen sıvının %99'unun vücuda geri emilmesi", "Kainattaki israfsızlık ve bedendeki su dengesinin korunması", "Geri emilim olmasaydı insan günde onlarca kova su içmek zorunda kalırdı."],
          ["Deri, akciğer ve karaciğerin de boşaltıma yardımcı olması", "Beden sarayını temiz tutmak için el birliğiyle çalışan organlar", "Kainattaki Kuddüs (tertemiz kılan) isminin bedenimizdeki tecellisi."]
        ],
        conclusion: "Boşaltım sistemi, kanımızı her an arıtıp beden şehrini zehirlerden koruyan şefkatli bir temizlik fabrikasıdır."
      })
    ]
  },
  {
    id: "7-u4-isigin-kirilmasi-ve-mercekler",
    title: "4. ÜNİTE: IŞIĞIN KIRILMASI VE MERCEKLER",
    chapters: [
      makeChapter({
        id: "7-u4-c1-isigin-kirilmasi",
        title: "1. Bölüm: Işığın Kırılması",
        hikmetliTitle: "Işığın Kırılması: Yoğunluklar Arasında Yolunu Değiştiren Zarafet",
        shortDesc: "Işığın farklı ortamlarda hız değiştirmesi, kırılma kanunları, normale yaklaşma/uzaklaşma ve serap olayı.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5d4c3b2a1z0y9x8_isik-kirilmasi.png",
        fenConcept: "Işığın saydam bir ortamdan başka bir saydam ortama geçerken doğrultu değiştirmesine ışığın kırılması denir. Kırılmanın sebebi ışığın farklı ortamlarda farklı hızlarla yayılmasıdır (ışık havada suda olduğundan, suda camda olduğundan daha hızlıdır). Az yoğundan çok yoğuna geçen ışın normale yaklaşır ve hızı azalır; çok yoğundan az yoğuna geçen ışın normalden uzaklaşır ve hızı artar.",
        tefekkurInsight: "Işığın su bardağındaki kaşığı kırık gibi göstermesi veya çölde serap oluşturması; fizik kanunlarının ardındaki ince optik dengeleri insana gösterir.",
        tableRows: [
          ["Işığın yoğun ortamda yavaşlayarak bükülmesi (Snell Kanunu)", "Fiziksel maddelerin hız sınırlarına göre tanzim edilmiş intizam", "Işık her ortamın şartına göre edeple yolunu ayarlar."],
          ["Çok yoğun ortamdan sınır açısından büyük açıyla gelen ışının tam yansıması", "Fiber optik kablolarla internetin ışık hızında taşınması imkanı", "Bugünkü haberleşme teknolojisi bu kırılma ve tam yansıma kanununa dayanır."],
          ["Balıkların sudan bakıldığında olduklarından daha yakın görünmesi", "Işığın açısının gözümüze farklı derinlik hissi vermesi", "Optik algı ve perspektifin tabiat kanunlarıyla şekillenmesi."]
        ],
        conclusion: "Işığın kırılması, nurani ışınların maddeler dünyasında süratini ve doğrultusunu değiştirirken sergilediği optik bir zarafettir."
      }),
      makeChapter({
        id: "7-u4-c2-mercekler",
        title: "2. Bölüm: Mercekler",
        hikmetliTitle: "Mercekler ve Göz: Işığı Toplayıp Görüntüyü Surete Döken Sanat",
        shortDesc: "İnce kenarlı (yakınsak) ve kalın kenarlı (ıraksak) mercekler; odak noktası, göz kusurları (miyop, hipermetrop).",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4c3b2a1z0y9x8w7_mercekler.jpg",
        fenConcept: "En az bir yüzeyi küresel olan saydam cisimlere mercek denir. İnce kenarlı mercekler ışığı odak noktasında toplar, büyüteç olarak çalışır ve hipermetrop (yakını görememe) tedavisinde kullanılır. Kalın kenarlı mercekler ışığı dağıtır ve miyop (uzağı görememe) tedavisinde kullanılır. İnsan gözündeki göz merceği ince kenarlı bir mercektir.",
        tefekkurInsight: "Gözümüzdeki ince merceğin bakılan mesafeye göre şişkinleşip incelerek (göz uyumu) görüntüyü retinaya odaklaması, dünyanın en gelişmiş fotoğraf makinesinden daha üstün bir canlı sanatıdır.",
        tableRows: [
          ["İnce kenarlı merceğin Güneş ışınlarını odakta toplayabilmesi", "Orman yangınlarına sebep olabilecek kırık camların toplanması şuuru", "Tabiata atılan cam atıkların birer yangın kıvılcımına dönüşebileceği ikazı."],
          ["Miyop ve hipermetrobun merceklerle düzeltilmesi", "İnsanın aklına ilim verilerek görme kusurlarını tedavi edebilmesi", "Gözlük camları insana sunulmuş bir görme lütfudur."],
          ["Teleskop ve mikroskoplarda merceklerin birleşmesi", "Atomun içini ve galaksilerin derinliğini temaşa edebilme nimeti", "Mercekler insana kainat meşherini hem mikro hem makro alemde seyrettirir."]
        ],
        conclusion: "Mercekler, ışığın odaklanıp görüntünün nakşedilmesini sağlayan optik tefekkür anahtarlarıdır."
      })
    ]
  },
  {
    id: "7-u5-maddenin-dogasina-yolculuk",
    title: "5. ÜNİTE: MADDENİN DOĞASINA YOLCULUK",
    chapters: [
      makeChapter({
        id: "7-u5-c1-tanecikli-yapi",
        title: "1. Bölüm: Maddenin Tanecikli Yapısı",
        hikmetliTitle: "Atom ve Tanecikli Yapı: Zerrelerin İçindeki Çekirdek ve Elektron Nizamı",
        shortDesc: "Atomun yapısı, proton, nötron, elektron, katmanlar, moleküller ve atom modellerinin tarihsel gelişimi.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3c2b1a0y9x8w7v6_atom-yapisi.png",
        fenConcept: "Maddenin en küçük yapı taşına atom denir. Atom; merkezdeki çekirdek (pozitif yüklü proton ve yüksüz nötron) ile çekirdek etrafındaki katmanlarda saniyede binlerce kilometre hızla dönen negatif yüklü elektronlardan oluşur. Atomun kütlesinin neredeyse tamamı çekirdekte toplanmıştır; hacminin büyük kısmı ise boşluktur.",
        tefekkurInsight: "Elektronların çekirdeğe düşmeden ve birbirine çarpmadan akıl almaz bir süratle dönmesi; mikro alemde de Güneş Sistemi'ndeki gibi aynı Yaratıcı'nın mührünü taşır.",
        tableRows: [
          ["Elektronların saniyede 2200 km hızla çekirdek etrafında dönmesi", "Mikro alemdeki hayret verici tavaf ve intizam", "Bu muazzam hızda hiçbir elektron birbiriyle çarpışmaz."],
          ["Çekirdekteki pozitif protonların birbirini itmesine rağmen güçlü nükleer kuvvetle bir arada tutulması", "Zıtların bir arada tutulmasıyla maddenin dağılmasının engellenmesi", "Kudret eli zerreyi öyle bir bağlamıştır ki parçalanması dev enerji saçar."],
          ["Atomun %99.99'unun boşluktan ibaret olması", "Maddenin ardındaki latif ve nurani kudret perdesi", "Görünen katı madde aslında enerjinin ve dengenin yoğunlaşmış halidir."]
        ],
        conclusion: "Atom, zerreler alemine nakşedilmiş muazzam bir tevhid mührü ve kudret şaheseridir."
      }),
      makeChapter({
        id: "7-u5-c2-saf-maddeler",
        title: "2. Bölüm: Saf Maddeler",
        hikmetliTitle: "Saf Maddeler: Element ve Bileşiklerdeki Katıksız Sanat İmzası",
        shortDesc: "Elementler (sembolleri), bileşikler (formülleri), moleküller ve kimyasal bağların hikmeti.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2b1a0y9x8w7v6u5_saf-maddeler.jpg",
        fenConcept: "Aynı tür taneciklerden oluşan maddelere saf madde denir. Elementler aynı tür atomlardan oluşur, sembollerle gösterilir (H, O, Fe, Na vb.) ve fiziksel/kimyasal yollarla daha basit maddelere ayrılamaz. Bileşikler en az iki farklı elementin kendi özelliklerini kaybederek belirli oranlarda birleşmesiyle oluşur, formüllerle gösterilir (H2O, NaCl, CO2 vb.).",
        tefekkurInsight: "Yanıcı hidrojen gazı ile yakıcı oksijen gazının birleşerek söndürücü ve hayat verici suyu (H2O) meydana getirmesi; zıt özelliklerin bambaşka bir rahmet şerbetine dönüştürülmesidir.",
        tableRows: [
          ["Elementlerin kendi özelliklerini kaybedip bileşik oluşturması", "Varlıkların kendi benliklerinden vazgeçip yepyeni hayırlı hizmetlere koşması", "Tuzdaki sodyum zehirli, klor zehirlidir; ikisi birleşince sofraların tuzu olur."],
          ["Bileşiklerdeki sabit oranlar kanunu (H2O'da 2 hidrojen, 1 oksijen)", "Kimyadaki matematiksel adalet ve değişmez mizan", "Rastgele oranlarla hayat suyu oluşamaz; ölçü hassastır."],
          ["Evrendeki 118 elementin alfabenin harfleri gibi olması", "Bu harflerle trilyonlarca farklı madde ve canlının yazılması", "Tek bir alfabeden kainat kitabının yazılışı Yaratıcı'nın vahdaniyetini gösterir."]
        ],
        conclusion: "Saf maddeler, element ve bileşiklerin şaşmaz ölçülerle bir araya getirilip yeryüzü hayatını kuran kimyasal harfleri ve kelimeleridir."
      }),
      makeChapter({
        id: "7-u5-c3-karisimlar",
        title: "3. Bölüm: Karışımlar",
        hikmetliTitle: "Karışımlar: Eşyanın Birlikte Yaşama ve Denge Sanatı",
        shortDesc: "Homojen (çözelti) ve heterojen (süspansiyon, emülsiyon, aerosol) karışımlar; çözünme hızı ve çözücü-çözünen dengesi.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg1a0y9x8w7v6u5t4_karisimlar.png",
        fenConcept: "İki veya daha fazla maddenin kendi kimyasal özelliklerini kaybetmeden rastgele oranlarda bir araya gelmesiyle oluşan maddelere karışım denir. Her yerinde aynı özelliği gösteren karışımlara homojen karışım (çözelti: hava, tuzlu su, gazoz), göstermeyenlere heterojen karışım (salata, ayran, çorba) denir. Çözünme hızı sıcaklık artışı, karıştırma ve temas yüzeyinin artırılmasıyla (pudra şekeri) artar.",
        tefekkurInsight: "Havanın %78 azot ve %21 oksijen gibi homojen bir gaz karışımı olması, her nefeste dengeli oksijen almamızı sağlayan devasa bir ilahî karışımdır.",
        tableRows: [
          ["Havanın gaz çözeltisi olarak her yerde aynı oranda bulunması", "Zengin-fakir herkesin aynı dengeli havayı soluması nimeti", "Gazlar ayrışsaydı oksijen altta birikir, ilk kıvılcımda dünya yanardı."],
          ["Suyun evrensel bir çözücü kılınması", "Maddelerin suda çözünerek canlı bedenine ve toprağa karışması", "Su çözücü olmasaydı bitkiler topraktan mineral alamazdı."],
          ["Karışımlarda maddelerin kimliğini koruması", "Birliktelik içinde dahi her zerrenin kendi fıtratını muhafaza etmesi", "Eşyanın hakikatinin korunması ilkesi."]
        ],
        conclusion: "Karışımlar, maddelerin bir arada barış içinde bulunarak canlıların hayatını kolaylaştıran ahenkli birliktelikleridir."
      }),
      makeChapter({
        id: "7-u5-c4-karisimlarin-ayrilmasi",
        title: "4. Bölüm: Karışımların Ayrılması",
        hikmetliTitle: "Karışımların Ayrılması: Farklı Özelliklerin İlimle Tefrik Edilmesi",
        shortDesc: "Buharlaştırma, damıtma, yoğunluk farkı (ayırma hunisi, yüzdürme), mıknatısla ayırma ve süzme yöntemleri.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0z9y8x7w6v5u4t3_karisim-ayirma.jpg",
        fenConcept: "Karışımı oluşturan maddeler fiziksel özelliklerinin farklılığından yararlanılarak ayrılır: Buharlaştırma (tuzlu sudan tuz eldesi), damıtma (kaynama noktası farkıyla petrolün ve alkollü suyun ayrılması), yoğunluk farkı (ayırma hunisi ile zeytinyağı-su ayrımı), mıknatısla ayırma (demir, nikel, kobalt) ve süzme (makarna-su, çay süzgeci).",
        tefekkurInsight: "Maddelerin yoğunluk, kaynama ve erime noktalarının farklı yaratılması sayesinde insanın onları kolayca birbirinden ayırıp teknoloji ve tıpta kullanabilmesi, ilme açılmış büyük bir ihsandır.",
        tableRows: [
          ["Ayrımsal damıtma ile petrolden benzin, gaz yağı ve asfalt eldesi", "Tek bir siyah yağdan insanlığa yüzlerce faydalı ürün çıkarılması", "Yeryüzü madenlerinin hikmetle işlenmesi nimeti."],
          ["Buharlaştırma ile deniz suyundan bembeyaz tuz kristallerinin elde edilmesi", "Görünmez tuzun buharlaşma sayesinde aşikâr olması", "Görünmeyen hakikatlerin ilimle görünür kılınması gibi."],
          ["Filtreleme ve süzme ile kirli suların arıtılması", "İnsanın aklını kullanarak temiz suya kavuşması", "Kainattaki arıtma nizamına insanın dahil olması."]
        ],
        conclusion: "Karışımların ayrılması yöntemleri, maddelerin farklı fıtratlarını tanıyarak kainat hazinelerinden istifade etmeyi sağlayan ilahî anahtarlardır."
      })
    ]
  },
  {
    id: "7-u6-elektriklenme",
    title: "6. ÜNİTE: ELEKTRİKLENME",
    chapters: [
      makeChapter({
        id: "7-u6-c1-elektrik-yukleri-ve-elektriklenme",
        title: "1. Bölüm: Elektrik Yükleri ve Elektriklenme",
        hikmetliTitle: "Elektrik Yükleri ve Elektriklenme: Pozitif ve Negatifin Dengeli Dansı",
        shortDesc: "Sürtünme, dokunma ve etki ile elektriklenme; pozitif ve negatif yükler, elektroskop ve topraklama.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9y8x7w6v5u4t3s2_elektriklenme.png",
        fenConcept: "Maddeler atomlarındaki elektron alışverişi sonucu elektrik yüküyle yüklenir. Pozitif (+) ve negatif (-) yükler vardır; aynı yükler birbirini iter, zıt yükler çeker, nötr cisimler ise yüklü cisimler tarafından çekilir. Elektriklenme sürtünme, dokunma ve etki ile gerçekleşir. Bir cismin yüklü olup olmadığını ve yükün cinsini elektroskop belirler. Yüklü cisimlerin nötr hale getirilmesine topraklama denir.",
        tefekkurInsight: "Yün kazağımızı çıkarırken çıkan çıtırtılardan gökyüzündeki şimşeklere kadar aynı elektriksel yük kanununun işlemesi; mikro ile makro alemin aynı Mimar'ın eseri olduğunu gösterir.",
        tableRows: [
          ["Zıt yüklerin birbirini çekmesi, aynı yüklerin itmesi", "Kainattaki atomların bir arada durmasını sağlayan elektriksel tutkal", "Yükler olmasaydı moleküller dağılır, hiçbir cisim var olamazdı."],
          ["Topraklama ile fazla yükün toprağa akıp nötrlenmesi", "Toprağın yeryüzünün şefkatli bir ana gibi bütün fazlalıkları yutması", "İnsanın çıplak ayakla toprağa basarak huzur bulması da bu fıtri dengedendir."],
          ["Fotokopi makineleri ve baca filtrelerinde elektriklenmeden yararlanılması", "Statik elektriğin sanayide ve hava temizliğinde hikmetle kullanılması", "Küçücük bir fizik kanununun insanlığın hizmetine sunulması."]
        ],
        conclusion: "Elektriklenme kanunları, zerrelerin elektrik yükleriyle donatılıp birbirine bağlandığı ve dengelendiği harika bir intizam tablosudur."
      })
    ]
  },
  {
    id: "7-u7-surdurulebilir-yasam-ve-enerji",
    title: "7. ÜNİTE: SÜRDÜRÜLEBİLİR YAŞAM VE ENERJİ",
    chapters: [
      makeChapter({
        id: "7-u7-c1-besin-zinciri-ve-enerji-akisi",
        title: "1. Bölüm: Besin Zinciri ve Enerji Akışı",
        hikmetliTitle: "Besin Zinciri ve Enerji Akışı: Güneşten Sofraya Ulaşan Rızık Zinciri",
        shortDesc: "Üreticiler, tüketiciler, ayrıştırıcılar; besin zinciri, enerji piramidi ve %10 enerji aktarım kuralı.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8x7w6v5u4t3s2r1_besin-zinciri.jpg",
        fenConcept: "Canlılar arasındaki beslenme ilişkilerini gösteren zincire besin zinciri denir. Zincirin tabanında Güneş enerjisini kimyasal enerjiye çeviren üreticiler (bitkiler, algler) yer alır. Üreticileri birincil tüketiciler (otçullar), onları ikincil ve üçüncül tüketiciler (etçiller) takip eder. Ayrıştırıcılar (mantar ve bakteriler) her basamakta görev yapar. Enerji piramidinde yukarı çıkıldıkça aktarılan enerji azalır (her basamakta yaklaşık %10'u aktarılır).",
        tefekkurInsight: "Güneş'in nükleer fırınında üretilen ışığın, bir yeşil yaprakta ekmeğe ve ete dönüşerek insan sofrasına ulaşması; milyarlarca kilometre öteden sofralarımıza uzanan ilahî bir ikram elidir.",
        tableRows: [
          ["Bitkilerin fotosentezle Güneş ışığını depolaması", "Yeryüzü sofrasının ilk aşçılarının dilsiz bitkiler olması", "Bitkiler olmasaydı hiçbir hayvan ve insan beslenemezdi."],
          ["Ayrıştırıcıların ölü bedenleri toprağa katarak zinciri yenilemesi", "Kainattaki temizlik ve sonsuz geri dönüşüm memurları", "Ayrıştırıcılar olmasaydı yeryüzü leşlerle kaplanır, hayat dururdu."],
          ["Enerji piramidinde biyolojik birikimin (zehir) yukarı çıktıkça artması", "İnsanın tabiatı kirlettiğinde en büyük zararı yine kendisinin göreceği ikazı", "Kainattaki adalet mekanizması insanın hatasını yüzüne çarpar."]
        ],
        conclusion: "Besin zinciri, bütün canlıların tek bir sofrada birbirine muhtaç kılınarak rızıklandırıldığı muazzam bir ilahî dayanışma kanunudur."
      }),
      makeChapter({
        id: "7-u7-c2-surdurulebilir-yasam",
        title: "2. Bölüm: Sürdürülebilir Yaşam",
        hikmetliTitle: "Sürdürülebilir Yaşam: Yeryüzü Misafirhanesini Geleceğe Koruma Şuuru",
        shortDesc: "Ekolojik ayak izi, karbon ayak izi, su ayak izi, yenilenebilir enerji kaynakları ve israfsız yaşam.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7w6v5u4t3s2r1q0_surdurulebilir-yasam.png",
        fenConcept: "İnsanlığın bugünkü ihtiyaçlarını gelecek nesillerin ihtiyaçlarını tehlikeye atmadan karşılamasına sürdürülebilir kalkınma/yaşam denir. Karbon ayak izi, faaliyetlerimiz sonucu atmosfere salınan sera gazı miktarıdır. Su ayak izi, tüketilen tatlı su miktarıdır. Fosil yakıtlar yerine güneş, rüzgar, jeotermal ve biyokütle gibi yenilenebilir enerji kaynakları tercih edilmelidir.",
        tefekkurInsight: "Peygamber Efendimiz'in (a.s.m.) 'Akan bir nehir kenarında olsanız dahi abdest alırken suyu israf etmeyiniz' fermanı, modern bilimin henüz yeni keşfettiği sürdürülebilirliğin en üst ahlakî zirvesidir.",
        tableRows: [
          ["Güneş ve rüzgar enerjisinin tükenmez ve temiz olması", "Kainatın yaratılışında saklı sonsuz ve tertemiz ilahî hazineler", "Kömür ve petrol dünyayı kirletirken güneş temizlik sunar."],
          ["Su ayak izini küçültme zarureti", "Bir damla suyun bile hayat olduğunu bilerek musluğu kapatmak", "Su nimetine şükür, onu israf etmemekle olur."],
          ["Gelecek nesillere yaşanabilir bir Dünya bırakma şuuru", "Tabiatın bize mülk değil, bir emanet olduğu hakikati", "Emanete hıyanet etmemek imanın ve aklın gereğidir."]
        ],
        conclusion: "Sürdürülebilir yaşam; kainattaki ilahî iktisat ve mizan kanununa uyarak, yeryüzü emanetini tertemiz geleceğe taşımaktır."
      })
    ]
  }
];

console.log("Grade 7 units built successfully with total chapters:", grade7Units.reduce((a, b) => a + b.chapters.length, 0));

fs.writeFileSync(
  path.join(curriculumDir, "grade7.ts"),
  `import { Grade } from '../grades';\n\nexport const GRADE_7_CURRICULUM: Grade = {\n  id: "7",\n  name: "7. Sınıf",\n  description: "Türkiye Yüzyılı Maarif Modeli ve Fenbilim.net müfredatına göre hazırlanmış 7 ünite ve 17 alt konu başlığında Hikmetli Fen tefekkür okumaları.",\n  units: ${JSON.stringify(grade7Units, null, 2)}\n};\n`
);
console.log("grade7.ts written!");
