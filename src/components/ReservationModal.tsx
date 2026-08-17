import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Clock, Flame, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { generateWhatsAppReservationUrl } from '../utils/whatsapp';
import { sanitizeInput, reservationRateLimiter } from '../utils/security';
import { telemetry } from '../utils/telemetry';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [reservationType, setReservationType] = useState<'rodizio' | 'mesa_normal'>('rodizio');
  const [date, setDate] = useState('Próxima Sexta-feira');
  const [time, setTime] = useState('19:00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!reservationRateLimiter.canExecute()) {
      const waitSeconds = reservationRateLimiter.getTimeUntilNextAllowed();
      setErrorMessage(`Aguarde ${waitSeconds}s antes de enviar nova solicitação.`);
      return;
    }

    const sanitizedName = sanitizeInput(name, 80);
    setErrorMessage(null);
    setIsSubmitting(true);

    telemetry.trackEvent('reservation_requested', 'reservation', {
      type: reservationType,
      peopleCount,
      date,
      time,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      const waUrl = generateWhatsAppReservationUrl(
        sanitizedName || 'Cliente',
        peopleCount,
        date,
        time,
        reservationType === 'rodizio'
      );
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      onClose();
    }, 400);
  };

  return (
    <div 
      id="reservation-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className="bg-[#201B18] border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 relative z-10 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#2A231E] border border-white/10 text-[#E27D60] flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-lg text-[#FFF8F3]">
                Reserva de Mesa
              </h3>
              <p className="text-xs text-[#C4B8B0]">The Brothers • Capão Bonito</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2A231E] text-[#FFF8F3] hover:bg-[#201B18] flex items-center justify-center border border-white/10 cursor-pointer"
            aria-label="Fechar modal de reserva"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          {/* Reservation Type Toggle */}
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setReservationType('rodizio');
                setDate('Próxima Sexta-feira');
                setTime('19:00');
              }}
              className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                reservationType === 'rodizio'
                  ? 'bg-[#E27D60]/15 border-[#E27D60] text-[#F8D8C8] ring-1 ring-[#E27D60]'
                  : 'bg-[#2A231E] border-white/10 text-[#C4B8B0]'
              }`}
            >
              🔥 Rodízio de Sexta (19h)
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setReservationType('mesa_normal')}
              className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                reservationType === 'mesa_normal'
                  ? 'bg-[#E27D60]/15 border-[#E27D60] text-[#F8D8C8] ring-1 ring-[#E27D60]'
                  : 'bg-[#2A231E] border-white/10 text-[#C4B8B0]'
              }`}
            >
              🍽️ Mesa Tradicional
            </motion.button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-[11px] text-[#C4B8B0] mb-1">
              Nome do Responsável pela Reserva: *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Carlos Ferreira"
              className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] placeholder:text-[#C4B8B0]/50 focus:outline-none"
            />
          </div>

          {/* People Count & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-[#C4B8B0] mb-1">
                Qtd. de Pessoas:
              </label>
              <select
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] focus:outline-none"
              >
                {[2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((n) => (
                  <option key={n} value={n} className="bg-[#12100E] text-white">
                    {n} pessoas
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-[#C4B8B0] mb-1">
                Horário Estimado:
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Ex: 19:30"
                className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] focus:outline-none"
              />
            </div>
          </div>

          {/* Date info */}
          <div>
            <label className="block text-[11px] text-[#C4B8B0] mb-1">
              Data Desejada:
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Ex: Sexta-feira 20/10 ou Hoje à noite"
              className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] focus:outline-none"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300">
              {errorMessage}
            </div>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#E27D60] to-[#D96B43] hover:from-[#D96B43] hover:to-[#C85932] text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl shadow-lg transition-all cursor-pointer min-h-[44px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Gerando link da reserva...</span>
              </>
            ) : (
              <>
                <span>Confirmar Reserva via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>

          <p className="text-[10px] text-center text-[#C4B8B0]">
            Nossa equipe responderá com a confirmação da sua mesa em instantes.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

