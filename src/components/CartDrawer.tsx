import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Phone, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { CartItem, OrderForm, OrderType, PaymentMethod } from '../types';
import { RESTAURANT_INFO, NEIGHBORHOODS_CAPAO_BONITO } from '../data/menuData';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [orderForm, setOrderForm] = useState<OrderForm>({
    customerName: '',
    customerPhone: '',
    orderType: 'delivery',
    address: {
      street: '',
      number: '',
      neighborhood: 'Vila Bela Vista (Mesmo Bairro)',
      complement: '',
      reference: '',
    },
    paymentMethod: 'pix',
    needChange: false,
    changeFor: '',
    generalNotes: '',
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Subtotal Calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = orderForm.orderType === 'delivery' ? RESTAURANT_INFO.deliveryFee : 0;
  const total = subtotal + deliveryFee;

  const handleOrderTypeChange = (type: OrderType) => {
    setOrderForm((prev) => ({ ...prev, orderType: type }));
  };

  const handlePaymentChange = (method: PaymentMethod) => {
    setOrderForm((prev) => ({ ...prev, paymentMethod: method }));
  };

  const validateAndSubmit = () => {
    const errors: string[] = [];

    if (!orderForm.customerName.trim()) {
      errors.push('Por favor, informe seu nome.');
    }

    if (orderForm.orderType === 'delivery') {
      if (!orderForm.address.street.trim()) {
        errors.push('Informe a rua para entrega em Capão Bonito.');
      }
      if (!orderForm.address.number.trim()) {
        errors.push('Informe o número da residência.');
      }
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);

    // Generate WhatsApp Link
    const waUrl = generateWhatsAppOrderUrl(cartItems, orderForm, subtotal, deliveryFee, total);
    
    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="cart-drawer-content"
        className="w-full max-w-xl bg-[#1A1614] text-[#FDFBF7] h-full flex flex-col shadow-2xl border-l border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#0D0B0A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#221C18] border border-white/10 flex items-center justify-center text-[#D97706]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#FDFBF7]">
                Seu Pedido
              </h3>
              <p className="text-[#A8A29E] text-xs">
                {cartItems.length} item(ns) selecionado(s)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-[#A8A29E] hover:text-red-400 px-2.5 py-1 rounded-md bg-[#221C18] border border-white/10 transition-colors uppercase tracking-wider font-bold"
              >
                Limpar
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#221C18] hover:bg-[#1A1614] text-[#FDFBF7] flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              aria-label="Fechar carrinho"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body (Scrollable) */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#221C18] border border-white/10 flex items-center justify-center text-3xl">
              🍔
            </div>
            <h4 className="text-lg font-serif-display font-bold text-[#FDFBF7]">
              Seu carrinho está vazio
            </h4>
            <p className="text-xs text-[#A8A29E] max-w-xs leading-relaxed font-sans-body">
              Explore nosso cardápio de hambúrgueres artesanais, pizzas forneadas, porções e chopp trincando para montar seu pedido.
            </p>
            <button
              onClick={onClose}
              className="bg-[#D97706] hover:bg-[#E65100] text-black font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
            >
              Ver Cardápio Agora
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 text-xs sm:text-sm">
            
            {/* Items List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#EAB308] flex items-center justify-between">
                <span>Itens Selecionados</span>
                <span className="text-[11px] text-[#A8A29E] font-normal">({cartItems.length})</span>
              </h4>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="bg-[#221C18] border border-white/5 rounded-2xl p-3.5 space-y-2.5 transition-all shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                        />
                        <div>
                          <h5 className="font-serif-display font-bold text-[#FDFBF7] text-xs sm:text-sm leading-snug">
                            {item.menuItem.name}
                          </h5>
                          <p className="text-[#EAB308] font-bold text-xs mt-0.5">
                            {formatCurrency(item.totalPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-[#A8A29E] hover:text-red-400 p-1.5 rounded-lg bg-[#1A1614] border border-white/5 transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customizations summary tags */}
                    {(item.options.breadType || item.options.meatDoneness || (item.options.pizzaCrust && item.options.pizzaCrust !== 'Borda Tradicional') || item.options.selectedExtras.length > 0 || item.options.notes) && (
                      <div className="bg-[#1A1614] p-2.5 rounded-xl border border-white/5 space-y-1 text-[11px] text-[#A8A29E]">
                        {item.options.breadType && (
                          <p>🥖 <strong className="text-[#FDFBF7]">Pão:</strong> {item.options.breadType}</p>
                        )}
                        {item.options.meatDoneness && (
                          <p>🥩 <strong className="text-[#FDFBF7]">Ponto:</strong> {item.options.meatDoneness}</p>
                        )}
                        {item.options.pizzaCrust && item.options.pizzaCrust !== 'Borda Tradicional' && (
                          <p>🍕 <strong className="text-[#FDFBF7]">Borda:</strong> {item.options.pizzaCrust}</p>
                        )}
                        {item.options.selectedExtras.length > 0 && (
                          <p>
                            ➕ <strong className="text-[#FDFBF7]">Adicionais:</strong>{' '}
                            {item.options.selectedExtras.map((e) => `${e.name} (+${formatCurrency(e.price)})`).join(', ')}
                          </p>
                        )}
                        {item.options.notes && (
                          <p className="text-[#EAB308] italic">
                            📝 <strong className="text-[#FDFBF7]">Obs:</strong> "{item.options.notes}"
                          </p>
                        )}
                      </div>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <span className="text-[11px] text-[#A8A29E]">Quantidade:</span>
                      <div className="flex items-center gap-2 bg-[#1A1614] border border-white/10 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-[#221C18] hover:bg-[#2c241f] text-[#FDFBF7] flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-[#FDFBF7]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-[#D97706] hover:bg-[#E65100] text-black flex items-center justify-center transition-colors font-bold"
                        >
                          <Plus className="w-3 h-3 stroke-[3]" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Delivery or Pickup Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#EAB308]">
                Tipo de Atendimento:
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleOrderTypeChange('delivery')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition-all cursor-pointer ${
                    orderForm.orderType === 'delivery'
                      ? 'bg-[#D97706]/15 border-[#D97706] text-[#EAB308] font-bold ring-1 ring-[#D97706]'
                      : 'bg-[#221C18] border-white/10 text-[#A8A29E] hover:text-[#FDFBF7]'
                  }`}
                >
                  <span className="text-lg">🛵</span>
                  <span className="text-xs">Entrega (Delivery)</span>
                  <span className="text-[10px] text-[#EAB308] font-semibold">+ {formatCurrency(RESTAURANT_INFO.deliveryFee)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOrderTypeChange('pickup')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition-all cursor-pointer ${
                    orderForm.orderType === 'pickup'
                      ? 'bg-[#D97706]/15 border-[#D97706] text-[#EAB308] font-bold ring-1 ring-[#D97706]'
                      : 'bg-[#221C18] border-white/10 text-[#A8A29E] hover:text-[#FDFBF7]'
                  }`}
                >
                  <span className="text-lg">🛍️</span>
                  <span className="text-xs">Retirada no Balcão</span>
                  <span className="text-[10px] text-[#25D366] font-semibold">Grátis</span>
                </button>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="bg-[#221C18] border border-white/10 rounded-2xl p-4 space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FDFBF7]">
                Seus Dados:
              </h4>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] text-[#A8A29E] mb-1">
                    Seu Nome Completo: *
                  </label>
                  <input
                    type="text"
                    value={orderForm.customerName}
                    onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-[#0D0B0A] border border-white/10 focus:border-[#D97706] rounded-xl px-3 py-2 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#A8A29E] mb-1">
                    WhatsApp para Contato:
                  </label>
                  <input
                    type="tel"
                    value={orderForm.customerPhone}
                    onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                    placeholder="(15) 99999-9999"
                    className="w-full bg-[#0D0B0A] border border-white/10 focus:border-[#D97706] rounded-xl px-3 py-2 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Address Fields (only if delivery) */}
              {orderForm.orderType === 'delivery' && (
                <div className="pt-2 border-t border-white/5 space-y-2.5">
                  <span className="text-xs font-bold text-[#EAB308] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Endereço de Entrega (Capão Bonito):</span>
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[11px] text-[#A8A29E] mb-1">Rua / Avenida: *</label>
                      <input
                        type="text"
                        value={orderForm.address.street}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          address: { ...orderForm.address, street: e.target.value }
                        })}
                        placeholder="Ex: Rua Floriano Peixoto"
                        className="w-full bg-[#0D0B0A] border border-white/10 focus:border-[#D97706] rounded-xl px-3 py-2 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#A8A29E] mb-1">Número: *</label>
                      <input
                        type="text"
                        value={orderForm.address.number}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          address: { ...orderForm.address, number: e.target.value }
                        })}
                        placeholder="Ex: 120"
                        className="w-full bg-[#0D0B0A] border border-white/10 focus:border-[#D97706] rounded-xl px-3 py-2 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A8A29E] mb-1">Bairro em Capão Bonito:</label>
                    <select
                      value={orderForm.address.neighborhood}
                      onChange={(e) => setOrderForm({
                        ...orderForm,
                        address: { ...orderForm.address, neighborhood: e.target.value }
                      })}
                      className="w-full bg-[#0D0B0A] border border-white/10 focus:border-[#D97706] rounded-xl px-3 py-2 text-xs text-[#FDFBF7] focus:outline-none"
                    >
                      {NEIGHBORHOODS_CAPAO_BONITO.map((bairro) => (
                        <option key={bairro} value={bairro} className="bg-[#0D0B0A] text-white">
                          {bairro}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#A8A29E] mb-1">Complemento:</label>
                      <input
                        type="text"
                        value={orderForm.address.complement || ''}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          address: { ...orderForm.address, complement: e.target.value }
                        })}
                        placeholder="Apto 42 / Bloco B"
                        className="w-full bg-[#0D0B0A] border border-white/10 focus:border-[#D97706] rounded-xl px-3 py-2 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#A8A29E] mb-1">Ponto de Referência:</label>
                      <input
                        type="text"
                        value={orderForm.address.reference || ''}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          address: { ...orderForm.address, reference: e.target.value }
                        })}
                        placeholder="Próximo à praça..."
                        className="w-full bg-[#0D0B0A] border border-white/10 focus:border-[#D97706] rounded-xl px-3 py-2 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="bg-[#221C18] border border-white/10 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#EAB308]">
                Forma de Pagamento:
              </h4>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handlePaymentChange('pix')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    orderForm.paymentMethod === 'pix'
                      ? 'bg-[#25D366]/15 border-[#25D366] text-[#25D366] font-bold ring-1 ring-[#25D366]'
                      : 'bg-[#1A1614] border-white/10 text-[#A8A29E]'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-[#25D366]" />
                  <span className="text-xs">PIX</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePaymentChange('cartao_entrega')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    orderForm.paymentMethod === 'cartao_entrega'
                      ? 'bg-[#D97706]/15 border-[#D97706] text-[#EAB308] font-bold ring-1 ring-[#D97706]'
                      : 'bg-[#1A1614] border-white/10 text-[#A8A29E]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#D97706]" />
                  <span className="text-xs">Cartão</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePaymentChange('dinheiro')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    orderForm.paymentMethod === 'dinheiro'
                      ? 'bg-[#D97706]/15 border-[#D97706] text-[#EAB308] font-bold ring-1 ring-[#D97706]'
                      : 'bg-[#1A1614] border-white/10 text-[#A8A29E]'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-[#D97706]" />
                  <span className="text-xs">Dinheiro</span>
                </button>
              </div>

              {/* Cash change field */}
              {orderForm.paymentMethod === 'dinheiro' && (
                <div className="p-2.5 bg-[#1A1614] rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="need-change"
                      checked={orderForm.needChange}
                      onChange={(e) => setOrderForm({ ...orderForm, needChange: e.target.checked })}
                      className="rounded accent-[#D97706]"
                    />
                    <label htmlFor="need-change" className="text-xs text-[#FDFBF7] cursor-pointer">
                      Precisa de troco?
                    </label>
                  </div>
                  {orderForm.needChange && (
                    <input
                      type="text"
                      value={orderForm.changeFor || ''}
                      onChange={(e) => setOrderForm({ ...orderForm, changeFor: e.target.value })}
                      placeholder="Troco para quanto? Ex: R$ 100,00"
                      className="w-full bg-[#0D0B0A] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-[#FDFBF7] focus:outline-none"
                    />
                  )}
                </div>
              )}
            </div>

            {/* General Observations */}
            <div>
              <label className="block text-[11px] text-[#A8A29E] mb-1">
                Observações Gerais do Pedido (Opcional):
              </label>
              <textarea
                value={orderForm.generalNotes || ''}
                onChange={(e) => setOrderForm({ ...orderForm, generalNotes: e.target.value })}
                placeholder="Ex: Tocar a campainha, deixar na portaria, caprichar no guardanapo..."
                rows={2}
                className="w-full bg-[#221C18] border border-white/10 focus:border-[#D97706] rounded-xl p-2.5 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none resize-none"
              />
            </div>

            {/* Validation Errors alert */}
            {formErrors.length > 0 && (
              <div className="bg-red-950/60 border border-red-500/50 rounded-xl p-3 space-y-1 text-red-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Por favor, complete as informações:</span>
                </div>
                {formErrors.map((err, i) => (
                  <p key={i} className="pl-5">• {err}</p>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Drawer Footer (Summary + Direct WhatsApp Button) */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#0D0B0A] border-t border-white/10 space-y-3">
            
            {/* Calculation details */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#A8A29E]">
                <span>Subtotal dos itens:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#A8A29E]">
                <span>Taxa de Entrega:</span>
                <span>{orderForm.orderType === 'delivery' ? formatCurrency(deliveryFee) : 'Grátis (Retirada)'}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-[#FDFBF7] pt-1.5 border-t border-white/10">
                <span>Total a Pagar:</span>
                <span className="text-[#EAB308] font-extrabold text-base sm:text-lg">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Main WhatsApp Button */}
            <button
              id="btn-submit-whatsapp-order"
              onClick={validateAndSubmit}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold text-xs uppercase tracking-widest py-4 px-4 rounded-xl shadow-xl active:scale-98 transition-all cursor-pointer"
            >
              <span className="text-lg">💬</span>
              <span>Finalizar no WhatsApp (15) 99705-7138</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-[#A8A29E]">
              Ao clicar, uma mensagem formatada com todos os itens será aberta no seu WhatsApp oficial.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
