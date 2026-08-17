import { MenuItem, CustomerReview } from '../types';

export const RESTAURANT_INFO = {
  name: "The Brothers Burguer e Pizzaria",
  shortName: "The Brothers",
  since: "2019",
  whatsappNumber: "5515997057138",
  whatsappFormatted: "(15) 99705-7138",
  instagram: "@the_brothersburgepizzaria",
  instagramUrl: "https://instagram.com/the_brothersburgepizzaria",
  address: "Av. Amazônas, 384 - Vila Bela Vista, Capão Bonito - SP",
  city: "Capão Bonito - SP",
  rating: "4.8",
  reviewsCount: "47+",
  googleMapsUrl: "https://maps.google.com/?q=Av.+Amaz%C3%B4nas,+384+-+Vila+Bela+Vista,+Cap%C3%A3o+Bonito+-+SP",
  openingHours: "Terça a Domingo: 18h30 às 23h30 | Sexta Rodízio a partir das 19h",
  rodizioDay: "Toda Sexta-feira",
  rodizioTime: "A partir das 19h00",
  deliveryFee: 5.00, // Taxa padrão em Capão Bonito
};

export const BURGER_EXTRAS = [
  { id: 'extra-piscininha', name: 'Piscininha de Cheddar Cremoso Extra', price: 15.00 },
  { id: 'extra-bacon', name: 'Fatias de Bacon Artesanal Crocante', price: 5.00 },
  { id: 'extra-cheddar', name: 'Cheddar Cremoso Extra', price: 4.50 },
  { id: 'extra-caramelized-onion', name: 'Cebola Caramelizada Especial', price: 3.50 },
  { id: 'extra-egg', name: 'Ovo Frito na Manteiga', price: 3.00 },
  { id: 'extra-patty', name: 'Hambúrguer 150g Extra', price: 10.00 },
  { id: 'extra-mayo', name: 'Pote de Maionese Especial The Brothers (50ml)', price: 3.50 },
  { id: 'extra-mayo-bacon', name: 'Pote de Maionese de Bacon da Casa (50ml)', price: 4.00 }
];

export const PIZZA_EXTRAS = [
  { id: 'extra-catupiry-crust', name: 'Borda Vulcão Catupiry Original', price: 8.00 },
  { id: 'extra-cheddar-crust', name: 'Borda Vulcão Cheddar Cremoso', price: 8.00 },
  { id: 'extra-bacon-bits', name: 'Bacon em Cubos Salpicado', price: 6.00 }
];

