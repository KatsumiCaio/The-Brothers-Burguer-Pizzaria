import React, { useState } from 'react';
import { X, Plus, Minus, Check, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { MenuItem, ExtraOption, CartItemOption } from '../types';
import { formatCurrency } from '../utils/whatsapp';

interface ProductModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options: CartItemOption) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [breadType, setBreadType] = useState<'Pão Francês Especial Crocante' | 'Pão Brioche Selado na Manteiga'>(
    'Pão Francês Especial Crocante'
  );
  const [meatDoneness, setMeatDoneness] = useState<'Ao Ponto (Suculento)' | 'Bem Passado' | 'Ao Ponto para Mal Passado'>(
    'Ao Ponto (Suculento)'
  );
  const [pizzaCrust, setPizzaCrust] = useState<'Borda Tradicional' | 'Borda Vulcão Catupiry Original (+R$ 8,00)' | 'Borda Vulcão Cheddar (+R$ 8,00)'>(
    'Borda Tradicional'
  );
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [notes, setNotes] = useState('');

  // Calculate dynamic unit price with crust & extras
  let crustPrice = 0;
  if (pizzaCrust.includes('(+R$ 8,00)')) crustPrice = 8.00;

  const extrasTotal = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
  const unitPrice = item.price + crustPrice + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleToggleExtra = (extra: ExtraOption) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleConfirm = () => {
    onAddToCart(item, quantity, {
      breadType: item.allowsBreadChoice ? breadType : undefined,
      meatDoneness: item.allowsMeatDoneness ? meatDoneness : undefined,
      pizzaCrust: item.allowsCrustChoice ? pizzaCrust : undefined,
      selectedExtras,
      notes,
    });
    onClose();
  };

  return (
    <div 
      id="product-customization-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#1A1614] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl shadow-black my-8 relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Image with close button */}
        <div className="relative h-56 w-full flex-shrink-0 bg-black">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-transparent to-black/60" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 hover:bg-black text-[#FDFBF7] flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {item.badge && (
            <div className="absolute top-4 left-4 bg-[#0D0B0A]/90 backdrop-blur-md border border-white/10 text-[#EAB308] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              {item.badge}
            </div>
          )}

          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="text-xl font-serif-display font-bold text-[#FDFBF7] leading-snug">
              {item.name}
            </h3>
            <p className="text-[#EAB308] font-bold text-lg mt-0.5">
              {formatCurrency(item.price)}
            </p>
          </div>
        </div>

        {/* Scrollable Configuration Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Item Description */}
          <div className="bg-[#221C18] p-3.5 rounded-xl border border-white/5 text-[#A8A29E] text-xs leading-relaxed font-sans-body">
            {item.description}
          </div>

          {/* Option: Bread Choice for Burgers */}
          {item.allowsBreadChoice && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#EAB308] uppercase tracking-wider flex items-center gap-1.5">
                <span>🥖 Escolha o seu Pão:</span>
                <span className="text-[10px] text-[#A8A29E] font-normal">(Obrigatório)</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setBreadType('Pão Francês Especial Crocante')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    breadType === 'Pão Francês Especial Crocante'
                      ? 'bg-[#D97706]/15 border-[#D97706] text-[#FDFBF7] ring-1 ring-[#D97706]'
                      : 'bg-[#221C18] border-white/10 text-[#A8A29E] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Pão Francês Especial</span>
                    {breadType === 'Pão Francês Especial Crocante' && <Check className="w-4 h-4 text-[#EAB308]" />}
                  </div>
                  <span className="text-[11px] text-[#EAB308] mt-1 font-medium">⭐ O preferido da casa! Super crocante</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBreadType('Pão Brioche Selado na Manteiga')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    breadType === 'Pão Brioche Selado na Manteiga'
                      ? 'bg-[#D97706]/15 border-[#D97706] text-[#FDFBF7] ring-1 ring-[#D97706]'
                      : 'bg-[#221C18] border-white/10 text-[#A8A29E] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Pão Brioche Amanteigado</span>
                    {breadType === 'Pão Brioche Selado na Manteiga' && <Check className="w-4 h-4 text-[#EAB308]" />}
                  </div>
                  <span className="text-[11px] text-[#A8A29E] mt-1">Fofinho e selado na manteiga</span>
                </button>
              </div>
            </div>
          )}

          {/* Option: Meat Doneness */}
          {item.allowsMeatDoneness && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#EAB308] uppercase tracking-wider">
                🥩 Ponto da Carne:
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  'Ao Ponto (Suculento)',
                  'Bem Passado',
                  'Ao Ponto para Mal Passado'
                ].map((doneness) => (
                  <button
                    key={doneness}
                    type="button"
                    onClick={() => setMeatDoneness(doneness as any)}
                    className={`py-2 px-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                      meatDoneness === doneness
                        ? 'bg-[#D97706]/15 border-[#D97706] text-[#EAB308] font-bold ring-1 ring-[#D97706]'
                        : 'bg-[#221C18] border-white/10 text-[#A8A29E] hover:text-[#FDFBF7]'
                    }`}
                  >
                    {doneness.replace(' (Suculento)', '')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option: Pizza Crust */}
          {item.allowsCrustChoice && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#EAB308] uppercase tracking-wider">
                🍕 Borda Recheada:
              </label>

              <div className="space-y-2">
                {[
                  { label: 'Borda Tradicional', price: '+ R$ 0,00' },
                  { label: 'Borda Vulcão Catupiry Original (+R$ 8,00)', price: '+ R$ 8,00' },
                  { label: 'Borda Vulcão Cheddar (+R$ 8,00)', price: '+ R$ 8,00' },
                ].map((crust) => (
                  <button
                    key={crust.label}
                    type="button"
                    onClick={() => setPizzaCrust(crust.label as any)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      pizzaCrust === crust.label
                        ? 'bg-[#D97706]/15 border-[#D97706] text-[#EAB308] font-bold ring-1 ring-[#D97706]'
                        : 'bg-[#221C18] border-white/10 text-[#A8A29E] hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs">{crust.label.split(' (+')[0]}</span>
                    <span className="text-xs font-bold text-[#EAB308]">{crust.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Option: Additional Extras */}
          {item.availableExtras && item.availableExtras.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#EAB308] uppercase tracking-wider flex items-center justify-between">
                <span>➕ Deseja Adicionais?</span>
                <span className="text-[11px] text-[#A8A29E] font-normal">Opcional</span>
              </label>

              <div className="space-y-2">
                {item.availableExtras.map((extra) => {
                  const isChecked = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => handleToggleExtra(extra)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#D97706]/15 border-[#D97706] text-[#FDFBF7]'
                          : 'bg-[#221C18] border-white/10 text-[#A8A29E] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-[#D97706] border-[#D97706] text-black'
                              : 'border-white/20 bg-black/40'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{extra.name}</span>
                      </div>
                      <span className="text-xs font-bold text-[#EAB308]">
                        + {formatCurrency(extra.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Observations Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#FDFBF7] uppercase tracking-wider">
              📝 Observações Especiais:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Sem cebola, molho à parte, bem tostado..."
              className="w-full bg-[#0D0B0A] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none focus:border-[#D97706] transition-colors"
            />
          </div>

        </div>

        {/* Modal Footer (Quantity + Add to Cart CTA) */}
        <div className="p-4 bg-[#0D0B0A] border-t border-white/10 flex items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center bg-[#221C18] border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-[#1A1614] hover:bg-[#221C18] text-[#FDFBF7] flex items-center justify-center cursor-pointer transition-colors active:scale-95"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-[#FDFBF7]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-[#D97706] hover:bg-[#E65100] text-black flex items-center justify-center cursor-pointer transition-colors active:scale-95 font-bold"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          {/* Add CTA */}
          <button
            onClick={handleConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#D97706] hover:bg-[#E65100] text-black font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-xl active:scale-98 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span>Adicionar • {formatCurrency(totalPrice)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
