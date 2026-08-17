import React from 'react';
import { Flame, Sparkles, Calendar, Clock, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface FridayRodizioSectionProps {
  onOpenReservation: () => void;
}

export const FridayRodizioSection: React.FC<FridayRodizioSectionProps> = ({ onOpenReservation }) => {
  return (
    <section id="rodizio" className="py-20 bg-[#0D0B0A] relative overflow-hidden border-b border-white/10">
      
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-[#D97706]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Feature Container */}
        <div className="relative rounded-3xl bg-[#1A1614] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Rodizio Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 bg-[#0D0B0A] border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#EAB308] uppercase tracking-[0.2em]">
                <Flame className="w-4 h-4 text-[#D97706]" />
                <span>Exclusividade The Brothers • Toda Sexta-feira</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#FDFBF7] tracking-tight leading-tight">
                  A Experiência do Nosso <span className="text-[#EAB308] italic">Rodízio Especial</span>
                </h2>
                <div className="h-[1px] w-16 bg-[#D97706] my-3" />
              </div>

              <p className="text-[#A8A29E] text-sm sm:text-base leading-relaxed font-sans-body">
                Reúna os amigos e a família para a noite gastronômica mais aclamada de Capão Bonito. Variedade farta de <strong className="text-[#FDFBF7]">pizzas artesanais salgadas e doces</strong> servidas na mesa e <strong className="text-[#FDFBF7]">mini hambúrgueres artesanais</strong> suculentos!
              </p>

              {/* Feature Points Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-[#221C18] p-4 rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1614] border border-white/10 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#FDFBF7]">Início às 19h00</h4>
                    <p className="text-[11px] text-[#A8A29E] mt-0.5">Toda sexta com atendimento contínuo</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#221C18] p-4 rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1614] border border-white/10 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#FDFBF7]">Mesas para Grupos</h4>
                    <p className="text-[11px] text-[#A8A29E] mt-0.5">Ambiente acolhedor para famílias</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#221C18] p-4 rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1614] border border-white/10 text-[#EAB308] flex items-center justify-center flex-shrink-0 text-sm">
                    🍕
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#FDFBF7]">Pizzas Salgadas & Doces</h4>
                    <p className="text-[11px] text-[#A8A29E] mt-0.5">+15 sabores saindo do forno</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#221C18] p-4 rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1614] border border-white/10 text-[#EAB308] flex items-center justify-center flex-shrink-0 text-sm">
                    🍔
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#FDFBF7]">Mini Burguers Artesanais</h4>
                    <p className="text-[11px] text-[#A8A29E] mt-0.5">Blends nobres grelhados e suculentos</p>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="btn-reserve-rodizio-cta"
                  onClick={onOpenReservation}
                  className="inline-flex items-center justify-center gap-3 bg-[#D97706] hover:bg-[#E65100] text-black font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-xl transition-all cursor-pointer active:scale-95"
                >
                  <Flame className="w-4 h-4 text-black" />
                  <span>Reservar Mesa Para Sexta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <span className="text-xs text-[#A8A29E] text-center sm:text-left">
                  ⚡ Lugares limitados. Garanta sua reserva antecipada!
                </span>
              </div>

            </div>

            {/* Right Column: Visual Imagery Banner (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0D0B0A] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                  alt="Mesa de Rodízio The Brothers"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-transparent to-black/30" />

                {/* Floating Seal */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#1A1614]/95 backdrop-blur-md p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="text-xs font-bold text-[#FDFBF7]">Rodízio Toda Sexta</p>
                      <span className="text-[11px] text-[#EAB308] font-semibold">Das 19h00 às 23h30</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#D97706] px-3 py-1.5 rounded-lg">
                    Reserve Já
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

