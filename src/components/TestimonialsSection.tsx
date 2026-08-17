import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { REVIEWS_DATA, RESTAURANT_INFO } from '../data/menuData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-20 bg-[#0D0B0A] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Google Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#1A1614] border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#EAB308] uppercase tracking-[0.2em]">
              <MessageSquare className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Experiência & Prova Social</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#FDFBF7] tracking-tight">
              O Que Dizem Nossos <span className="text-[#EAB308] italic">Clientes</span>
            </h2>
            
            <div className="h-[1px] w-16 bg-[#D97706]" />

            <p className="text-[#A8A29E] text-sm sm:text-base font-sans-body">
              Avaliações reais de quem frequenta e pede na The Brothers em Capão Bonito/SP.
            </p>
          </div>

          {/* Google Score Card */}
          <div className="bg-[#1A1614] border border-white/10 p-5 rounded-2xl flex items-center gap-4 flex-shrink-0 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#D97706] flex items-center justify-center text-black font-black text-xl shadow-md">
              {RESTAURANT_INFO.rating}
            </div>
            <div>
              <div className="flex text-[#EAB308]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
                ))}
              </div>
              <p className="text-xs font-bold text-[#FDFBF7] mt-1">Google Maps Reviews</p>
              <span className="text-[11px] text-[#A8A29E]">{RESTAURANT_INFO.reviewsCount} avaliações verificadas</span>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="bg-[#1A1614] hover:bg-[#221C18] border border-white/5 hover:border-[#D97706]/40 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/80 relative group"
            >
              {/* Top Rating & Quote Icon */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#EAB308]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D97706]/20 group-hover:text-[#D97706]/40 transition-colors" />
                </div>

                {review.highlight && (
                  <p className="text-xs font-bold text-[#EAB308] italic">
                    "{review.highlight}"
                  </p>
                )}

                <p className="text-[#A8A29E] text-xs sm:text-sm leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#221C18] border border-white/10 flex items-center justify-center text-xs font-bold text-[#EAB308]">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#FDFBF7]">{review.name}</h4>
                    <span className="text-[10px] text-[#A8A29E]">{review.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full border border-[#25D366]/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verificado</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

