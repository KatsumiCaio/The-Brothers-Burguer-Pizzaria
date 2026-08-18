import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RESTAURANT_INFO } from '../data/menuData';
import { X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center flex-col gap-2 pointer-events-auto">
      
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="bg-[#1A1614] text-[#FDFBF7] border border-[#25D366]/40 p-2.5 rounded-2xl shadow-2xl text-xs max-w-[210px] relative flex items-center justify-between gap-2"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent('Olá, The Brothers Burguer e Pizzaria! Gostaria de fazer um pedido ou tirar uma dúvida!')}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 60, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-black flex items-center justify-center shadow-2xl transition-colors duration-300 border-2 border-white/20 group cursor-pointer"
        aria-label="Chamar no WhatsApp"
      >
        <span className="text-xl sm:text-2xl transition-transform group-hover:scale-110">💬</span>
      </motion.a>
    </div>
  );
};
