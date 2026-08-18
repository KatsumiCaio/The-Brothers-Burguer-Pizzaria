import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Sparkles, Flame, ArrowRight, Utensils, Beer, Clock, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenReservation }) => {
  return (
    <section id="hero" className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#12100E] pt-8 pb-16 lg:py-20 border-b border-white/10">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E27D60]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#D96B43]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Subtle background overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#E27D60 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Headlines & CTAs (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            
            {/* Social Proof & Location Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-2 bg-[#201B18] border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#FFF8F3] shadow-sm">
                <span className="text-[#F59E0B]">⭐ 4.8/5.0</span>
                <span className="text-[#C4B8B0] font-normal">+47 avaliações no Google</span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#201B18] border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#C4B8B0]">
                <MapPin className="w-3.5 h-3.5 text-[#E27D60]" />
                <span>Capão Bonito, SP</span>
              </div>
            </div>

            {/* Main Headline with Georgia / Playfair Serif Styling */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-display italic text-[#E27D60] leading-tight tracking-tight">
                The Brothers
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif-display italic text-[#FFF8F3] opacity-95 mt-1">
                Burguer & Pizzaria Artesanal
              </p>
            </div>

            {/* Accent Divider Line */}
            <div className="h-[1px] w-16 bg-[#E27D60] my-2" />

            {/* Subheadline */}
            <p className="text-[#C4B8B0] text-base sm:text-lg max-w-2xl leading-relaxed font-sans-body">
              O ponto certo do hambúrguer artesanal no <strong className="text-[#FFF8F3] font-semibold">pão francês especial crocante</strong> ou brioche amanteigado, e a verdadeira tradição da pizza forneada em Capão Bonito.
            </p>

            {/* Fast Highlights Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl pt-1">
              <div className="flex items-center gap-2.5 bg-[#201B18] border border-white/10 p-3 rounded-xl">
                <span className="text-xl">🥖</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-[#C4B8B0] font-bold">Destaque</p>
                  <p className="text-xs font-bold text-[#FFF8F3]">No Pão Francês</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-[#201B18] border border-[#E27D60]/40 p-3 rounded-xl">
                <span className="text-xl">🔥</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-[#E27D60] font-bold">Toda Sexta</p>
                  <p className="text-xs font-bold text-[#F8D8C8]">Rodízio às 19h</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-[#201B18] border border-white/10 p-3 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-xl">🍺</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-[#C4B8B0] font-bold">Zero Grau</p>
                  <p className="text-xs font-bold text-[#FFF8F3]">Chopp Trincando</p>
                </div>
              </div>
            </div>

            {/* Sophisticated Dark Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <motion.button
                id="hero-cta-menu"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#E27D60] to-[#D96B43] hover:from-[#D96B43] hover:to-[#C85932] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 min-h-[48px] rounded-full shadow-xl shadow-[#E27D60]/20 transition-all duration-200 cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-white" />
                <span>Explorar Cardápio</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                id="hero-cta-reservation"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-2.5 bg-[#201B18] hover:bg-[#2A231E] border border-[#E27D60]/50 hover:border-[#E27D60] text-[#F8D8C8] hover:text-[#FFF8F3] font-bold text-xs uppercase tracking-widest px-7 py-4 min-h-[48px] rounded-full shadow-md transition-all duration-200 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-[#E27D60]" />
                <span>Reservar Mesa</span>
              </motion.button>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-xs text-[#C4B8B0] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" />
              <span>Entrega rápida em toda Capão Bonito (~35 min) ou retirada no balcão</span>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Glow Behind Image */}
              <div className="absolute -inset-2 rounded-3xl bg-[#E27D60]/15 blur-xl pointer-events-none" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#201B18] shadow-2xl shadow-black/80 group">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85"
                  alt="Hambúrguer artesanal The Brothers"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/40 to-transparent" />

                {/* Floating Tag over Image */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2 z-10">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFF8F3]">Capão Bonito • Desde {RESTAURANT_INFO.since}</span>
                </div>

                {/* Bottom Card Inside Image (Hero Highlight) */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#201B18]/95 backdrop-blur-md border border-white/10 p-4 rounded-xl z-10 shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-[#E27D60] font-bold uppercase tracking-wider">Destaque da Casa</p>
                      <h4 className="text-white font-bold text-sm sm:text-base font-serif-display truncate sm:whitespace-normal">The Brothers Classic Burger</h4>
                      <p className="text-[#C4B8B0] text-xs mt-0.5 line-clamp-1 sm:line-clamp-none">Blend 160g no pão francês crocante com bacon</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs text-[#C4B8B0] line-through">R$ 38,90</span>
                      <p className="text-lg font-bold text-[#E27D60]">R$ 33,90</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Second Mini Card: Fresh Pizza (Repositioned to upper-left so it never overlaps the burger card text) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden sm:flex absolute top-20 -left-6 lg:-left-8 bg-[#201B18]/95 backdrop-blur-md border border-white/15 p-3 rounded-xl shadow-2xl items-center gap-3 max-w-xs z-20 hover:scale-105 transition-transform"
              >
                <img 
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80" 
                  alt="Pizza Forneada" 
                  className="w-10 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F8D8C8]">Pizzas Forneadas</span>
                  <p className="text-xs font-bold text-[#FFF8F3] leading-tight">Bordas Vulcão</p>
                  <span className="text-[10px] text-[#C4B8B0]">Catupiry Original®</span>
                </div>
              </motion.div>

              {/* Floating Third Mini Card: Cold Beer */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hidden sm:flex absolute -top-5 -right-3 bg-[#201B18]/95 backdrop-blur-md border border-white/15 p-3 rounded-xl shadow-2xl items-center gap-2.5 z-20 hover:scale-105 transition-transform"
              >
                <div className="w-9 h-9 rounded-lg bg-[#2A231E] border border-white/10 flex items-center justify-center text-lg">
                  🍺
                </div>
                <div>
                  <p className="text-xs font-bold text-[#FFF8F3]">Chopp Artesanal</p>
                  <span className="text-[10px] text-[#F8D8C8] font-semibold uppercase tracking-wider">Caneca Congelada</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


