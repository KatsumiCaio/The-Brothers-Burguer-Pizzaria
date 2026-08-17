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
  Loader2
} from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS, CATEGORIES_CONFIG } from '../data/menuData';
import { formatCurrency } from '../utils/whatsapp';

interface InteractiveMenuProps {
  activeCategory: MenuCategory;
  onSelectCategory: (cat: MenuCategory) => void;
  onOpenProductModal: (item: MenuItem) => void;
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
      type: 'spring',
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
      {/* Skeleton Shimmer */}
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

// Skeleton Placeholder Card for Category Transitions
const MenuCardSkeleton: React.FC = () => (
  <div className="bg-[#1A1614] border border-white/5 rounded-2xl overflow-hidden animate-pulse flex flex-col justify-between h-[380px]">
    <div className="h-48 bg-[#221C18]" />
    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="h-5 bg-[#26201C] rounded-md w-3/4" />
        <div className="h-3.5 bg-[#26201C] rounded-md w-full" />
        <div className="h-3.5 bg-[#26201C] rounded-md w-5/6" />
      </div>
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        <div className="h-6 bg-[#26201C] rounded-md w-16" />
        <div className="h-9 bg-[#26201C] rounded-xl w-28" />
      </div>
    </div>
  </div>
);

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenProductModal,
  onDirectAdd,
  cartItemIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Instant category switch allowing staggered entrance animation to play immediately
  const handleCategorySwitch = (cat: MenuCategory) => {
    if (cat === activeCategory) return;
    onSelectCategory(cat);
  };

  const handleAddWithFeedback = (item: MenuItem) => {
    setRecentlyAddedId(item.id);
    onDirectAdd(item);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  // Icon mapping
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

  const filteredItems = useMemo(() => {
    let list = MENU_ITEMS;
    
    // If searching, search across all items
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Otherwise filter by category
    if (activeCategory === 'mais_pedidos') {
      return list.filter((item) => item.popular || item.category === 'mais_pedidos');
    }

    return list.filter((item) => item.category === activeCategory);
  }, [activeCategory, searchQuery]);

  return (
    <section id="cardapio" className="py-20 bg-[#0D0B0A] relative scroll-mt-20 border-b border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D97706]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#E65100]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion */}
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
            Personalize seu burger (pão francês crocante, ponto da carne ou bordas recheadas) e envie direto para o WhatsApp do The Brothers!
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#A8A29E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por lanche, pizza, porção ou ingrediente..."
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

        {/* Category Filter Tabs with Sliding Active Pill Layout Animation */}
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

        {/* Products Grid with Staggered Entrance Motion Transitions */}
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
              const needsCustomization = item.allowsBreadChoice || item.allowsMeatDoneness || item.allowsCrustChoice || (item.availableExtras && item.availableExtras.length > 0);

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
                      onClick={() => onOpenProductModal(item)}
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
                            onClick={() => onOpenProductModal(item)}
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
                            onClick={() => onOpenProductModal(item)}
                            className="inline-flex items-center gap-1.5 bg-[#D97706] hover:bg-[#E65100] text-black text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-lg transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Montar / Pedir</span>
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

        {/* Empty state with Animation */}
        {filteredItems.length === 0 && (
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

