import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  UtensilsCrossed, 
  Pizza, 
  HeartHandshake, 
  Layers, 
  Beer, 
  Search, 
  Plus, 
  Sparkles,
  Info,
  Check,
  Loader2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { MenuItem, MenuCategory, PizzaSize, PizzaFlavor } from '../types';
import { MENU_ITEMS, CATEGORIES_CONFIG, PIZZA_FLAVORS } from '../data/menuData';
import { formatCurrency } from '../utils/whatsapp';

interface InteractiveMenuProps {
  activeCategory: MenuCategory;
  onSelectCategory: (cat: MenuCategory) => void;
  onOpenProductModal: (item: MenuItem) => void;
  onOpenPizzaModal: (size?: PizzaSize, flavorId?: string) => void;
  onDirectAdd: (item: MenuItem) => void;
  cartItemIds: Set<string>;
}

// Staggered Container & Item Animation Variants for Motion
const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

const cardItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.97 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: 'spring' as const,
      stiffness: 360,
      damping: 26,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.15 } 
  },
};

// Progressive Image Loader with Skeleton Shimmer
const MenuItemImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-[#1A1614] overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1614] via-[#26201C] to-[#1A1614] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        } group-hover:scale-105`}
      />
    </div>
  );
};

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenProductModal,
  onOpenPizzaModal,
  onDirectAdd,
  cartItemIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pizzaFlavorFilter, setPizzaFlavorFilter] = useState<'todos' | 'salgadas' | 'doces' | 'especiais'>('todos');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleCategorySwitch = (cat: MenuCategory) => {
    onSelectCategory(cat);
    setSearchQuery('');
  };

  const handleAddWithFeedback = (item: MenuItem) => {
    onDirectAdd(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  const renderCategoryIcon = (iconName: string, isSelected: boolean) => {
    const className = `w-4 h-4 ${isSelected ? 'text-black' : 'text-[#D97706]'}`;
    switch (iconName) {
      case 'Flame': return <Flame className={className} />;
      case 'UtensilsCrossed': return <UtensilsCrossed className={className} />;
      case 'Pizza': return <Pizza className={className} />;
      case 'HeartHandshake': return <HeartHandshake className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Beer': return <Beer className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  // Filtered menu items for search or standard category
  const filteredItems = useMemo(() => {
    let list = MENU_ITEMS;
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory === 'mais_pedidos') {
      return list.filter((item) => item.popular || item.category === 'mais_pedidos');
    }

    return list.filter((item) => item.category === activeCategory);
  }, [activeCategory, searchQuery]);

  // Filtered pizza flavors for Pizza Showcase
  const filteredPizzaFlavors = useMemo(() => {
    if (pizzaFlavorFilter === 'todos') return PIZZA_FLAVORS;
    if (pizzaFlavorFilter === 'salgadas') return PIZZA_FLAVORS.filter(f => f.category === 'salgada');
    if (pizzaFlavorFilter === 'doces') return PIZZA_FLAVORS.filter(f => f.category === 'doce');
    if (pizzaFlavorFilter === 'especiais') return PIZZA_FLAVORS.filter(f => f.category === 'especial');
    return PIZZA_FLAVORS;
  }, [pizzaFlavorFilter]);

  const handleCardClick = (item: MenuItem) => {
    if (item.category === 'pizzas' || item.allowsCrustChoice) {
      const size: PizzaSize = item.id.includes('broto') ? 'broto' : 'grande';
      onOpenPizzaModal(size);
    } else {
      onOpenProductModal(item);
    }
  };

  return (
    <section id="cardapio" className="py-20 bg-[#0D0B0A] relative scroll-mt-20 border-b border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D97706]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#E65100]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-[#1A1614] border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-[#EAB308] uppercase tracking-[0.2em]">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Cardápio Digital Oficial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#FDFBF7] tracking-tight">
            Escolha Seus Pratos & <span className="text-[#EAB308] italic">Monte Seu Pedido</span>
          </h2>
          
          <div className="h-[1px] w-16 bg-[#D97706] mx-auto my-2" />

          <p className="text-[#A8A29E] text-sm sm:text-base font-sans-body">
            Personalize seu burger (pão crocante ou brioche) ou monte sua pizza artesanal (até 2 sabores e borda vulcão) e envie direto para o WhatsApp!
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por lanche, pizza, sabor ou ingrediente..."
              className="w-full bg-[#1A1614] border border-white/10 focus:border-[#D97706] rounded-2xl pl-10 pr-20 py-3 text-xs sm:text-sm text-[#FDFBF7] placeholder:text-[#A8A29E]/60 focus:outline-none transition-all shadow-inner"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#FDFBF7] text-xs px-2.5 py-1 bg-[#221C18] border border-white/10 rounded-md font-bold uppercase tracking-wider cursor-pointer"
                >
                  Limpar
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        {!searchQuery && (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 pt-2 no-scrollbar justify-start sm:justify-center mb-10">
            {CATEGORIES_CONFIG.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => handleCategorySwitch(cat.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-200 cursor-pointer border ${
                    isSelected
                      ? 'border-[#D97706] text-black shadow-lg shadow-black/60'
                      : 'bg-[#1A1614] text-[#A8A29E] hover:text-[#FDFBF7] border-white/10 hover:border-white/20'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#D97706] rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {renderCategoryIcon(cat.icon, isSelected)}
                    <span>{cat.label}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Search feedback */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 flex items-center justify-between text-xs text-[#A8A29E] bg-[#1A1614] p-3 rounded-xl border border-white/10 overflow-hidden"
            >
              <span>Resultados para: <strong className="text-[#EAB308]">"{searchQuery}"</strong></span>
              <span>{filteredItems.length} item(ns) encontrado(s)</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DEDICATED PIZZA SECTION VIEW (When activeCategory === 'pizzas' and not searching) */}
        {!searchQuery && activeCategory === 'pizzas' && (
          <div className="space-y-12 mb-10">
            
            {/* Section Sub-Header */}
            <div className="bg-[#1A1614] border border-white/10 rounded-2xl p-6 sm:p-8 text-center max-w-4xl mx-auto space-y-2 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />
              <span className="text-2xl">🍕</span>
              <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#FDFBF7]">
                Pizzas dos Brothers
              </h3>
              <p className="text-xs sm:text-sm text-[#A8A29E] max-w-2xl mx-auto">
                Escolha o tamanho da sua pizza (Grande de 8 fatias com até 2 sabores ou Broto de 4 fatias com 1 sabor), selecione seus sabores favoritos e adicione Borda Vulcão recheada!
              </p>
            </div>

            {/* 2 Main Size Cards: GRANDE & BROTO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {/* Card 1: GRANDE */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => onOpenPizzaModal('grande')}
                className="bg-[#1A1614] hover:bg-[#221C18] border border-white/10 hover:border-[#D97706]/50 rounded-3xl overflow-hidden shadow-2xl transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden bg-black">
                  <img 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" 
                    alt="Pizza Grande"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-black/20 to-black/40" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#D97706] text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      🔥 Mais Pedida
                    </span>
                    <span className="bg-black/80 backdrop-blur-md border border-white/10 text-[#EAB308] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      8 Fatias
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#FDFBF7]">
                      GRANDE
                    </h4>
                    <p className="text-xs sm:text-sm text-[#EAB308] font-medium mt-0.5">
                      Pizza com até 8 fatias e 2 sabores (1/2 a 1/2)
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <span>Aceita até 2 sabores divididos meio a meio</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                      <span>Opção de Borda Vulcão Catupiry ou Cheddar</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#A8A29E] uppercase font-bold tracking-wider">A partir de</span>
                      <p className="text-xl font-bold text-[#EAB308]">R$ 55,00</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#D97706] hover:bg-[#E65100] text-black text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg flex items-center gap-1.5 transition-colors"
                    >
                      <span>Montar Grande</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: BROTO */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => onOpenPizzaModal('broto')}
                className="bg-[#1A1614] hover:bg-[#221C18] border border-white/10 hover:border-[#D97706]/50 rounded-3xl overflow-hidden shadow-2xl transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="relative h-56 sm:h-64 overflow-hidden bg-black">
                  <img 
                    src="https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80" 
                    alt="Pizza Broto"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-black/20 to-black/40" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#221C18] border border-white/20 text-[#FDFBF7] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      Individual
                    </span>
                    <span className="bg-black/80 backdrop-blur-md border border-white/10 text-[#EAB308] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      4 Fatias
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#FDFBF7]">
                      BROTO
                    </h4>
                    <p className="text-xs sm:text-sm text-[#EAB308] font-medium mt-0.5">
                      Pizza com até 4 fatias e 1 sabor individual
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <span>Porção ideal individual de 4 fatias crocantes</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#A8A29E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                      <span>Opção de Borda Vulcão Catupiry ou Cheddar</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#A8A29E] uppercase font-bold tracking-wider">A partir de</span>
                      <p className="text-xl font-bold text-[#EAB308]">R$ 35,00</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#D97706] hover:bg-[#E65100] text-black text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg flex items-center gap-1.5 transition-colors"
                    >
                      <span>Montar Broto</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Showcase of All 26 Flavors with quick filter and direct builder launcher */}
            <div className="pt-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-xl font-serif-display font-bold text-[#FDFBF7] flex items-center gap-2">
                    <span>Cardápio de Sabores</span>
                    <span className="text-xs font-normal text-[#A8A29E] bg-[#1A1614] px-2.5 py-1 rounded-full border border-white/10">
                      26 Opções Disponíveis
                    </span>
                  </h4>
                  <p className="text-xs text-[#A8A29E] mt-0.5">
                    Clique em qualquer sabor para montar na Pizza Grande ou no Broto
                  </p>
                </div>

                {/* Flavor filter tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    { id: 'todos', label: 'Todos os Sabores' },
                    { id: 'salgadas', label: 'Salgadas' },
                    { id: 'especiais', label: 'Especiais do Chef' },
                    { id: 'doces', label: 'Doces' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setPizzaFlavorFilter(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                        pizzaFlavorFilter === tab.id
                          ? 'bg-[#D97706]/20 border-[#D97706] text-[#EAB308]'
                          : 'bg-[#1A1614] border-white/10 text-[#A8A29E] hover:text-[#FDFBF7]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPizzaFlavors.map((flavor) => (
                  <motion.div
                    key={flavor.id}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    onClick={() => onOpenPizzaModal('grande', flavor.id)}
                    className="bg-[#1A1614] hover:bg-[#221C18] border border-white/10 hover:border-[#D97706]/40 p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <img 
                        src={flavor.image} 
                        alt={flavor.name} 
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-xs sm:text-sm text-[#FDFBF7] group-hover:text-[#EAB308] transition-colors truncate uppercase">
                            {flavor.name}
                          </h5>
                          {flavor.category === 'doce' && (
                            <span className="bg-pink-500/20 text-pink-300 text-[9px] px-1.5 py-0.2 rounded font-semibold">
                              Doce
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#A8A29E] line-clamp-2 mt-1 leading-snug">
                          {flavor.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-[#A8A29E] text-[11px]">
                          Broto: <strong className="text-[#FDFBF7]">{formatCurrency(flavor.priceBroto)}</strong>
                        </span>
                        <span className="text-[#A8A29E] text-[11px]">
                          Grande: <strong className="text-[#EAB308]">{formatCurrency(flavor.priceGrande)}</strong>
                        </span>
                      </div>

                      <span className="text-[11px] text-[#D97706] font-bold group-hover:underline flex items-center gap-1">
                        <span>Escolher</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* STANDARD GRID VIEW (For Burgers, Combos, Desserts, Drinks, Portions or when Searching) */}
        {(searchQuery || activeCategory !== 'pizzas') && (
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory + (searchQuery ? `-${searchQuery}` : '')}
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item) => {
                const hasAdded = cartItemIds.has(item.id);
                const isJustAdded = recentlyAddedId === item.id;
                const isPizzaItem = item.category === 'pizzas' || item.allowsCrustChoice;
                const needsCustomization = isPizzaItem || item.allowsBreadChoice || item.allowsMeatDoneness || (item.availableExtras && item.availableExtras.length > 0);

                return (
                  <motion.div
                    key={item.id}
                    id={`card-${item.id}`}
                    variants={cardItemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-[#1A1614] hover:bg-[#221C18] border border-white/10 hover:border-[#D97706]/40 rounded-2xl overflow-hidden transition-colors duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-black/80 group"
                  >
                      
                      {/* Top Image Container */}
                      <div 
                        className="relative h-48 sm:h-52 overflow-hidden bg-black/50 cursor-pointer"
                        onClick={() => handleCardClick(item)}
                      >
                        <MenuItemImage src={item.image} alt={item.name} />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-transparent to-black/30 pointer-events-none" />

                        {/* Product Badge */}
                        {item.badge && (
                          <div className="absolute top-3 left-3 bg-[#0D0B0A]/90 backdrop-blur-md border border-white/10 text-[#EAB308] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                            {item.badge}
                          </div>
                        )}

                        {/* Special Features Badges */}
                        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                          {item.allowsBreadChoice && (
                            <span className="bg-black/80 backdrop-blur-sm border border-white/10 text-[#EAB308] text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
                              🥖 Pão Francês / Brioche
                            </span>
                          )}
                          {item.allowsCrustChoice && (
                            <span className="bg-black/80 backdrop-blur-sm border border-white/10 text-[#EAB308] text-[10px] font-semibold px-2.5 py-0.5 rounded-md">
                              🍕 Borda Vulcão
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 
                              onClick={() => handleCardClick(item)}
                              className="font-serif-display font-bold text-base sm:text-lg text-[#FDFBF7] group-hover:text-[#EAB308] transition-colors cursor-pointer leading-snug"
                            >
                              {item.name}
                            </h3>
                          </div>

                          <p className="text-[#A8A29E] text-xs leading-relaxed mt-2 line-clamp-3">
                            {item.description}
                          </p>
                        </div>

                        {/* Price and Add Button */}
                        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                          <div>
                            <span className="text-[10px] text-[#A8A29E] uppercase font-bold tracking-wider">Valor</span>
                            <p className="text-lg font-bold text-[#EAB308]">
                              {formatCurrency(item.price)}
                            </p>
                          </div>

                          {needsCustomization ? (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleCardClick(item)}
                              className="inline-flex items-center gap-1.5 bg-[#D97706] hover:bg-[#E65100] text-black text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-lg transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              <span>{isPizzaItem ? 'Montar Pizza' : 'Montar / Pedir'}</span>
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddWithFeedback(item)}
                              className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-lg transition-all cursor-pointer ${
                                isJustAdded
                                  ? 'bg-[#25D366] text-black ring-2 ring-[#25D366]/50'
                                  : hasAdded
                                  ? 'bg-[#25D366] text-black'
                                  : 'bg-[#D97706] hover:bg-[#E65100] text-black'
                              }`}
                            >
                              <AnimatePresence mode="wait">
                                {isJustAdded ? (
                                  <motion.span
                                    key="just-added"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center gap-1"
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    <span>Adicionado!</span>
                                  </motion.span>
                                ) : hasAdded ? (
                                  <motion.span
                                    key="has-added"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-1"
                                  >
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    <span>+ 1 Item</span>
                                  </motion.span>
                                ) : (
                                  <motion.span
                                    key="add"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-1"
                                  >
                                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                                    <span>Adicionar</span>
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          )}
                        </div>

                      </div>

                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty state with Animation */}
        {filteredItems.length === 0 && searchQuery && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-[#1A1614] rounded-2xl border border-white/10 p-8"
          >
            <p className="text-[#FDFBF7] font-bold text-base">Nenhum item encontrado com esses termos.</p>
            <p className="text-[#A8A29E] text-xs mt-1">Tente pesquisar por hambúrguer, pizza, calabresa, chopp ou limpe a busca.</p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSearchQuery('')}
              className="mt-4 bg-[#D97706] hover:bg-[#E65100] text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Ver Cardápio Completo
            </motion.button>
          </motion.div>
        )}

      </div>
    </section>
  );
};
