import React, { useState, useMemo } from 'react';
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
  Check
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

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenProductModal,
  onDirectAdd,
  cartItemIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const renderCategoryIcon = (iconName: string, isSelected: boolean) => {
    const className = `w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-amber-500/80'}`;
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
    <section id="cardapio" className="py-16 bg-[#0D0B0A] relative scroll-mt-20">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-orange-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
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
              className="w-full bg-[#1A1614] border border-white/10 focus:border-[#D97706] rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-[#FDFBF7] placeholder:text-[#A8A29E]/60 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#FDFBF7] text-xs px-2.5 py-1 bg-[#221C18] border border-white/10 rounded-md font-bold uppercase tracking-wider"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        {!searchQuery && (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 pt-2 no-scrollbar justify-start sm:justify-center mb-10">
            {CATEGORIES_CONFIG.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#D97706] text-black border-[#D97706] shadow-lg shadow-black/60 scale-[1.03]'
                      : 'bg-[#1A1614] text-[#A8A29E] hover:text-[#FDFBF7] border-white/10 hover:border-white/20'
                  }`}
                >
                  {renderCategoryIcon(cat.icon, isSelected)}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Search feedback */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between text-xs text-[#A8A29E] bg-[#1A1614] p-3 rounded-xl border border-white/10">
            <span>Resultados para: <strong className="text-[#EAB308]">"{searchQuery}"</strong></span>
            <span>{filteredItems.length} item(ns) encontrado(s)</span>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const hasAdded = cartItemIds.has(item.id);
            const needsCustomization = item.allowsBreadChoice || item.allowsMeatDoneness || item.allowsCrustChoice || (item.availableExtras && item.availableExtras.length > 0);

            return (
              <div
                key={item.id}
                id={`card-${item.id}`}
                className="bg-[#1A1614] hover:bg-[#221C18] border border-white/10 hover:border-[#D97706]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-black/80 group"
              >
                
                {/* Top Image Container */}
                <div 
                  className="relative h-48 sm:h-52 overflow-hidden bg-black/50 cursor-pointer"
                  onClick={() => onOpenProductModal(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-transparent to-black/30" />

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
                      <button
                        onClick={() => onOpenProductModal(item)}
                        className="inline-flex items-center gap-1.5 bg-[#D97706] hover:bg-[#E65100] text-black text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Montar / Pedir</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onDirectAdd(item)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer ${
                          hasAdded
                            ? 'bg-[#25D366] text-black'
                            : 'bg-[#D97706] hover:bg-[#E65100] text-black'
                        }`}
                      >
                        {hasAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>+ 1 Adicionado</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#1A1614] rounded-2xl border border-white/10 p-8">
            <p className="text-[#FDFBF7] font-bold text-base">Nenhum item encontrado com esses termos.</p>
            <p className="text-[#A8A29E] text-xs mt-1">Tente pesquisar por hambúrguer, pizza, calabresa, chopp ou limpe a busca.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 bg-[#D97706] hover:bg-[#E65100] text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl cursor-pointer"
            >
              Ver Cardápio Completo
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
