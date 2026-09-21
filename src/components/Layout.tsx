import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Sparkles, Home, Menu, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Ana Sayfa', href: '/', icon: Home, isProtected: false },
    { name: 'Kütüphane', href: '/kutuphane', icon: BookOpen, isProtected: false },
    { name: 'Dönüştürücü', href: '/donusturucu', icon: Sparkles, isProtected: true },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Bar */}
      <header className="bg-primary-900 text-primary-50 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-primary-200" />
              <Link to="/" className="font-serif italic font-bold text-xl tracking-wide">
                Hikmetli Fen
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                               (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1.5 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-white border-b-2 border-primary-200' : 'text-primary-200/80 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {item.isProtected && (
                      <span className="flex items-center text-3xs font-semibold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-300/30 ml-0.5" title="Yetkili Girişi Gerekli">
                        <Lock className="w-2.5 h-2.5 mr-0.5 text-amber-300" />
                        Yetkili
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-primary-200 hover:text-white focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-primary-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => {
                 const isActive = location.pathname === item.href || 
                 (item.href !== '/' && location.pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                        isActive ? 'text-white bg-primary-900' : 'text-primary-200 hover:text-white hover:bg-primary-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      {item.isProtected && (
                        <span className="flex items-center text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 border border-amber-300/30">
                          <Lock className="w-3 h-3 mr-1 text-amber-300" />
                          Yetkili
                        </span>
                      )}
                    </Link>
                  )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary-100 py-8 text-center text-primary-900/60 border-t border-primary-200">
        <p className="font-serif italic text-sm">
          "Kainat, okunmayı bekleyen muazzam ve manidar bir kitaptır."
        </p>
      </footer>
    </div>
  );
}
