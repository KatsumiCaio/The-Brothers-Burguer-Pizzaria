import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { CartItem, OrderForm, OrderType, PaymentMethod } from '../types';
import { RESTAURANT_INFO, NEIGHBORHOODS_CAPAO_BONITO } from '../data/menuData';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/whatsapp';
import { sanitizeInput, orderRateLimiter } from '../utils/security';
import { telemetry } from '../utils/telemetry';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;

    if (!orderRateLimiter.canExecute()) {
      const waitSeconds = orderRateLimiter.getTimeUntilNextAllowed();
      setFormErrors([`Por favor, aguarde ${waitSeconds}s antes de reenviar o pedido.`]);
      return;
    }

    const errors: string[] = [];
    const sanitizedName = sanitizeInput(orderForm.customerName, 80);
    const sanitizedPhone = sanitizeInput(orderForm.customerPhone, 30);
    const sanitizedStreet = sanitizeInput(orderForm.address.street, 120);
    const sanitizedNumber = sanitizeInput(orderForm.address.number, 20);
    const sanitizedComplement = sanitizeInput(orderForm.address.complement || '', 100);
    const sanitizedRef = sanitizeInput(orderForm.address.reference || '', 120);
    const sanitizedNotes = sanitizeInput(orderForm.generalNotes || '', 300);

    if (!sanitizedName) {
      errors.push('Por favor, informe seu nome.');
    }

    if (orderForm.orderType === 'delivery') {
      if (!sanitizedStreet) {
        errors.push('Informe a rua para entrega em Capão Bonito.');
      }
      if (!sanitizedNumber) {
        errors.push('Informe o número da residência.');
      }
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    const sanitizedForm: OrderForm = {
      ...orderForm,
      customerName: sanitizedName,
      customerPhone: sanitizedPhone,
      address: {
        ...orderForm.address,
        street: sanitizedStreet,
        number: sanitizedNumber,
        complement: sanitizedComplement,
        reference: sanitizedRef,
      },
      generalNotes: sanitizedNotes,
    };

    setFormErrors([]);
    setIsSubmitting(true);

    telemetry.trackEvent('order_whatsapp_submitted', 'checkout', {
      orderType: sanitizedForm.orderType,
      itemCount: cartItems.length,
      subtotal,
      total,
      paymentMethod: sanitizedForm.paymentMethod,
    });

    // Simulate smooth progress before dispatching to WhatsApp
    setTimeout(() => {
      setIsSubmitting(false);
      const waUrl = generateWhatsAppOrderUrl(cartItems, sanitizedForm, subtotal, deliveryFee, total);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      onClose();
    }, 450);
  };

  return (
    <div 
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end overflow-hidden"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Slide-out Drawer */}
      <motion.div 
        id="cart-drawer-content"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        className="w-full max-w-xl bg-[#201B18] text-[#FFF8F3] h-full flex flex-col shadow-2xl border-l border-white/10 relative z-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#12100E] border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2A231E] border border-white/10 flex items-center justify-center text-[#E27D60]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#FFF8F3]">
                Seu Pedido
              </h3>
              <p className="text-[#C4B8B0] text-xs">
                {cartItems.length} item(ns) selecionado(s)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClearCart}
                className="text-[11px] text-[#C4B8B0] hover:text-red-400 px-2.5 py-1 rounded-md bg-[#2A231E] border border-white/10 transition-colors uppercase tracking-wider font-bold cursor-pointer"
              >
                Limpar
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#2A231E] hover:bg-[#12100E] text-[#FFF8F3] flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              aria-label="Fechar carrinho"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Drawer Body (Scrollable) */}
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4"
          >
            <div className="w-20 h-20 rounded-full bg-[#2A231E] border border-white/10 flex items-center justify-center text-3xl">
              🍔
            </div>
            <h4 className="text-lg font-serif-display font-bold text-[#FFF8F3]">
              Seu carrinho está vazio
            </h4>
            <p className="text-xs text-[#C4B8B0] max-w-xs leading-relaxed font-sans-body">
              Explore nosso cardápio de hambúrgueres artesanais, pizzas forneadas, porções e chopp trincando para montar seu pedido.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-gradient-to-r from-[#E27D60] to-[#D96B43] hover:from-[#D96B43] hover:to-[#C85932] text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
            >
              Ver Cardápio Agora
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 text-xs sm:text-sm custom-scrollbar">
            
            {/* Items List with Layout Animations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8D8C8] flex items-center justify-between">
                <span>Itens Selecionados</span>
                <span className="text-[11px] text-[#C4B8B0] font-normal">({cartItems.length})</span>
              </h4>

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.cartItemId}
                      layout
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, height: 0, overflow: 'hidden', marginBottom: 0, transition: { duration: 0.2 } }}
                      className="bg-[#2A231E] border border-white/5 rounded-2xl p-3.5 space-y-2.5 transition-all shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                          />
                          <div>
                            <h5 className="font-serif-display font-bold text-[#FFF8F3] text-xs sm:text-sm leading-snug">
                              {item.menuItem.name}
                            </h5>
                            <p className="text-[#E27D60] font-bold text-xs mt-0.5">
                              {formatCurrency(item.totalPrice)}
                            </p>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-[#C4B8B0] hover:text-red-400 p-1.5 rounded-lg bg-[#201B18] border border-white/5 transition-colors cursor-pointer"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </motion.button>
                      </div>

                      {/* Customizations summary tags */}
                      {(item.options.pizzaFlavors || item.options.breadType || item.options.meatDoneness || (item.options.pizzaCrust && item.options.pizzaCrust !== 'Borda Tradicional') || item.options.selectedExtras.length > 0 || item.options.notes) && (
                        <div className="bg-[#201B18] p-2.5 rounded-xl border border-white/5 space-y-1 text-[11px] text-[#C4B8B0]">
                          {item.options.pizzaFlavors && item.options.pizzaFlavors.length > 0 && (
                            <p>
                              🍕 <strong className="text-[#FFF8F3]">
                                {item.options.pizzaFlavors.length === 1 ? 'Sabor:' : 'Sabores:'}
                              </strong>{' '}
                              <span className="text-[#F8D8C8]">
                                {item.options.pizzaFlavors.length === 1
                                  ? item.options.pizzaFlavors[0].name
                                  : item.options.pizzaFlavors.map((f) => `1/2 ${f.name}`).join(' + ')}
                              </span>
                            </p>
                          )}
                          {item.options.breadType && (
                            <p>🥖 <strong className="text-[#FFF8F3]">Pão:</strong> {item.options.breadType}</p>
                          )}
                          {item.options.meatDoneness && (
                            <p>🥩 <strong className="text-[#FFF8F3]">Ponto:</strong> {item.options.meatDoneness}</p>
                          )}
                          {item.options.pizzaCrust && item.options.pizzaCrust !== 'Borda Tradicional' && (
                            <p>🍕 <strong className="text-[#FFF8F3]">Borda:</strong> {item.options.pizzaCrust}</p>
                          )}
                          {item.options.selectedExtras.length > 0 && (
                            <p>
                              ➕ <strong className="text-[#FFF8F3]">Adicionais:</strong>{' '}
                              {item.options.selectedExtras.map((e) => `${e.name} (+${formatCurrency(e.price)})`).join(', ')}
                            </p>
                          )}
                          {item.options.notes && (
                            <p className="text-[#F8D8C8] italic">
                              📝 <strong className="text-[#FFF8F3]">Obs:</strong> "{item.options.notes}"
                            </p>
                          )}
                        </div>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5">
                        <span className="text-[11px] text-[#C4B8B0]">Quantidade:</span>
                        <div className="flex items-center gap-2 bg-[#201B18] border border-white/10 rounded-lg p-0.5">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-[#2A231E] hover:bg-[#352D27] text-[#FFF8F3] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </motion.button>
                          <span className="w-6 text-center font-bold text-xs text-[#FFF8F3]">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-gradient-to-r from-[#E27D60] to-[#D96B43] text-white flex items-center justify-center transition-colors font-bold cursor-pointer"
                          >
                            <Plus className="w-3 h-3 stroke-[3]" />
                          </motion.button>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Delivery or Pickup Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#F8D8C8]">
                Tipo de Atendimento:
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOrderTypeChange('delivery')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition-all cursor-pointer ${
                    orderForm.orderType === 'delivery'
                      ? 'bg-[#E27D60]/15 border-[#E27D60] text-[#F8D8C8] font-bold ring-1 ring-[#E27D60]'
                      : 'bg-[#2A231E] border-white/10 text-[#C4B8B0] hover:text-[#FFF8F3]'
                  }`}
                >
                  <span className="text-lg">🛵</span>
                  <span className="text-xs">Entrega (Delivery)</span>
                  <span className="text-[10px] text-[#F8D8C8] font-semibold">+ {formatCurrency(RESTAURANT_INFO.deliveryFee)}</span>
                </motion.button>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOrderTypeChange('pickup')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition-all cursor-pointer ${
                    orderForm.orderType === 'pickup'
                      ? 'bg-[#E27D60]/15 border-[#E27D60] text-[#F8D8C8] font-bold ring-1 ring-[#E27D60]'
                      : 'bg-[#2A231E] border-white/10 text-[#C4B8B0] hover:text-[#FFF8F3]'
                  }`}
                >
                  <span className="text-lg">🛍️</span>
                  <span className="text-xs">Retirada no Balcão</span>
                  <span className="text-[10px] text-[#25D366] font-semibold">Grátis</span>
                </motion.button>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="bg-[#2A231E] border border-white/10 rounded-2xl p-4 space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF8F3]">
                Seus Dados:
              </h4>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] text-[#C4B8B0] mb-1">
                    Seu Nome Completo: *
                  </label>
                  <input
                    type="text"
                    value={orderForm.customerName}
                    onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] placeholder:text-[#C4B8B0]/50 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#C4B8B0] mb-1">
                    WhatsApp para Contato:
                  </label>
                  <input
                    type="tel"
                    value={orderForm.customerPhone}
                    onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                    placeholder="(15) 99999-9999"
                    className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] placeholder:text-[#C4B8B0]/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Address Fields (only if delivery) */}
              {orderForm.orderType === 'delivery' && (
                <div className="pt-2 border-t border-white/5 space-y-2.5">
                  <span className="text-xs font-bold text-[#F8D8C8] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Endereço de Entrega (Capão Bonito):</span>
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[11px] text-[#C4B8B0] mb-1">Rua / Avenida: *</label>
                      <input
                        type="text"
                        value={orderForm.address.street}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          address: { ...orderForm.address, street: e.target.value }
                        })}
                        placeholder="Ex: Rua Floriano Peixoto"
                        className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] placeholder:text-[#C4B8B0]/50 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#C4B8B0] mb-1">Número: *</label>
                      <input
                        type="text"
                        value={orderForm.address.number}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          address: { ...orderForm.address, number: e.target.value }
                        })}
                        placeholder="Ex: 120"
                        className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] placeholder:text-[#C4B8B0]/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#C4B8B0] mb-1">Bairro em Capão Bonito:</label>
                    <select
                      value={orderForm.address.neighborhood}
                      onChange={(e) => setOrderForm({
                        ...orderForm,
                        address: { ...orderForm.address, neighborhood: e.target.value }
                      })}
                      className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] focus:outline-none"
                    >
                      {NEIGHBORHOODS_CAPAO_BONITO.map((bairro) => (
                        <option key={bairro} value={bairro} className="bg-[#12100E] text-[#FFF8F3]">
                          {bairro}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-[#C4B8B0] mb-1">Complemento:</label>
                      <input
                        type="text"
                        value={orderForm.address.complement || ''}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          address: { ...orderForm.address, complement: e.target.value }
                        })}
                        placeholder="Apto 42 / Bloco B"
                        className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] placeholder:text-[#C4B8B0]/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#C4B8B0] mb-1">Ponto de Referência:</label>
                      <input
                        type="text"
                        value={orderForm.address.reference || ''}
                        onChange={(e) => setOrderForm({
                          ...orderForm,
                          address: { ...orderForm.address, reference: e.target.value }
                        })}
                        placeholder="Próximo à praça..."
                        className="w-full bg-[#12100E] border border-white/10 focus:border-[#E27D60] rounded-xl px-3 py-2 text-xs text-[#FFF8F3] placeholder:text-[#C4B8B0]/50 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="bg-[#2A231E] border border-white/10 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#F8D8C8]">
                Forma de Pagamento:
              </h4>

              <div className="grid grid-cols-3 gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handlePaymentChange('pix')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    orderForm.paymentMethod === 'pix'
                      ? 'bg-[#25D366]/15 border-[#25D366] text-[#25D366] font-bold ring-1 ring-[#25D366]'
                      : 'bg-[#201B18] border-white/10 text-[#C4B8B0]'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-[#25D366]" />
                  <span className="text-xs">PIX</span>
                </motion.button>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handlePaymentChange('cartao_entrega')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    orderForm.paymentMethod === 'cartao_entrega'
                      ? 'bg-[#E27D60]/15 border-[#E27D60] text-[#F8D8C8] font-bold ring-1 ring-[#E27D60]'
                      : 'bg-[#201B18] border-white/10 text-[#C4B8B0]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#E27D60]" />
                  <span className="text-xs">Cartão</span>
                </motion.button>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handlePaymentChange('dinheiro')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    orderForm.paymentMethod === 'dinheiro'
                      ? 'bg-[#E27D60]/15 border-[#E27D60] text-[#F8D8C8] font-bold ring-1 ring-[#E27D60]'
                      : 'bg-[#201B18] border-white/10 text-[#C4B8B0]'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-[#E27D60]" />
                  <span className="text-xs">Dinheiro</span>
                </motion.button>
              </div>

              {/* Cash change field */}
              {orderForm.paymentMethod === 'dinheiro' && (
                <div className="p-2.5 bg-[#201B18] rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="need-change"
                      checked={orderForm.needChange}
                      onChange={(e) => setOrderForm({ ...orderForm, needChange: e.target.checked })}
                      className="rounded accent-[#E27D60]"
                    />
                    <label htmlFor="need-change" className="text-xs text-[#FFF8F3] cursor-pointer">
                      Precisa de troco?
                    </label>
                  </div>
                  {orderForm.needChange && (
                    <input
                      type="text"
                      value={orderForm.changeFor || ''}
                      onChange={(e) => setOrderForm({ ...orderForm, changeFor: e.target.value })}
                      placeholder="Troco para quanto? Ex: R$ 100,00"
                      className="w-full bg-[#12100E] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-[#FFF8F3] focus:outline-none"
                    />
                  )}
                </div>
              )}
            </div>

            {/* General Observations */}
            <div>
              <label className="block text-[11px] text-[#C4B8B0] mb-1">
                Observações Gerais do Pedido (Opcional):
              </label>
              <textarea
                value={orderForm.generalNotes || ''}
                onChange={(e) => setOrderForm({ ...orderForm, generalNotes: e.target.value })}
                placeholder="Ex: Tocar a campainha, deixar na portaria, caprichar no guardanapo..."
                rows={2}
                className="w-full bg-[#2A231E] border border-white/10 focus:border-[#E27D60] rounded-xl p-2.5 text-xs text-[#FFF8F3] placeholder:text-[#C4B8B0]/50 focus:outline-none resize-none"
              />
            </div>

            {/* Validation Errors alert */}
            {formErrors.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-950/60 border border-red-500/50 rounded-xl p-3 space-y-1 text-red-200 text-xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Por favor, complete as informações:</span>
                </div>
                {formErrors.map((err, i) => (
                  <p key={i} className="pl-5">• {err}</p>
                ))}
              </motion.div>
            )}

          </div>
        )}

        {/* Drawer Footer (Summary + Direct WhatsApp Button) */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#12100E] border-t border-white/10 space-y-3 flex-shrink-0">
            
            {/* Calculation details */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#C4B8B0]">
                <span>Subtotal dos itens:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#C4B8B0]">
                <span>Taxa de Entrega:</span>
                <span>{orderForm.orderType === 'delivery' ? formatCurrency(deliveryFee) : 'Grátis (Retirada)'}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-[#FFF8F3] pt-1.5 border-t border-white/10">
                <span>Total a Pagar:</span>
                <span className="text-[#E27D60] font-extrabold text-base sm:text-lg">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* Main WhatsApp Button */}
            <motion.button
              id="btn-submit-whatsapp-order"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              disabled={isSubmitting}
              onClick={validateAndSubmit}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold text-xs uppercase tracking-widest py-4 px-4 rounded-xl shadow-xl transition-all cursor-pointer min-h-[44px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Preparando mensagem para o WhatsApp...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">💬</span>
                  <span>Finalizar no WhatsApp (15) 99705-7138</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <p className="text-[10px] text-center text-[#C4B8B0]">
              Ao clicar, uma mensagem formatada com todos os itens será aberta no seu WhatsApp oficial.
            </p>
          </div>
        )}

      </motion.div>
    </div>
  );
};