export const MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // 1. COMBOS E MAIS PEDIDOS (Compre e Ganhe Bebida)
  // ==========================================
  {
    id: 'combo-familia',
    name: 'Combo Família (4 Lanches + Kuat 2L + Fritas Grande)',
    category: 'mais_pedidos',
    price: 115.00,
    description: 'Quatro smash simples + Guaraná Kuat 2 litros bem gelado + porção grande de batatas fritas crocantes. Cada smash simples contém: pão francês ou brioche, molho brothers, hambúrguer de costela, queijo cheddar, cebola roxa e alface americano.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '👨‍👩‍👧‍👦 Campeão da Galera',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'combo-smash-simples',
    name: 'Smash Simples + Suco Natural de Laranja 300ml',
    category: 'mais_pedidos',
    price: 31.90,
    description: 'Acompanha porção de batatas fritas crocantes + 1 suco natural de laranja 300ml espremido na hora. Lanche com pão, molho brothers, hambúrguer bovino, queijo cheddar, cebola roxa e alface americano.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🥤 Desconto na Bebida',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'combo-smash-bacon',
    name: 'Smash Bacon + Suco Natural de Laranja 300ml',
    category: 'mais_pedidos',
    price: 33.90,
    description: 'Acompanha batatas fritas + 1 suco natural de laranja 300ml. Pão, molho brothers, hambúrguer bovino, queijo cheddar, fatias de bacon crocante, cebola roxa e alface americano.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🥓 Sucesso de Vendas',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'combo-smash-duplo',
    name: 'Smash Duplo + Suco Natural de Laranja 300ml',
    category: 'mais_pedidos',
    price: 35.90,
    description: 'Acompanha batatas fritas + 1 suco natural de laranja 300ml. Pão, molho brothers, dois hambúrgueres bovinos smash, queijo cheddar duplo, cebola roxa e alface americano.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'combo-smash-duplo-bacon',
    name: 'Smash Duplo Bacon + Suco Natural de Laranja 300ml',
    category: 'mais_pedidos',
    price: 37.90,
    description: 'Acompanha batatas fritas + 1 suco natural de laranja 300ml. Pão, molho brothers, dois hambúrgueres bovinos, queijo cheddar, dobro de bacon crocante, cebola roxa e alface americano.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'combo-smash-brothers',
    name: 'Smash Brothers + Suco Natural de Laranja 300ml',
    category: 'mais_pedidos',
    price: 39.90,
    description: 'Acompanha batatas fritas + 1 suco natural de laranja 300ml. Pão, molho brothers, dois hambúrgueres bovinos, queijo cheddar, bacon artesanal, ovo frito, cebola roxa, picles crocante e alface americano.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '👑 Especial da Casa',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'combo-picanha-brothers',
    name: 'Picanha Brothers + Suco Natural de Laranja 300ml',
    category: 'mais_pedidos',
    price: 45.90,
    description: 'Acompanha batatas fritas + 1 suco natural de laranja 300ml. Pão artesanal, maionese verde da casa, hambúrguer de picanha 150G, queijo cheddar, cebola caramelizada no molho barbecue, bacon e picles.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🥩 Picanha Nobre 150g',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'combo-smash-kids',
    name: 'Smash Kids + Fritas + Danoninho + Suco Laranja',
    category: 'mais_pedidos',
    price: 30.90,
    description: 'Pão, molho brothers, hambúrguer bovino e queijo cheddar derretido. Acompanha porção de batatas fritas crocantes, 1 Danoninho e 1 suco natural de laranja 300ml.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'combo-fininho-brothers',
    name: 'Fininho Brothers + Suco Natural de Laranja 300ml',
    category: 'mais_pedidos',
    price: 26.90,
    description: 'Pão, molho brothers, hambúrguer bovino e queijo cheddar + 1 suco natural de laranja 300ml (não acompanha fritas).',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },

  // ==========================================
  // 2. BURGUER ARTESANAL (Acompanha Fritas)
  // ==========================================
  {
    id: 'burg-fininho',
    name: 'Fininho Brothers',
    category: 'burguers',
    price: 20.90,
    description: 'Pão, molho brothers, hambúrguer bovino suculento e queijo cheddar derretido. (Atenção: este item não acompanha fritas).',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-kids',
    name: 'Smash Kids (Acompanha Fritas + Danoninho)',
    category: 'burguers',
    price: 24.90,
    description: 'Pão, molho brothers, hambúrguer bovino e queijo cheddar derretido. Acompanha porção individual de batata frita e 1 potinho de Danoninho.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-smash-simples',
    name: 'Smash Simples (Acompanha Fritas)',
    category: 'burguers',
    price: 25.90,
    description: 'Pão (francês ou brioche), molho brothers, hambúrguer bovino, queijo cheddar derretido, cebola roxa fresca e alface americano crocante. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-smash-bacon',
    name: 'Smash Bacon (Acompanha Fritas)',
    category: 'burguers',
    price: 27.90,
    description: 'Pão, molho brothers, hambúrguer bovino, queijo cheddar, fatias crocantes de bacon artesanal, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-smash-duplo',
    name: 'Smash Duplo (Acompanha Fritas)',
    category: 'burguers',
    price: 29.90,
    description: 'Pão, molho brothers, dois hambúrgueres bovinos smash com crosta crocante, queijo cheddar duplo derretido, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-smash-duplo-bacon',
    name: 'Smash Duplo Bacon (Acompanha Fritas)',
    category: 'burguers',
    price: 31.90,
    description: 'Pão, molho brothers, dois hambúrgueres bovinos smash, queijo cheddar duplo, muito bacon crocante, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🔥 Campeão de Vendas',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-smash-brothers',
    name: 'Smash Brothers (Acompanha Fritas)',
    category: 'burguers',
    price: 33.90,
    description: 'Pão, molho brothers, dois hambúrgueres bovinos smash, queijo cheddar, tiras de bacon artesanal, ovo frito na manteiga, cebola roxa, picles crocante e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '⭐ Clássico dos Brothers',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-picanha-brothers',
    name: 'Picanha Brothers (Acompanha Fritas)',
    category: 'burguers',
    price: 35.90,
    description: 'Pão especial, maionese verde artesanal da casa, hambúrguer nobre de picanha 150G, queijo cheddar, cebola caramelizada com molho barbecue, bacon e picles. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🥩 Picanha 150g',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-pig-simples',
    name: 'Pig Simples (Acompanha Fritas)',
    category: 'burguers',
    price: 28.90,
    description: 'Pão, molho brothers, hambúrguer suíno artesanal 150G temperado com ervas, queijo cheddar derretido, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-pig-bacon',
    name: 'Pig Bacon (Acompanha Fritas)',
    category: 'burguers',
    price: 30.90,
    description: 'Pão, molho brothers, hambúrguer suíno 150G, queijo cheddar derretido, fatias de bacon crocante, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-pig-brothers',
    name: 'Pig Brothers (Acompanha Fritas)',
    category: 'burguers',
    price: 32.90,
    description: 'Pão, molho brothers, hambúrguer suíno 150G, queijo cheddar, bacon crocante, cebola caramelizada, ovo frito e picles. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-top-brothers',
    name: 'Top Brothers (Acompanha Fritas)',
    category: 'burguers',
    price: 33.90,
    description: 'Pão, molho brothers, hambúrguer bovino 150G suculento, queijo cheddar derretido, farofa crocante de bacon, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-smash-frango',
    name: 'Smash Frango (Acompanha Fritas)',
    category: 'burguers',
    price: 25.90,
    description: 'Pão, molho brothers, hambúrguer de frango empanado crocante, queijo cheddar derretido, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-smash-duplo-frango',
    name: 'Smash Duplo Frango (Acompanha Fritas)',
    category: 'burguers',
    price: 30.90,
    description: 'Pão, molho brothers, dois hambúrgueres de frango crocantes, queijo cheddar duplo, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-smash-salada',
    name: 'Smash Salada (Acompanha Fritas)',
    category: 'burguers',
    price: 26.90,
    description: 'Pão, molho brothers, hambúrguer bovino, queijo cheddar derretido, alface americano fresco e fatias de tomate selecionado. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },

  // ==========================================
  // 3. BURGUER ESPECIAL (Acompanha Fritas)
  // ==========================================
  {
    id: 'esp-mega-bacon',
    name: 'Mega Bacon (Acompanha Fritas)',
    category: 'burguer_especial',
    price: 27.90,
    description: 'Pão, molho barbecue artesanal, hambúrguer bovino, quantidade extra de bacon crocante, queijo cheddar e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🥓 Barbecue & Bacon',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'esp-pig-bbq',
    name: 'Pig BBQ (Acompanha Fritas)',
    category: 'burguer_especial',
    price: 28.90,
    description: 'Pão, molho barbecue artesanal, hambúrguer suíno 150G, queijo cheddar derretido, alface americano fresco e tiras de bacon. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'esp-burguer-bbq',
    name: 'Burguer BBQ (Acompanha Fritas)',
    category: 'burguer_especial',
    price: 25.90,
    description: 'Pão, molho barbecue, hambúrguer bovino, queijo cheddar derretido, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'esp-big-simples',
    name: 'Big Simples (Acompanha Fritas)',
    category: 'burguer_especial',
    price: 29.90,
    description: 'Pão artesanal, maionese especial de bacon da casa, hambúrguer bovino alto de 150G, queijo cheddar derretido, alface e cebola roxa. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'esp-big-bacon',
    name: 'Big Bacon (Acompanha Fritas)',
    category: 'burguer_especial',
    price: 32.90,
    description: 'Pão artesanal, maionese especial de bacon da casa, hambúrguer bovino 150G, dobro de bacon crocante, queijo cheddar, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🥓 Maionese de Bacon',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'esp-big-duplo-bacon',
    name: 'Big Duplo Bacon (Acompanha Fritas)',
    category: 'burguer_especial',
    price: 38.90,
    description: 'Pão artesanal, maionese de bacon da casa, 2 hambúrgueres bovinos de 150G (300g total de blend), muito queijo cheddar derretido, cebola roxa e alface americano. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '💥 300g de Carne',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'esp-cremosao',
    name: 'Cremosão (Acompanha Fritas)',
    category: 'burguer_especial',
    price: 32.90,
    description: 'Pão artesanal selado na manteiga, generosa piscina de creme de cheddar especial da casa com farofa crocante de bacon e hambúrguer bovino suculento 150G. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🧀 Muito Cheddar & Bacon',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'esp-smash-triplo',
    name: 'Smash Triplo (Acompanha Fritas)',
    category: 'burguer_especial',
    price: 35.90,
    description: 'Pão, molho brothers, três hambúrgueres bovinos smash prensados na chapa quente, triplo queijo cheddar derretido, cebola caramelizada e fatias de bacon crocante. Acompanha batata frita.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🚀 3 Blends Smash',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },

  // ==========================================
  // 4. PIZZAS DOS BROTHERS (Massa Artesanal de Fermentação Longa)
  // ==========================================
  {
    id: 'pizza-grande',
    name: 'Pizza Grande dos Brothers (Até 8 Fatias / 2 Sabores)',
    category: 'pizzas',
    price: 55.00,
    description: 'Massa artesanal leve de longa fermentação, molho pelati italiano fresco e até 2 sabores à sua escolha (Frango c/ Catupiry, Calabresa Especial, Quatro Queijos, Costela c/ Barbecue, Margherita, Portuguesa, Sensação de Morango, etc.). Aceita Borda Vulcão recheada!',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🍕 Até 2 Sabores',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-broto',
    name: 'Pizza Broto dos Brothers (Até 4 Fatias / 1 Sabor)',
    category: 'pizzas',
    price: 35.00,
    description: 'Pizza individual artesanal com 4 fatias no sabor de sua preferência (salgada ou doce). Massa aerada com borda dourada e crocante.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: 'Individual 4 Fatias',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-frango-catupiry',
    name: 'Pizza Frango com Catupiry Original',
    category: 'pizzas',
    price: 58.00,
    description: 'Molho de tomate pelati fresco, muçarela nobre derretida, peito de frango desfiado suculento temperado com ervas finas e generosa cobertura de autêntico Catupiry cremoso.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-calabresa',
    name: 'Pizza Calabresa Especial com Cebola',
    category: 'pizzas',
    price: 55.00,
    description: 'Molho de tomate, muçarela de primeira linha, fatias selecionadas de calabresa defumada artesanal, rodelas de cebola fresca, azeitonas pretas e orégano.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-costela-brothers',
    name: 'Pizza Costela dos Brothers & Barbecue',
    category: 'pizzas',
    price: 65.00,
    description: 'Massa artesanal, molho pelati italiano, muçarela, costela bovina desfiada marinada lentamente na cerveja preta, cebola roxa, cubos de bacon crocante e finalizada com fio de barbecue.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🔥 Criação do Chef',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-quatro-queijos',
    name: 'Pizza Quatro Queijos Nobres',
    category: 'pizzas',
    price: 62.00,
    description: 'Molho italiano, blend harmônico de muçarela artesanal, queijo provolone defumado, queijo gorgonzola suave e autêntico Catupiry cremoso.',
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'pizza-doce-sensacao',
    name: 'Pizza Doce Sensação de Morango',
    category: 'pizzas',
    price: 48.00,
    description: 'Massa fina crocante coberta com chocolate ao leite Nestlé derretido, fatias fartas de morangos frescos colhidos no dia e granulado de chocolate nobre.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🍓 Mais Pedida de Doce',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },

  // ==========================================
  // 5. PORÇÕES & PISCININHA DE CHEDDAR
  // ==========================================
  {
    id: 'porc-piscininha-cheddar',
    name: 'Piscininha de Cheddar (NOVIDADE!)',
    category: 'porcoes',
    price: 15.00,
    description: 'O valor base se refere à famosa piscininha de cheddar cremoso e quentinho! Perfeita para você mergulhar seu lanche ou sua porção de batatas fritas.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🧀 NOVIDADE EXCLUSIVA'
  },
  {
    id: 'porc-batata-frita',
    name: 'Porção de Batata Frita Tradicional',
    category: 'porcoes',
    price: 30.00,
    description: 'Porção generosa de batatas fritas crocantes por fora e macias por dentro, sequinhas e servidas com molho da casa.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'porc-batata-cheddar-bacon',
    name: 'Porção de Batata com Cheddar e Bacon',
    category: 'porcoes',
    price: 35.00,
    description: 'Batatas fritas crocantes cobertas com generosa camada de queijo cheddar cremoso e cubos crocantes de bacon artesanal.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🔥 Mais Pedida'
  },
  {
    id: 'porc-batata-chips',
    name: 'Porção de Batata Chips Artesanal',
    category: 'porcoes',
    price: 35.00,
    description: 'Lâminas finíssimas de batata selecionada, fatiadas artesanalmente e fritas até atingirem crocância perfeita.',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'porc-batata-cream',
    name: 'Porção de Batata Cream (Cream Cheese)',
    category: 'porcoes',
    price: 40.00,
    description: 'Batata frita crocante servida com requeijão cream cheese cremoso e temperos especiais da casa.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'porc-anel-cebola',
    name: 'Porção de Anel de Cebola (Onion Rings)',
    category: 'porcoes',
    price: 30.00,
    description: 'Anéis de cebola selecionados, empanados em farinha especial crocante e dourados na hora, servidos com molho da casa.',
    image: 'https://images.unsplash.com/photo-1639024471287-035186f55480?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'porc-batata-3-queijos',
    name: 'Porção de Batata com 3 Queijos & Bacon',
    category: 'porcoes',
    price: 45.00,
    description: 'Batata frita crocante coberta com blend gratinado de 3 queijos especiais derretidos e farofa crocante de bacon.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'porc-isca-frango',
    name: 'Porção de Isca de Frango Crocante',
    category: 'porcoes',
    price: 35.00,
    description: 'Tiras suculentas de peito de frango selecionado, marinadas em temperos da casa e empanadas em crosta crocante com molho especial.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'porc-batata-costela',
    name: 'Porção de Batata, Cheddar & Costela Bovina Desfiada',
    category: 'porcoes',
    price: 45.00,
    description: 'A porção mais famosa e caprichada da casa! Batatas fritas crocantes com cheddar cremoso e generosa porção de costela bovina desfiada lentamente no fogo.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '👑 Suprema da Casa'
  },

  // ==========================================
  // 6. BEBIDAS (Refrigerantes, Sucos & Cervejas)
  // ==========================================
  {
    id: 'beb-coca-2l',
    name: 'Coca-Cola 2 Litros (Original)',
    category: 'bebidas',
    price: 14.00,
    description: 'Garrafa pet de 2 Litros servida bem gelada.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'beb-guarana-kuat-2l',
    name: 'Guaraná Kuat 2 Litros',
    category: 'bebidas',
    price: 10.00,
    description: 'Garrafa 2 Litros de Guaraná Kuat bem gelada.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'beb-fanta-uva-2l',
    name: 'Fanta Uva 2 Litros',
    category: 'bebidas',
    price: 14.00,
    description: 'Garrafa 2 Litros de Fanta Uva bem gelada.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-coca-lata',
    name: 'Coca-Cola Original (Lata 350ml)',
    category: 'bebidas',
    price: 6.00,
    description: 'Lata 350ml servida estupidamente gelada.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-guarana-antarctica-lata',
    name: 'Guaraná Antarctica (Lata 350ml)',
    category: 'bebidas',
    price: 7.00,
    description: 'Lata 350ml de Guaraná Antarctica bem gelada.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-fanta-laranja-lata',
    name: 'Fanta Laranja (Lata 350ml)',
    category: 'bebidas',
    price: 7.00,
    description: 'Lata 350ml gelada sabor laranja.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-sprite-lata',
    name: 'Sprite (Lata 350ml)',
    category: 'bebidas',
    price: 7.00,
    description: 'Lata 350ml de Sprite limão refrescante.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-suco-laranja',
    name: 'Suco Natural de Laranja (300ml)',
    category: 'bebidas',
    price: 8.00,
    description: 'Suco 100% natural espremido na hora com laranjas frescas selecionadas.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'beb-suco-limao',
    name: 'Suco Natural de Limão (300ml)',
    category: 'bebidas',
    price: 8.00,
    description: 'Limonada natural feita na hora bem gelada e refrescante.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-suco-maracuja',
    name: 'Suco de Maracujá da Fruta (300ml)',
    category: 'bebidas',
    price: 8.00,
    description: 'Suco natural feito com polpa fresca de maracujá.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-suco-morango',
    name: 'Suco de Morango Natural (300ml)',
    category: 'bebidas',
    price: 8.00,
    description: 'Suco cremoso de morangos frescos batidos na hora.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-suco-abacaxi',
    name: 'Suco de Abacaxi Natural (300ml)',
    category: 'bebidas',
    price: 8.00,
    description: 'Suco natural de abacaxi selecionado, servido bem gelado.',
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-agua-sem-gas',
    name: 'Água Mineral sem Gás (500ml)',
    category: 'bebidas',
    price: 4.00,
    description: 'Garrafinha de 500ml de água mineral límpida e fresca.',
    image: 'https://images.unsplash.com/photo-1550505095-81378a674395?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-agua-com-gas',
    name: 'Água Mineral com Gás (500ml)',
    category: 'bebidas',
    price: 4.00,
    description: 'Garrafinha de 500ml de água mineral gaseificada.',
    image: 'https://images.unsplash.com/photo-1550505095-81378a674395?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-h2oh-limao',
    name: 'H2OH! Limão 500ml (Zero Açúcar)',
    category: 'bebidas',
    price: 8.00,
    description: 'Bebida levemente gaseificada com suco de limão e zero calorias.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-h2oh-limoneto',
    name: 'H2OH! Limoneto 500ml (Zero Açúcar)',
    category: 'bebidas',
    price: 8.00,
    description: 'Refrigerante de baixa caloria sabor limoneto super refrescante.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-delvalle-kapo-morango',
    name: 'Del Valle Kapo Morango (200ml)',
    category: 'bebidas',
    price: 6.00,
    description: 'Suquinho de caixinha Kapo sabor morango favorito das crianças.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-delvalle-kapo-uva',
    name: 'Del Valle Kapo Uva (200ml)',
    category: 'bebidas',
    price: 6.00,
    description: 'Suquinho de caixinha Kapo sabor uva.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-delvalle-15l-uva',
    name: 'Del Valle 1,5L Uva',
    category: 'bebidas',
    price: 10.00,
    description: 'Garrafa 1,5L de néctar Del Valle sabor uva servida gelada.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-delvalle-15l-laranja',
    name: 'Del Valle 1,5L Laranja',
    category: 'bebidas',
    price: 10.00,
    description: 'Garrafa 1,5L de néctar Del Valle sabor laranja servida gelada.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-corona-long',
    name: 'Cerveja Corona Extra Long Neck (330ml)',
    category: 'bebidas',
    price: 12.00,
    description: 'Garrafa 330ml servida estupidamente gelada com fatia de limão tahiti fresco.',
    image: 'https://images.unsplash.com/photo-1608270199144-8d48a30647b2?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🍺 Cerveja Premium'
  },

  // ==========================================
  // 7. SOBREMESAS & DOCES
  // ==========================================
  {
    id: 'doc-pudimzim',
    name: 'Pudimzim Tradicional Artesanal',
    category: 'doces',
    price: 17.00,
    description: 'O famoso pudim de leite condensado artesanal no potinho da casa, super lisinho, cremoso e com generosa calda de caramelo dourado.',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🍮 Sobremesa da Casa'
  },
  {
    id: 'doc-suflair',
    name: 'Chocolate Nestlé Suflair (Ao Leite)',
    category: 'doces',
    price: 7.50,
    description: 'Barra individual de chocolate aerado ao leite Nestlé Suflair que derrete na boca.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'doc-5star',
    name: 'Chocolate 5Star (Caramelo & Biscoito)',
    category: 'doces',
    price: 6.00,
    description: 'Barra de chocolate recheada com caramelo macio e pedacinhos crocantes de biscoito.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'doc-trento',
    name: 'Chocolate Trento Tradicional',
    category: 'doces',
    price: 4.00,
    description: 'Wafer crocante com recheio cremoso e cobertura de chocolate ao leite nobre.',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'doc-trident-tutti',
    name: 'Trident Tutti-Frutti (Sem Açúcar)',
    category: 'doces',
    price: 4.00,
    description: 'Goma de mascar sem açúcar sabor tutti-frutti.',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'doc-trident-menta',
    name: 'Trident Menta (Sem Açúcar)',
    category: 'doces',
    price: 4.00,
    description: 'Goma de mascar sem açúcar sabor menta refrescante.',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'doc-trident-melancia',
    name: 'Trident Melancia (Sem Açúcar)',
    category: 'doces',
    price: 4.00,
    description: 'Goma de mascar sem açúcar sabor melancia.',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80'
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'mais_pedidos' as const, label: 'Combos & Promoções', icon: 'Flame', subtitle: 'Combo Família & Lanche + Suco' },
  { id: 'burguers' as const, label: 'Burguer Artesanal', icon: 'UtensilsCrossed', subtitle: 'Acompanha Fritas (Smash & Pig)' },
  { id: 'burguer_especial' as const, label: 'Burguer Especial', icon: 'Sparkles', subtitle: 'Mega Bacon, Cremosão & Triplo' },
  { id: 'pizzas' as const, label: 'Pizzas dos Brothers', icon: 'Pizza', subtitle: 'Grande (8 fatias) e Broto (4 fatias)' },
  { id: 'porcoes' as const, label: 'Porções & Cheddar', icon: 'Layers', subtitle: 'Piscininha de Cheddar, Fritas & Costela' },
  { id: 'bebidas' as const, label: 'Bebidas & Cerveja', icon: 'Beer', subtitle: 'Refrigerantes, Sucos Naturais & Corona' },
  { id: 'doces' as const, label: 'Doces & Sobremesas', icon: 'Sparkles', subtitle: 'Pudimzim Tradicional, Chocolates & Trident' },
];

