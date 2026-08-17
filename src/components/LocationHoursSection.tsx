import React from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  ExternalLink, 
  Navigation, 
  Utensils, 
  ShoppingBag, 
  Bike
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const LocationHoursSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-20 bg-[#12100E] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#201B18] border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#F8D8C8] uppercase tracking-[0.2em]">
            <MapPin className="w-3.5 h-3.5 text-[#E27D60]" />
            <span>Onde Nos Encontrar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#FFF8F3] tracking-tight">
            Localização & <span className="text-[#E27D60] italic">Horários de Atendimento</span>
          </h2>

          <div className="h-[1px] w-16 bg-[#E27D60] mx-auto my-2" />

          <p className="text-[#C4B8B0] text-sm sm:text-base font-sans-body">
            Venha viver uma experiência gastronômica memorável ou peça em casa com entrega rápida em Capão Bonito/SP.
          </p>
        </div>

        {/* 3 Column Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1: Address & Route */}
          <div className="bg-[#201B18] border border-white/10 hover:border-[#E27D60]/40 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A231E] border border-white/10 text-[#E27D60] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-display font-bold text-[#FFF8F3]">Nosso Endereço</h3>
              <p className="text-[#C4B8B0] text-sm leading-relaxed">
                {RESTAURANT_INFO.address}
              </p>
              <p className="text-xs text-[#C4B8B0]/80">
                Ponto de referência: Próximo à praça principal da Vila Bela Vista.
              </p>
            </div>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#2A231E] hover:bg-gradient-to-r hover:from-[#E27D60] hover:to-[#D96B43] hover:text-white text-[#F8D8C8] border border-white/10 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl transition-all cursor-pointer min-h-[44px]"
            >
              <Navigation className="w-4 h-4" />
              <span>Rota no Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Hours */}
          <div className="bg-[#201B18] border border-white/10 hover:border-[#E27D60]/40 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A231E] border border-white/10 text-[#E27D60] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-display font-bold text-[#FFF8F3]">Horário de Funcionamento</h3>
              <div className="space-y-2 text-xs sm:text-sm text-[#C4B8B0]">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="font-semibold text-[#FFF8F3]">Terça a Domingo:</span>
                  <span className="text-[#E27D60] font-bold">18h30 às 23h30</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="font-semibold text-[#FFF8F3]">Almoço Executivo:</span>
                  <span className="text-[#C4B8B0] font-medium">A partir das 11h00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="font-semibold text-[#FFF8F3]">Sexta (Rodízio):</span>
                  <span className="text-[#E27D60] font-bold">A partir das 19h00</span>
                </div>
                <div className="flex justify-between text-[#C4B8B0]/60 pt-0.5">
                  <span>Segunda-feira:</span>
                  <span>Descanso da Equipe</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 p-2.5 rounded-xl text-center font-semibold">
              🟢 Cozinha aberta e pronta para seu pedido hoje!
            </div>
          </div>

          {/* Card 3: Modes & Social */}
          <div className="bg-[#201B18] border border-white/10 hover:border-[#E27D60]/40 p-6 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A231E] border border-white/10 text-[#E27D60] flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-display font-bold text-[#FFF8F3]">Modalidades</h3>
              <div className="space-y-2 text-xs text-[#C4B8B0]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#2A231E] flex items-center justify-center text-[#E27D60]">
                    <Utensils className="w-3.5 h-3.5" />
                  </div>
                  <span><strong className="text-[#FFF8F3]">Refeição no local:</strong> Salão climatizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#2A231E] flex items-center justify-center text-[#E27D60]">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <span><strong className="text-[#FFF8F3]">Retirada no balcão:</strong> Sem taxa de entrega</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#2A231E] flex items-center justify-center text-[#E27D60]">
                    <Bike className="w-3.5 h-3.5" />
                  </div>
                  <span><strong className="text-[#FFF8F3]">Delivery rápido:</strong> Toda Capão Bonito</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#2A231E] hover:bg-[#12100E] text-[#C4B8B0] hover:text-[#FFF8F3] border border-white/10 hover:border-pink-500/40 font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-xl transition-all min-h-[44px]"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>{RESTAURANT_INFO.instagram}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

