import React from 'react';
import { Phone, Flame, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface TopAnnouncementBarProps {
  onOpenReservation?: () => void;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({ onOpenReservation }) => {
  return (
    <div id="top-announcement-bar" className="bg-[#181513] text-[#FFF8F3] border-b border-white/5 text-xs py-2 px-4 sm:px-6 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Side: Location & Status */}
        <div className="flex items-center flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold">
          <span className="text-[#C4B8B0] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E27D60]" />
            Capão Bonito, SP
          </span>

          <span className="h-1 w-1 rounded-full bg-[#C4B8B0]/40 hidden sm:inline-block" />

          <div className="inline-flex items-center gap-1.5 text-[#25D366] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>Aberto hoje: 18:30 — 23:30</span>
          </div>
        </div>

        {/* Right Side: Rodizio Alert & WhatsApp Contact */}
        <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
          <button 
            onClick={onOpenReservation}
            className="inline-flex items-center gap-1.5 text-[#F8D8C8] hover:text-[#E27D60] transition-colors cursor-pointer group font-bold"
          >
            <Flame className="w-3.5 h-3.5 text-[#E27D60] group-hover:scale-110 transition-transform" />
            <span>🔥 Rodízio de Sexta: 19h</span>
          </button>

          <a 
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de mais informações sobre o cardápio e atendimento!')}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-[#C4B8B0] hover:text-[#FFF8F3] transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-[#25D366]" />
            <span>{RESTAURANT_INFO.whatsappFormatted}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

