import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShoppingBag, X, Sparkles, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div 
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="pointer-events-auto bg-[#1A1614] border border-[#D97706]/40 text-[#FDFBF7] p-4 rounded-2xl shadow-2xl shadow-black/90 flex items-start justify-between gap-3 relative overflow-hidden backdrop-blur-xl"
    >
      {/* Subtle Top Accent Shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D97706] to-transparent" />

      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#D97706]/15 border border-[#D97706]/30 flex items-center justify-center text-[#EAB308] flex-shrink-0 mt-0.5">
          {toast.type === 'warning' ? (
            <AlertCircle className="w-4 h-4 text-[#EAB308]" />
          ) : (
            <ShoppingBag className="w-4 h-4 text-[#EAB308]" />
          )}
        </div>

        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-[#FDFBF7] font-serif-display leading-tight">
            {toast.title}
          </h4>
          {toast.description && (
            <p className="text-[11px] text-[#A8A29E] leading-relaxed">
              {toast.description}
            </p>
          )}

          {toast.actionLabel && toast.onAction && (
            <button
              onClick={() => {
                toast.onAction?.();
                onDismiss();
              }}
              className="mt-1.5 inline-flex items-center text-[11px] font-bold text-[#EAB308] hover:text-[#FDFBF7] underline uppercase tracking-wider cursor-pointer"
            >
              {toast.actionLabel}
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onDismiss}
        className="w-6 h-6 rounded-md text-[#A8A29E] hover:text-[#FDFBF7] hover:bg-[#221C18] flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
        aria-label="Fechar notificação"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};
