import { CartItem, OrderForm } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const generateWhatsAppOrderUrl = (
  cartItems: CartItem[],
  orderForm: OrderForm,
  subtotal: number,
  deliveryFee: number,
  total: number
): string => {
  const dateStr = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const lines: string[] = [];

  lines.push(`🍔🍕 *PEDIDO ONLINE - THE BROTHERS* 🍕🍔`);
  lines.push(`_Capão Bonito/SP - ${dateStr}_`);
  lines.push(``);
  lines.push(`👤 *CLIENTE:* ${orderForm.customerName.trim() || 'Cliente'}`);
  lines.push(`📱 *TELEFONE:* ${orderForm.customerPhone.trim() || 'Não informado'}`);
  lines.push(`📍 *MODALIDADE:* ${orderForm.orderType === 'delivery' ? '🛵 Entrega (Delivery em Capão Bonito)' : '🛍️ Retirada no Balcão'}`);

  if (orderForm.orderType === 'delivery') {
    const addr = orderForm.address;
    lines.push(`🏠 *ENDEREÇO DE ENTREGA:*`);
    lines.push(`   • Rua: ${addr.street}, nº ${addr.number}`);
    lines.push(`   • Bairro: ${addr.neighborhood}`);
    if (addr.complement) lines.push(`   • Complemento: ${addr.complement}`);
    if (addr.reference) lines.push(`   • Ref: ${addr.reference}`);
  }

  lines.push(``);
  lines.push(`📋 *ITENS DO PEDIDO:*`);
  lines.push(`──────────────────────────────`);

  cartItems.forEach((item, index) => {
    lines.push(`*${index + 1}. ${item.quantity}x ${item.menuItem.name}* (${formatCurrency(item.totalPrice)})`);
    
    if (item.options.breadType) {
      lines.push(`   🥪 Pão: _${item.options.breadType}_`);
    }
    if (item.options.meatDoneness) {
      lines.push(`   🥩 Ponto: _${item.options.meatDoneness}_`);
    }
    if (item.options.pizzaCrust && item.options.pizzaCrust !== 'Borda Tradicional') {
      lines.push(`   🍕 Borda: _${item.options.pizzaCrust}_`);
    }
    if (item.options.selectedExtras && item.options.selectedExtras.length > 0) {
      const extrasStr = item.options.selectedExtras
        .map(e => `+ ${e.name} (${formatCurrency(e.price)})`)
        .join(', ');
      lines.push(`   ➕ Adicionais: _${extrasStr}_`);
    }
    if (item.options.notes && item.options.notes.trim() !== '') {
      lines.push(`   📝 Obs: _${item.options.notes.trim()}_`);
    }
    lines.push(``);
  });

  lines.push(`──────────────────────────────`);
  lines.push(`💵 *RESUMO FINANCEIRO:*`);
  lines.push(`   • Subtotal dos itens: ${formatCurrency(subtotal)}`);
  if (orderForm.orderType === 'delivery') {
    lines.push(`   • Taxa de entrega: ${formatCurrency(deliveryFee)}`);
  } else {
    lines.push(`   • Taxa de entrega: Grátis (Retirada)`);
  }
  lines.push(`   ⭐ *TOTAL GERAL: ${formatCurrency(total)}*`);
  lines.push(``);

  lines.push(`💳 *FORMA DE PAGAMENTO:*`);
  if (orderForm.paymentMethod === 'pix') {
    lines.push(`   • ⚡ Chave PIX (Favor enviar a chave/QR Code para pagamento)`);
  } else if (orderForm.paymentMethod === 'cartao_entrega') {
    lines.push(`   • 💳 Cartão de Débito / Crédito na entrega/retirada (levar maquininha)`);
  } else {
    lines.push(`   • 💵 Dinheiro`);
    if (orderForm.needChange && orderForm.changeFor) {
      lines.push(`   • Troco para: ${orderForm.changeFor}`);
    }
  }

  if (orderForm.generalNotes && orderForm.generalNotes.trim() !== '') {
    lines.push(``);
    lines.push(`💬 *OBSERVAÇÕES GERAIS:*`);
    lines.push(`   ${orderForm.generalNotes.trim()}`);
  }

  lines.push(``);
  lines.push(`_Por favor, confirme se receberam este pedido e o tempo estimado! Obrigado!_`);

  const fullText = lines.join('\n');
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(fullText)}`;
};

export const generateWhatsAppReservationUrl = (
  name?: string,
  peopleCount?: number,
  date?: string,
  time?: string,
  isRodizio?: boolean
): string => {
  let message = `Olá, The Brothers Burguer e Pizzaria! Gostaria de fazer uma reserva de mesa.\n\n`;
  if (isRodizio) {
    message = `🔥 *RESERVA DE MESA - RODÍZIO DE SEXTA-FEIRA*\n\nOlá, The Brothers! Gostaria de garantir minha mesa para o Rodízio de Sexta às 19h!\n\n`;
  }
  if (name) message += `• Nome do responsável: ${name}\n`;
  if (peopleCount) message += `• Quantidade de pessoas: ${peopleCount} pessoas\n`;
  if (date) message += `• Data desejada: ${date}\n`;
  if (time) message += `• Horário estimado: ${time}\n`;
  message += `\nPoderiam confirmar a disponibilidade, por favor?`;

  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
