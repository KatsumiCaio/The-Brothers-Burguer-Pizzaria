import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Flame, Phone, CalendarDays } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { RESTAURANT_INFO } from '../data/menuData';
import { formatCurrency } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartSubtotal,
  onOpenCart,
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Destaques', href: '#destaques' },
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Rodízio', href: '#rodizio' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'Localização', href: '#localizacao' },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D0B0A]/95 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/80 py-2.5'
          : 'bg-[#0D0B0A]/90 backdrop-blur-sm border-b border-white/5 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex-shrink-0" id="nav-brand-link">
          <BrandLogo size="md" showSubtitle={false} />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#A8A29E] hover:text-[#EAB308] font-bold text-xs uppercase tracking-widest transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-[#EAB308] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls (Reservation + Cart) */}
        <div className="flex items-center gap-3">
          
          {/* Reservation CTA Button (Desktop) */}
          <motion.button
            id="nav-btn-reservation"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-2 bg-[#1A1614] hover:bg-[#221C18] text-[#EAB308] hover:text-[#FDFBF7] border border-[#D97706]/30 hover:border-[#D97706]/60 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
          >
            <Flame className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Rodízio de Sexta</span>
          </motion.button>

          {/* Cart Button */}
          <motion.button
            id="nav-btn-cart"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2.5 bg-[#D97706] hover:bg-[#E65100] text-black px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-lg cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-black" />
              {cartCount > 0 && (
                <motion.span 
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -top-2 -right-2 bg-black text-[#EAB308] border border-[#EAB308]/40 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
            
            <span className="hidden sm:inline">Pedido</span>
            {cartCount > 0 ? (
              <span className="bg-black/20 border border-black/30 px-2 py-0.5 rounded text-black text-[11px] font-black">
                {formatCurrency(cartSubtotal)}
              </span>
            ) : null}
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            id="mobile-menu-toggle"
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#1A1614] text-[#A8A29E] hover:text-[#EAB308] border border-white/10 focus:outline-none cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#1A1614] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-[#A8A29E] hover:text-[#EAB308] hover:bg-black/30 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#221C18] text-[#EAB308] border border-[#D97706]/40 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <CalendarDays className="w-4 h-4 text-[#D97706]" />
                <span>Reservar Mesa / Rodízio de Sexta</span>
              </motion.button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-black font-bold uppercase tracking-widest py-2.5 rounded-xl text-xs shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: {RESTAURANT_INFO.whatsappFormatted}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


