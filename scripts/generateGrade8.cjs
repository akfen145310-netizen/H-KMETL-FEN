const fs = require('fs');
const path = require('path');

const curriculumDir = path.join(process.cwd(), 'src', 'data', 'curriculum');
if (!fs.existsSync(curriculumDir)) {
  fs.mkdirSync(curriculumDir, { recursive: true });
}

// Helper to build chapter content with 10-Stage Risale-i Nur Thought Framework (8. Sınıf Seviyesi)
function makeChapter({ id, title, hikmetliTitle, shortDesc, imageUrl, fenConcept, tefekkurInsight, tableRows, conclusion, gradeLevel = 8 }) {
  const content = `
# ${hikmetliTitle}

> **Bismillah:** *"Bütün mevcudat lisan-ı hal ile Bismillah der; Halık-ı Zülcelal'in namına hareket edip, O'nun rahmet ve hikmet hazinelerinden birer numuneyi bize takdim eder."*

## 1. Varlığı Tanıt (Sistemin Kapısını Aralama)
**${title}**, kainat kitabında sergilenen yüksek hendesenin, ilahi programlamanın ve derin hikmetin en hayret verici sayfalarından biridir. ${shortDesc} Bu sistem, varlık sahnesinde kendi kendine veya rastlantıyla ortaya çıkmış değildir; her bir noktası gayeli, hikmetli ve bir amaca hizmet edecek şekilde var edilmiştir.

## 2. Parçalarını Göster & 3. Her Parçanın Vazifesi (Nasıl ve Neden?)
Bu sistemde vazifeli olan nükleotidler, elementler, bağlar, kuvvetler ve kavramlar iki derin katmanda şöyle anlaşılır:

- **1. Katman ("NASIL?" — Bilimsel Mekanizma ve Kanunlar):**
${fenConcept}

- **2. Katman ("NEDEN?" — Hikmet, Gaye ve İlahi Sanat):**
${tefekkurInsight}

${imageUrl ? `![${hikmetliTitle}](${imageUrl})
fenbilim.net alıntıdır. [Resim Link](${imageUrl})
> **Tefekkür Dürbünü:** Görseldeki hassas yapı ve nizam; kör, sağır ve şuursuz maddelerin değil, her şeyi her an gören ve bilen bir Sanatkârın mührüdür.
` : ''}

## 4. Parçalar Arasındaki Harika Uyum (Müthiş İttifak)
Bu sistemin hiçbir parçası diğerinden habersiz değildir. Tıpkı DNA'daki şifrelerin veya periyodik cetveldeki elementlerin intizamı gibi, tüm unsurlar tam bir dayanışma ve yardımlaşma ile tek bir ortak maksada hizmet eder. Bir nükleotidin veya bağın yer değiştirmesi felakete yol açacakken, kusursuz bir vazife şuuruyla hareket edilir.

## 5. Ölçü, Mizan ve İnce Düzen
Sistemdeki oranlar, periyotlar, genetik kodlar ve kimyasal tepkime dengeleri şaşmaz bir matematiksel hendese ile takdir edilmiştir. Ölçüdeki en ufak bir sapma tüm ahengi bozacakken, kanunların şaşmaz bir istikrarla işlemesi mutlak bir nizamın varlığını ispatlar.

## 6. Temsil ve Benzetme Dürbünü (Hakikate Açılan Pencere)
Gelin bu hakikati 8. sınıf seviyemize uygun bir temsil dürbünüyle anlayalım:
Nasıl ki milyonlarca satır kusursuz koddan oluşan devasa bir işletim sistemi veya trilyonlarca parçası uyumla çalışan bir süper bilgisayar; rastgele harf dizilimleriyle veya tesadüfen meydana gelemez. Aynen öyle de **${title}** nizamı, kainattaki o muazzam ilahi yazılım ve hendesenin şaşmaz bir şubesidir.

## 7. Hikmet Penceresi: Canlıya ve Kainata Sunulan Hizmet
Bu sistemin canlılar alemi, insan hayatı ve yeryüzündeki genetik-kimyasal denge için sunduğu rahmetli hizmetler:

| Fen Bilimleri Unsuru ("Nasıl?") | Hikmet ve İlahî Tecelli ("Neden?") | İnce Ayar ve Tefekkür Dersi |
| :--- | :--- | :--- |
${tableRows.map(r => `| ${r[0]} | ${r[1]} | ${r[2]} |`).join('\n')}

## 8. İrade, Sanat ve Program Perspektifi
Aklı, şuuru, bilgisi ve merhameti olmayan cansız atomların, kimyasal bağların veya genetik şifrelerin böylesine muazzam bir gayede birleşmesi; onların kendi kabiliyeti değildir. Bu durum, her şeyin arkasında sonsuz bir İrade, Program, Kusursuz Sanat ve Hikmet Sahibinin (Sâni-i Zülcelal'in) bulunduğunu açıkça ilan eder.

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
// GRADE 8
// ==========================================
const grade8Units = [
  {
    id: "8-u1-mevsimler-ve-iklim",
    title: "1. Ünite: Mevsimler ve İklim",
    chapters: [
      makeChapter({
        id: "8-u1-c1-mevsimlerin-olusumu",
        title: "1. Bölüm: Mevsimlerin Oluşumu",
        hikmetliTitle: "Mevsimlerin Oluşumu: 23°27' Eksen Eğikliğiyle Gelen Dört Mevsim Rahmeti",
        shortDesc: "Dünya'nın eksen eğikliği, Güneş etrafında dolanma, gün dönümleri (21 Haziran, 21 Aralık) ve ekinokslar (21 Mart, 23 Eylül).",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6v5u4t3s2r1q0p9_mevsimler.png",
        fenConcept: "Mevsimlerin oluşmasının iki temel sebebi vardır: Dünya'nın dönme ekseninin 23°27' eğik olması ve Dünya'nın Güneş etrafında dolanması. Dünya'nın Güneş'e olan mesafesinin mevsimlerin oluşumuyla hiçbir ilgisi yoktur (Dünya Güneş'e en yakın olduğu 3 Ocak'ta Kuzey Yarımküre'de kıştır). Işığın dik geldiği yarımkürede birim alana düşen enerji artar ve yaz mevsimi yaşanır.",
        tefekkurInsight: "Dünya'nın ekseni tam 23 derece 27 dakika eğik bırakılmasaydı; yeryüzünde mevsimler oluşmaz, kutuplar ebedi kış, ekvator ebedi çöl olur ve tarım imkansız hale gelirdi. Bu derece, yeryüzünü cennet bahçesine çeviren ilahî bir ince ayardır.",
        tableRows: [
          ["23°27'lik eksen eğikliği", "Yeryüzüne ilkbahar, yaz, sonbahar ve kışın sırayla gönderilmesi", "Şuursuz gezegen kendi eksenini böyle bir hassasiyetle eğemez."],
          ["Işığın eğik ve dik gelme açısı", "Isının ve rızıkların yeryüzü kıtalarına adaletle dağıtılması", "Güneş ışınlarının açısındaki hikmetli matematik."],
          ["Dünya'nın Güneş'e en yakın olduğu tarihte kış yaşanması", "Sebeplerin hakiki fail olmadığını ispatlayan tefekkür ayeti", "Mevsimi yapan yakınlık değil, ilahî iradenin takdir ettiği açıdır."]
        ],
        conclusion: "Mevsimlerin oluşumu, yeryüzü sofrasında her üç ayda bir taptaze meyve ve sebzelerin yenilenmesini sağlayan muazzam bir ilahî takvimdir."
      }),
      makeChapter({
        id: "8-u1-c2-iklim-ve-hava-hareketleri",
        title: "2. Bölüm: İklim ve Hava Hareketleri",
        hikmetliTitle: "İklim ve Hava Hareketleri: Rüzgarın Müjdeci Esintisi ve Yağmur Rahmeti",
        shortDesc: "Yüksek ve alçak basınç alanları, rüzgarın oluşumu, yağış türleri (yağmur, kar, dolu, çiy, kırağı, sis), iklim ve hava olayları farkı.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5u4t3s2r1q0p9o8_iklim-hava.jpg",
        fenConcept: "Hava olayları dar bir alanda kısa sürede değişen olaylardır ve meteoroloji inceler. İklim ise geniş bir bölgede uzun yıllar (35-40 yıl) değişmeyen ortalama hava şartlarıdır ve klimatoloji inceler. Sıcak hava yükselerek alçak basınç (AB), soğuk hava alçalarak yüksek basınç (YB) oluşturur. Yatay yönlü hava hareketine rüzgar denir ve rüzgar daima yüksek basınçtan alçak basınca doğru eser.",
        tefekkurInsight: "Havanın ısınması ve soğumasıyla ortaya çıkan basınç farklarının rüzgarı meydana getirmesi; bulutları binlerce kilometre öteye taşıyıp susuz kalmış topraklara su ulaştıran ilahî bir nakliye teşkilatıdır.",
        tableRows: [
          ["Rüzgarın yüksek basınçtan alçak basınca doğru esmesi", "Bulutların muhtaç topraklara sevk edilmesi için kurulan hava pompası", "Rüzgar olmasaydı denizler üzerindeki buhar karaya ulaşamazdı."],
          ["Yağmur damlalarının gökten inerken hava direnciyle hızının sınırlanması", "Damlaların insanları delip geçmeden birer rahmet tanesi gibi inmesi", "Paraşüt gibi inen damlalar ilahî şefkati gösterir."],
          ["İklimlerin binlerce yıldır kararlı ve öngörülebilir olması", "Canlıların ve tarımın planlı bir şekilde devam edebilmesi güvencesi", "Kainattaki kararlılık ve güven nizamının eseri."]
        ],
        conclusion: "Hava hareketleri ve iklim kanunları, yeryüzü bahçesini sulamak ve tazelemek için istihdam edilen şefkatli bir sevk ve idare nizamıdır."
      })
    ]
  },
  {
    id: "8-u2-dna-ve-genetik-kod",
    title: "2. Ünite: DNA ve Genetik Kod",
    chapters: [
      makeChapter({
        id: "8-u2-c1-dna-ve-genetik-kod",
        title: "1. Bölüm: DNA ve Genetik Kod",
        hikmetliTitle: "DNA ve Genetik Kod: Mikroskobik Çekirdeğe Yazılmış Hayat Kitabı",
        shortDesc: "Kromozom, DNA, gen, nükleotid hiyerarşisi (KeDiGeNi); çift zincirli sarmal yapı, eşlenme ve hayat yazılımı.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4t3s2r1q0p9o8n7_dna-kod.png",
        fenConcept: "Hücredeki yönetici molekül DNA'dır (Deoksiribo Nükleik Asit). DNA'nın yapı birimi nükleotid (Fosfat + Şeker + Organik Baz: Adenin, Timin, Guanin, Sitozin), görev birimi gendir. Adenin daima Timin ile (2'li hidrojen bağı), Guanin daima Sitozin ile (3'lü hidrojen bağı) eşleşir. DNA hücre bölünmesi öncesinde kendini hatasız olarak kopyalar (eşler).",
        tefekkurInsight: "İnsan vücudundaki tek bir hücrenin çekirdeğine 3 milyar harflik bir bilgi kütüphanesinin (DNA) sığdırılması; kâinatın en büyük ilim ve yazılım mucizesidir. Bir harf bile yazar olmadan yazılamazken bu kütüphane tesadüfle açıklanamaz.",
        tableRows: [
          ["Adenin-Timin ve Guanin-Sitozin şaşmaz kuralı", "Moleküler seviyedeki kusursuz eşleşme ve matematiksel sadakat", "Şuursuz kimyasallar hangi bazın kime denk geleceğini kendi kendine bilemez."],
          ["DNA'nın kendini kusursuz eşlemesi ve hataların enzimlerle tamiri", "Beden sarayındaki en hassas kalite kontrol ve tashih mekanizması", "Hataların tamir edilmesi hayatın sürekliliğini temin eder."],
          ["Sadece 4 bazla (A, T, G, C) milyonlarca canlı türünün kodlanması", "En sade alfabeyle sonsuz sanat eserlerinin vücuda getirilmesi", "İlahî vahdet ve azametin biyokimyasal ifadesi."]
        ],
        conclusion: "DNA, her bir hücremize şefkatle yerleştirilmiş muazzam bir hayat fihristesi ve ilahî kader yazılımıdır."
      }),
      makeChapter({
        id: "8-u2-c2-kalitim",
        title: "2. Bölüm: Kalıtım",
        hikmetliTitle: "Kalıtım: Nesiller Boyu Korunan Sırlar ve Genetik Mizan",
        shortDesc: "Mendel genetiği, alel genler, fenotip, genotip, homozigot, heterozigot, çaprazlamalar ve akraba evliliği.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3s2r1q0p9o8n7m6_kalitim.jpg",
        fenConcept: "Canlıların sahip olduğu özelliklerin nesilden nesile aktarılmasına kalıtım denir. Kalıtımın kurucusu Gregor Mendel'dir (bezelyelerle çalışmıştır). Biri anneden biri babadan gelen gen çiftine alel gen denir. Etkisini her zaman gösteren gene baskın (dominant), sadece saf halde gösteren gene çekinik (resesif) gen denir. Akraba evliliği çekinik genlerle taşınan kalıtsal hastalıkların ortaya çıkma riskini artırır.",
        tefekkurInsight: "Anne ve babadan gelen genlerin belirli oranlarla (1/4, 1/2) şaşmaz bir istatistikle birleşerek yeni bir insan sureti meydana getirmesi; ilahî nakışların her insanda benzersiz yaratılışıdır.",
        tableRows: [
          ["Mendel çaprazlamalarında şaşmaz matematiksel ihtimaller", "Biyolojinin temelinde yatan hassas cebir ve ölçü kanunu", "Rastgele döllenmelerde bile ihtimaller adaletle dağıtılır."],
          ["8 milyar insanın hiçbirinin parmak izinin ve simasının birbirinin aynı olmaması", "Her bir fertle bizzat ilgilenen sonsuz ilim ve iradenin mührü", "Kalıtım kuralları içinde sonsuz çeşitlilik sanatı."],
          ["Akraba evliliğindeki çekinik hastalık riskinin bilime öğretilmesi", "İnsana verilen aklın fıtrata uygun yaşama rehberi kılınması", "Fıtri sınırlara riayet sıhhat ve afiyet getirir."]
        ],
        conclusion: "Kalıtım kanunları, nesillerin devamını sağlarken her bir ferde kendine has bir kimlik bahşeden ilahî adalet ve çeşitlilik nizamıdır."
      }),
      makeChapter({
        id: "8-u2-c3-mutasyon-modifikasyon",
        title: "3. Bölüm: Mutasyon ve Modifikasyon",
        hikmetliTitle: "Mutasyon ve Modifikasyon: Şartlara Uyum ve Fıtri Sınırların Hikmeti",
        shortDesc: "Gen yapısındaki bozulmalar (mutasyon), çevrenin etkisiyle gen işleyişindeki geçici değişiklikler (modifikasyon).",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2r1q0p9o8n7m6l5_mutasyon-modifikasyon.png",
        fenConcept: "Radyasyon, kimyasal maddeler gibi etkenlerle DNA'nın yapısında meydana gelen kalıcı bozulmalara mutasyon denir (Down sendromu, albinoluk, orak hücreli anemi). Mutasyonların büyük çoğunluğu zararlı veya öldürücüdür. Çevre şartlarının (sıcaklık, besin, ışık) etkisiyle genlerin işleyişinde meydana gelen, kalıtsal olmayan değişikliklere modifikasyon denir (bronzlaşma, arı sütüyle beslenen arının kraliçe olması, çuha çiçeğinin sıcaklığa göre kırmızı/beyaz açması).",
        tefekkurInsight: "Rastgele gerçekleşen mutasyonların canlıya yeni faydalı organlar kazandırmak yerine onu sakatlaması veya öldürmesi; hayatın kör tesadüflerle değil, baştan planlanmış kusursuz bir tasarımla var olduğunu açıkça ispatlar.",
        tableRows: [
          ["Mutasyonların gen yapısını bozup hastalıklara yol açması", "Kör tesadüflerin var olan harika yazılımı sadece tahrip edebileceği gerçeği", "Bir kitaba rastgele harf fırlatmak yeni roman yazmaz, var olanı bozar."],
          ["Modifikasyonun genin işleyişini değiştirerek çevreye uyum sağlaması", "Canlılara lütfedilen esnek yaşam ve hayatta kalma programı", "Arı larvasına arı sütü verilince kraliçe olması fıtri bir potansiyeldir."],
          ["Çevre şartları normale dönünce modifikasyonun eski haline dönmesi", "Fıtratın ve aslî yaratılışın korunması kanunu", "Maddenin sınırları ilahî bir ölçüyle çizilmiştir."]
        ],
        conclusion: "Mutasyon ve modifikasyon, hayat programının ne kadar hassas korunduğunu ve canlılara bahşedilen esnek uyum kabiliyetini gösteren ibretli ayetlerdir."
      }),
      makeChapter({
        id: "8-u2-c4-adaptasyon",
        title: "4. Bölüm: Adaptasyon",
        hikmetliTitle: "Adaptasyon: Canlıların Yaşam Sahnesine Tam Uyumlu Donatılması",
        shortDesc: "Canlıların yaşama ve üreme şansını artıran kalıtsal uyumlar; kamuflaj, taklit, kutup ve çöl canlılarının tefekkürü.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1q0p9o8n7m6l5k4_adaptasyon.jpg",
        fenConcept: "Bir canlının belirli bir çevrede yaşama ve üreme şansını artıran kalıtsal özelliklerin tamamına adaptasyon denir. Adaptasyonlar nesilden nesile aktarılır. Örnekler: Devenin hörgücünde yağ depolaması, uzun kirpikleri ve geniş tabanları; kutup ayısının beyaz kürkü, geniş ayakları ve kalın yağ tabakası; kaktüsün yapraklarının dikene dönüşmesi ve gövdesinde su depolaması; bukalemunun kamuflajı.",
        tefekkurInsight: "Çölde yaşayan devenin kum fırtınasına karşı kapanabilen burun delikleri ve kızgın kumda batmayan tabanları ile donatılması; her canlının gönderildiği ortama göre özel bir şefkat ve ilimle techiz edildiğini gösterir.",
        tableRows: [
          ["Kutup ayısının beyaz kürkü ve kalın yağ tabakası", "Buzulların dondurucu ortamında yaşayabilmesi için verilen özel donanım", "Kutup ayısı kutba uygun paltosunu kendi kendine dikemez."],
          ["Bukalemunun bulunduğu zeminin rengine bürünmesi (kamuflaj)", "Avcılardan korunması için cildine yerleştirilen renk değiştiren kristaller", "Kimya ve optik harikası bir ilahî savunma zırhı."],
          ["Kaktüslerin su kaybetmemek için yapraklarını dikene çevirmesi", "Kavurucu çölde susuzluğa sabır ve iktisat nizamı", "Her canlı coğrafyasına göre rahmetle teçhiz edilmiştir."]
        ],
        conclusion: "Adaptasyonlar, Sanatkâr-ı Ezelî'nin hiçbir mahlûkunu çaresiz bırakmayıp her birini yaşadığı mekana tam uygun zırh ve silahlarla donattığının şahididir."
      }),
      makeChapter({
        id: "8-u2-c5-biyoteknoloji",
        title: "5. Bölüm: Biyoteknoloji",
        hikmetliTitle: "Biyoteknoloji: Genetik Kodların Keşfi ve Hikmetli Sorumluluk",
        shortDesc: "Genetik mühendisliği, biyoteknoloji uygulamaları (aşı, insülin üretimi, gen aktarımı, klonlama), biyoetik ve riskler.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0p9o8n7m6l5k4j3_biyoteknoloji.png",
        fenConcept: "Biyoteknoloji, canlı hücreleri veya organizmaları kullanarak insanlık yararına yeni ürünler (ilaç, aşı, gıda vb.) geliştirilmesidir. Genetik mühendisliği ise DNA üzerinde değişiklikler yapma teknolojisidir (gen aktarımı, gen tedavisi, klonlama, DNA parmak izi). Bakterilere insülin geni aktarılarak şeker hastaları için bol ve ucuz insülin üretilmesi en büyük faydalarındandır. GDO'lu ürünler ve ekolojik riskler biyoetik sınırları gerektirir.",
        tefekkurInsight: "İnsanın mikroskobik bakterilerin içine gen kodları yerleştirerek fabrikalar kurabilmesi; kainattaki hayat kodlarının tek bir yazılım diliyle yazıldığının ve insan aklına bu dili okuma anahtarının verildiğinin ispatıdır.",
        tableRows: [
          ["Bakterilere insan geni aktarılıp insülin ürettirilmesi", "Farklı canlıların aynı genetik kodu okuyabilmesi (evrensel genetik dil)", "Bütün canlıların Yaratıcısının tek olduğunun biyokimyasal delilidir."],
          ["Hastalıkların gen tedavisi ile iyileştirilmesi gayreti", "İnsanın ilimle tabiat eczanesini ve şifa yollarını keşfetmesi", "İlmin insanlığa merhamet ve hizmet vesilesi kılınması."],
          ["Fıtrata müdahale eden tehlikeli genetik oynamalar (GDO riski)", "İlahî dengeleri bozmanın felaket getireceği şuuru", "İlim ahlak ve hikmetle kontrol edilmezse insanlığa zehir olur."]
        ],
        conclusion: "Biyoteknoloji, Yaratıcının canlılara koyduğu muazzam genetik programı okuyup insanlığa fayda sağlama emaneti ve ahlakî imtihanıdır."
      })
    ]
  },
  {
    id: "8-u3-basinc",
    title: "3. Ünite: Basınç",
    chapters: [
      makeChapter({
        id: "8-u3-c1-basinc",
        title: "1. Bölüm: Basınç",
        hikmetliTitle: "Basınç: Katı, Sıvı ve Gazlardaki Kuvvetin Hassas Dengesi",
        shortDesc: "Katı basıncı (P = F/S), sıvı basıncı (P = h.d.g, Pascal Prensibi), gaz (açık hava) basıncı (Torriçelli deneyi).",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9o8n7m6l5k4j3i2_basinc.jpg",
        fenConcept: "Birim yüzeye dik etki eden kuvvete basınç denir (P). Katı basıncı ağırlıkla doğru, temas yüzey alanıyla ters orantılıdır (bıçakların bilenmesi, kar ayakkabıları). Sıvı basıncı derinlik (h) ve sıvının yoğunluğuna (d) bağlıdır; kabın şekline bağlı değildir. Sıvılar üzerlerine uygulanan basıncı her yöne aynen iletir (Pascal Prensibi: hidrolik frenler, berber koltukları). Açık hava basıncı Torriçelli tarafından cıva ile 76 cm-Hg olarak ölçülmüştür.",
        tefekkurInsight: "Üzerimize her an tonlarca ağırlığında hava tabakası basmasına rağmen iç kan basıncımızın bu açık hava basıncını tam olarak dengelemesi; bizi ezilmekten koruyan muazzam bir ilahî basınç mühendisliğidir.",
        tableRows: [
          ["Pascal Prensibi ile küçük bir kuvvetle dev kamyonların frenlenmesi", "Sıvıların sıkıştırılamama fıtratıyla insana sunulan muazzam kudret kolaylığı", "Sıvı zerrelerinin emre mutlak itaatiyle kuvvetin aynen iletilmesi."],
          ["Açık hava basıncı ile iç kan basıncımızın eşitliği", "Yeryüzü canlılarının atmosfer altında ezilmeden ve patlamadan yaşaması", "Uzaya çıkan astronotların özel basınç giysisi giymesi bu dengenin kıymetini gösterir."],
          ["Kar ayakkabılarının yüzeyi genişleterek batmayı engellemesi", "Fizik kanunlarının insan hayatında pratik kolaylıklara dönüşmesi", "Yüzey arttıkça basıncın azalması kanununa uygun yaratılış."]
        ],
        conclusion: "Katı, sıvı ve gaz basınç kanunları; kuvvetin ve maddelerin kainat sarayındaki ölçülü dengesini ve teknolojiye açılan kapılarını gösterir."
      })
    ]
  },
  {
    id: "8-u4-madde-ve-endustri",
    title: "4. Ünite: Madde ve Endüstri",
    chapters: [
      makeChapter({
        id: "8-u4-c1-periyodik-sistem",
        title: "1. Bölüm: Periyodik Sistem",
        hikmetliTitle: "Periyodik Sistem: Elementlerin Tabiat Sarayındaki Düzenli Kataloğu",
        shortDesc: "Moseley, Mendeleyev; periyotlar ve gruplar; metaller, ametaller, yarı metaller ve soygazlar.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8n7m6l5k4j3i2h1_periyodik-tablo.png",
        fenConcept: "Elementlerin artan atom numaralarına (proton sayılarına) göre sıralandığı tabloya periyodik sistem denir. Yatay sıralara periyot (7 periyot), düşey sütunlara grup (18 grup: 8 tane A, 10 tane B grubu) denir. Elementler metaller (parlak, iletken, tel/levha olur), ametaller (mat, yalıtkan, kırılgandır), yarı metaller ve soygazlar (kararlı, 8A grubu) olarak sınıflandırılır.",
        tefekkurInsight: "Elementlerin artan proton sayılarına göre dizildiğinde benzer kimyasal özelliklerin periyodik olarak tekrarlanması; maddenin rastgele bir yığın değil, muazzam bir matematiksel çizelgeye göre inşa edildiğini haykırır.",
        tableRows: [
          ["Elementlerin belirli periyotlarla benzer özellikler sergilemesi", "Maddenin temel taşlarındaki şaşmaz müzikal ahenk ve nizam", "Tesadüf bu kadar kusursuz bir periyodik tablo meydana getiremez."],
          ["Metaller ile ametallerin zıt özelliklerle birbirini tamamlaması", "Kimyasal bağların ve hayat için gerekli bileşiklerin kurulması", "Zıtların ahenkli ittifakı."],
          ["Soygazların asaleti ve kararlılığı", "Tabiatta aşırı reaktif olanların yanında sükuneti temsil eden elementler", "Her sınıf elementin kendine has fıtri bir vazifesi vardır."]
        ],
        conclusion: "Periyodik sistem, kainat kütüphanesindeki element kitaplarının harika bir fihristi ve ilahî nizamın kimyadaki tablosudur."
      }),
      makeChapter({
        id: "8-u4-c2-fiziksel-ve-kimyasal-degisimler",
        title: "2. Bölüm: Fiziksel ve Kimyasal Değişimler",
        hikmetliTitle: "Fiziksel ve Kimyasal Değişimler: Maddenin Suret ve Öz Değişimlerindeki Sanat",
        shortDesc: "Sadece dış görünüşün değiştiği fiziksel değişimler ile maddenin kimliğinin değiştiği kimyasal değişimler.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7m6l5k4j3i2h1g0_fiziksel-kimyasal.jpg",
        fenConcept: "Maddenin sadece dış görünüşünde (şekil, hâl, boyut) meydana gelen ve yeni madde oluşmayan değişimlere fiziksel değişim denir (yırtılma, kırılma, erime, buharlaşma, çözünme). Maddenin hem iç yapısının (kimliğinin) hem dış görünüşünün değiştiği, yeni maddelerin oluştuğu değişimlere kimyasal değişim denir (yanma, paslanma, çürüme, mayalanma, pişme).",
        tefekkurInsight: "Demirin paslanırken veya odunun yanarken bambaşka bir kimliğe bürünmesi; atomların bağlarının kopup yepyeni nizamlarla birbirine bağlanması sanatıdır.",
        tableRows: [
          ["Buzun eriyip suya dönüştüğünde kimliğini koruması (fiziksel)", "Maddenin fıtratının ve hakikatinin muhafaza edilmesi lütfu", "Suyun molekül yapısı bozulmaz, yeniden buz olabilir."],
          ["Sütün mayalanıp yoğurt veya peynire dönüşmesi (kimyasal)", "Bakteriler eliyle sütün bambaşka şifalı gıdalara tebdil edilmesi", "Ölü kimyasal maddelerden canlılara rızık pişirilmesi."],
          ["Elmanın çürümesi veya demirin paslanması", "Varlıkların ebedi olmadığını, fani dünyaya ait olduklarını hatırlatan ikaz", "Her şey eskir ve değişir; Baki olan yalnız Sanatkârdır."]
        ],
        conclusion: "Fiziksel ve kimyasal değişimler, maddenin suret ve cevherindeki ilahî tasarruf ve terbiyenin her an süren hareketleridir."
      }),
      makeChapter({
        id: "8-u4-c3-kimyasal-tepkimeler",
        title: "3. Bölüm: Kimyasal Tepkimeler",
        hikmetliTitle: "Kimyasal Tepkimeler: Atomların Yeniden Düzenlenmesindeki Kudret Mührü",
        shortDesc: "Tepkimeye girenler, ürünler; kütlenin korunumu kanunu (Lavoisier), atom türü ve sayısının korunması.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6m6l5k4j3i2h1g0_kimyasal-tepkime.png",
        fenConcept: "Maddelerin kimyasal değişime uğrayarak yeni maddeler oluşturması sürecine kimyasal tepkime denir (Girenler → Ürünler). Kimyasal tepkimelerde atomların bağları kopar ve yeni bağlar oluşur. Kimyasal tepkimelerde: Toplam kütle, atom sayısı, atom cinsi, toplam proton, nötron ve elektron sayısı daima korunur. Molekül sayısı ve hacim değişebilir.",
        tefekkurInsight: "Bir kimyasal tepkimede giren atomların tek bir tanesinin bile kaybolmaması, tartıda gramı gramına kütlenin korunması; kainattaki mutlak adalet ve iktisat terazisini ispatlar.",
        tableRows: [
          ["Kütlenin Korunumu Kanunu (Lavoisier)", "Kainatta hiçbir zerrenin yok olmadığını gösteren adalet terazisi", "Kudret eliyle yaratılan hiçbir varlık izinsiz yokluğa gidemez."],
          ["Atomların yok olmayıp sadece yeniden düzenlenmesi", "Kainatın aynı yapı taşlarıyla her an yeniden inşa edilmesi", "Eski binaların tuğlalarıyla yepyeni saraylar inşa etmek gibi."],
          ["Yanma tepkimelerinde oksijenin vazifelendirilmesi", "Enerji çıkışının kontrollü ve hayatı destekleyecek şekilde olması", "Yanma kanunu olmasaydı enerji santralleri ve motorlar çalışamazdı."]
        ],
        conclusion: "Kimyasal tepkimeler, atomların yok olmadan yepyeni nakışlarla bir araya gelerek kainatı tazelediği ilahî tezgâhlardır."
      }),
      makeChapter({
        id: "8-u4-c4-asitler-ve-bazlar",
        title: "4. Bölüm: Asitler ve Bazlar",
        hikmetliTitle: "Asitler ve Bazlar: pH Dengesi ve Eşyadaki Zıtların Uyumu",
        shortDesc: "Asitler (ekşi, H+ iyonu, pH < 7), bazlar (acı, OH- iyonu, pH > 7), belirteçler, nötralleşme tepkimesi ve asit yağmurları.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5l4k3j2i1h0g9f8_asit-baz.jpg",
        fenConcept: "Sulu çözeltilerine H+ (hidrojen) iyonu veren maddelere asit (limon, sirke, HCl, pH 0-7), OH- (hidroksit) iyonu verenlere baz (sabun, çamaşır suyu, NaOH, pH 7-14) denir. Asitler turnusolu kırmızıya, bazlar maviye çevirir. Asit ile baz tepkimeye girerek tuz ve su oluşturur (nötralleşme). Fosil yakıtlardan çıkan SO2 ve NO2 gazları havadaki su buharıyla birleşerek asit yağmurlarına sebep olur.",
        tefekkurInsight: "Bedenimizdeki kanın pH değerinin 7.35 ile 7.45 arasında milimetrik olarak sabit tutulması; 0.1 puanlık bir sapmanın bile ölüme yol açtığı düşünüldüğünde, hayatımızın ne kadar hassas bir dengede yaşatıldığını gösterir.",
        tableRows: [
          ["Midedeki asit (HCl) ile pankreastaki bazik salgının dengesi", "Beden sarayındaki kimyasal zıtların birbirini nötrleyerek koruması", "Yakıcı asit ile baz birleşerek hayat suyu ve tuzu meydana getirir."],
          ["Kanın pH'ının 7.4'te sabit tutulması (tampon sistemler)", "Hayatın sürdürülmesi için takdir edilmiş en hassas kimyasal mizan", "Rastgelelik bu kadar dar bir aralıkta denge kuramaz."],
          ["Asit yağmurlarının tabiata verdiği zarar", "İnsanın kirlettiği havanın tabiata asit olarak geri dönmesi", "Kainattaki temizlik kanununu bozanın kendi hayatına zarar vermesi."]
        ],
        conclusion: "Asitler ve bazlar, zıt kutupların dengeli birleşimiyle canlılığın kimyasını kuran ilahî bir mizan ve şifa vesilesidir."
      }),
      makeChapter({
        id: "8-u4-c5-maddenin-isi-ile-etkilesimi",
        title: "5. Bölüm: Maddenin Isı ile Etkileşimi",
        hikmetliTitle: "Maddenin Isı ile Etkileşimi: Özgül Isının Hayatı Koruyan Mucizesi",
        shortDesc: "Öz ısı (c), ısı alışverişi formülü (Q = m.c.ΔT), hâl değiştirme ısısı ve denizlerin iklimi ılımanlaştırması.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4k3j2i1h0g9f8e7_oz-isi.png",
        fenConcept: "1 gram saf maddenin sıcaklığını 1°C artırmak için gerekli ısı miktarına öz ısı (c) denir. Saf maddeler için ayırt edici özelliktir. Öz ısısı küçük olan maddeler çabuk ısınır, çabuk soğur; öz ısısı büyük olan maddeler geç ısınır, geç soğur. Suyun öz ısısı (4.18 J/g°C) karalardan çok büyüktür. Bu sebeple denizler geç ısınıp geç soğuyarak kıyı bölgelerin iklimini ılımanlaştırır.",
        tefekkurInsight: "Suyun özgül ısısının olağanüstü yüksek takdir edilmesi; denizlerin devasa birer termal akü gibi yazın sıcağı emip kışın yayarak kıtaları dondurucu soğuktan koruyan bir ilahî klima olmasını sağlamıştır.",
        tableRows: [
          ["Suyun öz ısısının metallerden ve topraktan kat kat yüksek olması", "Yeryüzü ikliminin aşırı sıcak ve soğuktan korunması", "Su çabuk soğusaydı kışın denizler anında donar, kıtalar buz keserdi."],
          ["Canlı vücudunun %70'inin su olması", "Beden sıcaklığımızın çevre şartlarından aniden etkilenmesini önleyen kalkan", "Vücudumuzdaki su, biyolojik dengemizin emniyet sigortasıdır."],
          ["Güneş alan kumluk plajın hemen ısınıp denizin serin kalması", "Aynı Güneş altında farklı fıtratların hikmetle tecelli etmesi", "Yaratılıştaki çeşitliliğin insan hayatına serinlik ve neşe sunması."]
        ],
        conclusion: "Öz ısı kanunu, suyun ve maddelerin içine gizlenmiş şefkatli bir termal denge ve iklim muhafızıdır."
      }),
      makeChapter({
        id: "8-u4-c6-turkiyede-kimya-endustrisi",
        title: "6. Bölüm: Türkiye'de Kimya Endüstrisi",
        hikmetliTitle: "Kimya Endüstrisi ve İlim: Hammaddelerin Hikmetle İşlenmesi",
        shortDesc: "Kimya sektörünün ithalat/ihracatı, bor madeni, petrol rafinerileri, ilaç ve gübre sanayii ve meslek alanları.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3j2i1h0g9f8e7d6_turkiye-kimya.jpg",
        fenConcept: "Kimya endüstrisi diğer tüm sanayi kollarına (tekstil, otomotiv, inşaat, tarım, sağlık) hammadde ve yarı mamul sağlayan öncü sektördür. Türkiye'de petrokimya, gübre, ilaç, sabun ve boya sanayii gelişmiştir. Dünya bor rezervlerinin %73'ü Türkiye'dedir. Kimya mühendisliği, kimyagerlik, biyokimya ve laborantlık bu alandaki temel mesleklerdir.",
        tefekkurInsight: "Toprağın altındaki bor ve petrol gibi madenlerin milyonlarca yıl önceden depolanıp bugünkü insanın sanayisine sunulması; yeryüzü deposunu zengin nimetlerle donatan Rezzak-ı Kerîm'in ikramıdır.",
        tableRows: [
          ["Dünya bor madeninin %73'ünün vatanımıza lütfedilmesi", "Milletimize emanet edilmiş paha biçilmez bir ikram ve kalkınma fırsatı", "Bu madeni ilim ve ahlakla işleyip insanlığa faydalı kılmak mesuliyettir."],
          ["Kimya ilminin hammaddeyi faydalı ilaç ve malzemelere dönüştürmesi", "İnsanın Allah'ın yarattığı kanunları kullanarak eser üretmesi", "İlim, yaratılmış hazinelerin kilidini açan anahtardır."],
          ["Kimyasal atıkların çevreye zarar vermeden bertaraf edilmesi zorunluluğu", "Sanayileşirken tabiat emanetini kirletmeme ahlakı", "İktisat ve helal kazanç şuuru sanayide de esastır."]
        ],
        conclusion: "Kimya endüstrisi, yeryüzünün zenginliklerini ilim ve hikmetle işleyip insanlığa refah ve şifa sunma sahasıdır."
      })
    ]
  },
  {
    id: "8-u5-basit-makineler",
    title: "5. Ünite: Basit Makineler",
    chapters: [
      makeChapter({
        id: "8-u5-c1-basit-makineler",
        title: "1. Bölüm: Basit Makineler",
        hikmetliTitle: "Basit Makineler: Kuvvetten Kazanç ve İnsana Sunulan İlahî Kolaylıklar",
        shortDesc: "Kaldıraçlar, makaralar (sabit, hareketli, palanga), eğik düzlem, çıkrık, dişli çarklar, vida; işten ve enerjiden kazanç olmaması kuralı.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2i1h0g9f8e7d6c5_basit-makineler.png",
        fenConcept: "Günlük hayatta iş yapma kolaylığı sağlayan düzeneklere basit makine denir. Hiçbir basit makinede işten veya enerjiden kazanç sağlanamaz! Kuvvetten kazanç varsa aynı oranda yoldan kayıp vardır (Kuvvet Kazancı = Yük / Kuvvet). Kaldıraçlar (desteğin, yükün, kuvvetin ortada olduğu), makaralar (sabit makara sadece yön değiştirir; hareketli makara kuvvetten 2 kat kazanç sağlar), eğik düzlem, çıkrık ve dişliler temel basit makinelerdir.",
        tefekkurInsight: "Basit makinelerde kuvvetten kazanç sağlarken yoldan kaybettirilmesi; kainattaki mutlak adalet kanununu fısıldar: Bedelsiz hiçbir kazanç yoktur, her kolaylığın bir dengesi ve karşılığı vardır.",
        tableRows: [
          ["Hiçbir makinede işten veya enerjiden kazanç olmaması", "Kainatta 'bedava enerji' veya yoktan var etme imkanının olmaması", "Yaratmak ve enerji bahşetmek sadece Yüce Yaratıcı'ya mahsustur."],
          ["Hareketli makarada yarı kuvvetle ağır yüklerin kaldırılması", "İnsanın zayıf pazusuna akıl ve ilimle kuvvet verilmesi ikramı", "İnsan ilmi sayesinde dağları yerinden oynatacak makinalar kurar."],
          ["Çıkrık ve eğik düzlemin insanlık tarihi boyunca kullanılması", "Fizik kanunlarının insan medeniyetine temel taş kılınması", "Eşyaya konulan kurallar insanın hayatını kolaylaştırmak içindir."]
        ],
        conclusion: "Basit makineler, kainatın şaşmaz mekanik prensiplerini kullanarak insanın işlerini kolaylaştıran ilahî akıl ve هندese sofralarıdır."
      })
    ]
  },
  {
    id: "8-u6-enerji-donusumleri-ve-cevre-bilimi",
    title: "6. Ünite: Enerji Dönüşümleri ve Çevre Bilimi",
    chapters: [
      makeChapter({
        id: "8-u6-c1-besin-zinciri-ve-enerji-akisi",
        title: "1. Bölüm: Besin Zinciri ve Enerji Akışı",
        hikmetliTitle: "Besin Zinciri: Fotosentezden Canlılara Akan İlahî Rızık Enerjisi",
        shortDesc: "Üreticiler, tüketiciler (otçul, etçil, hepsiçil), ayrıştırıcılar, besin ağı ve biyolojik birikim.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1i0h9f8e7d6c5b4_besin-agi.jpg",
        fenConcept: "Canlılar yaşamlarını sürdürebilmek için enerjiye ihtiyaç duyarlar ve bu enerjiyi besinlerden karşılarlar. Canlılar arasındaki beslenme ilişkilerini gösteren halkalara besin zinciri, birbiri içine geçmiş zincirlere besin ağı denir. Üreticiler (bitkiler, siyanobakteriler), tüketiciler (otçullar, etçiller) ve her basamakta görev yapan ayrıştırıcılar ekolojik dengeyi kurar.",
        tefekkurInsight: "Hiçbir canlının açlıktan toptan yok olmadan, milyarlarca yıldır trilyonlarca mahlukun rızkının mükemmel bir zamanlama ile ulaştırılması; Rezzak-ı Mutlak'ın umumi ziyafet sofrasını sergiler.",
        tableRows: [
          ["Güneş enerjisinin kimyasal bağ enerjisine çevrilip canlılara aktarılması", "Gökten inen nurun ekmek ve ete dönüşme serüveni", "Şuursuz Güneş ve bitkiler insanın rızkını düşünüp çalışamaz."],
          ["Ayrıştırıcıların toprağı temizleyip mineralleri bitkiye geri vermesi", "Kusursuz ilahî geri dönüşüm fabrikası", "Ayrıştırıcılar olmasaydı yeryüzü kısa sürede çöplüğe dönerdi."],
          ["Besin ağındaki tek bir türün yok olmasının tüm zinciri sarsması", "Kainattaki tevhid ve bütünlük mührü", "Her canlı diğer canlılarla görünmez rahmet ipleriyle bağlıdır."]
        ],
        conclusion: "Besin zinciri, yeryüzü misafirhanesinde hiçbir canlının unutulmadığı muazzam bir ilahî iaşe ve rızık nizamıdır."
      }),
      makeChapter({
        id: "8-u6-c2-enerji-donusumleri",
        title: "2. Bölüm: Enerji Dönüşümleri",
        hikmetliTitle: "Fotosentez ve Solunum: Kainatın İki Yönlü Soluk Alıp Verişi",
        shortDesc: "Fotosentez denklemi (CO2 + H2O + Işık → Glikoz + O2), klorofil; oksijenli ve oksijensiz solunum, fermantasyon.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg0i0h9f8e7d6c5b4a3_fotosentez-solunum.png",
        fenConcept: "Klorofil taşıyan canlıların ışık enerjisini kullanarak su ve karbondioksitten besin (glikoz) ve oksijen üretmesine fotosentez denir (Işık şiddeti, CO2 miktarı, su ve sıcaklığa bağlıdır). Canlıların besinleri parçalayarak ATP enerjisi üretmesine solunum denir. Fotosentez ve solunum birbirinin tersi iki muazzam kimyasal fabrikadır: Fotosentez gündüz oksijen üretirken, solunum gece gündüz bu oksijeni tüketir.",
        tefekkurInsight: "Bitkilerin gündüzleri karbondioksiti yutup canlılara hayat veren oksijeni salması; hayvanların ve insanların ise oksijeni alıp bitkilere karbondioksit üflemesi; iki alemin birbirine adeta nefes vererek yaşatıldığı harika bir yardımlaşma tablosudur.",
        tableRows: [
          ["Fotosentezin yeşil yaprakta kimya mühendislerini hayran bırakan teknolojisi", "Güneş ışığının şekere dönüştürüldüğü mikroskobik ilahî laboratuvar", "İnsanoğlu henüz yapay bir yaprak kadar verimli fotosentez yapamamıştır."],
          ["Fotosentez ile solunum arasındaki kusursuz gaz dengesi", "Atmosferdeki %21 oksijen ve %0.04 karbondioksit oranının korunması", "Denge bozulsaydı birkaç asırda atmosfer zehirli bir gaza dönerdi."],
          ["Solunumda glikozun mitokondride yakılarak ATP enerjisi üretilmesi", "Beden sarayındaki her hücrenin kendi yakıtını tıkır tıkır yakması", "Hücresel enerji üretimi hayret verici bir biyomühendisliktir."]
        ],
        conclusion: "Fotosentez ve solunum, yeryüzünün ciğerleri ile canlıların nefesini birbirine bağlayan ilahî bir hayat döngüsüdür."
      }),
      makeChapter({
        id: "8-u6-c3-madde-donguleri-ve-cevre-sorunlari",
        title: "3. Bölüm: Madde Döngüleri ve Çevre Sorunları",
        hikmetliTitle: "Madde Döngüleri: Su, Karbon, Azot ve Oksijenin Sonsuz İlahî Devranı",
        shortDesc: "Su döngüsü, karbon döngüsü, azot döngüsü, oksijen döngüsü; ozon tabakasının incelmesi ve küresel ısınma.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh9h8g7f6e5d4c3b2_madde-donguleri.jpg",
        fenConcept: "Canlılar için gerekli maddelerin (su, karbon, oksijen, azot) canlı ve cansız çevre arasında sürekli dolaşmasına madde döngüsü denir. Azot döngüsünde şimşek, yıldırım ve baklagil köklerindeki azot bağlayıcı bakteriler gaz halindeki azotu toprağa bağlar. Fosil yakıtların aşırı tüketimi karbon döngüsünü bozarak küresel ısınmaya yol açar. Kloroflorokarbon (CFC) gazları Güneş'in zararlı UV ışınlarını süzen ozon tabakasını inceltir.",
        tefekkurInsight: "Bugün içtiğimiz bir bardak suyun, binlerce yıl önce yaşamış insanların içtiği ve gökyüzüne buharlaşıp arıtılarak bize geri döndürülen suyla aynı olması; kainattaki tükenmez temizlik ve sonsuz döngü mucizesidir.",
        tableRows: [
          ["Yıldırım ve şimşeklerin havadaki azotu toprağa gübre olarak indirmesi", "Korkutucu gök gürültüsünün arkasında saklı şefkatli bir ilahî tarım faaliyeti", "Gök gürlemesi bile yeryüzü ekinlerine azot ikram etmektedir."],
          ["Ozon tabakasının (O3) zararlı ultraviyole ışınlarını süzmesi", "Yeryüzü canlılarını radyasyondan koruyan göksel bir güneş gözlüğü ve tavan", "Ozon kalkanı olmasaydı yeryüzünde canlı dokular kavrulurdu."],
          ["Su döngüsüyle tuzlu denizlerin tatlı yağmur sularına tebdili", "Güneş ve bulutların çalıştırıldığı devasa buharlaşma ve arıtma tesisi", "Deniz suyu buharlaşırken tuzu bırakır; semadan şifa suyu iner."]
        ],
        conclusion: "Madde döngüleri, yeryüzü sarayının kaynaklarının tükenmeden milyonlarca yıldır tazelenmesini sağlayan ilahî iktisat ve intizam çarklarıdır."
      }),
      makeChapter({
        id: "8-u6-c4-surdurulebilir-kalkinma",
        title: "4. Bölüm: Sürdürülebilir Kalkınma",
        hikmetliTitle: "Sürdürülebilir Kalkınma: Gelecek Nesillere Temiz Bir Kainat Emaneti",
        shortDesc: "Kaynakların tasarruflu kullanımı, katı atık yönetimi, geri dönüşüm, temiz teknoloji ve gelecek nesillerin hakkı.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8g7f6e5d4c3b2a1_surdurulebilir-kalkinma.png",
        fenConcept: "Doğal kaynakların bugünün ihtiyaçlarını karşılarken gelecek nesillerin de haklarını gözeterek tasarruflu kullanılmasına sürdürülebilir kalkınma denir. Katı atıkların kaynağında ayrıştırılması, geri dönüşüm (cam, kağıt, metal, plastik) ve tekrar kullanım temel ilkelerdir. Yenilenebilir enerji kullanımı ve enerji tasarrufu sürdürülebilirliğin anahtarıdır.",
        tefekkurInsight: "Kainatın Yaratıcısı yarattığı mülkte hiçbir zerreyi israf etmezken; insanın doyumsuz hırsıyla tabiatı kirletip kaynakları tüketmesi emanete açık bir hıyanettir. İktisat ve tasarruf, yaratılış nizamına uymanın adıdır.",
        tableRows: [
          ["Geri dönüşüm ile tabii kaynakların korunması", "İlahî iktisat ve İsmi Hakîm tecellisine insanın fiili itaati", "Bir ton plastiğin geri kazanılması varillerce petrolü kurtarır."],
          ["Enerji tasarrufu ve A+++ cihazların kullanımı", "Nimetlerin kıymetini bilip israf etmeme ahlakı", "Tasarruf eden darlık çekmez, bereket bulur."],
          ["Gelecek nesillerin temiz hava ve su hakkına hürmet", "Kul hakkı ve çevre mesuliyetinin birleştiği ahlakî zirve", "Tabiat bize atalarımızdan miras değil, çocuklarımızdan emanettir."]
        ],
        conclusion: "Sürdürülebilir kalkınma, fıtrata ve kainattaki ilahî iktisat kanununa saygı duyarak yeryüzü emanetini geleceğe taşımaktır."
      })
    ]
  },
  {
    id: "8-u7-elektrik-yukleri-ve-elektrik-enerjisi",
    title: "7. Ünite: Elektrik Yükleri ve Elektrik Enerjisi",
    chapters: [
      makeChapter({
        id: "8-u7-c1-elektrik-yukleri-ve-elektriklenme",
        title: "1. Bölüm: Elektrik Yükleri ve Elektriklenme",
        hikmetliTitle: "Elektrik Yükleri ve Yıldırım: Gökyüzü Kıvılcımlarının İntizamlı Deşarjı",
        shortDesc: "Statik elektrik, sürtünme/dokunma/etki ile elektriklenme, şimşek, yıldırım ve paratonerlerin hikmeti.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7g6f5e4d3c2b1_simsek-yildirim.jpg",
        fenConcept: "Maddeler proton ve elektron dengesine göre pozitif, negatif veya nötr olurlar. Aynı yükler iter, zıt yükler çeker. İki bulut arasındaki elektriksel boşalmaya şimşek, bulut ile yer arasındaki elektriksel boşalmaya yıldırım denir. Yıldırımın binalara zarar vermeden toprağa aktarılması için paratoner (yıldırımsavar) kullanılır.",
        tefekkurInsight: "Gök kubbede binlerce voltluk elektrik yükü taşıyan devasa bulutların gürlemesi ve yıldırımların çakması; hem Yaratıcının sonsuz celal ve kudretini hatırlatır, hem de toprağa azot bağlayan bir rahmet vesilesidir.",
        tableRows: [
          ["Yıldırımın toprağa düşerken azotu gübre yapması", "Korkutan şimşeğin arkasında gizli şefkat ve rızık bereketi", "Celal içinde cemal tecellisinin açık bir tablosu."],
          ["Paratoner ile yıldırımın emniyetle toprağa akıtılması", "İnsana verilen aklın tabiat kuvvetlerinden korunma vesilesi olması", "Fizik kanunlarını bilmek emniyet getirir."],
          ["Statik elektriğin otomobil boyamada ve baca filtrelerinde kullanılması", "Küçücük bir elektrik yükünün endüstriyel temizlikte istihdamı", "Kainatta hiçbir özellik amaçsız yaratılmamıştır."]
        ],
        conclusion: "Elektrik yükleri ve yıldırım hadiseleri; gökyüzünün celalli kudretini ilan ederken yeryüzünü rahmetle sulayan ilahî nizamın parçalarıdır."
      }),
      makeChapter({
        id: "8-u7-c2-elektrik-yuklu-cisimler",
        title: "2. Bölüm: Elektrik Yüklü Cisimler",
        hikmetliTitle: "Elektrik Yüklü Cisimler ve Elektroskop: Görünmeyen Kuvvetin İspatı",
        shortDesc: "Elektroskop, yaprakların açılması/kapanması, iletken ve yalıtkanlarda yük dağılımı ve topraklama prensibi.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg6f5e4d3c2b1a0_elektroskop.png",
        fenConcept: "Bir cismin yüklü olup olmadığını, yüklü ise hangi cins yükle (+ veya -) yüklü olduğunu anlamaya yarayan araca elektroskop denir. Nötr elektroskobun yaprakları kapalıdır. Yüklü cisim dokundurulduğunda veya yaklaştırıldığında yapraklar aynı yükle yüklenerek birbirini iter ve açılır. İletken kürelerde yükler daima en dış yüzeyde homojen olarak dağılır (Faraday Kafesi).",
        tefekkurInsight: "Gözümüzle göremediğimiz elektronların varlığını ve hareketini küçücük bir elektroskobun altın yapraklarının açılıp kapanmasıyla kesin olarak bilmemiz; görünmeyen hakikatlerin eserleriyle tanınabileceğini ispatlar.",
        tableRows: [
          ["Elektroskobun yapraklarının itme kuvvetiyle açılması", "Görünmeyen zerrelerin görünür fiziksel neticeler doğurması", "Gözle görmediğimiz kuvvetlerin varlığına şüphe bırakmaz."],
          ["Faraday Kafesi ile yıldırım düşen uçağın içindekilerin zarar görmemesi", "Yüklerin dış yüzeyde toplanması kanunuyla sağlanan ilahî emniyet zırhı", "Fiziksel kanunlar insanı tehlikelerden koruyan kalkan olur."],
          ["Topraklama ile yük dengesinin sıfırlanması", "Toprağın yeryüzündeki bütün elektriksel aşırılıkları yutan sabırlı haznesi", "Yeryüzü her manada canlılara sükunetgah kılınmıştır."]
        ],
        conclusion: "Elektroskop ve yüklü cisimler, görünmeyen mikro kuvvetlerin varlığını ve adaletli dağılımını gözler önüne seren optik ve mekanik şahitlerdir."
      }),
      makeChapter({
        id: "8-u7-c3-elektrik-enerjisinin-donusumu",
        title: "3. Bölüm: Elektrik Enerjisinin Dönüşümü",
        hikmetliTitle: "Elektrik Enerjisinin Dönüşümü: Işığa, Harekete ve Isıya Dönen Kudret",
        shortDesc: "Elektrik enerjisinin ısıya (ütü, fırın), ışığa (ampul, LED), harekete (elektrik motoru) dönüşümü; güç (Watt), sigorta ve güvenlik.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5e4d3c2b1a0z9_enerji-donusumu.jpg",
        fenConcept: "Elektrik enerjisi; elektrikli sobalarda ve ütülerde ısı enerjisine, ampul ve LED'lerde ışık enerjisine, elektrik motorlarında (vantilatör, mikser, çamaşır makinesi) mekanik/hareket enerjisine dönüştürülür. Tersi olarak jeneratörler ve dinamolar hareket enerjisini elektriğe dönüştürür. Elektrik gücü Watt ile ölçülür (E = P . t). Elektrik devrelerinde aşırı akımı keserek yangınları önleyen emniyet elemanına sigorta denir.",
        tefekkurInsight: "Tek bir prizden çıkan aynı elektrik akımının; buzdolabına girdiğinde soğuk, fırına girdiğinde sıcaklık, ampule girdiğinde nur, motora girdiğinde hareket üretmesi; tek bir kudretin binbir çeşit hikmetle tecelli edişinin harika bir numunesidir.",
        tableRows: [
          ["Aynı elektriğin fırında ateşe, buzdolabında buza dönüşmesi", "Tek bir kaynaktan zıt ve çeşitli neticelerin hikmetle yaratılması", "Su aynı toprağa girip şekere, acı bibere ve güle döner; elektrik de öyledir."],
          ["LED lambaların akkor ampullere göre %90 daha az enerjiyle ışık saçması", "Kainattaki iktisat kanununa uygun teknolojinin insana lütfedilmesi", "Ateşsiz ve kayıpsız nurlu aydınlanma nimeti."],
          ["Sigortanın tehlike anında eriyerek devreyi kesmesi", "Bedenimizdeki refleksler gibi binaları koruyan akıllı emniyet supapları", "Kudret kanunları daima emniyet ve denge üzerine kuruludur."]
        ],
        conclusion: "Elektrik enerjisinin dönüşümleri, tek bir ilahî kaynaktan çıkan enerjinin insanlığın binlerce farklı ihtiyacına şefkatle cevap verişidir."
      })
    ]
  }
];

console.log("Grade 8 units built successfully with total chapters:", grade8Units.reduce((a, b) => a + b.chapters.length, 0));

fs.writeFileSync(
  path.join(curriculumDir, "grade8.ts"),
  `import { Grade } from '../grades';\n\nexport const GRADE_8_CURRICULUM: Grade = {\n  id: "8",\n  name: "8. Sınıf",\n  description: "Türkiye Yüzyılı Maarif Modeli ve Fenbilim.net müfredatına göre hazırlanmış 7 ünite ve 22 alt konu başlığında Hikmetli Fen tefekkür okumaları.",\n  units: ${JSON.stringify(grade8Units, null, 2)}\n};\n`
);
console.log("grade8.ts written!");
