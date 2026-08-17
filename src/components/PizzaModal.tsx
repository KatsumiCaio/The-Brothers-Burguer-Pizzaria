import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Plus, 
  Minus, 
  Check, 
  Search, 
  CheckCircle2
} from 'lucide-react';
import { PizzaFlavor, PizzaSize, CartItemOption, MenuItem } from '../types';
import { PIZZA_FLAVORS } from '../data/menuData';
import { formatCurrency } from '../utils/whatsapp';

interface PizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSize?: PizzaSize;
  initialFlavorId?: string;
  onAddToCart: (item: MenuItem, quantity: number, options: CartItemOption) => void;
}

export const PizzaModal: React.FC<PizzaModalProps> = ({
  isOpen,
  onClose,
  initialSize = 'grande',
  initialFlavorId,
  onAddToCart,
}) => {
  const [size, setSize] = useState<PizzaSize>(initialSize);
  const [flavorCountMode, setFlavorCountMode] = useState<'1_sabor' | '2_sabores'>('1_sabor');
  
  // Selected flavors (checkbox model)
  const [selectedFlavor1, setSelectedFlavor1] = useState<PizzaFlavor | null>(null);
  const [selectedFlavor2, setSelectedFlavor2] = useState<PizzaFlavor | null>(null);

  // Search & Category Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [flavorCategoryFilter, setFlavorCategoryFilter] = useState<'todos' | 'salgadas' | 'doces' | 'especiais'>('todos');

  // Crust & Notes
  const [crust, setCrust] = useState<
    'Borda Tradicional' | 'Borda Vulcão Catupiry Original (+R$ 8,00)' | 'Borda Vulcão Cheddar (+R$ 8,00)'
  >('Borda Tradicional');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync initial parameters when opened
  useEffect(() => {
    if (isOpen) {
      setSize(initialSize);
      setFlavorCountMode('1_sabor');
      if (initialFlavorId) {
        const found = PIZZA_FLAVORS.find((f) => f.id === initialFlavorId);
        setSelectedFlavor1(found || null);
      } else {
        setSelectedFlavor1(null);
      }
      setSelectedFlavor2(null);
      setCrust('Borda Tradicional');
      setNotes('');
      setQuantity(1);
      setIsSubmitting(false);
      setIsSuccess(false);
      setSearchQuery('');
      setFlavorCategoryFilter('todos');
    }
  }, [isOpen, initialSize, initialFlavorId]);

  // When size changes to broto, enforce 1 flavor
  const handleSizeChange = (newSize: PizzaSize) => {
    setSize(newSize);
    if (newSize === 'broto') {
      setFlavorCountMode('1_sabor');
      setSelectedFlavor2(null);
    }
  };

  const handleFlavorModeChange = (mode: '1_sabor' | '2_sabores') => {
    setFlavorCountMode(mode);
    if (mode === '1_sabor') {
      setSelectedFlavor2(null);
    }
  };

  // Filtered flavors list
  const filteredFlavors = useMemo(() => {
    let list = PIZZA_FLAVORS;

    if (flavorCategoryFilter === 'salgadas') {
      list = list.filter((f) => f.category === 'salgada');
    } else if (flavorCategoryFilter === 'doces') {
      list = list.filter((f) => f.category === 'doce');
    } else if (flavorCategoryFilter === 'especiais') {
      list = list.filter((f) => f.category === 'especial');
    }

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (f) => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
    );
  }, [searchQuery, flavorCategoryFilter]);

  // Calculate Unit Price
  const crustPrice = crust.includes('(+R$ 8,00)') ? 8.00 : 0.00;

  const basePrice = useMemo(() => {
    if (size === 'broto') {
      return selectedFlavor1 ? selectedFlavor1.priceBroto : 35.00;
    }

    // Size Grande 1 sabor
    if (flavorCountMode === '1_sabor') {
      return selectedFlavor1 ? selectedFlavor1.priceGrande : 55.00;
    }

    // Size Grande 2 sabores (adota o maior valor)
    if (selectedFlavor1 && selectedFlavor2) {
      return Math.max(selectedFlavor1.priceGrande, selectedFlavor2.priceGrande);
    }
    if (selectedFlavor1) return selectedFlavor1.priceGrande;
    if (selectedFlavor2) return selectedFlavor2.priceGrande;
    return 55.00;
  }, [size, flavorCountMode, selectedFlavor1, selectedFlavor2]);

  const unitPrice = basePrice + crustPrice;
  const totalPrice = unitPrice * quantity;

  // Validation
  const isReadyToAdd = useMemo(() => {
    if (size === 'broto' || flavorCountMode === '1_sabor') {
      return selectedFlavor1 !== null;
    }
    return selectedFlavor1 !== null && selectedFlavor2 !== null;
  }, [size, flavorCountMode, selectedFlavor1, selectedFlavor2]);

  // Handle clicking a flavor card in the unified list (Checkbox toggle model)
  const handleFlavorToggle = (flavor: PizzaFlavor) => {
    if (size === 'broto' || flavorCountMode === '1_sabor') {
      setSelectedFlavor1(flavor);
      setSelectedFlavor2(null);
      return;
    }

    // 2 Sabores Checkbox Mode:
    if (selectedFlavor1?.id === flavor.id) {
      // Uncheck flavor 1 (shift flavor 2 to slot 1 if present)
      setSelectedFlavor1(selectedFlavor2);
      setSelectedFlavor2(null);
    } else if (selectedFlavor2?.id === flavor.id) {
      // Uncheck flavor 2
      setSelectedFlavor2(null);
    } else {
      // Check new flavor
      if (!selectedFlavor1) {
        setSelectedFlavor1(flavor);
      } else if (!selectedFlavor2) {
        setSelectedFlavor2(flavor);
      } else {
        // Both are already selected; replace the 2nd flavor with the newly clicked one
        setSelectedFlavor2(flavor);
      }
    }
  };

  const handleClearSlot = (slot: 1 | 2, e: React.MouseEvent) => {
    e.stopPropagation();
    if (slot === 1) {
      setSelectedFlavor1(selectedFlavor2);
      setSelectedFlavor2(null);
    } else {
      setSelectedFlavor2(null);
    }
  };

  const handleConfirm = () => {
    if (!isReadyToAdd || isSubmitting || isSuccess) return;
    setIsSubmitting(true);

    const flavorsArray: PizzaFlavor[] = [];
    if (selectedFlavor1) flavorsArray.push(selectedFlavor1);
    if (flavorCountMode === '2_sabores' && selectedFlavor2) {
      flavorsArray.push(selectedFlavor2);
    }

    // Generate descriptive name for cart
    let pizzaTitle = size === 'grande' ? 'Pizza Grande dos Brothers (8 Fatias)' : 'Pizza Broto dos Brothers (4 Fatias)';
    if (flavorsArray.length === 1) {
      pizzaTitle += ` - ${flavorsArray[0].name}`;
    } else if (flavorsArray.length === 2) {
      pizzaTitle += ` (1/2 ${flavorsArray[0].name} + 1/2 ${flavorsArray[1].name})`;
    }

    const menuItem: MenuItem = {
      id: size === 'grande' ? 'pizza-grande' : 'pizza-broto',
      name: pizzaTitle,
      category: 'pizzas',
      price: basePrice,
      description: flavorsArray.map((f, i) => `${flavorsArray.length > 1 ? `${i + 1}º Sabor ` : ''}${f.name}: ${f.description}`).join(' | '),
      image: flavorsArray[0]?.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      allowsCrustChoice: true,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onAddToCart(menuItem, quantity, {
        pizzaSize: size,
        pizzaFlavors: flavorsArray,
        pizzaCrust: crust,
        selectedExtras: [],
        notes: notes.trim() || undefined,
      });

      setTimeout(() => {
        onClose();
      }, 350);
    }, 200);
  };

  if (!isOpen) return null;

  const totalSelectedCount = (selectedFlavor1 ? 1 : 0) + (flavorCountMode === '2_sabores' && selectedFlavor2 ? 1 : 0);
  const requiredCount = size === 'broto' || flavorCountMode === '1_sabor' ? 1 : 2;

  return (
    <div 
      id="pizza-customization-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        className="bg-[#1A1614] border border-white/10 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl shadow-black my-4 relative z-10 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title & Size Switcher */}
        <div className="bg-[#221C18] border-b border-white/10 p-4 sm:p-5 flex items-start justify-between relative">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🍕</span>
              <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#FDFBF7] uppercase tracking-wide">
                {size === 'grande' ? 'GRANDE' : 'BROTO'}
              </h2>
              <span className="bg-[#D97706]/20 text-[#EAB308] border border-[#D97706]/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {size === 'grande' ? '8 Fatias' : '4 Fatias'}
              </span>
            </div>
            <p className="text-xs text-[#A8A29E]">
              {size === 'grande' 
                ? (flavorCountMode === '2_sabores' ? 'Pizza Grande com 2 Sabores (1/2 a 1/2)' : 'Pizza Grande com 1 Sabor Inteiro')
                : 'Pizza Broto Individual com 1 Sabor'}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-[#FDFBF7] flex items-center justify-center border border-white/10 transition-all cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Size Selection Tabs */}
        <div className="px-4 sm:px-5 pt-4 pb-2 bg-[#1A1614] flex gap-2.5">
          <button
            type="button"
            onClick={() => handleSizeChange('grande')}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-center font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              size === 'grande'
                ? 'bg-[#D97706] text-black border-[#D97706] shadow-lg shadow-[#D97706]/20'
                : 'bg-[#221C18] text-[#A8A29E] border-white/10 hover:text-[#FDFBF7]'
            }`}
          >
            Grande (Até 2 Sabores)
          </button>
          <button
            type="button"
            onClick={() => handleSizeChange('broto')}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-center font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              size === 'broto'
                ? 'bg-[#D97706] text-black border-[#D97706] shadow-lg shadow-[#D97706]/20'
                : 'bg-[#221C18] text-[#A8A29E] border-white/10 hover:text-[#FDFBF7]'
            }`}
          >
            Broto (1 Sabor)
          </button>
        </div>

        {/* For Grande: 1 Sabor vs 2 Sabores Toggle */}
        {size === 'grande' && (
          <div className="px-4 sm:px-5 py-2 bg-[#1A1614]">
            <div className="bg-[#221C18] p-1 rounded-xl border border-white/10 grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => handleFlavorModeChange('1_sabor')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  flavorCountMode === '1_sabor'
                    ? 'bg-[#D97706]/20 text-[#EAB308] border border-[#D97706]/40'
                    : 'text-[#A8A29E] hover:text-[#FDFBF7]'
                }`}
              >
                1 Sabor (100% Inteira)
              </button>
              <button
                type="button"
                onClick={() => handleFlavorModeChange('2_sabores')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  flavorCountMode === '2_sabores'
                    ? 'bg-[#D97706]/20 text-[#EAB308] border border-[#D97706]/40'
                    : 'text-[#A8A29E] hover:text-[#FDFBF7]'
                }`}
              >
                2 Sabores (Meio a Meio 1/2)
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Flavor & Options Selection Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1 text-sm custom-scrollbar">

          {/* DYNAMIC FLAVOR CHECKBOX SUMMARY */}
          <div className="bg-[#221C18] border border-white/10 rounded-2xl p-4 space-y-3 shadow-md">
            
            {/* Header with Progress Counter */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#FDFBF7] uppercase tracking-wider">
                  {flavorCountMode === '2_sabores' ? 'Sabores Meio a Meio (Marque 2)' : 'Sabor da Pizza'}
                </span>
                <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Obrigatório
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                  totalSelectedCount === requiredCount
                    ? 'bg-[#25D366]/20 text-[#25D366] border-[#25D366]/30'
                    : 'bg-[#D97706]/20 text-[#EAB308] border-[#D97706]/30'
                }`}>
                  {totalSelectedCount === requiredCount && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {totalSelectedCount} de {requiredCount} {requiredCount === 1 ? 'sabor' : 'sabores'}
                </span>
              </div>
            </div>

            {/* Instruction Banner */}
            <p className="text-[11px] text-[#A8A29E] leading-snug">
              {flavorCountMode === '2_sabores'
                ? 'Marque os 2 sabores nas caixas de seleção (checkbox) abaixo. O valor final da pizza adota o sabor de maior valor.'
                : 'Marque 1 sabor no cardápio abaixo para sua pizza inteira.'}
            </p>

            {/* SELECTED FLAVORS BADGES */}
            {flavorCountMode === '2_sabores' && size === 'grande' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                
                {/* 1st FLAVOR BADGE */}
                <div
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    selectedFlavor1
                      ? 'bg-[#D97706]/10 border-[#D97706]/50 text-[#FDFBF7]'
                      : 'bg-[#1A1614] border-dashed border-white/20 text-[#A8A29E]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      selectedFlavor1 ? 'bg-[#D97706] text-black' : 'border border-dashed border-white/30 text-[#A8A29E]'
                    }`}>
                      {selectedFlavor1 ? '1' : '1'}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-bold text-[#EAB308] block leading-none">
                        1º Sabor (1/2)
                      </span>
                      <p className="text-xs font-bold truncate mt-0.5">
                        {selectedFlavor1 ? selectedFlavor1.name : 'Nenhum marcado'}
                      </p>
                    </div>
                  </div>

                  {selectedFlavor1 && (
                    <button
                      type="button"
                      onClick={(e) => handleClearSlot(1, e)}
                      className="p-1 rounded-lg text-[#A8A29E] hover:text-red-400 hover:bg-black/40 transition-colors"
                      title="Desmarcar 1º sabor"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* 2nd FLAVOR BADGE */}
                <div
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                    selectedFlavor2
                      ? 'bg-[#D97706]/10 border-[#D97706]/50 text-[#FDFBF7]'
                      : 'bg-[#1A1614] border-dashed border-white/20 text-[#A8A29E]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      selectedFlavor2 ? 'bg-[#D97706] text-black' : 'border border-dashed border-white/30 text-[#A8A29E]'
                    }`}>
                      {selectedFlavor2 ? '2' : '2'}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-bold text-[#EAB308] block leading-none">
                        2º Sabor (1/2)
                      </span>
                      <p className="text-xs font-bold truncate mt-0.5">
                        {selectedFlavor2 ? selectedFlavor2.name : 'Marque o 2º sabor abaixo'}
                      </p>
                    </div>
                  </div>

                  {selectedFlavor2 && (
                    <button
                      type="button"
                      onClick={(e) => handleClearSlot(2, e)}
                      className="p-1 rounded-lg text-[#A8A29E] hover:text-red-400 hover:bg-black/40 transition-colors"
                      title="Desmarcar 2º sabor"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            ) : (
              /* SINGLE FLAVOR BADGE */
              <div className="p-2.5 rounded-xl border bg-[#1A1614] border-white/10 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-[#EAB308]">
                    🍕 Sabor Selecionado (100% Inteira)
                  </span>
                  {selectedFlavor1 ? (
                    <p className="text-xs font-bold text-[#FDFBF7] truncate uppercase mt-0.5">
                      {selectedFlavor1.name}
                    </p>
                  ) : (
                    <p className="text-xs text-[#A8A29E] italic mt-0.5">
                      Marque 1 sabor no cardápio abaixo
                    </p>
                  )}
                </div>
                {selectedFlavor1 && (
                  <span className="text-xs font-bold text-[#EAB308]">
                    {formatCurrency(size === 'broto' ? selectedFlavor1.priceBroto : selectedFlavor1.priceGrande)}
                  </span>
                )}
              </div>
            )}

          </div>

          {/* UNIFIED FLAVORS CATALOG WITH CHECKBOXES */}
          <div className="bg-[#221C18] border border-white/10 rounded-2xl p-4 space-y-3.5 shadow-md">
            
            {/* Search & Category Filter bar */}
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar sabor ou ingrediente (ex: calabresa, bacon, nutella)..."
                  className="w-full bg-[#1A1614] border border-white/10 focus:border-[#D97706] rounded-xl pl-9 pr-14 py-2 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#A8A29E] hover:text-[#FDFBF7]"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'salgadas', label: 'Salgadas' },
                  { id: 'especiais', label: 'Especiais' },
                  { id: 'doces', label: 'Doces' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setFlavorCategoryFilter(pill.id as any)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      flavorCategoryFilter === pill.id
                        ? 'bg-[#D97706]/20 border-[#D97706] text-[#EAB308]'
                        : 'bg-[#1A1614] border-white/5 text-[#A8A29E] hover:text-[#FDFBF7]'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavors List with Interactive Checkboxes */}
            <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">
              {filteredFlavors.map((flavor) => {
                const isFlavor1 = selectedFlavor1?.id === flavor.id;
                const isFlavor2 = selectedFlavor2?.id === flavor.id;
                const isChecked = isFlavor1 || isFlavor2;
                const flavorPrice = size === 'broto' ? flavor.priceBroto : flavor.priceGrande;

                return (
                  <div
                    key={flavor.id}
                    onClick={() => handleFlavorToggle(flavor)}
                    className={`group p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
                      isChecked
                        ? 'bg-[#D97706]/15 border-[#D97706] ring-1 ring-[#D97706]'
                        : 'bg-[#1A1614] border-white/5 hover:border-white/20 hover:bg-[#221C18]'
                    }`}
                  >
                    {/* Left: Image and details */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img 
                        src={flavor.image} 
                        alt={flavor.name} 
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-white/10"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-[#FDFBF7] uppercase truncate">
                            {flavor.name}
                          </h4>
                          {flavor.category === 'doce' && (
                            <span className="bg-pink-500/20 text-pink-300 text-[9px] px-1.5 py-0.2 rounded font-semibold">
                              Doce
                            </span>
                          )}
                          {flavor.category === 'especial' && (
                            <span className="bg-[#D97706]/20 text-[#EAB308] text-[9px] px-1.5 py-0.2 rounded font-semibold">
                              Chef
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#A8A29E] line-clamp-2 mt-0.5 leading-snug">
                          {flavor.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Price + Custom Checkbox */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="text-xs font-bold text-[#EAB308]">
                        {formatCurrency(flavorPrice)}
                      </span>

                      {/* Explicit Checkbox Control */}
                      <div className="flex items-center gap-1.5">
                        {flavorCountMode === '2_sabores' && size === 'grande' && isChecked && (
                          <span className="hidden sm:inline-block bg-[#D97706] text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                            {isFlavor1 && isFlavor2 ? '1º e 2º Sabor' : isFlavor1 ? '1º Sabor' : '2º Sabor'}
                          </span>
                        )}

                        {/* Checkbox Box */}
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm ${
                            isChecked
                              ? 'bg-[#D97706] border-[#D97706] text-black'
                              : 'border-white/30 bg-[#1A1614] group-hover:border-[#D97706]'
                          }`}
                        >
                          {isChecked && <Check className="w-4 h-4 stroke-[3.5]" />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredFlavors.length === 0 && (
                <p className="text-center text-xs text-[#A8A29E] py-4">
                  Nenhum sabor encontrado para "{searchQuery}".
                </p>
              )}
            </div>

          </div>

          {/* CRUST SELECTION (Borda Recheada Opcional) */}
          <div className="bg-[#221C18] border border-white/10 rounded-2xl p-4 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#EAB308] uppercase tracking-wider flex items-center gap-1.5">
                <span>🍕 Borda Recheada (Opcional):</span>
              </label>
              <span className="text-[10px] text-[#A8A29E]">Escolha até 1</span>
            </div>

            <div className="space-y-2">
              {[
                { label: 'Sem borda recheada (Borda Tradicional)', value: 'Borda Tradicional' as const, price: 0 },
                { label: 'Borda Vulcão Catupiry Original (+R$ 8,00)', value: 'Borda Vulcão Catupiry Original (+R$ 8,00)' as const, price: 8.00 },
                { label: 'Borda Vulcão Cheddar (+R$ 8,00)', value: 'Borda Vulcão Cheddar (+R$ 8,00)' as const, price: 8.00 },
              ].map((opt) => {
                const isSelected = crust === opt.value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => setCrust(opt.value)}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D97706]/15 border-[#D97706] ring-1 ring-[#D97706] text-[#FDFBF7]'
                        : 'bg-[#1A1614] border-white/5 text-[#A8A29E] hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-medium">{opt.label}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#D97706] bg-[#D97706] text-black' : 'border-white/30'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OBSERVATIONS (Notes) */}
          <div className="bg-[#221C18] border border-white/10 rounded-2xl p-4 space-y-2 shadow-md">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#FDFBF7] uppercase tracking-wider flex items-center gap-1.5">
                <span>📝 Observação</span>
              </label>
              <span className="text-[10px] text-[#A8A29E]">{notes.length}/250</span>
            </div>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 250))}
              placeholder="Digite aqui suas observações (ex: sem azeitona, massa bem assada, etc.)..."
              rows={2}
              className="w-full bg-[#1A1614] border border-white/10 focus:border-[#D97706] rounded-xl p-3 text-xs text-[#FDFBF7] placeholder:text-[#A8A29E]/50 focus:outline-none resize-none"
            />
          </div>

        </div>

        {/* Sticky Modal Footer with Stepper and Add to Cart CTA */}
        <div className="bg-[#221C18] border-t border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-20">
          
          {/* Quantity Controls */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3 bg-[#1A1614] border border-white/10 rounded-xl p-1.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-[#221C18] hover:bg-[#2c241f] text-[#FDFBF7] disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <span className="w-8 text-center font-bold text-sm text-[#FDFBF7]">
              {quantity}
            </span>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-[#D97706] hover:bg-[#E65100] text-black font-bold flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </motion.button>
          </div>

          {/* Add to Cart CTA Button */}
          <motion.button
            type="button"
            whileHover={{ scale: isReadyToAdd ? 1.02 : 1 }}
            whileTap={{ scale: isReadyToAdd ? 0.98 : 1 }}
            onClick={handleConfirm}
            disabled={!isReadyToAdd || isSubmitting || isSuccess}
            className={`w-full sm:flex-1 py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isSuccess
                ? 'bg-[#25D366] text-black'
                : isReadyToAdd
                ? 'bg-[#D97706] hover:bg-[#E65100] text-black shadow-lg shadow-[#D97706]/30'
                : 'bg-white/10 text-[#A8A29E] cursor-not-allowed'
            }`}
          >
            {isSuccess ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Adicionado ao Pedido!</span>
              </span>
            ) : !isReadyToAdd ? (
              <span>
                {size === 'grande' && flavorCountMode === '2_sabores'
                  ? `Escolha os 2 sabores (${totalSelectedCount}/2 selecionados)`
                  : 'Escolha o sabor para continuar'}
              </span>
            ) : (
              <span className="flex items-center justify-between w-full">
                <span>+ Adicionar ao Carrinho</span>
                <span className="font-extrabold">{formatCurrency(totalPrice)}</span>
              </span>
            )}
          </motion.button>

        </div>

      </motion.div>
    </div>
  );
};