export const REVIEWS_DATA: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Ana Beatriz',
    rating: 5,
    date: 'Avaliação Google Maps',
    comment: 'Meu lugar favorito pra lanches ❤️ Comida impecável, hambúrguer delicioso com ponto perfeito e atendimento incrível da equipe!',
    highlight: 'Comida impecável e atendimento incrível',
    location: 'Capão Bonito/SP'
  },
  {
    id: 'rev-2',
    name: 'Abner Rocha',
    rating: 5,
    date: 'Avaliação Google Maps',
    comment: 'Ponto certo, sabor ótimo, ambiente e atendimento top! Pedir o lanche no pão francês especial fica ainda mais delicioso e crocante!',
    highlight: 'No pão francês fica ainda mais delicioso!',
    location: 'Capão Bonito/SP'
  },
  {
    id: 'rev-3',
    name: 'Ronaldo Santos',
    rating: 5,
    date: 'Avaliação Google Maps',
    comment: 'O ambiente é impecável, aconchegante e bem cuidado, criando uma atmosfera perfeita para qualquer ocasião. Pizzas com massa leve e equipe atenciosa!',
    highlight: 'Ambiente acolhedor e pizza maravilhosa',
    location: 'Capão Bonito/SP'
  },
  {
    id: 'rev-4',
    name: 'Camila Prado',
    rating: 5,
    date: 'Avaliação Google Maps',
    comment: 'O rodízio de sexta-feira é surreal! Variedade incrível de pizzas salgadas e doces e os mini hambúrgueres são espetaculares. Super recomendo!',
    highlight: 'Rodízio de sexta-feira espetacular',
    location: 'Capão Bonito/SP'
  }
];

export const NEIGHBORHOODS_CAPAO_BONITO = [
  'Vila Bela Vista (Mesmo Bairro)',
  'Centro',
  'Vila São Paulo',
  'Jardim Europa',
  'Vila Nova Capão Bonito',
  'Vila Cruzeiro',
  'Jardim Alvorada',
  'Vila Maria',
  'Jardim Vale Verde',
  'Outro Bairro de Capão Bonito'
];
