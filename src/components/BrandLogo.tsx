import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Visual Seal / Badge */}
      <div 
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-[#E27D60] to-[#D96B43] text-white shadow-lg shadow-black/60 border border-white/20 flex-shrink-0 transition-transform group-hover:scale-105 duration-300 ${
          isSm ? 'w-10 h-10' : isLg ? 'w-16 h-16' : 'w-12 h-12'
        }`}
      >
        {/* Outer notched star/gear border illusion */}
        <div className="absolute inset-0.5 rounded-full border border-dashed border-[#F8D8C8]/50 animate-[spin_40s_linear_infinite]" />
        
        <div className="flex items-center justify-center gap-0.5 z-10 text-center font-bold">
          <span className={isSm ? 'text-sm' : isLg ? 'text-2xl' : 'text-lg'}>🍔</span>
          <span className={isSm ? 'text-xs' : isLg ? 'text-xl' : 'text-base'}>🍺</span>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#F8D8C8] uppercase font-sans-body">
            DESDE {RESTAURANT_INFO.since}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#E27D60]/60" />
          <span className="text-[10px] sm:text-xs font-medium tracking-wide text-[#C4B8B0]">
            CAPÃO BONITO
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className={`font-serif-brand font-black tracking-wider text-[#FFF8F3] uppercase ${
            isSm ? 'text-base' : isLg ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
          }`}>
            THE <span className="text-[#E27D60]">BROTHERS</span>
          </span>
        </div>

        {showSubtitle && (
          <span className="text-[11px] sm:text-xs text-[#C4B8B0] tracking-wide font-medium flex items-center gap-1 font-sans-body">
            <span>Burguer</span>
            <span className="text-[#E27D60] font-bold">&bull;</span>
            <span>Pizzaria</span>
            <span className="text-[#E27D60] font-bold">&bull;</span>
            <span>Chopperia</span>
          </span>
        )}
      </div>
    </div>
  );
};
