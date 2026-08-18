import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  showSubtitle = true,
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Official Photo Logo Image */}
      <div 
        className={`relative flex items-center justify-center rounded-full overflow-hidden shadow-xl shadow-black/80 border border-[#E27D60]/40 flex-shrink-0 transition-transform group-hover:scale-105 duration-300 ${sizeClasses[size]}`}
      >
        <img
          src="/logo.svg"
          alt={RESTAURANT_INFO.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
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
            <span className={`font-serif-brand font-black tracking-wider text-[#FFF8F3] uppercase ${textSizes[size]}`}>
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
      )}
    </div>
  );
};
