export type MenuCategory = 
  | 'mais_pedidos' 
  | 'burguers' 
  | 'burguer_especial'
  | 'pizzas' 
  | 'porcoes' 
  | 'bebidas'
  | 'doces';

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  popular?: boolean;
  badge?: string;
  allowsBreadChoice?: boolean; // Pão Brioche ou Francês
  allowsMeatDoneness?: boolean; // Ponto da carne
  allowsCrustChoice?: boolean; // Borda Recheada para pizza
  availableExtras?: ExtraOption[];
  isVegetarian?: boolean;
  spicy?: boolean;
}

export interface CartItemOption {
  breadType?: 'Pão Brioche Selado na Manteiga' | 'Pão Francês Especial Crocante';
  meatDoneness?: 'Ao Ponto (Suculento)' | 'Bem Passado' | 'Ao Ponto para Mal Passado';
  pizzaCrust?: 'Borda Tradicional' | 'Borda Vulcão Catupiry Original (+R$ 8,00)' | 'Borda Vulcão Cheddar (+R$ 8,00)';
  selectedExtras: ExtraOption[];
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  options: CartItemOption;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'delivery' | 'pickup';
export type PaymentMethod = 'pix' | 'cartao_entrega' | 'dinheiro';

export interface DeliveryAddress {
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  reference?: string;
}

export interface OrderForm {
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  needChange?: boolean;
  changeFor?: string;
  generalNotes?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  highlight?: string;
  location: string;
}
