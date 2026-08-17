import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center flex-col gap-2 pointer-events-auto">
      
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="bg-[#1A1614] text-[#FDFBF7] border border-[#25D366]/40 p-2.5 rounded-2xl shadow-2xl text-xs max-w-[210px] relative animate-bounce flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping flex-shrink-0" />
            <p className="text-[11px] leading-tight font-medium font-sans-body">
              Fale conosco ou faça seu pedido pelo WhatsApp!
            </p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-[#A8A29E] hover:text-[#FDFBF7] p-0.5"
            aria-label="Fechar dica"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Olá, The Brothers Burguer e Pizzaria! Gostaria de fazer um pedido ou tirar uma dúvida!')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20 group cursor-pointer"
        aria-label="Chamar no WhatsApp"
      >
        <span className="text-2xl transition-transform group-hover:scale-110">💬</span>
      </a>
    </div>
  );
};
