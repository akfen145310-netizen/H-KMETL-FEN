import React from 'react';
import { 
  Sun, 
  Moon, 
  Globe, 
  Atom, 
  Compass, 
  Zap, 
  Leaf, 
  Heart, 
  Eye, 
  Layers, 
  Activity, 
  Sparkles,
  Search,
  Scale
} from 'lucide-react';

interface TopicIllustrationProps {
  topicId?: string;
  title?: string;
}

export const TopicIllustration: React.FC<TopicIllustrationProps> = ({ topicId = '', title = '' }) => {
  const s = (topicId + ' ' + title).toLowerCase();

  // 1. ASTRONOMY: Güneş
  if (/gunes(?!.*tutulma)/.test(s)) {
    return (
      <div className="w-full bg-linear-to-br from-amber-950 via-orange-900 to-stone-900 rounded-2xl p-6 text-white overflow-hidden shadow-inner border border-amber-500/30">
        <div className="flex items-center justify-between mb-4 border-b border-amber-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" />
            <span className="font-serif font-bold text-amber-200 text-lg">Güneş'in Yapısı ve İlahî Mizan</span>
          </div>
          <span className="text-3xs bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">
            Termonükleer Füzyon & İntizam
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <div className="col-span-1 flex justify-center py-2">
            <div className="relative w-44 h-44 rounded-full bg-radial from-yellow-300 via-amber-500 to-orange-700 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.5)] border-4 border-amber-200/40">
              <div className="w-24 h-24 rounded-full bg-yellow-100 flex items-center justify-center text-amber-950 font-bold text-xs text-center p-2 shadow-inner">
                Çekirdek<br/><span className="text-3xs font-mono font-normal">15.000.000°C</span>
              </div>
              <div className="absolute top-2 right-6 w-3 h-3 bg-stone-900/60 rounded-full blur-2xs" title="Güneş Lekesi" />
            </div>
          </div>
          <div className="col-span-2 space-y-2 text-xs text-amber-100/90">
            <div className="p-2.5 rounded-xl bg-black/30 border border-amber-500/20">
              <strong className="text-amber-300 block mb-0.5">1. Çekirdek & Işınım Katmanı:</strong>
              Hidrojen atomları helyuma dönüşerek her saniye 4 milyon ton kütleyi saf enerjiye çevirir; kainat sarayının sönmeyen ocağıdır.
            </div>
            <div className="p-2.5 rounded-xl bg-black/30 border border-amber-500/20">
              <strong className="text-amber-300 block mb-0.5">2. Işık Küre (Fotosfer) & Renk Küre:</strong>
              6.000°C sıcaklıkta yeryüzüne şefkatle süzülen görünür ışık; canlıların fotosentez ve görme ihtiyacına tam uygundur.
            </div>
            <div className="p-2.5 rounded-xl bg-black/30 border border-amber-500/20">
              <strong className="text-amber-300 block mb-0.5">3. Taç Küre (Korona):</strong>
              Güneş fırtınaları ve manyetik kalkanlarla Dünya'nın atmosferine ölçülü bir enerji akışı sunulur.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. ASTRONOMY: Ay ve Evreleri
  if (/ay(?!.*tutulma)/.test(s) && !/ayna/.test(s)) {
    return (
      <div className="w-full bg-linear-to-br from-slate-950 via-indigo-950 to-stone-900 rounded-2xl p-6 text-white overflow-hidden shadow-inner border border-indigo-500/30">
        <div className="flex items-center justify-between mb-4 border-b border-indigo-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Moon className="w-6 h-6 text-indigo-300" />
            <span className="font-serif font-bold text-indigo-200 text-lg">Ay'ın Evreleri ve Semavî Takvim</span>
          </div>
          <span className="text-3xs bg-indigo-400/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-400/30">
            29.5 Günlük Şaşmaz Döngü
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs py-2">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-stone-900 border-2 border-dashed border-stone-600 mb-2" />
            <span className="font-bold text-stone-300">Yeni Ay</span>
            <span className="text-3xs text-stone-400 mt-1">Karanlık yüz bize dönük</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-stone-900 border-2 border-indigo-300 relative overflow-hidden mb-2">
              <div className="absolute right-0 top-0 w-6 h-12 bg-amber-100 rounded-r-full" />
            </div>
            <span className="font-bold text-amber-200">İlk Dördün</span>
            <span className="text-3xs text-indigo-300/80 mt-1">"D" harfi şeklinde aydınlık</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 shadow-[0_0_20px_rgba(254,240,138,0.6)] mb-2" />
            <span className="font-bold text-amber-300">Dolunay</span>
            <span className="text-3xs text-amber-200/80 mt-1">Semada tam nur aynası</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-stone-900 border-2 border-indigo-300 relative overflow-hidden mb-2">
              <div className="absolute left-0 top-0 w-6 h-12 bg-amber-100 rounded-l-full" />
            </div>
            <span className="font-bold text-amber-200">Son Dördün</span>
            <span className="text-3xs text-indigo-300/80 mt-1">Ters "D" harfi görünümü</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. TUTULMALAR: Güneş & Ay Tutulması
  if (/tutulma/.test(s)) {
    return (
      <div className="w-full bg-linear-to-r from-stone-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-amber-500/20">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <span className="font-serif font-bold text-amber-200 text-lg">Semavî Hizalanma: Tutulma Modeli</span>
          </div>
          <span className="text-3xs bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">
            Işık, Gölge & Yörünge İntizamı
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white/5 rounded-xl border border-amber-500/20 space-y-2">
            <strong className="text-amber-300 text-sm block">Güneş Tutulması (Yeni Ay Evresi)</strong>
            <p className="text-stone-300">Sıralama: <strong>Güneş — Ay — Dünya</strong></p>
            <p className="text-stone-400">Ay'ın gölgesi Dünya üzerine düşer. Gündüz vakti Güneş dakikalarca örtülerek kainatın gerçek Sahibinin emir ve idaresi tefekkür edilir.</p>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-indigo-500/20 space-y-2">
            <strong className="text-indigo-300 text-sm block">Ay Tutulması (Dolunay Evresi)</strong>
            <p className="text-stone-300">Sıralama: <strong>Güneş — Dünya — Ay</strong></p>
            <p className="text-stone-400">Dünya'nın tam gölge konisi Ay'ın üzerine düşer. Ay kızıl/bakır bir renge bürünerek göklerin şaşmaz matematiğini ilan eder.</p>
          </div>
        </div>
      </div>
    );
  }

  // 4. MEVSİMLER & İKLİM (8. Sınıf)
  if (/mevsim|iklim/.test(s)) {
    return (
      <div className="w-full bg-linear-to-br from-sky-950 via-teal-950 to-stone-900 rounded-2xl p-6 text-white border border-teal-500/30">
        <div className="flex items-center justify-between mb-4 border-b border-teal-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-teal-400" />
            <span className="font-serif font-bold text-teal-200 text-lg">23°27' Eksen Eğikliği ve Dört Mevsim Rahmeti</span>
          </div>
          <span className="text-3xs bg-teal-400/20 text-teal-300 px-2.5 py-1 rounded-full border border-teal-400/30">
            Yıllık Dolanma & İnce Ayar
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs py-1">
          <div className="p-3 bg-white/5 rounded-xl border border-teal-500/20">
            <span className="text-amber-400 font-bold block mb-1">21 Haziran</span>
            <span className="text-stone-200 font-semibold block">Yaz Gündönümü</span>
            <span className="text-3xs text-stone-400">Kuzey'e dik ışınlar, en uzun gündüz</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-teal-500/20">
            <span className="text-emerald-400 font-bold block mb-1">23 Eylül</span>
            <span className="text-stone-200 font-semibold block">Sonbahar Ekinoksu</span>
            <span className="text-3xs text-stone-400">Gece = Gündüz eşitliği (12 saat)</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-teal-500/20">
            <span className="text-cyan-400 font-bold block mb-1">21 Aralık</span>
            <span className="text-stone-200 font-semibold block">Kış Gündönümü</span>
            <span className="text-3xs text-stone-400">Kuzey'e eğik ışınlar, en uzun gece</span>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-teal-500/20">
            <span className="text-pink-400 font-bold block mb-1">21 Mart</span>
            <span className="text-stone-200 font-semibold block">İlkbahar Ekinoksu</span>
            <span className="text-3xs text-stone-400">Tabiatın uyanışı ve adil denge</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. BİYOLOJİ: Hücre, DNA, Kalıtım
  if (/hucre|dna|genetik|kalitim|mitoz|mayoz/.test(s)) {
    return (
      <div className="w-full bg-linear-to-br from-emerald-950 via-teal-950 to-stone-900 rounded-2xl p-6 text-white border border-emerald-500/30">
        <div className="flex items-center justify-between mb-4 border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            <span className="font-serif font-bold text-emerald-200 text-lg">Mikroskobik Şehir: Hücre ve Genetik Kod</span>
          </div>
          <span className="text-3xs bg-emerald-400/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-400/30">
            Hayati Organeller & Şifreli Yazılım
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-emerald-500/20">
            <strong className="text-emerald-300 block mb-1">Çekirdek & DNA</strong>
            <p className="text-stone-300">Milyarlarca harflik hayat yazılımı (Adenin-Timin, Guanin-Sitozin) mikronluk hacme sığdırılmıştır.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-emerald-500/20">
            <strong className="text-amber-300 block mb-1">Mitokondri & Kloroplast</strong>
            <p className="text-stone-300">Canlılığın kesintisiz enerji santrali (ATP üretimi) ve fotosentez ile oksijen üreten fabrika tezgâhları.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-emerald-500/20">
            <strong className="text-teal-300 block mb-1">Hücre Zarı & Ribozom</strong>
            <p className="text-stone-300">Seçici geçirgen şuurlu gümrük kapısı ve protein sentezleyen mikroskobik robotik atölyeler.</p>
          </div>
        </div>
      </div>
    );
  }

  // 6. FİZİK: Kuvvet, Basınç, Basit Makineler, Enerji
  if (/kuvvet|basinc|makine|enerji|surat|dinamometre/.test(s)) {
    return (
      <div className="w-full bg-linear-to-br from-blue-950 via-indigo-950 to-stone-900 rounded-2xl p-6 text-white border border-blue-500/30">
        <div className="flex items-center justify-between mb-4 border-b border-blue-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-400" />
            <span className="font-serif font-bold text-blue-200 text-lg">Fizikî Kanunlar: Kuvvet, Basınç ve Denge</span>
          </div>
          <span className="text-3xs bg-blue-400/20 text-blue-300 px-2.5 py-1 rounded-full border border-blue-400/30">
            Mizan, Kaldıraç & Hassas Ölçü
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-blue-500/20">
            <strong className="text-cyan-300 block mb-1">Kuvvet ve Dinamometre</strong>
            <p className="text-stone-300">Yaylardaki esneklik kanunu (Hooke Yasası) ve Newton cinsinden hassas ölçüm terazisi.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-blue-500/20">
            <strong className="text-indigo-300 block mb-1">Katı & Sıvı Basıncı</strong>
            <p className="text-stone-300">P = F / S ve P = h · d · g prensibiyle derinlik, yoğunluk ve yüzey alanı arasındaki kusursuz matematik.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-blue-500/20">
            <strong className="text-blue-300 block mb-1">Basit Makineler & Kolaylık</strong>
            <p className="text-stone-300">Kaldıraç, makara ve eğik düzlem ile işten kazanç olmaksızın kuvvet kazancı sağlayan mekanik rahmet.</p>
          </div>
        </div>
      </div>
    );
  }

  // 7. KİMYA: Madde, Atom, Periyodik Sistem, Asit-Baz
  if (/madde|atom|periyodik|asit|baz|tepkime|karisim/.test(s)) {
    return (
      <div className="w-full bg-linear-to-br from-purple-950 via-violet-950 to-stone-900 rounded-2xl p-6 text-white border border-purple-500/30">
        <div className="flex items-center justify-between mb-4 border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2">
            <Atom className="w-6 h-6 text-purple-400" />
            <span className="font-serif font-bold text-purple-200 text-lg">Maddenin Mimarisi: Zerrelerden Bileşiklere</span>
          </div>
          <span className="text-3xs bg-purple-400/20 text-purple-300 px-2.5 py-1 rounded-full border border-purple-400/30">
            Atom Çekirdeği & Kimyasal Denge
          </span>
        </div>
        <div className="grid md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-purple-500/20">
            <strong className="text-purple-300 block mb-1">Atom & Tanecik Modeli</strong>
            <p className="text-stone-300">Proton (+), nötron (0) ve ışık hızına yakın dönen elektronlar (-); maddenin minyatür güneş sistemi.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-purple-500/20">
            <strong className="text-fuchsia-300 block mb-1">Periyodik Sistem</strong>
            <p className="text-stone-300">Elementlerin artan atom numaralarına göre şaşmaz periyot ve gruplarla dizildiği muhteşem kainat fihristi.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-purple-500/20">
            <strong className="text-pink-300 block mb-1">Asitler, Bazlar & pH Skalası</strong>
            <p className="text-stone-300">0-14 skalasında asitlerin ve bazların birbirini nötrleyerek tuz ve hayat kaynağı suya dönüşmesi.</p>
          </div>
        </div>
      </div>
    );
  }

  // 8. OPTİK & ELEKTRİK & DİĞER (Varsayılan İlmi Diagram)
  return (
    <div className="w-full bg-linear-to-br from-stone-900 via-primary-950 to-stone-950 rounded-2xl p-6 text-white border border-amber-500/20 shadow-md">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <span className="font-serif font-bold text-amber-200 text-lg">{title || "Hikmetli Fen Özgün Eğitim Modeli"}</span>
        </div>
        <span className="text-3xs bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">
          İlmi Mekanizma & Sanat
        </span>
      </div>
      <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-stone-200 leading-relaxed">
        Bu konuda sergilenen fiziksel kanunlar, moleküler yapılar ve sebep-sonuç bağları; kainattaki kusursuz nizamın, ince hendesenin ve her an devam eden ilahî idarenin birer şahididir.
      </div>
    </div>
  );
};
