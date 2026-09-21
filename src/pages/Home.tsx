import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookType, Sparkles, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
            <span className="text-sm">🏛️</span> T.C. MEB Türkiye Yüzyılı Maarif Modeli Fen Müfredatı (5-8. Sınıf)
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-900 mb-6 leading-tight">
            Kainatın Sırlarını <br className="hidden md:block"/> Hikmetle Okumak
          </h1>
          <p className="text-lg md:text-xl text-primary-800/80 mb-10 leading-relaxed">
            Doğa olaylarını tesadüf ve tabiatın kör rüzgarlarına bırakmadan; arkasındaki sanatı, kastı ve bir Fail'in (Yaratıcı'nın) eşsiz mührünü göreceğiniz yeni bir fen bilimleri okuması.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/kutuphane"
            className="flex items-center gap-2 bg-primary-900 text-white px-8 py-3 rounded-full font-medium hover:bg-primary-800 transition shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
          >
            <BookType className="w-5 h-5" />
            Kütüphaneyi Keşfet
          </Link>
          <Link
            to="/donusturucu"
            className="flex items-center gap-2 bg-white text-primary-900 border-2 border-primary-200 px-8 py-3 rounded-full font-medium hover:bg-primary-50 transition w-full sm:w-auto justify-center group"
          >
            <Sparkles className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform" />
            <span>Metin Dönüştür</span>
            <span className="text-3xs bg-amber-100 text-amber-950 font-bold px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-0.5 ml-1">
              <Lock className="w-2.5 h-2.5 text-amber-700" />
              Yetkili
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-8">
        <FeatureCard 
          title="Sanatlı Bir Dil" 
          description="Eşyadaki sanat ve mimariyi 'kendi kendine olmuştur' şeklindeki sığ bakıştan kurtarıp, 'inşa edilmiştir' şuuruyla anlatıyoruz."
          delay={0.3}
        />
        <FeatureCard 
          title="Gaye ve Hikmet" 
          description="Hiçbir şeyin abes olmadığını; her zerre ve hücrenin kainat sarayında belirli bir gaye ile istihdam edildiğini vurguluyoruz."
          delay={0.4}
        />
        <FeatureCard 
          title="Yapay Zeka Destekli" 
          description="Sıradan herhangi bir fen metnini saniyeler içinde hikmetli bir bakış açısıyla yeniden şekillendiren akıllı dönüştürücü."
          delay={0.5}
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, delay }: { title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-primary-100/50"
    >
      <h3 className="text-xl font-serif font-bold text-primary-900 mb-3">{title}</h3>
      <p className="text-primary-800/70 leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </motion.div>
  );
}
