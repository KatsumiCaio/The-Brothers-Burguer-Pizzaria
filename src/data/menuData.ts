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
  openingHours: "Terça a Domingo: 18h30 às 23h30 | Almoço Executivo a partir das 11h",
  rodizioDay: "Toda Sexta-feira",
  rodizioTime: "A partir das 19h00",
  deliveryFee: 5.00, // Taxa padrão em Capão Bonito
};

export const BURGER_EXTRAS = [
  { id: 'extra-bacon', name: 'Bacon Artesanal Crocante Extra', price: 5.00 },
  { id: 'extra-cheddar', name: 'Cheddar Cremoso Extra', price: 4.50 },
  { id: 'extra-cheese', name: 'Queijo Muçarela Derretido', price: 4.00 },
  { id: 'extra-caramelized-onion', name: 'Cebola Caramelizada na Cerveja', price: 3.50 },
  { id: 'extra-egg', name: 'Ovo Frito na Manteiga', price: 3.00 },
  { id: 'extra-patty', name: 'Blend 150g Extra', price: 10.00 },
  { id: 'extra-mayo', name: 'Pote Maionese Especial da Casa (50ml)', price: 3.50 }
];

export const PIZZA_EXTRAS = [
  { id: 'extra-catupiry-crust', name: 'Borda Recheada Catupiry Original', price: 8.00 },
  { id: 'extra-cheddar-crust', name: 'Borda Recheada Cheddar Cremoso', price: 8.00 },
  { id: 'extra-chocolate-crust', name: 'Borda Recheada Chocolate ao Leite', price: 9.00 },
  { id: 'extra-bacon-bits', name: 'Bacon em Cubos Salpicado', price: 6.00 }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- MAIS PEDIDOS / DESTAQUES ---
  {
    id: 'bro-01',
    name: 'The Brothers Classic (No Pão Francês)',
    category: 'mais_pedidos',
    price: 33.90,
    description: 'O queridinho da casa! Pão francês especial crocante selado na chapa, blend bovino artesanal 160g suculento, muçarela derretida, fatias de bacon crocante, alface americana, tomate fresco e a inconfundível maionese secreta The Brothers.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '⭐ Campeão de Vendas',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'bro-02',
    name: 'Pizza Especial The Brothers',
    category: 'mais_pedidos',
    price: 64.90,
    description: 'Massa artesanal de longa fermentação, molho pelati italiano rústico, muçarela nobre, tiras de costela desfiada temperada na cerveja preta, cebola roxa, bacon crocante em cubos e finalizada com fio de barbecue artesanal e orégano fresco.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🔥 Criação do Chef',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'bro-03',
    name: 'Smash Duplo Cheddar & Bacon',
    category: 'mais_pedidos',
    price: 31.90,
    description: 'Dois blends smash ultra crocantes de 90g (180g total), com aquela crostinha perfeita prensada na chapa quente, generosas fatias de queijo cheddar inglês derretido, tiras de bacon crocante e cebola caramelizada no pão brioche amanteigado.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '💥 Super Crocante',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'bro-04',
    name: 'Pizza Margherita Di Napoli',
    category: 'mais_pedidos',
    price: 54.90,
    description: 'Massa artesanal leve e aerada, molho de tomates frescos selecionados, muçarela de primeira linha derretida, rodelas de tomates maduros, folhas frescas de manjericão colhidas no dia, queijo parmesão ralado e azeite extravirgem.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🌿 Tradição',
    allowsCrustChoice: true,
    isVegetarian: true,
    availableExtras: PIZZA_EXTRAS
  },

  // --- HAMBÚRGUERES ARTESANAIS ---
  {
    id: 'burg-01',
    name: 'The Brothers Grand Bacon',
    category: 'burguers',
    price: 36.90,
    description: 'Pão brioche fofinho ou francês crocante, blend bovino selecionado 180g grelhado no fogo, dobro de bacon defumado crocante, queijo cheddar cremoso, cebola caramelizada e maionese defumada da casa.',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🥓 Para Amantes de Bacon',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-02',
    name: 'Capão Bonito Smash Salad',
    category: 'burguers',
    price: 27.90,
    description: 'Blend smash 100g, queijo prato derretido, alface americana fresca, tomate maduro, picles agridoce da casa e molho especial The Brothers no pão brioche tostado.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-03',
    name: 'Costela Burger BBQ',
    category: 'burguers',
    price: 38.90,
    description: 'Blend nobre de costela bovina 180g, queijo muçarela maçaricado, anéis de cebola empanada super crocantes, molho barbecue rústico defumado e maionese de ervas no pão francês selado na manteiga.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🍖 Costela Nobre',
    allowsBreadChoice: true,
    allowsMeatDoneness: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-04',
    name: 'Crispy Chicken Supreme',
    category: 'burguers',
    price: 29.90,
    description: 'Sobrecoxa de frango empanada com tempero secreto super crocante por fora e suculenta por dentro, queijo prato, salada coleslaw artesanal cremosa e maionese verde The Brothers no pão brioche.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },
  {
    id: 'burg-05',
    name: 'Monster Brothers Triplo',
    category: 'burguers',
    price: 46.90,
    description: 'Para quem tem fome de verdade: 3 blends smash de 90g (270g de carne), triplo cheddar derretido, fartura de bacon crocante, molho especial e cebola crispy no pão brioche.',
    image: 'https://images.unsplash.com/photo-1583032015879-c631e5f8f8b8?auto=format&fit=crop&w=800&q=80',
    badge: '⚡ Gigante',
    allowsBreadChoice: true,
    availableExtras: BURGER_EXTRAS
  },

  // --- PIZZAS SALGADAS ---
  {
    id: 'piz-01',
    name: 'Pizza Calabresa Especial da Casa',
    category: 'pizzas_salgadas',
    price: 52.90,
    description: 'Massa artesanal fina e crocante, molho de tomate natural, fatias finas de calabresa defumada de primeira qualidade, cebola fatiada fininha, azeitonas pretas chilenas, queijo muçarela e orégano.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    popular: true,
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'piz-02',
    name: 'Pizza Frango com Catupiry Original',
    category: 'pizzas_salgadas',
    price: 58.90,
    description: 'Peito de frango desfiado suculento refogado com ervas finas e tempero do chef, coberto generosamente com legítimo Requeijão Catupiry® cremoso e gratinado ao forno à lenha.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '👑 Catupiry Original',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'piz-03',
    name: 'Pizza Quatro Queijos Nobres',
    category: 'pizzas_salgadas',
    price: 61.90,
    description: 'A harmonia perfeita entre Muçarela especial, Provolone defumado, Gorgonzola italiano encorpado e legítimo Catupiry cremoso, finalizada com azeitonas pretas e orégano fresco.',
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80',
    isVegetarian: true,
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'piz-04',
    name: 'Pizza Brócolis Especial com Alho & Bacon',
    category: 'pizzas_salgadas',
    price: 59.90,
    description: 'Brócolis frescos salteados no azeite extravirgem com alho frito douradinho crocante, muçarela, bacon em cubos crocante e cobertura de Catupiry cremoso.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'piz-05',
    name: 'Pizza Portuguesa Tradicional',
    category: 'pizzas_salgadas',
    price: 56.90,
    description: 'Molho pelati fresco, muçarela especial, presunto de alta qualidade picadinho, ovos cozidos fatiados, cebola roxa, ervilhas frescas, palmito macio e azeitonas pretas.',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
    allowsCrustChoice: true,
    availableExtras: PIZZA_EXTRAS
  },

  // --- PIZZAS DOCES ---
  {
    id: 'doc-01',
    name: 'Pizza Sensação de Morango com Nutella',
    category: 'pizzas_doces',
    price: 56.90,
    description: 'Massa artesanal fininha, generosa camada de Nutella legítima®, fatias fartas de morangos frescos colhidos no dia e raspas de chocolate branco nobre.',
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🍓 Irresistível',
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'doc-02',
    name: 'Pizza Ninho com Ganache de Chocolate',
    category: 'pizzas_doces',
    price: 52.90,
    description: 'Creme de Leite Ninho® artesanal super aveludado, ganache de chocolate meio amargo e finalizada com polvilhado generoso de Leite Ninho.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
    availableExtras: PIZZA_EXTRAS
  },
  {
    id: 'doc-03',
    name: 'Pizza Banana Nevada Flambada',
    category: 'pizzas_doces',
    price: 48.90,
    description: 'Bananas fatiadas caramelizadas no açúcar mascavo e canela em pó, muçarela derretida suave, cobertura de chocolate branco gratinado e leite condensado.',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80',
    availableExtras: PIZZA_EXTRAS
  },

  // --- PORÇÕES & ACOMPANHAMENTOS ---
  {
    id: 'por-01',
    name: 'Batata The Brothers com Cheddar & Bacon (600g)',
    category: 'porcoes',
    price: 38.90,
    description: 'Batatas rústicas com corte especial sequinhas e crocantes por fora e macias por dentro, afogadas em muito cheddar cremoso e chuva de bacon frito crocante.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🍟 Porção Família',
  },
  {
    id: 'por-02',
    name: 'Anéis de Cebola Onion Rings Crocantes',
    category: 'porcoes',
    price: 28.90,
    description: 'Anéis de cebola selecionados com empanamento especial dourado e crocante. Acompanha nosso molho Barbecue defumado e maionese de alho da casa.',
    image: 'https://images.unsplash.com/photo-1639024471287-032f66ab750f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'por-03',
    name: 'Coxinhas sem Massa de Costela Defumada (8 un)',
    category: 'porcoes',
    price: 36.90,
    description: 'Pura costela bovina desfiada marinada por 12 horas, recheada com queijo muçarela e empanada na farinha panko japonesa super crocante. Acompanha geleia de pimenta.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    badge: '🔥 100% Carne'
  },
  {
    id: 'por-04',
    name: 'Tiras de Frango Crocante Crispy (500g)',
    category: 'porcoes',
    price: 34.90,
    description: 'Tiras suculentas de peito de frango marinadas na cerveja e ervas, empanamento super crocante. Acompanha molho Honey Mustard e Maionese Verde.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
  },

  // --- BEBIDAS & CHOPP ---
  {
    id: 'beb-01',
    name: 'Chopp Artesanal The Brothers (500ml Caneca Congelada)',
    category: 'bebidas',
    price: 13.90,
    description: 'Chopp pilsen puro malte trincando de gelado, servido na caneca zero grau com colarinho cremoso e sabor refrescante inigualável.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
    popular: true,
    badge: '🍺 Trincando de Gelado'
  },
  {
    id: 'beb-02',
    name: 'Drink Autoral Gin Tropical The Brothers',
    category: 'bebidas',
    price: 24.90,
    description: 'Gin premium nacional, Red Bull Tropical Edition, fatias de laranja desidratada, especiarias aromáticas (zimbro e alecrim) e muito gelo.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    badge: '🍹 Mais Pedido'
  },
  {
    id: 'beb-03',
    name: 'Caipirinha Artesanal de Frutas Vermelhas',
    category: 'bebidas',
    price: 22.90,
    description: 'Morangos, amoras e framboesas macerados com açúcar orgânico, vodka premium ou cachaça artesanal e gelo.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'beb-04',
    name: 'Coca-Cola Original / Sem Açúcar (Lata 350ml)',
    category: 'bebidas',
    price: 6.50,
    description: 'Refrigerante em lata bem gelado.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'beb-05',
    name: 'Suco Natural da Fruta (Jarrito 500ml)',
    category: 'bebidas',
    price: 11.90,
    description: 'Opções feitas na hora: Laranja Espremida, Maracujá ou Limonada Suíça Refrescante.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'beb-06',
    name: 'Cervejas Especiais Long Neck (Heineken / Stella / Corona)',
    category: 'bebidas',
    price: 11.00,
    description: 'Garrafa 330ml servida estupidamente gelada com fatia de limão.',
    image: 'https://images.unsplash.com/photo-1608270199144-8d48a30647b2?auto=format&fit=crop&w=800&q=80',
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'mais_pedidos' as const, label: 'Mais Pedidos', icon: 'Flame', subtitle: 'Os favoritos de Capão Bonito' },
  { id: 'burguers' as const, label: 'Hambúrgueres', icon: 'UtensilsCrossed', subtitle: 'No Pão Francês ou Brioche' },
  { id: 'pizzas_salgadas' as const, label: 'Pizzas Salgadas', icon: 'Pizza', subtitle: 'Massa artesanal forneada' },
  { id: 'pizzas_doces' as const, label: 'Pizzas Doces', icon: 'HeartHandshake', subtitle: 'Sensação, Nutella & Ninho' },
  { id: 'porcoes' as const, label: 'Porções & Entradas', icon: 'Layers', subtitle: 'Batatas, Costela & Onion Rings' },
  { id: 'bebidas' as const, label: 'Chopp & Bebidas', icon: 'Beer', subtitle: 'Chopp na caneca zero grau & drinks' },
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
