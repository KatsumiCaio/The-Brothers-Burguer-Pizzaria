import { describe, it, expect } from 'vitest';
import { formatCurrency, generateWhatsAppOrderUrl, generateWhatsAppReservationUrl } from './whatsapp';
import { CartItem, OrderForm, MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

describe('whatsapp utils', () => {
  it('formats currency in Brazilian Real (BRL)', () => {
    const formatted = formatCurrency(35.5);
    expect(formatted).toContain('35,50');
    expect(formatted).toContain('R$');
  });

  it('generates a valid sanitized WhatsApp Order URL for delivery', () => {
    const mockMenuItem: MenuItem = {
      id: 'burger-1',
      name: 'Brothers Classic Smash',
      category: 'burguers',
      price: 32.0,
      description: 'Hambúrguer artesanal',
      image: '/assets/burgers.png',
      badge: 'Campeão de Vendas',
    };

    const mockCartItems: CartItem[] = [
      {
        cartItemId: 'item-123',
        menuItem: mockMenuItem,
        quantity: 2,
        unitPrice: 32.0,
        totalPrice: 64.0,
        options: {
          breadType: 'Pão Francês Especial Crocante',
          meatDoneness: 'Ao Ponto (Suculento)',
          selectedExtras: [],
          notes: 'Sem cebola, por favor',
        },
      },
    ];

    const mockOrderForm: OrderForm = {
      customerName: 'Carlos Silva',
      customerPhone: '(15) 99876-5432',
      orderType: 'delivery',
      address: {
        street: 'Rua Nove de Julho',
        number: '450',
        neighborhood: 'Centro',
        complement: 'Apto 12',
        reference: 'Próximo à Praça',
      },
      paymentMethod: 'pix',
      needChange: false,
      changeFor: '',
      generalNotes: 'Campainha com defeito, chamar no portão',
    };

    const subtotal = 64.0;
    const deliveryFee = 7.0;
    const total = 71.0;

    const url = generateWhatsAppOrderUrl(mockCartItems, mockOrderForm, subtotal, deliveryFee, total);

    expect(url).toContain(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`);
    expect(url).toContain('Carlos%20Silva');
    expect(url).toContain('Brothers%20Classic%20Smash');
    expect(url).toContain('Rua%20Nove%20de%20Julho');
    expect(url).toContain('Apto%2012');
    expect(url).toContain('PIX');
  });

  it('generates a valid WhatsApp Order URL with pizza customization', () => {
    const mockPizzaItem: MenuItem = {
      id: 'pizza-grande',
      name: 'Pizza Grande dos Brothers (8 Fatias)',
      category: 'pizzas',
      price: 55.0,
      description: 'Massa de longa fermentação',
      image: '/assets/pizza.png',
      allowsCrustChoice: true,
    };

    const mockCartItems: CartItem[] = [
      {
        cartItemId: 'pizza-item-456',
        menuItem: mockPizzaItem,
        quantity: 1,
        unitPrice: 63.0,
        totalPrice: 63.0,
        options: {
          pizzaSize: 'grande',
          pizzaFlavors: [
            {
              id: 'frango-catupiry',
              name: 'FRANGO C/ CATUPIRY',
              category: 'salgada',
              description: 'Molho, frango e catupiry',
              priceGrande: 55.0,
              priceBroto: 35.0,
              image: '/pizza1.jpg',
            },
            {
              id: 'calabresa-especial',
              name: 'CALABRESA ESPECIAL',
              category: 'salgada',
              description: 'Calabresa e cebola',
              priceGrande: 55.0,
              priceBroto: 35.0,
              image: '/pizza2.jpg',
            },
          ],
          pizzaCrust: 'Borda Vulcão Catupiry Original (+R$ 8,00)',
          selectedExtras: [],
          notes: 'Bem dourada',
        },
      },
    ];

    const mockOrderForm: OrderForm = {
      customerName: 'Juliana Mendes',
      customerPhone: '(15) 99765-4321',
      orderType: 'pickup',
      address: {
        street: 'Av. Brasil',
        number: '100',
        neighborhood: 'Centro',
      },
      paymentMethod: 'cartao_entrega',
      needChange: false,
      changeFor: '',
      generalNotes: '',
    };

    const url = generateWhatsAppOrderUrl(mockCartItems, mockOrderForm, 63.0, 0, 63.0);
    expect(url).toContain(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`);
    expect(url).toContain('Juliana%20Mendes');
    expect(url).toContain('1%2F2%20FRANGO%20C%2F%20CATUPIRY%20%2B%201%2F2%20CALABRESA%20ESPECIAL');
    expect(url).toContain('Borda%20Vulc%C3%A3o%20Catupiry');
  });

  it('generates a valid WhatsApp Reservation URL for Friday Rodizio', () => {
    const url = generateWhatsAppReservationUrl('Mariana Costa', 6, 'Próxima Sexta', '19:30', true);

    expect(url).toContain(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`);
    expect(url).toContain('Mariana%20Costa');
    expect(url).toContain('ROD%C3%8DZIO');
    expect(url).toContain('6%20pessoas');
  });
});
